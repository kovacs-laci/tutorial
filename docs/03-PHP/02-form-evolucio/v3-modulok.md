---
id: v3-modulok
title: 3.0 Menürendszer és külön modul
sidebar_label: 3.0 Menürendszer
slug: /form-evolucio/v3-modulok
---

## 3.0 Menürendszer és külön modul a tantárgyaknak

A 2. verzióban a formokat külön fájlokba szerveztük, de a projekt még mindig egyetlen mappában volt.  
A 3. verzió célja:

- **egyszerű menü hozzáadása**,
- **a tantárgyak kezelése külön modulba (subjects mappa)**,
- az `index.php` további egyszerűsítése.

---

## Miért jó külön mappába tenni a tantárgyakat?

- Átláthatóbb lesz a projekt.
- A tantárgyakhoz tartozó fájlok egy helyen vannak.
- Később könnyen hozzáadhatunk új modulokat (pl. osztályok, tanárok, diákok).
- A főoldal (index.php) tiszta marad, csak a menüt és a kezdőlapot tartalmazza.

---

## 3.1. A főoldal (index.php) 

A V3 főoldala már nem tartalmaz CRUD‑ot, csak a menüt:

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Iskolai nyilvántartó rendszer</title>
</head>
<body>

<nav>
    <a href="index.php">Kezdőlap</a> |
    <a href="subjects">Tantárgyak</a> |
    <a href="#">Osztályok (hamarosan)</a>
</nav>

<hr>

<h1>Iskolai nyilvántartó rendszer</h1>
<p>Üdvözöljük! Kérjük, válasszon a fenti menüből.</p>

</body>
</html>
```

### Mi változott?

- Megjelent egy **menü** (`<nav>`).
- A tantárgyak menüpont **nem fájlra**, hanem **mappára** mutat:

  ```
  <a href="subjects">Tantárgyak</a>
  ```

  Ez automatikusan a `subjects/index.php`-t tölti be.

### Miért működik az, hogy a menüpont nem fájlra, hanem mappára mutat?

A menüben ezt írjuk:

```html
<a href="subjects">Tantárgyak</a>
```

Ez **nem egy fájlra**, hanem egy **mappára** mutat.  
Mégis működik, és automatikusan betölti a `subjects/index.php` fájlt.

Ennek oka a webszerverek (Apache, Nginx stb.) alapértelmezett működése.

---

#### A webszerver automatikusan megkeresi az index fájlt

Amikor a böngésző egy mappára mutató URL-t kér le, például:

```
http://localhost/subjects
```

akkor a webszerver a következő logika szerint jár el:

1. Megnézi, hogy létezik‑e a `subjects` nevű mappa.
2. Ha igen, akkor megkeresi benne az **alapértelmezett kezdőfájlt**, amely általában:

- `index.php`, vagy
- `index.html`

3. Ha talál ilyet, **automatikusan azt tölti be**.

Ezért működik:

```
<a href="subjects">Tantárgyak</a>
```

ugyanúgy, mintha ezt írtuk volna:

```
<a href="subjects/index.php">Tantárgyak</a>
```

---

#### Ez a működés a web egyik alapelve

A weboldalak többsége így épül fel:

- `example.com/blog` → betölti a `blog/index.php`-t
- `example.com/admin` → betölti az `admin/index.php`-t
- `example.com/products` → betölti a `products/index.php`-t

Ezért van az, hogy sok weboldal URL-je „szép” és fájlnév nélküli.

---

#### Miért jó ez nekünk?

**Szebb, tisztább URL-eket kapunk**

**A projekt szerkezete modulárisabb lesz**
A `subjects` mappa egy **mini modul**, saját:

- listázó oldalával,
- hozzáadó formjával,
- módosító formjával.

**Később könnyebb lesz bővíteni**
Ha lesz majd:

- `students` mappa,
- `teachers` mappa,
- `classes` mappa,

mindegyik ugyanígy fog működni.

---

#### A webszerver konfigurációja teszi lehetővé

Apache esetén az alapértelmezett beállítás:

```
DirectoryIndex index.php index.html
```

Ez azt jelenti:

> „Ha egy mappát kérnek le, először keresd az index.php-t, ha nincs, akkor az index.html-t.”

Ezért működik a `subjects` mappa úgy, mintha egy fájl lenne.

---

#### Összefoglalva

A `subjects` mappára mutató link azért tölti be automatikusan a `subjects/index.php`-t, mert:

- a böngésző mappát kér le,
- a webszerver felismeri, hogy ez egy könyvtár,
- megkeresi az alapértelmezett kezdőfájlt,
- és betölti az `index.php`-t.

Ez a web egyik legalapvetőbb működési elve.

- A főoldal teljesen megtisztult:  
  **nincs benne semmilyen CRUD logika**.

---

## 3.2. A tantárgyak modul (subjects mappa)

A `subjects` mappa három fájlt tartalmaz:

- `index.php` – listázás + műveletek feldolgozása
- `add.php` – új tantárgy hozzáadása
- `edit.php` – tantárgy módosítása

Ez már egy mini‑modul.

---

### 3.2.1 – Új tantárgy hozzáadása (subjects/add.php)

```html
<h1>Új tantárgy hozzáadása</h1>

<p><a href="index.php">Vissza a tantárgyakhoz</a></p>

<form method="post" action="index.php">
    <label>Tantárgy neve:</label><br>
    <input type="text" name="name"><br><br>

    <button type="submit" name="add-subject">Hozzáadás</button>
</form>
```

### Mi változott?

- A fájl **változatlan**, csak bekerült a `subjects` mappába.
- A `Vissza` link most a `subjects/index.php`-ra mutat:

  ```php
  <a href="index.php">Vissza a tantárgyakhoz</a>
  ```

- A form továbbra is az `index.php`-nak küldi vissza az adatokat:

  ```php
  action="index.php"
  ```

Ez azért jó, mert a feldolgozó logika egy helyen marad.

---

### 3.2.2 – Tantárgy módosítása (subjects/edit.php)

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

$id = $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
$stmt->execute(['id' => $id]);
$subject = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<h1>Tantárgy módosítása</h1>

<p><a href="index.php">Vissza a tantárgyakhoz</a></p>

<form method="post" action="index.php">
    <input type="hidden" name="id" value="<?= $subject['id'] ?>">

    <label>Új név:</label><br>
    <input type="text" name="name" value="<?= $subject['name'] ?>"><br><br>

    <button type="submit" name="update-subject">Mentés</button>
</form>
```

### Mi változott?

- A fájl bekerült a `subjects` mappába.
- A `Vissza` link most a `subjects/index.php`-ra mutat.
- A form továbbra is az `index.php`-nak küldi vissza az adatokat.

---

## 3.2.3 – A tantárgyak listázása és műveletek feldolgozása (subjects/index.php)

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

// HOZZÁADÁS
if (isset($_POST['add-subject'])) {
    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
    $stmt->execute(['name' => $_POST['name']]);
}

// MÓDOSÍTÁS
if (isset($_POST['update-subject'])) {
    $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
    $stmt->execute([
        'name' => $_POST['name'],
        'id' => $_POST['id']
    ]);
}

// TÖRLÉS
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = :id");
    $stmt->execute(['id' => $_GET['delete']]);
}

// LISTÁZÁS
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY id DESC");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Tantárgyak</h1>

<p><a href="../index.php">Vissza a kezdőlapra</a></p>
<p><a href="add.php">Új tantárgy hozzáadása</a></p>

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
                <a href="edit.php?id=<?= $subject['id'] ?>">Módosítás</a> |
                <a href="index.php?delete=<?= $subject['id'] ?>"
                   onclick="return confirm('Biztos törlöd?')">Törlés</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
```

### Mi változott?

- A teljes CRUD logika átkerült a `subjects/index.php`-ba.
- A főoldal (gyökér `index.php`) már nem tartalmaz semmilyen adatkezelést.
- A linkek relatív útvonalai módosultak:

    - `../index.php` – vissza a kezdőlapra
    - `add.php` – új tantárgy
    - `edit.php?id=...` – módosítás

- A törlés továbbra is GET paraméterrel működik.

---

## Mit tanultunk a 3. verzióban?

- hogyan hozunk létre **menüt**,
- hogyan szervezünk egy funkciót **külön modulba** (külön mappa),
- hogyan egyszerűsítjük a főoldalt,
- hogyan kezeljük a relatív útvonalakat,
- hogyan működik együtt több fájl és több mappa egy PHP projektben.
