---
id: rest-api-client-js-main
slug: /rest-api-client/js/main
title: A JavaScript belépési pont – main.js 
---

# A JavaScript belépési pont – main.js

A `main.js` a teljes HTML+JS REST API kliens **központi vezérlő modulja**.

Ez a fájl:

* összekapcsolja a felhasználói felületet a szolgáltatásréteggel
* kezeli az autentikációs állapotot
* eseménykezelőket regisztrál
* koordinálja a modális ablakokat
* betölti a megfelelő adatokat a backendből

A projekt rétegezése:

* **ApiClient** – általános HTTP kommunikáció (fetch wrapper)
* **Service réteg** – domain műveletek (Vehicle, Vignette, User)
* **View réteg** – HTML generálás
* **main.js** – vezérlés, állapot, eseménykezelés

---

# A main.js teljes kódja

```js
import { ApiClient } from './api-client.js';
import { VehicleService } from './vehicles.js';
import { VignetteService } from './vignettes.js';
import { UserService } from './users.js';
import { renderVehicleForm, renderVehicleTable } from './vehicles.views.js';
import { renderVignetteListTable } from './vignettes.views.js';
import { renderLoginForm } from './users.views.js';

const client = new ApiClient('http://localhost:8000/api');
const vehicle = new VehicleService(client);
const vignette = new VignetteService(client);
const user = new UserService(client);

const content = document.getElementById('content');
const modal = document.getElementById('modal');

// --- Auth UI elements ---
const authSection = document.getElementById('authSection');
const loginSection = document.getElementById('loginSection');
const appSection = document.getElementById('appSection');
const userName = document.getElementById('userName');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');


// ======================================================
// Helper functions
// ======================================================

function showError(message) {
    if (content) content.textContent = 'Hiba: ' + message;
    else console.error(message);
}

function closeModal() {
    modal.innerHTML = '';
    modal.classList.add('hidden');
}

function restoreAuth() {
    const savedToken = localStorage.getItem('authToken');
    const savedName = localStorage.getItem('userName');

    if (savedToken) {
        client.setToken(savedToken);
        refreshAuthUI(true, savedName);
    }
}


// ======================================================
// Auth state management
// ======================================================

function refreshAuthUI(isLoggedIn, name = 'Felhasználó') {
    if (isLoggedIn) {
        authSection.style.display = 'inline-block';
        loginSection.style.display = 'none';
        appSection.style.display = 'block';
        userName.textContent = `Üdv, ${name}!`;
    } else {
        authSection.style.display = 'none';
        loginSection.style.display = 'inline-block';
        appSection.style.display = 'none';
        content.innerHTML = '';
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
    }
}


// ======================================================
// Login
// ======================================================

function openLoginModal() {
    modal.innerHTML = renderLoginForm();
    modal.classList.remove('hidden');

    const form = modal.querySelector('#loginFormElement');
    form.addEventListener('submit', handleLoginSubmit);

    modal.querySelector('#cancelLogin')
        .addEventListener('click', closeModal);
}

async function handleLoginSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
        const result = await user.login(email, password);
        const token = result.user?.token;
        const name = result.user?.name;

        if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', name);

            closeModal();
            refreshAuthUI(true, name);
            content.innerHTML = '';
        }
    } catch (err) {
        const errorEl = modal.querySelector('#loginError');
        if (errorEl) errorEl.textContent = err.message || 'Bejelentkezési hiba';
    }
}


// ======================================================
// Logout
// ======================================================

function handleLogout() {
    refreshAuthUI(false);
}


// ======================================================
// Vehicle
// ======================================================

function openNewVehicleModal() {
    modal.innerHTML = renderVehicleForm();
    modal.classList.remove('hidden');

    const form = modal.querySelector('#vehicleForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await vehicle.create(data);
            closeModal();

            const list = await vehicle.getAll();
            content.innerHTML = renderVehicleTable(list);
        } catch (err) {
            const errorEl = modal.querySelector('#vehicleFormError');
            if (errorEl) errorEl.textContent = err.message || 'Hiba';
        }
    });

    modal.querySelector('#cancelVehicle')
        .addEventListener('click', closeModal);
}


// ======================================================
// List actions
// ======================================================

async function handleListVehicles() {
    try {
        const data = await vehicle.getAll();
        if (content) content.innerHTML = renderVehicleTable(data);
    } catch (err) {
        showError(err.message);
    }
}

async function handleListVignettes() {
    try {
        const data = await vignette.getAll();
        if (content) content.innerHTML = renderVignetteListTable(data);
    } catch (err) {
        showError(err.message);
    }
}


// ======================================================
// Event bindings
// ======================================================

if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

const newVehicleBtn = document.getElementById('newVehicle');
if (newVehicleBtn) newVehicleBtn.addEventListener('click', openNewVehicleModal);

const listVehiclesBtn = document.getElementById('listVehicles');
if (listVehiclesBtn) listVehiclesBtn.addEventListener('click', handleListVehicles);

const listVignettesBtn = document.getElementById('listVignettes');
if (listVignettesBtn) listVignettesBtn.addEventListener('click', handleListVignettes);


// ======================================================
// Init
// ======================================================

restoreAuth();
```

---

# A main.js szerepe az architektúrában

A `main.js`:

❌ nem tartalmaz fetch hívásokat
❌ nem generál HTML-t
❌ nem tartalmaz üzleti logikát

✅ példányosítja a szolgáltatásokat
✅ kezeli az UI állapotát
✅ összekapcsolja a gombokat a logikával
✅ koordinálja az adatlekérést és megjelenítést

Ez egy klasszikus **orchestrator szerep**.

---

# A fájl szerkezete

A fájl az alábbi blokkokra van bontva:

1. Helper functions
2. Auth state management
3. Login
4. Logout
5. Vehicle műveletek
6. Listázási műveletek
7. Event binding
8. Init

---

# 1. Helper függvények

```js
function showError(message) { ... }
function closeModal() { ... }
function restoreAuth() { ... }
```

Miért jó ez?

* Csökkenti az ismétlést
* Nem duplikálunk kódot
* Nem növeli a komplexitást

---

# 2. Auth állapot kezelése

```js
function refreshAuthUI(isLoggedIn, name)
```

Ez a függvény:

* mutatja/elrejti a megfelelő UI részeket
* kezeli a localStorage törlést
* beállítja a felhasználó nevét

Ez egy egyszerű state-vezérlés.

Nem használunk state managert, nincs globális store – itt nincs rá szükség.

---

# 3. Token visszaállítás (Init fázis)

```js
restoreAuth();
```

Ez a rész fontos architekturálisan.

Amikor az oldal újratöltődik:

* megnézzük, van-e mentett token
* ha igen → visszaállítjuk az ApiClientbe
* frissítjük az UI-t

Ez egy tipikus SPA minta.

---

# 4. Login folyamat

A login már külön függvényekből áll:

```js
openLoginModal()
handleLoginSubmit()
```

A folyamat:

1. Modal megnyitása
2. Form submit intercept
3. `await user.login(...)`
4. Token mentés
5. UI frissítés

---

# 5. Async működés

A gombkezelők:

```js
async function handleListVehicles()
async function handleListVignettes()
```

Itt az async működés teljesen természetes:

* `await vehicle.getAll()`
* nincs callback hell
* tiszta, szinkron jellegű olvashatóság

Ez mutatja, hogy az async/await nem állítja meg a programot — csak a függvényen belüli végrehajtást várakoztatja.

---

# 6. Modal kezelés mint minta

A modal működése:

```js
modal.innerHTML = ...
modal.classList.remove('hidden');
```

Bezárás:

```js
closeModal();
```

Ez egy egyszerű UI pattern.

Nem kell külön modal manager.

---

# 7. Event binding szekció

A fájl végén:

```js
if (loginBtn) loginBtn.addEventListener(...)
```

Ez fontos minta:

* nem dob hibát, ha egy gomb nem létezik
* újrafelhasználható HTML struktúrával is működik

Ez robusztusabbá teszi a kódot.

---

# 8. Miért jó ez az architektúra?

✅ Tiszta rétegezés
✅ Nincs túltervezve
✅ Könnyen bővíthető
✅ Oktatásra kiváló
✅ Nem framework-függő
✅ Nem "enterprise túlhúzás"

Ez egy tudatosan minimalista, de korrekt frontend struktúra.

---

# Fontos észrevétel

Ez a kód már:

* mutat autentikációt
* mutat token kezelést
* mutat async működést
* mutat UI state váltást
* mutat modális ablak kezelést

De még mindig érthető.

Ez egy nagyon jó köztes szint:

👉 nem kezdő
👉 nem túl komplex
👉 továbbfejleszthető

