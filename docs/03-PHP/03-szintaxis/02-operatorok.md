---
id: operatorok
slug: /php/szintaxis/operatorok
title: "Operátorok"
---

# Operátorok

Az operátorok műveleteket végeznek változókon vagy értékeken.  
A PHP sokféle operátort támogat, amelyekkel számolhatunk, összehasonlíthatunk, logikai műveleteket végezhetünk, vagy módosíthatjuk a változók értékét.

---

# Aritmetikai operátorok

```php
$a = 10;
$b = 3;

echo $a + $b; // 13
echo $a - $b; // 7
echo $a * $b; // 30
echo $a / $b; // 3.333...
echo $a % $b; // 1 (maradék)
```

---

# Összehasonlító operátorok

```php
$a == $b   // egyenlő (érték alapján)
$a != $b   // nem egyenlő
$a > $b    // nagyobb
$a < $b    // kisebb
$a >= $b   // nagyobb vagy egyenlő
$a <= $b   // kisebb vagy egyenlő
```

---

## Strict comparison operátorok

A PHP gyengén típusos, ezért az `==` csak az értéket hasonlítja össze, a típust nem.

A `===` és `!==` **értéket és típust is** összehasonlít.

```php
$number = 5;
$text = "5";

var_dump($number == $text);  // true
var_dump($number === $text); // false
```

Ez sok hibát előz meg, ezért érdemes mindig `===`‑t használni.

---

# Logikai operátorok

```php
&&   // ÉS
||   // VAGY
!    // NEM
xor  // KIZÁRÓ VAGY (pontosan az egyik igaz)
```

### Példa

```php
$age = 18;

if ($age >= 18 && $age <= 65) {
    echo "Adult";
}
```

### XOR példa

```php
$isMember = true;
$hasCoupon = true;

if ($isMember xor $hasCoupon) {
    echo "Discount applies";
} else {
    echo "No discount";
}
```

---

# Értékadó operátorok

```php
$x = 5;
$x += 3; // 8
$x -= 2; // 6
$x *= 4; // 24
$x /= 3; // 8
```

---

# Növelés és csökkentés

```php
$i = 0;
$i++; // 1
$i--; // 0
```

### Pre‑ és post‑inkrementálás

```php
$i = 5;

echo ++$i; // 6 (előbb növel, aztán kiír)
echo $i++; // 6 (előbb kiír, aztán növel)
```

---

# String operátorok

### Összefűzés

```php
$text = "Hello";
$text .= " World"; // Hello World
```

---

# Ternary operátor

Rövid feltételes kifejezés:

```php
$age = 20;
$message = ($age >= 18) ? "Adult" : "Minor";
```

---

# Null coalescing operátor (`??`)

Ha a bal oldali érték nem létezik vagy null, a jobb oldali kerül felhasználásra.

```php
$name = $_GET["name"] ?? "Guest";
```

Ez különösen hasznos lesz az űrlapkezelés fejezetben.

---

# Gyakorlófeladatok

1. Írj programot, amely két számot összead, kivon, szoroz és oszt.
2. Készíts egy változót, amely egy életkort tárol. Írd ki, hogy a személy kiskorú vagy nagykorú.
3. Írj programot, amely eldönti, hogy egy szám páros vagy páratlan.
4. Írj programot, amely egy változó értékét növeli és csökkenti.
5. Készíts egy rövid feltételt ternary operátorral.

---

