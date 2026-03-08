---
id: scope
slug: /php-alapok/scope
title: "Változók hatóköre (scope)"
---

# Változók hatóköre (scope)

A „scope” azt jelenti, hogy egy változó **hol érhető el** a programban.

---

# Lokális változó

A függvényen belül létrehozott változó csak ott érhető el.

```php
function pelda() {
    $x = 10;
    echo $x;
}

pelda();
// echo $x; // HIBA!
```

---

# Globális változó

A függvényen kívül létrehozott változó nem érhető el automatikusan a függvényben.

```php
$szam = 5;

function mutat() {
    echo $szam; // HIBA!
}
```

A `global` kulcsszóval elérhetővé tehetjük:

```php
$szam = 5;

function mutat() {
    global $szam;
    echo $szam;
}
```

---

# `$_GLOBALS` tömb

Alternatív megoldás:

```php
$szam = 10;

function kiir() {
    echo $GLOBALS["szam"];
}
```

---

# Statikus változó

A statikus változó megőrzi az értékét a függvényhívások között.

```php
function szamlalo() {
    static $i = 0;
    $i++;
    echo $i . "<br>";
}

szamlalo(); // 1
szamlalo(); // 2
szamlalo(); // 3
```

---

# Gyakorlófeladatok

1. Hozz létre egy függvényt, amelyben lokális változót használsz.
2. Készíts példát globális változó használatára.
3. Írj függvényt, amely statikus változóval számolja a hívások számát.
4. Készíts programot, amely `$_GLOBALS` segítségével ér el egy változót.

---

## Megjegyzés

- Érdemes utánanézni a változók élettartamának és memóriahasználatának.
- Lásd még: függvények paraméterátadása érték szerint és referencia szerint.
