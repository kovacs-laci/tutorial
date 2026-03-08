---
id: sql-bevezeto
slug: /sql-bevezeto
title: "Bevezetés az SQL-be és Alapvető Fogalmak"
---
# 1. fejezet: Bevezetés az SQL-be és Alapvető Fogalmak

---

## Tartalomjegyzék

- [Az SQL bemutatása](#11-az-sql-bemutatása)
- [Az SQL utasítások logikai csoportosítása](#12-az-sql-utasítások-logikai-csoportosítása)
- [Utasítások áttekintése](#13-utasítások-áttekintése-példákkal)
- [Tranzakciókezelés](#14-tranzakciókezelés)
- [ACID tulajdonságok](#15-acid-tulajdonságok)
- [Relációs adatbázis fogalma](#16-relációs-adatbázis-fogalma)
- [SQL szabványok fejlődése](#17-sql-szabványok-fejlődése)
- [SQL dialektusok](#18-sql-dialektusok)
- [SQL parancsok futtatása](#19-sql-parancsok-futtatása)
- [Legfontosabb SQL parancsok](#110-néhány-a-legfontosabb-sql-parancsok-közül)

---

## 1.1 Az SQL bemutatása
Az SQL (Structured Query Language) a relációs adatbázisok kezelésére szolgáló szabványos nyelv.  
Deklaratív nyelv: megmondjuk **mit** szeretnénk, nem **hogyan**.

- 1970-es években az IBM kutatásai alapján indult (SEQUEL → SQL).  
- 1986-ban ANSI, 1987-ben ISO szabványosította.  
- Azóta minden nagy adatbázis-kezelő rendszer támogatja.

---

## 1.2 Az SQL utasítások logikai csoportosítása
Az SQL utasításokat négy fő kategóriába soroljuk:

- **DDL** – Adatdefiníciós Nyelv  
- **DML** – Adatmanipulációs Nyelv  
- **DCL** – Adatvezérlési Nyelv  
- **TCL** – Tranzakcióvezérlési Nyelv  

---

## 1.3 Utasítások áttekintése (példákkal)

- **DDL:** `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, `CREATE INDEX`, `DROP INDEX`  
- **DML:** `SELECT`, `INSERT INTO`, `UPDATE`, `DELETE FROM`  
- **DCL:** `GRANT`, `REVOKE`  
- **TCL:** `COMMIT`, `ROLLBACK`  

---

## 1.4 Tranzakciókezelés
Egy tranzakció egy vagy több adatbázis‑művelet sorozata, amelyet egyetlen logikai egységként kezelnek.  
A tranzakciók célja az adatok konzisztenciájának megőrzése.

**Példa: Banki átutalás**
1. Ellenőrzés – van‑e elég pénz  
2. Csökkentés – küldő számlájáról  
3. Növelés – címzett számláján  

Rollback esetén minden visszaáll, commit esetén tartósan mentődik.

---

## 1.5 ACID tulajdonságok

- **Atomitás (Atomicity)** – egy tranzakció vagy teljes egészében lefut, vagy semmi sem történik.  
- **Konzisztencia (Consistency)** – az adatbázis mindig érvényes állapotból érvényes állapotba kerül.  
- **Izoláció (Isolation)** – párhuzamos tranzakciók nem zavarják egymást.  
- **Tartósság (Durability)** – commit után az eredmények tartósan megmaradnak.  

**Egyszerű példa:**  
Ha egy tranzakcióban két művelet van (pl. új ügyfél beszúrása és hozzá tartozó rendelés létrehozása), akkor az atomitás biztosítja, hogy vagy mindkettő végbemegy, vagy egyik sem. Így nem fordulhat elő, hogy rendelés van, de ügyfél nincs.

---

## 1.6 Relációs adatbázis fogalma
- **Tábla (table)** – az adatok tárolási egysége.  
- **Sor (row/record)** – egy konkrét bejegyzés.  
- **Oszlop (column/field)** – egy adott attribútum.  

Példa: `Customers` tábla → sorok az ügyfelek, oszlopok az adataik.

---

## 1.7 SQL szabványok fejlődése
- **SQL-86** – az első ANSI szabvány, alapvető utasítások (SELECT, INSERT, UPDATE, DELETE).  
- **SQL-89** – kisebb pontosítások, előkészítette a következő nagy lépést.  
- **SQL-92 (SQL2)** – átfogó szabvány, új adattípusok (`DATE`, `TIME`, `TIMESTAMP`), integritási szabályok (`CHECK`, `FOREIGN KEY`), set‑operátorok (`UNION`, `INTERSECT`, `EXCEPT`), al-lekérdezések (`EXISTS`, `ANY`, `ALL`). Három megfelelőségi szintet határozott meg: Entry, Intermediate, Full.  
- **SQL:1999 (SQL3)** – objektumorientált kiterjesztések, `WITH` klauzula, rekurzív lekérdezések, `ROLLUP`, `CUBE`.  
- **SQL:2003** – XML támogatás, `MERGE` utasítás.  
- **SQL:2011** – időalapú adattípusok és időutazás (temporal tables).  
- **SQL:2016** – JSON támogatás.  
- **SQL:2023** – legfrissebb szabvány, további modern kiterjesztésekkel.

---

## 1.8 SQL dialektusok
Az SQL szabványos, de minden rendszernek van saját kiterjesztése:

- **MySQL** – nyílt forráskódú, webes környezetben népszerű.  
- **SQL Server** – Microsoft megoldása, erős integrációval.  
- **Oracle SQL** – nagyvállalati környezetben elterjedt.  
- **PostgreSQL** – nyílt forráskódú, fejlett funkciókkal.  

---

## 1.9 SQL parancsok futtatása
Az SQL parancsokat többféleképpen futtathatjuk:

- **Parancssor** (pl. `mysql` shell).  
- **Grafikus kliensek**:  
  - SQL Server Management Studio  
  - phpMyAdmin  
  - MySQL Workbench  
  - DBeaver  

- **Alkalmazásokból** (pl. PHP, Python, Java).

---

## 1.10 Néhány a legfontosabb SQL parancsok közül
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
