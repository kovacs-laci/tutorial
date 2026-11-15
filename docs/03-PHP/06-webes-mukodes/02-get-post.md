---
id: get-post
slug: /php/webes-mukodes/get-post
title: "GET és POST kérések"
---

PHP-ban az űrlapokból érkező adatokat a **GET** és **POST** HTTP metódusokkal tudjuk fogadni.

Mindkettő adatot küld a szerver felé, de különböző módon.
A böngészőből érkező adatot mindig ellenőrizni kell, és HTML-kimenetbe írás előtt escape-elni kell. A GET-et adatlekérésre, például keresésre és szűrésre használjuk; ne indítson adatot módosító műveletet. A POST alkalmas adatküldésre és módosító műveletekre, de önmagában nem teszi biztonságossá vagy titkossá az adatot. Erről és az adatvezérelt oldalak készítéséről a [dinamikus weboldal készítése leckében](./04-dinamikus-weboldal.md) is látsz példát.

---

## GET metódus

### Egyszerű GET űrlap

```html
<form method="GET">
    <label for="get-name">Név:</label>
    <input type="text" id="get-name" name="name">
    <label for="-id-age">Életkor:</label>
    <input
        type="number"
        id="id-age"
        name="age"
        min="16"
        max="120">
    <button type="submit">Keresés</button>
</form>
```

A GET a címsorban küldi az adatokat. Beküldés után az URL például így nézhet ki:

```text
http://localhost/oldal.php?name=Anna&age=17
```

Az adatokat a `$_GET` szuperglobális tömb tartalmazza.
Egy mező tömbként is érkezhet (például `name[]` esetén), ezért ellenőrizzük a várt adattípust.
A böngésző a GET paramétereket szövegként küldi el, még akkor is, ha az input mező pl. number.

```php
$name = $_GET["name"] ?? "";
$age = $_GET["age"] ?? "";

if (!is_string($name) || !is_string($age)) {
    echo "Érvénytelen adatformátum.";
    return;
}

echo "Név: " . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
echo "<br>";
echo "Életkor: " . htmlspecialchars($age, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");

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

---

## POST metódus

A POST az adatokat **nem** a címsorban küldi, hanem a kérés törzsében.

Ez nem titkosítás. Érzékeny adatok kezeléséhez HTTPS, szerveroldali validáció és megfelelő biztonsági megoldások szükségesek.

:::tip
### POST workflow

1. A felhasználó kitölti az űrlapot
2. A böngésző elküldi a POST kérést
3. A PHP kiolvassa a `$_POST` adatokat
4. A PHP validálja az adatokat
5. Hibát jelez vagy feldolgozza az adatot
:::

### Egyszerű POST űrlap

```html
<form method="POST" action="process.php">
    <label for="id-name">Felhasználónév:</label>
    <input type="text" id="id-name" name="name">
    <label for="id-password">Jelszó:</label>
    <input type="password" id="id-password" name="password">
    <button type="submit">Belépés</button>
</form>
```
Az adatokat a `$_POST` szuperglobális tömb tartalmazza.

**A POST kérés HTTPS nélkül továbbra sem titkosított.**

A POST kérés adatai önmagukban nem titkosítottak. Az adatok biztonságos továbbítását a HTTPS (TLS) biztosítja. A jelszavakat a szerveren soha nem szabad sima szövegként tárolni, helyettük password_hash() segítségével bcrypt vagy Argon2 alapú hash-t tárolunk. A jelszó biztonságos kezelését a bejelentkezésről szóló leckében tárgyaljuk részletesen.

---

## GET vs POST

| Tulajdonság | GET | POST |
|------------|------|-------|
| Adat helye | URL-ben | Kérés törzsében |
| Látható az URL-ben | Igen | Nem |
| Kérésméret | Az URL hossza korlátozott | A szerver beállításai korlátozzák |
| Mire jó | Adatlekérés, keresés, szűrés | Adatküldés, adatot módosító műveletek |

Az érzékeny adatokat ne GET paraméterként küldjük, mert az URL bekerülhet például a böngészési előzményekbe és a szervernaplókba. A POST nem titkosítás: érzékeny adatok továbbításához HTTPS kell, és szerveroldali ellenőrzésre is szükség van.

---

## Gyakoribb űrlapelemek

A HTML számos különböző beviteli mezőt biztosít. Ezek ugyanúgy használhatók GET és POST űrlapokban is.
Az űrlapmezőket címkézzük fel, és a `label` `for` attribútumát kapcsoljuk össze a mező egyedi `id` értékével.

### Szövegmező

```html
<label for="name">Név:</label>
<input type="text" id="name" name="name" placeholder="Add meg a neved">
```

Ugyanezt a mezőt PHP-függvénnyel is előállíthatjuk. Ez a változat közvetlenül kiírja a HTML-t, ezért a függvény hívásakor nem kell külön `echo`-t használnunk. 

```php
<?php

function renderInputText(
    string $id,
    string $name,
    string $label,
    string $placeholder = "",
    string $value = ""
): void {

    echo <<<HTML
        <label for="{$id}">{$label}</label>
        <input type="text" id="{$id}" name="{$name}" placeholder="{$placeholder}" value="{$value}">
    HTML;
}

renderInputText(
    id: "name",
    name: "name",
    label: "Név",
    placeholder: "Add meg a neved"
);
```

A név szerinti argumentumok (PHP 8-tól) olvashatóbbá teszik a hívást, mint több azonos típusú érték pozíció szerinti átadása. 

Az ötödik, opcionális `value` paraméterrel kezdőértéket is adhatunk meg, például `value: "Anna"` formában.

A placeholder csak kiegészítő segítség, nem helyettesíti a címkét. A `label` `for` értéke és az `input` `id` értéke egyezzen meg, az `id` pedig legyen egyedi az oldalon.

---

### Szövegbox
```html
<label for="message">Üzenet:</label>
<textarea id="message" name="message"></textarea>
```
---

### Jelszómező

```html
<label for="password">Jelszó:</label>
<input type="password" id="password" name="password">
```

A beírt karaktereket a böngésző elrejti.

---

### E-mail mező

```html
<label for="email">E-mail-cím:</label>
<input type="email" id="email" name="email">
```

A böngésző alapvető e-mail formátum ellenőrzést végez.

---

### Szám mező

```html
<label for="age">Életkor:</label>
<input type="number" id="age" name="age">
```

---

### Dátum mező

```html
<label for="birth-date">Születési dátum:</label>
<input type="date" id="birth-date" name="birth-date">
```

---

### Színválasztó

```html
<label for="color">Szín:</label>
<input type="color" id="color" name="color">
```

---

### Fájlfeltöltő mező

```html
<label for="profile-pic">Profilkép:</label>
<input type="file" id="profile-pic" name="profile-pic">
```
Fájlfeltöltéskor az űrlapnak `enctype="multipart/form-data"` attribútumra is szüksége van. A megvalósítást a [Fájlfeltöltés leckében](../07-fajlkezeles/04-fajlfeltoltes.md) mutatjuk be.

---

### Kötelező mezők

A `required` attribútummal megadhatjuk, hogy egy mező kitöltése kötelező.

```html
<form method="POST">

    <label for="required-name">Név:</label>
    <input
        type="text"
        id="required-name"
        name="name"
        required>

    <button type="submit">Küldés</button>

</form>
```

Ha a felhasználó nem tölti ki a mezőt, a böngésző figyelmeztetést jelenít meg.

> Fontos: a `required` nem helyettesíti a szerveroldali ellenőrzést.

---

### Lenyíló lista (select)

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

### Jelölőnégyzetek (checkbox)

A checkboxokból egyszerre több elemet is kiválaszthatunk.

```html
<form method="POST" action="process.php">

    <h3>Kedvenc programozási nyelvek</h3>

    <input type="checkbox" id="language-php" name="languages[]" value="PHP">
    <label for="language-php">PHP</label><br>
    <input type="checkbox" id="language-js" name="languages[]" value="JavaScript">
    <label for="language-js">JavaScript</label><br>
    <input type="checkbox" id="language-python" name="languages[]" value="Python">
    <label for="language-python">Python</label><br>

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

### Rádiógombok (radio)

A rádiógombok esetén egyszerre csak egy érték választható.

```html
<form method="POST" action="process.php">

    <h3>Programozási szint</h3>

    <input type="radio" id="level-beginner" name="level" value="beginner">
    <label for="level-beginner">Kezdő</label>
    <input type="radio" id="level-advanced" name="level" value="advanced">
    <label for="level-advanced">Haladó</label>
    <input type="radio" id="level-professional" name="level" value="professional">
    <label for="level-professional">Profi</label>

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

    <label for="self-name">Név:</label>
    <input type="text" id="self-name" name="name">

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

<label for="form-name">Név:</label>
<input type="text" id="form-name" name="name">

    <button type="submit">Küldés</button>

</form>
```

### process.php

```php
<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? "";

    if (is_string($name)) {
        echo "Szia, " . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "!";
    }
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

Az `isset()` akkor ad igaz értéket, ha a változó vagy tömbelem létezik, és az értéke nem `null`.

---

## isset() és empty()

A két függvényt könnyű összekeverni.

```php
$name = "";

var_dump(isset($name)); // true
var_dump(empty($name)); // true
```

Az `isset()` azt vizsgálja, hogy létezik-e a változó.

Az `empty()` többek között a `""`, `"0"`, `0`, `false`, `null` és a nem létező érték esetén is igazat ad. Ezért nem minden esetben megfelelő annak eldöntésére, hogy egy szöveges mező tartalmaz-e adatot.

---

## Gyakori megoldás

```php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = $_POST["name"] ?? null;

    if (!is_string($name) || trim($name) === "") {

        echo "A név megadása kötelező!";

        return;
    }

    echo "Sikeres beküldés: "
        . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}
```

Ez ellenőrzi a kérés metódusát, a kapott adat típusát és azt is, hogy a mező ne csak szóközöket tartalmazzon. A részletes szerveroldali ellenőrzést a [validációs leckében](./03-validacio.md) tanuljuk meg.

---
## Összetett példa

Az alábbi példa több gyakori űrlapelemet is tartalmaz.

```html
<form method="POST" action="process.php">

    <label for="id-name">Név:</label>
    <input
        type="text"
        id="id-name"
        name="name"
        required>

    <label for="id-email">E-mail:</label>
    <input
        type="email"
        id="id-email"
        name="email"
        required>

    <label for="-id-age">Életkor:</label>
    <input
        type="number"
        id="id-age"
        name="age"
        min="1"
        max="120">

    <select name="city">
        <option value="god">Göd</option>
        <option value="budapest">Budapest</option>
        <option value="vac">Vác</option>
    </select>

    <p>Tanfolyam típusa:</p>

    <input type="radio" id="course-online" name="course-type" value="online">
    <label for="course-online">Online</label>
    <input type="radio" id="course-in-person" name="course-type" value="szemelyes">
    <label for="course-in-person">Személyes</label>

    <p>Érdeklődési kör:</p>

    <input type="checkbox" id="interest-php" name="interests[]" value="PHP">
    <label for="interest-php">PHP</label>
    <input type="checkbox" id="interest-laravel" name="interests[]" value="Laravel">
    <label for="interest-laravel">Laravel</label>
    <input type="checkbox" id="interest-js" name="interests[]" value="JavaScript">
    <label for="interest-js">JavaScript</label>

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
