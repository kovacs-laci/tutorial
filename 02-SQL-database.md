---
id: sql-adatbazisok
slug: /sql-adatbazisok
title: "SQL Adatabázisok"
---
# SQL Database

Készítette: Kovács László

Forrás: https://www.w 3 schools.com/


## CREATE DATABASE utasítás

A CREATE DATABASE utasítás egy új SQL-adatbázis létrehozására szolgál.


**Szintaktika**
```sql
CREATE DATABASE _databasename_ ;
```
> Tipp: 
> Győződjünk meg róla, hogy admin jogosultsággal rendelkezünk, mielőtt bármilyen adatbázist létrehoznánk.


**Hogyan győződjünk meg róla, hogy admin jogosultsággal rendelkezünk egy mySQL adatbázisban?**

Az MySQL adatbázisban az adminisztrátori jogosultságokkal rendelkező
felhasználókat az admin vagy root (gyökér) nevű felhasználók képviselik.
Az adminisztrátori jogosultságokkal rendelkező felhasználókat az
adatbázis kezeléséhez és a teljes rendszer feletti ellenőrzéshez hozzák
létre.
Az alábbiakban látható, hogyan lehet ellenőrizni, hogy egy MySQL
adatbázisban rendelkezik-e az aktuális felhasználó adminisztrátori
jogosultságokkal:


### Parancssori interfész 
(MySQL Shell vagy CommandLine)

1. Bejelentkezés a MySQL rendszerbe:
```sql
mysql - u felhasznalonev - p
```
2. Jogosultságok lekérdezése:
```sql
SHOW GRANTS FOR 'felhasznalonev'@'localhost';
```
Ez a lekérdezés megjeleníti a felhasználóhoz kapcsolódó
jogosultságok listáját. Az adminisztrátori jogosultságokat a GRANT ALL
PRIVILEGES ON *.* vagy hasonló bejegyzés mutatja. Ha a
felhasználónak nincsenek adminisztrátori jogosultságai, ezek a
bejegyzések nem lesznek jelen a kimenetben.


**Példa adatbázis létrehozására**

A következő SQL utasítás létrehoz egy "testDB" nevű adatbázist:
```sql
CREATE DATABASE testDB;
```
Miután létrehoztunk egy adatbázist, a következő SQL-paranccsal
ellenőrizhetjük azt az adatbázisok listájában:
```sql
SHOW DATABASES;
```

## DROP DATABASE utasítás

A DROP DATABASE utasítás egy meglévő SQL adatbázis törlésére szolgál.

**Szintaktika**
```sql
DROP DATABASE _databasename_ ;
```
> Megjegyzés: 
> Legyünk óvatosak az adatbázis törlése előtt. 
> Az adatbázis törlése az adatbázisban tárolt teljes információ elvesztését eredményezi!


**Példa**

A következő SQL utasítás törli a meglévő "testDB" adatbázist:
```sql
DROP DATABASE testDB;
```
> Tipp: 
> Győződjünk meg róla, hogy admin jogosultsággal rendelkezünk, mielőtt bármilyen adatbázist törölnénk. 
> Ha egy adatbázis törlése megtörtént, a következő SQL-paranccsal ellenőrizhetjük azt az adatbázisok listáján:
```sql
SHOW DATABASES;
```

## BACKUP DATABASE (SQL Server)

A BACKUP DATABASE utasítás az SQL Serverben egy meglévő SQL adatbázis teljes biztonsági másolatának létrehozására szolgál.

**Szintaktika**
```sql
BACKUP DATABASE databasename
TO DISK = 'filepath';
```

## SQL BACKUP a DIFFERENTIAL utasítással

A differenciális biztonsági mentés csak az adatbázis azon részeiről készít
biztonsági másolatot, amelyek az utolsó teljes biztonsági mentés óta
megváltoztak.


**Szintaktika**
```sql
BACKUP DATABASE databasename
TO DISK = 'filepath'
WITH DIFFERENTIAL;
```

**Példák**

A következő SQL utasítás teljes biztonsági mentést készít a meglévő
"testDB" adatbázisról a D lemezre:
```sql
BACKUP DATABASE testDB
TO DISK = 'D:\backups\testDB.bak';
```
> Tipp: Mindig készítsen biztonsági másolatot az adatbázisról egy másik  meghajtóra, mint a tényleges adatbázis. 
> Így, ha a lemez összeomlik, nem veszíti el a biztonsági másolatot az adatbázissal együtt.


Az alábbi SQL utasítás létrehoz egy különbségi biztonsági másolatot a „testDB” adatbázisról:
```sql
BACKUP DATABASE testDB
TO DISK = 'D:\backups\testDB.bak'
WITH DIFFERENTIAL;
```
> Tipp: 
> A differenciális biztonsági mentés csökkenti a biztonsági mentés idejét (mivel csak a változásokról készül biztonsági mentés).


## CREATE TABLE utasítás

A CREATE TABLE utasítás egy új tábla létrehozására szolgál az adatbázisban.


**Szintaktika**
```sql
CREATE TABLE _table_name_ (
_column 1 datatype,
column 2 datatype,
column 3 datatype,_
....
);
```

A _columnN_ paraméterek a táblázat oszlopainak nevét adják meg.

A _datatype_ (adattípus) paraméter megadja, hogy az oszlop milyen típusú
adatokat tartalmazhat (pl. varchar, integer, dátum stb.).


**Példák**

A következő példa létrehoz egy " Persons " nevű táblát, amely öt oszlopot
tartalmaz: PersonID, LastName, FirstName, Address és City:
```sql
CREATE TABLE Persons (
PersonID int,
LastName varchar( 255 ),
FirstName varchar( 255 ),
Address varchar( 255 ),
City varchar( 255 )
);

```
A PersonID oszlop int típusú, és egy egész számot tartalmaz.
A LastName, FirstName, Address és City oszlopok varchar típusúak és karaktereket tartalmaznak, és e mezők maximális hossza 255 karakter.

### Táblázat létrehozása egy másik táblázat segítségével

A CREATE TABLE segítségével egy meglévő tábla másolata is létrehozható.

Az új tábla ugyanazokat az oszlopdefiníciókat kapja. Az összes oszlop vagy bizonyos oszlopok kiválaszthatók.

Ha egy meglévő tábla felhasználásával hozunk létre új táblát, az új tábla a régi tábla meglévő értékeivel lesz feltöltve.


**Szintaktika**
```sql
CREATE TABLE _new_table_name_ AS
SELECT _column 1 , column 2 ,..._
FROM _existing_table_name_
WHERE ....;
```

**Példa**

A következő SQL létrehoz egy új, "TestTables" nevű táblát (amely a "Customers" tábla másolata):
```sql
CREATE TABLE TestTable AS
SELECT customername, contactname
FROM customers;
```

## DROP TABLE utasítás

A DROP TABLE utasítás egy adatbázisban meglévő tábla törlésére szolgál.

**Szintaktika**
```sql
DROP TABLE _table_name_ ;
```
> Megjegyzés: 
> Legyünk óvatosak, mielőtt törlünk egy adattáblát. A táblázat törlése a táblázatban tárolt teljes információ elvesztését eredményezi!


**Példa**

A következő SQL utasítás törli a meglévő "Shippers" táblát:
```sql
DROP TABLE Shippers;
```

## TRUNCATE TABLE utasítás

A TRUNCATE TABLE utasítás a táblán belüli adatok törlésére szolgál, de magát a táblát nem törli.


***Szintaxis***
```sql
TRUNCATE TABLE _table_name_ ;
```

## ALTER TABLE utasítás

Az ALTER TABLE utasítás egy meglévő táblázat oszlopainak hozzáadására, törlésére vagy módosítására szolgál.

Az ALTER TABLE utasítás arra is használható, hogy egy meglévő táblához különböző korlátozásokat adjunk hozzá vagy töröljök őket.


**Szintaktika**

Egy oszlop hozzáadásához egy táblázatban a következő szintaxist használjuk:
```sql
ALTER TABLE _table_name_
ADD _column_name datatype;_
```

**Példa**

A következő SQL hozzáad egy "Email" oszlopot az "Customers" táblához:
```sql
ALTER TABLE Customers
ADD Email varchar( 255 );
```

### ALTER TABLE - DROP COLUMN

Egy táblázat oszlopának törléséhez használjuk a következő szintaxist ( vegyük figyelembe, hogy egyes adatbázisrendszerek nem teszik lehetővé az oszlopok törlését).


***Szintaxis***
```sql
ALTER TABLE _table_name_
DROP COLUMN _column_name_ ;
```

**Példa**

A következő SQL törli az "Email" oszlopot a "Customers" táblából:
```sql
ALTER TABLE Customers
DROP COLUMN Email;
```

### ALTER TABLE - RENAME COLUMN

Egy adattábla oszlopának átnevezésére szolgál

**Szintaktika**
```sql
ALTER TABLE table_name
RENAME COLUMN old_name to new_name ;
```

### ALTER TABLE - ALTER/MODIFY DATATYPE

Egy táblázatban lévő oszlop adattípusának megváltoztatásához használjuk

**Szintaktika**

***SQL Server***
```sql
ALTER TABLE _table_name_
ALTER COLUMN _column_name datatype_ ;
```
***MySQL / Oracle (prior version 10 G):***

```sql
ALTER TABLE table_name
    MODIFY COLUMN column_name datatyp e;
```
***Oracle 10 G and later:***
```sql
ALTER TABLE _table_name_ 
    MODIFY _column_name datatype_ ;
```

**Példák**

Adjunk hozzá egy "DateOfBirth" nevű oszlopot a "Persons" táblázatban.
```sql
ALTER TABLE Persons
    ADD DateOfBirth date;
```
Vegyük észre, hogy az új oszlop, a "DateOfBirth", dátum típusú, és egy dátumot fog tartalmazni. Az adattípus határozza meg, hogy az oszlop milyen típusú adatokat tartalmazhat.

Most a " Persons " táblázat "DateOfBirth" nevű oszlopának adattípusát szeretnénk megváltoztatni.
```sql
ALTER TABLE Persons
    ALTER COLUMN DateOfBirth year;
```
Vegyük észre, hogy a "DateOfBirth" oszlop mostantól év típusú, és egy két- vagy négyjegyű évszámot fog tartalmazni.

Ezután törölni szeretnénk a " DateOfBirth " nevű oszlopot a " Persons " táblázatban.
```sql
ALTER TABLE Persons
    DROP COLUMN DateOfBirth;
```


## SQL Constraints / SQL megszorítások

Az SQL megszorítások a táblában lévő adatokra vonatkozó szabályok megadására szolgálnak.
A korlátozások megadhatók a tábla létrehozásakor a CREATE TABLE utasítással, vagy a tábla létrehozása után az ALTER TABLE utasítással.
A korlátozások arra szolgálnak, hogy korlátozzák a táblázatba kerülő adatok típusát. Ez biztosítja a táblázatban lévő adatok pontosságát és megbízhatóságát.
Ha a korlátozás és az adatművelet között bármilyen jogsértés van, a művelet megszakad.
A korlátozások lehetnek oszlop- vagy táblaszintűek. Az oszlopszintű korlátozások egy oszlopra vonatkoznak, a táblaszintű korlátozások pedig az egész táblára.

Az SQL-ben a következő megszorítások használatosak:
- **NOT NULL**  
  - Biztosítja, hogy egy oszlopnak ne legyen NULL értéke.
- **UNIQUE** 
  - Biztosítja, hogy egy oszlop összes értéke különböző legyen.
- **PRIMARY KEY**  
  - A NOT NULL és az UNIQUE kombinációja. Egyedülállóan azonosítja a táblázat minden sorát.
- **FOREIGN KEY** 
  - Megakadályozza az olyan műveleteket, amelyek a táblák közötti kapcsolatokat megsemmisítenék.
- **CHECK** 
  - Biztosítja, hogy egy oszlop értékei megfeleljenek egy adott feltételnek.
- **DEFAULT** 
  - Alapértelmezett értéket állít be egy oszlophoz, ha nincs érték megadva.
- **CREATE INDEX** 
  - Az adatok gyors létrehozására és lekérdezésére szolgál az adatbázisból.


**Szintaktika**
```sql
CREATE TABLE table_name (
  column 1 datatype constraint,
  column 2 datatype constraint,
  column 3 datatype constraint,
    ....
);
```

### NOT NULL

Alapértelmezés szerint egy oszlop NULL értékeket tartalmazhat.

A NOT NULL megkötés kikényszeríti, hogy egy oszlop NEM fogad el NULL értékeket.

Ez azt kényszeríti ki, hogy egy mező mindig tartalmazzon értéket, ami azt jelenti, hogy nem lehet új rekordot beszúrni vagy frissíteni anélkül, hogy értéket adna a mezőhöz.

**Példák**

A következő SQL biztosítja, hogy az "ID", " LastName" és "FirstName" oszlopok NEM fogadnak el NULL értékeket a "Persons" tábla létrehozásakor:
```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ) NOT NULL,
  Age int
);
```

#### NOT NULL on ALTER TABLE

A NOT NULL megkötés létrehozásához az "Age" oszlopon, amikor a"Persons" tábla már létre van hozva, használjuk a következő SQL-t:

***SQL Server / MS Access:*** 
```sql
ALTER TABLE Persons
    ALTER COLUMN Age int NOT NULL;
```

***MySQL / Oracle (prior version 10 G):***
```sql
ALTER TABLE Persons
MODIFY COLUMN Age int NOT NULL;
```
***Oracle 10 G and later:***
```sql
ALTER TABLE Persons
    MODIFY Age int NOT NULL;
```

### UNIQUE

Az UNIQUE megkötés biztosítja, hogy egy oszlop minden értéke különböző legyen.

Mind az UNIQUE, mind a PRIMARY KEY megkötés garantálja az oszlop vagy oszlopok halmazának egyediségét.

A PRIMARY KEY megkötés automatikusan rendelkezik UNIQUE megkötéssel.

Azonban táblánként több UNIQUE megkötés is lehet, de táblánként csak egy PRIMARY KEY megkötés.


#### UNIQUE Constraint on CREATE TABLE

***SQL Server / Oracle / MS Access:***
```sql
CREATE TABLE Persons (
  ID int NOT NULL UNIQUE,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ),
  Age int
);
```
***MySQL*** 
```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ),
  Age int,
  UNIQUE (ID)
);
```

Egy UNIQUE megkötés elnevezéséhez és több oszlopra vonatkozó UNIQUE megkötés definiálásához használjuk a következő SQL-szintaxist:
```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ),
  Age int,
  CONSTRAINT UC_Person UNIQUE (ID,LastName)
);
```

#### UNIQUE Constraint on ALTER TABLE

Az "ID" oszlopra vonatkozó UNIQUE megkötés létrehozásához, ha a tábla már létre van hozva, használjuk a következő SQL-t:
```sql
ALTER TABLE Persons
    ADD UNIQUE (ID);
```

Egy UNIQUE megkötés elnevezéséhez és több oszlopra vonatkozó UNIQUE megkötés definiálásához használjuk a következő SQL-szintaxist:
```sql
ALTER TABLE Persons
    ADD CONSTRAINT UC_Person UNIQUE (ID,LastName);
```

#### DROP UNIQUE

UNIQUE megkötés eldobása / törlése:

***MySQL*** 
```sql
ALTER TABLE Persons
    DROP INDEX UC_Person;
```

***SQL Server / Oracle / MS Access:*** 
```sql
ALTER TABLE Persons
    DROP CONSTRAINT UC_Person;
```

### PRIMARY KEY

- A PRIMARY KEY megkötés egyedileg azonosítja a táblázat minden egyes rekordját.
- Az elsődleges kulcsoknak UNIQUE értékeket kell tartalmazniuk, és nem tartalmazhatnak NULL értékeket.
- Egy táblának csak EGY elsődleges kulcsa lehet; és a táblában ez az elsődleges kulcs egyetlen vagy több oszlopból (mezőből) állhat.

#### PRIMARY KEY on CREATE TABLE

A következő SQL a " Persons " tábla létrehozásakor PRIMARY KEY-t hoz létre az "ID" oszlopon:

***MySQL*** 
```sql
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar( 255 ) NOT NULL,
    FirstName varchar( 255 ),
    Age int,
    PRIMARY KEY (ID)
);
```

***SQL Server / Oracle / MS Access***
```sql
CREATE TABLE Persons (
    ID int NOT NULL PRIMARY KEY,
    LastName varchar( 255 ) NOT NULL,
    FirstName varchar( 255 ),
    Age int
);
```

A PRIMARY KEY megkötés elnevezésének lehetővé tételéhez, valamint a PRIMARY KEY megkötés több oszlopra történő definiálásához használjuk a következő SQL-szintaxist:
```sql
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar( 255 ) NOT NULL,
    FirstName varchar( 255 ),
    Age int,
    CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
);
```
> Megjegyzés: 
> A fenti példában csak EGY PRIMARY KEY (PK_Person) van. Az elsődleges kulcs értéke azonban két oszlopból áll (ID + LastName).


#### PRIMARY KEY on ALTER TABLE

Az "ID" oszlopra vonatkozó PRIMARY KEY megkötés létrehozásához, ha a tábla már létre van hozva, használjuk a következő SQL-t:
```sql
ALTER TABLE Persons
ADD PRIMARY KEY (ID);
```

A PRIMARY KEY megkötés elnevezésének lehetővé tételéhez és a PRIMARY KEY megkötés több oszlopra történő meghatározásához használjuk a következő SQL szintaxist
```sql
ALTER TABLE Persons
ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName);
```

> Megjegyzés: 
> Ha az ALTER TABLE-t használjuk elsődleges kulcs hozzáadására, az elsődleges kulcs oszlop(ok)nak úgy kell deklarálódnia, hogy ne tartalmazzon NULL értéket (a tábla első létrehozásakor).


#### DROP PRIMARY KEY

A PRIMARY KEY megkötés törléséhez használjuk a következő SQL-t:
```sql
ALTER TABLE Persons
DROP PRIMARY KEY;
```

### FOREIGN KEY

A FOREIGN KEY megkötés arra szolgál, hogy megakadályozza az olyan műveleteket, amelyek a táblák közötti kapcsolatokat megsemmisítenék.

A FOREIGN KEY egy olyan mező (vagy mezők gyűjteménye) egy táblában, amely egy másik tábla elsődleges lulcsára (PRIMARY KEY) utal.

Az idegen kulcsot tartalmazó táblát gyermek táblának, az elsődleges kulcsot tartalmazó táblát pedig hivatkozott vagy szülő táblának nevezzük.


**Nézzük a következő két táblát:**

***Persons***

| PersonID | LastName  | FirstName | Age |
|----------|-----------|-----------|-----|
| 1        | Hansen    | Ola       | 30  |
| 2        | Svendson  | Tove      | 23  |
| 3        | Pettersen | Kari      | 20  |

***Orders***

| OrderID | OrderNumber | PersonID |
|---------|-------------|----------|
| 1       | 77895       | 3        |
| 2       | 44678       | 3        |
| 3       | 22456       | 2        |
| 4       | 24562       | 1        |


Figyeljük meg, hogy az "Orders " tábla "PersonID" oszlopa a "Persons " tábla "PersonID" oszlopára mutat.
A "Persons" tábla "PersonID" oszlopa a "Persons" tábla PRIMARY KEY-je.
Az "Orders" tábla "PersonID" oszlopa FOREIGN KEY a "Orders" táblában.
A FOREIGN KEY megkötés megakadályozza, hogy az idegen kulcs oszlopba érvénytelen adat kerüljön be, mivel annak a szülő táblában szereplő értékek egyikének kell lennie.

#### FOREIGN KEY on CREATE TABLE

A következő SQL az "Orders" tábla létrehozásakor FOREIGN KEY-t hoz létre a "PersonID" oszlopon:
```sql
CREATE TABLE Orders (
  OrderID int NOT NULL,
  OrderNumber int NOT NULL,
  PersonID int,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);
```

A FOREIGN KEY megkötés elnevezésének lehetővé tételéhez és a FOREIGN KEY megkötés több oszlopra történő meghatározásához használja a következő SQL-szintaxist:

```sql
CREATE TABLE Orders (
  OrderID int NOT NULL,
  OrderNumber int NOT NULL,
  PersonID int,
  PRIMARY KEY (OrderID),
  CONSTRAINT FK_PersonOrder FOREIGN KEY (PersonID)REFERENCES Persons(PersonID)
);
```

#### FOREIGN KEY on ALTER TABLE

A "PersonID" oszlopra vonatkozó FOREIGN KEY megkötés létrehozásához, ha a "Orders" tábla már létre van hozva, használjuk a következő SQL-t:
```sql
ALTER TABLE Orders
ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
```

A FOREIGN KEY megkötés elnevezésének lehetővé tételéhez használjuk a következő SQL-szintaxist:
```sql
ALTER TABLE Orders
ADD CONSTRAINT FK_PersonOrder
FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
```

#### DROP FOREIGN KEY

A FOREIGN KEY megkötés törléséhez használjuk a következő SQL-t:
```sql
ALTER TABLE Orders
DROP FOREIGN KEY FK_PersonOrder;
```

### CHECK 

A CHECK megkötés az oszlopban elhelyezhető értéktartomány korlátozására szolgál.

Ha egy oszlopra CHECK megkötést definiálunk, az csak bizonyos értékeket enged meg az oszlopban ill. a sor más oszlopainak értékei alapján korlátozhatjuk bizonyos oszlopok értékeit.


**Példák**

A következő SQL a " Persons " tábla létrehozásakor egy CHECK-kényszert hoz létre az "Age" oszlopon. A CHECK-kényszer biztosítja, hogy egy személy életkora 18 éves vagy annál idősebb legyen:
```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ),
  Age int,
  CHECK (Age>= 18 )
);
```

A CHECK-kényszer elnevezésének lehetővé tételéhez és a több oszlopra vonatkozó CHECK-kényszer meghatározásához használjuk a következő SQL-szintaxist:
```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar( 255 ) NOT NULL,
  FirstName varchar( 255 ),
  Age int,
  City varchar( 255 ),
  CONSTRAINT CHK_Person CHECK (Age>= 18 AND City='Sandnes')
);
```

#### CHECK on ALTER TABLE

Az "Age" oszlopra vonatkozó CHECK megkötés létrehozásához, ha a tábla már létre van hozva, használjuk a következő SQL-t:
```sql
ALTER TABLE Persons
ADD CHECK (Age>= 18 );
```
```sql
ALTER TABLE Persons
ADD CONSTRAINT CHK_PersonAge CHECK (Age>= 18 AND City='Sandnes');
```

#### DROP CHECK

A CHECK megkötés törléséhez használjuk a következő SQL-t:
```sql
ALTER TABLE Persons
DROP CHECK CHK_PersonAge;
```

### DEFAULT 
A **DEFAULT** megkötés egy oszlop alapértelmezett értékének beállítására szolgál.  
Az alapértelmezett érték minden új rekordhoz hozzáadódik, ha nincs más érték megadva.

---

#### DEFAULT on CREATE TABLE
A következő SQL a `Persons` tábla létrehozásakor DEFAULT értéket állít be a `City` oszlophoz:

```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  City varchar(255) DEFAULT 'Sandnes'
);
```

DEFAULT használható rendszerértékek beillesztésére is, pl. `CURRENT_DATE()`:

```sql
CREATE TABLE Orders (
  ID int NOT NULL,
  OrderNumber int NOT NULL,
  OrderDate date DEFAULT CURRENT_DATE()
);
```

#### DEFAULT on ALTER TABLE
DEFAULT megkötés hozzáadása meglévő táblához:

```sql
ALTER TABLE Persons
ALTER City SET DEFAULT 'Sandnes';
```

#### DROP DEFAULT
DEFAULT megkötés törlése:

```sql
ALTER TABLE Persons
ALTER City DROP DEFAULT;
```

---

## CREATE INDEX
A **CREATE INDEX** utasítás táblák indexeinek létrehozására szolgál.  
Az indexek gyorsítják a lekérdezéseket, de frissítéskor többletterhelést okoznak, ezért csak gyakran keresett oszlopokra érdemes létrehozni.

---

***Szintaktika***
```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);
```

---

### CREATE UNIQUE INDEX
Duplikált értékek nem megengedettek:

```sql
CREATE UNIQUE INDEX index_name
ON table_name (column1, column2, ...);
```

***Példák***
Index létrehozása egyetlen oszlopra:

```sql
CREATE INDEX idx_lastname
ON Persons (LastName);
```

Index létrehozása több oszlop kombinációjára:

```sql
CREATE INDEX idx_person_name
ON Persons (LastName, FirstName);
```

### DROP INDEX
Index törlése:

```sql
ALTER TABLE table_name
DROP INDEX index_name;
```

---

## AUTO INCREMENT
Az **AUTO INCREMENT** lehetővé teszi egy egyedi szám automatikus generálását új rekord beszúrásakor.  
Gyakran az elsődleges kulcsmezőn használják.

Alapértelmezés szerint az AUTO_INCREMENT kezdőértéke 1, és minden új rekordnál 1‑gyel növekszik.

***Példa***
```sql
CREATE TABLE Persons (
  Personid int NOT NULL AUTO_INCREMENT,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int,
  PRIMARY KEY (Personid)
);
```

***AUTO_INCREMENT kezdőérték módosítása:***

```sql
ALTER TABLE Persons AUTO_INCREMENT = 100;
```

Amikor új rekordot illesztünk be a `Persons` táblába, **nem kell megadni a Personid értékét**, az automatikusan generálódik.
```

---


