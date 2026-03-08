---
id: laravel-migrations
slug: /laravel/migrations
title: "Adatbázis táblák létrehozása migrációval"
---

# Adatbázis táblák létrehozása migrációval

A **migrációk** a Laravelben olyan verziókövetett fájlok, amelyek az adatbázis szerkezetének (táblák, oszlopok, indexek) létrehozását és módosítását írják le.

Segítségükkel az adatbázis változtatásai **kód formájában dokumentálhatók és megoszthatók**, így a fejlesztőcsapat minden tagja ugyanazt a struktúrát tudja előállítani.

---

# Mire valók a migrációk?

- Az adatbázis szerkezetének létrehozása és módosítása (pl. új táblák, oszlopok).
- A változtatások verziókövetése.
- A migrációk visszavonhatók vagy újra futtathatók.
- Automatizált, ismételhető adatbázis-műveletek biztosítása.

---

# Szerepük az MVC architektúrában

**Model (M)**  
A migrációk határozzák meg, milyen táblák és mezők állnak rendelkezésre az Eloquent ORM számára.

**View (V)**  
A nézetek a modelleken keresztül érik el az adatokat, amelyek a migrációk által létrehozott táblákból dolgoznak.

**Controller (C)**  
A controllerek a modelleken keresztül kommunikálnak az adatbázissal.

👉 Röviden: a migrációk biztosítják, hogy az alkalmazás **adatbázis szerkezete konzisztens és reprodukálható legyen**.

👉 Dokumentáció:  
https://laravel.com/docs/12.x/migrations

---

# 1. Migráció létrehozása

Új migráció létrehozása:

```bash
php artisan make:migration create_[table_name]_table
```

**Példa:**

```bash
php artisan make:migration create_counties_table
```

Laravel konvenciók:

- a tábla neve **angolul**
- **többes számban**
- `snake_case` formában

---

# 2. Migrációs fájl szerkesztése

A migrációs fájl a következő mappában található:

```
database/migrations
```

A fájl két fontos metódust tartalmaz:

```
up()
down()
```

**up()**

Az adatbázis módosítását tartalmazza (pl. tábla létrehozása).

**down()**

A módosítás visszavonását tartalmazza.

---

# 3. Példa – Counties tábla

`database/migrations/<timestamp>_create_counties_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('counties', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('counties');
    }
};
```

---

# Magyarázat

```
$table->id()
```

Laravel rövidítés egy automatikusan növekvő elsődleges kulcsra.

Valójában:

```
unsignedBigInteger AUTO_INCREMENT PRIMARY KEY
```

---

```
$table->string('name')
```

Szöveges mező a megye nevének tárolására.

---

```
->index()
```

Indexet hoz létre az oszlopon, ami gyorsabb keresést tesz lehetővé.

---

# 4. Egy a többhöz kapcsolat

A példában:

```
County → City
```

Egy megye több várost tartalmazhat.

Ezért a **cities** tábla tartalmaz egy idegen kulcsot:

```
county_id
```

---

# 5. Cities tábla migráció

```bash
php artisan make:migration create_cities_table
```

`database/migrations/<timestamp>_create_cities_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {

            $table->id();

            $table->foreignId('county_id')
                  ->constrained('counties')
                  ->onDelete('cascade');

            $table->string('name');
            $table->string('zip_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
```

---

# Magyarázat

```
$table->foreignId('county_id')
```

Létrehoz egy idegen kulcs mezőt.

A típusa automatikusan ugyanaz lesz, mint a `counties.id`.

---

```
->constrained('counties')
```

Idegen kulcs kapcsolat a következő mezőhöz:

```
counties.id
```

---

```
->onDelete('cascade')
```

Ha egy megye törlődik:

```
County törlés
↓
City rekordok automatikus törlése
```

---

# A migrációk végrehajtásának sorrendje

A migrációk futtatási sorrendjét **a fájl nevében lévő timestamp határozza meg**.

Példa:

```
2025_03_01_101200_create_counties_table.php
2025_03_01_101350_create_cities_table.php
```

Először a `counties` migráció fut le, majd a `cities`.

Ez azért fontos, mert a `cities` tábla **hivatkozik a counties táblára**, ezért annak már léteznie kell.

---

# 6. Migrációk futtatása

Az összes még nem futtatott migráció végrehajtása:

```bash
php artisan migrate
```

Ez létrehozza az adatbázisban a migrációkban definiált táblákat.

---

# 7. Migráció visszavonása

Utolsó migráció visszavonása:

```bash
php artisan migrate:rollback
```

---

Több migráció visszavonása:

```bash
php artisan migrate:rollback --step=3
```

---

# 8. Az adatbázis teljes újraépítése

Fejlesztés közben gyakran előfordul, hogy az adatbázist teljesen újra szeretnénk építeni.

Erre használható a következő parancs:

```bash
php artisan migrate:fresh
```

Ez:

1. törli az összes táblát
2. újra lefuttatja az összes migrációt

---

# 9. Migrációk futtatása seed adatokkal

Ha a migrációk után tesztadatokat is szeretnénk betölteni:

```bash
php artisan migrate:fresh --seed
```

Ez:

1. törli az adatbázist
2. újra létrehozza a táblákat
3. betölti a **seed adatokat**

A **seederek** segítségével előre definiált tesztadatokat tölthetünk az adatbázisba.

A seederek használatáról egy későbbi leckében lesz szó.

---

# 10. Meglévő tábla módosítása

Migrációval meglévő táblát is módosíthatunk.

Példa: új mező hozzáadása a **cities** táblához.

Migráció létrehozása:

```bash
php artisan make:migration add_population_to_cities_table
```

Migráció tartalma:

```php
public function up(): void
{
    Schema::table('cities', function (Blueprint $table) {
        $table->integer('population')->nullable();
    });
}

public function down(): void
{
    Schema::table('cities', function (Blueprint $table) {
        $table->dropColumn('population');
    });
}
```

Ez a migráció:

- hozzáad egy `population` mezőt
- rollback esetén törli azt

---

👉 Dokumentáció:  
https://laravel.com/docs/12.x/migrations
````

