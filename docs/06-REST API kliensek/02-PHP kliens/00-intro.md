---
id: rest-api-client-php-intro
slug: /rest-api-client/php/intro
title: "REST API - PHP kliens"
sidebar_label: Bevezető
---

# Bevezető

Ebben a tananyagban egy **PHP-ban írt, önálló REST API klienst** fogunk felépíteni lépésről lépésre.

A cél nem egy teljes backend rendszer megírása, hanem annak megértése, hogyan kommunikál egy kliensalkalmazás egy már létező REST API-val — tiszta architektúrával, jól elkülönített rétegekkel és modern szemlélettel.

A projekt során megtanuljuk:

- hogyan küldünk HTTP kéréseket PHP-ból,
- hogyan dolgozunk fel JSON válaszokat,
- hogyan építünk fel egy strukturált, OOP-alapú kliensalkalmazást,
- hogyan választjuk szét a router, controller, view és API kommunikáció rétegeit.

---

# API és kliens futtatása – GitHub repók és környezet

A projekt két külön alkalmazásból áll, amelyek HTTP-n keresztül kommunikálnak egymással:

- **REST API:** https://github.com/kovacs-laci/zip-api
- **REST API kliens:** https://github.com/kovacs-laci/zip-api-client

A két alkalmazás külön fut, külön szerveren, és kizárólag HTTP-n keresztül érik el egymást.

## API futtatása (localhost:8000)

Az API projekt könyvtárában:

```bash
php -S localhost:8000
````

Az API ezen a címen lesz elérhető:

```
http://localhost:8000
```

## Kliens futtatása (localhost:8080)

A kliens projekt könyvtárában:

```bash
php -S localhost:8080
```

A kliens ezen a címen fut:

```
http://localhost:8080
```

👉 A kliens minden adatot az API-tól kér le (GET, POST, PUT, DELETE).
👉 A kliens **nem tartalmaz adatbázist**, nem futtat SQL-t.

---

# Mit fogunk építeni ebben a projektben?

Egy **önálló REST API klienst**, amely egy már létező API-val kommunikál.

Az API két erőforrást kezel:

## counties

```
id (int)
name (string)
```

## cities

```
id (int)
county_id (int)
name (string)
zip_code (string)
```

A tananyag első részében a `counties` végponttal dolgozunk, és elkészítjük a teljes CRUD funkcionalitást.

## A megvalósítandó műveletek

* **Megyék listázása** – `GET /counties`
* **Új megye létrehozása** – `POST /counties`
* **Megye módosítása** – `PUT /counties/{id}`
* **Megye törlése** – `DELETE /counties/{id}`

A kliens tehát:

* HTTP kéréseket küld,
* JSON válaszokat dolgoz fel,
* HTML-ben jeleníti meg az adatokat.

---

# A kliens architektúrája

A projekt célja nem csak a működés, hanem a **tiszta felépítés** megtanulása.

A kliens:

* **routert** használ az útvonalak kezelésére,
* **controller réteggel** kezeli a kéréseket,
* **ApiRequest osztállyal** küld HTTP kéréseket,
* **OOP-alapú View komponensekkel** jeleníti meg az adatokat.

Fontos:

* ❌ nincs adatbázis
* ❌ nincs SQL
* ❌ nincs üzleti logika
* ✅ csak HTTP kommunikáció
* ✅ JSON feldolgozás
* ✅ HTML megjelenítés

Ez a struktúra nagyon hasonlít ahhoz, amit később keretrendszerekben (Laravel, Symfony stb.) is használni fogtok.

---

# Kinek szól ez a tananyag?

Ez a tananyag azoknak szól, akik:

* szeretnék megérteni a modern webalkalmazások működését,
* szeretnének API-val kommunikáló klienst írni,
* backend és frontend szétválasztásában gondolkodnak,
* Laravel / Symfony / Vue / React irányba szeretnének továbbmenni,
* szeretnék megtanulni a tiszta, réteges architektúra alapjait.

---

# Hogyan épül fel a tananyag?

A projektet lépésről lépésre építjük fel:

1. Mappastruktúra létrehozása (batch fájl)
2. Composer inicializálása
3. Router megírása
4. ApiRequest osztály elkészítése
5. CountiesController írása
6. View komponensek kialakítása
7. Counties modul (teljes CRUD)
8. Cities modul (opcionális bővítés)

---

# A tananyag végére

A kurzus végére egy:

* teljesen működő,
* tiszta architektúrájú,
* bővíthető,
* modern szemléletű

REST API kliens alkalmazás áll össze.

Ez stabil alapot ad ahhoz, hogy később nagyobb keretrendszerekben vagy komplexebb rendszerekben is magabiztosan mozogjatok.
