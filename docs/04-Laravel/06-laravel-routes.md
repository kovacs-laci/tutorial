---
id: laravel-routes
slug: /laravel/routes
title: "Route-k létrehozása"
---

# Laravel route-ok: resource, named és nested route-ok

A route-ok határozzák meg, hogy egy HTTP-kérés melyik controllerhez és azon belül melyik metódushoz érkezik. A route az URL, a HTTP-metódus és a végrehajtandó kód kapcsolatát írja le.

Ebben a leckében a `counties-cities` domaint használjuk. A példákban egy megye több városhoz tartozik:

- `County` – a szülő erőforrás
- `City` – a gyermek erőforrás
- egy `County` több `City` rekordot tartalmazhat

👉 Részletes dokumentáció:  
https://laravel.com/docs/12.x/routing

---

## 1. Hol definiáljuk a route-okat?

A webes alkalmazás route-jai általában a `routes/web.php` fájlban találhatók:

```php
use App\Http\Controllers\CityController;
use App\Http\Controllers\CountyController;
use Illuminate\Support\Facades\Route;
```

Az API route-jai a projekt beállításától függően a `routes/api.php` fájlban lehetnek. A webes route-ok sessiont és CSRF-védelmet is használhatnak, ezért a Blade-alapú CRUD felületet a `web.php` fájlban definiáljuk.

Egy route alapformája:

```php
Route::get('/counties', [CountyController::class, 'index']);
```

Ez azt jelenti, hogy a `GET /counties` kérés a `CountyController` `index()` metódusát hívja meg.

### A leggyakoribb HTTP-metódusok

| Metódus | Tipikus szerep |
|---|---|
| `GET` | adatok lekérése vagy űrlap megjelenítése |
| `POST` | új rekord létrehozása |
| `PUT` / `PATCH` | meglévő rekord módosítása |
| `DELETE` | rekord törlése |

---

## 2. Resource route: teljes CRUD egy sorban

Ha egy erőforráshoz a teljes CRUD működést szeretnénk, használjuk a `Route::resource` metódust:

```php
Route::resource('counties', CountyController::class);
Route::resource('cities', CityController::class);
```

A `Route::resource('counties', CountyController::class)` a következő route-okat hozza létre:

| HTTP-metódus | URI | Controller-metódus | Route-név |
|---|---|---|---|
| `GET` | `/counties` | `index` | `counties.index` |
| `GET` | `/counties/create` | `create` | `counties.create` |
| `POST` | `/counties` | `store` | `counties.store` |
| `GET` | `/counties/{county}` | `show` | `counties.show` |
| `GET` | `/counties/{county}/edit` | `edit` | `counties.edit` |
| `PUT` / `PATCH` | `/counties/{county}` | `update` | `counties.update` |
| `DELETE` | `/counties/{county}` | `destroy` | `counties.destroy` |

A `{county}` egy route-paraméter. Az értéke például `3` lehet, tehát a kérés URL-je `/counties/3`.

A resource route akkor célszerű, ha egy controllerben a megszokott RESTful CRUD műveleteket valósítjuk meg.

### Csak a szükséges resource route-ok

Nem kötelező minden műveletet létrehozni. A `only()` felsorolja a szükséges műveleteket:

```php
Route::resource('counties', CountyController::class)
    ->only(['index', 'show']);
```

A `except()` segítségével néhány műveletet kizárhatunk:

```php
Route::resource('cities', CityController::class)
    ->except(['show']);
```

---

## 3. Resource route-ok kézi definiálása

A resource route kényelmes rövidítés, de ugyanazokat a route-okat kézzel is megadhatjuk:

```php
Route::get('/counties', [CountyController::class, 'index'])
    ->name('counties.index');

Route::get('/counties/create', [CountyController::class, 'create'])
    ->name('counties.create');

Route::post('/counties', [CountyController::class, 'store'])
    ->name('counties.store');

Route::get('/counties/{county}', [CountyController::class, 'show'])
    ->name('counties.show');

Route::get('/counties/{county}/edit', [CountyController::class, 'edit'])
    ->name('counties.edit');

Route::patch('/counties/{county}', [CountyController::class, 'update'])
    ->name('counties.update');

Route::delete('/counties/{county}', [CountyController::class, 'destroy'])
    ->name('counties.destroy');
```

A kézi forma akkor hasznos, ha csak néhány műveletre van szükségünk, vagy az URL-ek és a route-nevek eltérnek a resource konvenciótól.

:::warning
A statikus route-ok kerüljenek a dinamikus paramétert tartalmazó route-ok elé. Például a `/counties/create` route-nak a `/counties/{county}` előtt kell szerepelnie, különben a `create` szöveget Laravel akár egy county azonosítójaként is értelmezheti.
:::

---

## 4. Named route-ok

A route-nak nevet a `name()` metódussal adunk:

```php
Route::get('/counties', [CountyController::class, 'index'])
    ->name('counties.index');
```

A név segítségével nem kell az URL-t kézzel beírni. Ha később megváltozik az útvonal, a route-hivatkozások továbbra is működhetnek.

### Named route használata controllerben

```php
return redirect()
    ->route('counties.index')
    ->with('success', 'Megye frissítve!');
```

A redirect új HTTP-kérést indít, ezért a `$counties` változót nem kell és nem is lehet átadni benne. A `counties.index` route-hoz tartozó controller metódus tölti be újra az adatokat.

### Paraméter átadása named route-nak

```php
$url = route('counties.show', ['county' => $county->id]);
```

Implicit model binding használatakor magát a modellt is átadhatjuk:

```php
$url = route('counties.show', ['county' => $county]);
```

### Named route használata Blade-ben

```bladehtml
<a href="{{ route('counties.show', ['county' => $county]) }}">
    Megye megtekintése
</a>

<a href="{{ route('counties.edit', ['county' => $county]) }}">
    Szerkesztés
</a>
```

Egy módosító űrlap és egy törlő űrlap például így nézhet ki:

```bladehtml
<form action="{{ route('counties.update', ['county' => $county]) }}" method="POST">
    @csrf
    @method('PATCH')

    <input type="text" name="name" value="{{ $county->name }}">
    <button type="submit">Mentés</button>
</form>

<form action="{{ route('counties.destroy', ['county' => $county]) }}" method="POST">
    @csrf
    @method('DELETE')

    <button type="submit">Törlés</button>
</form>
```

A `PUT`, `PATCH` és `DELETE` kéréseket a HTML formok nem támogatják közvetlenül, ezért használjuk a Blade `@method()` direktíváját. A `@csrf` a webes formok CSRF-védelméhez szükséges.

---

## 5. Route paraméterek és implicit model binding

A controllerben a route-paramétert átvehetjük egyszerű értékként:

```php
public function show($county)
{
    $county = County::findOrFail($county);

    return view('counties.show', compact('county'));
}
```

Laravel implicit model bindinggel ezt rövidebben írhatjuk. A route-paraméter neve (`{county}`) egyezzen a típusdeklarációban szereplő változó nevével:

```php
use App\Models\County;

public function show(County $county)
{
    return view('counties.show', compact('county'));
}
```

A Laravel ilyenkor a `{county}` értéke alapján megkeresi a megfelelő `County` rekordot. Ha a rekord nem létezik, automatikusan 404-es választ ad.

A resource route által generált `show`, `edit`, `update` és `destroy` metódusokban is ezt a mintát használhatjuk:

```php
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
        ->route('counties.index')
        ->with('success', 'Megye frissítve!');
}
```

---

## 6. Route csoportok: prefix, név és middleware

Több route-ra közös beállításokat is alkalmazhatunk csoport segítségével.

### Admin prefix és hitelesítés

```php
Route::prefix('admin')
    ->middleware('auth')
    ->group(function () {
        Route::resource('counties', CountyController::class);
        Route::resource('cities', CityController::class);
    });
```

Ekkor például a megye listaoldala a következő URL-en érhető el:

```text
/admin/counties
```

A route neve ettől még `counties.index` marad. Ha a neveket is közös előtaggal szeretnénk ellátni, használjuk a `name()` csoportot:

```php
Route::name('admin.')
    ->prefix('admin')
    ->middleware('auth')
    ->group(function () {
        Route::resource('counties', CountyController::class);
        Route::resource('cities', CityController::class);
    });
```

Ebben az esetben a route neve például `admin.counties.index` lesz.

Middleware-t egyetlen route-ra is alkalmazhatunk:

```php
Route::get('/counties', [CountyController::class, 'index'])
    ->middleware('auth')
    ->name('counties.index');
```

Vagy közvetlenül a teljes resource-ra:

```php
Route::resource('counties', CountyController::class)
    ->middleware('auth');
```

---

## 7. Nested resource: counties és cities

A `City` a `County` alárendelt erőforrása, ezért a kapcsolatot URL-ben is kifejezhetjük:

```php
Route::resource('counties.cities', CityController::class);
```

Ez a következő route-struktúrát hozza létre:

| HTTP-metódus | URI | Controller-metódus | Route-név |
|---|---|---|---|
| `GET` | `/counties/{county}/cities` | `index` | `counties.cities.index` |
| `GET` | `/counties/{county}/cities/create` | `create` | `counties.cities.create` |
| `POST` | `/counties/{county}/cities` | `store` | `counties.cities.store` |
| `GET` | `/counties/{county}/cities/{city}` | `show` | `counties.cities.show` |
| `GET` | `/counties/{county}/cities/{city}/edit` | `edit` | `counties.cities.edit` |
| `PUT` / `PATCH` | `/counties/{county}/cities/{city}` | `update` | `counties.cities.update` |
| `DELETE` | `/counties/{county}/cities/{city}` | `destroy` | `counties.cities.destroy` |

A nested route használatával egyértelmű, hogy a város melyik megye kontextusában szerepel. Például:

```text
GET /counties/3/cities
GET /counties/3/cities/create
POST /counties/3/cities
```

A nested struktúra különösen hasznos a városok megye szerinti listázásánál és létrehozásánál.

### Nested route-ok a controllerben

A route-paramétereket a controller megkapja, így a városok lekérdezését a szülő modellen keresztül is megadhatjuk:

```php
use App\Models\County;
use Illuminate\Http\Request;

public function index(County $county)
{
    $cities = $county->cities()
        ->orderBy('name')
        ->get();

    return view('cities.index', compact('county', 'cities'));
}

public function create(County $county)
{
    return view('cities.create', compact('county'));
}

public function store(Request $request, County $county)
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'zip_code' => ['required', 'string', 'max:20'],
    ]);

    $county->cities()->create($validated);

    return redirect()
        ->route('counties.cities.index', ['county' => $county])
        ->with('success', 'Város létrehozva!');
}
```

A `City` paramétert is átvehetjük implicit model bindinggel:

```php
use App\Models\City;

public function edit(County $county, City $city)
{
    return view('cities.edit', compact('county', 'city'));
}
```

:::warning
A sima implicit model binding önmagában a `City` azonosítója alapján tölti be a várost. Ha azt is biztosítani szeretnénk, hogy a város valóban a megadott megyéhez tartozzon, használjunk scoped bindinget, vagy ellenőrizzük a kapcsolatot a controllerben.
:::

### Scoped nested binding

A `scopeBindings()` arra kéri a Laravelt, hogy a gyermekmodellt a szülő modell kapcsolatán keresztül keresse:

```php
Route::scopeBindings()
    ->group(function () {
        Route::resource('counties.cities', CityController::class);
    });
```

A `County` modellben ehhez a kapcsolatnak `cities()` néven kell léteznie:

```php
public function cities()
{
    return $this->hasMany(City::class, 'county_id');
}
```

Így a `/counties/3/cities/8` kérés csak akkor találja meg a `City` rekordot, ha a 8-as város a 3-as megyéhez tartozik. Ellenkező esetben Laravel 404-es választ ad.

A nested Blade hivatkozásoknál minden szükséges paramétert adjunk át:

```bladehtml
<a href="{{ route('counties.cities.edit', [
    'county' => $county,
    'city' => $city,
]) }}">
    Város szerkesztése
</a>

<form action="{{ route('counties.cities.destroy', [
    'county' => $county,
    'city' => $city,
]) }}" method="POST">
    @csrf
    @method('DELETE')
    <button type="submit">Város törlése</button>
</form>
```

---

## 8. Shallow nested resource

A teljesen nested route-oknál a város módosításához és törléséhez is szerepel a county azonosítója:

```text
/counties/{county}/cities/{city}/edit
/counties/{county}/cities/{city}
```

Ha a `city` azonosítója önmagában elég a rekord azonosításához, egyszerűsíthetjük a részletes műveletek URL-jeit a `shallow()` használatával:

```php
Route::resource('counties.cities', CityController::class)
    ->shallow();
```

A `shallow()` csak azokat a route-okat rövidíti, amelyekhez már konkrét `city` tartozik.

### A shallow route-ok felosztása

A szülő kontextusát igénylő route-ok nestedek maradnak:

| HTTP-metódus | URI | Route-név |
|---|---|---|
| `GET` | `/counties/{county}/cities` | `counties.cities.index` |
| `GET` | `/counties/{county}/cities/create` | `counties.cities.create` |
| `POST` | `/counties/{county}/cities` | `counties.cities.store` |

A konkrét városhoz tartozó route-okból eltűnik a `{county}`:

| HTTP-metódus | URI | Route-név |
|---|---|---|
| `GET` | `/cities/{city}` | `cities.show` |
| `GET` | `/cities/{city}/edit` | `cities.edit` |
| `PUT` / `PATCH` | `/cities/{city}` | `cities.update` |
| `DELETE` | `/cities/{city}` | `cities.destroy` |

Ez a megoldás rövidebb URL-eket ad a `show`, `edit`, `update` és `destroy` műveletekhez, miközben a listázás és a létrehozás továbbra is a megye kontextusában marad.

Shallow route használata Blade-ben:

```bladehtml
<a href="{{ route('cities.edit', ['city' => $city]) }}">
    Város szerkesztése
</a>

<form action="{{ route('cities.update', ['city' => $city]) }}" method="POST">
    @csrf
    @method('PATCH')

    <input type="text" name="name" value="{{ $city->name }}">
    <button type="submit">Mentés</button>
</form>
```

A nested és shallow route-ok közötti választás az URL jelentésétől függ:

- használjunk teljes nested struktúrát, ha a város csak egy megye kontextusában értelmezhető;
- használjunk `shallow()` megoldást, ha a város saját azonosítója elég a részletes műveletekhez;
- a listázás és a létrehozás általában továbbra is a megye alatt marad.

---

## 9. API resource route-ok

API esetén általában nincs szükség a Blade űrlapokhoz tartozó `create` és `edit` route-okra. Erre való a `Route::apiResource`:

```php
Route::apiResource('counties', CountyController::class);
Route::apiResource('cities', CityController::class);
```

Az `apiResource` ezeket a műveleteket hozza létre:

- `index`
- `store`
- `show`
- `update`
- `destroy`

Nem hozza létre:

- `create`
- `edit`

Nested API route például:

```php
Route::apiResource('counties.cities', CityController::class)
    ->shallow();
```

A `resource` és az `apiResource` közötti választás:

| Cél | Használandó metódus |
|---|---|
| Blade-alapú webes CRUD, űrlapokkal | `Route::resource()` |
| JSON API, `create` és `edit` nézetek nélkül | `Route::apiResource()` |

API controllerben nem redirectet, hanem JSON választ adunk:

```php
public function index(County $county)
{
    $cities = $county->cities()
        ->orderBy('name')
        ->get();

    return response()->json([
        'data' => $cities,
    ]);
}
```

---

## 10. A létrehozott route-ok ellenőrzése

A route-ok listáját az Artisan paranccsal tekinthetjük meg:

```bash
php artisan route:list
```

Csak a counties és cities route-okra szűrve:

```bash
php artisan route:list --path=counties
php artisan route:list --path=cities
```

Ez különösen hasznos nested és shallow route-ok esetén, mert azonnal látható:

- az URI;
- a HTTP-metódus;
- a route neve;
- a hozzárendelt controller és metódus;
- az alkalmazott middleware.

---

## Összefoglalás

Ebben a leckében megtanultuk:

- hogyan működnek a `web.php` route-ok;
- hogyan készít teljes CRUD route-készletet a `Route::resource`;
- hogyan definiálhatjuk ugyanezeket kézzel;
- hogyan használhatók a named route-ok redirectben és Blade-ben;
- hogyan működik az implicit route model binding;
- hogyan szervezhetők a route-ok prefix, név és middleware szerint csoportokba;
- hogyan kapcsolható össze a `County` és a `City` nested resource segítségével;
- hogyan biztosítható a szülő-gyermek kapcsolat scoped bindinggel;
- mikor érdemes `shallow()` route-okat használni;
- miben különbözik a `Route::resource` és a `Route::apiResource`;
- hogyan ellenőrizhetjük a létrehozott route-okat az Artisan segítségével.

A route-ok kötik össze a HTTP-kéréseket a controller műveleteivel. A jól megválasztott route-struktúra az URL-eket érthetővé, a controller-hívásokat pedig kiszámíthatóvá teszi.
