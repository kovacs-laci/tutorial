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

## 4. Példa létrehozott controllerre

### `app/Http/Controllers/CountyController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\County;
use Illuminate\Http\Request;

class CountyController extends Controller
{
    public function index()
    {
        // A counties tábla minden sorát visszaadja
        $counties = County::all();
        
        // Ha szükség van a kapcsolódó városokra is, akkor
        // $counties = County::with('cities')->get();
        // ahol a 'cities' annak a függvénynek a neve, ami a County modellben írja le az 1:N kapcsolatot:
        // public function cities() 
        // A with() használata csökkenti az adatbázis lekérdezések számát.
        // Ez az úgynevezett eager loading

        return view('counties.index', compact('counties'));
        // API esetén: return response()->json($counties);
    }

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