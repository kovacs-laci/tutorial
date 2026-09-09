---
id: sql-osszetett-lekerdezesek
slug: /sql/osszetett-lekerdezesek/joinok-es-osszegzes
title: "JOIN-ok, alkérdések és összesítés"
---

# JOIN-ok, alkérdések és összesítés

A Northwind ereje a táblák közötti kapcsolatokban van. Először összekapcsoljuk a táblákat, majd az eredményt csoportosítjuk és összesítjük.

## INNER JOIN

Az összes rendelés ügyfélnevével:

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName
FROM Orders AS o
INNER JOIN Customers AS c ON c.CustomerID = o.CustomerID
ORDER BY o.OrderDate DESC;
```

## Többtáblás JOIN

Egy rendelés részletei terméknévvel és kategóriával:

```sql
SELECT
    o.OrderID,
    c.CustomerName,
    p.ProductName,
    od.Quantity,
    p.Price,
    od.Quantity * p.Price AS LineTotal
FROM Orders AS o
JOIN Customers AS c ON c.CustomerID = o.CustomerID
JOIN OrderDetails AS od ON od.OrderID = o.OrderID
JOIN Products AS p ON p.ProductID = od.ProductID
ORDER BY o.OrderID, p.ProductName;
```

## GROUP BY és HAVING

A legtöbb rendelést leadó ügyfelek:

```sql
SELECT c.CustomerID, c.CustomerName, COUNT(o.OrderID) AS OrderCount
FROM Customers AS c
JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerID, c.CustomerName
HAVING COUNT(o.OrderID) >= 5
ORDER BY OrderCount DESC;
```

A `WHERE` a csoportosítás előtt, a `HAVING` az összesítés után szűr.

## LEFT JOIN

Azok az ügyfelek is megjelennek, akik még nem rendeltek:

```sql
SELECT c.CustomerName, COUNT(o.OrderID) AS OrderCount
FROM Customers AS c
LEFT JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerID, c.CustomerName
ORDER BY OrderCount, c.CustomerName;
```

## Allekérdezés és EXISTS

Azok a termékek, amelyek legalább egy rendelésben szerepelnek:

```sql
SELECT p.ProductID, p.ProductName
FROM Products AS p
WHERE EXISTS (
    SELECT 1
    FROM OrderDetails AS od
    WHERE od.ProductID = p.ProductID
)
ORDER BY p.ProductName;
```

## UNION

Az ügyfelek és beszállítók városainak egyesített listája:

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

## Gyakorló feladatok

1. Listázd az egyes termékek kategórianevét is.
2. Számítsd ki kategóriánként az átlagos termékárat.
3. Listázd azokat az ügyfeleket, akiknek nincs rendelésük.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása
SELECT p.ProductName, c.CategoryName
FROM Products AS p
JOIN Categories AS c ON c.CategoryID = p.CategoryID;

-- 2. feladat megoldása
SELECT c.CategoryName, AVG(p.Price) AS AveragePrice
FROM Categories AS c
JOIN Products AS p ON p.CategoryID = c.CategoryID
GROUP BY c.CategoryID, c.CategoryName
ORDER BY AveragePrice DESC;

-- 3. feladat megoldása
SELECT c.CustomerID, c.CustomerName
FROM Customers AS c
LEFT JOIN Orders AS o ON o.CustomerID = c.CustomerID
WHERE o.OrderID IS NULL;
```
</details>

## További gyakorló feladatok

1. Listázd a rendeléseket az alkalmazott vezetéknevével.
2. Mutasd meg kategóriánként a termékek számát.
3. Keresd meg a legtöbb rendelést leadó ügyfelet.
4. Listázd azokat a termékeket, amelyek nem szerepelnek egyetlen rendelésben sem.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása
SELECT o.OrderID, o.OrderDate, e.FirstName, e.LastName
FROM Orders AS o
JOIN Employees AS e ON e.EmployeeID = o.EmployeeID
ORDER BY o.OrderDate;

-- 2. feladat megoldása
SELECT c.CategoryName, COUNT(p.ProductID) AS ProductCount
FROM Categories AS c
LEFT JOIN Products AS p ON p.CategoryID = c.CategoryID
GROUP BY c.CategoryID, c.CategoryName
ORDER BY ProductCount DESC, c.CategoryName;

-- 3. feladat megoldása
SELECT c.CustomerName, COUNT(o.OrderID) AS OrderCount
FROM Customers AS c
JOIN Orders AS o ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerID, c.CustomerName
ORDER BY OrderCount DESC, c.CustomerName
LIMIT 1;

-- 4. feladat megoldása
SELECT p.ProductID, p.ProductName
FROM Products AS p
LEFT JOIN OrderDetails AS od ON od.ProductID = p.ProductID
WHERE od.ProductID IS NULL
ORDER BY p.ProductName;
```
</details>
