---
id: pdo-lekerdezesek-oop
slug: /php-alapok/pdo-lekerdezesek-oop
title: "OOP alapú lekérdezések PDO-val"
---

# OOP alapú lekérdezések PDO-val

Ebben a fejezetben az adatbázis‑lekérdezéseket objektumorientált módon szervezzük.  

A cél, hogy bemutassuk:

- hogyan épül fel egy modell osztály
- hogyan kezeljük a lekérdezéseket metódusokba szervezve
- hogyan használjuk a nevesített paramétereket biztonságosan

---

# Diak modell osztály

```php
<?php
class Diak {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function osszes() {
        return $this->pdo
            ->query("SELECT * FROM diakok")
            ->fetchAll();
    }

    public function egy($id) {
        $sql = "SELECT * FROM diakok WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":id" => $id]);
        return $stmt->fetch();
    }

    public function keresNevSzerint($kulcsszo) {
        $sql = "SELECT * FROM diakok WHERE nev LIKE :kulcsszo";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ":kulcsszo" => "%$kulcsszo%"
        ]);
        return $stmt->fetchAll();
    }

    public function korFelett($kor) {
        $sql = "SELECT * FROM diakok WHERE kor > :kor";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":kor" => $kor]);
        return $stmt->fetchAll();
    }

    public function atlagKor() {
        $sql = "SELECT AVG(kor) AS atlag FROM diakok";
        return $this->pdo->query($sql)->fetch();
    }
}
```

---

# Példák használatra

```php
$db = new Database();
$diakModel = new Diak($db->kapcsolat());

$osszes = $diakModel->osszes();
$egy = $diakModel->egy(3);
$kereses = $diakModel->keresNevSzerint("a");
$idosebbek = $diakModel->korFelett(18);
$atlag = $diakModel->atlagKor();
```

---

# Mini projekt – „Diák statisztikák”

Készíts oldalt, amely:

- kiírja az összes diákot
- kiírja a 18 év felettieket
- keresőmezőt biztosít név alapján
- kiírja az átlagéletkort

---

# Gyakorlófeladatok

1. Készíts metódust, amely visszaadja a legfiatalabb diákot.
2. Készíts metódust, amely visszaadja a legidősebb diákot.
3. Készíts metódust, amely megszámolja, hány diák jár egy adott osztályba.
4. Készíts metódust, amely név szerint rendezi a diákokat.

---

## Megjegyzés

- Érdemes utánanézni a DAO (Data Access Object) mintának.
- Lásd még: Active Record vs. Repository pattern.
