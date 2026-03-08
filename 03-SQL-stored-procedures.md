---
id: sql-tarolt-eljarasok
slug: /sql-tarolt-eljarasok
title: "SQL tárolt eljárások"
---

# Stored Procedures / Tárolt eljárások
A tárolt eljárás egy előkészített SQL‑kód, amelyet elmenthetünk, így újra és újra felhasználható.  
Paramétereket is átadhatunk, így az eljárás az átadott értékek alapján cselekszik.

---
## Tárolt eljárás létrehozása
**Szintaktika**

***MS SQL Server***
```sql
CREATE PROCEDURE procedure_name
AS
sql_statement
GO;

-- Használat:
EXEC procedure_name;
```

***MySql***
```sql
CREATE PROCEDURE sp_name(parameter_list)
BEGIN
  statements;
END;
```

Ha már létező eljárást hozunk létre, hiba keletkezik.  
Elkerülésére használható az `IF NOT EXISTS` klauzula:

```sql
CREATE PROCEDURE [IF NOT EXISTS] sp_name (proc_parameter[,...])
routine_body;
```

---

**Példák**

***MS SQL Server***
```sql
CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;

-- Használat:
EXEC SelectAllCustomers;
```

***MySql***
```sql
DELIMITER $$
CREATE PROCEDURE GetCustomers()
BEGIN
  SELECT customerName, city, state, postalCode, country
  FROM customers
  ORDER BY customerName;
END$$
DELIMITER ;

-- Meghívás:
CALL GetCustomers();
```

---

**MySQL tárolt eljárások előnyei**
- Csökkenti a hálózati forgalmat
- Üzleti logika központosítása az adatbázisban
- Biztonságosabb adatbázis‑hozzáférés

---

**MySQL tárolt eljárások hátrányai**
- Magas memória‑ és CPU‑használat
- Nehézkes hibakeresés
- Karbantartási nehézségek

---
## Tárolt eljárás törlése
### DROP PROCEDURE

**Szintaktika**
```sql
DROP PROCEDURE [IF EXISTS] sp_name;
```

Ha az `IF EXISTS` nélkül törlünk egy nem létező eljárást, hiba keletkezik.  
Az `IF EXISTS` használatával csak figyelmeztetés jelenik meg.

---

## Tárolt eljárások paraméterei
A paraméterek lehetnek: **IN**, **OUT**, **INOUT**.  
Az eljárások vezérlésáramlási utasításokat is tartalmazhatnak (IF, CASE, LOOP).

---

### IN paraméterek
```sql
DELIMITER //
CREATE PROCEDURE GetCustomersByCountry(IN countryName VARCHAR(255))
BEGIN
  SELECT *
  FROM customers
  WHERE country = countryName;
END //
DELIMITER ;
```

---

### OUT paraméterek
```sql
DELIMITER $$
CREATE PROCEDURE GetOrderedProductCount (
  IN productName VARCHAR(25),
  OUT total INT
)
BEGIN
  SELECT SUM(od.quantity)
  INTO total
  FROM orderdetails od
  JOIN orders o ON o.OrderID = od.OrderID
  JOIN products p ON p.ProductID = od.ProductID
  WHERE p.ProductName = productName;
END$$
DELIMITER ;

-- Használat:
CALL GetOrderedProductCount('Tofu', @total);
SELECT @total;
```

---

### INOUT paraméterek
```sql
DELIMITER $$
CREATE PROCEDURE SetCounter (
  INOUT counter INT,
  IN inc INT
)
BEGIN
  SET counter = counter + inc;
END$$
DELIMITER ;

-- Használat:
SET @counter = 1;
CALL SetCounter(@counter, 1); -- 2
CALL SetCounter(@counter, 1); -- 3
CALL SetCounter(@counter, 5); -- 8
SELECT @counter;              -- 8
```

---

## Tárolt eljárás módosítása
Az `ALTER PROCEDURE` nem támogatja a módosítást.  
Megoldás: töröljük az eljárást (`DROP PROCEDURE`), majd hozzuk létre újra (`CREATE PROCEDURE`).

---


---

## Megoldás 1
```sql
SELECT SUM(od.quantity), p.productName, MONTH(o.orderDate)
FROM orderdetails od
JOIN orders o ON o.OrderID = od.OrderID
JOIN products p ON p.ProductID = od.ProductID
GROUP BY p.ProductName, MONTH(o.orderDate)
ORDER BY p.ProductName, MONTH(o.orderDate);
```

---

## Megoldás 2
```sql
DROP PROCEDURE IF EXISTS getMonthlyOrderQuantityByProduct;
DELIMITER //
CREATE PROCEDURE getMonthlyOrderQuantityByProduct (
  IN productName VARCHAR(50),
  IN monthNr INT,
  OUT total INT
)
BEGIN
  SELECT SUM(od.quantity)
  INTO total
  FROM orderdetails od
  JOIN orders o ON o.OrderID = od.OrderID
  JOIN products p ON p.ProductID = od.ProductID
  WHERE p.ProductName = productName
    AND MONTH(o.orderDate) = monthNr
  GROUP BY p.ProductName, MONTH(o.orderDate)
  ORDER BY p.ProductName, MONTH(o.orderDate);
END //
DELIMITER ;

-- Használat:
CALL getMonthlyOrderQuantityByProduct('Tofu', 7, @total);
SELECT @total;
```

---

# SHOW PROCEDURE STATUS

**Szintaktika**
```sql
SHOW PROCEDURE STATUS
[LIKE 'pattern' | WHERE search_condition];
```

**Példák**
```sql
SHOW PROCEDURE STATUS;
SHOW PROCEDURE STATUS WHERE db = 'northwind';
SHOW PROCEDURE STATUS LIKE '%Order%';
```

---

# Változók

## Deklarálás
```sql
DECLARE variable_name datatype(size) [DEFAULT default_value];

-- Példa:
DECLARE totalSale DEC(10,2) DEFAULT 0.0;
```

Több változó egyszerre:
```sql
DECLARE x, y INT DEFAULT 0;
```

---

## Értékadás
```sql
DECLARE total INT DEFAULT 0;
SET total = 10;
```

Lekérdezés eredményének hozzárendelése:
```sql
DECLARE productCount INT DEFAULT 0;

SELECT COUNT(*)
INTO productCount
FROM products;
```

---

## Hatókör
- A változó az eljárás végéig él.
- BEGIN…END blokkon belül deklarált változó az END után megszűnik.
- Azonos nevű változók külön hatókörben létezhetnek, de nem ajánlott.
- `@`‑val kezdődő változó session változó, a munkamenet végéig él.

---

## Példa
```sql
DELIMITER $$
CREATE PROCEDURE GetTotalOrder()
BEGIN
  DECLARE totalOrder INT DEFAULT 0;
  SELECT COUNT(*) INTO totalOrder FROM orders;
  SELECT totalOrder;
END$$
DELIMITER ;
```
