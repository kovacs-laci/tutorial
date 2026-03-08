---
id: rest-api-client-js-api-client
slug: /rest-api-client/js/api-client
title: A REST API kliens központi osztálya – ApiClient
---

# 📘 A REST API kliens központi osztálya – `ApiClient`

Az `ApiClient` osztály a frontend és a backend közötti kommunikáció **központi infrastruktúra rétege**.

Feladata kizárólag:

* HTTP kérések küldése (`fetch`)
* JSON kezelés
* Hibakezelés
* Opcionális Bearer token továbbítása

Az üzleti logika (pl. login, felhasználók, járművek, matricák) **nem itt található**, hanem külön szolgáltatásosztályokban.

Ez a megközelítés modern, skálázható és jól karbantartható.

---

# Az `ApiClient` szerepe az architektúrában

A rendszer rétegei:

```
View (UI)
    ↓
Service réteg (pl. AuthService, VehicleService)
    ↓
ApiClient
    ↓
Backend API
```

Az `ApiClient` tehát:

* nem tartalmaz domain logikát
* nem tartalmaz konkrét végpontokat
* csak a HTTP kommunikációért felel

Ez a **separation of concerns** elv megvalósítása.

---

# 💻 Az aktuális `ApiClient` kód

```js
export class ApiClient {
    constructor(baseUrl, token = null) {
        this.baseUrl = baseUrl; // pl. http://localhost:8000/api
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP error ${response.status}`);
        }

        return response.json();
    }
}
```

---

# Az osztály felépítése

## 1 Konstruktor

```js
constructor(baseUrl, token = null)
```

* `baseUrl` → az API alap URL-je
* `token` → opcionális autentikációs token

Példa:

```js
const api = new ApiClient('http://localhost:8000/api');
```

---

## 2️ Token kezelés

A token külön állítható:

```js
setToken(token)
```

Ez lehetővé teszi, hogy:

* bejelentkezés után eltároljuk a tokent
* minden további kérés automatikusan hitelesített legyen

Ha van token, akkor minden kéréshez hozzáadódik:

```js
Authorization: Bearer <token>
```

Ez a modern REST API autentikáció alapja.

---

## 3️ A `request()` metódus

Ez az osztály központi eleme.

### Funkciói:

### ✔ Fejlécek létrehozása

* JSON kommunikáció
* opcionális Authorization header

### ✔ HTTP kérés küldése

* endpoint összefűzése baseUrl-lel
* method beállítása
* body JSON formázása

### ✔ Hibakezelés

Ha a válasz nem sikeres (`!response.ok`):

* megpróbálja kiolvasni a backend hibát
* ha van `message`, azt dobja
* különben HTTP státuszkód alapján hibát generál

Ez egységes hibakezelést biztosít az egész alkalmazásban.

### ✔ Sikeres válasz

```js
return response.json();
```

Minden válasz JSON formátumban érkezik.

---

# Miért jó ez a struktúra?

### ✔ 1. Egyetlen felelősség elve (SRP)

Az ApiClient csak kommunikál.

### ✔ 2. Újrafelhasználhatóság

Bármilyen projektben használható.

### ✔ 3. Könnyű tesztelhetőség

Mockolható a request metódus.

### ✔ 4. Skálázhatóság

Később könnyen bővíthető:

* interceptors
* refresh token
* globális error handler
* loading state kezelés

---

# 🚀 Hogyan használjuk a gyakorlatban?

### Példa inicializálás:

```js
const api = new ApiClient('http://localhost:8000/api');
const authService = new AuthService(api);
```

### Példa kérés:

```js
const vehicles = await api.request('/vehicles');
```

### Példa POST:

```js
await api.request('/vehicles', 'POST', {
      "country_code": "HU",
      "plate_number": "AA-AA-001"
});
```

---

# Összegzés

Az `ApiClient` egy központi HTTP kommunikációs réteg, amely egységes módon kezeli a backenddel való kapcsolatot.
A domain-specifikus logika külön szolgáltatásosztályokban található, így az alkalmazás jól strukturált, bővíthető és karbantartható marad.
