---
id: valtozok-tipusok
slug: /php-alapok/valtozok-tipusok
title: "Változók és típusok"
---

# Változók és típusok

A változók olyan „dobozok”, amelyekben adatot tárolunk.  
PHP-ben minden változó **$ jellel** kezdődik.

```php
$nev = "László";
$kor = 17;
```

## Alapvető típusok

### Szöveg (string)

```php
$szoveg = "Hello!";
```

### Egész szám (integer)

```php
$eletkor = 20;
```

### Lebegőpontos szám (float)

```php
$atlag = 4.57;
```

### Logikai érték (boolean)

```php
$aktiv = true;
$diak = false;
```

### Tömb (array)

```php
$szamok = [1, 2, 3];
```

### Asszociatív tömb

```php
$tanulo = [
  "nev" => "Kata",
  "kor" => 16
];
```

---

# Változók kiírása

```php
$nev = "László";
echo $nev;
```

---

# Változók összefűzése

### Dupla idézőjel (változóérték megjelenik)

```php
$nev = "László";
echo "Szia, $nev!";
```

### Pont operátor (összefűzés)

```php
$nev = "László";
echo "Szia, " . $nev . "!";
```

---

# Gyakorlófeladatok

1. Hozz létre három változót: név, életkor, kedvenc tantárgy. Írd ki őket.
2. Készíts egy változót, amely egy mondatot tartalmaz, és jelenítsd meg.
3. Hozz létre egy asszociatív tömböt egy tanulóról (név, életkor, osztály). Írd ki az adatokat.

---

## Megjegyzés

- Érdemes utánanézni a PHP típuskezelésének (weak typing).
- Lásd még: `var_dump()`, `print_r()`.
