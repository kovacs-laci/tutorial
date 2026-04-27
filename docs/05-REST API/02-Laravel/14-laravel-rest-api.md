---
id: laravel-rest-api
slug: /laravel/rest-api
title: "Laravel REST API"
---

# Laravel REST API

Ez a lecke egy **REST API** létrehozását mutatja be a **counties–cities** domainen,
Laravel + Sanctum használatával.

A cél:

- Autentikáció token alapú hitelesítéssel
- Counties és Cities CRUD API végpontok
- Middleware védelem
- JSON válaszok
- CORS támogatás

---

## 1. Laravel telepítése

```bash
composer create-project laravel/laravel laravel-zip-api
cd laravel-zip-api
````

---

## 2. Adatbázis konfiguráció

`.env` fájl:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_rest_api
DB_USERNAME=root
DB_PASSWORD=
```

---

## 3. API telepítése (Sanctum)

```bash
php artisan install:api
```

Ez telepíti a **Laravel Sanctum** csomagot token alapú autentikációhoz.

---

## 4. User seeder

`database/seeders/DatabaseSeeder.php`

```php
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => '12345678',
        ]);
    }
}
```

Seeder futtatása:

```bash
php artisan db:seed
```

---

## 5. User modell beállítása

`app/Models/User.php`

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
    ];
}
```

---

## 6. Login API

### Controller létrehozása

```bash
php artisan make:controller AuthController
```

### Login metódus

```php
use Illuminate\Support\Facades\Hash;

public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }

    $user->tokens()->delete();

    $token = $user->createToken('access')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}
```

---

## 7. Login route

`routes/api.php`

```php
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
```

---

## 8. Counties tábla létrehozása

```bash
php artisan make:migration create_counties_table
```

Migráció:

```php
Schema::create('counties', function (Blueprint $table) {
    $table->id();
    $table->string('name', 255);
});
```

Migráció futtatása:

```bash
php artisan migrate
```

---

## 9. Cities tábla (1:N kapcsolat)

```bash
php artisan make:migration create_cities_table
```

```php
Schema::create('cities', function (Blueprint $table) {
    $table->id();
    $table->foreignId('county_id')
          ->constrained()
          ->onDelete('cascade');
    $table->string('name', 255);
});
```

---

## 10. Modellek

### County modell

```bash
php artisan make:model County
```

```php
class County extends Model
{
    public $timestamps = false;

    protected $fillable = ['name'];

    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
```

### City modell

```bash
php artisan make:model City
```

```php
class City extends Model
{
    public $timestamps = false;

    protected $fillable = ['county_id', 'name'];

    public function county()
    {
        return $this->belongsTo(County::class);
    }
}
```

---

## 11. CountyController (API)

```bash
php artisan make:controller CountyController
```

### Index

```php
public function index()
{
    $counties = County::with('cities')->get();
    return response()->json([
        'counties' => $counties,
    ]);
}
```

### Store

```php
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $county = County::create($request->all());

    return response()->json([
        'county' => $county,
    ]);
}
```

### Update

```php
public function update(Request $request, $id)
{
    $county = County::findOrFail($id);
    $county->update($request->all());

    return response()->json([
        'county' => $county,
    ]);
}
```

### Destroy

```php
public function destroy($id)
{
    $county = County::findOrFail($id);
    $county->delete();

    return response()->json([
        'message' => 'County deleted',
    ]);
}
```

---

## 12. CityController (API)

```bash
php artisan make:controller CityController
```

### Index

```php
public function index()
{
    $cities = City::with('county')->get();
    return response()->json([
        'cities' => $cities,
    ]);
}
```

### Store

```php
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'county_id' => 'required|exists:counties,id',
    ]);

    $city = City::create($request->all());

    return response()->json([
        'city' => $city,
    ]);
}
```

### Update

```php
public function update(Request $request, $id)
{
    $city = City::findOrFail($id);
    $city->update($request->all());

    return response()->json([
        'city' => $city,
    ]);
}
```

### Destroy

```php
public function destroy($id)
{
    $city = City::findOrFail($id);
    $city->delete();

    return response()->json([
        'message' => 'City deleted',
    ]);
}
```

---

## 13. API Routes

`routes/api.php`

```php
use App\Http\Controllers\CountyController;
use App\Http\Controllers\CityController;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/counties', [CountyController::class, 'index']);
Route::get('/cities', [CityController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/counties', [CountyController::class, 'store']);
    Route::put('/counties/{id}', [CountyController::class, 'update']);
    Route::delete('/counties/{id}', [CountyController::class, 'destroy']);

    Route::post('/cities', [CityController::class, 'store']);
    Route::put('/cities/{id}', [CityController::class, 'update']);
    Route::delete('/cities/{id}', [CityController::class, 'destroy']);
});
```

---

## 14. CORS beállítás

```bash
php artisan config:publish cors
```

`config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
'allowed_origins' => ['http://localhost:8000'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

---

## 15. API használat menete

1. Login:

   ```
   POST /api/login
   ```

   → token visszaérkezik

2. Token használata:

   ```
   Authorization: Bearer <token>
   ```

3. Védett végpontok elérése:

    * County létrehozás
    * City létrehozás
    * Módosítás
    * Törlés

---

## 16. Összegzés

* REST API külön `routes/api.php` fájlban.
* Token alapú autentikáció: **Laravel Sanctum**.
* Counties–Cities 1:N kapcsolat.
* `with()` használata kapcsolatok betöltésére.
* Middleware védelem: `auth:sanctum`.
* JSON válasz minden végponton.
* CORS konfiguráció szükséges frontend integrációhoz.
