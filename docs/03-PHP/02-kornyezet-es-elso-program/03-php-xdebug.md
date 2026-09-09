---
id: php-xdebug
slug: /php/kornyezet-es-elso-program/php-xdebug
title: "Xdebug – PHP hibakeresés"
---

# Xdebug – PHP hibakeresés

Az Xdebug egy PHP‑bővítmény, amely lehetővé teszi a kód futásának lépésenkénti vizsgálatát.  
A program futása megállítható, a változók értékei megtekinthetők, és követhető, hogyan jut el a kód egy adott eredményhez.

---

## Telepítés

A telepítés módja a PHP környezetétől függ.

### Windows (XAMPP)

1. Nyisd meg a böngészőben az Xdebug konfigurációs oldalt:  
   https://xdebug.org/wizard
2. Másold be a `phpinfo()` oldal teljes HTML‑kimenetét.
3. Az oldal megadja a megfelelő Xdebug verziót.
4. A letöltött `.dll` fájlt másold a PHP `ext` könyvtárába.
5. A `php.ini` fájlban add hozzá:

```
zend_extension=xdebug
xdebug.mode=debug
xdebug.start_with_request=yes
```

6. Indítsd újra az Apache‑ot.

---

## Telepítés ellenőrzése

Hozz létre egy fájlt:

```php
<?php
phpinfo();
```

A böngészőben megjelenő phpinfo oldalon látható egy „Xdebug” szakasz, ha a bővítmény aktív.

---

## Debugolás Visual Studio Code-ban

A PHP‑kód futása megállítható úgynevezett breakpointoknál.  
A debugger a kód adott pontján megáll, és megmutatja a változók aktuális értékeit.

### Szükséges VS Code plugin

A hibakereséshez telepíteni kell a következő bővítményt:

**PHP Debug**  
Készítette: *Xdebug.org*

Ez a plugin képes fogadni az Xdebug által küldött debug jeleket, és megjeleníti a változókat, a hívási veremet és a futási pontot.

Telepítés menete:

1. VS Code → Extensions panel
2. Keresés: `PHP Debug`
3. Telepítés

---

## Debug konfiguráció létrehozása

A projekt `.vscode` könyvtárában hozz létre egy `launch.json` fájlt:

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

A 9003-as port az Xdebug alapértelmezett portja.

---

## Debug indítása

1. Indítsd el a „Listen for Xdebug” konfigurációt a VS Code Debug paneljén.
2. Tegyél breakpointot a PHP‑kódba.
3. Nyisd meg a böngészőben az oldalt, amely a PHP‑fájlt futtatja.

A kód futása megáll a breakpointnál, és a VS Code megjeleníti:

- a változók aktuális értékeit,
- a hívási veremet,
- a futási pontot,
- az értékek változását lépésenként.

---

## Egyszerű példa

```php
<?php
$value = 42;
$result = $value * 2;
echo $result;
```

Breakpoint elhelyezése a következő soron:

```php
$result = $value * 2;
```

A debugger megáll, és látható:

- `$value` értéke: 42
- `$result` még nem számolódott ki

A futás folytatásával a program kiírja a számított eredményt.

---

## Mikor hasznos az Xdebug?

- összetett logika vizsgálatakor,
- űrlapfeldolgozásnál,
- adatbázis‑műveletek hibakeresésénél,
- váratlan eredmények okának felderítésénél,
- változók állapotának követésénél.

Az Xdebug nem kötelező a PHP futtatásához, de jelentősen megkönnyíti a hibák megtalálását.

---