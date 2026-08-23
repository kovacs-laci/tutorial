---
id: php-kornyezetek
slug: /php-alapok/php-kornyezetek
title: "PHP környezetek"
sidebar_label: "PHP környezetek"
---

# PHP környezetek

A PHP futtatásához szükség van egy olyan környezetre, amely képes értelmezni a PHP‑kódot.  
Ez lehet helyi fejlesztői környezet, konténer vagy online futtató szolgáltatás.  
Ebben a fejezetben áttekintjük a leggyakoribb megoldásokat.

---

## Helyi fejlesztői környezet

A legelterjedtebb eszközök:

- **XAMPP**
- **WAMP** (Windows)
- **MAMP** (macOS)

Ezek olyan csomagok, amelyek tartalmazzák a PHP‑t és egy webszervert (általában Apache‑ot).  
A telepítés után azonnal futtathatóak PHP‑fájlok a böngészőben.

### XAMPP

A XAMPP tartalmazza:

- Apache webszerver
- PHP
- MariaDB adatbázis
- phpMyAdmin

Telepítés után a projekteket a `htdocs` mappába kell tenni.  
Ha létrehozol egy `teszt` nevű mappát, akkor a böngészőben így éred el:

```
http://localhost/teszt/
```

---

## PHP futtatása parancssorból

A PHP parancssorból is futtatható.  
Ez akkor hasznos, ha nem webszervert, hanem egyszerű scriptet szeretnél futtatni.

```bash
php -v
php script.php
```

### Magyarázat

- `php -v` megjeleníti a PHP verzióját.
- `php script.php` futtatja a `script.php` fájlt, és a kimenetet a konzolon jeleníti meg.

---

## Beépített PHP webszerver (php -S)

A PHP tartalmaz egy egyszerű, beépített webszervert, amely fejlesztéshez jól használható.  
Nem szükséges hozzá Apache vagy Nginx, elég a PHP önmagában.

Ez különösen hasznos, ha gyorsan szeretnél egy mappát böngészőben futtatni.

### Indítás

Lépj be a projekt mappájába, majd futtasd:

```bash
php -S localhost:8000
```

A böngészőben így éred el:

```
http://localhost:8000
```

### Alap működés

- A PHP automatikusan a futtatási könyvtárból szolgálja ki a fájlokat.
- Ha van `index.php`, azt tölti be elsőként.
- Minden kéréshez a PHP értelmezi a fájlokat, és HTML‑t küld vissza.

---

## Egyszerű példa

Hozz létre egy `index.php` fájlt:

```php
<?php
$message = "PHP server is running.";
echo $message;
?>
```

### Magyarázat

- A `$message` változó egy szöveget tárol.
- Az `echo` kiírja a szöveget a böngészőben.
- A beépített webszerver futtatja a PHP‑kódot, és HTML‑t küld vissza.

---

## Docker (opcionális)

A PHP futtatható konténerben is.  
Ez haladóbb megoldás, de sok fejlesztő használja.

Egyszerű példa:

```bash
docker run -p 8000:8000 -v ${PWD}:/app php:8.2-cli php -S 0.0.0.0:8000 -t /app
```

Ez elindít egy PHP webszervert a jelenlegi mappa tartalmával.

---

## Gyakorlófeladatok

1. Telepítsd a XAMPP‑ot.
2. Hozz létre egy `teszt` nevű mappát, és tegyél bele egy `index.php` fájlt.
3. Írd ki a böngészőben: „PHP is working.”
4. Próbáld ki a beépített webszervert:
   ```bash
   php -S localhost:8000
   ```  
5. Nyisd meg a böngészőben:
   ```
   http://localhost:8000
   ```

---

## További lehetőség: phpinfo()

A PHP környezeted részletes adatait a `phpinfo()` függvény jeleníti meg:

```php
<?php
phpinfo();
?>
```

Ez egy teljes konfigurációs oldalt generál, amely megmutatja a PHP verzióját, moduljait és beállításait.

---

## Xdebug – PHP hibakeresés

A PHP‑ban a hibakeresést (debugolást) az **Xdebug** nevű bővítmény segíti.  
Az Xdebug lehetővé teszi, hogy a kód futása közben megállítsd a programot, és megnézd a változók értékét.

Ez különösen hasznos, amikor összetettebb programokat vagy űrlapkezelést készítesz.

---

### Telepítés

A telepítés módja attól függ, milyen PHP‑t használsz.

#### Windows (XAMPP)

1. Nyisd meg a böngészőben:  
   https://xdebug.org/wizard
2. Másold be a `phpinfo()` oldal teljes tartalmát.
3. A weboldal megmondja, melyik Xdebug verziót töltsd le.
4. A letöltött `.dll` fájlt másold a PHP `ext` mappájába.
5. A `php.ini` fájlba tedd be:

```
zend_extension=xdebug
xdebug.mode=debug
xdebug.start_with_request=yes
```

6. Indítsd újra az Apache‑ot.

---

### Ellenőrzés

Hozz létre egy fájlt:

```php
<?php
phpinfo();
?>
```

Ha az Xdebug telepítve van, a phpinfo oldalon megjelenik az „Xdebug” szakasz.

---

### Debugolás VS Code-ban

A PHP‑kód futása megállítható úgynevezett „breakpoint”-oknál.

1. Telepítsd a **PHP Debug** kiegészítőt VS Code‑ba.
2. Hozz létre egy `launch.json` fájlt:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Listen for Xdebug",
         "type": "php",
         "request": "launch",
         "port": 9003
       }
     ]
   }
   ```

3. Indítsd el a „Listen for Xdebug” debug módot.
4. Tegyél egy breakpoint‑ot a PHP‑kódba.
5. Nyisd meg a böngészőben az oldalt.

A kód futása megáll, és a VS Code megmutatja a változók értékét.

---

### Egyszerű példa

```php
<?php
$value = 42;
$result = $value * 2;
echo $result;
?>
```

Ha breakpoint‑ot teszel a `$result = $value * 2;` sorra, a debug megáll, és látod:

- `$value` értéke: 42
- `$result` még nem számolódott ki

Ez segít megérteni, hogyan működik a program lépésről lépésre.

---

### Mikor érdemes használni az Xdebugot?

- amikor nem érted, miért nem azt az eredményt kapod, amit vársz,
- amikor összetett logikát írsz,
- amikor űrlapokkal vagy adatbázissal dolgozol,
- amikor szeretnéd látni a változók aktuális értékét.

Az Xdebug nem kötelező a tananyaghoz, de sokat segít a hibák megtalálásában.
```

---
