---
id: laravel-localization
slug: /laravel/localization
title: "Lokalizálás"
---

A Laravel-es lokalizáció lényege az `__()` függvény és a `resources/lang` mappa, de a **nyelvváltás működő, frontendről vezérelt** megoldásához még három fontos elem kell:

- hogyan tárolod a kiválasztott nyelvet (session / cookie / user profil),
- hogyan állítja be Laravel minden kérésnél az aktuális nyelvet,
- hogyan vált a frontend (dropdown → request → locale módosítása).

Az alábbiakban egy teljes, gyakorlatban is használt megoldást kapsz Laravel 11+ verzióhoz.

---

## Nyelvi fájlok létrehozása

A `resources/lang` mappában legyenek almappák:

```text
resources/lang/en/messages.php
resources/lang/hu/messages.php
```

Példa:

```php title="resources/lang/en/messages.php"
return [
    'welcome' => 'Welcome!',
];
```

```php title="resources/lang/hu/messages.php"
return [
    'welcome' => 'Üdvözlet!',
];
```

Használat Blade sablonban:

```php title="Blade sablon"
{{ __('messages.welcome') }}
```

:::info Laravel 11+

Ha a projektedben még nem létezik a `resources/lang` mappa, hozd létre manuálisan, vagy futtasd:

```bash title="Parancssor"
php artisan lang:publish
```

Ez létrehozza a Laravel alapértelmezett nyelvi fájljait.

:::

---

## A kiválasztott nyelv tárolása

A legegyszerűbb megoldás a session használata.

Amikor a felhasználó nyelvet választ, küldj egy kérést:

```text
GET /set-locale/hu
GET /set-locale/en
```

A választott nyelvet a sessionben tároljuk.

---

## Route a nyelvváltáshoz

```php title="routes/web.php"
use Illuminate\Support\Facades\Route;

Route::get('/set-locale/{locale}', function ($locale) {

    session([
        'locale' => $locale
    ]);

    return redirect()->back();
});
```

Ez eltárolja a sessionben a kiválasztott nyelvet, majd visszairányítja a felhasználót az előző oldalra.

---

## Middleware létrehozása

Hozz létre egy middleware-t:

```bash title="Parancssor"
php artisan make:middleware SetLocale
```

A létrehozott fájl:

```text
app/Http/Middleware/SetLocale.php
```

Tartalma:

```php title="app/Http/Middleware/SetLocale.php"
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(
        $request,
        Closure $next
    ) {

        $locale = session(
            'locale',
            'hu'
        );

        App::setLocale(
            $locale
        );

        return $next(
            $request
        );
    }
}
```

A middleware minden kérés elején kiolvassa a nyelvet a sessionből, majd beállítja azt a Laravel számára.

---

## Middleware regisztrálása Laravel 11+ alatt

Laravel 11-től az új projektekben már nincs külön `app/Http/Kernel.php` fájl. 

A middleware-eket a `bootstrap/app.php` fájlban kell regisztrálni.

:::info
Köszönet **Abos Péternek** (13I-2026) aki felhívta erre a figyelmet.
:::

```php title="bootstrap/app.php"
<?php

use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(
    basePath: dirname(__DIR__)
)
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(
        function (
            Middleware $middleware
        ): void {

            $middleware->web(
                append: [
                    SetLocale::class,
                ]
            );
        }
    )
    ->withExceptions(
        function (
            Exceptions $exceptions
        ): void {
            //
        }
    )
    ->create();
```

Mostantól a `SetLocale` middleware minden webes kérésnél lefut.

---

## Frontend: nyelvválasztó dropdown

Példa HTML:

```html title="Blade sablon"
<select id="lang-switcher">

    <option value="hu">
        Magyar
    </option>

    <option value="en">
        English
    </option>

</select>

<script>

document
    .getElementById(
        'lang-switcher'
    )
    .addEventListener(
        'change',
        function () {

            window.location.href =
                '/set-locale/'
                + this.value;
        }
    );

</script>
```

A felhasználó kiválaszt egy nyelvet, a böngésző elküldi a megfelelő kérést, a session frissül, majd a Laravel már az új nyelven rendereli az oldalt.

---

## Hogyan működik a gyakorlatban?

1. A felhasználó kiválasztja a nyelvet a dropdownból.
2. A böngésző elküldi a `/set-locale/en` vagy `/set-locale/hu` kérést.
3. A route elmenti a kiválasztott nyelvet a sessionbe.
4. A `SetLocale` middleware minden kérésnél lefut.
5. A middleware meghívja az `App::setLocale()` metódust.
6. A Blade sablonokban az `__()` függvény már a megfelelő nyelvi fájlból olvas.

Folyamatábra:

```text
Felhasználó nyelvet választ
            ↓
GET /set-locale/en
            ↓
Session frissítése
            ↓
Következő kérés
            ↓
SetLocale middleware
            ↓
App::setLocale('en')
            ↓
Blade sablon renderelése
            ↓
Angol nyelvű oldal
```

---

## Az aktuális nyelv megjelenítése

Az aktuálisan kiválasztott nyelv lekérdezhető:

```php title="Blade sablon"
{{ app()->getLocale() }}
```

Például:

```php title="Blade sablon"
<p>
    Aktuális nyelv:
    {{ app()->getLocale() }}
</p>
```

---

## Az aktuális nyelv előre kijelölése a dropdownban

Blade használatával a kiválasztott nyelv automatikusan megjeleníthető:

```php title="Blade sablon"
<select id="lang-switcher">

    <option
        value="hu"
        @selected(
            app()->getLocale() === 'hu'
        )
    >
        Magyar
    </option>

    <option
        value="en"
        @selected(
            app()->getLocale() === 'en'
        )
    >
        English
    </option>

</select>
```

Így oldalfrissítés után is a ténylegesen aktív nyelv látszik kiválasztva.

---

## További lehetőségek

Később többféleképpen továbbfejlesztheted a megoldást:

- **Cookie alapú nyelvtárolás**
- **Felhasználói profilban tárolt nyelvi beállítás**
- **URL alapú lokalizáció** (`/en/products`, `/hu/products`)
- **Domain alapú lokalizáció** (`example.com`, `example.hu`)
- **Laravel Localization csomagok használata** (pl. `mcamara/laravel-localization`)

---

## Összefoglalás

A Laravel lokalizáció működő megoldásához négy elem szükséges:

1. Nyelvi fájlok a `resources/lang` mappában.
2. A kiválasztott nyelv tárolása (pl. sessionben).
3. Egy route a nyelvváltás kezelésére.
4. Egy middleware, amely minden kérésnél meghívja az `App::setLocale()` metódust.

Ennek eredményeként a Blade sablonokban használt:

```php title="Blade sablon"
{{ __('messages.welcome') }}
```

kifejezés mindig az aktuálisan kiválasztott nyelven jelenik meg.

---