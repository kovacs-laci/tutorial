---
id: tombmuveletek
slug: /php-alapok/tombmuveletek
title: "Tömbműveletek"
---

# Tömbműveletek

A PHP rengeteg beépített függvényt kínál tömbök kezelésére.  
Nézzük a legfontosabbakat.

---

# `count()` – elemszám

```php
$szamok = [1, 2, 3, 4];
echo count($szamok); // 4
```

---

# `array_push()` – elem hozzáadása

```php
$gyumolcsok = ["alma", "körte"];
array_push($gyumolcsok, "szilva");
```

---

# `array_pop()` – utolsó elem eltávolítása

```php
$szamok = [1, 2, 3];
array_pop($szamok); // 3 eltávolítva
```

---

# `unset()` – elem törlése

```php
$szamok = [10, 20, 30];
unset($szamok[1]); // 20 törölve
```

---

# `implode()` – tömb → szöveg

```php
$nevek = ["Anna", "Béla", "Csaba"];
echo implode(", ", $nevek);
// Anna, Béla, Csaba
```

---

# `explode()` – szöveg → tömb

```php
$szoveg = "piros;kék;zöld";
$szinek = explode(";", $szoveg);
```

---

# Rendezés

## `sort()` – növekvő sorrend

```php
$szamok = [4, 1, 3];
sort($szamok); // [1, 3, 4]
```

## `rsort()` – csökkenő sorrend

```php
rsort($szamok);
```

---

# Gyakorlófeladatok

1. Készíts egy tömböt 5 névvel, majd rendezd őket ábécé szerint.
2. Alakíts át egy mondatot tömbbé `explode()` segítségével.
3. Fűzd össze egy tömb elemeit vesszővel elválasztva.
4. Törölj egy elemet egy tömbből, majd írd ki a maradékot.

---

## Megjegyzés

- Érdemes utánanézni a tömbfüggvények teljes listájának: `php array functions`.
- Lásd még: tömbök rendezése egyedi feltételek alapján (`usort()`).
