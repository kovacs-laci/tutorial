---
id: laravel-controllers
slug: /laravel/controllers
title: "Controller osztályok létrehozása"
---

# Controller osztályok létrehozása

A **controller** az MVC-ben a felhasználói kérések kezelője: fogadja az inputot, meghívja a **modelleket** az adatkezeléshez, majd átadja az adatokat a **nézeteknek**, vagy JSON-ban visszaadja az API válaszokat.

Controllerben érdemes az üzleti logikát „vékonyan” tartani, a komplex műveleteket modellekre, service osztályokra és FormRequestekre bízni.

- **Szerep az MVC-ben:**
  - **Controller (C):** kéréskezelés, validálás, irányítás.
  - **Model (M):** adatelérés, relációk, üzleti szabályok.
  - **View (V):** megjelenítés Blade sablonokban vagy JSON.


👉 Részletes dokumentáció:  
https://laravel.com/docs/12.x/controllers

---

## 1. Controller létrehozása

Új controller osztály létrehozása a `--resource` opcióval:

```bash
php artisan make:controller CountyController --resource
```

---

## 2. Elnevezési konvenció

- A controller neve legyen ugyanaz, mint a modell neve, `Controller` utótaggal.
- Példák:
  - **County** modell → **CountyController**
  - **City** modell → **CityController**

---

## 3. Mit jelent a `--resource` opció?

A `--resource` kapcsoló automatikusan létrehozza az összes RESTful metódust a controllerben:

- **index():** lista megjelenítése
- **create():** új rekord létrehozásának űrlapja
- **store():** új rekord mentése
- **show():** egy rekord megjelenítése
- **edit():** meglévő rekord szerkesztésének űrlapja
- **update():** meglévő rekord frissítése
- **destroy():** rekord törlése

Így a controller azonnal készen áll a CRUD műveletek kezelésére.

---

# CountyController – Listázási minták

Ebben a fejezetben bemutatjuk a `CountyController@index()` metódus különböző gyakran használt változatait Laravelben.

A példák sorrendje az egyszerűtől halad a bonyolultabb, valós alkalmazási esetek felé.

---

## 1. Egyszerű listázás

```php
public function index()
{
    $counties = County::get();

    return view('counties.index', compact('counties'));
}
```

:::info
Ez a leggyakoribb listázási forma: egyszerű lekérdezés.
:::

***

## 2. Listázás kapcsolattal (Eager Loading)

Ha a `County` modell rendelkezik `cities()` kapcsolattal (1:N), akkor a kapcsolódó városokat is előre be tudjuk tölteni.

```php
public function index()
{
    $counties = County::with('cities')->get();

    return view('counties.index', compact('counties'));
}
```

:::tip
A `with()` használata drasztikusan csökkenti az adatbázis-lekérdezések számát, így gyorsabbá válik az alkalmazás.
:::

***

## 3. Listázás szűréssel (megye neve alapján)

A keresőmező neve: **`needle`**

```php
public function index(Request $request)
{
    $needle = $request->input('needle');

    $query = County::query();

    if ($needle) {
        $query->where('name', 'like', "%{$needle}%");
    }

    $counties = $query->get();

    return view('counties.index', compact('counties', 'needle'));
}
```

:::info
A `where('name', 'like', ...)` alkalmas karakterlánc-alapú keresésekre (pl. részszó egyezés).
:::

***

## 4. Listázás kapcsolattal és szűréssel

Ebben a példában **mind a megyék nevét**, mind a hozzájuk tartozó **városok nevét** lehet keresni.

```php
public function index(Request $request)
{
    $needle = $request->input('needle');

    $query = County::with('cities');

    if ($needle) {
        $query->where(function ($q) use ($needle) {
            // Szűrés County.name mezőre
            $q->where('name', 'like', "%{$needle}%")
              // Szűrés City.name mezőre (kapcsolt táblában)
              ->orWhereHas('cities', function ($cityQuery) use ($needle) {
                  $cityQuery->where('name', 'like', "%{$needle}%");
              });
        });
    }

    $counties = $query->get();

    return view('counties.index', compact('counties', 'needle'));
}
```

:::tip
A `whereHas()` kifejezetten arra való, hogy a **kapcsolódó táblák mezői** alapján szűrssünk.
:::

:::warning
Ha a `cities` táblában is van `name` mező, és a `counties` táblában is van `name`, akkor **mindkét mezőt külön kell megcímezni**, ahogyan a fenti lekérdezés teszi.
:::

***

## 5. Paginálás

A paginálás minden fenti példában ugyanúgy működik:

```php
$query->get();
```
helyett

```php
$query->paginate(20);
```

:::info
A Laravel automatikusan kezeli a lapozást, beszúrva:

*   oldalszám
*   `?page=` paraméter
*   miközben megőrzi keresési paramétereket (`?needle=baranya`)
    :::

***

# Összegzés

Ezek a minták lefedik a leggyakoribb listázási feladatokat Laravelben:

*   egyszerű lekérdezés
*   kapcsolatok kezelése
*   szűrés mezőre
*   szűrés kapcsolt modell mezőre
*   paginálás
    
```php
    public function create()
    {
        return view('counties.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $county = County::create($validated);

        return redirect()
            ->route('counties.show', $county)
            ->with('status', 'Megye létrehozva!');
    }

    public function show(County $county)
    {
        return view('counties.show', compact('county'));
        // API: return response()->json($county);
    }

    public function edit(County $county)
    {
        return view('counties.edit', compact('county'));
    }

    public function update(Request $request, County $county)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $county->update($validated);

        return redirect()
            ->route('counties.show', $county)
            ->with('status', 'Megye frissítve!');
    }

    public function destroy(County $county)
    {
        $county->delete();

        return redirect()
            ->route('counties.index')
            ->with('status', 'Megye törölve!');
    }
}
```

---

## 5. CityController példa

### `app/Http/Controllers/CityController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\County;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::with('county')->get();

        return view('cities.index', compact('cities'));
    }

    public function create()
    {
        $counties = County::all();

        return view('cities.create', compact('counties'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'zip_code' => ['required', 'string', 'max:20'],
            'county_id' => ['required', 'exists:counties,id'],
        ]);

        City::create($validated);

        return redirect()
            ->route('cities.index')
            ->with('status', 'Város létrehozva!');
    }

    public function show(City $city)
    {
        return view('cities.show', compact('city'));
    }

    public function edit(City $city)
    {
        return view('cities.edit', compact('city'));
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'zip_code' => ['required', 'string', 'max:20'],
            'county_id' => ['required', 'exists:counties,id'],
        ]);

        $city->update($validated);

        return redirect()
            ->route('cities.index')
            ->with('status', 'Város frissítve!');
    }

    public function destroy(City $city)
    {
        $city->delete();

        return redirect()
            ->route('cities.index')
            ->with('status', 'Város törölve!');
    }
}
```

---

## 6. Használat Blade és API környezetben

### Blade válasz:

```php
return view('counties.index', compact('counties'));
```

### JSON válasz:

```php
return response()->json([
    'data' => $counties
]);
```

---

## Összefoglalás

Ebben a leckében:

- megismertük a controller szerepét az MVC-ben
- létrehoztunk resource controllert
- megértettük a `--resource` működését
- alkalmaztuk a CRUD struktúrát
- bemutattuk a counties–cities példát
- láttuk a validáció és válaszadás alapjait

A következő lépésben a routing rendszert vizsgáljuk meg.