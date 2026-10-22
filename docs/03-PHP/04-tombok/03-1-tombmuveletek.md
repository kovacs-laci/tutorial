---
id: tombmuveletek
slug: /php/tombok/tombmuveletek
title: "Tömbműveletek"
---

A PHP rengeteg beépített függvényt kínál tömbök kezelésére.  
Ebben a leckében a **legfontosabb, leggyakoribb és leggyakorlatiabb** tömbműveleteket mutatjuk be.

Minden példában **angol változóneveket** használunk, és **outputot** is mutatunk.

---

## `count()` – elemszám

```php
$numbers = [1, 2, 3, 4];
echo count($numbers);
```

**Output:**
```
4
```

---

## `max()` és `min()` – legnagyobb és legkisebb érték

Tömb elemeinek legnagyobb és legkisebb értékét a `max()` és a `min()` függvénnyel kérhetjük le.

```php
$numbers = [10, 5, 20];

echo max($numbers);
echo min($numbers);
```

**Output:**
```
20
5
```

---

## `array_push()` – elem hozzáadása

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

### Rövidebb szintaxis: `[]`

Ha csak egyetlen elemet szeretnénk hozzáadni, általában egyszerűbb a `[]` szintaxis:

```php
$fruits = ["apple", "pear"];

$fruits[] = "plum";

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

:::tip Mikor melyiket?
- Egyetlen elem hozzáadásához általában a `$array[] = $value` forma a leggyakoribb.
- Több elem egyszerre történő hozzáadására használható az `array_push()`.
:::

---

## `array_merge()` – tömbök egyesítése

Az `array_merge()` két vagy több tömb elemeit egyetlen új tömbbé egyesíti.

```php
$fruits = ["apple", "pear"];
$moreFruits = ["plum", "banana"];

$result = array_merge($fruits, $moreFruits);

print_r($result);
```

**Output:**

```
Array
(
    [0] => apple
    [1] => pear
    [2] => plum
    [3] => banana
)
```

**Asszociatív tömbök esetén**

Ha azonos kulcs szerepel több tömbben, az utolsó érték felülírja a korábbit.

```php
$user = [
    "name" => "Anna",
    "city" => "Budapest"
];

$extra = [
    "city" => "Szeged",
    "age" => 25
];

$result = array_merge($user, $extra);

print_r($result);
```

**Output:**

```
Array
(
    [name] => Anna
    [city] => Szeged
    [age] => 25
)
```

:::info Tudtad?
Számozott indexű tömbök esetén az `array_merge()` újraindexeli az elemeket 0-tól kezdve.
:::


---

## `array_pop()` – utolsó elem eltávolítása

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

## `unset()` – elem törlése index alapján

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

## `implode()` – tömb → szöveg

```php
$names = ["Anna", "Bela", "Csaba"];
echo implode(", ", $names);
```

**Output:**
```
Anna, Bela, Csaba
```

---

## `explode()` – szöveg → tömb

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

## Rendezés

### `sort()` – növekvő sorrend

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

### `rsort()` – csökkenő sorrend

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

## `in_array()` – érték keresése

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

## `array_search()` – index keresése

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

## `array_filter()` – tömb szűrése

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

## `array_map()` – tömb módosítása

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

## `array_reduce()` – tömb összegzése

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

## `array_unique()` – duplikált elemek eltávolítása

Az `array_unique()` eltávolítja az ismétlődő elemeket.

```php
$colors = ["red", "blue", "red", "green", "blue"];

$result = array_unique($colors);

print_r($result);
```

**Output:**

```
Array
(
    [0] => red
    [1] => blue
    [3] => green
)
```

:::info Megjegyzés
Az eredeti indexek megmaradnak.
:::

---

## `array_reverse()` – tömb megfordítása

A tömb elemeit fordított sorrendben adja vissza.

```php
$numbers = [1, 2, 3, 4];

$reversed = array_reverse($numbers);

print_r($reversed);
```

**Output:**

```
Array
(
    [0] => 4
    [1] => 3
    [2] => 2
    [3] => 1
)
```

---

## `array_keys()` – kulcsok lekérése

Visszaadja a tömb összes kulcsát.

```php
$user = [
    "name" => "Anna",
    "age" => 25,
    "city" => "Budapest"
];

$keys = array_keys($user);

print_r($keys);
```

**Output:**

```
Array
(
    [0] => name
    [1] => age
    [2] => city
)
```

---

## `array_values()` – értékek lekérése

Visszaadja a tömb összes értékét.

```php
$user = [
    "name" => "Anna",
    "age" => 25,
    "city" => "Budapest"
];

$values = array_values($user);

print_r($values);
```

**Output:**

```
Array
(
    [0] => Anna
    [1] => 25
    [2] => Budapest
)
```

:::info Megjegyzés
Az `array_values()` újraindexeli az elemeket 0-tól kezdve.
:::

---

## `array_key_exists()` – kulcs létezésének vizsgálata

Megvizsgálja, hogy egy adott kulcs szerepel-e a tömbben.

```php
$user = [
    "name" => "Anna",
    "age" => 25
];

if (array_key_exists("age", $user)) {
    echo "Key exists!";
}
```

**Output:**

```
Key exists!
```

**Miért nem `isset()`?**

Az `isset()` és az `array_key_exists()` hasonló, de nem ugyanaz.

```php
$user = [
    "name" => null
];

var_dump(isset($user["name"]));
var_dump(array_key_exists("name", $user));
```

**Output:**

```
bool(false)
bool(true)
```

:::info Fontos
Az `isset()` csak akkor ad `true` értéket, ha a kulcs létezik **és nem null**.

Az `array_key_exists()` kizárólag azt vizsgálja, hogy a kulcs létezik-e a tömbben.
:::

---

## `usort()` – egyedi rendezés

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

## Tipikus hibák tömbműveleteknél

:::info Tipikus hibák
- `unset()` után az indexek nem rendeződnek újra
- `array_filter()` megőrzi az eredeti indexeket
- `array_map()` mindig új tömböt ad vissza
- `sort()` felülírja az eredeti kulcsokat
- `in_array()` alapértelmezés szerint laza összehasonlítást használ
- üres bemeneti szöveg esetén az `explode()` egy üres elemet tartalmazó tömböt ad
- az `implode()` az elválasztót és a tömböt kapja meg, és szöveget ad vissza
- `array_merge()` számozott indexek esetén újraindexeli a tömböt
- azonos kulcs esetén az `array_merge()` a későbbi értéket tartja meg
- `array_unique()` eltávolítja a duplikációkat, de megtartja az eredeti indexeket
- `array_values()` újraindexeli a tömböt
- az `isset()` és az `array_key_exists()` nem ugyanaz
:::

---

## Gyakorlófeladatok

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

**9. Távolítsd el a duplikált elemeket egy tömbből.**

<details>
<summary>Megoldás</summary>

```php
$numbers = [1, 2, 2, 3, 3, 4];

$result = array_unique($numbers);

print_r($result);
```

</details>

---

**10. Fordítsd meg egy tömb elemeinek sorrendjét.**

<details>
<summary>Megoldás</summary>

```php
$letters = ["A", "B", "C", "D"];

$result = array_reverse($letters);

print_r($result);
```

</details>

---

**11. Listázd ki egy asszociatív tömb kulcsait.**

<details>
<summary>Megoldás</summary>

```php
$user = [
    "name" => "Anna",
    "age" => 25,
    "city" => "Budapest"
];

print_r(array_keys($user));
```

</details>

---

**12. Vizsgáld meg, hogy létezik-e egy adott kulcs egy tömbben.**

<details>
<summary>Megoldás</summary>

```php
$user = [
    "name" => "Anna",
    "age" => 25
];

if (array_key_exists("age", $user)) {
    echo "Key exists!";
}
```

</details>

---

**13. Egyesíts két tömböt.**
<details>
<summary>Megoldás</summary>

```php
$first = ["apple", "pear"];
$second = ["plum", "banana"];

$result = array_merge($first, $second);

print_r($result);
```

</details>

---

**14. Írd ki egy tömb legnagyobb és legkisebb elemét (`max`, `min`).**
<details>
<summary>Megoldás</summary>

```php
$numbers = [10, 5, 20];

echo max($numbers);
echo min($numbers);
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a tömbfüggvények teljes listájának: `php array functions`.
- Lásd még: tömbök rendezése egyedi feltételek alapján (`usort()`), tömbök szűrése (`array_filter()`), tömbök módosítása (`array_map()`), tömbök összegzése (`array_reduce()`).