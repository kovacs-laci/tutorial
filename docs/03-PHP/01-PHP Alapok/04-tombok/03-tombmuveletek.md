---
id: tombmuveletek
slug: /php-alapok/tombmuveletek
title: "Tömbműveletek"
---

# Tömbműveletek

A PHP rengeteg beépített függvényt kínál tömbök kezelésére.  
Ebben a leckében a **legfontosabb, leggyakoribb és leggyakorlatiabb** tömbműveleteket mutatjuk be.

Minden példában **angol változóneveket** használunk, és **outputot** is mutatunk.

---

# `count()` – elemszám

```php
$numbers = [1, 2, 3, 4];
echo count($numbers);
```

**Output:**
```
4
```

---

# `array_push()` – elem hozzáadása

```php
$fruits = ["apple", "pear"];
array_push($fruits, "plum");
print_r($fruits);
```

**Output:**
```
Array
(
    [0] => apple
    [1] => pear
    [2] => plum
)
```

---

# `array_pop()` – utolsó elem eltávolítása

```php
$numbers = [1, 2, 3];
$last = array_pop($numbers);

echo $last;     // 3
print_r($numbers);
```

**Output:**
```
3
Array
(
    [0] => 1
    [1] => 2
)
```

---

# `unset()` – elem törlése index alapján

```php
$numbers = [10, 20, 30];
unset($numbers[1]);
print_r($numbers);
```

**Output:**
```
Array
(
    [0] => 10
    [2] => 30
)
```

---

# `implode()` – tömb → szöveg

```php
$names = ["Anna", "Bela", "Csaba"];
echo implode(", ", $names);
```

**Output:**
```
Anna, Bela, Csaba
```

---

# `explode()` – szöveg → tömb

```php
$text = "red;blue;green";
$colors = explode(";", $text);
print_r($colors);
```

**Output:**
```
Array
(
    [0] => red
    [1] => blue
    [2] => green
)
```

---

# Rendezés

## `sort()` – növekvő sorrend

```php
$numbers = [4, 1, 3];
sort($numbers);
print_r($numbers);
```

**Output:**
```
Array
(
    [0] => 1
    [1] => 3
    [2] => 4
)
```

## `rsort()` – csökkenő sorrend

```php
$numbers = [4, 1, 3];
rsort($numbers);
print_r($numbers);
```

**Output:**
```
Array
(
    [0] => 4
    [1] => 3
    [2] => 1
)
```

---

# `in_array()` – érték keresése

```php
$fruits = ["apple", "pear", "plum"];

if (in_array("pear", $fruits)) {
    echo "Found!";
}
```

**Output:**
```
Found!
```

---

# `array_search()` – index keresése

```php
$fruits = ["apple", "pear", "plum"];

$index = array_search("plum", $fruits);
echo $index;
```

**Output:**
```
2
```

---

# `array_filter()` – tömb szűrése

```php
$numbers = [1, 2, 3, 4, 5];

$even = array_filter($numbers, function ($n) {
    return $n % 2 === 0;
});

print_r($even);
```

**Output:**
```
Array
(
    [1] => 2
    [3] => 4
)
```

---

# `array_map()` – tömb módosítása

```php
$numbers = [1, 2, 3];

$doubled = array_map(function ($n) {
    return $n * 2;
}, $numbers);

print_r($doubled);
```

**Output:**
```
Array
(
    [0] => 2
    [1] => 4
    [2] => 6
)
```

---

# `array_reduce()` – tömb összegzése

```php
$numbers = [1, 2, 3, 4];

$sum = array_reduce($numbers, function ($carry, $n) {
    return $carry + $n;
}, 0);

echo $sum;
```

**Output:**
```
10
```

---

# `usort()` – egyedi rendezés

```php
$numbers = [5, 12, 3, 8];

usort($numbers, function ($a, $b) {
    return $a <=> $b; // növekvő sorrend
});

print_r($numbers);
```

**Output:**
```
Array
(
    [0] => 3
    [1] => 5
    [2] => 8
    [3] => 12
)
```

---

# Tipikus hibák tömbműveleteknél

:::info Tipikus hibák
- `unset()` után az indexek nem rendeződnek újra
- `array_filter()` megőrzi az eredeti indexeket
- `array_map()` mindig új indexeket generál
- `sort()` felülírja az eredeti kulcsokat
- `in_array()` laza összehasonlítást használ (vigyázni kell!)  
  :::

---

# Gyakorlófeladatok

**1. Készíts egy tömböt 5 névvel, majd rendezd őket ábécé szerint.**
<details>
<summary>Megoldás</summary>

```php
$names = ["Anna", "Bela", "Csaba", "David", "Eva"];
sort($names);
print_r($names);
```
</details>

---

**2. Alakíts át egy mondatot tömbbé `explode()` segítségével.**
<details>
<summary>Megoldás</summary>

```php
$text = "PHP is fun to learn";
$words = explode(" ", $text);
print_r($words);
```
</details>

---

**3. Fűzd össze egy tömb elemeit vesszővel elválasztva.**
<details>
<summary>Megoldás</summary>

```php
$items = ["red", "blue", "green"];
echo implode(", ", $items);
```
</details>

---

**4. Törölj egy elemet egy tömbből, majd írd ki a maradékot.**
<details>
<summary>Megoldás</summary>

```php
$numbers = [10, 20, 30, 40];
unset($numbers[1]);
print_r($numbers);
```
</details>

---

**5. Szűrd ki egy tömbből a páros számokat (`array_filter`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [1, 2, 3, 4, 5, 6];

$even = array_filter($numbers, fn($n) => $n % 2 === 0);

print_r($even);
```
</details>

---

**6. Duplázd meg egy tömb elemeit (`array_map`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [1, 2, 3];

$doubled = array_map(fn($n) => $n * 2, $numbers);

print_r($doubled);
```
</details>

---

**7. Számold össze egy tömb elemeit (`array_reduce`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [5, 10, 15];

$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);

echo $sum;
```
</details>

---

**8. Rendezd egy tömböt egyedi logika szerint (`usort`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [5, 12, 3, 8];

usort($numbers, fn($a, $b) => $a <=> $b);

print_r($numbers);
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a tömbfüggvények teljes listájának: `php array functions`.
- Lásd még: tömbök rendezése egyedi feltételek alapján (`usort()`), tömbök szűrése (`array_filter()`), tömbök módosítása (`array_map()`), tömbök összegzése (`array_reduce()`).

---