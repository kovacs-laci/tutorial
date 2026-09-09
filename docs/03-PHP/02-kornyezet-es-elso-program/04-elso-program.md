---
id: elso-program
slug: /php/kornyezet-es-elso-program/elso-program
title: "Az első PHP program"
---

# Az első PHP program

Ebben a fejezetben elkészíted az első működő PHP‑oldaladat.  
A PHP a szerveren fut, és a böngésző csak a generált HTML‑t jeleníti meg.

---

## 1. Hozz létre egy fájlt

A projekt mappájában hozz létre egy `index.php` nevű fájlt.

---

## 2. Írd bele a következő kódot

```php
<?php
echo "Hello, world!";
?>
```

### Magyarázat

- A PHP‑kódot a `<?php ... ?>` blokkon belül írjuk.
- Az `echo` utasítás kiírja a szöveget.
- A böngészőben csak a kiírt HTML jelenik meg.

---

## 3. Nyisd meg böngészőben

Ha XAMPP‑ot használsz, és a projekted neve `teszt`, akkor így éred el:

```
http://localhost/teszt/
```

A böngészőben ez jelenik meg:

```
Hello, world!
```

---

# PHP tagek

A PHP‑kódot mindig a következő jelölések közé írjuk:

```php
<?php
// PHP code goes here
?>
```

---

# HTML és PHP együtt – működik, de nem jó gyakorlat

A PHP és HTML keverése ugyan működik, de nehezen karbantartható, átláthatatlan kódot eredményez.

### Példa (nem ajánlott)

```php
<h1>Welcome!</h1>

<?php
$name = "Laszlo";
echo "<p>Hello, $name!</p>";
?>
```

### Miért nem jó?

- a megjelenítés és a logika összekeveredik,
- nehéz átlátni, hol kezdődik a HTML és hol a PHP,
- bővítéskor könnyen hibák jelennek meg.

---

# Ajánlott megoldás: HEREDOC

A HEREDOC segítségével a HTML egyben marad, a PHP pedig nem töri szét a struktúrát.

### Példa (ajánlott)

```php
<?php
$name = "Laszlo";

$html = <<<HTML
<h1>Welcome!</h1>
<p>Hello, $name!</p>
HTML;

echo $html;
?>
```

### Miért jobb?

- a HTML egyben marad,
- a PHP‑logika elkülönül,
- könnyebb olvasni és módosítani.

---

## Gyakorlófeladatok

1. Írd ki a nevedet egy változó segítségével.
2. Készíts egy HTML oldalt, amelyben a PHP kiírja az aktuális évszámot.
3. Írj egy programot, amely két számot összead, és kiírja az eredményt.

---

# Mini projekt – „Névjegy oldal”

Készíts egy oldalt, amely:

- tartalmaz HTML fejlécet,
- PHP‑val kiírja:
  - a nevedet,
  - az életkorodat,
  - a kedvenc tantárgyadat,
- megjelenít egy üdvözlő üzenetet:  
  **"Welcome to my profile page!"**

### Példa megoldás

```php
<h1>Profile</h1>

<?php
$name = "John Doe";
$age = 17;
$favoriteSubject = "Computer Science";

echo "<p>Name: $name</p>";
echo "<p>Age: $age</p>";
echo "<p>Favorite subject: $favoriteSubject</p>";
?>
```

---

## További HEREDOC példák

### Egyszerű bekezdés

```php
<?php
$name = "Laszlo";

$html = <<<HTML
<p>Hello, $name!</p>
HTML;

echo $html;
?>
```

### Több HTML elem egyben

```php
<?php
$title = "Profile";
$name = "John Doe";

$html = <<<HTML
<h1>$title</h1>
<p>Name: $name</p>
HTML;

echo $html;
?>
```

### Lista generálása változókból

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

$listItems = "";
foreach ($fruits as $fruit) {
    $listItems .= "<li>$fruit</li>";
}

$html = <<<HTML
<h2>Fruit list</h2>
<ul>
    $listItems
</ul>
HTML;

echo $html;
?>
```

---
