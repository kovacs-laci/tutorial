---
id: pdo-kapcsolat-oop
slug: /php-alapok/pdo-kapcsolat-oop
title: "OOP alapú adatbázis kapcsolat PDO-val"
---

# OOP alapú adatbázis kapcsolat PDO-val

Ebben a fejezetben azt mutatjuk be, hogyan érdemes az adatbázis‑kapcsolatot **objektumorientált módon** felépíteni.  
A cél:

- a kapcsolat legyen **újrafelhasználható**
- a kód legyen **átlátható**
- a PDO beállításai legyenek **központosítva**
- a kapcsolatot könnyen lehessen **továbbadni** más osztályoknak (modelleknek)

---

# Alap Database osztály

A legegyszerűbb OOP‑alapú kapcsolat így néz ki:

```php
<?php
class Database {
    private $pdo;

    public function __construct(
        $host = "localhost",
        $dbname = "iskola",
        $user = "root",
        $pass = ""
    ) {
        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";

        $this->pdo = new PDO($dsn, $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function kapcsolat() {
        return $this->pdo;
    }
}
```

Használat:

```php
$db = new Database();
$pdo = $db->kapcsolat();
```

---

# Singleton-szerű megoldás (egy kapcsolat az egész alkalmazásban)

Gyakran szeretnénk, hogy **csak egyetlen PDO kapcsolat** legyen a teljes alkalmazásban.

```php
<?php
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $dsn = "mysql:host=localhost;dbname=iskola;charset=utf8";
        $this->pdo = new PDO($dsn, "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function kapcsolat() {
        return $this->pdo;
    }
}
```

Használat:

```php
$pdo = Database::getInstance()->kapcsolat();
```

---

# Konfiguráció külön fájlban

A beállításokat érdemes külön fájlban tartani:

**config.php**

```php
return [
    "host" => "localhost",
    "dbname" => "iskola",
    "user" => "root",
    "pass" => ""
];
```

**Database.php**

```php
<?php
class Database {
    private $pdo;

    public function __construct($config) {
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8";

        $this->pdo = new PDO($dsn, $config["user"], $config["pass"]);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function kapcsolat() {
        return $this->pdo;
    }
}
```

Használat:

```php
$config = require "config.php";
$db = new Database($config);
$pdo = $db->kapcsolat();
```

---

# Hibakezelés OOP módon

```php
try {
    $pdo = Database::getInstance()->kapcsolat();
    echo "Kapcsolat sikeres!";
} catch (PDOException $e) {
    echo "Hiba történt: " . $e->getMessage();
}
```

---

# Mini projekt – „Adatbázis kapcsolat OOP módon”

Készíts egy kis projektet:

```
projekt/
│
├── config.php
├── classes/
│   └── Database.php
│
└── teszt.php
```

**teszt.php**

```php
<?php
$config = require "config.php";
require "classes/Database.php";

$db = new Database($config);
$pdo = $db->kapcsolat();

$stmt = $pdo->query("SELECT NOW() AS ido");
$eredmeny = $stmt->fetch();

echo "Az adatbázis elérhető, idő: " . $eredmeny["ido"];
```

---

# Gyakorlófeladatok

1. Bővítsd a Database osztályt úgy, hogy logolja a hibákat egy fájlba.
2. Készíts metódust, amely ellenőrzi, hogy a kapcsolat él‑e (`ping`).
3. Készíts olyan verziót, amely SQLite adatbázissal is működik.
4. Készíts olyan verziót, amely környezeti változókból (`.env`) olvas be adatokat.

---

## Megjegyzés

- Érdemes utánanézni a dependency injection mintának.
- Lásd még: service container, repository pattern, MVC architektúra.
