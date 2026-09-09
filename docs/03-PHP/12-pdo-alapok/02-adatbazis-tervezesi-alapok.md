---
id: adatbazis-tervezesi-alapok
slug: /php/pdo-alapok/adatbazis-tervezesi-alapok
title: "Adatbázis-tervezési alapok"
---

# Adatbázis-tervezési alapok

A megbízható PDO-kódhoz előbb az adatbázis szerkezetét kell jól megtervezni.

## Kapcsolatok és megszorítások

A foreign key két tábla kapcsolatát védi. A `NOT NULL`, `UNIQUE` és `CHECK` megszorításokkal az adatbázis is ellenőrzi az adatok érvényességét.

```sql
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class_id INT NOT NULL,
    CONSTRAINT fk_students_class
        FOREIGN KEY (class_id) REFERENCES classes(id)
);
```

## Indexek

Indexet azokon az oszlopokon érdemes használni, amelyekre gyakran szűrünk, rendezünk vagy kapcsolunk. Az index gyorsíthatja a lekérdezést, de növeli az írási és tárhelyigényt is.

A következő PDO-leckékben ezeket a táblákat használjuk lekérdezésekhez és CRUD-műveletekhez.
