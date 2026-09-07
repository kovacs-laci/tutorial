---
id: projekt-leiras
slug: /php-alapok/mini-projekt/projekt-leiras
title: "Projektleírás"
---

# Mini projekt – Iskolai rendszer
## Projektleírás

Ez a mini projekt egy egyszerű, de jól bővíthető **Iskolai rendszer** (School Management System), amelynek célja, hogy megismerjük egy modern PHP‑alkalmazás felépítését:

- **Objektumorientált programozás**
- **Namespaces használata**
- **Composer autoload (PSR‑4)**
- **Model–Controller–View architektúra**
- **PDO és prepared statementek**
- **Laravel‑szerű mappastruktúra**

A projekt nem csak működő kódot ad, hanem segít megérteni, hogyan épül fel egy tiszta, karbantartható alkalmazás.

---

# A projekt céljai

A mini projekt célja:

- bemutatni, hogyan működik együtt az OOP, a namespace és az autoload,
- megtanítani a felelősségi körök szétválasztását (model, controller, view),
- tiszta, átlátható architektúrát adni,
- előkészíteni a Laravellel történő megismerkedést,
- egy valószerű, de egyszerű alkalmazást építeni.

---

# Funkciók

A rendszer első verziója a következő funkciókat tartalmazza:

### ✔ Diákok listázása
Az összes diák megjelenítése.

### ✔ Új diák felvétele
Űrlap segítségével új rekord létrehozása.

### ✔ Diák adatainak módosítása
Név, életkor és osztály szerkesztése.

### ✔ Diák törlése
Rekord eltávolítása az adatbázisból.

### ✔ Alapszintű validáció
A controller ellenőrzi, hogy minden szükséges adat megérkezett.

---

# Architektúra áttekintése

A projekt egy egyszerűsített **MVC** mintát követ:

## 1. **Model**
Az adatbázissal kommunikál.  
Minden SQL művelet itt történik.  
Példa: `App\Models\Student`

## 2. **Controller**
A logikai réteg.  
Döntéseket hoz, meghívja a modellt, és átadja az adatot a view‑nak.  
Példa: `App\Controllers\StudentController`

## 3. **View**
A megjelenítésért felel.  
HTML + minimális PHP.  
Példa: `views/students/index.php`

Ez a felépítés nagyon hasonlít a Laravel működésére.

---

# Mappastruktúra

```
school-project/
│
├── app/
│   ├── Controllers/
│   │   └── StudentController.php
│   ├── Models/
│   │   └── Student.php
│   ├── Router/
│   │   └── Router.php
│   └── Views/
│       ├── LayoutView.php
│       ├── MenuView.php
│       └── Students/
│           ├── StudentListView.php
│           ├── StudentCreateView.php
│           └── StudentEditView.php
│
├── config/
│   └── database.php
│
├── public/
│   └── index.php
│
├── composer.json
└── vendor/
```


---

# Miért így épül fel?

Mert ez a struktúra:

- tiszta,
- átlátható,
- könnyen bővíthető,
- és pontosan olyan, mint amit a modern PHP‑keretrendszerek (pl. Laravel) használnak.
