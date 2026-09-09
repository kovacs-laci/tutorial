---
id: sql-adatbazis-es-ddl
slug: /sql/adatbazis-es-ddl/adatbazis-es-tablak
title: "Adatbázisok és táblák (DDL)"
---
# SQL Adatdefiníciós Nyelv (DDL) – Szerkezetkezelés

## CREATE DATABASE

### Definíció
Új adatbázis létrehozására szolgál.

**Szintaxis**
```sql
CREATE DATABASE adatbazis_nev;
```

> Tipp: Győződjünk meg róla, hogy admin jogosultsággal rendelkezünk.

**Példa**
```sql
CREATE DATABASE TestDB;
SHOW DATABASES;
```

---

## DROP DATABASE

### Definíció
Meglévő adatbázis törlésére szolgál.

**Szintaxis**
```sql
DROP DATABASE adatbazis_nev;
```

> Figyelem: Az adatbázis törlése minden adat végleges elvesztését okozza.

**Példa**
```sql
DROP DATABASE TestDB;
SHOW DATABASES;
```

---

## CREATE TABLE

### Definíció
Új tábla létrehozására szolgál.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop1 adattipus [megszorítás],
    oszlop2 adattipus [megszorítás],
    ...
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Suppliers_Test (
    SupplierID INT PRIMARY KEY,
    SupplierName VARCHAR(50) NOT NULL,
    City VARCHAR(20),
    Country VARCHAR(15)
);
```

**Másolás meglévő táblából**
```sql
CREATE TABLE Customers_Copy AS
SELECT CustomerID, CustomerName, ContactName
FROM Customers;
```

---

## DROP TABLE

### Definíció
Meglévő tábla törlésére szolgál.

**Szintaxis**
```sql
DROP TABLE tabla_nev;
```

**Példa**
```sql
DROP TABLE Suppliers_Test;
```

---

## TRUNCATE TABLE

### Definíció
Törli a táblán belüli összes adatot, de a szerkezetet megtartja.

**Szintaxis**
```sql
TRUNCATE TABLE tabla_nev;
```

**Példa**
```sql
CREATE TABLE Orders_Practice AS SELECT * FROM Orders;
TRUNCATE TABLE Orders_Practice;
DROP TABLE Orders_Practice;
```

---

## ALTER TABLE

### Definíció
Meglévő táblák szerkezetének módosítására szolgál.

**Szintaxis – oszlop hozzáadása**
```sql
ALTER TABLE tabla_nev
ADD oszlop_nev adattipus;
```

**Szintaxis – oszlop törlése**
```sql
ALTER TABLE tabla_nev
DROP COLUMN oszlop_nev;
```

**Szintaxis – adattípus módosítása**
```sql
ALTER TABLE tabla_nev
MODIFY COLUMN oszlop_nev új_adattipus;
```

**Példák (Northwind)**
```sql
ALTER TABLE Employees
ADD COLUMN PracticeNote VARCHAR(100);

ALTER TABLE Employees
MODIFY COLUMN PracticeNote VARCHAR(150);

ALTER TABLE Employees
DROP COLUMN PracticeNote;
```

---

## Gyakorló feladatok

1. Készíts `Products_Practice` táblát a `Products` tábla `ProductID`, `ProductName` és `Price` oszlopaival.
2. Adj hozzá egy `PracticeNote` oszlopot, módosítsd a típusát, majd töröld az oszlopot.
3. Töröld a gyakorlótáblát a feladat végén.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása
DROP TABLE IF EXISTS Products_Practice;

CREATE TABLE Products_Practice AS
SELECT ProductID, ProductName, Price
FROM Products;

ALTER TABLE Products_Practice
ADD COLUMN PracticeNote VARCHAR(50);

-- 2. feladat megoldása
ALTER TABLE Products_Practice
MODIFY COLUMN PracticeNote VARCHAR(100);

ALTER TABLE Products_Practice
DROP COLUMN PracticeNote;

-- 3. feladat megoldása
DROP TABLE Products_Practice;
```
</details>
