---
id: v2-kulon-formok
title: 2.0 Formok külön fájlban
sidebar_label: 2.0 Formok külön fájlban
slug: /form-evolucio/v2-kulon-formok
---

## 2.0 Formok külön fájlban

Az 1. verzióban a teljes CRUD működött, de minden egyetlen `index.php` fájlban volt.  
Ez jó kiindulópont volt, mert:

- láttuk, hogyan működik a PHP,
- megértettük a POST és GET működését,
- megtanultuk a CRUD alapjait,
- és elkészült egy működő alkalmazás.

Viszont a kód szerkezete több problémát is felvet, amelyek hosszabb távon megnehezítik a fejlesztést.

---

## Mi a gond az 1-es verzióval?

### 1) Minden egyetlen fájlban van
A listázás, a hozzáadás, a módosítás, a törlés, a HTML és a PHP logika **össze van keverve**.  
Ez eleinte kényelmes, de ahogy nő a projekt, egyre átláthatatlanabb lesz.

### 2) Nehéz megtalálni, hogy mi hol történik
Ha valaki megkérdezi:  
„Hol van a módosítás kódja?”  
akkor a válasz: *„Valahol az index.php közepén…”*  
Ez nem ideális.

### 3) A HTML és a PHP logika összefolyik
A kód így néz ki:

```php
<?php if (isset($_GET['edit'])): ?>
    <form>...</form>
<?php endif; ?>
```

Ez működik, de nehezen olvasható, és nem tanítja meg a tiszta rétegezést.

### 4) Új funkció hozzáadása egyre nehezebb
Ha például szeretnénk:

- új entitást (pl. osztályok),
- új oldalt,
- új űrlapot,

akkor az `index.php` még hosszabb lesz, és egyre nehezebb lesz karbantartani.

### 5) A kód nem újrahasznosítható
Ha másik projektben is szeretnénk CRUD-ot, nem tudjuk egyszerűen átemelni a részeket, mert minden össze van nőve.

---

**Mi a cél a 2-es verzióval?**

A cél **csak annyi**, hogy:

- a kódot **szétválasszuk több fájlra**,
- a logika és a megjelenítés **külön helyre kerüljön**,
- a projekt **átláthatóbb** legyen,
- és előkészítsük a terepet a későbbi struktúráknak.

A 2-es verzió tehát az első lépés a spagettiből kifelé.  Egy apró, de fontos lépést teszünk:

> **a formokat külön fájlokba szervezzük.**

A működés nem változik, csak a kód szerkezete lesz átláthatóbb:

- az `index.php` a listázásért és a műveletek feldolgozásáért felel,
- az űrlapok külön fájlokban kapnak helyet:
    - `add-subject-form.php`
    - `edit-subject-form.php`

Ez megkönnyíti például új mezők hozzáadását:  
nem kell az egész `index.php`-t átnézni, elég a megfelelő form fájlt módosítani.

## 2.1 Új tantárgy hozzáadása külön fájlban

Ebben a lépésben az **új tantárgy hozzáadásához tartozó formot** kiszervezzük egy külön fájlba:  
`add-subject-form.php`.

A cél:

- az `index.php` kódja egyszerűbb legyen,
- a formot könnyebb legyen azonosítani és módosítani,

---

### 2.1.1. Az `index.php` módosítása

Az `index.php`-ban most már **nem jelenik meg a hozzáadó form**, csak egy rámutató link:
Ez a link egy külön fájlra mutat, ahol maga az űrlap található.
```html
<p><a href="add-subject-form.php">Új tantárgy hozzáadása</a></p>
```

```php
<h1>Tantárgyak</h1>

<p><a href="add-subject-form.php">Új tantárgy hozzáadása</a></p>

<table border="1" cellpadding="5">
```

---

### 2.1.2. Az `add-subject-form.php` tartalma

```php
<h1>Új tantárgy hozzáadása</h1>

<form method="post" action="index.php">
    <label>Tantárgy neve:</label><br>
    <input type="text" name="name"><br><br>

    <button type="submit" name="add-subject">Hozzáadás</button>
</form>

<p><a href="index.php">Vissza a listához</a></p>
```

**Fontos összefüggések:**

- `action="index.php"`
    - A form **nem saját magát dolgozza fel**, hanem visszaküldi az adatokat az `index.php`-nak.
    - Az `index.php`-ban már megvan a hozzáadás logikája:

      ```php
      if (isset($_POST['add-subject'])) {
          $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
          $stmt->execute(['name' => $_POST['name']]);
      }
      ```

- `name="add-subject"` a gombon
    - Ez alapján tudja a PHP, hogy **hozzáadás** történt.

- A „Vissza a listához” link:

  ```php
  <a href="index.php">Vissza a listához</a>
  ```

    - Ez egyszerűen visszavisz a listázó oldalra.

---

### Mit nyertünk ezzel?

- Az `index.php` kódja tisztább lett.
- A hozzáadó form egy külön fájlban van, könnyen módosítható.
- A példából látható, hogyan működik együtt **több PHP fájl** egy alkalmazásban.

A következő lépésben a **módosító formot** is külön fájlba tesszük.

## 2.2 Tantárgy módosítása külön fájlban

Most a módosításhoz tartozó formot szervezzük ki külön fájlba:  
`edit-subject-form.php`.

A működés logikája ugyanaz marad:

- az `index.php` végzi a módosítás feldolgozását,
- a form csak **megjelenít**, és POST-tal visszaküldi az adatokat az `index.php`-nak.

---

### 2.2.1. A módosítás link az `index.php`-ban

Az `index.php` listázó részében már ezt használjuk:

```php
<a href="edit-subject-form.php?id=<?= $s['id'] ?>">Módosítás</a>
```

**Fontos:**

- A link átadja az `id`-t GET paraméterben:

  ```text
  edit-subject-form.php?id=3
  ```

- A `edit-subject-form.php` ebből fogja tudni, **melyik tantárgyat kell betölteni**.

---

### 2.2.2. Az `edit-subject-form.php` tartalma

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

$id = $_GET['id'];

$stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
$stmt->execute(['id' => $id]);
$subject = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<h1>Tantárgy módosítása</h1>

<form method="post" action="index.php">
    <input type="hidden" name="id" value="<?= $subject['id'] ?>">

    <label>Új név:</label><br>
    <input type="text" name="name" value="<?= $subject['name'] ?>"><br><br>

    <button type="submit" name="update-subject">Mentés</button>
</form>

<p><a href="index.php">Vissza a listához</a></p>
```

---

**Mit csinál ez a fájl lépésről lépésre?**

**1. Adatbázis kapcsolat**

```php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");
```

- Itt még külön PDO kapcsolat van ebben a fájlban.
- Későbbi verziókban ezt is ki fogjuk szervezni egy közös helyre.

**2. Az `id` átvétele a linkből**

```php
$id = $_GET['id'];
```

- Az `edit-subject-form.php?id=3` URL-ből kiolvassuk az `id` értékét.

**3. A módosítandó tantárgy lekérdezése**

```php
$stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
$stmt->execute(['id' => $id]);
$subject = $stmt->fetch(PDO::FETCH_ASSOC);
```

- Lekérdezzük az adott ID-hez tartozó tantárgyat.
- Az eredményt a `$subject` tömbben tároljuk.

**4. A form előre kitöltése**

```php
<input type="hidden" name="id" value="<?= $subject['id'] ?>">

<input type="text" name="name" value="<?= $subject['name'] ?>">
```

- A rejtett `id` mező biztosítja, hogy POST-tal is tudjuk, melyik rekordot kell módosítani.
- A `value="<?= $subject['name'] ?>"` előre kitölti a mezőt a jelenlegi névvel.

**5. A form elküldése az `index.php`-nak**

```php
<form method="post" action="index.php">
    ...
    <button type="submit" name="update-subject">Mentés</button>
</form>
```

- A form **nem saját magát dolgozza fel**, hanem az `index.php`-t hívja.
- Az `index.php`-ban már megvan a módosítás logikája:

  ```php
  if (isset($_POST['update-subject'])) {
      $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
      $stmt->execute([
          'name' => $_POST['name'],
          'id' => $_POST['id']
      ]);
  }
  ```

---

## 2.3 A teljes `index.php`

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

// --- HOZZÁADÁS ---
if (isset($_POST['add-subject'])) {
    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
    $stmt->execute(['name' => $_POST['name']]);
}

// --- MÓDOSÍTÁS ---
if (isset($_POST['update-subject'])) {
    $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
    $stmt->execute([
        'name' => $_POST['name'],
        'id' => $_POST['id']
    ]);
}

// --- TÖRLÉS ---
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = :id");
    $stmt->execute(['id' => $_GET['delete']]);
}

// --- LISTÁZÁS ---
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY id DESC");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Tantárgyak</h1>

<p><a href="add-subject-form.php">Új tantárgy hozzáadása</a></p>

<table border="1" cellpadding="5">
    <tr>
        <th>ID</th>
        <th>Név</th>
        <th>Műveletek</th>
    </tr>

    <?php foreach ($subjects as $s): ?>
        <tr>
            <td><?= $s['id'] ?></td>
            <td><?= $s['name'] ?></td>
            <td>
                <a href="edit-subject-form.php?id=<?= $s['id'] ?>">Módosítás</a>
                |
                <a href="index.php?delete=<?= $s['id'] ?>"
                   onclick="return confirm('Biztos törlöd?')">Törlés</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

## Mit tanultunk a 2. verzióban?

- hogyan szervezzük ki a formokat külön fájlokba,
- hogyan használunk linkeket form oldalakra (`add-subject-form.php`, `edit-subject-form.php`),
- hogyan küldjük vissza az adatokat az `index.php`-nak `action="index.php"` segítségével,
- hogyan töltünk előre egy formot adatbázisból,
- hogyan működik együtt több PHP fájl egy egyszerű alkalmazásban.
