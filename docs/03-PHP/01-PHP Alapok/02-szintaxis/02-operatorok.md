---
id: operatorok
slug: /php-alapok/operatorok
title: "Operátorok"
---

# Operátorok

Az operátorok műveleteket végeznek változókon vagy értékeken.

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
$a == $b   // egyenlő
$a != $b   // nem egyenlő
$a > $b    // nagyobb
$a < $b    // kisebb
$a >= $b   // nagyobb vagy egyenlő
$a <= $b   // kisebb vagy egyenlő
```

---

# Logikai operátorok

```php
&&   // ÉS
||   // VAGY
!    // NEM
```

Példa:

```php
$kor = 18;

if ($kor >= 18 && $kor <= 65) {
  echo "Felnőtt";
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

# Gyakorlófeladatok

1. Írj programot, amely két számot összead, kivon, szoroz és oszt.
2. Készíts egy változót, amely egy életkort tárol. Írd ki, hogy a személy kiskorú vagy nagykorú.
3. Írj programot, amely eldönti, hogy egy szám páros vagy páratlan.

---

## Megjegyzés

- Érdemes utánanézni a „strict comparison” (`===`, `!==`) működésének.
- Lásd még: típuskonverziók PHP-ben.
