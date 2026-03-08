---
id: sql-select
slug: /sql-select
title: "SQL Lekérdezések (SELECT)"
---
# SQL Lekérdezések (SELECT) – Szűrés, Rendezés és Függvények

Készítette: Kovács László  
Forrás: https://www.w3schools.com/

---

## 5.1 SELECT utasítás

### Definíció
Az adatok lekérdezésére szolgál. Az eredmény egy **eredménykészlet**.

**Szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name;
```

Minden oszlop kiválasztása:
```sql
SELECT * FROM table_name;
```

**Példák (Northwind)**
```sql
SELECT CustomerName, City, Country FROM Customers;
SELECT * FROM Customers;
```

---

## 5.2 SELECT DISTINCT

### Definíció
Csak különböző (eltérő) értékek visszaadására szolgál.

**Szintaxis**
```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

**Példák (Northwind)**
```sql
SELECT DISTINCT Country FROM Customers;
SELECT COUNT(DISTINCT Country) FROM Customers;
```

---

## 5.3 WHERE kulcsszó

### Definíció
A rekordok szűrésére szolgál, csak azokat adja vissza, amelyek megfelelnek a feltételnek.

**Szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

> Megjegyzés: A `WHERE` nemcsak `SELECT`, hanem `UPDATE`, `DELETE` utasításokban is használható.

**Példák (Northwind)**
```sql
SELECT * FROM Customers WHERE Country = 'Mexico';
SELECT * FROM Customers WHERE CustomerID = 1;
```

---

## 5.4 A WHERE kulcsszóval használható operátorok

| Operátor | Leírás |
| --- | --- |
| `=` | Egyenlő |
| `>` | Nagyobb mint |
| `<` | Kisebb mint |
| `>=` | Nagyobb vagy egyenlő |
| `<=` | Kisebb vagy egyenlő |
| `<>` | Nem egyenlő *(egyes SQL verziókban: `!=`)* |
| `BETWEEN` | Megadott értékek között |
| `LIKE` | Minta keresése |
| `IN` | Több lehetséges érték megadása |

**Példák (Northwind)**
```sql
SELECT * FROM Products WHERE Price = 18;
SELECT * FROM Products WHERE Price BETWEEN 50 AND 60;
SELECT * FROM Customers WHERE City LIKE 's%';
SELECT * FROM Customers WHERE City IN ('Paris','London');
```

---

## 5.5 AND, OR és NOT operátorok

### Definíció
A `WHERE` feltételek kombinálására szolgálnak.

- **AND** – minden feltétel igaz legyen.
- **OR** – bármely feltétel igaz lehet.
- **NOT** – a feltétel ne legyen igaz.

**Szintaxis (AND)**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 AND condition2;
```

**Példa (Northwind)**
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' AND City = 'Berlin';
```

**Szintaxis (OR)**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 OR condition2;
```

**Példa (Northwind)**
```sql
SELECT * FROM Customers
WHERE City = 'Berlin' OR City = 'Stuttgart';
```

**Szintaxis (NOT)**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE NOT condition;
```

**Példa (Northwind)**
```sql
SELECT * FROM Customers
WHERE NOT Country = 'Germany';
```

**Kombinált példa**
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' AND (City = 'Berlin' OR City = 'Stuttgart');
```

---

## 5.6 ORDER BY kulcsszó

### Definíció
Az eredményhalmaz rendezésére szolgál növekvő (`ASC`) vagy csökkenő (`DESC`) sorrendben.

**Szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 ASC|DESC, column2 ASC|DESC;
```

**Példák (Northwind)**
```sql
-- Növekvő sorrend
SELECT * FROM Customers ORDER BY Country;

-- Csökkenő sorrend
SELECT * FROM Customers ORDER BY Country DESC;

-- Több oszlop szerint
SELECT * FROM Customers ORDER BY Country, CustomerName;

-- Vegyes sorrend
SELECT * FROM Customers ORDER BY Country ASC, CustomerName DESC;
```

---
