---
id: sql
slug: /sql-alapok
title: "SQL alapok"
---

# SQL - Structured Query Language

Készítette: Kovács László  
Forrás: [w3schools.com](https://www.w3schools.com/)

---

## Az SQL nyelv utasításai
Az SQL nyelv utasításait általában logikailag csoportosítják. A szokásos kategóriák:

- **DDL** (Data Definition Language – Adatdefiníciós Nyelv)  
- **DML** (Data Manipulation Language – Adatmanipulációs Nyelv)  
- **DCL** (Data Control Language – Adatvezérlési Nyelv)  
- **TCL** (Transaction Control Language – Tranzakcióvezérlési Nyelv)  

---

## DDL 
(Data Definition Language – Adatdefiníciós Nyelv)
Az adatbázis szerkezetének definíciójára és módosítására szolgál.

**Példák:**
- `CREATE TABLE` – Tábla létrehozása  
- `ALTER TABLE` – Tábla módosítása  
- `DROP TABLE` – Tábla törlése  
- `CREATE INDEX` – Index létrehozása  
- `DROP INDEX` – Index törlése  

---

## DML 
(Data Manipulation Language – Adatmanipulációs Nyelv)
Az adatokkal történő műveletek végrehajtására szolgál.

**Példák:**
- `SELECT` – Adatok lekérdezése  
- `INSERT INTO` – Új adatok beszúrása  
- `UPDATE` – Létező adatok módosítása  
- `DELETE FROM` – Adatok törlése  

---

## DCL 
(Data Control Language – Adatvezérlési Nyelv)
Az adatok hozzáférési jogosultságainak kezelésére szolgál.

**Példák:**
- `GRANT` – Jogosultság adása  
- `REVOKE` – Jogosultság visszavonása  

---

## TCL 
(Transaction Control Language – Tranzakcióvezérlési Nyelv)
A tranzakciók kezelésére szolgál.

**Példák:**
- `COMMIT` – Tranzakció jóváhagyása  
- `ROLLBACK` – Tranzakció visszavonása  

**Mi az a tranzakció?**
Egy tranzakció egy vagy több adatbázis‑művelet sorozata, amelyet egyetlen logikai egységként kezelnek.  
Tulajdonságai: **ACID** (Atomicity, Consistency, Isolation, Durability).

---

## Az ACID tulajdonságok
- **Atomitás (Atomicity)** – teljes egészében vagy semmi  
- **Konzisztencia (Consistency)** – valid állapotból valid állapotba  
- **Izoláció (Isolation)** – tranzakciók elkülönítve futnak  
- **Tartósság (Durability)** – commit után az eredmények megmaradnak  


**Példa egy tranzakcióra**
Banki átutalás folyamata:  
1. Ellenőrzés – van‑e elég pénz  
2. Csökkentés – küldő számlájáról  
3. Növelés – címzett számláján  

Rollback esetén minden visszaáll, commit esetén tartósan mentődik.

---

## Néhány a legfontosabb SQL parancsok közül
- `SELECT` – adatok kinyerése  
- `UPDATE` – adatok frissítése  
- `DELETE` – adatok törlése  
- `INSERT INTO` – új adatok beillesztése  
- `CREATE DATABASE` – új adatbázis létrehozása  
- `ALTER DATABASE` – adatbázis módosítása  
- `CREATE TABLE` – új tábla létrehozása  
- `ALTER TABLE` – tábla módosítása  
- `DROP TABLE` – tábla törlése  
- `CREATE INDEX` – index létrehozása  
- `DROP INDEX` – index törlése  

---

## SELECT utasítás
Az adatok lekérdezésére szolgál.  
Az eredmény egy **eredménykészlet**.

**Szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name;
```

Ha minden oszlopot ki akarunk választani:
```sql
SELECT * FROM table_name;
```

**Példa**
```sql
SELECT CustomerName, City, Country FROM Customers;
SELECT * FROM Customers;
```

---

## SELECT DISTINCT utasítás
Csak különböző (eltérő) értékek visszaadására szolgál.

**Szintaxis**
```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

**Példa**
```sql
SELECT DISTINCT Country FROM Customers;
SELECT COUNT(DISTINCT Country) FROM Customers;
```

---

## WHERE kulcsszó
A **WHERE** kulcsszó a rekordok szűrésére szolgál.  
Csak azokat a rekordokat szűri le, amelyek megfelelnek egy megadott feltételnek.

**Szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

>Megjegyzés:  
>A WHERE kulcsszót nemcsak a `SELECT` utasításokban használhatjuk, hanem az `UPDATE`, `DELETE` stb. utasításokban is.

**Példák:**
```sql
SELECT * FROM Customers
WHERE Country = 'Mexico';

SELECT * FROM Customers
WHERE CustomerID = 1;
```

Az SQL egyszerű idézőjeleket ír elő a szöveges értékek körül. A numerikus mezőket azonban nem szabad idézőjelek közé zárni.

---

## A WHERE kulcsszóval használható operátorok

| Operator | Leírás |
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

**További példák**
```sql
SELECT * FROM Products WHERE Price = 18;
SELECT * FROM Products WHERE Price > 30;
SELECT * FROM Products WHERE Price < 30;
SELECT * FROM Products WHERE Price >= 30;
SELECT * FROM Products WHERE Price <= 30;
SELECT * FROM Products WHERE Price <> 18;
SELECT * FROM Products WHERE Price BETWEEN 50 AND 60;
SELECT * FROM Customers WHERE City LIKE 's%';
SELECT * FROM Customers WHERE City IN ('Paris','London');
```

---

## AND, OR és NOT operátorok
A WHERE záradék kombinálható az **AND**, **OR** és **NOT** operátorokkal.

- **AND** – akkor jelenít meg rekordot, ha minden feltétel igaz.
- **OR** – akkor jelenít meg rekordot, ha bármely feltétel igaz.
- **NOT** – akkor jelenít meg rekordot, ha a feltétel nem igaz.

**AND szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 AND condition2 AND condition3 ...;
```

**Példa**
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' AND City = 'Berlin';
```

---

**OR szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 OR condition2 OR condition3 ...;
```

**Példák:**
```sql
SELECT * FROM Customers
WHERE City = 'Berlin' OR City = 'Stuttgart';

SELECT * FROM Customers
WHERE Country = 'Germany' OR Country = 'Spain';
```

---

**NOT szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE NOT condition;
```

**Példa**
```sql
SELECT * FROM Customers
WHERE NOT Country = 'Germany';
```

### AND, OR és NOT kombinálása
Az operátorok kombinálhatók is.

**Példák**
```sql
SELECT * FROM Customers
WHERE Country = 'Germany' AND (City = 'Berlin' OR City = 'Stuttgart');

SELECT * FROM Customers
WHERE NOT Country = 'Germany' AND NOT Country = 'USA';
```


## ORDER BY kulcsszó
Az **ORDER BY** kulcsszó az eredményhalmaz növekvő vagy csökkenő sorrendbe rendezésére szolgál.

- Alapértelmezés: növekvő sorrend (ASC).
- Csökkenő sorrendhez a `DESC` kulcsszót használjuk.

**ORDER BY szintaxis**
```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

**ORDER BY példa**
A következő SQL utasítás kiválasztja az összes ügyfelet a `Customers` táblából, a `Country` oszlop szerint rendezve:

```sql
SELECT * FROM Customers
ORDER BY Country;
```

### Csökkenő sorrend
```sql
SELECT * FROM Customers
ORDER BY Country DESC;
```

### Több oszlop szerinti rendezés
Az alábbi példa először az ország (`Country`), majd az ügyfélnév (`CustomerName`) szerint rendezi az ügyfeleket:

```sql
SELECT * FROM Customers
ORDER BY Country, CustomerName;
```

### Vegyes sorrend
Az ország növekvő, az ügyfélnév csökkenő sorrendben:

```sql
SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;
```

---

## INSERT INTO utasítás
Az **INSERT INTO** utasítás új rekordok beszúrására szolgál egy táblázatba.

**INSERT INTO szintaktika**
Az utasítás kétféleképpen írható:

### Oszlopnevek megadásával
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### Oszlopnevek nélkül
Ha minden oszlophoz értéket adunk, nem kell megadni az oszlopneveket.  
Fontos: az értékek sorrendje meg kell egyezzen a táblázat oszlopainak sorrendjével.

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

---

**INSERT INTO példa**
Új rekord beszúrása a `Customers` táblába:

```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
```

>Megjegyzés:  
>A `CustomerID` mezőbe nem illesztettünk be számot, mert az **auto-increment** mező, és automatikusan generálódik.

### Adatok beszúrása csak megadott oszlopokba
Lehetőség van arra is, hogy csak bizonyos oszlopokba illesszünk be adatokat.

```sql
INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');
```

---

## NULL érték
Mi az a **NULL érték**?

A NULL értékkel rendelkező mező olyan mező, amelynek nincs értéke.  
Ha egy táblázatban egy mező opcionális, akkor lehetséges új rekordot beszúrni vagy frissíteni anélkül, hogy értéket adnánk a mezőhöz. Ekkor a mező NULL értékkel kerül elmentésre.

> Megjegyzés: 
> A NULL érték különbözik a nulla értéktől vagy a szóközöket tartalmazó mezőtől.  
> A NULL értékkel rendelkező mező olyan mező, amely a rekord létrehozása során üresen maradt.

### Hogyan teszteljük a NULL értékeket?
Nem lehetséges a NULL értékek tesztelése összehasonlító operátorokkal (pl. `=`, `<`, `<>`).  
Helyette az **IS NULL** és **IS NOT NULL** operátorokat kell használnunk.

**IS NULL és IS NOT NULL szintaktika**
```sql
SELECT column_names
FROM table_name
WHERE column_name IS NULL;

SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```

### IS NULL operátor
Az **IS NULL** operátor az üres értékek (NULL értékek) tesztelésére szolgál.

**Példa**
```sql
SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;
```

### IS NOT NULL operátor
Az **IS NOT NULL** operátor a nem üres értékek (NOT NULL értékek) tesztelésére szolgál.

**Példa**
```sql
SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NOT NULL;
```

---

## UPDATE utasítás
Az **UPDATE** utasítás egy tábla meglévő rekordjainak módosítására szolgál.
**UPDATE szintaktika**
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

> Megjegyzés: 
> Legyünk óvatosak, amikor egy táblázatban lévő rekordokat frissítünk!  
> A `WHERE` záradék határozza meg, hogy mely rekord(ok) frissítése történjen meg.  
> Ha kihagyjuk a `WHERE` záradékot, a táblázat **összes rekordja** frissülni fog.

**Példa** egy rekord frissítésére
Az alábbi SQL utasítás frissíti az első ügyfelet (`CustomerID = 1`) egy új kapcsolattartóval és egy új várossal:

```sql
UPDATE Customers
SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
WHERE CustomerID = 1;
```

### Több rekord egyidejű frissítése
A `WHERE` záradék határozza meg, hogy hány rekordot frissítünk.

Az alábbi SQL utasítás a `PostalCode` értékét `00000`‑ra frissíti minden olyan rekord esetében, ahol az ország `"Mexico"`:

```sql
UPDATE Customers
SET PostalCode = 00000
WHERE Country = 'Mexico';
```

---

## DELETE utasítás
A **DELETE** utasítás egy táblázatban meglévő rekordok törlésére szolgál.

**DELETE szintaktika**
```sql
DELETE FROM table_name WHERE condition;
```

> Megjegyzés: 
> Nagyon óvatosnak kell lenni, amikor rekordokat törlünk egy táblázatban!  
> A `WHERE` záradék határozza meg, hogy mely rekord(ok) törlésére kerüljön sor.  
> Ha kihagyjuk a `WHERE` záradékot, a táblázat **összes rekordja** törlődik!  
> Törlés előtt célszerű egy `SELECT` utasítással ellenőrizni, hogy a megfelelő rekordok fognak‑e törlődni.

**Példa** egy rekord törlésére
Az alábbi SQL utasítás törli az `"Alfreds Futterkiste"` ügyfelet a `Customers` táblából:

```sql
DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';
```

### Minden rekord törlése
Lehetőség van a táblázat összes sorának törlésére a táblázat törlése nélkül.  
Ez azt jelenti, hogy a táblaszerkezet, az attribútumok és az indexek érintetlenül maradnak.

```sql
DELETE FROM table_name;
```

**Példa**
Az alábbi SQL utasítás törli a `Customers` tábla összes sorát anélkül, hogy a táblát törölné:

```sql
DELETE FROM Customers;
```

---

## LIMIT klauzula
A **LIMIT** kikötés a visszaadandó rekordok számának megadására szolgál.  
Hasznos a több ezer rekordot tartalmazó nagy táblák esetében, mivel a nagyszámú rekord visszaadása hatással lehet a teljesítményre.

---

**LIMIT szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;
```

**LIMIT példa**
Az alábbi SQL utasítás kiválasztja az első három rekordot a `Customers` táblából:

```sql
SELECT * FROM Customers
LIMIT 3;
```

### OFFSET klauzula
Mi van akkor, ha a 4–6. rekordot szeretnénk kiválasztani?  
A MySQL lehetőséget biztosít ennek kezelésére az **OFFSET** használatával.

**OFFSET példa**
Az alábbi SQL lekérdezés csak 3 rekordot ad vissza, kezdve a 4. rekorddal (`OFFSET 3`):

```sql
SELECT * FROM Customers
LIMIT 3 OFFSET 3;
```

### LIMIT és WHERE kombinálása
A `LIMIT` klauzula kombinálható a `WHERE` feltétellel.

**Példa**
Az alábbi SQL utasítás kiválasztja az első három rekordot a `Customers` táblából, ahol az ország `"Germany"`:

```sql
SELECT * FROM Customers
WHERE Country = 'Germany'
LIMIT 3;
```

---

## MIN(), MAX() függvények
- A **MIN()** függvény a kiválasztott oszlop legkisebb értékét adja vissza.
- A **MAX()** függvény a kiválasztott oszlop legnagyobb értékét adja vissza.

---

**MIN(), MAX() szintaktika**
```sql
SELECT MIN(column_name)
FROM table_name
WHERE condition;

SELECT MAX(column_name)
FROM table_name
WHERE condition;
```

**MIN(), MAX() példák**
A legolcsóbb termék árának lekérdezése:

```sql
SELECT MIN(Price)
FROM Products;

SELECT MIN(Price) AS SmallestPrice
FROM Products;
```

---

## COUNT(), AVG(), SUM() függvények
- **COUNT()** – a megadott feltételnek megfelelő sorok számát adja vissza.
- **AVG()** – egy numerikus oszlop átlagértékét adja vissza.
- **SUM()** – egy numerikus oszlop teljes összegét adja vissza.

**COUNT() szintaktika**
```sql
SELECT COUNT(column_name)
FROM table_name
WHERE condition;
```

**AVG() szintaktika**
```sql
SELECT AVG(column_name)
FROM table_name
WHERE condition;
```

**SUM() szintaktika**
```sql
SELECT SUM(column_name)
FROM table_name
WHERE condition;
```

**Példák**
### COUNT()
A termékek számának lekérdezése:

```sql
SELECT COUNT(ProductID)
FROM Products;
```

> Megjegyzés: 
> a NULL értékek nincsenek figyelembe véve.

### AVG()
Az összes termék átlagárának lekérdezése:

```sql
SELECT AVG(Price)
FROM Products;
```

### SUM()
A `Quantity` mezők összegének lekérdezése az `OrderDetails` táblában:

```sql
SELECT SUM(Quantity)
FROM OrderDetails;
```

---

## LIKE operátor
A **LIKE** operátor egy `WHERE` záradékban a megadott minta keresésére szolgál egy oszlopban.

A LIKE‑operátorral együtt két ún. wildcard karaktert használhatunk:

- A százalékjel (`%`) nulla, egy vagy több karaktert jelöl.
- Az aláhúzásjel (`_`) egyetlen karaktert jelöl.

A százalékjel és az aláhúzás kombinációban is használható.

**LIKE szintaktika**
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column LIKE pattern;
```

> Tipp: Az `AND` vagy `OR` operátorok segítségével tetszőleges számú feltétel kombinálható.

**Példák**

| Minta | Leírás |
| --- | --- |
| `WHERE CustomerName LIKE 'a%'` | Megkeresi az "a" betűvel kezdődő értékeket. |
| `WHERE CustomerName LIKE '%a'` | Megkeresi az "a" betűvel végződő értékeket. |
| `WHERE CustomerName LIKE '%or%'` | Megkeresi azokat az értékeket, amelyekben az "or" bármelyik pozícióban szerepel. |
| `WHERE CustomerName LIKE '_r%'` | Megkeresi azokat az értékeket, amelyek második pozíciójában "r" szerepel. |
| `WHERE CustomerName LIKE 'a_%'` | Minden olyan értéket keres, amely "a"-val kezdődik és legalább 2 karakter hosszúságú. |
| `WHERE CustomerName LIKE 'a__%'` | Minden olyan értéket keres, amely "a"-val kezdődik és legalább 3 karakter hosszúságú. |
| `WHERE ContactName LIKE 'a%o'` | Megkeres minden olyan értéket, ami "a"-val kezdődik és "o"-val végződik. |

---

## IN operátor
Az **IN** operátor lehetővé teszi, hogy több értéket adjunk meg egy `WHERE` záradékban.  
Az IN operátor a többszörös `OR` feltétel rövidítése.

**IN szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);

-- vagy

SELECT column_name(s)
FROM table_name
WHERE column_name IN (SELECT STATEMENT);
```

**Példák**

### Több ország szűrése
Az alábbi SQL utasítás kiválasztja a Németországban, Franciaországban vagy Nagy‑Britanniában található összes ügyfelet:

```sql
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');
```

### Negált IN (NOT IN)
Az alábbi SQL utasítás kiválasztja az összes olyan ügyfelet, amely **nem** Németországban, Franciaországban vagy az Egyesült Királyságban található:

```sql
SELECT * FROM Customers
WHERE Country NOT IN ('Germany', 'France', 'UK');
```

### IN al‑lekérdezéssel
Az alábbi SQL utasítás kiválasztja az összes olyan ügyfelet, akik ugyanabból az országból származnak, mint a beszállítók:

```sql
SELECT * FROM Customers
WHERE Country IN (SELECT Country FROM Suppliers);
```

---

## BETWEEN operátor
A **BETWEEN** operátor egy adott tartományon belüli értékeket választ ki.  
Az értékek lehetnek számok, szövegek vagy dátumok.

> Megjegyzés: 
> A BETWEEN operátor **inkluzív**, tehát a kezdő‑ és a végértékeket is tartalmazza.

**BETWEEN szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

**Példák**

### Számok tartományban
Az alábbi SQL utasítás kiválasztja az összes olyan terméket, amelynek ára 10 és 20 között van:

```sql
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;
```

### Tartományon kívüli értékek
Az alábbi SQL utasítás kiválaszt minden olyan terméket, amely az előző példában megadott tartományon kívül esik:

```sql
SELECT * FROM Products
WHERE Price NOT BETWEEN 10 AND 20;
```

### Dátumok tartományban
Az alábbi SQL utasítás kiválasztja az összes olyan megrendelést, amelynek `OrderDate` dátuma 1996. július 1. és július 31. között van:

```sql
SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';
```

---

## Alias-ok
Az **álnevek** arra szolgálnak, hogy egy táblázatnak vagy egy oszlopnak ideiglenes nevet adjunk.  
Az aliasokat gyakran használják az oszlopnevek olvashatóbbá tételére.

- Az alias csak az adott lekérdezés időtartamára létezik.
- Az alias az **AS** kulcsszóval jön létre.

**Mikor hasznosak az aliasok?**
- Ha a lekérdezésben egynél több tábla szerepel.
- Ha függvényeket használunk.
- Ha az oszlopnevek hosszúak vagy nehezen olvashatóak.
- Ha két vagy több oszlopot kombinálunk.

---

**Szintaktika**

### Alias oszlophoz
```sql
SELECT column_name AS alias_name
FROM table_name;
```

### Alias táblához
```sql
SELECT column_name(s)
FROM table_name AS alias_name;
```

**Példák**

### Oszlop aliasok
Két aliasnév létrehozása (`CustomerID` → `ID`, `CustomerName` → `Customer`):

```sql
SELECT CustomerID AS ID, CustomerName AS Customer
FROM Customers;
```

### Alias szóközzel
> Megjegyzés: 
> idézőjelre van szükség, ha az aliasnév szóközöket tartalmaz.

```sql
SELECT CustomerName AS Customer, ContactName AS "Contact Person"
FROM Customers;
```

### Kombinált alias
Egy `Address` nevű alias létrehozása, amely négy oszlopot kombinál:

```sql
SELECT CustomerName, CONCAT_WS(', ', Address, PostalCode, City, Country) AS Address
FROM Customers;
```

### Táblák aliasai
Az `Orders` és `Customers` táblák aliasokkal (`o`, `c`):

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName
FROM Customers AS c, Orders AS o
WHERE c.CustomerName = 'Around the Horn'
  AND c.CustomerID = o.CustomerID;
```

#### Ugyanez aliasok nélkül
```sql
SELECT Orders.OrderID, Orders.OrderDate, Customers.CustomerName
FROM Customers, Orders
WHERE Customers.CustomerName = 'Around the Horn'
  AND Customers.CustomerID = Orders.CustomerID;
```

---

## JOIN klauzula
A **JOIN** klauzula két vagy több táblázat sorainak összekapcsolására szolgál, a közöttük lévő kapcsolódó oszlop alapján.

**Példa** táblák

### Orders
| OrderID | CustomerID | OrderDate   |
|---------|------------|-------------|
| 10308   | 2          | 1996-09-18  |
| 10309   | 37         | 1996-09-19  |
| 10310   | 77         | 1996-09-20  |

### Customers
| CustomerID | CustomerName              | ContactName    | Country |
|------------|---------------------------|----------------|---------|
| 1          | Alfreds Futterkiste       | Maria Anders   | Germany |
| 2          | Ana Trujillo Emparedados  | Ana Trujillo   | Mexico  |
| 3          | Antonio Moreno Taquería   | Antonio Moreno | Mexico  |


**INNER JOIN példa**
Az `Orders.CustomerID` oszlop a `Customers.CustomerID` oszlopra utal.  
Az alábbi SQL utasítás kiválasztja azokat a rekordokat, amelyek mindkét táblában azonos értékekkel rendelkeznek:

```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

### Eredmény
| OrderID | CustomerName        | OrderDate  |
|---------|---------------------|------------|
| 10308   | Ana Trujillo Empare | 1996-09-18 |
| 10365   | Antonio Moreno Ta   | 1996-11-27 |
| 10383   | Around the Horn     | 1996-12-16 |
| 10355   | Around the Horn     | 1996-11-15 |
| 10278   | Berglunds snabbköp  | 1996-08-12 |

### JOIN típusai

| JOIN típus   | Leírás |
|--------------|--------|
| **INNER JOIN** | Visszaadja azokat a rekordokat, amelyek mindkét táblában azonos értékekkel rendelkeznek. |
| **LEFT JOIN**  | Visszaadja az összes rekordot a bal oldali táblából, és az egyező rekordokat a jobb oldali táblából. |
| **RIGHT JOIN** | Visszaadja az összes rekordot a jobb oldali táblából, és az egyező rekordokat a bal oldali táblából. |
| **CROSS JOIN** | Visszaadja az összes rekordot mindkét táblából. |

**INNER JOIN szintaxis**
```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

**Példa**
```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

> Megjegyzés: 
> Az `INNER JOIN` csak azokat a sorokat adja vissza, ahol van egyezés. Ha egy `Orders` rekordhoz nincs megfelelő `Customers` rekord, az nem jelenik meg.

### Több táblás INNER JOIN
```sql
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
```

**LEFT JOIN szintaxis**
```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

**Példa**
```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

**RIGHT JOIN szintaxis**
```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

**Példa**
```sql
SELECT Orders.OrderID, Employees.LastName, Employees.FirstName
FROM Orders
RIGHT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
ORDER BY Orders.OrderID;
```

> Megjegyzés: 
> A `RIGHT JOIN` akkor is visszaadja a jobb oldali tábla összes rekordját, ha nincs egyezés.

**CROSS JOIN szintaxis**
```sql
SELECT column_name(s)
FROM table1
CROSS JOIN table2;
```

**Példa**
```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
CROSS JOIN Orders;
```

> Megjegyzés: 
> A `CROSS JOIN` nagyon nagy eredményhalmazt adhat vissza.  
> Ha `WHERE` feltételt adunk hozzá, az eredmény megegyezhet az `INNER JOIN`-nal:

```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
CROSS JOIN Orders
WHERE Customers.CustomerID = Orders.CustomerID;
```

### SELF JOIN
A **SELF JOIN** egy tábla önmagával való összekapcsolása.

**Szintaxis**
```sql
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

**Példa**
Olyan ügyfelek keresése, akik ugyanabból a városból származnak:

```sql
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;
```

---

## UNION operátor
Az **UNION** operátor két vagy több `SELECT` utasítás eredménykészletének kombinálására szolgál.

- Minden `SELECT` utasításnak ugyanannyi oszloppal kell rendelkeznie.
- Az oszlopoknak hasonló adattípusokkal kell rendelkezniük.
- Az oszlopoknak minden `SELECT` utasításban ugyanabban a sorrendben kell lenniük.

**UNION szintaktika**
```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

Az `UNION` alapértelmezés szerint csak különböző értékeket választ ki.  
A duplikált értékek engedélyezéséhez használjuk az **UNION ALL** operátort:

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

**Példák**

### Városok kombinálása
```sql
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City;
```

> Megjegyzés: 
> Az UNION csak különböző értékeket választ ki. Duplikált értékekhez használjuk az `UNION ALL`-t.

### Német városok
```sql
SELECT City, Country FROM Customers
WHERE Country = 'Germany'
UNION
SELECT City, Country FROM Suppliers
WHERE Country = 'Germany'
ORDER BY City;
```

### Ügyfelek és beszállítók listázása
```sql
SELECT 'Customer' AS Type, ContactName, City, Country
FROM Customers
UNION
SELECT 'Supplier', ContactName, City, Country
FROM Suppliers;
```

### Duplikált értékek is
```sql
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;
```

---

## GROUP BY utasítás
A **GROUP BY** utasítás az azonos értékekkel rendelkező sorokat összefoglaló sorokba csoportosítja.  
Gyakran használják aggregáló függvényekkel (`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`).

**GROUP BY szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

**Példák**

### Ügyfelek száma országonként
```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country;
```

### Ügyfelek száma csökkenő sorrendben
```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
ORDER BY COUNT(CustomerID) DESC;
```

---

**GROUP BY és JOIN példa**
Az alábbi SQL utasítás felsorolja az egyes szállítók által küldött megrendelések számát:

```sql
SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;
```
---

## HAVING klauzula
A **HAVING** klauzula azért került az SQL-be, mert a `WHERE` kulcsszó nem használható aggregáló függvényekkel.

**HAVING szintaxis**
```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

**Példák HAVING használatára**

### Országok ügyfélszám szerint
```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
```

### Csökkenő sorrendben
```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5
ORDER BY COUNT(CustomerID) DESC;
```

### Alkalmazottak több mint 10 megrendeléssel
```sql
SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
GROUP BY LastName
HAVING COUNT(Orders.OrderID) > 10;
```

### Szűrés WHERE + HAVING kombinációval
```sql
SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
WHERE LastName = 'Davolio' OR LastName = 'Fuller'
GROUP BY LastName
HAVING COUNT(Orders.OrderID) > 25;
```

---

## EXISTS operátor
Az **EXISTS** operátor egy alkérdésben lévő rekordok létezését vizsgálja.  
TRUE értéket ad vissza, ha az alkérdés egy vagy több rekordot ad vissza.

**EXISTS szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

**Példák EXISTS használatára**

### 20-nál kisebb árú termékek szállítói
```sql
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (
  SELECT ProductName
  FROM Products
  WHERE Products.SupplierID = Suppliers.SupplierID
    AND Price < 20
);
```

### 22-es árú termékek szállítói
```sql
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (
  SELECT ProductName
  FROM Products
  WHERE Products.SupplierID = Suppliers.SupplierID
    AND Price = 22
);
```

---

## ANY és ALL operátorok
Az **ANY** és **ALL** operátorok összehasonlítást tesznek lehetővé egyetlen oszlopérték és más értékek tartománya között.

- **ANY**: TRUE, ha az alkérdés bármelyik értéke megfelel a feltételnek.
- **ALL**: TRUE, ha az alkérdés minden értéke megfelel a feltételnek.

**ANY szintaktika**
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator ANY
  (SELECT column_name
   FROM table_name
   WHERE condition);
```

**ALL szintaktika**

### SELECT-tel
```sql
SELECT ALL column_name(s)
FROM table_name
WHERE condition;
```

### WHERE vagy HAVING használatával
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator ALL
  (SELECT column_name
   FROM table_name
   WHERE condition);
```

**Példák ANY használatára**

### Quantity = 10
```sql
SELECT ProductName
FROM Products
WHERE ProductID = ANY
  (SELECT ProductID
   FROM OrderDetails
   WHERE Quantity = 10);
```

### Quantity > 99
```sql
SELECT ProductName
FROM Products
WHERE ProductID = ANY
  (SELECT ProductID
   FROM OrderDetails
   WHERE Quantity > 99);
```

### Quantity > 1000 (FALSE)
```sql
SELECT ProductName
FROM Products
WHERE ProductID = ANY
  (SELECT ProductID
   FROM OrderDetails
   WHERE Quantity > 1000);
```

**Példák ALL használatára**

### Minden termék neve
```sql
SELECT ALL ProductName
FROM Products
WHERE TRUE;
```

### Minden Quantity = 10 (FALSE)
```sql
SELECT ProductName
FROM Products
WHERE ProductID = ALL
  (SELECT ProductID
   FROM OrderDetails
   WHERE Quantity = 10);
```

---

## SELECT INTO utasítás
A **SELECT INTO** utasítás az adatokat egy táblázatból egy új táblázatba másolja.

**SELECT INTO szintaktika**

### Összes oszlop másolása
```sql
SELECT *
    INTO newtable [IN externaldb]
    FROM oldtable
    WHERE condition;
```

### Csak néhány oszlop másolása
```sql
SELECT column1, column2, column3, ...
    INTO newtable [IN externaldb]
    FROM oldtable
    WHERE condition;
```

> Az új táblázat a régi táblázatban meghatározott oszlopnevekkel és típusokkal jön létre.  
> Az `AS` záradék segítségével új oszlopneveket hozhatunk létre.

**Példák SELECT INTO használatára**

### Biztonsági másolat készítése
```sql
SELECT * INTO CustomersBackup20230922
FROM Customers;
```

### Más adatbázisba másolás
```sql
SELECT * INTO CustomersBackup20230922 IN 'Backup'
FROM Customers;
```

### Csak néhány oszlop másolása
```sql
SELECT CustomerName, ContactName INTO CustomersBackup2023
FROM Customers;
```

### Csak német ügyfelek másolása
```sql
SELECT * INTO CustomersGermany
FROM Customers
WHERE Country = 'Germany';
```

### Több táblából másolás
```sql
SELECT Customers.CustomerName, Orders.OrderID
INTO CustomersOrderBackup2017
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```

#### Üres tábla létrehozása
```sql
SELECT * INTO newtable
FROM oldtable
WHERE 1 = 0;
```

---

## INSERT INTO SELECT utasítás
Az **INSERT INTO SELECT** utasítás adatokat másol egy táblázatból, és beilleszti egy másik táblázatba.

- Megköveteli, hogy a forrás- és céltáblák adattípusai megegyezzenek.
- A céltáblában meglévő rekordok nem változnak.

**INSERT INTO SELECT szintaktika**

### Összes oszlop másolása
```sql
INSERT INTO table2
SELECT * FROM table1
WHERE condition;
```

### Csak néhány oszlop másolása
```sql
INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table1
WHERE condition;
```

**Példák INSERT INTO SELECT használatára**

### Beszállítók másolása ügyfelek közé
```sql
INSERT INTO Customers (CustomerName, City, Country)
SELECT SupplierName, City, Country FROM Suppliers;
```

### Beszállítók teljes adatainak másolása
```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
SELECT SupplierName, ContactName, Address, City, PostalCode, Country
FROM Suppliers;
```

### Csak német beszállítók másolása
```sql
INSERT INTO Customers (CustomerName, City, Country)
SELECT SupplierName, City, Country FROM Suppliers
WHERE Country = 'Germany';
```

---

## CASE kifejezés
A **CASE** kifejezés végigmegy a feltételeken, és az első feltétel teljesülése esetén ad vissza egy értéket (mint egy if‑then‑else utasítás).  
Ha egy feltétel igaz, abbahagyja az olvasást, és visszaadja az eredményt.  
Ha egyetlen feltétel sem igaz, akkor az `ELSE` záradékban szereplő értéket adja vissza.

> Ha nincs `ELSE` rész és egyik feltétel sem igaz, akkor `NULL`-t ad vissza.

**CASE szintaktika**
```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```

**Példák CASE használatára**

### Feltételes szöveg
```sql
SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 30 THEN 'The quantity is greater than 30'
    WHEN Quantity = 30 THEN 'The quantity is 30'
    ELSE 'The quantity is under 30'
END AS QuantityText
FROM OrderDetails;
```

### Rendezés CASE alapján
```sql
SELECT CustomerName, City, Country
FROM Customers
ORDER BY
(CASE
    WHEN City IS NULL THEN Country
    ELSE City
END);
```

---

## IFNULL(), ISNULL(), COALESCE() és NVL() függvények
A NULL értékek kezelése különböző adatbázis‑rendszerekben eltérő függvényekkel történik.

**Példa** tábla (Products)
| P_Id | ProductName | UnitPrice | UnitsInStock | UnitsOnOrder |
|------|-------------|-----------|--------------|--------------|
| 1    | Jarlsberg   | 10.45     | 16           | 15           |
| 2    | Mascarpone  | 32.56     | 23           | NULL         |
| 3    | Gorgonzola  | 15.67     | 9            | 20           |

Ha a `UnitsOnOrder` érték `NULL`, az alábbi lekérdezés eredménye is `NULL` lesz:

```sql
SELECT ProductName, UnitPrice * (UnitsInStock + UnitsOnOrder)
FROM Products;
```

### MySQL
```sql
SELECT ProductName, UnitPrice * (UnitsInStock + IFNULL(UnitsOnOrder, 0))
FROM Products;

SELECT ProductName, UnitPrice * (UnitsInStock + COALESCE(UnitsOnOrder, 0))
FROM Products;
```

### SQL Server
```sql
SELECT ProductName, UnitPrice * (UnitsInStock + ISNULL(UnitsOnOrder, 0))
FROM Products;

SELECT ProductName, UnitPrice * (UnitsInStock + COALESCE(UnitsOnOrder, 0))
FROM Products;
```

### MS Access
```sql
SELECT ProductName, UnitPrice * (UnitsInStock + IIF(IsNull(UnitsOnOrder), 0, UnitsOnOrder))
FROM Products;
```

### Oracle
```sql
SELECT ProductName, UnitPrice * (UnitsInStock + NVL(UnitsOnOrder, 0))
FROM Products;

SELECT ProductName, UnitPrice * (UnitsInStock + COALESCE(UnitsOnOrder, 0))
FROM Products;
```

---

## Kommentek
A megjegyzések az SQL utasítások szakaszainak magyarázatára vagy az SQL utasítások végrehajtásának megakadályozására szolgálnak.

> Megjegyzés: 
> A megjegyzések nem támogatottak a **Microsoft Access** adatbázisokban.

### Egysoros megjegyzések
Az egysoros megjegyzések `--` jellel kezdődnek.  
A `--` és a sor vége közötti szöveg figyelmen kívül marad (nem hajtódik végre).

**Példák**
```sql
-- Select all:
SELECT * FROM Customers;

SELECT * FROM Customers -- WHERE City='Berlin';

-- SELECT * FROM Customers;
SELECT * FROM Products;
```

### Több soros megjegyzések
Több soros megjegyzések `/* ... */` közé kerülnek.

```sql
/*
Ez itt egy megjegyzés első sora
ez pedig a második
*/
```

---

## SQL operátorok

### Aritmetikai operátorok
| Operátor | Leírás     | Példa            |
|----------|------------|------------------|
| `+`      | Összeadás  | `SELECT 30 + 20;` |
| `-`      | Kivonás    | `SELECT 30 - 20;` |
| `*`      | Szorzás    | `SELECT 30 * 20;` |
| `/`      | Osztás     | `SELECT 30 / 10;` |
| `%`      | Modulo     | `SELECT 17 % 5;`  |


### Logikai operátorok
| Operátor | Leírás                |
|----------|-----------------------|
| `&`      | Logikai ÉS / AND      |
| `|`      | Logikai VAGY / OR     |
| `^`      | Logikai kizáró VAGY / XOR (igaz, ha mindkét feltétel azonos) |


### Egyéb SQL operátorok
| Operátor  | Leírás |
|-----------|--------|
| `ALL`     | TRUE, ha az allekérdezés valamennyi értéke teljesíti a feltételt |
| `AND`     | TRUE, ha az allekérdezés AND‑dal elválasztott részei igazak |
| `ANY`     | TRUE, ha az allekérdezés valamely értéke megfelel a feltételnek |
| `BETWEEN` | TRUE, ha az operandus az összehasonlítási tartományon belül van |
| `EXISTS`  | TRUE, ha az alkérdés egy vagy több rekordot ad vissza |
| `IN`      | TRUE, ha az operandus egyenlő a kifejezések listájának egyikével |
| `LIKE`    | TRUE, ha az operandus egyezik egy mintával |
| `NOT`     | Azokat a rekordokat jeleníti meg, amelyekre a feltétel(ek) nem igazak |
| `OR`      | TRUE, ha az OR‑ral elválasztott feltételek bármelyike igaz |
| `SOME`    | TRUE, ha az allekérdezés bármely értéke megfelel a feltételnek |
```
