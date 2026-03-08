---
id: rest-api-database-connection
slug: /rest-api-database-connection
title: "Adatbázis kapcsolat"
---

# REST API adatbázis kapcsolat

Mielőtt a repository réteget felépítjük, szükségünk van egy központi osztályra, amely az adatbázis kapcsolatot kezeli.  
Ez lesz a **DatabaseConnection** osztály, amely a MySQL adatbázishoz kapcsolódik és biztosítja a `mysqli` objektumot a további rétegek számára.

---

## 1. DatabaseConnection osztály (egyszerű verzió)

```php
<?php
namespace App\Database;

use mysqli;
use Exception;

class DatabaseConnection
{
    const HOST = 'localhost';
    const USER = 'root';
    const PASSWORD = null;
    const DATABASE = 'postoffice';

    public $mysqli;

    public function __construct(
        $host = self::HOST,
        $user = self::USER,
        $password = self::PASSWORD,
        $database = self::DATABASE
    ) {
        try {
            $this->mysqli = new mysqli(
                $host,
                $user,
                $password,
                $database
            );

            if ($this->mysqli->connect_error) {
                throw new Exception("Connection failed: " . $this->mysqli->connect_error);
            }

            $this->mysqli->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log($e->getMessage());
            die("Database connection error, please try again later.");
        }
    }

    public function __destruct()
    {
        if ($this->mysqli) {
            $this->mysqli->close();
        }
    }
}
```

---

## 2. Magyarázat

- **Konstansok (`HOST`, `USER`, `PASSWORD`, `DATABASE`)**: az adatbázis kapcsolat alapbeállításai.
- **`__construct()`**: létrehozza a `mysqli` kapcsolatot.
    - Ha hiba történik, `Exception` dobódik, és a hiba naplózásra kerül.
    - A karakterkészletet `utf8mb4`‑re állítjuk, hogy minden Unicode karaktert (pl. ékezetes betűk, emoji) kezelni tudjon.
- **`__destruct()`**: automatikusan lezárja a kapcsolatot, amikor az objektum megsemmisül.
- **Hibakezelés**: ha nem sikerül a kapcsolat, a program leáll egy felhasználóbarát üzenettel, miközben a részletes hiba bekerül a logba.

---

## 3. Használat példa

```php
use App\Database\DatabaseConnection;

$db = new DatabaseConnection();
$result = $db->mysqli->query("SELECT * FROM counties");

while ($row = $result->fetch_assoc()) {
    echo $row['name'] . PHP_EOL;
}
```

👉 **Magyarázat**:
- Példányosítjuk a `DatabaseConnection` osztályt.
- A `mysqli` objektumon keresztül futtatunk egy egyszerű lekérdezést.
- Az eredményt soronként kiírjuk.

---

## 4. Miért külön osztály?

- **Egységes kezelés**: minden repository ugyanazt a kapcsolatot használja.
- **Tiszta architektúra**: a kapcsolat létrehozása és kezelése külön rétegben van, nem keveredik a táblák logikájával.
- **Újrafelhasználhatóság**: ha más osztály is közvetlenül DB kapcsolatot igényel (pl. migrációs script), ugyanazt az osztályt használhatja.
- **Tanulási szempontból**: jól mutatja a „Single Responsibility Principle” elvet – egy osztály egy felelősség.

---

## 5. Jó gyakorlat – környezeti változók használata

Az adatok kerüljenek `.env` fájlba vagy szerver beállításba:

**`.env` fájl:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=postoffice
```

**DatabaseConnection osztály környezeti változókkal:**

```php
<?php
namespace App\Database;

use mysqli;
use Exception;

class DatabaseConnection
{
    public $mysqli;

    public function __construct()
    {
        $host = getenv('DB_HOST') ?: 'localhost';
        $user = getenv('DB_USER') ?: 'root';
        $password = getenv('DB_PASSWORD') ?: null;
        $database = getenv('DB_NAME') ?: 'postoffice';

        try {
            $this->mysqli = new mysqli(
                $host,
                $user,
                $password,
                $database
            );

            if ($this->mysqli->connect_error) {
                throw new Exception("Connection failed: " . $this->mysqli->connect_error);
            }

            $this->mysqli->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log($e->getMessage());
            die("Database connection error, please try again later.");
        }
    }

    public function __destruct()
    {
        if ($this->mysqli) {
            $this->mysqli->close();
        }
    }
}
```

👉 **Magyarázat**:
- A `getenv()` függvény beolvassa a környezeti változókat.
- Így a jelszó és a felhasználó nincs a kódban, hanem külön konfigurációban.
- Ez biztonságosabb és rugalmasabb: különböző környezetekben (fejlesztés, teszt, éles) más beállításokat használhatunk.

---

# Összefoglalás

A **DatabaseConnection** osztály az adatbázis kapcsolatért felel.
- Biztosítja a `mysqli` objektumot a repositoryk számára.
- Hibakezelést és karakterkészlet beállítást végez.
- Automatikusan lezárja a kapcsolatot.

✨ Két megközelítést ismerhetünk meg:
- **Egyszerű verzió**: konstansok a kódban – tanulási célra ideális.
- **Jó gyakorlat**: környezeti változók – biztonságosabb, professzionálisabb, éles környezetben kötelező.
