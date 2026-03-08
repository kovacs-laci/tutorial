---
id: laravel-routes
slug: /laravel/routes
title: "Route-k létrehozása"
---

# Route-k létrehozása

A **route-ok** a Laravelben meghatározzák, hogy egy adott URL-hez melyik controller vagy closure fut le.

Szerepük az MVC-ben:

- **Controller (C):** a route irányítja a kérést a megfelelő controller metódushoz.
- **Model (M):** a controlleren keresztül a route-ok biztosítják az adatok elérését.
- **View (V):** a route-ok határozzák meg, mely nézetet kapja a felhasználó.

👉 Részletes dokumentáció:  
https://laravel.com/docs/12.x/routing

---

## 1. Route definiálása

A route-kat a `routes/web.php` fájlban (webes alkalmazás esetén)  
vagy az `routes/api.php` fájlban (API esetén) hozzuk létre.

### Példa – Counties erőforrás

```php
use App\Http\Controllers\CountyController;

Route::resource('counties', CountyController::class);
```

---

## 2. Automatikusan létrejövő RESTful végpontok

A `Route::resource` definíció az alábbi végpontokat hozza létre:

| Verb | URI | Action | Route Name |
|------|------|--------|------------|
| GET | `/counties` | index | counties.index |
| GET | `/counties/create` | create | counties.create |
| POST | `/counties` | store | counties.store |
| GET | `/counties/{{county}}` | show | counties.show |
| GET | `/counties/{{county}}/edit` | edit | counties.edit |
| PUT/PATCH | `/counties/{{county}}` | update | counties.update |
| DELETE | `/counties/{{county}}` | destroy | counties.destroy |

Ez a struktúra biztosítja a teljes **CRUD működést**.

---

## 3. Route-k manuális definiálása

```php
Route::get('/counties', [CountyController::class, 'index'])->name('counties.index');
Route::get('/counties/create', [CountyController::class, 'create'])->name('counties.create');
Route::post('/counties', [CountyController::class, 'store'])->name('counties.store');
Route::get('/counties/{county}', [CountyController::class, 'show'])->name('counties.show');
Route::get('/counties/{county}/edit', [CountyController::class, 'edit'])->name('counties.edit');
Route::patch('/counties/{county}', [CountyController::class, 'update'])->name('counties.update');
Route::delete('/counties/{county}', [CountyController::class, 'destroy'])->name('counties.destroy');
```

---

## 4. Mikor használjuk a `Route::resource`-t?

- Ha teljes CRUD rendszert építünk.
- Ha RESTful konvenciókat követünk.
- Ha szeretnénk egyszerű, átlátható route struktúrát.

Ha csak néhány végpont szükséges, a manuális definiálás rugalmasabb.

---

## 5. Middleware használata

### Egy route-on:

```php
Route::get('/counties', [CountyController::class, 'index'])
    ->middleware('auth')
    ->name('counties.index');
```

### Csoportosan:

```php
Route::middleware(['auth'])->group(function () {
    Route::resource('counties', CountyController::class);
});
```

### Resource route middleware-rel:

```php
Route::resource('counties', CountyController::class)
    ->middleware('auth');
```

---

## 6. Hasznos tippek

### Route Model Binding

```php
Route::get('/counties/{county}', [CountyController::class, 'show']);
```

Az ``{county}`` paraméter automatikusan betölti a `County` modellt.

---

### Named Routes

Használjuk a név szerinti hivatkozást:

```php
route('counties.index');
```

Ez különösen hasznos Blade sablonokban.

---

### Route Groups

```php
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::resource('counties', CountyController::class);
    Route::resource('cities', CityController::class);
});
```

---

### API Route-ok

```php
Route::apiResource('counties', CountyController::class);
```

Az `apiResource` csak az API-hoz szükséges metódusokat hozza létre.

---

## Összefoglalás

Ebben a leckében megtanultuk:

- hogyan működik a Laravel routing rendszere
- mi a `Route::resource`
- milyen RESTful végpontokat generál
- hogyan definiálhatunk route-okat manuálisan
- hogyan használható middleware
- mi a Route Model Binding szerepe
- hogyan különböznek a web és API route-ok

A route rendszer biztosítja az alkalmazás és a controller közötti kapcsolatot.
