---
id: sql-introduction
slug: /sql-ismerteto
title: "Ismertető"
---

Ezek a tananyagok az SQL Structured Query Language alapjaitól egészen a haladó lekérdezési és adatbázis-programozási technikákig terjedő tudásanyagot tartalmaznak.
A bemutatott példák a Microsoft Northwind teszt adatbázisán működnek. Az adatbázis dumpja innen letölthető: [Northwind dump letöltése]( ../../static/files/install_northwind.sql )

---

# SQL Tananyag – Az alapszinttől a tárolt eljárásokig

## 1. fejezet: Bevezetés az SQL-be és Alapvető Fogalmak

Ez a fejezet lefekteti az SQL (Structured Query Language) alapjait, bemutatja a nyelv fő logikai csoportjait és a tranzakciókezelést.

1.  **Az SQL bemutatása:** Meghatározás (Structured Query Language).
2.  **Az SQL utasítások logikai csoportosítása:** Az utasítások négy szokásos kategóriája:
    *   **DDL** (Data Definition Language – Adatdefiníciós Nyelv): Az adatbázis szerkezetének definiálása és módosítása.
    *   **DML** (Data Manipulation Language – Adatmanipulációs Nyelv): Az adatokkal történő műveletek végrehajtása.
    *   **DCL** (Data Control Language – Adatvezérlési Nyelv): Hozzáférési jogosultságok kezelése.
    *   **TCL** (Transaction Control Language – Tranzakcióvezérlési Nyelv): Tranzakciók kezelése.
3.  **Utasítások áttekintése (példákkal):**
    *   **DDL:** `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, `CREATE INDEX`, `DROP INDEX`.
    *   **DML:** `SELECT`, `INSERT INTO`, `UPDATE`, `DELETE FROM`.
    *   **DCL:** `GRANT`, `REVOKE`.
    *   **TCL:** `COMMIT`, `ROLLBACK`.
4.  **Tranzakciókezelés:** Mi az a tranzakció (egy vagy több adatbázis-művelet, amit egységként kezelnek).
5.  **ACID Tulajdonságok:** Atomitás, Konzisztencia, Izoláció, Tartósság (Atomicity, Consistency, Isolation, Durability). Példa tranzakcióra (banki átutalás).

## 2. fejezet: Adatdefiníciós Nyelv (DDL) – Szerkezetkezelés

Ez a fejezet az adatbázis és a táblák szerkezetének létrehozására, módosítására és törlésére szolgáló DDL parancsokat mutatja be.

1.  **Adatbázisok kezelése:**
    *   `CREATE DATABASE`: Új adatbázis létrehozása. Adminisztrátori jogosultságok ellenőrzése (MySQL példa).
    *   `DROP DATABASE`: Meglévő adatbázis törlése (figyelmeztetés az adatvesztésre).
    *   `BACKUP DATABASE` (SQL Server): Teljes és differenciális biztonsági másolat készítése.
2.  **Táblák kezelése:**
    *   `CREATE TABLE`: Új tábla létrehozása oszlopnevekkel és adattípusokkal. Tábla létrehozása egy másik tábla másolásával.
    *   `DROP TABLE`: Meglévő tábla törlése (figyelmeztetés az adatvesztésre).
    *   `TRUNCATE TABLE`: Adatok törlése a tábla megtartása mellett.
    *   `ALTER TABLE`: Oszlopok hozzáadása (`ADD COLUMN`), törlése (`DROP COLUMN`), adattípus módosítása (`ALTER/MODIFY DATATYPE`).

## 3. fejezet: Adatdefiníciós Nyelv (DDL) – Megszorítások és Indexek

A fejezet az adatok pontosságát és megbízhatóságát biztosító SQL megszorításokat és az indexek használatát ismerteti.

1.  **SQL Megszorítások (Constraints):** Céljuk (az adatokra vonatkozó szabályok megadása), típusai (oszlop- vagy táblaszintű).
2.  **Főbb Megszorítások:**
    *   **NOT NULL:** Biztosítja, hogy egy oszlop ne fogadjon el NULL értéket.
    *   **UNIQUE:** Biztosítja, hogy egy oszlop összes értéke különböző legyen.
    *   **PRIMARY KEY:** A NOT NULL és az UNIQUE kombinációja, egyedileg azonosítja a sorokat.
    *   **FOREIGN KEY:** Kapcsolatokat tart fenn táblák között, hivatkozva egy másik tábla elsődleges kulcsára (szülő/gyermek tábla).
    *   **CHECK:** Értéktartomány korlátozása egy oszlopban.
    *   **DEFAULT:** Alapértelmezett érték beállítása egy oszlophoz.
3.  **Indexek és Auto-Increment:**
    *   `CREATE INDEX`: Indexek létrehozása a lekérdezések gyorsítására (CREATE UNIQUE INDEX).
    *   `DROP INDEX`: Indexek törlése.
    *   **AUTO INCREMENT:** Egyedi szám automatikus generálása új rekord beszúrásakor.

## 4. fejezet: Adatmanipulációs Nyelv (DML) – Írási műveletek

Ez a fejezet az adatok bevitelére, módosítására és törlésére vonatkozó alapvető DML parancsokat tárgyalja.

1.  **`INSERT INTO` utasítás:** Új rekordok beszúrása. Két szintaktikai forma (oszlopnevekkel vagy anélkül). Példák csak megadott oszlopokba történő beszúrásra.
2.  **`UPDATE` utasítás:** Meglévő rekordok módosítása. **A `WHERE` záradék fontossága:** meghatározza a frissítendő rekordokat (figyelmeztetés a záradék kihagyására).
3.  **`DELETE` utasítás:** Meglévő rekordok törlése. **A `WHERE` záradék fontossága:** meghatározza a törlendő rekordokat (figyelmeztetés a záradék kihagyására).
4.  **Adatok másolása táblák között:**
    *   `SELECT INTO`: Adatok másolása egy táblából egy új táblába (biztonsági másolat készítése).
    *   `INSERT INTO SELECT`: Adatok másolása egy táblából egy másik, már létező táblába.

## 5. fejezet: Adatlekérdezés (SELECT) – Szűrés, Rendezés és Függvények

Az SQL leghasználtabb parancsa a `SELECT`, amelynek részletezése a hatékony adatkinyeréshez elengedhetetlen.

1.  **Alapvető lekérdezés:** `SELECT` (adatok kinyerése) és `SELECT DISTINCT` (különböző értékek).
2.  **Szűrés a `WHERE` kulcsszóval:** Rekordok szűrése a megadott feltételek alapján.
    *   **Összehasonlító operátorok:** `=`, `>`, `<`, `>=`, `<=`, `<>`, `!=`.
    *   **Logikai operátorok:** `AND`, `OR`, `NOT` és ezek kombinálása.
3.  **NULL értékek kezelése:** A NULL érték definíciója (nincs értéke, különbözik a nullától vagy szóköztől). Tesztelése az `IS NULL` és `IS NOT NULL` operátorokkal.
4.  **Keresés és tartományok:**
    *   `LIKE` operátor: Minta keresése wildcard karakterekkel (%, _).
    *   `IN` operátor: Több lehetséges érték megadása (többszörös OR rövidítése, `NOT IN`, al-lekérdezés).
    *   `BETWEEN` operátor: Adott, inkluzív tartományon belüli értékek kiválasztása (számok, szövegek, dátumok).
5.  **Rendezés és limitálás:**
    *   `ORDER BY`: Eredményhalmaz rendezése növekvő (ASC) vagy csökkenő (DESC) sorrendben, több oszlop szerinti rendezés.
    *   `LIMIT` klauzula: A visszaadandó rekordok számának korlátozása.
    *   `OFFSET` klauzula: A lekérdezés kezdőpontjának megadása.
6.  **Aggregáló függvények:**
    *   `MIN()` és `MAX()`: Legkisebb/legnagyobb érték visszaadása.
    *   `COUNT()`: Sorok számának visszaadása.
    *   `AVG()`: Numerikus oszlop átlagának visszaadása.
    *   `SUM()`: Numerikus oszlop teljes összegének visszaadása.
7.  **Alias-ok:** Ideiglenes nevek tábláknak vagy oszlopoknak az `AS` kulcsszóval (olvashatóság növelése).

## 6. fejezet: Összetett Lekérdezések és Adatösszegzés

Ez a fejezet a több táblát érintő és az adatok csoportosítását és összegzését célzó fejlett lekérdezési technikákra fókuszál.

1.  **`JOIN` Klauzula:** Két vagy több táblázat sorainak összekapcsolása a kapcsolódó oszlop alapján.
2.  **JOIN típusok:**
    *   **INNER JOIN:** Csak az azonos értékekkel rendelkező rekordok mindkét táblából.
    *   **LEFT JOIN:** Minden rekord a bal oldali táblából és az egyező rekordok a jobb oldali táblából.
    *   **RIGHT JOIN:** Minden rekord a jobb oldali táblából és az egyező rekordok a bal oldali táblából.
    *   **CROSS JOIN:** Minden rekordot visszaad mindkét táblából.
    *   **SELF JOIN:** Egy tábla önmagával való összekapcsolása.
3.  **`UNION` Operátor:** Két vagy több `SELECT` eredménykészletének kombinálása (követelmények: azonos oszlopszám, hasonló adattípusok, azonos sorrend). `UNION ALL` (duplikált értékek engedélyezése).
4.  **`GROUP BY` utasítás:** Az azonos értékkel rendelkező sorok összefoglaló sorokba csoportosítása, gyakran aggregáló függvényekkel együtt. Példák a `JOIN` kombinációval.
5.  **`HAVING` klauzula:** Szűrési lehetőség aggregáló függvényekkel (ahol a `WHERE` nem használható).
6.  **Feltételes logika és Operátorok:**
    *   `CASE` kifejezés: if-then-else logika megvalósítása.
    *   `EXISTS` operátor: Egy alkérdésben lévő rekordok létezésének vizsgálata.
    *   `ANY` és `ALL` operátorok: Összehasonlítás a tartomány más értékeivel.

## 7. fejezet: Fejlett Adatbázis Programozás és Utility-k

Ez a fejezet a tárolt eljárásokkal és a változókkal való munkát, valamint az adatbázis-kezelés egyéb segédparancsait mutatja be.

1.  **Tárolt Eljárások (Stored Procedures):** Előkészített SQL-kód, amely menthető és újra felhasználható. Paraméterek átadásának lehetősége.
    *   Létrehozás (`CREATE PROCEDURE`).
    *   Előnyök és hátrányok (pl. csökkentett hálózati forgalom vs. nehézkes hibakeresés).
    *   Kezelés: Törlés (`DROP PROCEDURE`). Módosítás (Törlés, majd újra létrehozás).
    *   Paraméterek típusai: **IN**, **OUT**, **INOUT**.
    *   `SHOW PROCEDURE STATUS`.
2.  **Változók:**
    *   Deklarálás (`DECLARE`).
    *   Értékadás.
    *   Hatókör (eljárás végéig él, session változók).
3.  **Egyéb eszközök:**
    *   Kommentek (egysoros `--`, több soros `/* */`).
    *   Aritmetikai és Logikai operátorok összefoglalása.

## 8. fejezet: Gyakorló Feladatok (Northwind Adatbázis)

Ez a fejezet gyakorlati feladatokat tartalmaz a tanultak elmélyítéséhez a Northwind adatbázis alapján.

1.  **`SELECT` gyakorlás:** Rekordok kiválasztása különböző szűrési feltételekkel (egyszerű WHERE, AND/OR/NOT, DISTINCT).
2.  **Rendezés (`ORDER BY`):** Növekvő és csökkenő sorrend, több oszlop szerinti rendezés.
3.  **Adatmódosítás:** `INSERT INTO`, `UPDATE` (WHERE záradékkal), `DELETE` (WHERE záradékkal).
4.  **Speciális lekérdezések:** `LIMIT` (legnagyobb/legkisebb érték).
5.  **Függvények és Operátorok:** `COUNT`, `AVG`, `SUM`. `LIKE` operátor mintakereséssel. `IN` és `BETWEEN`.
6.  **Összetett lekérdezések:** `JOIN` (különböző típusú összekapcsolások aliasokkal). `GROUP BY` (ügyfelek száma országonként).

---
Ez lecke logikailag halad az SQL nyelvi kategóriák (DDL, DML) bemutatásától, az alapvető műveleteken át a haladó lekérdezési technikákig (JOIN, GROUP BY) és az adatbázis-programozásig (Tárolt eljárások), amelyeket végül gyakorlati feladatokkal lehet elmélyíteni.