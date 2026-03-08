---
id: adatbazis-terv
slug: /php-alapok/mini-projekt/adatbazis-terv
title: "Adatbázis terv"
---

# Mini projekt – Adatbázis terv

Mielőtt bármilyen kódot írnánk, fontos megérteni, hogy **milyen adatokat kezel a rendszer**, és hogyan épül fel az adatbázis.

Ez a fejezet bemutatja a School Management System első verziójának adatbázistervét.

---

# Tervezési szempontok

Az adatbázis legyen:

- egyszerű és könnyen érthető,
- jól bővíthető (tanárok, tantárgyak, jegyek),
- tiszta és normalizált,
- a projekt első verziójához elegendő.

A rendszer első verziója **egy táblát** használ: `students`.

---

# A students tábla

| Mező | Típus | Leírás |
|------|-------|--------|
| id | INT, PRIMARY KEY, AUTO_INCREMENT | Egyedi azonosító |
| name | VARCHAR(100) | A diák neve |
| age | INT | A diák életkora |
| class | VARCHAR(20) | Osztály (pl. „10.A”) |

Ez a tábla egyszerű, de minden fontos funkciót lefed.

---

# ER‑diagram (szöveges)

```
+-------------+
|  students   |
+-------------+
| id (PK)     |
| name        |
| age         |
| class       |
+-------------+
```

A projekt később bővíthető:

```
students (1) ---- (N) grades (N) ---- (1) subjects
```

De az első verzióban csak a `students` tábla szerepel.

---

# 🛠 SQL – Adatbázis létrehozása

```sql
CREATE DATABASE school CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;

USE school;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    class VARCHAR(20) NOT NULL
);
```

---

# Hogyan kapcsolódik a projekthez?

A `students` tábla adatait használja:

- a **Student modell** (SQL műveletek),
- a **StudentController** (logika),
- a **views/students** nézetek (megjelenítés).

Ez az adatbázis a teljes mini projekt alapja.

---

# Következő lépés

👉 **Mini projekt – Teljes OOP megoldás (MVC + Namespaces + Composer)**  
Itt építjük fel a működő alkalmazást.
```

---