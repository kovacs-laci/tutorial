---
id: dinamikus-weboldal
slug: /php-alapok/dinamikus-weboldal
title: "Dinamikus weboldal készítése"
sidebar_label: "Dinamikus weboldal"
---

# Dinamikus weboldal készítése

Ebben a fejezetben azt tanulod meg, hogyan hoz létre a PHP **dinamikus**, azaz adatból generált HTML‑t.  
Ez a modern webfejlesztés alapja.

A lényeg:  
**a HTML nem statikus, hanem a PHP állítja elő valamilyen adat alapján.**

---

## 1. Mi az a dinamikus weboldal?

A dinamikus weboldal olyan oldal, amelynek tartalma **nem előre megírt HTML**, hanem a PHP által generált HTML, amely valamilyen **adatból** származik.

Ez az adat lehet:

- konstans érték,
- változó,
- tömb,
- felhasználói választás,
- később: adatbázis,
- később: API,
- később: űrlap (GET/POST – ezt külön fejezet tárgyalja).

A lényeg:  
**az adat → HTML folyamat teszi dinamikussá az oldalt.**

---

## 2. HTML generálása HEREDOC‑kal

A HEREDOC lehetővé teszi, hogy a HTML egyben maradjon, és a PHP ne törje szét a struktúrát.

Ez a legjobb módszer kezdő szinten.

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

### Mi történik?

- A `$name` változó értéke bekerül a HTML‑be.
- A HTML egyben marad, nem keveredik PHP‑val.
- A PHP a teljes HTML‑t generálja.

---

## 3. Adatvezérelt tartalom – az adat sok helyről jöhet

A dinamikus tartalom lényege, hogy a HTML **adatból** készül.  
Ez az adat többféle forrásból érkezhet.

### Példa: konstansból

```php
<?php
$title = "My Website";

$html = <<<HTML
<h1>$title</h1>
HTML;

echo $html;
?>
```

### Példa: tömbből (lista generálása)

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

### Példa: felhasználói választás (még nem űrlap!)

```php
<?php
$selectedCategory = "cars"; // később jöhet űrlapból vagy URL-ből

$data = [
    "fruits" => ["Apple", "Banana", "Orange"],
    "cars" => ["Audi", "BMW", "Tesla"]
];

$listItems = "";
foreach ($data[$selectedCategory] as $item) {
    $listItems .= "<li>$item</li>";
}

$html = <<<HTML
<h1>Selected category: $selectedCategory</h1>
<ul>
    $listItems
</ul>
HTML;

echo $html;
?>
```

Ez már valódi **adatvezérelt tartalom**.

---

## 4. Feltételes tartalom

A HTML attól függően változhat, hogy milyen adatot kap a PHP.

```php
<?php
$isLoggedIn = true;

$html = <<<HTML
<h1>Welcome!</h1>
HTML;

if ($isLoggedIn) {
    $html .= "<p>You are logged in.</p>";
} else {
    $html .= "<p>Please log in.</p>";
}

echo $html;
?>
```

Ez a dinamikus viselkedés alapja.

---

## 5. Mini projekt – adatvezérelt oldal

Készíts egy oldalt, amely:

- tartalmaz egy címet,
- tartalmaz egy tömböt (pl. termékek, tantárgyak, filmek),
- a PHP generál egy listát a tömb elemeiből,
- megjelenít egy üdvözlő üzenetet,
- opcionálisan feltételes tartalmat is használ.

### Példa megoldás

```php
<?php
$title = "Products";
$products = ["Laptop", "Mouse", "Keyboard"];

$listItems = "";
foreach ($products as $product) {
    $listItems .= "<li>$product</li>";
}

$html = <<<HTML
<h1>$title</h1>
<ul>
    $listItems
</ul>
<p>Welcome to the product page!</p>
HTML;

echo $html;
?>
```

---

## Összefoglalás

- A dinamikus weboldal **adatból** generál HTML‑t.
- Az adat sok helyről jöhet (konstans, tömb, felhasználó, később adatbázis).
- A HEREDOC tiszta, kezdőbarát módszer HTML generálásra.
- A feltételes és tömb‑alapú HTML generálás a dinamikus tartalom alapja.
- Az űrlapok és GET/POST külön fejezetben szerepelnek.

A következő fejezetben megnézzük,mi a különbség a PHP és JS által vezérelt weboldalak között.
---