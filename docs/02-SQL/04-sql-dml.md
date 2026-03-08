---
id: sql-dml
slug: /sql-dml
title: "SQL Adatmanipulációs Nyelv (DML)"
---
# SQL Adatmanipulációs Nyelv (DML) – Írási műveletek

Készítette: Kovács László  
Forrás: https://www.w3schools.com/

---

## Tartalomjegyzék

- [INSERT INTO](#41-insert-into)
- [UPDATE](#42-update)
- [DELETE](#43-delete)
- [SELECT INTO](#44-select-into)
- [INSERT INTO SELECT](#45-insert-into-select)

---

## 4.1 INSERT INTO

### Definíció
Az **INSERT INTO** utasítás új rekordok beszúrására szolgál egy táblázatba.  
Segítségével új sorokat adhatunk hozzá a meglévő táblákhoz.

---

### Szintaxis
Az utasítás kétféleképpen írható:

#### Oszlopnevek megadásával
Ha csak bizonyos oszlopokba szeretnénk adatot beszúrni, meg kell adni az oszlopneveket.
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

#### Oszlopnevek nélkül
Ha minden oszlophoz értéket adunk, nem kell megadni az oszlopneveket.  
Fontos: az értékek sorrendje meg kell egyezzen a táblázat oszlopainak sorrendjével.
```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

---

### Példák (Northwind)

#### Teljes rekord beszúrása
```sql
INSERT INTO Customers (CustomerID, CompanyName, ContactName, Country)
VALUES ('HUN01', 'Teszt Kft.', 'Kovács László', 'Hungary');
```

#### Új rekord beszúrása oszlopnevek megadásával
```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
```

> Megjegyzés:  
> A `CustomerID` mezőbe nem illesztettünk be számot, mert az **auto-increment** mező, és automatikusan generálódik.

#### Adatok beszúrása csak megadott oszlopokba
```sql
INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');
```

---

### Tipp
- Ha az oszlop **NOT NULL** megszorítással rendelkezik, akkor kötelező értéket megadni.
- Az **auto-increment** mezők (pl. `CustomerID`) automatikusan generálódnak, ezért nem kell értéket megadni hozzájuk.
- Több rekord egyszerre is beszúrható:
```sql
INSERT INTO Products (ProductName, Price)
VALUES ('Chai', 18),
       ('Chang', 19),
       ('Aniseed Syrup', 10);
```
---

## 4.2 NULL érték

### Mi az a NULL érték?
A **NULL értékkel** rendelkező mező olyan mező, amelynek nincs értéke.  
Ha egy táblázatban egy mező opcionális, akkor lehetséges új rekordot beszúrni vagy frissíteni anélkül, hogy értéket adnánk a mezőhöz. Ekkor a mező NULL értékkel kerül elmentésre.

> Megjegyzés:  
> A NULL érték különbözik a nulla értéktől (`0`) vagy a szóközöket tartalmazó mezőtől (`'   '`).  
> A NULL értékkel rendelkező mező olyan mező, amely a rekord létrehozása során üresen maradt.

---

### Hogyan teszteljük a NULL értékeket?
Nem lehetséges a NULL értékek tesztelése összehasonlító operátorokkal (pl. `=`, `<`, `<>`).  
Helyette az **IS NULL** és **IS NOT NULL** operátorokat kell használnunk.

**Szintaxis**
```sql
SELECT column_names
FROM table_name
WHERE column_name IS NULL;

SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```

---

### IS NULL operátor
Az **IS NULL** operátor az üres értékek (NULL értékek) tesztelésére szolgál.

**Példa (Northwind)**
```sql
SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;
```

---

### IS NOT NULL operátor
Az **IS NOT NULL** operátor a nem üres értékek (NOT NULL értékek) tesztelésére szolgál.

**Példa (Northwind)**
```sql
SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NOT NULL;
```

---

### Tipp
- Az **INSERT INTO** során, ha nem adunk értéket egy opcionális oszlophoz, az mező NULL lesz.
- A **NOT NULL** megszorítás megakadályozza, hogy egy oszlopban NULL érték szerepeljen.
- A NULL értékek kezelése kritikus az adatminőség és a lekérdezések pontossága szempontjából.

---
## 4.3 UPDATE

### Definíció
Az **UPDATE** utasítás egy tábla meglévő rekordjainak módosítására szolgál.  
Segítségével egy vagy több oszlop értékét frissíthetjük a megadott feltétel alapján.

---

### Szintaxis
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

> Megjegyzés:  
> A `WHERE` záradék határozza meg, hogy mely rekord(ok) frissítése történjen meg.  
> Ha kihagyjuk a `WHERE` záradékot, a táblázat **összes rekordja** frissülni fog.

---

### Példák (Northwind)

#### Egy rekord frissítése
Az alábbi SQL utasítás frissíti az első ügyfelet (`CustomerID = 1`) egy új kapcsolattartóval és egy új várossal:
```sql
UPDATE Customers
SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
WHERE CustomerID = 1;
```

#### Több rekord egyidejű frissítése
A `WHERE` záradék határozza meg, hogy hány rekordot frissítünk.  
Az alábbi SQL utasítás a `PostalCode` értékét `00000`‑ra frissíti minden olyan rekord esetében, ahol az ország `"Mexico"`:
```sql
UPDATE Customers
SET PostalCode = '00000'
WHERE Country = 'Mexico';
```

---

### NULL értékek kezelése UPDATE során
Az `UPDATE` utasítással oszlopokat NULL értékre is állíthatunk.

**Szintaxis**
```sql
UPDATE table_name
SET column_name = NULL
WHERE condition;
```

**Példa (Northwind)**
```sql
UPDATE Customers
SET Address = NULL
WHERE CustomerID = 'ALFKI';
```

> Tipp:  
> Ha egy oszlop `NOT NULL` megszorítással rendelkezik, akkor nem állítható NULL értékre.  
> A NULL értékek kezelése kritikus az adatminőség szempontjából, ezért mindig ellenőrizzük a megszorításokat.

---

### Tipp összefoglaló
- Mindig használjunk `WHERE` feltételt, különben minden rekord frissül.
- Több oszlop egyszerre is frissíthető.
- NULL értékek beállítása lehetséges, de csak akkor, ha az oszlop nem `NOT NULL`.
- Az `UPDATE` utasítás kombinálható más feltételekkel (`AND`, `OR`, `IN`, `BETWEEN`) a pontosabb szűréshez.

---

## 4.4 DELETE

### Definíció
A **DELETE** utasítás egy táblázatban meglévő rekordok törlésére szolgál.  
Segítségével egy vagy több sor eltávolítható a megadott feltétel alapján.

---

### Szintaxis
```sql
DELETE FROM table_name
WHERE condition;
```

> Tipp: A `WHERE` záradék határozza meg, hogy mely rekord(ok) törlődjenek.  
> Ha kihagyjuk a `WHERE` záradékot, a táblázat **összes rekordja** törlődik!

---

### Példák (Northwind)

#### Egy rekord törlése
Az alábbi SQL utasítás törli az első rendelést (`OrderID = 10248`) az `Orders` táblából:
```sql
DELETE FROM Orders
WHERE OrderID = 10248;
```

#### Egy ügyfél törlése
Az alábbi SQL utasítás törli az `"Alfreds Futterkiste"` ügyfelet a `Customers` táblából:
```sql
DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';
```

---

### Több rekord törlése
A `WHERE` záradék határozza meg, hogy hány rekord törlődik.  
Az alábbi SQL utasítás törli az összes mexikói ügyfelet:
```sql
DELETE FROM Customers
WHERE Country = 'Mexico';
```

---

### Minden rekord törlése
Lehetőség van a táblázat összes sorának törlésére a táblázat szerkezetének megtartásával.  
Ez azt jelenti, hogy az oszlopok, adattípusok és indexek érintetlenek maradnak.

**Szintaxis**
```sql
DELETE FROM table_name;
```

**Példa (Northwind)**
```sql
DELETE FROM Customers;
```

---

### Tipp összefoglaló
- Mindig ellenőrizzük `SELECT` utasítással, hogy a megfelelő rekordokat célozzuk.
- A `WHERE` kihagyása minden rekord törlését eredményezi.
- A `DELETE` csak az adatokat törli, a táblaszerkezetet nem.
- Ha teljes táblát akarunk törölni, használjuk inkább a `DROP TABLE` utasítást.
- Ha csak az adatokat akarjuk törölni, de a szerkezetet megtartani, a `TRUNCATE TABLE` gyorsabb alternatíva lehet.

---

## 4.5 SELECT INTO

### Definíció
A **SELECT INTO** utasítás egy meglévő táblából másolja az adatokat egy új táblába.  
Az új tábla automatikusan létrejön a kiválasztott oszlopokkal és adattípusokkal.

---

### Szintaxis

#### Összes oszlop másolása
```sql
SELECT *
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

#### Csak néhány oszlop másolása
```sql
SELECT column1, column2, column3, ...
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

> Megjegyzés:  
> Az új táblázat a régi táblázatban meghatározott oszlopnevekkel és típusokkal jön létre.  
> Az `AS` záradék segítségével új oszlopneveket hozhatunk létre.

---

### Példák (Northwind)

#### Új tábla létrehozása néhány oszloppal
```sql
SELECT CustomerID, CompanyName
INTO Customers_Backup
FROM Customers
WHERE Country = 'Germany';
```

#### Biztonsági másolat készítése
```sql
SELECT * INTO CustomersBackup20230922
FROM Customers;
```

#### Más adatbázisba másolás
```sql
SELECT * INTO CustomersBackup20230922 IN 'Backup'
FROM Customers;
```

#### Csak néhány oszlop másolása
```sql
SELECT CustomerName, ContactName
INTO CustomersBackup2023
FROM Customers;
```

#### Csak német ügyfelek másolása
```sql
SELECT * INTO CustomersGermany
FROM Customers
WHERE Country = 'Germany';
```

#### Több táblából másolás JOIN segítségével
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

### Tipp összefoglaló
- A `SELECT INTO` új táblát hoz létre, nem egy meglévőbe másol.
- Ha meglévő táblába szeretnénk adatokat másolni, használjuk az **INSERT INTO SELECT** utasítást.
- Az új tábla oszlopai és adattípusai a forrástábla alapján jönnek létre.
- Az `AS` kulcsszóval új oszlopneveket adhatunk.
- Az `IN` záradék segítségével más adatbázisba is másolhatunk.

---

## 4.6 INSERT INTO SELECT

### Definíció
Az **INSERT INTO SELECT** utasítás adatokat másol egy táblázatból, és beilleszti egy másik, már létező táblázatba.  
A céltábla szerkezete (oszlopok, adattípusok) már léteznie kell, és meg kell egyeznie a forrástábla megfelelő oszlopaival.

---

### Szintaxis

#### Összes oszlop másolása
```sql
INSERT INTO target_table
SELECT * FROM source_table
WHERE condition;
```

#### Csak néhány oszlop másolása
```sql
INSERT INTO target_table (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM source_table
WHERE condition;
```

> Megjegyzés:
> - A céltáblában meglévő rekordok nem változnak, csak új sorok kerülnek beillesztésre.
> - A forrás- és céltáblák oszlopainak adattípusai kompatibilisek kell legyenek.

---

### Példák (Northwind)

#### Adatok másolása egy másik táblába
```sql
INSERT INTO Customers_Copy (CustomerID, CompanyName)
SELECT CustomerID, CompanyName
FROM Customers
WHERE Country = 'USA';
```

#### Beszállítók másolása ügyfelek közé
```sql
INSERT INTO Customers (CustomerName, City, Country)
SELECT SupplierName, City, Country
FROM Suppliers;
```

#### Beszállítók teljes adatainak másolása
```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
SELECT SupplierName, ContactName, Address, City, PostalCode, Country
FROM Suppliers;
```

#### Csak német beszállítók másolása
```sql
INSERT INTO Customers (CustomerName, City, Country)
SELECT SupplierName, City, Country
FROM Suppliers
WHERE Country = 'Germany';
```

---

### Tipp összefoglaló
- Az **INSERT INTO SELECT** meglévő táblába másol adatokat, míg a **SELECT INTO** új táblát hoz létre.
- Mindig ellenőrizzük, hogy a céltábla oszlopai és adattípusai kompatibilisek a forrástáblával.
- A `WHERE` záradék segítségével szűrhetjük, mely rekordok kerüljenek átmásolásra.
- Az `INSERT INTO SELECT` gyakran használható adatarchiválásra, migrációra vagy táblák közötti adatátvitelre.

---
