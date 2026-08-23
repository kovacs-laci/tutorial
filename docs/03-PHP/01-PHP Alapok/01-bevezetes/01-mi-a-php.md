---
id: mi-a-php
slug: /php-alapok/mi-a-php
title: "Mi az a PHP?"
sidebar_label: "Mi az a PHP?"
---

# Mi az a PHP?

A PHP egy szerveroldali programozási nyelv, amelyet weboldalak és webalkalmazások készítésére használnak.  
A böngésző nem futtat PHP‑kódot. A PHP a szerveren fut, és a böngésző csak azt a HTML‑t látja, amit a PHP előállít.

---

## Miért használják a PHP-t?

- könnyen megtanulható,
- sok dokumentáció és példa érhető el,
- szinte minden tárhely támogatja,
- nagy, ismert rendszerek is PHP‑val működnek (például WordPress).

A PHP jó választás kezdőknek, mert gyorsan látható eredményt ad: a kód fut, és azonnal megjelenik a böngészőben.

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

## Egyszerű példa

```php
<?php
$message = "Hello, world!";
echo $message;
?>
```

### Magyarázat

- A `$message` változó egy szöveget tárol.
- Az `echo` utasítás kiírja a változó tartalmát a böngészőben.
- A PHP‑kódot a `<?php ... ?>` jelölések között írjuk.
- A böngészőben csak a következő jelenik meg:

```
Hello, world!
```

A PHP‑kód nem látszik, mert azt a szerver futtatja.

---

## Mit érdemes megjegyezni?

- A PHP mindig a szerveren fut.
- A böngésző csak a generált HTML‑t látja.
- A PHP és a HTML együtt használható ugyanabban a fájlban.
- A PHP alkalmas egyszerű és összetett webalkalmazások készítésére is.

A következő fejezetben megnézzük, hogyan lehet PHP‑kódot futtatni a saját gépen.
```

---
