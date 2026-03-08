---
id: rest-client-composer-init
title: Composer inicializálása
sidebar_label: Composer init
slug: /rest-client/composer
---

# Composer inicializálása

A REST API kliens egy modern PHP projekt lesz, ezért szükségünk van a **Composerre**, amely:

- kezeli a projekt függőségeit,
- automatikusan betölti az osztályokat (autoload),
- egységes szerkezetet ad a projektnek.

Ebben a fejezetben inicializáljuk a projektet a Composerrel, és beállítjuk a **PSR‑4 autoloadolást**, amely lehetővé teszi, hogy az `App\` namespace‑ből származó osztályokat automatikusan betöltse a rendszer.

---

# Előkészületek

Győződj meg róla, hogy a Composer telepítve van a gépeden.

Ellenőrzés:

```
composer --version
```

Ha verziószámot látsz, minden rendben.

---

# Composer inicializálása

A projekt gyökérkönyvtárában futtasd:

```
composer init
```

A Composer kérdéseket fog feltenni.  
Az alábbi válaszokat javasoljuk:

| Kérdés | Ajánlott válasz |
|--------|------------------|
| Package name | `rest/client` |
| Description | `REST API kliens tananyag` |
| Author | saját név |
| Minimum stability | `stable` |
| License | `MIT` |
| Would you like to define your dependencies? | `no` |
| Would you like to define your dev dependencies? | `no` |
| Add PSR‑4 autoload mapping? | `yes` |
| Namespace | `App\\` |

A Composer létrehozza a `composer.json` fájlt.

---

# Autoload frissítése

A Composernek létre kell hoznia az autoload fájlokat:

```
composer dump-autoload
```

Ez létrehozza a `vendor/` mappát és az automatikus osztálybetöltőt.

---

# A composer.json tartalma

A folyamat végén a `composer.json` nagyjából így fog kinézni:

```json
{
    "name": "rest/client",
    "description": "REST API kliens tananyag",
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    },
    "require": {}
}
```

Ez azt jelenti, hogy:

- minden `App\` namespace‑ű osztályt az `app/` mappából tölt be a Composer,
- nincs szükség többé `require` vagy `include` hívásokra,
- a projekt teljesen modern, PSR‑4 kompatibilis.

---

# Ellenőrzés

Hozz létre egy tesztosztályt:

📁 `app/Test.php`

```php
<?php

namespace App;

class Test
{
    public static function hello()
    {
        return "Autoload működik!";
    }
}
```

Majd a `public/index.php`‑ban:

```php
<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Test;

echo Test::hello();
```

Ha a böngészőben ezt látod:

```
Autoload működik!
```

akkor a Composer autoloadolás sikeresen működik.

