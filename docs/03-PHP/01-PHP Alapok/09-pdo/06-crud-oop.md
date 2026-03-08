---
id: pdo-crud-oop
slug: /php-alapok/pdo-crud-oop
title: "OOP alapú CRUD alkalmazás PDO-val"
---

# OOP alapú CRUD alkalmazás PDO-val

Ebben a fejezetben egy teljes CRUD alkalmazást készítünk **objektumorientált szemlélettel**.  
A cél, hogy megértsük:

- hogyan szervezzük osztályokba az adatbázis műveleteket
- hogyan különítjük el a felelősségeket
- hogyan lesz a kód újrahasznosítható és karbantartható

---

# Projekt felépítése

```
projekt/
│
├── classes/
│   ├── Database.php
│   └── Diak.php
│
├── lista.php
├── uj.php
├── modosit.php
└── torol.php
```

---

# 1. Database osztály

```php
<?php
class Database {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO(
            "mysql:host=localhost;dbname=iskola;charset=utf8",
            "root",
            ""
        );
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function kapcsolat() {
        return $this->pdo;
    }
}
```

---

# 2. Diak modell osztály

```php
<?php
class Diak {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function osszes() {
        $sql = "SELECT * FROM diakok";
        return $this->pdo->query($sql)->fetchAll();
    }

    public function egy($id) {
        $sql = "SELECT * FROM diakok WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":id" => $id]);
        return $stmt->fetch();
    }

    public function uj($nev, $kor) {
        $sql = "INSERT INTO diakok (nev, kor)
                VALUES (:nev, :kor)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ":nev" => $nev,
            ":kor" => $kor
        ]);
    }

    public function modosit($id, $nev, $kor) {
        $sql = "UPDATE diakok
                SET nev = :nev, kor = :kor
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ":nev" => $nev,
            ":kor" => $kor,
            ":id"  => $id
        ]);
    }

    public function torol($id) {
        $sql = "DELETE FROM diakok WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":id" => $id]);
    }
}
```

---

# 3. Lista (lista.php)

```php
<?php
require "classes/Database.php";
require "classes/Diak.php";

$db = new Database();
$diakModel = new Diak($db->kapcsolat());

$diakok = $diakModel->osszes();
?>

<h1>Diákok</h1>
<a href="uj.php">Új diák</a>

<?php foreach ($diakok as $d): ?>
    <?= $d["nev"] ?> (<?= $d["kor"] ?>)
    <a href="modosit.php?id=<?= $d["id"] ?>">Módosít</a>
    <a href="torol.php?id=<?= $d["id"] ?>">Töröl</a>
    <br>
<?php endforeach; ?>
```

---

# 4. Új diák (uj.php)

```php
<?php
require "classes/Database.php";
require "classes/Diak.php";

$db = new Database();
$diakModel = new Diak($db->kapcsolat());

if ($_POST) {
    $diakModel->uj($_POST["nev"], $_POST["kor"]);
    header("Location: lista.php");
}
?>

<form method="POST">
    <input type="text" name="nev" placeholder="Név">
    <input type="number" name="kor" placeholder="Kor">
    <button type="submit">Mentés</button>
</form>
```

---

# 5. Módosítás (modosit.php)

```php
<?php
require "classes/Database.php";
require "classes/Diak.php";

$db = new Database();
$diakModel = new Diak($db->kapcsolat());

$diak = $diakModel->egy($_GET["id"]);

if ($_POST) {
    $diakModel->modosit($_GET["id"], $_POST["nev"], $_POST["kor"]);
    header("Location: lista.php");
}
?>

<form method="POST">
    <input type="text" name="nev" value="<?= $diak['nev'] ?>">
    <input type="number" name="kor" value="<?= $diak['kor'] ?>">
    <button type="submit">Mentés</button>
</form>
```

---

# 6. Törlés (torol.php)

```php
<?php
require "classes/Database.php";
require "classes/Diak.php";

$db = new Database();
$diakModel = new Diak($db->kapcsolat());

$diakModel->torol($_GET["id"]);
header("Location: lista.php");
```

---

# Gyakorlófeladatok

1. Adj hozzá új mezőt: „osztály”.
2. Bővítsd a Diak osztályt keresési funkcióval.
3. Készíts rendezést név szerint.
4. Készíts külön oldalt, amely csak a 18 év feletti diákokat listázza.

---

## Megjegyzés

- Érdemes utánanézni az MVC mintának.
- Lásd még: repository pattern, service layer.
