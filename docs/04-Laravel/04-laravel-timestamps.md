---
id: laravel-timestamps
slug: /laravel/timestamps
title: "Timestamps és Soft Delete a Laravelben"
---

# Timestamps és Soft Delete a Laravelben

Ebben a leckében megismerjük:

- a `created_at` és `updated_at` mezők szerepét
- hogyan működik a Laravel automatikus időbélyeg kezelése
- mi az a **soft delete**
- hogyan kerül be a `deleted_at` mező az adatbázisba

A projektünkben alapértelmezetten **nem használunk timestamp mezőket**, de fontos megérteni a működésüket.

---

# 1. Timestamps a Laravelben

A Laravel alapértelmezés szerint két mezőt használ az adatbázis táblákban:

```
created_at
updated_at
```

Ezeket a migrációban így lehet létrehozni:

```php
$table->timestamps();
```

Ez automatikusan hozzáadja mindkét mezőt.

---

## Mire használja a Laravel?

- `created_at` → mikor jött létre a rekord
- `updated_at` → mikor módosították utoljára

Az Eloquent automatikusan frissíti ezeket.

---

## Ha nem szeretnénk használni

Két lépés szükséges:

### 1️⃣ Migrációban nem tesszük bele:

Egyszerűen kihagyjuk a következő sort:

```php
$table->timestamps();
```

---

### 2️⃣ A modellben kikapcsoljuk:

```php
public $timestamps = false;
```

Így az Eloquent nem próbálja kezelni ezeket a mezőket.

---

# 2. Soft Delete (lágy törlés)

A soft delete azt jelenti, hogy egy rekord **nem törlődik véglegesen**, hanem csak "megjelöljük töröltként".

---

## Hogyan működik?

A Laravel egy extra mezőt használ:

```
deleted_at
```

Ha ez az érték:

- `NULL` → a rekord aktív
- dátum/idő → a rekord töröltnek számít

---

# 3. Hogyan kerül be a deleted_at mező?

### 1️⃣ Migrációban:

Soft delete támogatáshoz ezt kell használni:

```php
$table->softDeletes();
```

Ez létrehozza a `deleted_at` mezőt.

---

### 2️⃣ A modellben:

Be kell kapcsolni a SoftDeletes trait-et:

```php
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;
}
```

---

# 4. Mit csinál a SoftDeletes?

Ha egy rekordot törlünk:

```php
$city->delete();
```

A rendszer nem törli ki az adatbázisból.

Ehelyett:

```
deleted_at = aktuális dátum
```

---

# 5. Miért hasznos a soft delete?

✔ Véletlen törlés visszaállítható  
✔ Audit célokra hasznos  
✔ Valós rendszerekben gyakori  
✔ Biztonságosabb adatkezelés  

---

# 6. Soft delete visszaállítása

```php
$city->restore();
```

---

# 7. Soft delete rekordok lekérdezése

Alapértelmezés szerint az Eloquent **nem mutatja** a törölt rekordokat.

Ha minden rekordot szeretnénk látni:

```php
City::withTrashed()->get();
```

Csak a törölteket:

```php
City::onlyTrashed()->get();
```

---

# 8. Projektünk jelenlegi döntése

Ebben a tananyagban:

- nem használunk timestamps mezőket
- nem használunk soft delete-et
- a törlés valódi DELETE művelet lesz

Ez segít a rendszer működésének egyszerű megértésében.

Később külön leckében bemutatható a soft delete használata.

---

👉 Dokumentáció:  
https://laravel.com/docs/12.x/eloquent#soft-deleting
````
