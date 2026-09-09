---
id: sql-northwind-gyakorlas
slug: /sql/gyakorlas/northwind
title: "Northwind SQL gyakorlás"
---

# Northwind SQL gyakorlás

A feladatokat a `static/files/install_northwind.sql` scriptből telepített adatbázison futtasd. Minden megoldás közvetlenül az adott feladat után, kattintásra jelenik meg.

## DDL: adatbázisok és táblák

### 1. feladat
Készíts másolatot a `Products` tábla három oszlopából `Products_Practice` néven.

<details>
<summary>Megoldás</summary>

```sql
DROP TABLE IF EXISTS Products_Practice;
CREATE TABLE Products_Practice AS
SELECT ProductID, ProductName, Price
FROM Products;
```
</details>

### 2. feladat
Adj hozzá egy `PracticeNote` nevű oszlopot, majd módosítsd a típusát.

<details>
<summary>Megoldás</summary>

```sql
ALTER TABLE Products_Practice
ADD COLUMN PracticeNote VARCHAR(50);

ALTER TABLE Products_Practice
MODIFY COLUMN PracticeNote VARCHAR(100);
```
</details>

### 3. feladat
Ellenőrizd a gyakorlótáblát, majd töröld.

<details>
<summary>Megoldás</summary>

```sql
DESCRIBE Products_Practice;
DROP TABLE Products_Practice;
```
</details>

## DML: beszúrás, módosítás és törlés

### 4. feladat
Készíts másolatot a `Customers` tábláról, és módosítsd az 1-es ügyfél városát `Budapest` értékre.

<details>
<summary>Megoldás</summary>

```sql
DROP TABLE IF EXISTS Customers_Practice;
CREATE TABLE Customers_Practice AS SELECT * FROM Customers;

UPDATE Customers_Practice
SET City = 'Budapest'
WHERE CustomerID = 1;
```
</details>

### 5. feladat
Szúrj be egy új gyakorló ügyfelet, majd kérdezd le a nevét és városát.

<details>
<summary>Megoldás</summary>

```sql
INSERT INTO Customers_Practice (CustomerName, ContactName, City, Country)
VALUES ('SQL gyakorló ügyfél', 'Teszt Elek', 'Budapest', 'Hungary');

SELECT CustomerName, City
FROM Customers_Practice
WHERE CustomerName = 'SQL gyakorló ügyfél';
```
</details>

### 6. feladat
Töröld a beszúrt tesztrekordot és a gyakorlótáblát.

<details>
<summary>Megoldás</summary>

```sql
DELETE FROM Customers_Practice
WHERE CustomerName = 'SQL gyakorló ügyfél';

DROP TABLE Customers_Practice;
```
</details>

## SELECT: szűrés és rendezés

### 7. feladat
Listázd a német ügyfelek nevét és városát város szerint rendezve.

<details>
<summary>Megoldás</summary>

```sql
SELECT CustomerName, City
FROM Customers
WHERE Country = 'Germany'
ORDER BY City, CustomerName;
```
</details>

### 8. feladat
Listázd a 10 és 30 közötti árú termékeket ár szerint növekvő sorrendben.

<details>
<summary>Megoldás</summary>

```sql
SELECT ProductName, Price
FROM Products
WHERE Price BETWEEN 10 AND 30
ORDER BY Price, ProductName;
```
</details>

### 9. feladat
Keresd meg azokat a termékeket, amelyek nevében szerepel a `chocolate` szó.

<details>
<summary>Megoldás</summary>

```sql
SELECT ProductID, ProductName, Price
FROM Products
WHERE ProductName LIKE '%chocolate%';
```
</details>

## SELECT: NULL, DISTINCT és aggregáció

### 10. feladat
Listázd azokat az ügyfeleket, akiknek nincs irányítószámuk.

<details>
<summary>Megoldás</summary>

```sql
SELECT CustomerName, City
FROM Customers
WHERE PostalCode IS NULL;
```
</details>

### 11. feladat
Listázd az ügyfelek különböző országait ábécésorrendben.

<details>
<summary>Megoldás</summary>

```sql
SELECT DISTINCT Country
FROM Customers
ORDER BY Country;
```
</details>

### 12. feladat
Mennyi ügyfél van országonként? Csak a legalább két ügyféllel rendelkező országokat jelenítsd meg.

<details>
<summary>Megoldás</summary>

```sql
SELECT Country, COUNT(*) AS CustomerCount
FROM Customers
GROUP BY Country
HAVING COUNT(*) >= 2
ORDER BY CustomerCount DESC, Country;
```
</details>

## JOIN-ok és kapcsolatok

### 13. feladat
Listázd a rendelésazonosítót, az ügyfél nevét és a rendelés dátumát.

<details>
<summary>Megoldás</summary>

```sql
SELECT o.OrderID, c.CustomerName, o.OrderDate
FROM Orders AS o
JOIN Customers AS c ON c.CustomerID = o.CustomerID
ORDER BY o.OrderDate, o.OrderID;
```
</details>

### 14. feladat
Listázd a rendeléseket az alkalmazott vezetéknevével.

<details>
<summary>Megoldás</summary>

```sql
SELECT o.OrderID, o.OrderDate, e.FirstName, e.LastName
FROM Orders AS o
JOIN Employees AS e ON e.EmployeeID = o.EmployeeID
ORDER BY o.OrderDate;
```
</details>

### 15. feladat
Listázd a termék nevét és kategóriáját.

<details>
<summary>Megoldás</summary>

```sql
SELECT p.ProductName, c.CategoryName
FROM Products AS p
JOIN Categories AS c ON c.CategoryID = p.CategoryID
ORDER BY c.CategoryName, p.ProductName;
```
</details>

## Összesítés és rendelési érték

### 16. feladat
Mutasd meg kategóriánként a termékek számát.

<details>
<summary>Megoldás</summary>

```sql
SELECT c.CategoryName, COUNT(p.ProductID) AS ProductCount
FROM Categories AS c
LEFT JOIN Products AS p ON p.CategoryID = c.CategoryID
GROUP BY c.CategoryID, c.CategoryName
ORDER BY ProductCount DESC, c.CategoryName;
```
</details>

### 17. feladat
Számítsd ki minden rendelés összértékét a termékár és a mennyiség szorzataként.

<details>
<summary>Megoldás</summary>

```sql
SELECT od.OrderID,
       SUM(od.Quantity * p.Price) AS OrderTotal
FROM OrderDetails AS od
JOIN Products AS p ON p.ProductID = od.ProductID
GROUP BY od.OrderID
ORDER BY OrderTotal DESC;
```
</details>

### 18. feladat
Keresd meg a legtöbb rendelést leadó ügyfelet.

<details>
<summary>Megoldás</summary>

```sql
SELECT c.CustomerName, COUNT(o.OrderID) AS OrderCount
FROM Customers AS c
JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerID, c.CustomerName
ORDER BY OrderCount DESC, c.CustomerName
LIMIT 1;
```
</details>

## Allekérdések és halmazműveletek

### 19. feladat
Listázd azokat a termékeket, amelyek drágábbak az összes termék átlagáránál.

<details>
<summary>Megoldás</summary>

```sql
SELECT ProductName, Price
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products)
ORDER BY Price DESC;
```
</details>

### 20. feladat
Listázd azokat a termékeket, amelyek még egyetlen rendelésben sem szerepeltek.

<details>
<summary>Megoldás</summary>

```sql
SELECT p.ProductID, p.ProductName
FROM Products AS p
LEFT JOIN OrderDetails AS od ON od.ProductID = p.ProductID
WHERE od.ProductID IS NULL
ORDER BY p.ProductName;
```
</details>

### 21. feladat
Készíts egyesített listát a vevők és beszállítók városairól, a forrás megjelölésével.

<details>
<summary>Megoldás</summary>

```sql
SELECT City, Country, 'Customer' AS Source
FROM Customers
WHERE City IS NOT NULL
UNION
SELECT City, Country, 'Supplier' AS Source
FROM Suppliers
WHERE City IS NOT NULL
ORDER BY Country, City;
```
</details>

## További önálló feladatok

22. Listázd a beszállítókat ország és név szerint.
23. Keresd meg a kategóriánkénti átlagos termékárat.
24. Készíts olyan lekérdezést, amely a rendelés részleteiben megjeleníti a terméket, a kategóriát és a sorértéket.

<details>
<summary>Megoldás a 22. feladathoz</summary>

```sql
SELECT SupplierName, Country, City
FROM Suppliers
ORDER BY Country, SupplierName;
```
</details>

<details>
<summary>Megoldás a 23. feladathoz</summary>

```sql
SELECT c.CategoryName, AVG(p.Price) AS AveragePrice
FROM Categories AS c
JOIN Products AS p ON p.CategoryID = c.CategoryID
GROUP BY c.CategoryID, c.CategoryName
ORDER BY AveragePrice DESC;
```
</details>

<details>
<summary>Megoldás a 24. feladathoz</summary>

```sql
SELECT od.OrderID,
       p.ProductName,
       c.CategoryName,
       od.Quantity * p.Price AS LineTotal
FROM OrderDetails AS od
JOIN Products AS p ON p.ProductID = od.ProductID
JOIN Categories AS c ON c.CategoryID = p.CategoryID
ORDER BY od.OrderID, p.ProductName;
```
</details>
---
