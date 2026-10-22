---
id: get-post
slug: /php/webes-mukodes/get-post
title: "GET és POST kérések"
---

A PHP-ban az űrlapokból érkező adatokat a **GET** és **POST** HTTP metódusokkal tudjuk fogadni.

Mindkettő adatot küld a szerver felé, de különböző módon.
A kapott adatot ellenőrizni kell, és HTML-kimenetbe írás előtt escape-elni kell. Erről és az adatvezérelt oldalak készítéséről a [dinamikus weboldal készítése leckében](./04-dinamikus-weboldal.md) is látsz példát.

---

## GET metódus

A GET a címsorban küldi az adatokat:

```text
http://localhost/oldal.php?name=Anna&age=17
```

Az adatokat a `$_GET` szuperglobális tömb tartalmazza.

```php
$name = $_GET["name"] ?? "";
$age = $_GET["age"] ?? "";

if (is_string($name) && is_string($age)) {
    echo htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
    echo "<br>";
    echo htmlspecialchars($age, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}
```

:::info 
Mit jelentenek az `ENT_QUOTES` és `ENT_SUBSTITUTE` konstansok?

A `htmlspecialchars()` függvény második paraméterében különböző beállításokat adhatunk meg a HTML-karakterek kezelésére.

### `ENT_QUOTES`

Az `ENT_QUOTES` hatására a PHP az **egyszeres** (`'`) és **dupla idézőjeleket** (`"`) is HTML entitássá alakítja.

```php
$text = 'Péter azt mondta: "Hello!"';

echo htmlspecialchars($text, ENT_QUOTES);
```

**Output:**

```html
Péter azt mondta: &quot;Hello!&quot;
```

### `ENT_SUBSTITUTE`

Az `ENT_SUBSTITUTE` gondoskodik arról, hogy hibás vagy érvénytelen karakterkódolás esetén a függvény ne okozzon hibát. Ilyenkor a problémás karaktereket helyettesítő karakterrel helyettesíti.

Ez különösen akkor hasznos, ha külső forrásból (űrlap, fájl, API stb.) érkező adatokat dolgozunk fel.

### Miért használjuk együtt?

A modern PHP alkalmazásokban gyakran találkozhatunk ezzel a formával:

```php
htmlspecialchars(
    $value,
    ENT_QUOTES | ENT_SUBSTITUTE,
    "UTF-8"
);
```

Ebben:

- `ENT_QUOTES` → minden idézőjel biztonságosan escape-elődik
- `ENT_SUBSTITUTE` → a hibás karakterek nem okoznak problémát
- `"UTF-8"` → a karakterkódolás egyértelműen meg van adva

### Biztonsági előny

```php
$name = '<script>alert("XSS")</script>';

echo htmlspecialchars(
    $name,
    ENT_QUOTES | ENT_SUBSTITUTE,
    "UTF-8"
);
```

**Output:**

```html
&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

A böngésző ezt már egyszerű szövegként jeleníti meg, így a beágyazott JavaScript nem fut le.

:::

### Egyszerű GET űrlap

```html
<form method="GET" action="process.php">
    <input type="text" name="name" placeholder="Név">
    <button type="submit">Küldés</button>
</form>
```

Beküldés után az URL például így nézhet ki:

```text
process.php?name=Anna
```

---

## POST metódus

A POST az adatokat **nem** a címsorban küldi, hanem a kérés törzsében.

Ez nem titkosítás. Érzékeny adatok kezeléséhez HTTPS, szerveroldali validáció és megfelelő biztonsági megoldások szükségesek.

:::tip
### POST workflow

1. A felhasználó kitölti az űrlapot
2. A böngésző elküldi a POST kérést
3. A PHP kiolvassa a $_POST adatokat
4. A PHP validálja az adatokat
5. Hibát jelez vagy feldolgozza az adatot
:::

### Egyszerű POST űrlap

```html
<form method="POST" action="process.php">
    <input type="text" name="name" placeholder="Név">
    <input type="password" name="password" placeholder="Jelszó">
    <button type="submit">Belépés</button>
</form>
```

---

## GET vs POST

| Tulajdonság | GET | POST |
|------------|------|-------|
| Adat helye | URL-ben | Kérés törzsében |
| Látható az URL-ben | Igen | Nem |
| Kérésméret | Az URL hossza korlátozott | A szerver beállításai korlátozzák |
| Mire jó | Keresés, szűrés | Bejelentkezés, űrlapok |

---

## Gyakoribb űrlapelemek

A HTML számos különböző beviteli mezőt biztosít. Ezek ugyanúgy használhatók GET és POST űrlapokban is.

### Szövegmező

```html
<input type="text" name="name">
```
---

### Szövegbox
```html
<textarea name="message"></textarea>
```
---

### Jelszómező

```html
<input type="password" name="password">
```

A beírt karaktereket a böngésző elrejti.

---

### E-mail mező

```html
<input type="email" name="email">
```

A böngésző alapvető e-mail formátum ellenőrzést végez.

---

### Szám mező

```html
<input type="number" name="age">
```

---

### Dátum mező

```html
<input type="date" name="birth-date">
```

---

### Színválasztó

```html
<input type="color" name="color">
```

---

### Fájlfeltöltő mező

```html
<input type="file" name="profile-pic">
```
Fájlfeltöltéskor az űrlapnak `enctype="multipart/form-data"` attribútumra is szüksége van. A megvalósítást a [Fájlfeltöltés leckében](../08-fajlkezeles/04-fajlfeltoltes.md) mutatjuk be.

---

## Kötelező mezők

A `required` attribútummal megadhatjuk, hogy egy mező kitöltése kötelező.

```html
<form method="POST">

    <input
        type="text"
        name="name"
        placeholder="Név"
        required>

    <button type="submit">Küldés</button>

</form>
```

Ha a felhasználó nem tölti ki a mezőt, a böngésző figyelmeztetést jelenít meg.

> Fontos: a `required` nem helyettesíti a szerveroldali ellenőrzést.

---

## Lenyíló lista (select)

A lenyíló lista előre definiált lehetőségeket kínál a felhasználónak.

```html
<form method="GET" action="process.php">

    <label for="city">Város:</label>

    <select name="city" id="city">
        <option value="1">Budapest</option>
        <option value="2">Göd</option>
        <option value="3">Vác</option>
    </select>

    <button type="submit">Küldés</button>

</form>
```

**Feldolgozás PHP-ban**

```php
$city = $_GET["city"] ?? "";
if (is_string($city)) {
    echo htmlspecialchars($city, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}
```

---

## Jelölőnégyzetek (checkbox)

A checkboxokból egyszerre több elemet is kiválaszthatunk.

```html
<form method="POST" action="process.php">

    <h3>Kedvenc programozási nyelvek</h3>

    <input type="checkbox" name="languages[]" value="PHP"> PHP<br>
    <input type="checkbox" name="languages[]" value="JavaScript"> JavaScript<br>
    <input type="checkbox" name="languages[]" value="Python"> Python<br>

    <button type="submit">Küldés</button>

</form>
```

**Feldolgozás PHP-ban**

```php
if (isset($_POST["languages"]) && is_array($_POST["languages"])) {
    foreach ($_POST["languages"] as $language) {
        if (is_string($language)) {
            echo htmlspecialchars($language, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "<br>";
        }
    }
}
```

A `[]` jelölés miatt több érték tömbként érkezik meg.

---

## Rádiógombok (radio)

A rádiógombok esetén egyszerre csak egy érték választható.

```html
<form method="POST" action="process.php">

    <h3>Programozási szint</h3>

    <input type="radio" name="level" value="beginner"> Kezdő
    <input type="radio" name="level" value="advanced"> Haladó
    <input type="radio" name="level" value="professional"> Profi

    <button type="submit">Küldés</button>

</form>
```

**Feldolgozás PHP-ban**

```php
$level = $_POST["level"] ?? "";
if (is_string($level)) {
    echo htmlspecialchars($level, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}
```

---

## A form action attribútum

Az `action` határozza meg, hogy az űrlap adatai melyik oldalra kerüljenek.

```html
<form method="POST" action="process.php">
```

A fenti példában az adatokat a `process.php` oldal kapja meg.

---

## Amikor a form önmagára mutat

Gyakori megoldás, hogy az űrlap és a feldolgozás ugyanabban a fájlban található.

**`index.php`**

```php
<form method="POST">

    <input type="text" name="name">

    <button type="submit">Küldés</button>

</form>

<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? "";

    if (is_string($name)) {
        echo "Szia, " . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "!";
    }
}
```

Ebben az esetben az űrlap az aktuális oldalra küldi vissza az adatokat.

Az alábbi forma is gyakran előfordul:

```php
<form method="POST" action="">
```
Az üres action attribútum az aktuális oldalt jelenti.

**Előnyök**

- kevés fájl szükséges
- gyors fejlesztés
- egyszerű gyakorlófeladatokhoz ideális

**Hátrányok**

- nagyobb programoknál átláthatatlan lehet
- a megjelenítés és a feldolgozás összekeveredik

---

## Amikor a form másik fájlra mutat

Nagyobb projektekben gyakran külön fájl végzi a feldolgozást.

**`form.php`**

```html
<form method="POST" action="process.php">

    <input type="text" name="name">

    <button type="submit">Küldés</button>

</form>
```

### process.php

```php
<?php

$name = $_POST["name"] ?? "";
if (is_string($name)) {
    echo "Szia, " . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "!";
}
```

**Előnyök**

- átláthatóbb szerkezet
- könnyebb karbantartás
- a modern keretrendszerek is hasonló elvet követnek

**Hátrányok**

- több fájl szükséges
- kezdők számára elsőre nehezebben követhető

---

## Mikor érkezett be az űrlap?

Ha az oldalt először nyitjuk meg, a `$_POST` tömb még üres.

Ezért gyakran ellenőrizzük, hogy valóban POST kérés érkezett-e.

```php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "Az űrlapot elküldték.";
}
```

A `$_SERVER["REQUEST_METHOD"]` megmutatja, hogy a kérés GET vagy POST metódussal érkezett.

---

## Az isset() használata

Ha olyan tömbelemet próbálunk olvasni, amely nem létezik, figyelmeztetést kaphatunk.

Nem ideális:

```php
$name = $_POST["name"];
```

Jobb megoldás:

```php
if (isset($_POST["name"])) {
    $name = $_POST["name"];
}
```

Az `isset()` igaz értékkel tér vissza, ha a változó vagy tömbelem létezik.

---

## isset() és empty()

A két függvényt könnyű összekeverni.

```php
$name = "";

var_dump(isset($name)); // true
var_dump(empty($name)); // true
```

Az `isset()` azt vizsgálja, hogy létezik-e a változó.

Az `empty()` azt vizsgálja, hogy van-e benne értelmes tartalom.

---

## Gyakori megoldás

```php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (empty($_POST["name"])) {

        echo "A név megadása kötelező!";

        return;
    }

    echo "Sikeres beküldés.";
}
```

Ez az egyik leggyakoribb PHP-s űrlapfeldolgozási minta.

---
## Összetett példa

Az alábbi példa több gyakori űrlapelemet is tartalmaz.

```html
<form method="POST" action="process.php">

    <input
        type="text"
        name="name"
        placeholder="Név"
        required>

    <input
        type="email"
        name="email"
        placeholder="E-mail"
        required>

    <input
        type="number"
        name="age"
        min="1"
        max="120">

    <select name="city">
        <option value="god">Göd</option>
        <option value="budapest">Budapest</option>
        <option value="vac">Vác</option>
    </select>

    <p>Tanfolyam típusa:</p>

    <input type="radio" name="course-type" value="online"> Online
    <input type="radio" name="course-type" value="szemelyes"> Személyes

    <p>Érdeklődési kör:</p>

    <input type="checkbox" name="interests[]" value="PHP"> PHP
    <input type="checkbox" name="interests[]" value="Laravel"> Laravel
    <input type="checkbox" name="interests[]" value="JavaScript"> JavaScript

    <button type="submit">Jelentkezés</button>

</form>
```

---

## Gyakorlófeladatok

1. Készíts GET űrlapot, amely bekéri a nevedet és kiírja: „Szia, NÉV!”.
2. Készíts POST űrlapot, amely bekéri a felhasználónevet és jelszót.
3. Készíts űrlapot, amely két számot kér be, és kiírja az összegüket.
4. Készíts lenyíló listát, amely három várost tartalmaz, majd írd ki a kiválasztott város nevét.
5. Készíts rádiógombokat a programozási szint kiválasztásához.
6. Készíts checkboxokat, amelyekkel több programozási nyelv választható ki.
7. Készíts egy oldalt, amely önmagára küldi vissza az űrlapot, és kiírja a beküldött adatokat.
8. Készíts oldalt, amely csak POST kérés esetén futtatja le a validációt.
9. Készíts példát, amely az isset() segítségével ellenőrzi egy mező létezését.
10. Hasonlítsd össze az isset() és az empty() működését különböző értékekkel.

---

## Megjegyzés

- Érdemes utánanézni a HTTP metódusok teljes listájának (PUT, DELETE, PATCH).
- A `required` kliensoldali ellenőrzés, nem helyettesíti a szerveroldali validálást.
- Lásd még: URL-kódolás, query string működése.
