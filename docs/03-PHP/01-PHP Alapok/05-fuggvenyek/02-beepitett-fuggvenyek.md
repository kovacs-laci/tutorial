---
id: beepitett-fuggvenyek
slug: /php-alapok/beepitett-fuggvenyek
title: "Beépített függvények"
---

# Beépített függvények

A PHP rengeteg előre elkészített függvényt tartalmaz, amelyek megkönnyítik a munkát.  
Nézzünk néhány gyakran használt kategóriát.

---

# Szövegkezelő függvények

## `strlen()` – hossz

```php
echo strlen("alma"); // 4
```

## `strtoupper()` – nagybetűssé alakítás

```php
echo strtoupper("alma"); // ALMA
```

## `strtolower()` – kisbetűssé alakítás

```php
echo strtolower("ALMA"); // alma
```

## `str_replace()` – csere

```php
echo str_replace("a", "o", "alma"); // olmo
```

---

# Számkezelő függvények

## `abs()` – abszolút érték

```php
echo abs(-5); // 5
```

## `round()` – kerekítés

```php
echo round(3.67); // 4
```

---

# Tömbkezelő függvények

## `count()`

```php
$lista = [1, 2, 3];
echo count($lista); // 3
```

## `in_array()`

```php
$szinek = ["piros", "kék"];
echo in_array("kék", $szinek); // true
```

---

# Dátum és idő

## `date()`

```php
echo date("Y-m-d"); // pl. 2026-01-20
```

---

# Gyakorlófeladatok

1. Írd ki egy szöveg hosszát `strlen()` segítségével.
2. Alakíts át egy mondatot nagybetűssé.
3. Ellenőrizd, hogy egy tömb tartalmaz‑e egy adott értéket.
4. Írd ki a mai dátumot `date()` segítségével.

---

## Megjegyzés

- Érdemes utánanézni a `php.net` dokumentációban a függvények teljes listájának.
- Lásd még: reguláris kifejezések (`preg_match()`).
