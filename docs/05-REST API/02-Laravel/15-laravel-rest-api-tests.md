---
id: laravel-rest-api-tests
slug: /laravel/rest-api-tests
title: "REST API tesztek"
---

# REST API tesztek 

A REST API végpontok automata tesztelése biztosítja, hogy a backend funkciók helyesen működjenek, és a hibák időben kiderüljenek.  
Fontos, hogy a tesztek **ne módosítsák az éles adatbázist**, ezért külön tesztadatbázist használunk.

---

## 1. Tesztadatbázis beállítása

`.env.testing` fájl:

```env
DB_CONNECTION=sqlite
DB_DATABASE=:memory:
````

`phpunit.xml` fájl `<php>` szekciója:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

👉 Így minden teszt **memóriában futó SQLite adatbázist** használ.

---

## 2. Teszt létrehozása

```bash
php artisan make:test CountyControllerTest
php artisan make:test CityControllerTest
```

⚠️ A teszt osztály neve mindig `Test`‑re végződjön.

---

## 3. Factory létrehozása

### CountyFactory

```bash
php artisan make:factory CountyFactory --model=County
```

`database/factories/CountyFactory.php`

```php
namespace Database\Factories;

use App\Models\County;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountyFactory extends Factory
{
    protected $model = County::class;

    public function definition()
    {
        return [
            'name' => $this->faker->state(),
        ];
    }
}
```

### CityFactory

```bash
php artisan make:factory CityFactory --model=City
```

`database/factories/CityFactory.php`

```php
namespace Database\Factories;

use App\Models\City;
use App\Models\County;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    protected $model = City::class;

    public function definition()
    {
        return [
            'name' => $this->faker->city(),
            'county_id' => County::factory(),
        ];
    }
}
```

---

## 4. Tesztosztály – CRUD és extra tesztek

`tests/Feature/CountyControllerTest.php`

```php
use App\Models\County;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CountyControllerTest extends TestCase
{
    use RefreshDatabase;

    /** Listázás – nem igényel hitelesítést */
    public function test_index_returns_all_counties_with_cities()
    {
        $county = County::factory()->create(['name' => 'County A']);
        $city = $county->cities()->create(['name' => 'City X']);

        $response = $this->getJson('/api/counties');

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'County A'])
                 ->assertJsonFragment(['name' => 'City X']);
    }

    /** Új adat létrehozása – hitelesítéssel */
    public function test_store_creates_new_county()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->postJson('/api/counties', [
            'name' => 'New County',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'New County']);

        $this->assertDatabaseHas('counties', ['name' => 'New County']);
    }

    /** Autentikációs teszt – token nélkül */
    public function test_store_requires_authentication()
    {
        $response = $this->postJson('/api/counties', [
            'name' => 'Unauthorized County',
        ]);

        $response->assertStatus(401);
    }

    /** Adatmódosítás – hitelesítéssel */
    public function test_update_modifies_existing_county()
    {
        $county = County::factory()->create(['name' => 'Old County']);

        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->putJson("/api/counties/{$county->id}", [
            'name' => 'Updated County'
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Updated County']);

        $this->assertDatabaseHas('counties', ['id' => $county->id, 'name' => 'Updated County']);
    }

    /** Adat törlése – hitelesítéssel */
    public function test_delete_removes_county()
    {
        $county = County::factory()->create(['name' => 'County to Delete']);

        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->deleteJson("/api/counties/{$county->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'County deleted']);

        $this->assertDatabaseMissing('counties', ['id' => $county->id]);
    }
}
```

---

`tests/Feature/CityControllerTest.php`

```php
use App\Models\City;
use App\Models\County;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CityControllerTest extends TestCase
{
    use RefreshDatabase;

    /** Listázás – nem igényel hitelesítést */
    public function test_index_returns_all_cities_with_county()
    {
        $county = County::factory()->create(['name' => 'County A']);
        $city = City::factory()->create([
            'name' => 'City X',
            'county_id' => $county->id,
        ]);

        $response = $this->getJson('/api/cities');

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'City X'])
                 ->assertJsonFragment(['name' => 'County A']);
    }

    /** Új adat létrehozása – hitelesítéssel */
    public function test_store_creates_new_city()
    {
        $county = County::factory()->create();
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->postJson('/api/cities', [
            'name' => 'New City',
            'county_id' => $county->id,
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'New City']);

        $this->assertDatabaseHas('cities', ['name' => 'New City', 'county_id' => $county->id]);
    }

    /** Autentikációs teszt – token nélkül */
    public function test_store_requires_authentication()
    {
        $county = County::factory()->create();

        $response = $this->postJson('/api/cities', [
            'name' => 'Unauthorized City',
            'county_id' => $county->id,
        ]);

        $response->assertStatus(401);
    }
}
```

---

## 5. Tesztek futtatása

* Az összes teszt:

```bash
php artisan test
```

* Csak egy adott osztály:

```bash
php artisan test --filter CountyControllerTest
php artisan test --filter CityControllerTest
```

* Csak egy metódus:

```bash
php artisan test --filter CountyControllerTest::test_store_creates_new_county
```

* Szépített kimenet:

```bash
php artisan test --testdox
```

---

## 6. Összegzés

* A REST API teszteket mindig **külön tesztadatbázison** futtatjuk.
* A `RefreshDatabase` trait biztosítja, hogy minden teszt tiszta környezetben induljon.
* A Factory segítségével gyorsan generálhatunk tesztadatokat.
* Teszteljük a CRUD műveleteket, validációt, autentikációt, és kapcsolatok betöltését (`with()`).
* Teszteket a `php artisan test` paranccsal futtathatjuk.
