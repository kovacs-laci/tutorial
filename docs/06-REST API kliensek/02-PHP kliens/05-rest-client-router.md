---
id: rest-client-router
title: Router készítése
sidebar_label: Router
slug: /rest-client/router
---

# Router készítése

A REST API kliensünk több különböző oldalt fog megjeleníteni:

- megyék listája,
- új megye létrehozása,
- megye módosítása,
- megye törlése.

Ahhoz, hogy a böngészőben megadott URL alapján eldönthessük,  
**melyik controller melyik metódusa fusson**, szükségünk van egy egyszerű routerre.

A router feladata:

- az URL feldolgozása,
- a megfelelő controller kiválasztása,
- a megfelelő metódus meghívása,
- az esetleges paraméterek átadása (pl. id).

Ez a fejezet bemutatja, hogyan készítünk egy letisztult, könnyen érthető routert.

---

# Miért van szükség routerre?

A router nélkül minden oldalhoz külön PHP fájl kellene:

```
counties.php
counties-create.php
counties-edit.php
counties-delete.php
```

Ez:

- nehezen karbantartható,
- nem bővíthető,
- nem modern.

A router segítségével viszont:

```
/counties
/counties/create
/counties/edit/3
/counties/delete/3
```

mind ugyanabba az `index.php` fájlba fut be,  
és a router dönti el, melyik controller és metódus fusson.

Ez a modern MVC rendszerek alapja.

---

# Hogyan működik a router?

A router az URL‑t három részre bontja:

```
/resource/action/id
```

Példák:

| URL | resource | action | id |
|-----|----------|--------|----|
| `/counties` | counties | index | – |
| `/counties/create` | counties | create | – |
| `/counties/edit/5` | counties | edit | 5 |
| `/counties/delete/5` | counties | delete | 5 |

A router ezeket az értékeket adja vissza az `index.php` számára.

---

# Router osztály

📁 `app/Router/Router.php`

```php
<?php

namespace App\Router;

class Router
{
    public function dispatch(string $uri): array
    {
        // Csak az útvonal részt vesszük (query string nélkül)
        $path = trim(parse_url($uri, PHP_URL_PATH), "/");

        // Részekre bontjuk az URL-t
        $parts = explode("/", $path);

        // Alapértelmezések
        $resource = $parts[0] ?: "counties";   // pl. / → counties
        $action   = $parts[1] ?? "index";      // pl. /counties → index
        $id       = $parts[2] ?? null;         // pl. /counties/edit/5 → 5

        return [$resource, $action, $id];
    }
}
```

---

# Hogyan használjuk a routert?

A `public/index.php` fájlban:

```php
<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Router\Router;

$router = new Router();
[$resource, $action, $id] = $router->dispatch($_SERVER['REQUEST_URI']);

// Controller kiválasztása
$controllerName = "App\\Controllers\\" . ucfirst($resource) . "Controller";
$controller = new $controllerName();

// Metódus meghívása
echo $controller->$action($id);
```

Ez a néhány sor:

- meghívja a routert,
- kiválasztja a megfelelő controllert,
- meghívja a megfelelő metódust,
- átadja az id‑t, ha van.

---

# Miért jó ez a megoldás?

### ✔ Egyszerű
A router mindössze néhány sor, mégis teljesen működőképes.

### ✔ Bővíthető
Ha később hozzáadjuk a városokat:

```
/cities
/cities/create
/cities/edit/10
```

a router **változtatás nélkül** működik tovább.

### ✔ Modern
Ugyanazt az elvet követi, mint a Laravel, Symfony, Express.js vagy Django.

---
