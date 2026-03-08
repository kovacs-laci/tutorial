---
id: pdo-crud
slug: /php-alapok/pdo-crud
title: "Mini projekt: Diáklista (CRUD)"
---

# Mini projekt: Diáklista (CRUD)

Ebben a mini projektben egy teljes CRUD alkalmazást készítünk PDO-val,  
**mindenhol nevesített paramétereket használva**.

---

# 1. Adatbázis

```sql
CREATE TABLE diakok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100),
    kor INT
);
```

---

# 2. Adatbázis kapcsolat (db.php)

```php
<?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=iskola;charset=utf8",
    "root",
    ""
);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
```

---

# 3. Lista (lista.php)

```php
<?php include "db.php"; ?>

<h1>Diákok</h1>

<a href="uj.php">Új diák</a>

<?php
$stmt = $pdo->query("SELECT * FROM diakok");

foreach ($stmt as $sor) {
    echo $sor["nev"] . " (" . $sor["kor"] . ") ";
    echo "<a href='modosit.php?id={$sor['id']}'>Módosít</a> ";
    echo "<a href='torol.php?id={$sor['id']}'>Töröl</a><br>";
}
?>
```

---

# 4. Új diák (uj.php)

```php
<?php include "db.php"; ?>

<form method="POST">
    <input type="text" name="nev" placeholder="Név">
    <input type="number" name="kor" placeholder="Kor">
    <button type="submit">Mentés</button>
</form>

<?php
if ($_POST) {
    $sql = "INSERT INTO diakok (nev, kor)
            VALUES (:nev, :kor)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":nev" => $_POST["nev"],
        ":kor" => $_POST["kor"]
    ]);

    header("Location: lista.php");
}
?>
```

---

# 5. Módosítás (modosit.php)

```php
<?php include "db.php"; ?>

<?php
$id = $_GET["id"];

$stmt = $pdo->prepare("SELECT * FROM diakok WHERE id = :id");
$stmt->execute([":id" => $id]);
$diak = $stmt->fetch();
?>

<form method="POST">
    <input type="text" name="nev" value="<?= $diak['nev'] ?>">
    <input type="number" name="kor" value="<?= $diak['kor'] ?>">
    <button type="submit">Mentés</button>
</form>

<?php
if ($_POST) {
    $sql = "UPDATE diakok 
            SET nev = :nev, kor = :kor 
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":nev" => $_POST["nev"],
        ":kor" => $_POST["kor"],
        ":id"  => $id
    ]);

    header("Location: lista.php");
}
?>
```

---

# 6. Törlés (torol.php)

```php
<?php include "db.php"; ?>

<?php
$id = $_GET["id"];

$sql = "DELETE FROM diakok WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([":id" => $id]);

header("Location: lista.php");
?>
```

---

# Gyakorlófeladatok

1. Adj hozzá új mezőt a diákokhoz: „osztály”.
2. Bővítsd a CRUD-ot úgy, hogy ezt is lehessen módosítani.
3. Készíts keresőmezőt a listához (név alapján).
4. Készíts rendezést név vagy kor szerint.
5. Készíts külön oldalt, amely csak a 18 év feletti diákokat listázza.

---

## Megjegyzés

- Érdemes utánanézni az MVC mintának.
- Lásd még: repository pattern, service layer.
