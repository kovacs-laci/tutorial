---
id: rest-api-client-js-users
slug: /rest-api-client/js/users
title: Felhasználókezelés
---

# Felhasználókezelés a frontendben – `UserService` és `users.views.js`

Ebben a leckében a felhasználókezelés frontend oldali megvalósítását vizsgáljuk:

* Bejelentkezés (login)
* Felhasználók listázása
* A jövőbeli bővítési lehetőségek (regisztráció, jelszó-visszaállítás)

A rendszer réteges felépítésű:

```
View (users.views.js)
        ↓
UserService
        ↓
ApiClient
        ↓
Backend API
```

---

# A `UserService` szerepe

A `UserService` a felhasználókkal kapcsolatos üzleti műveleteket kezeli.

Nem foglalkozik:

* HTML megjelenítéssel
* localStorage kezeléssel
* UI állapotokkal

Feladata kizárólag:

* bejelentkezés
* felhasználók lekérdezése
* később: regisztráció, profilkezelés stb.

---

## A `UserService` aktuális kódja

```js id="userservice_current"
export class UserService {

    constructor(client) {
        this.client = client;
    }

    async login(email, password) {
        const result = await this.client.request('/users/login', 'POST', { email, password });
        if (result.user?.token) {
            this.client.setToken(result.user.token);
        }
        return result;
    }

    async getUsers() {
        return this.client.request('/users', 'GET');
    }

}
```

---

# 🔐 A login() működése

A `login()` metódus:

1. POST kérést küld a `/users/login` végpontra
2. Email + jelszó adatokat továbbít
3. A backend választ visszakap
4. Ha a válasz tartalmaz tokent:

    * elmenti azt az `ApiClient`-ben

```js id="token_set"
if (result.user?.token) {
    this.client.setToken(result.user.token);
}
```

Ez biztosítja, hogy a további kérések már hitelesítve történjenek.

Fontos:

A `UserService` nem menti a tokent localStorage-ba — ezt a UI réteg (main.js) kezeli.

Ez helyes architektúra.

---

# 👥 getUsers() metódus

```js id="getusers_method"
async getUsers() {
    return this.client.request('/users', 'GET');
}
```

Ez egy egyszerű GET kérés, amely:

* visszaadja az összes felhasználót
* automatikusan használja a tokent, ha be van állítva

Ez például admin funkció lehet.

---

# A `users.views.js` szerepe

A view réteg kizárólag HTML-t generál.

Nem tartalmaz:

* API hívást
* üzleti logikát
* állapotkezelést

---

## Login űrlap – `renderLoginForm()`

```js id="login_form_view"
export function renderLoginForm() {
    return `
        <div class="modal-overlay">
            <div class="modal">
                <h2>Bejelentkezés</h2>
                <form id="loginFormElement">
                    <label>Email<br><input name="email" type="email" required></label>
                    <label>Jelszó<br><input name="password" type="password" required></label>
                    <div class="form-actions">
                        <button type="submit">Bejelentkezés</button>
                        <button type="button" id="cancelLogin">Mégse</button>
                    </div>
                    <div id="loginError" class="error"></div>
                </form>
            </div>
        </div>
    `;
}
```

---

# A View réteg feladata

A `renderLoginForm()`:

* HTML kódot ad vissza
* nem kezel eseményeket
* nem tud az API-ról
* nem tárol adatokat

Az eseménykezelés a `main.js`-ben történik.

Ez a felelősségszétválasztás (Separation of Concerns).

---

# A teljes login folyamat

1. User rákattint a login gombra
2. `main.js` meghívja `renderLoginForm()`-ot
3. A form megjelenik
4. Submit esemény → `UserService.login()`
5. Token visszaérkezik
6. `ApiClient.setToken()` beállításra kerül
7. `main.js` elmenti localStorage-ba
8. UI frissül

Ez egy tiszta, rétegzett folyamat.

---

# Bővíthetőség

A jelenlegi struktúra könnyen bővíthető.

## 🔹 1. Felhasználó lista megjelenítés

Később készíthetünk:

```js
renderUsersTable(users)
```

és a `getUsers()` metódust használhatjuk hozzá.

---

## 🔹 2. Regisztráció

UserService-be kerülhet:

```js
async register(data) {
    return this.client.request('/users/register', 'POST', data);
}
```

És hozzá egy új view:

```js
renderRegisterForm()
```

---

## 🔹 3. Elfelejtett jelszó

Később:

```js
async forgotPassword(email) {
    return this.client.request('/users/forgot-password', 'POST', { email });
}
```

---

# Architektúra összefoglalás

### ✔ ApiClient

Kommunikációs réteg

### ✔ UserService

Felhasználóhoz kapcsolódó logika

### ✔ users.views.js

HTML generálás

### ✔ main.js

Eseménykezelés + UI állapot + localStorage

---

# Miért jó ez a felépítés?

* Tiszta felelősségi körök
* Könnyen tesztelhető
* Könnyen bővíthető
* Modern frontend szemlélet

---

# Összegzés

A `UserService`:

* kezeli a login logikát
* használja az ApiClientet
* nem keveredik UI kóddal
* jól illeszkedik a réteges architektúrába

A `users.views.js`:

* kizárólag megjelenítési réteg
* tiszta, egyszerű
* könnyen bővíthető
