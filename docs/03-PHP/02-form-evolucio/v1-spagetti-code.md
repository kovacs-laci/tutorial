---
id: form-evolucio-spagetti-kod
slug: /form-evolucio/spagetti-kod
title: 1.0 Spagetti kód
sidebar_label: 1.0 Spagetti kód
---

## Bevezetés

Ebben a fejezetben egy egyszerű webalkalmazást fogunk lépésről lépésre felépíteni.  
A célunk egy olyan rendszer elkészítése, amely lehetővé teszi a tantárgyak:

- listázását,
- új tantárgy hozzáadását,
- meglévő tantárgy módosítását,
- valamint a törlését.

A fejlesztést **tudatosan több verzióra bontjuk**, hogy minden egyes lépésben csak egy új fogalommal vagy technikával kelljen foglalkoznunk. 

A verziók során végigkövetjük, hogyan fejlődik egy egyszerű, „spagetti” jellegű PHP fájl:

- először csak adatokat jelenítünk meg,
- majd adatbázist kapcsolunk hozzá,
- űrlapokat készítünk,
- végül eljutunk a rendezett, jól strukturált, objektumorientált és MVC‑szerű megoldásokig.

Ez a folyamat nemcsak a PHP‑t és a webfejlesztést tanítja meg, hanem azt is, **hogyan kell egy alkalmazást fokozatosan, átgondoltan felépíteni**.

## 1. Tantárgyak listázása

Ebben az első verzióban a célunk nagyon egyszerű:  
**megjeleníteni a tantárgyak listáját egy HTML táblázatban.**

Ebben a lépésben még **nem használunk adatbázist**.  
A `$subjects` tömb forrása lehetne:

- kézzel összeállított PHP tömb,
- CSV fájl,
- JSON állomány,
- vagy akár adatbázis is.

A lényeg most az, hogy megértsük a HTML és a PHP együttműködését, és létrehozzunk egy működő listázó felületet.  
A következő verzióban (**1.1**) majd kiegészítjük a kódot **adatbázis kapcsolattal** és valódi lekérdezéssel.

---

### 1.1 A tantárgyak megjelenítése

**Példa adatforrás (egyszerű tömb)**

```php
<table>
    <tr>
        <th>#</th>
        <th>Tantárgy neve</th>
    </tr>
    <?php
    $subjects = [
        ['id' => 1, 'name' => 'Matematika'],
        ['id' => 2, 'name' => 'Fizika'],
        ['id' => 3, 'name' => 'Informatika'],
    ];
    ?>
    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>
```
:::info A fenti kód eredménye a böngészőben

<table>
  <tr>
    <th>#</th>
    <th>Tantárgy neve</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Matematika</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Fizika</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Informatika</td>
  </tr>
</table>

:::
### 1.2 Adatbázis kapcsolat és tantárgyak lekérdezése

Ebben a lépésben kiegészítjük az előző verziót úgy, hogy a tantárgyak adatai **már adatbázisból érkezzenek**, ne egy kézzel összeállított tömbből.

Fontos megfigyelni, hogy:

- **a frontend (HTML táblázat) egyáltalán nem változik**,
- csak a `$subjects` változó tartalma származik más forrásból.

Ez egy nagyon fontos fejlesztői gondolat:  
**ha jól választjuk szét az adatforrást és a megjelenítést, akkor a megjelenítő kódot nem kell módosítani.**

---
#### 1.2.1 Adatbázis létrehozása

Ehhez bármilyen SQL klienst használható:

- phpMyAdmin
- MySQL Workbench
- Adminer
- VS Code MySQL plugin
- vagy akár a MySQL konzolt

A parancs mindenhol ugyanaz:

**A `school` databázis létrehozása**
```sql
CREATE DATABASE school
    DEFAULT CHARACTER SET utf8
    COLLATE utf8_hungarian_ci;
```

**A `subjects` tábla létrehozása**

```sql
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL, 
	UNIQUE KEY idx_unique_subject_name (name)
);
```

Ez a minimális struktúra megfelel a jelenlegi céljainkhoz.

**Adatbázis kiválasztása**

```sql
USE school;
```

**Tesztadatok (opcionális)**

```sql
INSERT INTO subjects (name) VALUES
('Matematika'),
('Fizika'),
('Informatika');
```

Ez segít abban, hogy a listázás már az első futtatáskor működjön.

#### 1.2.2 Adatbázis kapcsolat létrehozása (PDO)

```php
<?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=school;charset=utf8",
    "root",
    ""
);
?>
```

---

#### 1.2.3. Tantárgyak lekérdezése az adatbázisból

```php
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY name");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

---

#### 1.2.4. A teljes `index.php` (adatbázissal)

```php
<?php
// Adatbázis kapcsolat
$pdo = new PDO(
    "mysql:host=localhost;dbname=school;charset=utf8",
    "root",
    ""
);

// Tantárgyak lekérdezése
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY name");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<table>
    <tr>
        <th>#</th>
        <th>Tantárgy neve</th>
    </tr>

    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

**A fenti kód eredménye a böngészőben azonos az előzővel.**

:::info A kimenet változatlan marad

<table>
  <tr>
    <th>#</th>
    <th>Tantárgy neve</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Matematika</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Fizika</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Informatika</td>
  </tr>
</table>

:::

---

### Mit tanultunk eddig?

- hogyan kapcsolódunk MySQL adatbázishoz PDO-val,
- hogyan futtatunk egyszerű SELECT lekérdezést,
- hogyan alakítjuk át az eredményt PHP tömbbé,
- és azt, hogy **a megjelenítő kód változatlan maradhat**, ha jól választjuk szét a felelősségeket.

## 2. Új tantárgy hozzáadása

Ebben a lépésben elkészítjük az első űrlapunkat, amely lehetővé teszi egy új tantárgy felvételét az adatbázisba.

A célunk:

- megjeleníteni egy egyszerű HTML formot,
- feldolgozni a beküldött adatokat PHP-ban,
- elmenteni az új tantárgyat az adatbázisba,
- majd frissíteni az oldalt, hogy a lista az új tantárggyal együtt jelenjen meg.

---

#### Fontos összefüggés: a form mezői → `$_POST` → adatbázis

A HTML form minden mezője rendelkezik egy **name attribútummal**.  
Ez a név lesz a kulcs a `$_POST` tömbben.

Például:

```html
<input type="text" name="subject-name">
```

Beküldés után PHP-ban így érjük el:

```php
$_POST['subject-name']
```

Ezért **nagyon fontos**, hogy a form mezőinek nevei pontosan megegyezzenek azzal, amit a PHP kódban használunk.

Ugyanez igaz a gombra is:

```html
<button type="submit" name="add-subject">Hozzáadás</button>
```

PHP-ban:

```php
if (isset($_POST['add-subject'])) { ... }
```

Így tudjuk eldönteni, hogy a felhasználó valóban a „Hozzáadás” gombot nyomta meg.

---

### 2.1. Az űrlap megjelenítése

```html
<form method="post">
    <label for="name">Tantárgy neve:</label>
    <input type="text" name="name" id="name" required>

    <button type="submit" name="add">Hozzáadás</button>
</form>
```

**Magyarázat:**

- `method="post"` → az adatokat POST-tal küldjük
- `name="name"` → ez lesz a `$_POST['name']`
- `name="add"` → ez jelzi, hogy a felhasználó a hozzáadás gombot nyomta meg

---

### 2.2. A beküldött adatok feldolgozása

```php
<?php
if (isset($_POST['add'])) {
    $name = $_POST['name'];

    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
    $stmt->execute(['name' => $name]);

    header("Location: index.php");
    exit;
}
?>
```

**Mit csinál ez a kód?**

- Ellenőrzi, hogy a felhasználó a „Hozzáadás” gombot nyomta meg.
- Kiolvassa a form mezőjét: `$_POST['name']`.
- Elmenti az adatbázisba.
- Visszairányít a listázó oldalra (így elkerüljük a duplikált beküldést).

---

#### A teljes `index.php` (listázás + hozzáadás)

```php
<?php
// Adatbázis kapcsolat
$pdo = new PDO(
    "mysql:host=localhost;dbname=school;charset=utf8",
    "root",
    ""
);

// Új tantárgy hozzáadása
if (isset($_POST['add'])) {
    $name = $_POST['name'];

    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
    $stmt->execute(['name' => $name]);

    header("Location: index.php");
    exit;
}

// Tantárgyak lekérdezése
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY name");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- Új tantárgy hozzáadása -->
<form method="post">
    <label for="name">Tantárgy neve:</label>
    <input type="text" name="name" id="name" required>

    <button type="submit" name="add">Hozzáadás</button>
</form>

<!-- Tantárgyak listázása -->
<table>
    <tr>
        <th>#</th>
        <th>Tantárgy neve</th>
    </tr>

    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

### Mit tanultunk eddig?

- hogyan készítünk HTML formot,
- hogyan működik a `name="..."` → `$_POST['...']` kapcsolat,
- hogyan dolgozzuk fel a beküldött adatokat,
- hogyan mentünk adatot az adatbázisba,
- hogyan térünk vissza a listázó oldalra.

## 3. Tantárgy módosítása

A módosítás a CRUD műveletek egyik legfontosabb része.  
Ahhoz, hogy egy tantárgy adatait szerkeszteni tudjuk, két dolgot kell megtennünk:

1. **Ki kell nyerni az eredeti adatokat az adatbázisból**, hogy tudjuk, mit szeretnénk módosítani.  
2. **Előre ki kell tölteni a form mezőit** ezekkel az adatokkal, hogy a felhasználó lássa a jelenlegi értékeket.

---

### 3.1 A módosítandó tantárgy kiválasztása

A listában minden tantárgy mellé tehetünk egy „Módosítás” linket:

```php
<a href="index.php?edit=<?= $subject['id'] ?>">Módosítás</a>
```

Ez a link egy `edit` nevű GET paramétert ad át, például:

```
index.php?edit=3
```

Ez jelzi a PHP számára, hogy **a 3-as ID-jú tantárgyat szeretnénk szerkeszteni**.

---

### 3.2. A módosítandó adat lekérése az adatbázisból

```php
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];

    $stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $subjectToEdit = $stmt->fetch(PDO::FETCH_ASSOC);
}
```

**Mit csinál ez a kód?**

- Megnézi, hogy kaptunk‑e `edit` paramétert.
- Lekérdezi az adott ID-jú tantárgyat.
- Eltárolja `$subjectToEdit` változóban.
- Ezt fogjuk felhasználni a form előre kitöltéséhez.

---

### 3.3. A módosító form előre kitöltése

```php
<?php if (isset($subjectToEdit)): ?>
    <form method="post">
        <input type="hidden" name="id" value="<?= $subjectToEdit['id'] ?>">

        <label for="name">Tantárgy neve:</label>
        <input type="text" name="name" id="name"
               value="<?= $subjectToEdit['name'] ?>" required>

        <button type="submit" name="update">Mentés</button>
    </form>
<?php endif; ?>
```

**Fontos összefüggés:**

- A `value="..."` attribútum tölti előre a mezőt.
- A rejtett `id` mező biztosítja, hogy POST-tal is tudjuk, melyik rekordot kell módosítani.
- A `name="update"` gomb alapján tudjuk, hogy módosítás történt.

---

### 3.4. A módosítás feldolgozása

```php
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];

    $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
    $stmt->execute(['name' => $name, 'id' => $id]);

    header("Location: index.php");
    exit;
}
```

**Mit tanulunk itt?**

- A POST-ból érkező `id` alapján tudjuk, melyik rekordot kell frissíteni.
- A `header("Location: index.php")` újratölti a listát, immár a módosított adattal.
- Ez a klasszikus **POST → redirect → GET** minta.

---

#### A teljes `index.php` (listázás + hozzáadás + módosítás)

```php
<?php
// Adatbázis kapcsolat
$pdo = new PDO(
    "mysql:host=localhost;dbname=school;charset=utf8",
    "root",
    ""
);

// Új tantárgy hozzáadása
if (isset($_POST['add'])) {
    $name = $_POST['name'];

    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (?)");
    $stmt->execute([$name]);

    header("Location: index.php");
    exit;
}

// Tantárgy módosítása
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];

    $stmt = $pdo->prepare("UPDATE subjects SET name = ? WHERE id = ?");
    $stmt->execute([$name, $id]);

    header("Location: index.php");
    exit;
}

// Módosítandó tantárgy lekérdezése
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];

    $stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = ?");
    $stmt->execute([$id]);
    $subjectToEdit = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Tantárgyak listázása
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY name");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- Új tantárgy hozzáadása -->
<form method="post">
    <label for="name">Tantárgy neve:</label>
    <input type="text" name="name" id="name" required>

    <button type="submit" name="add">Hozzáadás</button>
</form>

<!-- Módosító form (csak akkor jelenik meg, ha van mit módosítani) -->
<?php if (isset($subjectToEdit)): ?>
    <h3>Módosítás</h3>
    <form method="post">
        <input type="hidden" name="id" value="<?= $subjectToEdit['id'] ?>">

        <label for="name">Tantárgy neve:</label>
        <input type="text" name="name" id="name"
               value="<?= $subjectToEdit['name'] ?>" required>

        <button type="submit" name="update">Mentés</button>
    </form>
<?php endif; ?>

<!-- Tantárgyak listázása -->
<table>
    <tr>
        <th>#</th>
        <th>Tantárgy neve</th>
        <th>Műveletek</th>
    </tr>

    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
            <td>
                <a href="index.php?edit=<?= $subject['id'] ?>">Módosítás</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

### Mit tanultunk eddig?

- hogyan kérünk le egy rekordot ID alapján,
- hogyan töltjük előre a form mezőit,
- hogyan dolgozzuk fel a módosítást,
- hogyan frissítjük az adatbázist,
- hogyan alkalmazzuk a POST → redirect → GET mintát,
- hogyan jelenítjük meg a módosító formot csak akkor, amikor szükséges.

---

## 4. A törlés funkció elkészítése

A törléshez két dologra van szükség:

1. **Egy törlés linkre** a táblázatban  
2. **Egy törlő logikára** az `index.php` elején

Kezdjük a linkkel.

---

### 4.1 Törlés link hozzáadása a táblázathoz

Egészítsük ki a *Műveletek* oszlopot egy új linkkel:

```php
<td>
    <a href="index.php?edit=<?= $subject['id'] ?>">Módosítás</a>
    |
    <a href="index.php?delete=<?= $subject['id'] ?>"
       onclick="return confirm('Biztosan törlöd?');">
       Törlés
    </a>
</td>
```

A `confirm()` csak egy kis biztonsági kérdés, hogy ne lehessen véletlenül törölni.

---

### 4.2 A törlés feldolgozása az index.php elején

A törlés ugyanúgy működik, mint a hozzáadás és a módosítás:

- megnézzük, hogy érkezett‑e `delete` paraméter,
- lefuttatjuk a `DELETE` SQL parancsot,
- visszairányítjuk a felhasználót a listára.

Illesszük be a következő blokkot az `index.php` elejére, a módosítás után:

```php
// Tantárgy törlése
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];

    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = ?");
    $stmt->execute([$id]);

    header("Location: index.php");
    exit;
}
```

---

#### A teljes törlés funkcióval bővített index.php részlet

Így néz ki a teljes felső logikai rész, immár a törléssel együtt:

```php
<?php
// Adatbázis kapcsolat
$pdo = new PDO(
    "mysql:host=localhost;dbname=school;charset=utf8",
    "root",
    ""
);

// Új tantárgy hozzáadása
if (isset($_POST['add'])) {
    $name = $_POST['name'];

    $stmt = $pdo->prepare("INSERT INTO subjects (name) VALUES (?)");
    $stmt->execute([$name]);

    header("Location: index.php");
    exit;
}

// Tantárgy módosítása
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];

    $stmt = $pdo->prepare("UPDATE subjects SET name = ? WHERE id = ?");
    $stmt->execute([$name, $id]);

    header("Location: index.php");
    exit;
}

// Tantárgy törlése
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];

    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = ?");
    $stmt->execute([$id]);

    header("Location: index.php");
    exit;
}

// Módosítandó tantárgy lekérdezése
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];

    $stmt = $pdo->prepare("SELECT * FROM subjects WHERE id = ?");
    $stmt->execute([$id]);
    $subjectToEdit = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Tantárgyak listázása
$stmt = $pdo->query("SELECT * FROM subjects ORDER BY name");
$subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
```

---

### 4.3 A táblázat végleges formája törléssel

```php
<table>
    <tr>
        <th>#</th>
        <th>Tantárgy neve</th>
        <th>Műveletek</th>
    </tr>

    <?php foreach ($subjects as $subject): ?>
        <tr>
            <td><?= $subject['id'] ?></td>
            <td><?= $subject['name'] ?></td>
            <td>
                <a href="index.php?edit=<?= $subject['id'] ?>">Módosítás</a>
                |
                <a href="index.php?delete=<?= $subject['id'] ?>"
                   onclick="return confirm('Biztosan törlöd?');">
                   Törlés
                </a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
```

---

### Mit tanultunk ebben a lépésben?

- hogyan törlünk rekordot az adatbázisból,
- hogyan használjuk a `DELETE FROM ... WHERE id = ?` SQL parancsot,
- hogyan kezeljük a törlést GET paraméterrel,
- hogyan alkalmazzuk a redirectet törlés után,
- hogyan egészítjük ki a táblázatot műveleti linkekkel.

