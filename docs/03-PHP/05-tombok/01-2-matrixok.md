---
id: ketdimenzios-matrixok
slug: /php/tombok/ketdimenzios-matrixok
title: "Kétdimenziós mátrixok és bejárásuk"
sidebar_label: "Kétdimenziós mátrixok"
---

# Kétdimenziós mátrixok

A kétdimenziós tömb (mátrix) olyan tömb, amelynek **minden eleme egy újabb tömb**.  
Leggyakrabban táblázatok, rácsok, játékmezők, vagy matematikai mátrixok reprezentálására használjuk.

```php
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
```

Ez egy **3×3-as mátrix**, ahol:

- 3 sor van,
- minden sorban 3 oszlop.

---

# Mátrix létrehozása dinamikusan

Gyakori feladat, hogy a mátrixot nem kézzel írjuk, hanem **programból generáljuk**.

## 2×5-ös mátrix generálása

```php
$matrix = [];
$index = 1;

for ($row = 0; $row < 2; $row++) {
    for ($col = 0; $col < 5; $col++) {
        $matrix[$row][$col] = $index++;
    }
}
```

Eredmény:

```
[
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
]
```

---

# Mátrix bejárása

A mátrix bejárásához **két egymásba ágyazott ciklus** kell:

- külső ciklus → sorok
- belső ciklus → oszlopok

## Bejárás két `for` ciklussal

```php
for ($row = 0; $row < count($matrix); $row++) {
    for ($col = 0; $col < count($matrix[$row]); $col++) {
        echo $matrix[$row][$col] . " ";
    }
    echo PHP_EOL;
}
```

Kimenet:

```
1 2 3 4 5
6 7 8 9 10
```

---

# Bejárás `foreach` segítségével

A `foreach` sokkal olvashatóbb:

```php
foreach ($matrix as $row) {
    foreach ($row as $value) {
        echo $value . " ";
    }
    echo PHP_EOL;
}
```

---

# Mátrix mérete

A mátrix sorainak száma:

```php
$rows = count($matrix);
```

Az első sor oszlopainak száma:

```php
$cols = count($matrix[0]);
```

---

# Mátrix műveletek

## Sorok összege

```php
foreach ($matrix as $row) {
    $sum = array_sum($row);
    echo "Sor összege: $sum" . PHP_EOL;
}
```
**Egymásba ágyazott ciklusokkal:**

```php
foreach ($matrix as $i => $row) {
    $sum = 0;
    // Sor elemeinek összeadása kézzel
    foreach ($row as $value) {
        $sum += $value;
    }

    echo "Sor $i összege: $sum" . PHP_EOL;
}

```
## Mátrix transzponálása (oszlopok ↔ sorok)

A **transzponálás** azt jelenti, hogy a mátrix **sorait és oszlopait felcseréljük**.

Másképp:

- ami eddig **sor** volt → az transzponálás után **oszlop** lesz,
- ami eddig **oszlop** volt → az transzponálás után **sor** lesz.

Ez egy *tükrözés* a főátló mentén.

---

# Példa

Eredeti mátrix:

```
1 2 3
4 5 6
```

Transzponált mátrix:

```
1 4
2 5
3 6
```

```php
$transposed = [];

for ($i = 0; $i < count($matrix[0]); $i++) {
    for ($j = 0; $j < count($matrix); $j++) {
        $transposed[$i][$j] = $matrix[$j][$i];
    }
}
```

---

# Gyakorló feladat

**Feladat:**  
Hozz létre egy 3×3-as mátrixot véletlen számokkal 1 és 99 között, majd írd ki:

1. a mátrixot,
2. minden sor összegét,
3. minden oszlop összegét.

A megoldás két tabon jelenik meg:

---

## 🟦 PHP megoldás

<details>
<summary>Kattints a megnyitáshoz</summary>

```php
// 3x3 mátrix generálása
$matrix = [];
for ($i = 0; $i < 3; $i++) {
    for ($j = 0; $j < 3; $j++) {
        $matrix[$i][$j] = rand(1, 99);
    }
}

// Mátrix kiírása
foreach ($matrix as $row) {
    echo implode(" ", $row) . PHP_EOL;
}

// Sorok összege
foreach ($matrix as $i => $row) {
    echo "Sor $i összege: " . array_sum($row) . PHP_EOL;
}

// Oszlopok összege
for ($col = 0; $col < 3; $col++) {
    $sum = 0;
    for ($row = 0; $row < 3; $row++) {
        $sum += $matrix[$row][$col];
    }
    echo "Oszlop $col összege: $sum" . PHP_EOL;
}
```

</details>

---

## 🟩 HTML táblázatos megoldás

<details>
<summary>Kattints a megnyitáshoz</summary>

```php
// 3x3 mátrix generálása
$matrix = [];
for ($i = 0; $i < 3; $i++) {
    for ($j = 0; $j < 3; $j++) {
        $matrix[$i][$j] = rand(1, 99);
    }
}
?>

<table border="1" cellpadding="8" style="border-collapse: collapse;">
    <?php foreach ($matrix as $row): ?>
        <tr>
            <?php foreach ($row as $value): ?>
                <td><?= $value ?></td>
            <?php endforeach; ?>
        </tr>
    <?php endforeach; ?>
</table>

<?php
// Sorok összege
foreach ($matrix as $i => $row) {
    echo "Sor $i összege: " . array_sum($row) . "<br>";
}

// Oszlopok összege
for ($col = 0; $col < 3; $col++) {
    $sum = 0;
    for ($row = 0; $row < 3; $row++) {
        $sum += $matrix[$row][$col];
    }
    echo "Oszlop $col összege: $sum<br>";
}
```

</details>

---

# Összefoglalás

- A kétdimenziós tömb egy tömb, amely tömböket tartalmaz.  
- Mátrixot legegyszerűbben két egymásba ágyazott ciklussal generálunk.  
- A bejárás történhet `for` vagy `foreach` ciklusokkal.  
- A mátrix mérete: `count($matrix)` és `count($matrix[0])`.  
- Tipikus műveletek: sorösszeg, oszlopösszeg, transzponálás.  
- A gyakorló feladat most két tabon mutatja be a megoldást: **PHP** és **HTML**.
