---
id: mi-a-php
slug: /php-alapok/mi-a-php
title: "Mi az a PHP?"
---

# Mi az a PHP?

A PHP egy **szerveroldali programozási nyelv**, amelyet elsősorban webalkalmazások készítésére használunk.  
A böngésző nem közvetlenül a PHP‑kódot futtatja, hanem a szerver értelmezi, és **HTML-t küld vissza** a felhasználónak.

## Miért népszerű a PHP?

- Könnyen tanulható
- Rengeteg dokumentáció érhető el
- Szinte minden tárhely támogatja
- Nagy rendszerek is PHP-ben készültek (WordPress, Moodle, MediaWiki)

## Hogyan működik?

1. A felhasználó megnyit egy oldalt (pl. `index.php`)
2. A szerver futtatja a PHP‑kódot
3. A PHP HTML-t generál
4. A böngésző ezt jeleníti meg

```
Felhasználó → Kérés → Szerver (PHP fut) → HTML válasz → Böngésző
```

## Egyszerű példa

```php
<?php
echo "Hello, világ!";
?>
```

A böngészőben ez jelenik meg:

```
Hello, világ!
```

---

## Gyakorlófeladatok

1. Írd le saját szavaiddal, mire használjuk a PHP-t.
2. Keresd meg, milyen ismert weboldalak készültek PHP-ben.
3. Magyarázd el a különbséget a PHP és a JavaScript működése között.

---

## Megjegyzés

- Érdemes utánanézni a PHP történetének és verzióinak.
- Lásd még: szerveroldali vs. kliensoldali programozás.
