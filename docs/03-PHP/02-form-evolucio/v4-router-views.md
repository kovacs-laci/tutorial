---
id: v4-router-views
title: 4.0 Egyszerű router és nézetek (views)
sidebar_label: 4.0 Router és nézetek
slug: /form-evolucio/v4-router-views
---

## 4.0 Egyszerű router és nézetek (views) bevezetése

A 3. verzióban a tantárgyak modulja külön mappába került, és a főoldal már menüt tartalmazott.  
A 4. verzióban tovább lépünk: **bevezetünk egy egyszerű routert**, és a megjelenítést külön **views** mappába szervezzük.

Ez a verzió már nagyon közel áll egy mini‑MVC felépítéshez.

---

## Miért lépünk tovább a 3. verzióról?

A V3 index.php-ja nagyon letisztult volt: csak HTML-t tartalmazott, nem volt benne logika, és könnyű volt olvasni.  
Ez azonban csak azért volt lehetséges, mert a V3 még **nem oldott meg valós problémát**: a főoldal statikus volt, és a tantárgyak CRUD műveletei külön fájlokban éltek.

A V4 viszont már egy **valódi alkalmazás belépési pontja**, ahol:

- adatbázis‑kapcsolat van,
- POST és GET műveletek feldolgozása történik,
- útválasztás működik,
- nézetek töltődnek be dinamikusan.

A V4 tehát „csúnyább”, de **funkcionálisan sokkal erősebb**.  
Ez az első verzió, ahol a projekt elkezd alkalmazássá válni.

---

## Mi változott a 3. verzióhoz képest?

### 1. A logika visszakerült a központi `index.php`-ba

A V3-ban a tantárgyak CRUD műveletei a `subjects/index.php`-ban voltak.  
A V4-ben:

- minden POST és GET művelet **központilag** kerül feldolgozásra,
- ez a modern alkalmazások egyik alapelve: *egy helyen legyen a vezérlés*.

Ez előkészíti a későbbi MVC struktúrát, ahol a vezérlés a Controller feladata lesz.

---

### 2. Megjelent a router (`?page=...`)

A `switch` szerkezet dönti el, melyik nézetet kell betölteni.

Ez óriási előrelépés, mert:

- a projekt többoldalas lesz,
- a menü logikusan működik,
- a nézetek külön fájlokba kerülnek,
- a kód bővíthetővé válik.

A V4 index.php-ja így már nem csak egy oldal, hanem **egy mini router**.

---

### 3. A nézetek átkerültek a `views/` mappába

A HTML megjelenítés mostantól külön fájlokban van:

- `views/home.php`
- `views/subjects/list.php`
- `views/subjects/add.php`
- `views/subjects/edit.php`

Ez azt jelenti, hogy:

- a logika és a megjelenítés **szétvált**,
- a HTML tisztább lett,
- a nézetek újrahasznosíthatók,
- az index.php áttekinthetőbb.

Ez a View réteg első megjelenése.

---

### 4. A formok `action` attribútuma megváltozott

Most már:

```html
action="index.php?page=subjects"
```

Ez biztosítja, hogy a router visszairányítson a tantárgyak listájára, és ne külön fájlokba kelljen navigálni.

---

### 5. A törlés linkje is router-kompatibilis lett

```html
index.php?page=subjects&delete-subject=ID
```

Ez egységesíti a működést: minden művelet a routeren keresztül történik.

---

## Miért jobb a V4 index.php a V3-hoz képest?

### 1. A V3 statikus, a V4 dinamikus
A V3 csak egy HTML oldal.  
A V4 már egy működő alkalmazás belépési pontja.

### 2. A V4-ben megjelenik a routing
Ez a modern webalkalmazások alapja.

### 3. A V4-ben külön fájlokba kerül a megjelenítés
Ez tisztább, átláthatóbb, bővíthetőbb.

### 4. A V4 előkészíti a későbbi MVC-t
A logika és a megjelenítés szétválasztása az MVC első lépése.

### 5. A V4-ben minden egy helyen történik
A POST, GET, SQL, routing és nézetbetöltés mind az index.php-ban van — ez még nem tökéletes, de sokkal jobb, mint a szétszórt V3.

---

## Összegzés

A V3 egy szép, statikus HTML oldal volt.  
A V4 viszont már egy **valódi, dinamikus webalkalmazás**, ahol:

- van adatbázis,
- van routing,
- vannak nézetek,
- van logika,
- és a projekt elkezd hasonlítani egy keretrendszerre.

Ez a verzió az első nagy lépés a spagettiből az MVC felé.

---

## A projekt teljes mappaszerkezete

```
v4/
│
├── index.php
│
└── views/
    ├── home.php
    └── subjects/
        ├── list.php
        ├── add.php
        └── edit.php
```

## *A teljes V4 projekt kódja (index.php + views)*

---

### **index.php**
*Központi vezérlő + router + menü + nézetbetöltés*

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");


// POST műveletek feldolgozása

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

// GET törlés
if (isset($_GET['delete-subject'])) {
    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = :id");
    $stmt->execute(['id' => $_GET['delete-subject']]);
    header("Location: index.php?page=subjects");
    exit;
}

// Router logika
$page = $_GET['page'] ?? 'home';

?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Iskolai nyilvántartó rendszer</title>
</head>
<body>

<nav>
    <a href="index.php?page=home">Kezdőlap</a> |
    <a href="index.php?page=subjects">Tantárgyak</a> |
    <a href="#">Osztályok (hamarosan)</a>
</nav>

<hr>

<?php

// Nézet betöltése
switch ($page) {

    case 'subjects':
        $stmt = $pdo->query("SELECT * FROM subjects ORDER BY id DESC");
        $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        include 'views/subjects/list.php';
        break;

    case 'add-subject':
        include 'views/subjects/add.php';
        break;

    case 'edit-subject':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $subject = $stmt->fetch(PDO::FETCH_ASSOC);
        include 'views/subjects/edit.php';
        break;

    default:
        include 'views/home.php';
}

?>

<hr>
<footer>
    <p>Iskolai nyilvántartó rendszer &copy; 2026</p>
</footer>

</body>
</html>
```

---

### **views/home.php**

```php
<h1>Iskolai nyilvántartó rendszer</h1>
<p>Üdvözöljük! Kérjük, válasszon a fenti menüből.</p>
```

---

### **views/subjects/list.php**

```php
<h1>Tantárgyak</h1>

<p><a href="index.php?page=add-subject">Új tantárgy hozzáadása</a></p>

<table border="1" cellpadding="5">
    <tr>
        <th>ID</th>
        <th>Név</th>
        <th>Műveletek</th>
    </tr>

    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
            <td>
                <a href="index.php?page=edit-subject&id=<?= $subject['id'] ?>">Módosítás</a> |
                <a href="index.php?page=subjects&delete-subject=<?= $subject['id'] ?>"
                   onclick="return confirm('Biztos törlöd?')">Törlés</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

### **views/subjects/add.php**

```php
<h1>Új tantárgy hozzáadása</h1>

<form method="post" action="index.php?page=subjects">
    <label>Tantárgy neve:</label><br>
    <input type="text" name="name"><br><br>

    <button type="submit" name="add-subject">Hozzáadás</button>
</form>

<p><a href="index.php?page=subjects">Vissza a tantárgyakhoz</a></p>
```

---

### **views/subjects/edit.php**

```php
<h1>Tantárgy módosítása</h1>

<form method="post" action="index.php?page=subjects">
    <input type="hidden" name="id" value="<?= $subject['id'] ?>">

    <label>Új név:</label><br>
    <input type="text" name="name" value="<?= $subject['name'] ?>"><br><br>

    <button type="submit" name="update-subject">Mentés</button>
</form>

<p><a href="index.php?page=subjects">Vissza a tantárgyakhoz</a></p>
```
## Mit tanultunk a 4. verzióban?

Ebben a verzióban több fontos, szemléletformáló lépést tettünk:

**Egyszerű router használata (`?page=...`)**
Megjelent egy központi hely, ahol eldől, melyik oldal (nézet) töltődjön be.  
Ez már nagyon hasonlít arra, ahogyan a keretrendszerek (pl. Laravel) route-okat kezelnek.

**A logika és a nézetek szétválasztása**
Az üzleti logika (INSERT, UPDATE, DELETE, SELECT, routing) az `index.php`-ban marad,  
míg a HTML megjelenítés a `views/` mappába került.  
Ez az első komoly lépés a „controller–view” gondolkodás felé.

**Központosított POST és GET feldolgozás**
Nem szétszórva, külön fájlokban kezeljük a kéréseket, hanem egy helyen.  
Így könnyebb átlátni, mi történik, és később könnyebb lesz hibát keresni, bővíteni.

**Többoldalas alkalmazás egyetlen belépési ponttal**
Látható egy alkalmazásnak lehet egy központi „front controllere” (`index.php`),  
amely minden kérést fogad, és eldönti, mit kell tenni.

**Tiszta, moduláris nézetek**
A `views/home.php`, `views/subjects/list.php`, `views/subjects/add.php`, `views/subjects/edit.php`  
mind csak a megjelenítéssel foglalkoznak.  
Ez tanulhatóvá, másolhatóvá, bővíthetővé teszi a kódot.

---
A 4. verzióval eljutottunk oda, hogy:

- van egy **központi vezérlő** (`index.php`),
- van egy **egyszerű router** (`page` paraméterrel),
- vannak **külön nézetek** (`views/...`).
