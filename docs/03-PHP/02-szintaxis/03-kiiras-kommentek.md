---
id: kiiras-kommentek
slug: /php/szintaxis/kiiras-kommentek
title: "Kiírás és kommentek"
---

# Kiírás és kommentek

A PHP-ban többféleképpen írhatunk ki szöveget, és többféleképpen kommentelhetünk.  
Ez az egyik legalapvetőbb szintaxis, amelyet minden PHP fájlban használni fogsz.

---

# Kiírás

## `echo`

Az `echo` a leggyakrabban használt kiíró utasítás.

```php
echo "Hello!";
```

### Több érték kiírása egyszerre

```php
echo "Hello ", "World";
```

---

## `print`

A `print` hasonló az `echo`-hoz, de:

- csak **egy** értéket tud kiírni,
- **visszaad egy értéket (`1`)**, ezért kifejezésekben is használható.

### Példa a visszatérési értékre

```php
$result = print("Hello!");  // kiírja: Hello!

echo $result;               // kiírja: 1
```

### Miért nem használjuk a gyakorlatban?

A `print` visszatérési értéke **mindig 1**, ezért:

- nem jelzi hibát,
- nem jelzi sikertelenséget,
- nem hordoz információt.

Ezért a modern PHP-ban az `echo` a preferált kiírási mód.

---

## `echo()` zárójelekkel

Nem ajánlott, de érvényes szintaxis:

```php
echo("Hello!");
```

---

## Rövid echo tag: `<?= ?>`

HTML-ben nagyon gyakori, modern szintaxis:

```php
<h1><?= $title ?></h1>
```

Ez valójában:

```php
<?php echo $title; ?>
```

---

## HTML + PHP együtt

```php
<h1>Üdv!</h1>

<?php
echo "<p>Ez egy bekezdés.</p>";
?>
```

---

## HTML escaping (nagyon fontos!)

Ha felhasználói adatot írsz ki, mindig érdemes használni:

```php
echo htmlspecialchars($name);
```

:::info XSS – miért fontos az escaping?
Az **XSS (Cross‑Site Scripting)** egy olyan támadás, ahol a támadó rosszindulatú JavaScript kódot juttat be az oldalba.  
Ha a felhasználó például ezt írja be:

```
<script>alert('Hacked!');</script>
```

és te így írod ki:

```php
echo $name;
```

akkor a böngésző **lefuttatja** a kódot.

A `htmlspecialchars()` ártalmatlan szöveggé alakítja:

- `<` → `&lt;`
- `>` → `&gt;`

Így a kód **nem fut le**, csak megjelenik.  
Ez a PHP-ban az XSS elleni alapvédelem.
:::

---

# Kommentek

## Egysoros komment

```php
// Ez egy komment
```

## Többsoros komment

```php
/*
Ez egy
többsoros komment
*/
```

## Inline komment (soron belül)

```php
$age = 20; // user's age
```

---

## PHPDoc komment (haladóbb, de jó ha látod)

Később függvényeknél és osztályoknál hasznos lesz:

```php
/**
 * Calculates the final price.
 */
```

---

# Kommentelési konvenciók

A jó komment:

- **nem** írja le a nyilvánvalót,
- a **miértet** magyarázza, nem a mit,
- **angolul** íródik,
- segíti a kód olvashatóságát.

### Jó példa

```php
// Calculate final price with discount
$finalPrice = $price * 0.9;
```

### Rossz példa

```php
// Set price
$price = 100;
```

---

# HEREDOC rövid példa

A több soros kiírás tiszta módja:

```php
echo <<<TEXT
Hello
World
TEXT;
```

---

# Gyakorlófeladatok

1. Írj ki három különböző mondatot `echo` segítségével.
2. Készíts HTML oldalt, amelyben PHP-val generálsz egy listát.
3. Írj programot, amelyben legalább három kommentet használsz.
4. Írj ki egy felhasználói adatot `htmlspecialchars()` segítségével.
5. Használj rövid echo taget (`<?= ?>`) egy HTML címben.

---

## Megjegyzés

- Érdemes utánanézni a heredoc és nowdoc szintaxisnak.
- Lásd még: HTML escaping, XSS alapok.

---