---
id: namespaces-composer
slug: /php-alapok/namespaces-composer
title: "Namespaces és Composer autoload"
---

# Namespaces és Composer autoload

A modern PHP fejlesztés egyik alapköve a **namespace** és a **Composer autoload**.  
Ezek teszik lehetővé, hogy a kódunk:

- átlátható legyen,
- ne ütközzenek az osztálynevek,
- automatikusan betöltődjenek a fájlok,
- és a projektünk Laravel‑szerű struktúrát kapjon.

---

# Miért van szükség namespace‑ekre?

A namespace olyan, mint egy „mappa” az osztályok számára.  
Segít elkerülni az ütközéseket:

```
App\Models\Student
App\Controllers\StudentController
App\Database\Database
```

Ha nem lenne namespace, ezek mind egyszerűen csak `Student`, `StudentController`, `Database` lennének — és könnyen ütköznének más könyvtárak osztályaival.

---

# Miért NEM használunk procedurális megoldást?

A procedurális kód:

- könnyebb elsőre,
- de szétforgácsolja a fókuszt,
- és sok diák „beragad” ebbe a gondolkodásba.

A modern PHP viszont **OOP + namespaces + autoloading** alapú.

---

# Miért jobb az OOP + namespace megközelítés?

- természetes átmenetet ad a modern keretrendszerekhez (Laravel, Symfony),
- tisztább, bővíthetőbb, újrafelhasználhatóbb kódot eredményez.

Ezért a tananyagban **kizárólag OOP + namespace + autoload** megoldást használunk.

---

# PSR‑4 – a modern PHP szabvány

A PSR‑4 azt mondja ki:

> A namespace struktúra tükrözze a könyvtárstruktúrát.

Példa:

```
App\Models\Student  →  app/Models/Student.php
App\Controllers\StudentController → app/Controllers/StudentController.php
```

Ez a Laravelben is így működik.

---

# Composer telepítése

A Composer a PHP csomagkezelője.  
Letöltés: https://getcomposer.org/

Telepítés után ellenőrzés:

```
composer --version
```

---

# Projektstruktúra

```
project/
│
├── app/
│   ├── Models/
│   │   └── Student.php
│   ├── Controllers/
│   │   └── StudentController.php
│   └── Database/
│       └── Database.php
│
├── vendor/
├── composer.json
└── public/
    └── index.php
```

---

# composer.json létrehozása

A projekt gyökerében:

```
composer init
```

Majd hozzáadjuk az autoload részt:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

Ez azt jelenti:

- minden `App\` namespace‑szel kezdődő osztály
- az `app/` mappából töltődik be

---

# Autoload frissítése

Miután létrehoztuk a composer.json‑t:

```
composer dump-autoload
```

Ez generálja a `vendor/autoload.php` fájlt.

---

# Osztály létrehozása namespace‑szel

**app/Models/Student.php**

```php
<?php

namespace App\Models;

class Student {
    public $name;
    public $age;

    public function introduce() {
        return "Hi, I am " . $this->name;
    }
}
```

---

# Osztály használata autoloaddal

**public/index.php**

```php
<?php

require "../vendor/autoload.php";

use App\Models\Student;

$student = new Student();
$student->name = "László";
$student->age = 17;

echo $student->introduce();
```

---

# Database osztály namespace‑szel

**app/Database/Database.php**

```php
<?php

namespace App\Database;

use PDO;

class Database {
    private PDO $pdo;

    public function __construct(array $config) {
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8";

        $this->pdo = new PDO($dsn, $config["user"], $config["pass"]);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function connection(): PDO {
        return $this->pdo;
    }
}
```

---

# Controller példa

**app/Controllers/StudentController.php**

```php
<?php

namespace App\Controllers;

use App\Models\Student;

class StudentController {
    public function show(Student $student) {
        return $student->introduce();
    }
}
```

---

# Mini router (opcionális)

**public/index.php**

```php
<?php

require "../vendor/autoload.php";

use App\Controllers\StudentController;
use App\Models\Student;

$student = new Student();
$student->name = "Anna";
$student->age = 16;

$controller = new StudentController();

echo $controller->show($student);
```
---

## Megjegyzés

- Érdemes utánanézni a PSR‑4 szabványnak.
- Lásd még: Laravel autoloading, service container, dependency injection.

