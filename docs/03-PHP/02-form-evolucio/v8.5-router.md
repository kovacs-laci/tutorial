---
id: v8-router
title: 8.5 Router bővítése osztályokkal és diákokkal
sidebar_label: 8.5 Router
slug: /form-evolucio/v8-router
---

# 8.5 Router bővítése osztályokkal és diákokkal

A Router a projekt központi eleme: minden kérés ide fut be, és a `page` paraméter alapján dönti el, melyik controller kezelje azt. A 7.0 fejezetben a Tantárgyak modul már működött, most pedig kibővítjük a Routert az **osztályok** és **diákok** kezelésével, valamint az AJAX/fetch/async végpontokkal.

A cél, hogy a következő URL-ek mind működjenek:

- `index.php?page=classes`
- `index.php?page=add-class`
- `index.php?page=edit-class&id=...`
- `index.php?page=students&class_id=...`
- `index.php?page=add-student`
- `index.php?page=edit-student&id=...`
- `index.php?page=fetch-years`
- `index.php?page=fetch-classes-by-year&year=2025`
- `index.php?page=fetch-students-by-class&id=12`

---

# Router kiegészítése

A Router a projekt gyökérkönyvtárában található `index.php` fájlban működik. A SubjectController mintájára most hozzáadjuk a ClassController és StudentController példányosítását és route‑jait.

## Router kódja (kibővített)

```php
<?php

require_once "controllers/SubjectController.php";
require_once "controllers/ClassController.php";
require_once "controllers/StudentController.php";

require_once "views/LayoutView.php";
require_once "views/SubjectView.php";
require_once "views/ClassView.php";
require_once "views/StudentView.php";

require_once "models/SubjectModel.php";
require_once "models/ClassModel.php";
require_once "models/StudentModel.php";

$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

$page = $_GET['page'] ?? 'home';

// Controller példányok
$subjectController = new SubjectController($pdo);
$classController = new ClassController($pdo);
$studentController = new StudentController($pdo);

// Layout kezdete
LayoutView::head();
LayoutView::menu();

// Routing
switch (true) {

    // --- Tantárgyak modul ---
    case str_starts_with($page, 'subject'):
    case $page === 'subjects':
    case $page === 'add-subject':
    case $page === 'edit-subject':
        $subjectController->handleRequest($page);
        break;

    // --- Osztályok modul ---
    case $page === 'classes':
    case $page === 'add-class':
    case $page === 'edit-class':
    case $page === 'fetch-years':
    case $page === 'fetch-classes-by-year':
        $classController->handleRequest($page);
        break;

    // --- Diákok modul ---
    case $page === 'students':
    case $page === 'add-student':
    case $page === 'edit-student':
    case $page === 'fetch-students-by-class':
        $studentController->handleRequest($page);
        break;

    // --- Kezdőlap ---
    default:
        echo "<h1>Kezdőlap</h1>";
        echo "<p>Üdvözlünk az iskolai nyilvántartó rendszerben!</p>";
        break;
}

// Layout vége
LayoutView::footer();
```

---

# A Router működése

A fenti megoldás három fontos dolgot biztosít:

## 1. Minden modul saját controllerhez kerül

- Tantárgyak → `SubjectController`
- Osztályok → `ClassController`
- Diákok → `StudentController`

Ez tiszta, jól szervezett kódbázist eredményez.

## 2. Az AJAX/fetch/async végpontok is a megfelelő controllerhez kerülnek

Például:

- `fetch-years` → ClassController
- `fetch-classes-by-year` → ClassController
- `fetch-students-by-class` → StudentController

Így a JavaScript kérések is ugyanúgy működnek, mint a normál oldalak.

## 3. A LayoutView automatikusan körbefogja a tartalmat

A Router elején:

```php
LayoutView::head();
LayoutView::menu();
```

A Router végén:

```php
LayoutView::footer();
```

Ez biztosítja, hogy minden oldal egységes megjelenést kapjon.

---

# Mi következik?

A következő fejezetben (8.6) elkészítjük a **dinamikus év → osztály → diákok** frontend megoldást:

- HTML select mezők
- jQuery AJAX verzió
- Fetch API verzió
- Async/Await verzió

Ez lesz a modul leglátványosabb része, ahol a szülő–gyerek kapcsolat a böngészőben is működni kezd.