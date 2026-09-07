---
id: v8-database
title: 8.1 Adatbázis táblák - classes és students
sidebar_label: 8.1 Adatbázis
slug: /form-evolucio/v8-database
---

# 8.1 Adatbázis táblák: classes és students

A szülő–gyerek kapcsolat megvalósításának első lépése az adatbázis megfelelő felépítése. Ebben a fejezetben létrehozzuk az **osztályok** és a **diákok** tábláit, és definiáljuk a közöttük lévő 1:N kapcsolatot.

Az 1:N kapcsolat azt jelenti, hogy **egy osztályhoz több diák tartozhat**, de egy diák **csak egyetlen osztályba jár**. Ezt az adatbázisban a `students` tábla `class_id` mezője biztosítja.

---

## Classes tábla

Az osztályok adatait a `classes` tábla tárolja. A mezők:

- **id** – egyedi azonosító  
- **year** – az osztály tanéve (pl. 2025)  
- **grade** – évfolyam száma (9–13)  
- **letter** – osztály betűjele (A, B, C, P stb.)

### SQL

```sql
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    grade INT NOT NULL CHECK (grade BETWEEN 9 AND 13),
    letter VARCHAR(1) NOT NULL
);
```

A `grade` mező numerikus, és csak 9 és 13 közötti értéket fogadhat el. Ez a középiskolai évfolyamoknak felel meg.

---

## Students tábla

A diákok adatait a `students` tábla tárolja. A mezők:

- **id** – egyedi azonosító
- **class_id** – hivatkozás a classes.id mezőre
- **name** – a diák neve
- **birthdate** – születési dátum

### SQL

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
```

A `class_id` mező biztosítja a kapcsolatot az osztályok és a diákok között.  
Az `ON DELETE CASCADE` miatt, ha egy osztályt törlünk, a hozzá tartozó diákok is automatikusan törlődnek.

---

## Példa adatok

### Osztályok

| id | year | grade | letter |
|----|------|--------|--------|
| 1  | 2025 | 12     | P      |
| 2  | 2024 | 10     | A      |
| 3  | 2024 | 11     | B      |

### Diákok

| id | class_id | name            | birthdate   |
|----|----------|-----------------|-------------|
| 1  | 1        | Kovács Anna     | 2007-03-12  |
| 2  | 1        | Szabó Márton    | 2007-11-02  |
| 3  | 2        | Kiss Petra      | 2008-05-22  |

---

## Mit építünk tovább?

A következő fejezetben (8.2) elkészítjük a **ClassModel** és **StudentModel** osztályokat, amelyek PDO segítségével érik el ezeket a táblákat. Ezekre épül majd a teljes osztály–diák modul.
