---
id: php-bevezetes
slug: /php/bevezetes/php-bevezetes
title: "PHP bevezetés"
---

# PHP bevezetés

A PHP egy általános célú programozási nyelv, amelyet elsősorban dinamikus weboldalak és webalkalmazások készítésére használunk. A nyelv jól együttműködik a HTML-lel, adatbázisokkal és a webes protokollokkal, ezért a kisebb oldalaktól az összetett rendszerekig sokféle feladatra alkalmas.

## Mit jelent a PHP?

A PHP hivatalos feloldása: **PHP: Hypertext Preprocessor**.

Ez egy rekurzív mozaikszó: a rövidítés feloldásában maga a PHP is szerepel. A *Hypertext Preprocessor* arra utal, hogy a PHP a webes tartalom előállítása előtt dolgozza fel a programkódot.

## Rövid történeti áttekintés

- **1994:** Rasmus Lerdorf elkészítette a Personal Home Page Tools nevű eszközt saját weboldalának látogatottsági és űrlapadatainak kezelésére.
- **1995:** a projekt nyilvánosan elérhetővé vált PHP/FI néven.
- **1998:** megjelent a PHP 3, ekkor terjedt el a *PHP: Hypertext Preprocessor* elnevezés.
- **2000:** a PHP 4 a Zend Engine-re épült, és jelentősen javult a teljesítménye.
- **2004:** a PHP 5 objektumorientált képességeket és a modernebb adatbázis-kezelést erősítette meg.
- **2015-től:** a PHP 7, majd a PHP 8 újabb teljesítményjavításokat, típuskezelési és nyelvi fejlesztéseket hozott.

A PHP azóta is aktívan fejlődik. A különböző verziók eltérő képességekkel és támogatási időszakkal rendelkeznek, ezért éles projektnél mindig támogatott verziót érdemes használni.

## Hogyan működik a weben?

A PHP-kódot a webszerver futtatja a kérés feldolgozásakor. A böngésző nem a PHP-forráskódot kapja meg, hanem a szerver által előállított választ, például HTML-t vagy JSON-t.

```text
Felhasználó -> kérés -> webszerver és PHP -> válasz -> böngésző
```

Egy `.php` fájl a PHP-kód mellett HTML-t, CSS-t és JavaScriptet is tartalmazhat. A PHP feladata ilyenkor például az adatok beolvasása, feldolgozása és a megfelelő HTML- vagy API-válasz előállítása.

## Ismert PHP-alapú projektek

A PHP-t ma is sok ismert nyílt forráskódú projekt és webes rendszer használja, többek között:

- **WordPress** – tartalomkezelő rendszer és publikációs platform;
- **Wikipedia** – a MediaWiki szoftverre épülő enciklopédia;
- **Drupal** és **Joomla** – összetett tartalomkezelő rendszerek;
- **Moodle** – online oktatási platform;
- **phpMyAdmin** – böngészőből használható MySQL- és MariaDB-kezelő;
- **Nextcloud** – saját üzemeltetésű fájl- és együttműködési platform.

Ezek nem azt jelentik, hogy minden egyes oldaluk minden része PHP-ban készült, hanem azt, hogy a felsorolt rendszerek PHP-alapú alkalmazások vagy PHP-ban fejlesztett, széles körben használt projektek.

## Miért érdemes PHP-t tanulni?

- kezdőként is gyorsan kipróbálható;
- sok tárhely és fejlesztői környezet támogatja;
- rengeteg dokumentáció, csomag és kész megoldás érhető el hozzá;
- HTML-lel, adatbázisokkal és API-kkal jól kombinálható;
- a webfejlesztés alapfogalmai közben fokozatosan sajátíthatók el.

## Mit fogsz megtanulni?

A PHP-fejezetek során megismered:

- a PHP szintaxisát, változóit, tömbjeit és függvényeit;
- az elágazásokat, ciklusokat és a fájlok kezelését;
- az űrlapok feldolgozását GET és POST kérésekkel;
- az adatbázis-kapcsolat és a CRUD-műveletek alapjait;
- az objektumorientált programozás, az MVC és a biztonság fontosabb fogalmait;
- a kisebb webalkalmazások felépítését és tesztelését.

A következő leckében beállítjuk a fejlesztői környezetet, és elkészítjük az első PHP-programot.

További források:

- [PHP kézikönyv](https://www.php.net/manual/en/)
- [PHP hivatalos oldala](https://www.php.net/)
- [W3Schools PHP tutorial](https://www.w3schools.com/php/)
