---
id: sql-ddl
slug: /sql-ddl
title: "SQL Adatdefiníciós Nyelv (DDL)"
---
# SQL Adatdefiníciós Nyelv (DDL) – Szerkezetkezelés

Készítette: Kovács László  
Forrás: https://www.w3schools.com/

---

## Tartalomjegyzék

- [CREATE DATABASE](#21-create-database)
- [DROP DATABASE](#22-drop-database)
- [BACKUP DATABASE](#23-backup-database)
- [CREATE TABLE](#24-create-table)
- [DROP TABLE](#25-drop-table)
- [TRUNCATE TABLE](#26-truncate-table)
- [ALTER TABLE](#27-alter-table)

---

## 2.1 CREATE DATABASE

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

## 2.2 DROP DATABASE

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

## 2.3 BACKUP DATABASE (SQL Server)

### Definíció
Biztonsági másolat készítése egy meglévő adatbázisról.

**Szintaxis**
```sql
BACKUP DATABASE adatbazis_nev
TO DISK = 'filepath';
```

**Differenciális mentés**
```sql
BACKUP DATABASE adatbazis_nev
TO DISK = 'filepath'
WITH DIFFERENTIAL;
```

**Példák**
```sql
BACKUP DATABASE Northwind
TO DISK = 'D:\backups\Northwind_full.bak';

BACKUP DATABASE Northwind
TO DISK = 'D:\backups\Northwind_diff.bak'
WITH DIFFERENTIAL;
```

---

## 2.4 CREATE TABLE

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
    CompanyName NVARCHAR(40) NOT NULL,
    City NVARCHAR(20),
    Country NVARCHAR(20)
);
```

**Másolás meglévő táblából**
```sql
CREATE TABLE Customers_Copy AS
SELECT CustomerID, CompanyName, ContactName
FROM Customers;
```

---

## 2.5 DROP TABLE

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

## 2.6 TRUNCATE TABLE

### Definíció
Törli a táblán belüli összes adatot, de a szerkezetet megtartja.

**Szintaxis**
```sql
TRUNCATE TABLE tabla_nev;
```

**Példa**
```sql
TRUNCATE TABLE Orders;
```

---

## 2.7 ALTER TABLE

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
ALTER COLUMN oszlop_nev új_adattipus;
```

**Példák (Northwind)**
```sql
ALTER TABLE Employees
ADD BirthDate DATE;

ALTER TABLE Employees
DROP COLUMN BirthDate;

ALTER TABLE Employees
ALTER COLUMN City NVARCHAR(50);
```

---
