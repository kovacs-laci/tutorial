---
id: sql-megszoritasok
slug: /sql-megszoritasok
title: "SQL Megszorítások és Indexek"
---
# SQL Megszorítások és Indexek

Készítette: Kovács László  
Forrás: https://www.w3schools.com/

---

## 3.1 NOT NULL

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
    LastName NVARCHAR(20) NOT NULL,
    FirstName NVARCHAR(20) NOT NULL,
    City NVARCHAR(20)
);
```

---

## 3.2 UNIQUE

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
    CompanyName NVARCHAR(40) NOT NULL,
    City NVARCHAR(20),
    Country NVARCHAR(20)
);
```

---

## 3.3 PRIMARY KEY

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
    CategoryName NVARCHAR(20) NOT NULL
);
```

---

## 3.4 FOREIGN KEY

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
    CustomerID NVARCHAR(5),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

---

## 3.5 CHECK

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
    ProductName NVARCHAR(40),
    Price DECIMAL(10,2) CHECK (Price > 0)
);
```

---

## 3.6 DEFAULT

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
    CustomerID NVARCHAR(5) PRIMARY KEY,
    CompanyName NVARCHAR(40),
    Country NVARCHAR(20) DEFAULT 'Hungary'
);
```

---

## 3.7 CREATE INDEX

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
CREATE INDEX idx_city
ON Customers(City);

CREATE UNIQUE INDEX idx_company
ON Suppliers(CompanyName);
```

---