---
id: validacio
slug: /php/webes-mukodes/validacio
title: "Űrlapok validálása"
---

# Űrlapok validálása

A validáció célja, hogy ellenőrizzük: a felhasználó helyes adatokat adott-e meg.

A validáció lehet:

- **kliensoldali** (JavaScript)
- **szerveroldali** (PHP)

Ebben a fejezetben a szerveroldali validációt nézzük.

---

# Miért van szükség validációra?

A böngészőben futó ellenőrzések könnyen megkerülhetők, ezért a szervernek minden beküldött adatot ellenőriznie kell.

Például egy kötelező mező esetén:

```php
if (empty($_POST["name"])) {
    echo "A név megadása kötelező!";
}
```

A validáció segítségével:

- ellenőrizhetjük a kötelező mezőket;
- vizsgálhatjuk az adatok típusát;
- ellenőrizhetjük az adatok hosszát;
- kiszűrhetjük a hibás vagy rosszindulatú adatokat.

---

# Kötelező mező ellenőrzése

```php
if (empty($_POST["name"])) {
    echo "A név megadása kötelező!";
}
```

Az `empty()` függvény igaz értéket ad vissza, ha a mező üres.

---

# A feldolgozás megszakítása hiba esetén

Az alábbi megoldás nem ideális:

```php
if (empty($_POST["name"])) {
    echo "A név megadása kötelező!";
}

echo "Sikeres feldolgozás";
```

A program a hibaüzenet után is tovább fut.

Jobb megoldás:

```php
if (empty($_POST["name"])) {
    echo "A név megadása kötelező!";
    return;
}

echo "Sikeres feldolgozás";
```

A `return` megszakítja az aktuális feldolgozást.

---

# Szám ellenőrzése

```php
$age = $_POST["age"];

if (!is_numeric($age)) {
    echo "Az életkor csak szám lehet!";
    return;
}
```

Az `is_numeric()` ellenőrzi, hogy az érték számmá alakítható-e.

---

# Minimális és maximális hossz

Gyakori igény például jelszavaknál a minimális karakterszám ellenőrzése.

```php
$password = $_POST["password"];

if (mb_strlen($password) < 6) {
    echo "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
    return;
}
```

Akár maximális hossz is megadható:

```php
if (mb_strlen($password) > 50) {
    echo "A jelszó túl hosszú!";
    return;
}
```

---

# E-mail cím ellenőrzése

A PHP beépített szűrőket biztosít az e-mail címek ellenőrzéséhez.

```php
$email = $_POST["email"];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Érvénytelen e-mail cím!";
    return;
}
```

Például ezek érvényesnek számítanak:

```text
user@example.com
john.doe@gmail.com
```

Ez viszont nem:

```text
valami@
```

---

# Több hiba összegyűjtése

Valós alkalmazásokban általában nem az első hibánál állunk meg.

```php
$errors = [];

if (empty($_POST["name"])) {
    $errors[] = "A név megadása kötelező.";
}

if (empty($_POST["email"])) {
    $errors[] = "Az e-mail cím megadása kötelező.";
}

if (count($errors) > 0) {

    foreach ($errors as $error) {
        echo "<p>$error</p>";
    }

    return;
}

echo "Sikeres beküldés!";
```

Így a felhasználó egyszerre minden hibát lát.

---

# Visszatérés az űrlaphoz

A valóságban a hibák megjelenítése után általában visszatérünk az űrlaphoz.

```php
if (empty($_POST["name"])) {
    header("Location: form.php");
    exit;
}
```

A `header()` átirányítást küld a böngészőnek.

Az `exit` leállítja a szkript futását.

> A `header()` után szinte mindig használunk `exit` utasítást.

---

# Felhasználói adatok biztonságos megjelenítése

A validálás önmagában nem elegendő.

A felhasználótól érkező adatokat közvetlenül nem szabad kiírni a böngészőbe.

Rossz példa:

```php
echo $_POST["name"];
```

Ha valaki ezt írja be:

```html
<script>alert("Hacked!")</script>
```

akkor a böngésző JavaScript kódként próbálhatja értelmezni.

---

# htmlspecialchars() használata

A `htmlspecialchars()` biztonságosan HTML szöveggé alakítja a speciális karaktereket.

```php
$name = $_POST["name"];

echo htmlspecialchars($name);
```

Beküldött adat:

```html
<script>alert("Hacked!")</script>
```

Megjelenített eredmény:

```html
&lt;script&gt;alert("Hacked!")&lt;/script&gt;
```

A kód ilyenkor nem fut le, csak szövegként jelenik meg.

---

# Miért fontos az escape-elés?

A validálás és az escape-elés nem ugyanaz.

A validálás:

```php
if (empty($_POST["name"])) {
    echo "A név kötelező!";
}
```

azt ellenőrzi, hogy megfelelő adat érkezett-e.

Az escape-elés:

```php
echo htmlspecialchars($_POST["name"]);
```

pedig azt biztosítja, hogy a megjelenítés során a felhasználó ne tudjon HTML vagy JavaScript kódot futtatni.

> Minden felhasználótól érkező adatot érdemes escape-elni, mielőtt kiírjuk a böngészőbe.

---

# Validálás kivételekkel

Korábban már tanultunk kivételkezelést.

A validáció során is használhatunk kivételeket.

```php
try {

    if (empty($_POST["name"])) {
        throw new Exception("A név megadása kötelező.");
    }

    if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Érvénytelen e-mail cím.");
    }

    echo "Sikeres beküldés!";

} catch (Exception $exception) {

    echo $exception->getMessage();
}
```

---

# Több ellenőrzés kivételekkel

```php
try {

    $age = $_POST["age"];

    if (!is_numeric($age)) {
        throw new Exception("Az életkor csak szám lehet.");
    }

    if ($age < 18) {
        throw new Exception(
            "A jelentkezéshez legalább 18 évesnek kell lenni."
        );
    }

    echo "Sikeres jelentkezés!";

} catch (Exception $exception) {

    echo $exception->getMessage();
}
```

Ez különösen akkor hasznos, ha sok egymásra épülő ellenőrzést végzünk.

---

# Komplett példa

```php
$errors = [];

$name = $_POST["name"] ?? "";
$email = $_POST["email"] ?? "";

if (empty($name)) {
    $errors[] = "A név megadása kötelező.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Érvénytelen e-mail cím.";
}

if (count($errors) > 0) {

    foreach ($errors as $error) {
        echo "<p>" . htmlspecialchars($error) . "</p>";
    }

    return;
}

echo "Szia, " . htmlspecialchars($name) . "!";
```

A példában több korábban tanult technika is megjelenik:

- `$_POST`
- validáció
- hibák gyűjtése tömbbe
- `??` operátor
- `filter_var()`
- `htmlspecialchars()`
- `return`

---

# Gyakorlófeladatok

1. Készíts űrlapot név és életkor mezővel, majd ellenőrizd, hogy az életkor szám-e.
2. Készíts űrlapot e-mail mezővel, és validáld az e-mail címet.
3. Készíts jelszó mezőt, amely legalább 8 karakter hosszú.
4. Készíts űrlapot, amely egyszerre több hibát is képes megjeleníteni.
5. Készíts olyan oldalt, amely a felhasználó nevét a `htmlspecialchars()` segítségével írja ki.
6. Készíts validációt kivételkezeléssel (`try` / `catch`).
7. Készíts olyan alkalmazást, amely hibás adat esetén visszairányítja a felhasználót az űrlap oldalára.

---

## Megjegyzés

- A kliensoldali (`required`) ellenőrzés nem helyettesíti a szerveroldali validációt.
- A validálás és az escape-elés két különböző feladat.
- Érdemes utánanézni a `filter_var()` további szűrőinek.
- A `htmlspecialchars()` használata fontos védelmet nyújt a rosszindulatú HTML és JavaScript kódok ellen.
- Lásd még: szerveroldali és kliensoldali validáció összehasonlítása.
