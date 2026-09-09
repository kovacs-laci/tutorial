---
id: sql-attekintes
slug: /sql
title: "SQL tananyag áttekintése"
---

# SQL tananyag

Ez a tananyag a relációs adatbázisok alapjaitól a többtáblás lekérdezésekig vezet. Minden gyakorlati példa a projekt Northwind-adatbázisára épül: [Northwind telepítőscript](/files/install_northwind.sql).

## Northwind telepítése és mentése

A leckék példái a letölthető [Northwind telepítőscriptet](/files/install_northwind.sql) használják. A script létrehozza a `Northwind` adatbázist, a táblákat és a mintaadatokat.

Először kattints a fenti linkre, töltsd le az `install_northwind.sql` fájlt, és jegyezd meg, hogy melyik mappába került. A weboldal csak a fájlt teszi letölthetővé; az importálás a saját számítógépeden, az XAMPP MySQL szerverébe történik.

### Importálás a MySQL CLI-n keresztül

XAMPP alatt először indítsd el a **MySQL** modult. Nyiss egy **Parancssort** (`cmd`), majd futtasd az alábbi parancsot. A példa azt feltételezi, hogy a letöltött fájl a Windows `Downloads` mappájában van:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root -p < "%USERPROFILE%\Downloads\install_northwind.sql"
```

Ha a MySQL root felhasználónak nincs jelszava, a `-p` kapcsoló elhagyható:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root < "%USERPROFILE%\Downloads\install_northwind.sql"
```

Ha a fájlt másik mappába töltötted le, a második útvonalat cseréld ki a tényleges helyére. Például:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root -p < "C:\Users\SajatNev\Desktop\install_northwind.sql"
```

A sikeres importálás ellenőrzése:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root -p -e "USE Northwind; SHOW TABLES;"
```

### Belépés a MySQL parancssorába

Interaktív munkához indítsd el a klienst:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root -p
```

Ezután például így választhatod ki az adatbázist és ellenőrizheted a rekordokat:

```sql
USE Northwind;
SHOW TABLES;
SELECT COUNT(*) AS CustomerCount FROM Customers;
```

Ha a `mysql.exe` nem található a megadott helyen, ellenőrizd, hogy az XAMPP valóban a `C:\xampp` mappába van-e telepítve. Más telepítési hely esetén az útvonalat módosítani kell.

### Exportálás `mysqldump` segítségével

Az adatbázis exportjához használd a `mysqldump` klienst. A parancs a struktúrát és az adatokat is elmenti:

```bat
"C:\xampp\mysql\bin\mysqldump.exe" -u root -p --databases Northwind > "%USERPROFILE%\Downloads\northwind-backup.sql"
```

A `--databases` kapcsoló a mentésbe a `CREATE DATABASE` és `USE` utasításokat is beleteszi, ezért a mentés önállóan visszaimportálható.

### Export visszaimportálása

Egy korábban elkészített mentést ugyanígy tölthetsz vissza:

```bat
"C:\xampp\mysql\bin\mysql.exe" -u root -p < "%USERPROFILE%\Downloads\northwind-backup.sql"
```

Ellenőrzés után a mentésből visszaállított adatbázist ugyanazokkal a lekérdezésekkel használhatod, mint a telepítőscript után.

> **Figyelem:** az `install_northwind.sql` a táblák létrehozása előtt törli a Northwind tábláit. Csak gyakorló adatbázison futtasd, és exportálás előtt ellenőrizd, hogy a mentés célfájlja nem fog-e felülíródni.

## Tanulási útvonal

1. Bevezetés és relációs alapfogalmak
2. Adatbázisok és táblák (DDL)
3. Megszorítások és indexek
4. Adatmódosítás (DML)
5. SELECT, szűrés és rendezés
6. Összetett lekérdezések és összesítés
7. Tárolt eljárások
8. Northwind gyakorló feladatok

## Northwind-táblák

A leggyakrabban használt kapcsolatok:

- `Customers` → `Orders` → `OrderDetails`
- `Products` → `OrderDetails`
- `Categories` → `Products`
- `Suppliers` → `Products`
- `Employees` → `Orders`

A módosító feladatokat lehetőleg külön tesztadatbázison vagy tranzakcióban futtasd.
