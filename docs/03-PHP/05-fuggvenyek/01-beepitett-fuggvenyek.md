---
id: beepitett-fuggvenyek
slug: /php/fuggvenyek/beepitett-fuggvenyek
title: "Beépített függvények"
---

A PHP rengeteg előre elkészített függvényt tartalmaz, amelyek megkönnyítik a mindennapi munkát.  
Ebben a leckében a **leggyakoribb, legfontosabb és leggyakorlatiabb** függvényeket mutatjuk be.

Minden példában **angol változóneveket** használunk, és **outputot** is mutatunk.

---

## Szövegkezelő függvények

### `strlen()` – hossz

```php
echo strlen("apple");
```

**Output:**
```
5
```

---

### `strtoupper()` – nagybetűssé alakítás

```php
echo strtoupper("apple");
```

**Output:**
```
APPLE
```

---

### `strtolower()` – kisbetűssé alakítás

```php
echo strtolower("APPLE");
```

**Output:**
```
apple
```

---

### `str_replace()` – csere

```php
echo str_replace("a", "o", "banana");
```

**Output:**
```
bonono
```

---

### `substr()` – részszöveg

```php
echo substr("Hello World", 0, 5);
```

**Output:**
```
Hello
```

---

### `strpos()` – keresés szövegben

```php
echo strpos("banana", "na");
```

**Output:**
```
2
```

---

### `ucfirst()`, `lcfirst()`, `ucwords()`

```php
echo ucfirst("hello world");   // Hello world
echo lcfirst("Hello World");   // hello World
echo ucwords("hello world");   // Hello World
```

---

### `htmlspecialchars()` – HTML escape

```php
echo htmlspecialchars("<b>Hello</b>");
```

**Output:**
```
&lt;b&gt;Hello&lt;/b&gt;
```

---

## Számkezelő függvények

### `abs()` – abszolút érték

```php
echo abs(-5);
```

**Output:**
```
5
```

---

### `round()` – kerekítés

```php
echo round(3.67);
```

**Output:**
```
4
```

---

### `max()` és `min()`

```php
echo max(10, 5, 20); // 20
echo min(10, 5, 20); // 5
```

---

### `rand()` – véletlen szám

```php
echo rand(1, 100);
```

---

## Tömbkezelő függvények

A tömbök elemszámának lekérésére, keresésére, rendezésére, szűrésére és átalakítására többek között a `count()`, `in_array()`, `sort()`, `array_filter()` és `array_map()` használható.
A tömbkezelő függvényeket részletes példákkal a [Tömbműveletek leckében](../04-tombok/03-1-tombmuveletek.md) mutatjuk be.

---

## Dátum és idő

### `date()`

```php
echo date("Y-m-d");
```

**Output:**
```
2026-01-20
```

---

### `time()` – Unix timestamp

A Unix időbélyeg (Unix timestamp) egy olyan módja az idő nyomon követésének, amely az eltelt másodperceket folyamatosan növekvő számlálóként tárolja. Ez a számlálás az úgynevezett Unix-korszaktól (Unix Epoch) indul, amely 1970. január 1-jén 00:00:00 UTC-kor kezdődik. Ennek megfelelően a Unix időbélyeg nem más, mint egy adott dátum és a Unix-korszak kezdete között eltelt másodpercek száma

```php
echo time();
```

---

### `strtotime()` – szövegből dátum

```php
echo strtotime("now"), "\n";
echo strtotime("10 September 2000"), "\n";
echo strtotime("+1 day"), "\n";
echo strtotime("+1 week"), "\n";
echo strtotime("+1 week 2 days 4 hours 2 seconds"), "\n";
echo strtotime("next Thursday"), "\n";
echo strtotime("last Monday"), "\n";
echo date("Y-m-d", strtotime("next Monday"));
```

---

## További hasznos függvények

### `trim()` – szóközök eltávolítása

```php
echo trim("  hello  ");
```

**Output:**
```
hello
```

---

### `var_dump()` – részletes kiírás

```php
var_dump(["apple", 10, true]);
```

---

## Tipikus hibák beépített függvényeknél

:::info Tipikus hibák
- `strlen()` byte‑hosszt ad vissza, nem karakterhosszt (UTF‑8 esetén fontos!)
- `strpos()` 0‑t ad vissza, ami **false‑nak tűnhet**, de valójában érvényes pozíció  
  :::

---

## Gyakorlófeladatok

**1. Írd ki egy szöveg hosszát `strlen()` segítségével.**
<details>
<summary>Megoldás</summary>

```php
echo strlen("Hello World");
```
</details>

---

**2. Alakíts át egy mondatot nagybetűssé.**
<details>
<summary>Megoldás</summary>

```php
echo strtoupper("php is fun");
```
</details>

---

**3. Írd ki a mai dátumot `date()` segítségével.**
<details>
<summary>Megoldás</summary>

```php
echo date("Y-m-d");
```
</details>

---

**4. Távolítsd el a szóközöket egy szöveg elejéről és végéről (`trim`).**
<details>
<summary>Megoldás</summary>

```php
echo trim("   PHP   ");
```
</details>

---

**5. Keresd meg egy szövegben egy részszöveg pozícióját (`strpos`).**
<details>
<summary>Megoldás</summary>

```php
echo strpos("Hello World", "World");
```
</details>

---

**6. Generálj egy véletlen számot 1 és 50 között (`rand`).**
<details>
<summary>Megoldás</summary>

```php
echo rand(1, 50);
```
</details>

---

**7. Alakíts át egy HTML‑t tartalmazó szöveget biztonságos formára (`htmlspecialchars`).**
<details>
<summary>Megoldás</summary>

```php
echo htmlspecialchars("<script>alert('XSS');</script>");
```
</details>

---

**8. Alakíts át egy szöveget dátummá (`strtotime`).**
<details>
<summary>Megoldás</summary>

```php
echo date("Y-m-d", strtotime("2026-01-20"));
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a php.net dokumentációban a függvények teljes listájának.
- Lásd még: reguláris kifejezések (`preg_match()`).

---