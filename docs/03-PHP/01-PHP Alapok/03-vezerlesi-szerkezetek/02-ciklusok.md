---
id: ciklusok
slug: /php-alapok/ciklusok
title: "Ciklusok"
---

# Ciklusok

A ciklusok ismétlődő műveletek végrehajtására szolgálnak.  
A PHP négy alap ciklusszerkezetet támogat: `for`, `while`, `do–while`, `foreach`.

---

# `for` ciklus

Akkor használjuk, ha **előre tudjuk**, hányszor kell ismételni.

```php
for ($i = 1; $i <= 5; $i++) {
    echo $i . "<br>";
}
```

**Output:**
```
1
2
3
4
5
```

---

## Lépésköz (step) megadása

```php
for ($i = 0; $i <= 10; $i += 2) {
    echo $i . "<br>";
}
```

**Output:**
```
0
2
4
6
8
10
```

---

## Visszafelé haladó ciklus

```php
for ($i = 10; $i >= 1; $i--) {
    echo $i . "<br>";
}
```

**Output:**
```
10
9
8
7
6
5
4
3
2
1
```

---

## Tömb bejárása hátulról előre

```php
$names = ["Anna", "Bela", "Csaba"];

for ($i = count($names) - 1; $i >= 0; $i--) {
    echo $names[$i] . "<br>";
}
```

**Output:**
```
Csaba
Bela
Anna
```

---

# `while` ciklus

Akkor fut, amíg a feltétel igaz.

```php
$i = 1;

while ($i <= 5) {
    echo $i . "<br>";
    $i++;
}
```

**Output:**
```
1
2
3
4
5
```

### Végtelen ciklus veszélye

```php
while ($i <= 5) {
    echo $i;
    // ha az $i++ kimarad → végtelen ciklus
}
```

---

# `do – while`

Legalább egyszer lefut.

```php
$i = 1;

do {
    echo $i . "<br>";
    $i++;
} while ($i <= 5);
```

**Output:**
```
1
2
3
4
5
```

---

# `foreach` ciklus

Tömbök bejárására használjuk — ez a **modern, ajánlott** mód.

```php
$names = ["Anna", "Bela", "Csaba"];

foreach ($names as $name) {
    echo $name . "<br>";
}
```

**Output:**
```
Anna
Bela
Csaba
```

---

## Asszociatív tömb bejárása

```php
$student = [
    "name" => "Kate",
    "age" => 16
];

foreach ($student as $key => $value) {
    echo "$key: $value<br>";
}
```

**Output:**
```
name: Kate
age: 16
```

---

## Értékek módosítása referencia szerint

```php
$numbers = [1, 2, 3];

foreach ($numbers as &$n) {
    $n *= 2;
}

print_r($numbers);
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

# `break` és `continue`

## `break` – ciklus megszakítása

```php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) break;
    echo $i . "<br>";
}
```

**Output:**
```
1
2
3
4
```

---

## `continue` – ugrás a következő iterációra

```php
for ($i = 1; $i <= 5; $i++) {
    if ($i == 3) continue;
    echo $i . "<br>";
}
```

**Output:**
```
1
2
4
5
```

---

## Early continue – tisztább ciklusok

```php
for ($i = 1; $i <= 5; $i++) {
    if ($i % 2 == 0) continue;  // skip even numbers
    echo $i . "<br>";
}
```

**Output:**
```
1
3
5
```

---

# `for` vs `foreach` – mikor melyiket?

| Feladat | Ajánlott ciklus |
|--------|------------------|
| ismert lépésszám | `for` |
| tömb bejárása | `foreach` |
| indexre szükség van | `for` |
| értékek módosítása | `foreach` referencia szerint |

---

# Off-by-one hibák

```php
for ($i = 0; $i <= 5; $i++) {
    echo $i . " ";
}
```

**Output:**
```
0 1 2 3 4 5
```

```php
for ($i = 0; $i < 5; $i++) {
    echo $i . " ";
}
```

**Output:**
```
0 1 2 3 4
```

---

# Big O – nagyon röviden

```php
for (...) {
    ...
}
```

→ **O(n)**

```php
for (...) {
    for (...) {
        ...
    }
}
```

→ **O(n²)**

---

# Info blokk – tipikus hibák

:::info Tipikus hibák ciklusoknál
- off-by-one hibák (`<=` vs `<`)
- léptetés elfelejtése → végtelen ciklus
- tömb bejárása `for`-ral `foreach` helyett
- `continue` félreértése
- dupla ciklusok indokolatlan használata (O(n²))
- referencia szerinti foreach hibás használata
  :::

---

# Gyakorlófeladatok

1. Írd ki az első 10 természetes számot.
2. Írd ki egy tömb elemeit `foreach`-csel.
3. Írd ki 1-től 100-ig a páros számokat.
4. Írd ki egy asszociatív tömb kulcsait és értékeit.
5. Írj programot, amely 1–100 között kiírja a 3-mal osztható számokat.
6. Írj programot, amely egy tömb minden elemét megduplázza.
7. Írj példát `break` használatára.
8. Írj példát `continue` használatára.
9. Írj `for` ciklust lépésközzel.
10. Írj `for` ciklust, amely hátulról előre jár be egy tömböt.

---