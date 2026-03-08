---
id: rest-api-client-js-vignettes
slug: /rest-api-client/js/vignettes
title: Matricák
---

# Matricák kezelése a frontendben

Ebben a részben a matricák (vignettes) kezelését tanuljuk meg.

A rendszerben a matricák:

* egy járműhöz tartoznak
* listázhatók
* létrehozhatók
* módosíthatók
* törölhetők
* és beágyazva is megjelenhetnek a járművek listájában

---
id: rest-api-client-js-vignettes
slug: /rest-api-client/js/vignettes
title: Matricák
---

# A `VignetteService` osztály

Ez az osztály a matricákhoz kapcsolódó **adatműveleteket** végzi.

Fontos:

* Nem tartalmaz HTML-t.
* Nem foglalkozik megjelenítéssel.
* Nem tartalmaz üzleti logikát.
* Csak az API-val kommunikál.

Ez egy **Service réteg**, amely a frontend és a backend közötti kapcsolatot biztosítja.

---

## A kód

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
```

---

# Az osztály felépítése

## 1 `constructor(client)`

Amikor létrehozunk egy `VignetteService` példányt, kap egy `client` objektumot.

Ez általában az `ApiClient`.

```js
const vignette = new VignetteService(client);
```

A `client` felel az alacsony szintű HTTP kérésekért.

A `VignetteService` ezt használja fel.

Ez egy **függőség-injektálás** (dependency injection) egyszerű formája.

---

## 2 `getAll(params = {})`

Ez a metódus lekéri az összes matricát.

### Hogyan működik?

```js
const query = new URLSearchParams(params).toString();
```

Ez átalakítja az objektumot URL paraméterekké.

Példa:

```js
vignette.getAll({ year: 2024 });
```

Ebből ez lesz:

```
/vignettes?year=2024
```

Ez lehetővé teszi a szűrést.

---

## 3️ `get(id)`

Egyetlen matrica lekérése azonosító alapján.

Példa:

```js
vignette.get(5);
```

HTTP kérés:

```
GET /vignettes/5
```

---

## 4️ `create(data)`

Új matrica létrehozása.

```
POST /vignettes
```

Az adat JSON formában kerül elküldésre.

---

## 5️ `update(id, data)`

Meglévő matrica módosítása.

```
PUT /vignettes/{id}
```

---

## 6️ `remove(id)`

Matrica törlése.

```
DELETE /vignettes/{id}
```

---


# Miért jó ez a megközelítés?

Ez a struktúra:

✔ elkülöníti a kommunikációt
✔ újrafelhasználható
✔ könnyen tesztelhető
✔ nem keveri a UI-t az API-val
✔ skálázható

---

# Mit tanulunk ebből?

* Hogyan épül fel egy modul frontend oldalon
* Hogyan választjuk szét a logikát és a megjelenítést
* Hogyan kezelünk beágyazott adatokat
* Hogyan készítünk újrahasznosítható szolgáltatásosztályt

---

# Összegzés

A `VignetteService`:

* a matricák adatkezeléséért felel
* REST műveleteket valósít meg
* az `ApiClient`-et használja
* nem tartalmaz megjelenítési logikát
* modern, moduláris frontend megoldás

A JavaScript osztályok:

* segítik a strukturált fejlesztést
* de nem klasszikus öröklődési modellre épülnek
* itt kompozíciót használunk


