---
id: sql-tarolt-eljarasok
slug: /sql/tarolt-eljarasok/tarolt-eljarasok
title: "Tárolt eljárások MySQL-ben"
---

# Tárolt eljárások MySQL-ben

A tárolt eljárás az adatbázisban elmentett, névvel meghívható SQL-program. Ez a lecke a projekt Northwind-scriptjével használt MySQL/MariaDB szintaxist követi.

## Egyszerű eljárás

A `DELIMITER` csak a kliensnek jelzi, hogy az eljárás belsejében lévő pontosvesszők ne zárják le túl korán a `CREATE PROCEDURE` utasítást.

```sql
DROP PROCEDURE IF EXISTS ListCustomers;
DELIMITER $$

CREATE PROCEDURE ListCustomers()
BEGIN
    SELECT CustomerID, CustomerName, City, Country
    FROM Customers
    ORDER BY CustomerName;
END$$

DELIMITER ;
CALL ListCustomers();
```

## IN paraméter

```sql
DROP PROCEDURE IF EXISTS CustomersByCountry;
DELIMITER $$

CREATE PROCEDURE CustomersByCountry(IN country_name VARCHAR(15))
BEGIN
    SELECT CustomerID, CustomerName, City
    FROM Customers
    WHERE Country = country_name
    ORDER BY City, CustomerName;
END$$

DELIMITER ;
CALL CustomersByCountry('Germany');
```

A paraméter nevének érdemes eltérnie az oszlop nevétől, így egyértelmű, hogy melyik érték érkezik kívülről.

## OUT paraméter

```sql
DROP PROCEDURE IF EXISTS CountOrdersForCustomer;
DELIMITER $$

CREATE PROCEDURE CountOrdersForCustomer(
    IN customer_id INT,
    OUT order_count INT
)
BEGIN
    SELECT COUNT(*)
    INTO order_count
    FROM Orders
    WHERE CustomerID = customer_id;
END$$

DELIMITER ;
CALL CountOrdersForCustomer(1, @order_count);
SELECT @order_count AS OrderCount;
```

## Összesítés tárolt eljárásban

Az ügyfél rendeléseinek és rendelési értékének összesítése:

```sql
DROP PROCEDURE IF EXISTS CustomerOrderSummary;
DELIMITER $$

CREATE PROCEDURE CustomerOrderSummary(IN customer_id INT)
BEGIN
    SELECT
        c.CustomerName,
        COUNT(DISTINCT o.OrderID) AS OrderCount,
        COALESCE(SUM(od.Quantity * p.Price), 0) AS TotalValue
    FROM Customers AS c
    LEFT JOIN Orders AS o ON o.CustomerID = c.CustomerID
    LEFT JOIN OrderDetails AS od ON od.OrderID = o.OrderID
    LEFT JOIN Products AS p ON p.ProductID = od.ProductID
    WHERE c.CustomerID = customer_id
    GROUP BY c.CustomerID, c.CustomerName;
END$$

DELIMITER ;
CALL CustomerOrderSummary(1);
```

## Eljárás törlése és ellenőrzése

```sql
DROP PROCEDURE IF EXISTS CustomerOrderSummary;
SHOW PROCEDURE STATUS
WHERE Db = DATABASE();
```

## Gyakorló feladatok

1. Készíts `ProductsByCategory(IN category_id INT)` eljárást.
2. Készíts `ProductsAbovePrice(IN minimum_price DECIMAL(10,2))` eljárást.
3. Készíts OUT paraméteres eljárást, amely visszaadja egy kategória termékszámát.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása: ProductsByCategory
DROP PROCEDURE IF EXISTS ProductsByCategory;
DELIMITER $$
CREATE PROCEDURE ProductsByCategory(IN category_id INT)
BEGIN
    SELECT ProductID, ProductName, Price
    FROM Products
    WHERE CategoryID = category_id
    ORDER BY ProductName;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ProductsAbovePrice;
-- 2. feladat megoldása: ProductsAbovePrice
DELIMITER $$
CREATE PROCEDURE ProductsAbovePrice(IN minimum_price DECIMAL(10,2))
BEGIN
    SELECT ProductName, Price
    FROM Products
    WHERE Price > minimum_price
    ORDER BY Price DESC;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS CountProductsInCategory;
-- 3. feladat megoldása: CountProductsInCategory
DELIMITER $$
CREATE PROCEDURE CountProductsInCategory(
    IN category_id INT,
    OUT product_count INT
)
BEGIN
    SELECT COUNT(*) INTO product_count
    FROM Products
    WHERE CategoryID = category_id;
END$$
DELIMITER ;
```
</details>

## További gyakorló feladatok

1. Készíts eljárást, amely egy ország ügyfeleit listázza.
2. Készíts eljárást, amely egy minimális ár feletti termékeket listázza.
3. Készíts OUT paraméteres eljárást egy kategória termékszámának visszaadására.

<details>
<summary>Megoldások</summary>

```sql
-- 1. feladat megoldása: CustomersByCountryPractice
DROP PROCEDURE IF EXISTS CustomersByCountryPractice;
DELIMITER $$
CREATE PROCEDURE CustomersByCountryPractice(IN country_name VARCHAR(15))
BEGIN
    SELECT CustomerID, CustomerName, City
    FROM Customers
    WHERE Country = country_name
    ORDER BY CustomerName;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ProductsAbovePricePractice;
-- 2. feladat megoldása: ProductsAbovePricePractice
DELIMITER $$
CREATE PROCEDURE ProductsAbovePricePractice(IN minimum_price DECIMAL(10, 2))
BEGIN
    SELECT ProductID, ProductName, Price
    FROM Products
    WHERE Price > minimum_price
    ORDER BY Price DESC;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS CountProductsPractice;
-- 3. feladat megoldása: CountProductsPractice
DELIMITER $$
CREATE PROCEDURE CountProductsPractice(
    IN category_id INT,
    OUT product_count INT
)
BEGIN
    SELECT COUNT(*) INTO product_count
    FROM Products
    WHERE CategoryID = category_id;
END$$
DELIMITER ;

CALL CustomersByCountryPractice('Germany');
CALL ProductsAbovePricePractice(30);
CALL CountProductsPractice(1, @product_count);
SELECT @product_count AS ProductCount;

DROP PROCEDURE CustomersByCountryPractice;
DROP PROCEDURE ProductsAbovePricePractice;
DROP PROCEDURE CountProductsPractice;
```
</details>
