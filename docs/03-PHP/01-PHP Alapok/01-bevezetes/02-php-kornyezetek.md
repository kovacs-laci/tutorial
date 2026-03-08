---
id: php-kornyezetek
slug: /php-alapok/php-kornyezetek
title: "PHP környezetek"
---

# PHP környezetek

A PHP futtatásához szükségünk van egy olyan környezetre, amely képes értelmezni a PHP‑kódot.  
Ez lehet:

- helyi fejlesztői környezet (XAMPP, WAMP, Laragon)
- konténer (Docker)
- online futtató (pl. phpfiddle.org)

## Helyi fejlesztői környezet

A leggyakoribb megoldás a **XAMPP** vagy a **Laragon**.

### XAMPP

Tartalmazza:

- Apache webszerver
- PHP
- MariaDB adatbázis
- phpMyAdmin

Telepítés után a projektjeidet a `htdocs` mappába kell tenni.

### Laragon

Modern, gyors, fejlesztőbarát környezet:

- automatikus virtuális domainek (pl. `projekt.test`)
- könnyű PHP‑verzióváltás
- külön mappa a projekteknek

## PHP futtatása parancssorból

```bash
php -v
php script.php
```

## Böngészőben futtatás

Ha a projekted neve `teszt`, és XAMPP-ot használsz:

```
http://localhost/teszt/
```

---

## Gyakorlófeladatok

1. Telepítsd a XAMPP-ot vagy a Laragont.
2. Hozz létre egy `teszt` nevű mappát, és tegyél bele egy `index.php` fájlt.
3. Írd ki a böngészőben: „Működik a PHP!”

---

## Megjegyzés

- Érdemes kipróbálni a `phpinfo()` függvényt.
- Lásd még: Apache, Nginx, PHP-FPM működése.
