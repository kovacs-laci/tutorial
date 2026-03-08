---
id: laravel-rest-api-client
slug: /laravel/rest-api-client
title: "REST API kliens"
---

# Laravel REST API kliens 

Ebben a fejezetben egy **Laravel kliens alkalmazást** készítünk, amely a korábban létrehozott **Counties–Cities REST API**-hoz kapcsolódik.  
A kliens nem tartalmaz saját adatbázist, hanem a távoli API-t hívja meg HTTP kérésekkel.

---

## 1. Projekt létrehozása

```bash
composer create-project laravel/laravel laravel-zip-api-client
cd laravel-zip-api-client
````

👉 A projekt kliensként fog működni, és az API végpontokat fogja használni.

---

## 2. .env beállítások

Mivel a kliens nem saját adatbázist használ, az adatbázis beállítások opcionálisak lehetnek.

Ha szükséges a Laravel működéséhez (pl. session miatt), használhatunk SQLite-ot:

```env
DB_CONNECTION=sqlite
```

---

## 3. API URL konfiguráció

`config/services.php`

```php
'api' => [
    'base_uri' => env('API_URL', 'http://localhost:8000/api'),
],
```

`.env`

```env
API_URL=http://localhost:8000/api
```

👉 Ez határozza meg, hogy a kliens melyik **Counties–Cities API** szervert éri el.

---

## 4. Http makró létrehozása

`app/Providers/AppServiceProvider.php`

```php
use Illuminate\Support\Facades\Http;

public function boot(): void
{
    Http::macro('api', function () {
        return Http::withHeaders([
            'Accept' => 'application/json',
        ])->baseUrl(config('services.api.base_uri'));
    });
}
```

👉 Ezután az API hívás egyszerű:

```php
$response = Http::api()->get('/counties');
```

---

## 5. CountyController (kliens oldal)

`app/Http/Controllers/CountyController.php`

### Listázás

```php
public function index(Request $request)
{
    $needle = $request->get('needle');
    $url = $needle ? "counties?needle=" . urlencode($needle) : "counties";

    $response = Http::api()->get($url);

    if ($response->failed()) {
        return redirect()
            ->route('counties.index')
            ->with('error', 'Hiba történt az adatok lekérdezése során.');
    }

    $counties = $this->getCounties($response);

    return view('counties.index', [
        'entities' => $counties,
    ]);
}
```

---

### Megjelenítés

```php
public function show($id)
{
    $response = Http::api()->get("/counties/$id");

    if ($response->failed()) {
        return redirect()
            ->route('counties.index')
            ->with('error', 'A megye nem található.');
    }

    $county = $this->getCounty($response);

    return view('counties.show', [
        'entity' => $county,
    ]);
}
```

---

### Létrehozás

```php
public function store(Request $request)
{
    $response = Http::api()
        ->post('/counties', $request->all());

    if ($response->failed()) {
        return back()->with('error', 'Nem sikerült létrehozni a megyét.');
    }

    return redirect()
        ->route('counties.index')
        ->with('success', 'Megye sikeresen létrehozva!');
}
```

---

### Módosítás

```php
public function update(Request $request, $id)
{
    $response = Http::api()
        ->put("/counties/$id", $request->all());

    if ($response->failed()) {
        return back()->with('error', 'Nem sikerült módosítani.');
    }

    return redirect()
        ->route('counties.index')
        ->with('success', 'Megye sikeresen frissítve!');
}
```

---

### Törlés

```php
public function destroy($id)
{
    $response = Http::api()
        ->delete("/counties/$id");

    if ($response->failed()) {
        return back()->with('error', 'Nem sikerült törölni.');
    }

    return redirect()
        ->route('counties.index')
        ->with('success', 'Megye sikeresen törölve!');
}
```

---

## 6. Cities kezelés

A Cities controller ugyanígy működik, csak a végpontok:

* `GET /cities`
* `GET /cities/{id}`
* `POST /cities`
* `PUT /cities/{id}`
* `DELETE /cities/{id}`

### Példa – CityController index

```php
public function index()
{
    $response = Http::api()->get('/cities');

    if ($response->failed()) {
        return redirect()->route('cities.index')
            ->with('error', 'Hiba történt.');
    }

    $cities = $this->getCities($response);

    return view('cities.index', [
        'entities' => $cities,
    ]);
}
```

---

## 7. County → Cities kapcsolat API kliens oldalon

Ha egy megyéhez tartozó városokat szeretnénk megjeleníteni:

```php
public function show($id)
{
    $response = Http::api()->get("/counties/$id");

    $county = $this->getCounty($response);

    return view('counties.show', [
        'entity' => $county,
    ]);
}
```

A view-ban:

```blade
<h2>{{ $entity->name }}</h2>

<h3>Városok</h3>

<ul>
@foreach($entity->cities as $city)
    <li>{{ $city->name }}</li>
@endforeach
</ul>
```

👉 Fontos: az API-nak `with('cities')` használattal kell visszaadnia a kapcsolatot.

---

## 8. JSON feldolgozó segédfüggvények

```php
private function getCounties($response)
{
    $body = json_decode($response->body(), false);
    return $body->counties ?? [];
}

private function getCounty($response)
{
    $body = json_decode($response->body(), false);
    return $body->county ?? null;
}

private function getCities($response)
{
    $body = json_decode($response->body(), false);
    return $body->cities ?? [];
}
```

---

## 9. Route definíciók

```php
Route::get('/counties', [CountyController::class, 'index'])->name('counties.index');
Route::get('/counties/{id}', [CountyController::class, 'show'])->name('counties.show');
Route::post('/counties', [CountyController::class, 'store'])->name('counties.store');
Route::put('/counties/{id}', [CountyController::class, 'update'])->name('counties.update');
Route::delete('/counties/{id}', [CountyController::class, 'destroy'])->name('counties.destroy');

Route::get('/cities', [CityController::class, 'index'])->name('cities.index');
Route::get('/cities/{id}', [CityController::class, 'show'])->name('cities.show');
Route::post('/cities', [CityController::class, 'store'])->name('cities.store');
Route::put('/cities/{id}', [CityController::class, 'update'])->name('cities.update');
Route::delete('/cities/{id}', [CityController::class, 'destroy'])->name('cities.destroy');
```

---

## 10. Összegzés

* A kliens alkalmazás **nem használ saját adatbázist**, hanem a Counties–Cities REST API-t hívja.
* Az API URL-t a `config/services.php` és `.env` fájlban állítjuk be.
* Az `Http::macro('api')` egységesíti a hívásokat.
* A kliens controller CRUD műveletei HTTP kéréseket küldenek az API-nak.
* A válasz JSON feldolgozása segédfüggvényekkel történik.
* A view-k ugyanúgy működnek, mint egy hagyományos Laravel alkalmazásban, de az adatok távoli forrásból érkeznek.
