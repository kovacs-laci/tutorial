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

A `$_GET` tömb az URL-ben átadott paramétereket tartalmazza. Tipikus felhasználása:

- keresőmezőknél;
- szűréseknél;
- lapozásnál;
- URL-ben átadható adatoknál.

Az űrlapok GET metódussal való beküldését és az érkező adatok feldolgozását a [GET és POST kérések leckében](./02-get-post.md) mutatjuk be.

---

## `$_POST`

A `$_POST` tömb a POST-kéréssel beküldött űrlapadatokat tartalmazza. Tipikus felhasználása:

- bejelentkezésekhez;
- regisztrációkhoz;
- kapcsolatfelvételi űrlapokhoz;
- adatmentéshez

használjuk. Az űrlapok felépítését és a POST-adatok ellenőrzését a [GET és POST kérések leckében](./02-get-post.md) találod.

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

Az űrlap beküldésének és a kérés metódusának ellenőrzésére a [GET és POST kérések leckében](./02-get-post.md) látsz példát.

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

A `$_FILES` tömb a feltöltött fájlok adatait tartalmazza. A feltöltés űrlapjának `POST` metódust és `enctype="multipart/form-data"` attribútumot kell használnia.

A fájl feldolgozásának, ellenőrzésének és áthelyezésének részletes példái a [Fájlfeltöltés leckében](../07-fajlkezeles/04-fajlfeltoltes.md) találhatók. Röviden: az `$_FILES["kep"]["error"]` jelzi a feltöltés eredményét, az `$_FILES["kep"]["tmp_name"]` az ideiglenes fájl útvonala, az `$_FILES["kep"]["size"]` a méret bájtban. A kliens által küldött fájlnevet és típust nem szabad megbízható adatként kezelni.

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

1. Írd ki az aktuális kérés típusát a `$_SERVER["REQUEST_METHOD"]` segítségével.
2. Írd ki a látogató böngészőjét a `$_SERVER["HTTP_USER_AGENT"]` használatával.
3. Tárolj egy felhasználónevet sessionben, majd jelenítsd meg egy másik oldalon.
4. Törölj egy session változót az `unset()` használatával.
5. Készíts cookie-t, amely eltárolja a kiválasztott témát (`light` vagy `dark`).
6. Olvasd ki a cookie értékét.
7. Készíts fájlfeltöltő űrlapot, majd dolgozd fel a feltöltést a [Fájlfeltöltés leckében](../07-fajlkezeles/04-fajlfeltoltes.md) leírtak szerint.

---

## Megjegyzés

- A `$_GET`, `$_POST` és `$_REQUEST` tömbök felhasználói adatokat tartalmaznak, ezért az adatok validálása és biztonságos megjelenítése mindig fontos.
- A sessionök a szerveren tárolódnak, a cookie-k a böngészőben.
- A `$_SERVER` tömb számos további információt tartalmaz, érdemes megvizsgálni a teljes tartalmát a `print_r($_SERVER)` segítségével.
- A fájlfeltöltéseknél mindig ellenőrizni kell a fájl típusát és méretét.