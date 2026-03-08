---
id: northwind-practice
slug: /sql-northwind-practice
title: "SQL gyakorló feladatok – Northwind"
---

# SQL gyakorló feladatok – Northwind adatbázis

Az alábbi feladatok a Microsoft nyilvánosan elérhető **Northwind** adatbázisra vonatkoznak.
Az adatbázis dump fájlja >innen< letölthető.

---
## SELECT gyakorlás
**1. Válassza ki az összes olyan rekordot a `Customers` táblából,**
- **ahol a `City` oszlop értéke `"Berlin"`.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE City = 'Berlin';
```

</details>

---

- **ahol a `City` oszlop értéke **nem** `"Berlin"`.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE City <> 'Berlin';
```

</details>

---

- **ahol a `CustomerID` értéke `32`.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE CustomerID = 32;
```

</details>

---

- **ahol a `City` értéke `"Berlin"` **és** a `PostalCode` értéke `12209`.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE City = 'Berlin' AND PostalCode = '12209';
```

</details>

---

- **ahol a `City` értéke `"Berlin"` **vagy** `"London"`.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE City IN ('Berlin', 'London');
```

</details>

---

**2. Írjon egy utasítást, hogy megkapja az összes oszlopot a `Customers` táblából.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers;
```

</details>

---

**3. Írjon egy utasítást, amely leválogatja a `City` oszlopot a `Customers` táblából.**

<details>
<summary>Megoldás</summary>

```sql
SELECT City
FROM Customers;
```

</details>

---

**4. Válogassa le az összes _különböző_ értéket a `Country` oszlopból a `Customers` táblázatban.**

<details>
<summary>Megoldás</summary>

```sql
SELECT DISTINCT Country
FROM Customers;
```

</details>

---

## ORDER BY - rendezés

**Válassza ki az összes rekordot a Customers táblából, és rendezze az eredményt**

- abc-ben a City oszlop szerint.

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
ORDER BY City ASC;
```

</details>

- csökkenő sorrendben City szerint:
<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
ORDER BY City DESC;
```

</details>

- Country majd City szerint:
<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
ORDER BY Country, City;
```

</details>

---

**Szúrjon be egy új sort a `Customers` táblába**

<details>
<summary>Megoldás</summary>

```sql
INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Teszt Ügyfél', 'Budapest', 'Hungary');
```

</details>

---
## NULL, IS NULL
**1. Válogassa le az összes olyan rekordot a `Customers` táblából, ahol a `PostalCode` üres**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE PostalCode IS NULL;
```

</details>

---

**2. Válogassa le azokat, ahol a `PostalCode` NEM üres**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Customers
WHERE PostalCode IS NOT NULL;
```

</details>

---
## UPDATE
**A 32-es azonosítójú ügyfél városa legyen Oslo, országa Norway**

<details>
<summary>Megoldás</summary>

```sql
UPDATE Customers
SET City = 'Oslo', Country = 'Norway'
WHERE CustomerID = 32;
```

</details>

---
## DELETE
**Töröljük a norvég ügyfeleket**

<details>
<summary>Megoldás</summary>

```sql
DELETE FROM Customers
WHERE Country = 'Norway';
```

</details>

---
## LIMIT
**A `Products` táblából válasszuk ki a `Price` oszlop _legnagyobb_ értékével rendelkező rekordot.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Products
ORDER BY Price DESC
LIMIT 1;
```

</details>

---

**A `Products` táblából válasszuk ki a `Price` oszlop _legkisebb_ értékével rendelkező rekordot.**

<details>
<summary>Megoldás</summary>

```sql
SELECT *
FROM Products
ORDER BY Price ASC
LIMIT 1;
```

</details>

---
## COUNT
**A `Products` táblából adjuk vissza a megfelelő függvénnyel azon rekordok számát, amelyekben a `Price` értéke 18-ra van beállítva.**

<details>
<summary>Megoldás</summary>

```sql
SELECT COUNT(*)
FROM Products
WHERE Price = 18;
```

</details>

---

**18. Átlagár**

<details>
<summary>Megoldás</summary>

```sql
SELECT AVG(Price)
FROM Products;
```

</details>

---

**19. Összár**

<details>
<summary>Megoldás</summary>

```sql
SELECT SUM(Price)
FROM Products;
```

</details>

---

**20. LIKE operátor gyakorlás**

- város neve “ber”-rel kezdődik
```sql
SELECT * FROM Customers WHERE City LIKE 'ber%';
```

- város nevében “es” szerepel
```sql
SELECT * FROM Customers WHERE City LIKE '%es%';
```

- város “ondon”-nal végződik
```sql
SELECT * FROM Customers WHERE City LIKE '%ondon';
```

- város mintázat: L_n_on
```sql
SELECT * FROM Customers WHERE City LIKE 'L%n%on';
```

- város második betűje “a”
```sql
SELECT * FROM Customers WHERE City LIKE '_a%';
```

---

**21. IN operátor**

- ország Norway vagy France
```sql
SELECT * FROM Customers WHERE Country IN ('Norway','France');
```

- ország NEM Norway vagy France
```sql
SELECT * FROM Customers WHERE Country NOT IN ('Norway','France');
```

---

**22. BETWEEN operátor**

- ár 10 és 20 között, kivéve CategoryId 1,2,3
```sql
SELECT *
FROM Products
WHERE Price BETWEEN 10 AND 20
AND CategoryID NOT IN (1,2,3);
```

- terméknév Carnarvon Tigers és Mozzarella di Giovanni között
```sql
SELECT *
FROM Products
WHERE ProductName BETWEEN 'Carnarvon Tigers' AND 'Mozzarella di Giovanni'
ORDER BY ProductName ASC;
```

---

**23. JOIN gyakorlás**

- minden megrendeléshez ügyfél:
```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

- megrendelés + ügyfél + szállító:
```sql
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID;
```

- aliasokkal:
```sql
SELECT o.OrderID, c.CustomerName, s.ShipperName
FROM Orders o
INNER JOIN Customers c ON o.CustomerID = c.CustomerID
INNER JOIN Shippers s ON o.ShipperID = s.ShipperID;
```

---

**24. GROUP BY gyakorlás**

- ügyfelek száma országonként:
```sql
SELECT Country, COUNT(*) AS CustomerCount
FROM Customers
GROUP BY Country;
```

- ügyfelek száma országonként, csökkenő sorrendben:
```sql
SELECT Country, COUNT(*) AS CustomerCount
FROM Customers
GROUP BY Country
ORDER BY CustomerCount DESC;
```