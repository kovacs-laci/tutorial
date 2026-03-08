---
id: v8-models
title: 8.2 ClassModel és StudentModel
sidebar_label: 8.2 Modellek
slug: /form-evolucio/v8-models
---

# 8.2 ClassModel és StudentModel (PDO alapú modellek)

A szülő–gyerek kapcsolat működésének alapja a két modell: az **osztályokat kezelő ClassModel**, valamint a **diákokat kezelő StudentModel**. Ezek az osztályok felelnek az adatbázis‑műveletekért (lekérdezés, beszúrás, módosítás, törlés), és a későbbi controller réteg ezekre épít.

A modellek felépítése teljesen megegyezik a korábban megismert SubjectModel mintájával, így ismerős szerkezetet követünk.

---

## ClassModel

A ClassModel feladata az osztályok adatainak kezelése.  
A legfontosabb funkciók:

- összes osztály lekérése,
- egy adott év osztályainak lekérése,
- elérhető évek listázása,
- egy osztály megkeresése,
- új osztály létrehozása,
- meglévő osztály módosítása,
- osztály törlése.

### ClassModel kódja

```php
<?php

class ClassModel
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Összes osztály lekérése
    public function getAll()
    {
        return $this->pdo
            ->query("SELECT * FROM classes ORDER BY year DESC, grade, letter")
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    // Elérhető évek lekérése (pl. 2025, 2024, 2023...)
    public function getYears()
    {
        return $this->pdo
            ->query("SELECT DISTINCT year FROM classes ORDER BY year DESC")
            ->fetchAll(PDO::FETCH_COLUMN);
    }

    // Osztályok lekérése egy adott év alapján
    public function getClassesByYear($year)
    {
        $stmt = $this->pdo->prepare("
            SELECT id, grade, letter 
            FROM classes 
            WHERE year = :year 
            ORDER BY grade, letter
        ");
        $stmt->execute(['year' => $year]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Egy osztály lekérése ID alapján
    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM classes WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Új osztály létrehozása
    public function create($year, $grade, $letter)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO classes (year, grade, letter) 
            VALUES (:year, :grade, :letter)
        ");
        $stmt->execute([
            'year' => $year,
            'grade' => $grade,
            'letter' => $letter
        ]);
    }

    // Osztály módosítása
    public function update($id, $year, $grade, $letter)
    {
        $stmt = $this->pdo->prepare("
            UPDATE classes 
            SET year = :year, grade = :grade, letter = :letter 
            WHERE id = :id
        ");
        $stmt->execute([
            'id' => $id,
            'year' => $year,
            'grade' => $grade,
            'letter' => $letter
        ]);
    }

    // Osztály törlése
    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM classes WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}
```

---

## StudentModel

A StudentModel a diákok kezeléséért felel.  
A legfontosabb funkciók:

- diákok lekérése egy adott osztályból,
- egy diák megkeresése,
- új diák létrehozása,
- meglévő diák módosítása,
- diák törlése.

### StudentModel kódja

```php
<?php

class StudentModel
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Diákok lekérése egy adott osztályból
    public function getByClass($classId)
    {
        $stmt = $this->pdo->prepare("
            SELECT id, name, birthdate 
            FROM students 
            WHERE class_id = :id
            ORDER BY name
        ");
        $stmt->execute(['id' => $classId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Egy diák lekérése ID alapján
    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM students WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Új diák létrehozása
    public function create($classId, $name, $birthdate)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO students (class_id, name, birthdate) 
            VALUES (:class_id, :name, :birthdate)
        ");
        $stmt->execute([
            'class_id' => $classId,
            'name' => $name,
            'birthdate' => $birthdate
        ]);
    }

    // Diák módosítása
    public function update($id, $classId, $name, $birthdate)
    {
        $stmt = $this->pdo->prepare("
            UPDATE students 
            SET class_id = :class_id, name = :name, birthdate = :birthdate 
            WHERE id = :id
        ");
        $stmt->execute([
            'id' => $id,
            'class_id' => $classId,
            'name' => $name,
            'birthdate' => $birthdate
        ]);
    }

    // Diák törlése
    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM students WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}
```

---

## Mit építünk tovább?

A következő fejezetben (8.3) elkészítjük a **ClassController** és **StudentController** osztályokat, amelyek a fenti modellekre építve kezelik:

- az osztályok CRUD műveleteit,
- a diákok CRUD műveleteit,
- valamint az AJAX/fetch/async végpontokat (év → osztály → diákok).
