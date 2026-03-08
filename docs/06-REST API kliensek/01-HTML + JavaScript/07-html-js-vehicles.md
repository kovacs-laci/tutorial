---
id: html-js-vehicles
slug: /rest-api-client/js/vehicles
title: Járművek 
---

# A Service réteg mintája

A frontend architektúrában a **Service réteg** felel az API-val való kommunikációért.

Ebben a rétegben:

- nincs HTML
- nincs megjelenítési logika
- nincs üzleti szabály
- csak HTTP kommunikáció történik

A Service osztályok feladata, hogy egységes módon kezeljék a REST API műveleteket.

---

# A CRUD minta

A legtöbb Service osztály ugyanazt a struktúrát követi.

Ez az úgynevezett **CRUD minta**:

- **C** – Create (létrehozás)
- **R** – Read (lekérdezés)
- **U** – Update (módosítás)
- **D** – Delete (törlés)

A tipikus metódusok:

- `getAll()` – lista lekérése
- `get(id)` – egy elem lekérése
- `create(data)` – új elem létrehozása
- `update(id, data)` – módosítás
- `remove(id)` – törlés

Ez a struktúra újra és újra ismétlődik különböző entitások esetén.

---

# Példa: VignetteService

A matricák kezelésére szolgáló `VignetteService` pontosan ezt a mintát valósítja meg.

```js
export class VignetteService {
    constructor(client) {
        this.client = client;
    }

    async getAll(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.client.request(`/vignettes${query ? '?' + query : ''}`, 'GET');
    }

    async get(id) {
        return this.client.request(`/vignettes/${id}`, 'GET');
    }

    async create(data) {
        return this.client.request('/vignettes', 'POST', data);
    }

    async update(id, data) {
        return this.client.request(`/vignettes/${id}`, 'PUT', data);
    }

    async remove(id) {
        return this.client.request(`/vignettes/${id}`, 'DELETE');
    }
}
````

---

# Miért fontos ez a minta?

Ha egy Service osztály működését megértjük, akkor:

* bármely más entitáshoz könnyen létrehozható hasonló osztály
* a kód egységes marad
* a rendszer jól bővíthető
* a frontend struktúra átlátható

---

# 📌 A minta alkalmazása más entitásokra

A `VehicleService` felépítése is ugyanezt a mintát követi.

Ez azt jelenti, hogy:

* a struktúra azonos,
* csak az endpoint változik (`/vehicles` helyett `/vignettes`),
* a domain adatmodell különbözik.

---

# 🎯 Összegzés

A Service réteg:

* egységes mintára épül,
* REST API kommunikációt valósít meg,
* elkülönül a megjelenítési rétegtől,
* újrahasznosítható struktúrát biztosít.

A `VignetteService` egy konkrét példa erre az ismétlődő CRUD mintára.

Ennek a mintának az elsajátítása lehetővé teszi, hogy a frontend további részei könnyen bővíthetők legyenek.

```