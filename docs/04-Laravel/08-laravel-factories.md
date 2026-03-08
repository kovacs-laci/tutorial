---
id: laravel-factories
slug: /laravel/factories
title: "Factory-k használata"
---

# Factory-k használata

A **factory-k** a Laravelben az Eloquent modellekhez tartozó tesztadatok automatikus generálására szolgálnak.  
Segítségükkel gyorsan előállíthatunk nagy mennyiségű adatot fejlesztési, tesztelési vagy bemutató célokra.

A factory-k különösen hasznosak akkor, amikor:

- sok adatot szeretnénk gyorsan létrehozni
- az adat értékei nem fontosak, csak a mennyiség
- automatizált tesztelést végzünk

👉 Dokumentáció:  
https://laravel.com/docs/12.x/database-testing#writing-factories

---

# 1. Factory létrehozása

Factory létrehozása egy modellhez:

```bash
php artisan make:factory CountyFactory --model=County
````

```bash
php artisan make:factory CityFactory --model=City
```

Ez létrehozza a megfelelő fájlokat a `database/factories` mappában.

---

# 2. CountyFactory

Fájl: `database/factories/CountyFactory.php`

```php id="cty1"
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CountyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->state,
        ];
    }
}
```

### Magyarázat

* `$this->faker` → véletlenszerű adatokat generál
* `state` → például megye jellegű név
* `unique()` → biztosítja, hogy ne legyen ismétlődés

---

# 3. CityFactory

Fájl: `database/factories/CityFactory.php`

```php id="cty2"
<?php

namespace Database\Factories;

use App\Models\County;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->city,
            'zip_code' => $this->faker->postcode,
            'county_id' => County::factory(),
        ];
    }
}
```

### Fontos rész

```php
'county_id' => County::factory(),
```

Ez azt jelenti:

* Minden város létrehozásakor
* Automatikusan létrejön egy hozzá tartozó county is
* Így az 1:N kapcsolat helyesen épül fel

Ez különösen fontos, mert:

* a `cities.county_id`
* idegen kulcs a `counties.id` mezőre

---

# 4. Factory használata seederben

## Példa: több megye létrehozása

```php
// database/seeders/CountySeeder.php

public function run(): void
{
    \App\Models\County::factory()
        ->count(5)
        ->create();
}
```

Ez 5 véletlenszerű megyét hoz létre.

---

## Példa: megyék és városok együtt

```php
\App\Models\County::factory()
    ->count(5)
    ->hasCities(10)
    ->create();
```

Ez azt jelenti:

* 5 megye
* mindegyikhez 10 város
* automatikusan kezeli a `county_id` kapcsolatot

---

# 5. Factory és Seeder kombinálása

Ajánlott megoldás:

* a struktúrát migráció hozza létre
* az alapadatot seeder adja
* a tömeges tesztadatot factory generálja

Seeder példában:

```php
public function run(): void
{
    \App\Models\County::factory()
        ->count(10)
        ->hasCities(20)
        ->create();
}
```

---

# 6. Tesztelés factory-val

Factory-k közvetlenül tesztekben is használhatók:

```php
$county = County::factory()->create();

$this->assertDatabaseHas('counties', [
    'id' => $county->id
]);
```

Ez lehetővé teszi az automatikus tesztadat létrehozást.

---

# 7. State (állapot) használata

Factory-ban definiálhatunk speciális állapotokat.

Példa CityFactory-ban:

```php
public function withShortZip(): Factory
{
    return $this->state(fn () => [
        'zip_code' => '0000',
    ]);
}
```

Használat:

```php
City::factory()->withShortZip()->create();
```

---

# 8. Gyakorlati parancs fejlesztéshez

Teljes adatbázis újragenerálása:

```bash
php artisan migrate:fresh --seed
```

Ez:

1. törli az összes táblát
2. lefuttatja a migrációkat
3. lefuttatja a seedereket
4. a seederekben használt factory-k is lefutnak

---

# 9. Összegzés

* A **factory** dinamikus tesztadat generáló eszköz.
* A counties–cities példában különösen jól használható.
* Az 1:N kapcsolatot a `hasCities()` vagy `county_id => County::factory()` kezeli.
* Seeder + factory együtt adja a leghatékonyabb fejlesztési workflow-t.
* Fejlesztés közben a `migrate:fresh --seed` a leggyakoribb parancs.


