---
id: laravel-models
slug: /laravel/models
title: "Modell osztályok létrehozása"
---

# Modell osztályok létrehozása

A **modellek** a Laravelben az adatbázis táblák objektum-orientált reprezentációi.

Az **Eloquent ORM** segítségével az adatbázis rekordokkal úgy dolgozhatunk, mintha PHP objektumok lennének.

A projektünkben a következő táblákhoz készítünk modelleket:

```
counties
cities
```

---

# A modellek szerepe

- Adatok lekérdezése
- Adatok létrehozása
- Adatok módosítása
- Adatok törlése
- Kapcsolatok (relációk) definiálása

A modellek az **MVC architektúrában** az adatkezelés központi elemei.

---

👉 Dokumentáció:  
https://laravel.com/docs/12.x/eloquent

---

# 1. Modell létrehozása

Modell generálása Artisan paranccsal:

```bash
php artisan make:model ModelName
```

### Példák:

```bash id="model1"
php artisan make:model County
```

```bash id="model2"
php artisan make:model City
```

A modellek helye:

```
app/Models
```

---

# 2. Tömeges hozzárendelés (Mass Assignment)

Alapértelmezés szerint az Eloquent védi a modelleket a tömeges adatfeltöltéstől.

Ezért meg kell adni, mely mezők tölthetők fel:

```php
protected $fillable = [...];
```

---

## County modell

`app/Models/County.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class County extends Model
{
    /**
     * Ebben a projektben nem használunk timestamp mezőket.
     */
    public $timestamps = false;

    /**
     * Tömegesen kitölthető mezők.
     */
    protected $fillable = ['name'];

    /**
     * Egy megyéhez több város tartozhat.
     */
    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
```

---

## City modell

`app/Models/City.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    /**
     * Ebben a projektben nem használunk timestamp mezőket.
     */
    public $timestamps = false;

    /**
     * Tömegesen kitölthető mezők.
     */
    protected $fillable = [
        'name',
        'zip_code',
        'county_id'
    ];

    /**
     * Egy város egy megyéhez tartozik.
     */
    public function county()
    {
        return $this->belongsTo(County::class);
    }
}
```

---

# 3. Egy a többhöz kapcsolat

A projektben az adatmodell:

```
County → City
```

Ez azt jelenti:

- Egy megye több várost tartalmazhat
- Egy város pontosan egy megyéhez tartozik

---

## Kapcsolat használata

### Egy megye városai:

```php
$county = County::find(1);

$cities = $county->cities;
```

---

### Egy város megyéje:

```php
$city = City::find(1);

$county = $city->county;
```

Fontos:

```
$county->cities
```

nem pedig:

```
$county->cities()
```

A reláció tulajdonságként érhető el.

---

# 4. Lekérdezések a modelleken keresztül

### Összes megye:

```php
$counties = County::all();
```

---

### Egy megye városokkal együtt:

```php
$counties = County::with('cities')->get();
```

Ez az úgynevezett **eager loading**, amely csökkenti az adatbázis lekérdezések számát.

---

# 5. Miért fontosak a modellek?

A modellek biztosítják, hogy:

- az adatbázissal objektum-orientált módon dolgozzunk
- a relációk tisztán definiáltak legyenek
- a controller réteg egyszerű maradjon
- a kód karbantartható legyen

---

# Összefoglalás

Ebben a projektben:

- A modellek a `counties` és `cities` táblákat reprezentálják.
- A `County` modell `hasMany` kapcsolatban áll a `City` modellel.
- A `City` modell `belongsTo` kapcsolatban áll a `County` modellel.
- A timestamps használata ki van kapcsolva (`public $timestamps = false`).
- A tömeges hozzárendeléshez a `$fillable` tulajdonságot használjuk.

A következő lépésben a modelleket a **kontrollerekben** fogjuk használni.
````
