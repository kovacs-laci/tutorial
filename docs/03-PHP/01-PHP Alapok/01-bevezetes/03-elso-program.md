---
id: elso-program
slug: /php-alapok/elso-program
title: "Az első PHP program"
---

# Az első PHP program

Most elkészítjük az első működő PHP‑oldalunkat.

## 1. Hozz létre egy fájlt

`index.php`

## 2. Írd bele a következőt:

```php
<?php
echo "Hello, világ!";
?>
```

## 3. Nyisd meg böngészőben

```
http://localhost/teszt/
```

Ha mindent jól csináltál, ezt látod:

```
Hello, világ!
```

---

# PHP tagek

A PHP kódot mindig a következő tagek közé írjuk:

```php
<?php
// ide jön a kód
?>
```

## HTML + PHP együtt

```php
<h1>Üdvözöllek!</h1>

<?php
$nev = "László";
echo "<p>Szia, $nev!</p>";
?>
```

---

## Gyakorlófeladatok

1. Írd ki a nevedet egy változó segítségével.
2. Készíts egy HTML oldalt, amelyben a PHP kiírja az aktuális évszámot.
3. Írj egy programot, amely két számot összead és kiírja az eredményt.

---

# Mini projekt – „Névjegy oldal”

Készíts egy egyszerű oldalt, amely:

- tartalmaz HTML fejlécet
- PHP‑val kiírja:
    - a nevedet
    - az életkorodat
    - a kedvenc tantárgyadat
- jelenjen meg egy üdvözlő üzenet:  
  **„Üdvözöllek a névjegy oldalamon!”**

### Példa megoldás

```php
<h1>Névjegy</h1>

<?php
$nev = "Buga Jakab";
$kor = 17;
$tantargy = "Informatika";

echo "<p>Név: $nev</p>";
echo "<p>Életkor: $kor</p>";
echo "<p>Kedvenc tantárgy: $tantargy</p>";
?>
```

---

## Megjegyzés

- Érdemes kipróbálni különböző HTML elemek és PHP változók kombinálását.
- Lásd még: dinamikus tartalom generálása PHP‑val.
