---
id: laravel-localization
slug: /laravel/localization
title: "Lokalizálás"
---

A Laravel‑es lokalizáció lényege az `__()` függvény és a `resources/lang` mappa, de a **nyelvváltás működő, frontend‑ről vezérelt** megoldásához még három fontos elem kell:

- hogyan tárolod a kiválasztott nyelvet (session / cookie / user profil),
- hogyan állítja be Laravel minden kérésnél az aktuális nyelvet,
- hogyan vált a frontend (dropdown → request → locale módosítása).

Az alábbiakban egy teljes, gyakorlatban is használt megoldást kapsz.

---

## 1. Nyelvi fájlok létrehozása

A `resources/lang` mappában legyenek almappák:

```
resources/lang/en/messages.php
resources/lang/hu/messages.php
```

Példa:

```php
// resources/lang/en/messages.php
return [
    'welcome' => 'Welcome!',
];

// resources/lang/hu/messages.php
return [
    'welcome' => 'Üdvözlet!',
];
```

Használat:

```php
{{ __('messages.welcome') }}
```

---

## 2. A kiválasztott nyelv tárolása (session vagy cookie)

A legegyszerűbb megoldás: **session**.

Amikor a felhasználó kiválasztja a nyelvet, küldj egy requestet:

```
GET /set-locale/hu
GET /set-locale/en
```

---

## 3. Route a nyelvváltáshoz

```php
// routes/web.php
Route::get('/set-locale/{locale}', function ($locale) {
    session(['locale' => $locale]);
    return redirect()->back();
});
```

Ez eltárolja a sessionben a választott nyelvet, majd visszairányítja a felhasználót.

---

## 4. Middleware, ami minden kérésnél beállítja a nyelvet

Hozz létre egy middleware‑t:

```
php artisan make:middleware SetLocale
```

Kód:

```php
// app/Http/Middleware/SetLocale.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle($request, Closure $next)
    {
        $locale = session('locale', 'hu'); // alapértelmezett nyelv
        App::setLocale($locale);

        return $next($request);
    }
}
```

Regisztráld a middleware‑t a `Kernel.php`‑ben:

```php
// app/Http/Kernel.php

protected $middleware = [
    // ...
    \App\Http\Middleware\SetLocale::class,
];
```

Mostantól minden kérésnél a session‑ben tárolt nyelv lesz aktív.

---

## 5. Frontend: nyelvválasztó dropdown

Példa HTML:

```html
<select id="lang-switcher">
    <option value="hu">Magyar</option>
    <option value="en">English</option>
</select>

<script>
document.getElementById('lang-switcher').addEventListener('change', function() {
    window.location.href = '/set-locale/' + this.value;
});
</script>
```

A felhasználó kiválasztja a nyelvet → redirect → session frissül → Laravel új nyelven rendereli az oldalt.

---

## 6. Hogyan működik a gyakorlatban?

1. A felhasználó kiválasztja a nyelvet a dropdownból.
2. A böngésző elküldi a `/set-locale/en` vagy `/set-locale/hu` kérést.
3. A route beállítja a session‑ben a nyelvet.
4. A middleware minden kérésnél beállítja az `App::setLocale()` értékét.
5. A Blade sablonokban az `__()` függvény már a megfelelő nyelvi fájlból olvas.

---

## 7. Alternatívák (ha később bővítenéd)

- **Cookie‑ban tárolás** (ha session nélkül szeretnéd)
- **User profilban tárolás** (ha bejelentkezett felhasználók vannak)
- **URL alapú lokalizáció** (pl. `/en/products`, `/hu/products`)
- **Laravel Localization package** (pl. mcamara/laravel-localization)

---
