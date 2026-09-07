---
id: php-intro
slug: /php/intro
title: "Intro"
---
# Intro

Ez a tananyag a PHP programozás alapjait mutatja be teljesen kezdők számára.  
A cél, hogy bemutassuk:

- a PHP alapjait,
- a PHP működését,
- egyszerű webalkalmazások készítését,
- a jó gyakorlatokat
---

# PHP – Bevezetés

A PHP egy olyan programozási nyelv, amelyet weboldalak és webalkalmazások készítésére használnak.  
A szerveren fut, és HTML‑t vagy JSON‑t küld a böngésző felé. A tananyag célja, hogy lépésről lépésre megismerd a PHP működését, és képes legyél egyszerű, működő weboldalakat készíteni.

---

## Miért érdemes PHP-t tanulni?

- A világ számos weboldala PHP‑val működik (például WordPress).
- Könnyen tanulható, kezdők számára ideális.
- HTML‑lel együtt használható, így gyorsan látható eredményt ad.
- Később API‑k, adatbázisok és összetett alkalmazások is készíthetők vele.

---

## Hogyan működik a PHP?

A PHP a **szerveren** fut.  
A böngésző nem látja a PHP kódot, csak azt a HTML‑t, amit a PHP előállít.

### Egyszerű példa

```php
<?php
$message = "Hello, world!";
echo $message;
?>
```

**Magyarázat:**  
A `$message` változó egy szöveget tárol.  
Az `echo` utasítás kiírja ezt a szöveget a böngészőben.  
A PHP kódot a `<?php ... ?>` jelölések között írjuk.

---

## Mit fogsz megtanulni?

A tananyag végére képes leszel:

- megérteni a PHP alapjait és szintaxisát,
- változókat, tömböket és függvényeket használni,
- elágazásokat és ciklusokat írni,
- űrlapokat kezelni (GET és POST),
- egyszerű adatbázis‑kapcsolatot létrehozni,
- kisebb webalkalmazást készíteni.

---

## Hogyan épül fel a tananyag?

Minden fejezet ugyanarra a logikára épül:

1. **Elmélet** – rövid, érthető magyarázat
2. **Példa kód** – angol változó‑ és függvénynevekkel
3. **Magyarázat** – mit csinál a kód és miért
4. **Gyakorlófeladatok** – azonnal kipróbálható feladatok

---

