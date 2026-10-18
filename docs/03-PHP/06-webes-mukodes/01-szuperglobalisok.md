---
id: szuperglobalisok
slug: /php/webes-mukodes/szuperglobalisok
title: "Szuperglobális változók"
---

A PHP-ban a változók általában csak azon a helyen érhetők el, ahol létrehoztuk őket.

A szuperglobális változók különleges tömbök, amelyek a program bármely pontján elérhetők.

Segítségükkel például:

- űrlapadatokat fogadhatunk;
- munkameneteket kezelhetünk;
- sütiket (cookie-kat) használhatunk;
- fájlokat tölthetünk fel;
- szerverinformációkat kérdezhetünk le.

A leggyakrabban használt szuperglobális változók:

| Név | Mire használjuk? |
|------|------|
| `$_GET` | URL paraméterek olvasása |
| `$_POST` | Űrlapadatok fogadása |
| `$_REQUEST` | GET és POST adatok egyben |
| `$_SERVER` | Szerver- és kérésinformációk |
| `$_SESSION` | Munkamenet adatok tárolása |
| `$_COOKIE` | Böngészőben tárolt adatok |
| `$_FILES` | Feltöltött fájlok |

---

## `$_GET`

A `$_GET` tömb az URL paramétereit tartalmazza.

Példa URL:

```text
page.php?name=Anna
```

PHP:

```php
echo $_GET["name"];
```

Kimenet:

```text
Anna
```

A GET adatokat gyakran használjuk:

- keresőmezőknél;
- szűréseknél;
- lapozásnál;
- URL-ben átadható adatoknál.

---

## `$_POST`

A `$_POST` az űrlapokból érkező POST adatokat tartalmazza.

```html
<form method="POST">

    <input
        type="text"
        name="message">

    <button type="submit">
        Küldés
    </button>

</form>
```

PHP:

```php
echo $_POST["message"];
```

A POST adatokat általában:

- bejelentkezésekhez;
- regisztrációkhoz;
- kapcsolatfelvételi űrlapokhoz;
- adatmentéshez

használjuk.

---

## `$_REQUEST`

A `$_REQUEST` egyetlen tömbben biztosít hozzáférést a GET és POST adatokhoz.

```php
echo $_REQUEST["name"];
```

Ez kényelmes lehet, de nem derül ki belőle, hogy az adat GET vagy POST kéréssel érkezett.

> Modern PHP alkalmazásokban általában a `$_GET` és `$_POST` közvetlen használata javasolt.

---

## `$_SERVER`

A `$_SERVER` a szerverről és az aktuális kérésről tartalmaz információkat.

### Gyakori példák

```php
echo $_SERVER["REQUEST_METHOD"];
```

Kimenet:

```text
POST
```

---

```php
echo $_SERVER["PHP_SELF"];
```

Kimenet:

```text
/index.php
```

---

```php
echo $_SERVER["HTTP_USER_AGENT"];
```

Kimenet:

```text
Mozilla/5.0 ...
```

---

```php
echo $_SERVER["REMOTE_ADDR"];
```

Kimenet:

```text
192.168.1.100
```

### Mire használható?

- GET vagy POST kérés felismerése;
- az aktuális fájl elérési útjának lekérdezése;
- a böngésző azonosítása;
- a kliens IP-címének lekérdezése.

### Ellenőrzés, hogy POST kérés érkezett-e

```php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    echo "Az űrlapot elküldték.";

}
```

Ez az egyik leggyakrabban használt PHP-s minta.

---

## `$_SESSION`

A session segítségével adatokat tárolhatunk a szerveren a felhasználó munkamenetéhez.

A session használatát mindig a `session_start()` meghívásával kell kezdeni.

### Session indítása

```php
session_start();
```

---

### Adat mentése

```php
session_start();

$_SESSION["userName"] = "László";
```

---

### Adat kiolvasása

```php
session_start();

echo $_SESSION["userName"];
```

---

### Egy session változó törlése

```php
session_start();

unset($_SESSION["userName"]);
```

---

### Az összes session adat törlése

```php
session_start();

session_unset();
```

---

### A teljes session megszüntetése

```php
session_start();

session_destroy();
```

Ezt a blokkot tenném be közvetlenül a "A teljes session megszüntetése" rész után:

### Fontos: minden oldalon meg kell hívni a session_start() függvényt

Tegyük fel, hogy három oldalunk van:

```text
form.php
process.php
success.php
```

Ha mindhárom oldalon szeretnénk használni a `$_SESSION` tömböt, akkor mindegyik fájl elején meg kell hívni a `session_start()` függvényt.

Példa:

**form.php**

```php
<?php

session_start();

$_SESSION["userName"] = "László";
```

**process.php**

```php
<?php

session_start();

echo $_SESSION["userName"];
```

**success.php**

```php
<?php

session_start();

echo $_SESSION["userName"];
```

A `session_start()` nem hoz létre minden alkalommal új sessiont.

A PHP a böngésző által küldött session azonosító alapján betölti a korábban eltárolt session adatokat, és elérhetővé teszi azokat a `$_SESSION` tömbben.

Ha elfelejtjük meghívni a `session_start()` függvényt, akkor a session adatok nem lesznek elérhetők.

Nagyobb projektekben gyakran készítünk egy közös fájlt:

```php
<?php

session_start();
```

Például:

```text
bootstrap.php
```

majd ezt minden oldalon betöltjük:

```php
require_once "bootstrap.php";
```

Így nem kell minden fájl elejére külön kiírni a `session_start()` hívást.

---

### Session azonosító lekérdezése

Minden session rendelkezik egy egyedi azonosítóval.

```php
session_start();

echo session_id();
```

A `session_id()` függvény elsősorban hibakeresésre és speciális sessionkezelési feladatokra használható.

---

### Mire használható a $_SESSION?

- bejelentkezési állapot tárolása;
- felhasználói azonosítás;
- bevásárlókosár kezelése;
- hibaüzenetek tárolása;
- felhasználói beállítások megőrzése.

---

## `$_COOKIE`

A cookie-k a felhasználó böngészőjében tárolódnak.

### Cookie létrehozása

```php
setcookie(
    "theme",
    "dark",
    time() + 3600
);
```

A fenti példa egy órára létrehoz egy cookie-t.

---

### Cookie olvasása

```php
echo $_COOKIE["theme"];
```

---

### Cookie törlése

```php
setcookie(
    "theme",
    "",
    time() - 3600
);
```

### Mire használható?

- nyelvi beállítás tárolása;
- világos vagy sötét téma megjegyzése;
- felhasználói preferenciák tárolása;
- "Emlékezz rám" funkciók megvalósítása.

### Session és Cookie összehasonlítása

| Session | Cookie |
|----------|----------|
| Szerveren tárolódik | Böngészőben tárolódik |
| Biztonságosabb | Könnyebben módosítható |
| Nagyobb adatok tárolhatók | Kis mennyiségű adat tárolható |

---

## `$_FILES`

A `$_FILES` tömb a feltöltött fájlok adatait tartalmazza.

Akkor jön létre, amikor a felhasználó fájlt tölt fel egy űrlapon keresztül.

### Fájlfeltöltő űrlap

```html
<form
    method="POST"
    enctype="multipart/form-data">

    <input
        type="file"
        name="document">

    <button type="submit">
        Feltöltés
    </button>

</form>
```

> Fájlfeltöltés esetén az `enctype="multipart/form-data"` attribútum kötelező.

---

### Fájl adatainak kiírása

```php
print_r($_FILES["document"]);
```

Példa eredmény:

```php
Array
(
    [name] => jegyzet.pdf
    [type] => application/pdf
    [tmp_name] => /tmp/php123
    [error] => 0
    [size] => 125000
)
```

### Gyakran használt elemek

**Fájlnév**

```php
$_FILES["document"]["name"]
```

---

**Méret bájtban**

```php
$_FILES["document"]["size"]
```

---

**Ideiglenes fájl neve**

```php
$_FILES["document"]["tmp_name"]
```

---

**Hibakód**

```php
$_FILES["document"]["error"]
```

A fájlfeltöltésekkel később külön fejezetben részletesen is foglalkozunk.

---

### Kép feltöltése és megjelenítése

A feltöltött fájlokat általában először át kell helyezni az ideiglenes helyükről egy végleges mappába.

**Űrlap**

```html
<form
    method="POST"
    enctype="multipart/form-data">

    <input
        type="file"
        name="profilePicture">

    <button type="submit">
        Feltöltés
    </button>

</form>
```

> Fájlfeltöltés esetén az `enctype="multipart/form-data"` attribútum kötelező.

---

### Sikeres volt a feltöltés?

A PHP a `$_FILES["..."]["error"]` mezőben tárolja a feltöltés eredményét.

```php
if ($_FILES["profilePicture"]["error"] !== 0) {

    echo "Hiba történt a feltöltés során.";

    return;
}

echo "A feltöltés sikeres volt.";
```

A `0` érték azt jelenti, hogy a feltöltés hiba nélkül megtörtént.

---

### Fájladatok kiírása

```php
if ($_FILES["profilePicture"]["error"] !== 0) {

    echo "Hiba történt a feltöltés során.";

    return;
}

echo "Fájlnév: "
    . $_FILES["profilePicture"]["name"];

echo "<br>";

echo "Méret: "
    . $_FILES["profilePicture"]["size"]
    . " bájt";
```

A példában csak akkor folytatjuk a feldolgozást, ha a feltöltés sikeres volt.

---

### A fájl áthelyezése

A feltöltött fájl először egy ideiglenes mappába kerül. A `move_uploaded_file()` függvénnyel helyezhetjük át egy végleges helyre.

```php
if ($_FILES["profilePicture"]["error"] !== 0) {

    echo "Hiba történt a feltöltés során.";

    return;
}

$uploadDirectory = "uploads/";

$fileName = $_FILES["profilePicture"]["name"];

move_uploaded_file(
    $_FILES["profilePicture"]["tmp_name"],
    $uploadDirectory . $fileName
);

echo "A feltöltés sikeres volt.";
```

---

### A feltöltött kép megjelenítése

```php
if ($_FILES["profilePicture"]["error"] !== 0) {

    echo "Hiba történt a feltöltés során.";

    return;
}

$uploadDirectory = "uploads/";

$fileName = $_FILES["profilePicture"]["name"];

move_uploaded_file(
    $_FILES["profilePicture"]["tmp_name"],
    $uploadDirectory . $fileName
);

echo "\"{$uploadDirectory}{$fileName}\"";
```

A példában:

1. ellenőrizzük, hogy a feltöltés sikeres volt-e;
2. áthelyezzük a fájlt a végleges mappába;
3. megjelenítjük a feltöltött képet a böngészőben.

---

### Fontos biztonsági megjegyzés

A fenti példa oktatási célú.

Valódi alkalmazásokban mindig ellenőrizni kell:

- a fájl méretét;
- a fájl típusát;
- a kiterjesztést;
- a feltöltési hibákat;
- valamint érdemes egyedi fájlnevet generálni.

Például:

```php
$fileName = uniqid() . ".jpg";
```

A biztonságos fájlfeltöltéssel később külön fejezetben foglalkozunk részletesen.

---

### Ismétlés: kivételkezelés használata

A korábban tanult kivételkezelés fájlfeltöltésnél is alkalmazható.

```php
try {

    if ($_FILES["profilePicture"]["error"] !== 0) {
        throw new Exception(
            "Hiba történt a feltöltés során."
        );
    }

    $uploadDirectory = "uploads/";

    $fileName = $_FILES["profilePicture"]["name"];

    move_uploaded_file(
        $_FILES["profilePicture"]["tmp_name"],
        $uploadDirectory . $fileName
    );

    echo "A feltöltés sikeres volt.";

} catch (Exception $exception) {

    echo $exception->getMessage();

}
```

Ebben a példában a feltöltési hibát kivételként kezeljük, majd a `catch` ágban jelenítjük meg a hibaüzenetet.

A PHP alkalmazásokban egyszerű validációs feladatoknál gyakran elegendő az early return használata. A kivételkezelés elsősorban összetettebb hibakezelési helyzetekben hasznos.

Egyszerű megoldás (jelenlegi ajánlott minta):

```php
if ($_FILES["profilePicture"]["error"] !== 0) {

    echo "Hiba történt.";

    return;
}
```

és

Kivételes megoldás:

```php
try {

    ...

} catch (Exception $exception) {

    ...
}
```

---
## Összefoglalás

| Szuperglobális | Mire használjuk? |
|---------------|------------------|
| `$_GET` | URL paraméterek |
| `$_POST` | Űrlapadatok |
| `$_REQUEST` | GET és POST adatok |
| `$_SERVER` | Szerverinformációk |
| `$_SESSION` | Munkamenet adatok |
| `$_COOKIE` | Böngészőben tárolt adatok |
| `$_FILES` | Feltöltött fájlok |

---

## Gyakorlófeladatok

1. Készíts URL-t, amely egy `name` paramétert ad át, majd írd ki a `$_GET` segítségével.
2. Készíts POST űrlapot, és jelenítsd meg a beküldött adatot.
3. Írd ki az aktuális kérés típusát a `$_SERVER["REQUEST_METHOD"]` segítségével.
4. Írd ki a látogató böngészőjét a `$_SERVER["HTTP_USER_AGENT"]` használatával.
5. Tárolj egy felhasználónevet sessionben, majd jelenítsd meg egy másik oldalon.
6. Törölj egy session változót az `unset()` használatával.
7. Készíts cookie-t, amely eltárolja a kiválasztott témát (`light` vagy `dark`).
8. Olvasd ki a cookie értékét.
9. Tölts fel egy fájlt, majd írd ki a nevét és a méretét.
10. Vizsgáld meg a `$_FILES` tömb tartalmát a `print_r()` segítségével.

---

## Megjegyzés

- A `$_GET`, `$_POST` és `$_REQUEST` tömbök felhasználói adatokat tartalmaznak, ezért az adatok validálása és biztonságos megjelenítése mindig fontos.
- A sessionök a szerveren tárolódnak, a cookie-k a böngészőben.
- A `$_SERVER` tömb számos további információt tartalmaz, érdemes megvizsgálni a teljes tartalmát a `print_r($_SERVER)` segítségével.
- A fájlfeltöltéseknél mindig ellenőrizni kell a fájl típusát és méretét.