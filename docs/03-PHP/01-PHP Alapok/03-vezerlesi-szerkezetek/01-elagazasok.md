---
id: elagazasok
slug: /php-alapok/elagazasok
title: "Elágazások"
---

# Elágazások

Az elágazások segítségével a program különböző utasításokat hajt végre attól függően, hogy egy feltétel igaz vagy hamis.

---

# `if` szerkezet

```php
$kor = 18;

if ($kor >= 18) {
    echo "Nagykorú";
}
```

---

# `if – else`

```php
$jegy = 4;

if ($jegy >= 5) {
    echo "Jeles";
} else {
    echo "Nem jeles";
}
```

---

# `if – elseif – else`

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

# `switch`

A `switch` akkor hasznos, ha sok különböző értéket kell vizsgálni.

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

# Feltételek kombinálása

```php
$kor = 20;
$diak = true;

if ($kor < 25 && $diak) {
    echo "Diák kedvezmény jár";
}
```

---

# Gyakorlófeladatok

1. Írj programot, amely eldönti, hogy egy szám pozitív, negatív vagy nulla.
2. Készíts programot, amely a pontszám alapján kiírja az érdemjegyet.
3. Írj programot, amely eldönti, hogy valaki jogosult‑e kedvezményre (kor < 18 vagy diák).
4. Készíts `switch