---
id: beepitett-fuggvenyek
slug: /php/fuggvenyek/beepitett-fuggvenyek
title: "Beépített függvények"
---

# Beépített függvények

A PHP rengeteg előre elkészített függvényt tartalmaz, amelyek megkönnyítik a mindennapi munkát.  
Ebben a leckében a **leggyakoribb, legfontosabb és leggyakorlatiabb** függvényeket mutatjuk be.

Minden példában **angol változóneveket** használunk, és **outputot** is mutatunk.

---

# Szövegkezelő függvények

## `strlen()` – hossz

```php
echo strlen("apple");
```

**Output:**
```
5
```

---

## `strtoupper()` – nagybetűssé alakítás

```php
echo strtoupper("apple");
```

**Output:**
```
APPLE
```

---

## `strtolower()` – kisbetűssé alakítás

```php
echo strtolower("APPLE");
```

**Output:**
```
apple
```

---

## `str_replace()` – csere

```php
echo str_replace("a", "o", "banana");
```

**Output:**
```
bonono
```

---

## `substr()` – részszöveg

```php
echo substr("Hello World", 0, 5);
```

**Output:**
```
Hello
```

---

## `strpos()` – keresés szövegben

```php
echo strpos("banana", "na");
```

**Output:**
```
2
```

---

## `ucfirst()`, `lcfirst()`, `ucwords()`

```php
echo ucfirst("hello world");   // Hello world
echo lcfirst("Hello World");   // hello World
echo ucwords("hello world");   // Hello World
```

---

## `htmlspecialchars()` – HTML escape

```php
echo htmlspecialchars("<b>Hello</b>");
```

**Output:**
```
&lt;b&gt;Hello&lt;/b&gt;
```

---

# Számkezelő függvények

## `abs()` – abszolút érték

```php
echo abs(-5);
```

**Output:**
```
5
```

---

## `round()` – kerekítés

```php
echo round(3.67);
```

**Output:**
```
4
```

---

## `max()` és `min()`

```php
echo max(10, 5, 20); // 20
echo min(10, 5, 20); // 5
```

---

## `rand()` – véletlen szám

```php
echo rand(1, 100);
```

---

# Tömbkezelő függvények

## `count()` – elemszám

```php
$numbers = [1, 2, 3];
echo count($numbers);
```

**Output:**
```
3
```

---

## `in_array()` – érték keresése

```php
$colors = ["red", "blue"];
echo in_array("blue", $colors) ? "true" : "false";
```

**Output:**
```
true
```

---

## `array_key_exists()` – kulcs létezése

```php
$user = ["name" => "Kate", "age" => 16];
echo array_key_exists("age", $user) ? "Exists" : "Missing";
```

---

## `array_keys()` és `array_values()`

```php
print_r(array_keys($user));
print_r(array_values($user));
```

---

# Dátum és idő

## `date()`

```php
echo date("Y-m-d");
```

**Output:**
```
2026-01-20
```

---

## `time()` – Unix timestamp

```php
echo time();
```

---

## `strtotime()` – szövegből dátum

```php
echo date("Y-m-d", strtotime("next Monday"));
```

---

# További hasznos függvények

## `trim()` – szóközök eltávolítása

```php
echo trim("  hello  ");
```

**Output:**
```
hello
```

---

## `var_dump()` – részletes kiírás

```php
var_dump(["apple", 10, true]);
```

---

# Tipikus hibák beépített függvényeknél

:::info Tipikus hibák
- `in_array()` laza összehasonlítást használ
- `explode()` üres string esetén egyetlen üres elemet ad
- `implode()` csak tömböt fogad el
- `strlen()` byte‑hosszt ad vissza, nem karakterhosszt (UTF‑8 esetén fontos!)
- `strpos()` 0‑t ad vissza, ami **false‑nak tűnhet**, de valójában érvényes pozíció  
  :::

---

# Gyakorlófeladatok

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

**3. Ellenőrizd, hogy egy tömb tartalmaz‑e egy adott értéket.**
<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];
echo in_array("pear", $fruits) ? "Found" : "Not found";
```
</details>

---

**4. Írd ki a mai dátumot `date()` segítségével.**
<details>
<summary>Megoldás</summary>

```php
echo date("Y-m-d");
```
</details>

---

**5. Távolítsd el a szóközöket egy szöveg elejéről és végéről (`trim`).**
<details>
<summary>Megoldás</summary>

```php
echo trim("   PHP   ");
```
</details>

---

**6. Alakíts át egy mondatot tömbbé (`explode`).**
<details>
<summary>Megoldás</summary>

```php
$words = explode(" ", "Learning PHP is fun");
print_r($words);
```
</details>

---

**7. Fűzd össze egy tömb elemeit vesszővel (`implode`).**
<details>
<summary>Megoldás</summary>

```php
echo implode(", ", ["red", "blue", "green"]);
```
</details>

---

**8. Írd ki egy tömb legnagyobb és legkisebb elemét (`max`, `min`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [10, 5, 20];
echo max($numbers); // 20
echo min($numbers); // 5
```
</details>

---

**9. Keresd meg egy szövegben egy részszöveg pozícióját (`strpos`).**
<details>
<summary>Megoldás</summary>

```php
echo strpos("Hello World", "World");
```
</details>

---

**10. Generálj egy véletlen számot 1 és 50 között (`rand`).**
<details>
<summary>Megoldás</summary>

```php
echo rand(1, 50);
```
</details>

---

**11. Alakíts át egy HTML‑t tartalmazó szöveget biztonságos formára (`htmlspecialchars`).**
<details>
<summary>Megoldás</summary>

```php
echo htmlspecialchars("<script>alert('XSS');</script>");
```
</details>

---

**12. Alakíts át egy szöveget dátummá (`strtotime`).**
<details>
<summary>Megoldás</summary>

```php
echo date("Y-m-d", strtotime("2026-01-20"));
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a php.net dokumentációban a függvények teljes listájának.
- Lásd még: reguláris kifejezések (`preg_match()`), tömbműveletek (`array_filter`, `array_map`, `array_reduce`).

---