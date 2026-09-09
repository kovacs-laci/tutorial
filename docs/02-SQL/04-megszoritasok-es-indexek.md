---
id: sql-megszoritasok-es-indexek
slug: /sql/megszoritasok-es-indexek/megszoritasok
title: "Megszorítások és indexek"
---
# SQL Megszorítások és Indexek

## NOT NULL

### Definíció
Biztosítja, hogy egy oszlop nem fogad el `NULL` értéket.  
Így minden rekordnál kötelező értéket megadni.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus NOT NULL
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Employees_Test (
    EmpID INT NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    FirstName VARCHAR(20) NOT NULL,
    City VARCHAR(20)
);
```

---

## UNIQUE

### Definíció
Biztosítja, hogy egy oszlop minden értéke különböző legyen.  
Több `UNIQUE` megkötés is lehet egy táblában.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus UNIQUE
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Suppliers_Test (
    SupplierID INT NOT NULL UNIQUE,
    SupplierName VARCHAR(50) NOT NULL,
    City VARCHAR(20),
    Country VARCHAR(15)
);
```

---

## PRIMARY KEY

### Definíció
Az elsődleges kulcs egyedileg azonosítja a táblázat minden rekordját.  
Nem lehet `NULL`, automatikusan `UNIQUE`.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus PRIMARY KEY
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Categories_Test (
    CategoryID INT NOT NULL PRIMARY KEY,
    CategoryName VARCHAR(25) NOT NULL
);
```

---

## FOREIGN KEY

### Definíció
Kapcsolatot hoz létre két tábla között.  
Megakadályozza, hogy olyan adat kerüljön be, ami nem létezik a hivatkozott táblában.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus,
    FOREIGN KEY (oszlop_nev) REFERENCES masik_tabla(oszlop)
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Orders_Test (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

---

## CHECK

### Definíció
Biztosítja, hogy egy oszlop értékei megfeleljenek egy feltételnek.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus CHECK (feltétel)
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Products_Test (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Price DECIMAL(10,2) CHECK (Price > 0)
);
```

---

## DEFAULT

### Definíció
Alapértelmezett értéket állít be egy oszlophoz, ha nincs megadva érték.

**Szintaxis**
```sql
CREATE TABLE tabla_nev (
    oszlop_nev adattipus DEFAULT alapertelmezett_ertek
);
```

**Példa (Northwind)**
```sql
CREATE TABLE Customers_Test (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50),
    Country VARCHAR(15) DEFAULT 'Hungary'
);
```

---

## CREATE INDEX

### Definíció
Az indexek gyorsítják a lekérdezéseket.  
Nem adatmegkötés, hanem teljesítmény-optimalizáló szerkezeti elem.

**Szintaxis**
```sql
CREATE INDEX index_nev
ON tabla_nev(oszlop_nev);
```

**Példa (Northwind)**
```sql
CREATE TABLE Customers_IndexPractice AS
SELECT * FROM Customers;

CREATE INDEX idx_city
ON Customers_IndexPractice(City);

SHOW INDEX FROM Customers_IndexPractice;
DROP INDEX idx_city ON Customers_IndexPractice;
DROP TABLE Customers_IndexPractice;
```

---

## Gyakorló feladatok

1. Készíts táblát, amelyben a `CustomerID` elsődleges kulcs, a `CustomerName` kötelező, az `Email` pedig egyedi.
2. Hozz létre indexet a gyakorlótábla `Country` oszlopára.
3. Ellenőrizd, majd töröld az indexet és a táblát.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása
DROP TABLE IF EXISTS Customers_ConstraintPractice;

CREATE TABLE Customers_ConstraintPractice (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Country VARCHAR(15) DEFAULT 'Hungary'
);

CREATE INDEX idx_practice_country
ON Customers_ConstraintPractice(Country);

-- 2. feladat megoldása
SHOW INDEX FROM Customers_ConstraintPractice;
-- 3. feladat megoldása
DROP INDEX idx_practice_country ON Customers_ConstraintPractice;
DROP TABLE Customers_ConstraintPractice;
```
</details>