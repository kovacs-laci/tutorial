---
id: rest-api-preparations
slug: /rest-api-preparations
title: "Projekt előkészítése"
---

## 1. Projekt könyvtár létrehozása
- Hozzunk létre egy új mappát, pl. `rest-api`.
- Ebben lesz minden fájl: `composer.json`, `.htaccess`, `index.php`, és később az `app/` könyvtár a kódnak.

---

## 2. composer.json fájl
Az autoload beállítás miatt fontos, hogy a namespace‑eket és könyvtárakat jól definiáljuk:

```json
{
    "name": "student/php-rest-api",
    "description": "Egyszerű REST API PHP-ban",
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    },
    "require": {}
}
```

👉 **Magyarázat**:
- Az `App\\` namespace az `app/` könyvtárra mutat.
- Így ha pl. van egy `app/Html/Request.php` fájl, akkor azt `use App\Html\Request;` néven tudjuk behúzni.

Ezután futtatjuk:
```bash
composer update
# vagy
composer dump-autoload
```

---

## 3. .htaccess fájl
Ez biztosítja, hogy minden kérés az `index.php`‑ra irányítódjon:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

👉 **Magyarázat**:
- Ha a kérés nem létező fájlra vagy könyvtárra mutat, akkor az `index.php` kapja meg.
- Így az API végpontokat (pl. `/counties/1/cities`) az `index.php` kezeli.

---

## 4. index.php fájl

```php
<?php
session_start();
include './vendor/autoload.php';

use App\Html\Request;

Request::handle();
```

👉 **Magyarázat**:
- `session_start()` – szükséges, ha session alapú működést is szeretnénk (pl. token tárolás).
- `vendor/autoload.php` – a Composer autoload fájlja, ami betölti az osztályokat.
- `Request::handle()` – itt indul a vezérlés, a `Request` osztály fogja feldolgozni a bejövő HTTP kérést.

---

:::info GitHub repository – a projekt forráskódja

A REST API fejlesztése során kiemelten fontos, hogy a projekt kódja **verziókövetett**, átlátható és visszakövethető legyen.  
A Git és a GitHub használata nemcsak a forráskód tárolását teszi lehetővé, hanem:

- segíti a fejlesztési folyamat dokumentálását
- biztosítja a változások pontos követhetőségét
- támogatja a csapatmunkát és a kódfelülvizsgálatot
- lehetővé teszi a stabil állapotokra való visszatérést

A fejezetben bemutatott REST API példaprojekt teljes forráskódja elérhető itt:

👉 **https://github.com/kovacs-laci/zip-api**

Ez a repository tartalmazza a példák teljes implementációját, így könnyen követhető és kipróbálható a tananyag minden lépése.
:::


## Javaslatok / észrevételek
- **Könyvtárstruktúra**: érdemes az `app/` könyvtárban külön mappákat létrehozni (pl. `Controllers`, `Models`, `Repositories`, `Html`). Így láthatóak a különböző a rétegeket.
- **Request osztály**: jó, ha ez az osztály felelős a route‑ok feloldásáért és a megfelelő controller meghívásáért. Később bővíthetjük middleware‑ekkel (pl. token ellenőrzés).
- **Biztonság**: már az elején érdemes gondolni rá, hogy minden inputot validáljunk (pl. `filter_input`), és a token ellenőrzést központilag kezeljük.
- **Fejlesztési kényelem**: a `composer dump-autoload -o` gyorsabb autoloadot ad, ha sok osztály van.  
