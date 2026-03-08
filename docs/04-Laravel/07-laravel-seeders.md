---
id: laravel-seeders
slug: /laravel/seeders
title: "Seederek létrehozása"
---

# Seederek létrehozása

A **seederek** a Laravelben az adatbázis táblák feltöltésére szolgálnak kezdeti vagy tesztadatokkal.  
Segítségükkel a fejlesztési környezet gyorsan újratölthető, és a projekt mindig azonos alapadatokkal indulhat.

## Szerepük az MVC-ben

- **Model (M):** a seederek a modelleken keresztül hozzák létre az adatokat.
- **Controller (C):** a controllerek a seedelt adatokkal dolgoznak.
- **View (V):** a nézetek a seedelt adatok megjelenítését végzik.

👉 Részletes dokumentáció:  
https://laravel.com/docs/12.x/seeding

---

# 1. Counties és Cities alapadatok

A példában két tábla szerepel:

### counties
- id
- name

### cities
- id
- county_id
- name
- zip_code

Fontos:
- A `cities.county_id` idegen kulcs a `counties.id` mezőre.
- Ezért a seedelés sorrendje kritikus.

Először a **counties**, majd a **cities** kerül létrehozásra.

---

# 2. CountySeeder

## Létrehozás

```bash
php artisan make:seeder CountySeeder
````

## Fájl: `database/seeders/CountySeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\County;
use Illuminate\Database\Seeder;

class CountySeeder extends Seeder
{
    const COUNTIES = [
        'Budapest',
        'Pest',
        'Győr-Moson-Sopron',
        'Borsod-Abaúj-Zemplén',
        'Csongrád-Csanád',
    ];

    public function run(): void
    {
        foreach (self::COUNTIES as $name) {
            County::create([
                'name' => $name,
            ]);
        }
    }
}
```

---

# 3. CitySeeder

## Létrehozás

```bash
php artisan make:seeder CitySeeder
```

## Fájl: `database/seeders/CitySeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\County;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        // Példa: minden megyéhez létrehozunk néhány várost

        $counties = County::all();

        foreach ($counties as $county) {

            City::create([
                'name' => $county->name . ' város 1',
                'zip_code' => '1000',
                'county_id' => $county->id,
            ]);

            City::create([
                'name' => $county->name . ' város 2',
                'zip_code' => '2000',
                'county_id' => $county->id,
            ]);
        }
    }
}
```

👉 Itt jól látható az **1:N kapcsolat**:

* Egy county több city-hez kapcsolódik.
* A `county_id` mező biztosítja a kapcsolatot.

---

# 4. Seederek sorrendje

## DatabaseSeeder

Fájl:
`database/seeders/DatabaseSeeder.php`

```php
public function run(): void
{
    $this->call([
        CountySeeder::class,
        CitySeeder::class,
    ]);
}
```

Fontos:

* A `CountySeeder` mindig előbb fut.
* Ha fordítva lenne, a `CitySeeder` hibát dobna, mert nem létezne érvényes `county_id`.

---

# 5. Seederek futtatása

## Egy adott seeder:

```bash
php artisan db:seed --class=CountySeeder
```

## Az összes seeder:

```bash
php artisan db:seed
```

Ebben az esetben a `DatabaseSeeder` fog lefutni.

---

# 6. Factory + Seeder (haladó, de itt még egyszerűen)

Ha szeretnénk automatikusan több várost generálni:

```php
City::factory()
    ->count(50)
    ->create();
```

Factory használata előnyös, mert:

* gyors
* dinamikus
* nagy mennyiségű tesztadatot tud generálni

A későbbi factory leckében részletesen foglalkozunk vele.

---

# 7. Teljes adatbázis újratöltés

Fejlesztés során gyakori parancs:

```bash
php artisan migrate:fresh --seed
```

Ez:

1. Törli az összes táblát
2. Újrafuttatja a migrációkat
3. Lefuttatja a seedereket

Ez különösen hasznos tanulási és tesztelési környezetben.

---

# Összegzés

* A seederek az adatbázis feltöltésére szolgálnak.
* A counties–cities példában az **idegen kulcs miatt fontos a sorrend**.
* A `DatabaseSeeder` szabályozza a futási sorrendet.
* A `migrate:fresh --seed` a teljes újragenerálás eszköze.
* Factory használatával nagy mennyiségű tesztadat generálható.

---
