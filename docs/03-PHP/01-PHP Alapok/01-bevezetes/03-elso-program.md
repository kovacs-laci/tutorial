---
id: elso-program
slug: /php-alapok/elso-program
title: "Az első PHP program"
sidebar_label: "Az első PHP program"
---

# Az első PHP program

Ebben a fejezetben elkészíted az első működő PHP‑oldaladat.  
A cél, hogy lásd: a PHP a szerveren fut, és a böngésző csak a generált HTML‑t jeleníti meg.

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

- A `<?php ... ?>` jelölés között írjuk a PHP‑kódot.
- Az `echo` utasítás kiírja a szöveget a böngészőben.
- A böngésző nem látja a PHP‑kódot, csak a kiírt eredményt.

---

## 3. Nyisd meg böngészőben

Ha XAMPP‑ot használsz, és a projekted neve `teszt`, akkor így éred el:

```
http://localhost/teszt/
```

Ha mindent jól csináltál, ezt látod:

```
Hello, world!
```

---

# PHP tagek

A PHP‑kódot mindig a következő tagek közé írjuk:

```php
<?php
// PHP code goes here
?>
```

A böngésző csak a PHP által generált HTML‑t jeleníti meg.

---

# HTML és PHP együtt – működik, de nem jó gyakorlat

A PHP és a HTML ugyanabban a fájlban is szerepelhet.  
Ez működik, és sok régi projektben találkozhatsz vele, de fontos tudni, hogy ez **nem jó gyakorlat**.

A HTML és PHP keverése gyorsan átláthatatlan, nehezen karbantartható kódot eredményez.  
Ezt hívják „spagetti kódnak”.

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
- nehéz megtalálni, hol kezdődik a HTML és hol a PHP,
- bővítéskor könnyen hibák jelennek meg,
- nagyobb projektekben teljesen kezelhetetlenné válik.

Ezért modern fejlesztésben **nem használjuk** ezt a megoldást.

---

# Ajánlott megoldás: HEREDOC

A HEREDOC lehetővé teszi, hogy a HTML egyben maradjon, a PHP pedig ne törje szét a struktúrát.  
Ez sokkal tisztább, mint a HTML és PHP keverése.

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
- a PHP‑logika nem keveredik a megjelenítéssel,
- könnyebb olvasni és módosítani,
- ez a szemlélet vezet a sablonmotorok (Blade, Twig) használatához.

A stringekkel és HTML‑generálással részletesen a **Stringek kezelése** fejezetben foglalkozunk.

---

## Gyakorlófeladatok

1. Írd ki a nevedet egy változó segítségével.
2. Készíts egy HTML oldalt, amelyben a PHP kiírja az aktuális évszámot.
3. Írj egy programot, amely két számot összead, és kiírja az eredményt.

---

# Mini projekt – „Névjegy oldal”

Készíts egy egyszerű oldalt, amely:

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

### Magyarázat

- A három változó különböző adatokat tárol.
- Az `echo` minden adatot HTML formában jelenít meg.
- A PHP‑val dinamikus tartalmat hozol létre, amely a változók értékétől függ.

---

Rendben, László — **beillesztettem a kért mondatot és a három HEREDOC‑os példát a fejezet végére**, közvetlenül a „Megjegyzés” rész után, teljesen egységes stílusban, díszítés nélkül, angol változónevekkel, és úgy, hogy a HTML+PHP keverés kerülése továbbra is világos marad.

A teljes, frissített **`elso-program.mdx`** fájl így néz ki:

---

```mdx
---
id: elso-program
slug: /php-alapok/elso-program
title: "Az első PHP program"
sidebar_label: "Az első PHP program"
---

# Az első PHP program

Ebben a fejezetben elkészíted az első működő PHP‑oldaladat.  
A cél, hogy lásd: a PHP a szerveren fut, és a böngésző csak a generált HTML‑t jeleníti meg.

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

- A `<?php ... ?>` jelölés között írjuk a PHP‑kódot.
- Az `echo` utasítás kiírja a szöveget a böngészőben.
- A böngésző nem látja a PHP‑kódot, csak a kiírt eredményt.

---

## 3. Nyisd meg böngészőben

Ha XAMPP‑ot használsz, és a projekted neve `teszt`, akkor így éred el:

```
http://localhost/teszt/
```

Ha mindent jól csináltál, ezt látod:

```
Hello, world!
```

---

# PHP tagek

A PHP‑kódot mindig a következő tagek közé írjuk:

```php
<?php
// PHP code goes here
?>
```

A böngésző csak a PHP által generált HTML‑t jeleníti meg.

---

# HTML és PHP együtt – működik, de nem jó gyakorlat

A PHP és a HTML ugyanabban a fájlban is szerepelhet.  
Ez működik, és sok régi projektben találkozhatsz vele, de fontos tudni, hogy ez **nem jó gyakorlat**.

A HTML és PHP keverése gyorsan átláthatatlan, nehezen karbantartható kódot eredményez.  
Ezt hívják „spagetti kódnak”.

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
- nehéz megtalálni, hol kezdődik a HTML és hol a PHP,
- bővítéskor könnyen hibák jelennek meg,
- nagyobb projektekben teljesen kezelhetetlenné válik.

Ezért modern fejlesztésben **nem használjuk** ezt a megoldást.

---

# Ajánlott megoldás: HEREDOC

A HEREDOC lehetővé teszi, hogy a HTML egyben maradjon, a PHP pedig ne törje szét a struktúrát.  
Ez sokkal tisztább, mint a HTML és PHP keverése.

### Példa (ajánlott)

```php
<?php
$name = "László";

$html = <<<HTML
<h1>Welcome!</h1>
<p>Hello, $name!</p>
HTML;

echo $html;
?>
```

### Miért jobb?

- a HTML egyben marad,
- a PHP‑logika nem keveredik a megjelenítéssel,
- könnyebb olvasni és módosítani,
- ez a szemlélet vezet a sablonmotorok (Blade, Twig) használatához.

A stringekkel és HTML‑generálással részletesen a **Stringek kezelése** fejezetben foglalkozunk.

---

## Gyakorlófeladatok

1. Írd ki a nevedet egy változó segítségével.
2. Készíts egy HTML oldalt, amelyben a PHP kiírja az aktuális évszámot.
3. Írj egy programot, amely két számot összead, és kiírja az eredményt.

---

# Mini projekt – „Névjegy oldal”

Készíts egy egyszerű oldalt, amely:

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

### Magyarázat

- A három változó különböző adatokat tárol.
- Az `echo` minden adatot HTML formában jelenít meg.
- A PHP‑val dinamikus tartalmat hozol létre, amely a változók értékétől függ.

---

## Megjegyzés

Érdemes kipróbálni, hogyan tudsz különböző HTML elemeket létrehozni, és a tartalmukat PHP‑változókból előállítani.  
A HTML és PHP keverését kerüljük; a dinamikus tartalmat érdemes HEREDOC‑kal vagy külön logikai blokkal generálni.

### Példa – egyszerű bekezdés

```php
<?php
$name = "Laszlo";

$html = <<<HTML
<p>Hello, $name!</p>
HTML;

echo $html;
?>
```

### Példa – több HTML elem egyben

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

### Példa – lista generálása változókból

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

## Megjegyzés
 
A következő fejezetben megnézzük, hogyan készül egy **dinamikus weboldal** PHP‑val.

---