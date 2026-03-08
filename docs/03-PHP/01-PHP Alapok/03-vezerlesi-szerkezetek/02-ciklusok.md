---
id: ciklusok
slug: /php-alapok/ciklusok
title: "Ciklusok"
---

# Ciklusok

A ciklusok ismétlődő műveletek végrehajtására szolgálnak.

---

# `for` ciklus

Akkor használjuk, ha tudjuk, hányszor kell ismételni.

```php
for ($i = 1; $i <= 5; $i++) {
    echo $i . "<br>";
}
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

---

# `foreach` ciklus

Tömbök bejárására használjuk.

```php
$nevek = ["Anna", "Béla", "Csaba"];

foreach ($nevek as $nev) {
    echo $nev . "<br>";
}
```

Asszociatív tömb esetén:

```php
$tanulo = [
    "nev" => "Kata",
    "kor" => 16
];

foreach ($tanulo as $kulcs => $ertek) {
    echo "$kulcs: $ertek<br>";
}
```

---

# Ciklus megszakítása

## `break`

```php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) break;
    echo $i . "<br>";
}
```

## `continue`

```php
for ($i = 1; $i <= 5; $i++) {
    if ($i == 3) continue;
    echo $i . "<br>";
}
```

---

# Gyakorlófeladatok

1. Írj programot, amely kiírja az első 10 természetes számot.
2. Készíts programot, amely kiírja egy tömb elemeit.
3. Írj programot, amely 1-től 100-ig kiírja a páros számokat.
4. Készíts programot, amely egy asszociatív tömb kulcsait és értékeit jeleníti meg.

---

## Megjegyzés

- Érdemes utánanézni a ciklusok időbeli hatékonyságának (Big O).
- Lásd még: iterátorok, generátorok PHP-ben.
