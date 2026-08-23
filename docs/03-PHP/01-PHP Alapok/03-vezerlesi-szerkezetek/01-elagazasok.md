---
id: elagazasok
slug: /php-alapok/elagazasok
title: "Elágazások"
sidebar_label: "Elágazások"
---

# Elágazások

Az elágazások segítségével a program különböző utasításokat hajt végre attól függően, hogy egy feltétel igaz vagy hamis.  
A PHP többféle elágazási szerkezetet támogat: `if`, `elseif`, `else`, `switch`, `match`.

---

# Alap if szerkezet

```php
$kor = 18;

if ($kor >= 18) {
    echo "Nagykorú";
}
```

---

# if – else

```php
$jegy = 4;

if ($jegy >= 5) {
    echo "Jeles";
} else {
    echo "Nem jeles";
}
```

## If/Else formázás – PHP Coding Standard (PSR‑12)

A PSR‑12 szerint az `else` és `elseif` **ugyanazon a soron kezdődik**, ahol az előző blokk záró kapcsos zárójele (`}`) található.

### Ajánlott (PSR‑12 kompatibilis)

```php
if ($jegy >= 5) {
    echo "Jeles";
} else {
    echo "Nem jeles";
}
```

### Nem ajánlott (régi stílus)

```php
if ($jegy >= 5) {
    echo "Jeles";
}
else {
    echo "Nem jeles";
}
```

---

# if – elseif – else

```php
$jegy = 3;

if ($jegy == 5) {
    echo "Jeles";
} elseif ($jegy == 4) {
    echo "Jó";
} elseif ($jegy == 3) {
    echo "Közepes";
} else {
    echo "Egyéb";
}
```

---

# Switch

A switch **laza összehasonlítást** használ (==), ezért `"5"` és `5` azonosnak számít.

```php
$nap = 3;

switch ($nap) {
    case 1:
        echo "Hétfő";
        break;
    case 2:
        echo "Kedd";
        break;
    case 3:
        echo "Szerda";
        break;
    default:
        echo "Ismeretlen nap";
}
```

---

# Logikai kapcsolatok

### AND (&&)

```php
$kor = 20;
$diak = true;

if ($kor < 25 && $diak) {
    echo "Diák kedvezmény jár";
}
```

### OR (||)

```php
$kor = 16;
$diak = false;

if ($kor < 18 || $diak) {
    echo "Kedvezmény jár";
}
```

### XOR – kizáró vagy

```php
$a = true;
$b = false;

if ($a xor $b) {
    echo "Pontosan az egyik igaz";
}
```

---

# Match – modern elágazás (PHP 8+)

A `match` tömörebb, biztonságosabb és **szigorú összehasonlítást** használ (===).  
Minden esetet le kell fedni.

```php
$jegy = 4;

$szoveg = match ($jegy) {
    5 => "Jeles",
    4 => "Jó",
    3 => "Közepes",
    2 => "Elégséges",
    1 => "Elégtelen",
    default => "Ismeretlen jegy",
};

echo $szoveg;
```

### Match összetett feltételekkel

```php
$kor = 20;

$kategoria = match (true) {
    $kor < 14 => "Gyerek",
    $kor < 18 => "Fiatal",
    $kor < 65 => "Felnőtt",
    default => "Nyugdíjas",
};

echo $kategoria;
```

---

# Truthy és falsy értékek

Az `if` bármilyen értéket elfogad, amit a PHP automatikusan logikai értékké alakít.

**Falsy értékek:**

- `0`
- `"0"`
- `""`
- `null`
- `[]`
- `false`

Minden más **truthy**.

```php
$name = "";

if ($name) {
    echo "Van név";
} else {
    echo "Nincs név";
}
```

---

# Miért kerüljük a hosszú if–elseif láncokat?

A hosszú elágazások növelik a **cyclomatic complexity** értéket:  
minél több ág, annál nehezebb olvasni, tesztelni és karbantartani.

### Rossz példa

```php
if ($role === "admin") {
    ...
} elseif ($role === "editor") {
    ...
} elseif ($role === "user") {
    ...
} elseif ($role === "guest") {
    ...
} else {
    ...
}
```

---

# Early return – modern szemlélet

A feltételeket **előre** ellenőrizzük, és ha nem teljesülnek, **kilépünk**.

```php
function checkAge($age) {
    if ($age < 0) {
        return "Érvénytelen";
    }

    if ($age < 18) {
        return "Kiskorú";
    }

    if ($age < 65) {
        return "Felnőtt";
    }

    return "Idős";
}
```

Ez csökkenti a cyclomatic complexity‑t és olvashatóbbá teszi a kódot.

---

# Mapping – a legszebb megoldás egyszerű elágazásokra

```php
$roles = [
    "admin"  => "Admin",
    "editor" => "Editor",
    "user"   => "User",
    "guest"  => "Guest",
];

echo $roles[$role] ?? "Unknown role";
```

Cyclomatic complexity: **0**.

---

# Match vs switch – rövid összehasonlítás

| Tulajdonság | switch | match |
|------------|--------|--------|
| break szükséges | igen | nem |
| visszaad értéket | nem | igen |
| összehasonlítás | laza (==) | szigorú (===) |
| minden esetet le kell fedni | nem | igen |
| modern PHP | közepesen | igen (PHP 8+) |

---

# `return`, `exit`, `die`, `break` – mikor melyiket?

## `return`
- függvényből lép ki
- visszaad egy értéket
- a script fut tovább

## `exit`
- a teljes script futását leállítja
- üzenetet is kiírhat

## `die`
- alias az `exit`-re
- ugyanazt csinálja

## `break`
- ciklusból vagy switch-ből lép ki
- nem állítja le a scriptet
- nem lép ki függvényből

---

# Info blokk – tipikus hibák

:::info Tipikus hibák elágazásoknál
- elfelejtett kapcsos zárójelek
- túl hosszú if–elseif láncok
- switch-ben hiányzó `break`
- `"0"` falsy → if nem fut le
- `=` használata `==` helyett
- hibás feltételek nem korai ellenőrzése
- `exit`/`die` túlzott használata
- PSR‑12 formázás figyelmen kívül hagyása  
  :::

---

# Gyakorlófeladatok

1. Írj programot, amely eldönti, hogy egy szám pozitív, negatív vagy nulla.
2. Készíts programot, amely pontszám alapján kiírja az érdemjegyet.
3. Írj programot, amely eldönti, hogy valaki jogosult-e kedvezményre (kor < 18 vagy diák).
4. Készíts példát, amely XOR‑ral dönt el egy kizárólagos feltételt.
5. Írj egy match alapú elágazást, amely életkor alapján kategóriát ad vissza.
6. Írj példát early return használatára.
7. Írj példát mapping alapú elágazásra.
8. Írd meg ugyanazt a logikát switch‑csel és match‑csel is.

---