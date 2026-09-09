---
id: sql-normalizalas
slug: /sql/normalizalas
title: "Adatbázis-normalizálás és a 3. normál forma"
---

# Adatbázis-normalizálás és a 3. normál forma

A normalizálás célja, hogy az adatokat úgy osszuk fel táblákba, hogy csökkenjen az ismétlődés, és az adatok módosítása ne okozzon ellentmondásokat.

A Northwind adatbázis már több fontos normalizálási elvet alkalmaz. A leckében először egy szándékosan rossz, egyetlen táblás szerkezetet alakítunk át 1NF, 2NF, majd 3NF formára.

## Miért van szükség normalizálásra?

Egy rosszul megtervezett rendelési táblában ugyanabban a sorban szerepelhet:

- a rendelés adata;
- az ügyfél adata;
- a termék adata;
- a rendelési tétel mennyisége.

Ez ismétlődést okoz. Ha például az ügyfél városa megváltozik, több sort kellene módosítani. Ha csak egy sort módosítunk, ellentmondásos adat keletkezik.

## Az első normál forma (1NF)

Egy tábla 1NF-ben van, ha:

- minden mező egyetlen, atomi értéket tartalmaz;
- nincs vesszővel vagy más módon összefűzött lista egy mezőben;
- minden sor egyértelműen azonosítható.

### Rossz példa

```text
OrderID | CustomerName | Products
1001    | Alfreds      | Chai, Chang, Tofu
```

A `Products` mező több értéket tartalmaz, ezért nehéz lenne egyetlen termékre szűrni vagy annak mennyiségét tárolni.

### 1NF-re alakítás

Minden termék külön sorba kerül:

```text
OrderID | ProductName | Quantity
1001    | Chai        | 2
1001    | Chang       | 1
1001    | Tofu        | 4
```

A rendelés és a termék együtt azonosítja a rendelési tételt. Elméletben itt a `(OrderID, ProductName)` összetett kulcs lehetne, de valódi adatmodellben stabil azonosítókat használunk.

## A második normál forma (2NF)

Egy 1NF-ben lévő tábla 2NF-ben van, ha:

- minden nem kulcsattribútum a teljes elsődleges kulcstól függ;
- összetett kulcs esetén nincs olyan adat, amely csak a kulcs egyik részétől függ.

Induljunk ebből a 1NF táblából:

```text
OrderID | ProductID | CustomerName | ProductName | Quantity
1001    | 1         | Alfreds      | Chai        | 2
1001    | 2         | Alfreds      | Chang       | 1
```

A kulcs `(OrderID, ProductID)`. A `CustomerName` csak az `OrderID`-től függ, a `ProductName` csak a `ProductID`-től függ. Ezek részleges függések, ezért a tábla nem 2NF-es.

### 2NF-re bontás

```sql
CREATE TABLE Orders_Practice (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATETIME
);

CREATE TABLE Products_Practice (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Price DECIMAL(10, 2)
);

CREATE TABLE OrderDetails_Practice (
    OrderID INT,
    ProductID INT,
    Quantity INT,
    PRIMARY KEY (OrderID, ProductID)
);
```

A rendelés adatai az `Orders_Practice`, a termék adatai a `Products_Practice`, a kapcsolat és a mennyiség pedig az `OrderDetails_Practice` táblába kerül.

## A harmadik normál forma (3NF)

Egy 2NF-ben lévő tábla 3NF-ben van, ha:

- nincs tranzitív függőség;
- a nem kulcsattribútum nem egy másik nem kulcsattribútumtól függ.

Tegyük fel, hogy az `Orders_Practice` táblát így terveztük:

```text
OrderID | CustomerID | CustomerName | City | Country | OrderDate
```

Az `OrderID` meghatározza a `CustomerID`-t, a `CustomerID` pedig meghatározza a `CustomerName`, `City` és `Country` értékét. Ez tranzitív függőség:

```text
OrderID -> CustomerID -> CustomerName, City, Country
```

A rendelés táblában ezért csak a `CustomerID` maradjon. Az ügyfél adatai külön `Customers` táblába kerülnek.

### 3NF-re bontás

```sql
CREATE TABLE Customers_Practice (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50),
    City VARCHAR(20),
    Country VARCHAR(15)
);

CREATE TABLE Orders_Practice (
    OrderID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATETIME,
    FOREIGN KEY (CustomerID) REFERENCES Customers_Practice(CustomerID)
);

CREATE TABLE Products_Practice (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Price DECIMAL(10, 2)
);

CREATE TABLE OrderDetails_Practice (
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders_Practice(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products_Practice(ProductID)
);
```

A `3NF`-es modellben:

- a vevő adatai egyszer, a `Customers_Practice` táblában szerepelnek;
- a rendelés csak a rendeléshez tartozó adatokat és a vevő idegen kulcsát tárolja;
- a termék adatai a `Products_Practice` táblában vannak;
- a rendelési tétel csak a rendelés-termék kapcsolatot és a mennyiséget tárolja.

## Kapcsolat a Northwind adatbázissal

A Northwindben ugyanezt a gondolatot látjuk:

- `Customers` tárolja a vevőket;
- `Orders` tárolja a rendeléseket;
- `Products` tárolja a termékeket;
- `OrderDetails` kapcsolja össze a rendeléseket és a termékeket;
- `Categories` és `Suppliers` külön táblákban tárolják a termékhez kapcsolódó adatokat.

Például egy rendelés teljes adatát JOIN-okkal állítjuk össze:

```sql
SELECT o.OrderID,
       c.CustomerName,
       p.ProductName,
       od.Quantity
FROM Orders AS o
JOIN Customers AS c ON c.CustomerID = o.CustomerID
JOIN OrderDetails AS od ON od.OrderID = o.OrderID
JOIN Products AS p ON p.ProductID = od.ProductID
ORDER BY o.OrderID, p.ProductName;
```

A normalizált adatmodellben gyakran több JOIN szükséges, cserébe az adatok nem ismétlődnek feleslegesen.

## Mikor nem kell tovább normalizálni?

A normalizálás nem cél önmagában. Elemzési vagy riportolási célokra néha szándékosan denormalizált táblát használunk, mert így kevesebb JOIN-ra van szükség. Tranzakciós alkalmazásoknál azonban a 3NF jó kiindulópont.

A normalizálás nem oldja meg automatikusan az összes adatminőségi problémát. Szükség lehet még:

- `PRIMARY KEY` és `FOREIGN KEY` megszorításokra;
- `NOT NULL`, `UNIQUE` és `CHECK` szabályokra;
- megfelelő indexekre;
- tranzakciókra.

## Gyakorló feladatok

### 1. feladat

Melyik normálformát sérti egy olyan `Products` mező, amelyben ez szerepel: `Chai, Chang, Tofu`?

<details>
<summary>Megoldás</summary>

Az 1NF-et, mert a mező nem atomi értéket, hanem több termékből álló listát tartalmaz.
</details>

### 2. feladat

A `(OrderID, ProductID)` összetett kulcsú táblában hová kerüljön a `Quantity`, és hová a `ProductName`?

<details>
<summary>Megoldás</summary>

A `Quantity` az `OrderDetails` táblába kerül, mert a rendelés és a termék kapcsolatától függ. A `ProductName` a `Products` táblába kerül, mert csak a `ProductID`-től függ.
</details>

### 3. feladat

Miért nem kell a `CustomerName` oszlopnak az `Orders` táblában szerepelnie?

<details>
<summary>Megoldás</summary>

Mert a `CustomerName` a `CustomerID`-től függ, az `Orders` tábla pedig a vevőt a `CustomerID` idegen kulccsal hivatkozza. A név a `Customers` táblából JOIN segítségével kérdezhető le.
</details>

### 4. feladat

Kérdezd le a Northwindből egy rendelés azonosítóját, az ügyfél nevét és a termék nevét egyetlen eredményhalmazban.

<details>
<summary>Megoldás</summary>

```sql
SELECT o.OrderID, c.CustomerName, p.ProductName
FROM Orders AS o
JOIN Customers AS c ON c.CustomerID = o.CustomerID
JOIN OrderDetails AS od ON od.OrderID = o.OrderID
JOIN Products AS p ON p.ProductID = od.ProductID
ORDER BY o.OrderID, p.ProductName;
```
</details>

## Gyakorlati ellenőrzőlista

Egy új táblatervezésnél tedd fel ezeket a kérdéseket:

1. Minden mező egyetlen értéket tartalmaz?
2. Mi a tábla elsődleges kulcsa?
3. Minden nem kulcsmező a teljes kulcstól függ?
4. Került-e másik nem kulcsmezőtől függő adat ugyanabba a táblába?
5. Mely kapcsolatokat kell idegen kulccsal kifejezni?
