---
id: pdo-kapcsolat
slug: /php-alapok/pdo-kapcsolat
title: "PDO: Adatbázis kapcsolat létrehozása"
---

# PDO: Adatbázis kapcsolat létrehozása

A PDO (PHP Data Objects) egy egységes, biztonságos módja az adatbázisok kezelésének.  
A PDO használata ajánlott, mert:

- támogatja a prepared statementeket (SQL injection elleni védelem)
- többféle adatbázissal működik (MySQL, MariaDB, SQLite, stb.)
- modern, biztonságos, rugalmas

---

# Adatbázis kapcsolat létrehozása

```php
$dsn = "mysql:host=localhost;dbname=iskola;charset=utf8";
$felhasznalo = "root";
$jelszo = "";

try {
    $pdo = new PDO($dsn, $felhasznalo, $jelszo);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Sikeres kapcsolat!";
} catch (PDOException $e) {
    echo "Hiba: " . $e->getMessage();
}
```

---

# Fontos beállítások

## Hibatípus

```php
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Ez biztosítja, hogy a hibák kivételként jelenjenek meg.

## Karakterkódolás

A `charset=utf8` a DSN-ben biztosítja a helyes ékezetkezelést.

---

# Adatbázis létrehozása (példa)

```sql
CREATE DATABASE iskola CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

USE iskola;

CREATE TABLE diakok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100),
    kor INT
);
```

---

# Gyakorlófeladatok

1. Hozz létre egy új adatbázist `teszt` néven.
2. Készíts benne `felhasznalok` táblát (id, nev, email).
3. Írj PHP kódot, amely kapcsolódik az adatbázishoz.
4. Próbáld ki, mi történik, ha rossz jelszót adsz meg.

---

## Megjegyzés

- Érdemes utánanézni a PDO driver-ek listájának.
- Lásd még: DSN formátumok (MySQL, SQLite, PostgreSQL).
