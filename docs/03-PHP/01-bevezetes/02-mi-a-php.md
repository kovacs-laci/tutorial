---
id: php-intro
slug: /php/bevezetes/mi-a-php
title: "PHP bevezetés"
---

# PHP bevezetés

Ez a lecke a PHP alapjait mutatja be.  
A PHP‑ról részletesebb anyagokat itt találsz: 
- https://www.w3schools.com/php/
- https://www.php.net/
- https://www.php.org/

A PHP egy **szerveroldali programozási nyelv**, amelyet weboldalak és webalkalmazások készítésére használnak.  
A böngésző nem futtatja a PHP‑kódot. A PHP a **szerveren** fut, és a böngésző csak azt a **HTML‑t** látja, amit a PHP előállít.

---

## Miért használják a PHP-t?

- könnyen megtanulható,
- sok példa és dokumentáció érhető el,
- szinte minden tárhely támogatja,
- ismert rendszerek is PHP‑val működnek (például WordPress),
- gyorsan ad látható eredményt: a kód fut, és azonnal megjelenik a böngészőben.

A PHP jó választás kezdőknek, mert egyszerűen kipróbálható, és könnyű megérteni, hogyan kapcsolódik a web működéséhez.

---

## Hogyan működik a PHP?

A PHP működése egy egyszerű folyamat:

1. A felhasználó megnyit egy PHP‑oldalt (például `index.php`)
2. A szerver futtatja a PHP‑kódot
3. A PHP HTML‑t generál
4. A böngésző ezt a HTML‑t jeleníti meg

```
Felhasználó → Kérés → Szerver (PHP fut) → HTML válasz → Böngésző
```

A lényeg: a PHP a szerveren dolgozik, a böngésző pedig csak a végeredményt látja.

---

## Mi az a PHP fájl?

A PHP fájl:

- `.php` kiterjesztésű,
- tartalmazhat HTML‑t, CSS‑t, JavaScript‑et és PHP‑kódot,
- a PHP‑kód a szerveren fut,
- a böngésző csak a generált HTML‑t kapja meg.

---

## Egyszerű példa

```php
<?php
$message = "Hello, world!";
echo $message;
?>
```

### Magyarázat

- A `$message` változó egy szöveget tárol.
- Az `echo` kiírja a változó tartalmát.
- A PHP‑kódot a `<?php ... ?>` jelölések között írjuk.
- A böngészőben csak ez jelenik meg:

```
Hello, world!
```

A PHP‑kód nem látszik, mert azt a szerver futtatja.

---

## Mire képes a PHP?

A PHP sokféle feladatra alkalmas:

- dinamikus tartalom előállítása,
- fájlok kezelése a szerveren (létrehozás, olvasás, írás, törlés),
- űrlapadatok fogadása és feldolgozása,
- sütik kezelése,
- adatbázis‑műveletek (adatok hozzáadása, módosítása, törlése),
- felhasználói bejelentkezés és jogosultságkezelés,
- adatok titkosítása.

A PHP nem csak HTML‑t tud kiadni: képeket, PDF‑eket, XML‑t vagy más szöveges formátumokat is.

---

A következő fejezetben megnézzük, hogyan futtathatsz PHP‑kódot a saját gépeden.

---
