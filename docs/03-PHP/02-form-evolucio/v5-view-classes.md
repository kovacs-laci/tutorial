---
id: v5-view-classes
title: 5.0 Nézetosztályok és layout bevezetése
sidebar_label: 5.0 Nézetosztályok
slug: /form-evolucio/v5-view-classes
---

## 5.0 Nézetosztályok és layout bevezetése

A 4. verzióban már bevezettük az egyszerű routert és a `views/` mappát.  
A 4. verzió azonban még mindig **nyers PHP nézetfájlokat** használt, és a HTML több helyen ismétlődött.

A 5. verzió célja:

- a nézetek **objektumorientált szervezése**,  
- a közös HTML elemek (head, menü, footer) **layoutba szervezése**,  
- a controller (`index.php`) további tisztítása,  
- a projekt szerkezetének professzionális szintre emelése.

Ez a verzió már nagyon közel áll egy valódi MVC‑s felépítéshez.

---

## Mi változott a 4. verzióhoz képest?

### 1. A nézetek osztályokba kerültek
Ahelyett, hogy külön PHP fájlok lennének, most:

- `LayoutView`
- `HomeView`
- `SubjectView`

Ez már **OOP-alapú nézetkezelés**.

### 2. Megjelent a LayoutView – a közös HTML keret
A V4-ben minden nézetfájlban szerepelt:

- `<html>`
- `<head>`
- `<body>`
- menü
- footer

A V5-ben ez mind **egy helyre kerül**:

```php
LayoutView::head();
LayoutView::menu();
...
LayoutView::footer();
```

Ez a keretrendszerek egyik legfontosabb mintája:  
**Layout + Content**.

### 3. A SubjectView osztály felel a tantárgyak nézeteiért
Ahelyett, hogy külön fájlok lennének:

- list.php → `SubjectView::list()`
- add.php → `SubjectView::addForm()`
- edit.php → `SubjectView::editForm()`

Ez sokkal tisztább és bővíthetőbb.

### 4. A controller (index.php) sokkal letisztultabb
A V4-ben a controller még tartalmazott HTML-t és include-okat.  
A V5-ben:

- nincs HTML,
- nincs include,
- csak vezérlő logika és metódushívások.

Ez már tényleg egy **mini-MVC controller**.

### 5. A router logikája tisztább lett
A switch szerkezet ugyanaz, de:

- nincs többé fájlbetöltés,
- csak nézetmetódusok hívása.

### 6. A projekt szerkezete professzionálisabb
A V4 így nézett ki:

```md
index.php
views/
    home.php
    subjects/
        list.php
        add.php
        edit.php
```

A V5 így néz ki:

```md
index.php
views/
    LayoutView.php
    HomeView.php
    SubjectView.php
```

Ez már moduláris, objektumorientált, bővíthető.

---

#### 1. A nézetek most már OOP-alapúak

A V4-ben a nézetek sima PHP fájlok voltak.  
A V5-ben:

- minden nézet **osztályba szervezett**,
- minden nézet **statikus metódus**,
- a controller (index.php) csak hívja őket.

Ez a modern PHP alkalmazások egyik alapelve.

---

#### 2. A LayoutView egységesíti a HTML keretet

A layout tartalmazza:

- a `<head>` részt,
- a menüt,
- a footert.

Ez azt jelenti, hogy:

- a nézetek nem ismétlik a HTML keretet,
- a projekt egységes megjelenést kap,
- bevezettük a „layout + content” mintát.

Ez a Laravel Blade, Twig, Smarty és más templating rendszerek alapja.

---

#### 3. A SubjectView három külön nézetet kezel egy helyen

- listázás (`list()`)
- hozzáadás (`addForm()`)
- módosítás (`editForm()`)

Ez sokkal jobb, mint a V4 szétszórt fájljai.

---

#### 4. A HTML escaping megjelenik (biztonság)

A SubjectView-ben megjelenik:

```php
htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
```

Ez az első alkalom, hogy a tananyagban megjelenik a **biztonság** témája:

- XSS elleni védelem,
- felhasználói input biztonságos megjelenítése.

---

#### 5. A controller (index.php) végre tiszta

A SubjectView és HomeView miatt az index.php:

- nem tartalmaz HTML-t,
- nem tartalmaz include-okat,
- csak vezérli a folyamatot.

Ez már tényleg egy **controller**.

---

#### 6. A projekt szerkezete professzionális szintre lép

A V5 már:

- moduláris,
- objektumorientált,
- bővíthető,
- és nagyon közel áll egy keretrendszerhez.

---

## *A teljes V5 projekt kódja (index.php + LayoutView + HomeView + SubjectView)*

A projekt szerkezete:

```md
v5/
│
├── index.php
│
└── views/
    ├── LayoutView.php
    ├── HomeView.php
    └── SubjectView.php
```

---

### **index.php**
*Központi vezérlő + router + layout + nézetek meghívása*

```php
<?php
require_once "views/LayoutView.php";
require_once "views/HomeView.php";
require_once "views/SubjectView.php";

$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

// --- POST feldolgozás ---
if (isset($_POST['add-subject'])) {
    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
    $stmt->execute(['name' => $_POST['name']]);
    header("Location: index.php?page=subjects");
    exit;
}

if (isset($_POST['update-subject'])) {
    $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
    $stmt->execute([
        'name' => $_POST['name'],
        'id' => $_POST['id']
    ]);
    header("Location: index.php?page=subjects");
    exit;
}

// --- GET törlés ---
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = :id");
    $stmt->execute(['id' => $_GET['delete']]);
    header("Location: index.php?page=subjects");
    exit;
}

// --- Router ---
$page = $_GET['page'] ?? 'home';

// --- Layout kezdete ---
LayoutView::head();
LayoutView::menu();

// --- Nézetek ---
switch ($page) {

    case 'subjects':
        $stmt = $pdo->query("SELECT * FROM subjects ORDER BY id DESC");
        $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        SubjectView::list($subjects);
        break;

    case 'add-subject':
        SubjectView::addForm();
        break;

    case 'edit-subject':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $subject = $stmt->fetch(PDO::FETCH_ASSOC);
        SubjectView::editForm($subject);
        break;

    default:
        HomeView::render();
}

// --- Layout vége ---
LayoutView::footer();
```

---

### **views/LayoutView.php**
*A közös HTML keret: head, menü, footer*

```php
<?php

class LayoutView
{
    public static function head($title = "Iskolai nyilvántartó rendszer")
    {
        echo <<<HTML
        <!DOCTYPE html>
        <html lang="hu">
        <head>
            <meta charset="UTF-8">
            <title>{$title}</title>
        </head>
        <body>
        HTML;
    }

    public static function menu()
    {
        echo <<<HTML
        <nav>
            <a href="index.php?page=home">Kezdőlap</a> |
            <a href="index.php?page=subjects">Tantárgyak</a> |
            <a href="#">Osztályok (hamarosan)</a>
        </nav>
        <hr>
        HTML;
    }

    public static function footer()
    {
        echo <<<HTML
        <hr>
        <footer>
            <p>Iskolai nyilvántartó rendszer &copy; 2026</p>
        </footer>
        </body>
        </html>
        HTML;
    }
}
```

---

### **views/HomeView.php**
*A kezdőlap nézete*

```php
<?php

class HomeView
{
    public static function render()
    {
        echo <<<HTML
            <h1>Iskolai nyilvántartó rendszer</h1>
            <p>Üdvözöljük! Kérjük, válasszon a fenti menüből.</p>
        HTML;
    }
}
```

### **views/SubjectView.php**
*A tantárgyak listázása, hozzáadása és módosítása*

```php
<?php

class SubjectView
{
    public static function list($subjects)
    {
        echo <<<HTML
            <h1>Tantárgyak</h1>

            <p><a href="index.php?page=add-subject">Új tantárgy hozzáadása</a></p>

            <table border="1" cellpadding="5">
                <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Műveletek</th>
                </tr>
        HTML;

        foreach ($subjects as $s) {
            $id = $s['id'];
            $name = htmlspecialchars($s['name'], ENT_QUOTES, 'UTF-8');

            echo <<<HTML
                <tr>
                    <td>{$id}</td>
                    <td>{$name}</td>
                    <td>
                        <a href="index.php?page=edit-subject&id={$id}">Módosítás</a> |
                        <a href="index.php?page=subjects&delete={$id}"
                           onclick="return confirm('Biztos törlöd?')">Törlés</a>
                    </td>
                </tr>
            HTML;
        }

        echo "</table>";
    }

    public static function addForm()
    {
        echo <<<HTML
            <h1>Új tantárgy hozzáadása</h1>

            <form method="post" action="index.php?page=subjects">
                <label>Tantárgy neve:</label><br>
                <input type="text" name="name"><br><br>

                <button type="submit" name="add-subject">Hozzáadás</button>
                <a href="index.php?page=subjects">Mégse</a>
            </form>
        HTML;
    }

    public static function editForm($subject)
    {
        $id = $subject['id'];
        $name = htmlspecialchars($subject['name'], ENT_QUOTES, 'UTF-8');

        echo <<<HTML
            <h1>Tantárgy módosítása</h1>

            <form method="post" action="index.php?page=subjects">
                <input type="hidden" name="id" value="{$id}">

                <label>Új név:</label><br>
                <input type="text" name="name" value="{$name}"><br><br>

                <button type="submit" name="update-subject">Mentés</button>
                <a href="index.php?page=subjects">Mégse</a>
            </form>
        HTML;
    }
}
```
---

## Mit tanultunk ebben a verzióban?

A 4. verzióban már külön fájlokba szerveztük a nézeteket, de még mindig nyers PHP állományok voltak, ismétlődő HTML-lel.  
Az 5. verzióban a projekt szerkezete professzionális szintre lépett.

**1. A nézetek objektumorientált osztályokba kerültek**
Ahelyett, hogy külön PHP fájlok lennének, most:

- `HomeView::render()`
- `SubjectView::list()`
- `SubjectView::addForm()`
- `SubjectView::editForm()`

Ez a modern PHP alkalmazások egyik alapelve:  
**a nézet is lehet komponens**.

**2. A LayoutView egységesíti a HTML keretet**
A layout tartalmazza:

- a `<head>` részt,
- a menüt,
- a footert.

A nézetek így csak a tartalommal foglalkoznak.  
Ez a „layout + content” minta, amelyet minden modern keretrendszer használ (Laravel Blade, Twig, Smarty).

**3. A controller (index.php) végre tiszta**
Az index.php:

- nem tartalmaz HTML-t,
- nem tartalmaz include-okat,
- csak vezérlő logikát tartalmaz.

Ez már valódi **controller** szerep.

**4. A router logikája egyszerű és átlátható**
A `switch ($page)` szerkezet:

- nem fájlokat tölt be,
- hanem nézetmetódusokat hív.

Ez a keretrendszerek routing logikájának első lépcsője.

**5. A SubjectView biztonságos HTML megjelenítést használ**
Megjelenik a `htmlspecialchars()`:

```php
htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
```

Ez az első alkalom, hogy a tananyagban megjelenik a **biztonság** témája (XSS elleni védelem).

**6. A projekt szerkezete professzionális szintre lépett**
A V5 már:

- moduláris,
- objektumorientált,
- bővíthető,
- tanítható,
- és nagyon közel áll egy keretrendszerhez.

