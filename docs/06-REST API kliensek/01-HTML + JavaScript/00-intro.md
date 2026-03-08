---
id: rest-api-client-js-intro
slug: /rest-api-client/js/intro
title: "Laravel REST API – HTML + JavaScript kliens"
sidebar_label: Bevezető
---

# Laravel REST API – HTML + JavaScript kliens

Ebben a projektben egy **Laravelben írt REST API-hoz** készítünk egy **önálló HTML + JavaScript klienst**.

A cél nem backend fejlesztés, hanem annak megértése, hogyan kommunikál egy böngészőben futó frontend alkalmazás egy REST API-val — tiszta struktúrával, jól elkülönített modulokkal és újrafelhasználható API réteggel.

A kliens:

- HTTP kéréseket küld az API-nak,
- JSON válaszokat dolgoz fel,
- dinamikusan jeleníti meg az adatokat a böngészőben,
- nem tartalmaz adatbázist,
- nem tartalmaz üzleti logikát.

---

# API és kliens futtatása

A rendszer két külön alkalmazásból áll:

- **Laravel REST API** → `http://localhost:8000`
- **HTML + JS kliens** → `http://localhost:8080`

A két alkalmazás külön fut, és HTTP-n keresztül kommunikál.

## API futtatása (Laravel)

Az API projekt könyvtárában:

```bash
php artisan serve
````

Alapértelmezett cím:

```
http://localhost:8000
```

## Kliens futtatása

A kliens mappájában:

```bash
php -S localhost:8080
```

A kliens elérhető:

```
http://localhost:8080
```

👉 A kliens minden adatot az API-tól kér le.
👉 A kliens nem fér hozzá közvetlenül az adatbázishoz.

---

# Az API végpontjai

A Laravel API több erőforrást kezel. A fontosabb végpontok:

## Felhasználók

* `POST /api/users/login`

## Járművek (vehicles)

* `GET /api/vehicles`
* `POST /api/vehicles`
* `GET /api/vehicles/{id}`
* `PUT /api/vehicles/{id}`
* `DELETE /api/vehicles/{id}`
* `GET /api/vehicles/search`

## Matricák (vignettes)

* `GET /api/vignettes`
* `POST /api/vignettes`
* `GET /api/vignettes/{id}`
* `PUT /api/vignettes/{id}`
* `DELETE /api/vignettes/{id}`
* `GET /api/vignettes/search`

### Kapcsolat az erőforrások között

A **vehicles – vignettes** között **1:n kapcsolat** van:

* Egy járműhöz több matrica tartozhat.
* Egy matrica pontosan egy járműhöz tartozik.

---

# Mit valósít meg a kliens jelenleg?

A projekt első fázisában a kliens az alábbi végpontokat használja:

* `POST /api/users/login`
* `GET /api/vehicles`
* `POST /api/vehicles`
* `GET /api/vignettes`

A cél, hogy megértsük:

* hogyan működik a bejelentkezés,
* hogyan kérünk le listákat,
* hogyan küldünk adatot POST kéréssel,
* hogyan jelenítünk meg összekapcsolt adatokat (jármű + matrica).

---

# A kliens architektúrája

A projekt nem frameworköt használ, hanem tiszta HTML + modern JavaScript struktúrát.

Jelenlegi fájlstruktúra:

```
project/
│
├── index.html
│
├── js/
│   ├── main.js
│   ├── api-client.js
│   ├── users.js
│   ├── users.views.js
│   ├── vehicles.js
│   ├── vehicles.views.js
│   ├── vignettes.js
│   └── vignettes.views.js
│
├── css/
│   └── style.css
```

## Az egyes fájlok szerepe

### index.html

A belépési pont. Itt töltődik be az alkalmazás.

### main.js

Az alkalmazás inicializálása, eseménykezelések, indítási logika.

### api-client.js

Az alap API kommunikációs réteg.

Feladata:

* fetch hívások kezelése
* HTTP metódusok (GET, POST, stb.)
* JSON feldolgozás
* közös hibakezelés

### users.js

Örökli az `api-client.js` funkcionalitását, és a felhasználói műveleteket kezeli (pl. login).

### users.views.js

A bejelentkező képernyő megjelenítése.

### vehicles.js

Az API jármű végpontjait kezeli.

### vehicles.views.js

A járműlista megjelenítése, az egyes járművekhez tartozó matricákkal együtt.

### vignettes.js

A matrica végpontok kezelése.

### vignettes.views.js

A matricák listázása a megfelelő jármű adataival együtt.

### style.css

Az alkalmazás megjelenéséért felel.

---

# Mit tanulunk meg ebben a projektben?

A projekt során megtanuljuk:

* hogyan működik a fetch API,
* hogyan kezelünk különböző HTTP metódusokat,
* hogyan kezelünk JSON válaszokat,
* hogyan építünk moduláris JavaScript struktúrát,
* hogyan választjuk szét az API kommunikációt és a megjelenítést,
* hogyan jelenítünk meg kapcsolt adatokat (1:n kapcsolat).

---

# Kinek szól ez a projekt?

Ez a tananyag azoknak szól, akik:

* szeretnék megérteni, hogyan kommunikál a frontend egy Laravel API-val,
* szeretnének tiszta JavaScript struktúrát tanulni framework nélkül,
* később Vue / React irányba szeretnének továbblépni,
* backend–frontend szétválasztásban gondolkodnak.

---

# A projekt célja

A végére egy:

* működő,
* strukturált,
* bővíthető,
* modern szemléletű

HTML + JavaScript alapú REST API kliens alkalmazás áll össze,
amely egy Laravel backenddel kommunikál.

Ez stabil alapot ad SPA keretrendszerek (Vue, React) és komolyabb frontend architektúrák megértéséhez.
