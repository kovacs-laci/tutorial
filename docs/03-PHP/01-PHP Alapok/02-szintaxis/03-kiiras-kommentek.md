---
id: kiiras-kommentek
slug: /php-alapok/kiiras-kommentek
title: "Kiírás és kommentek"
---

# Kiírás és kommentek

A PHP-ban többféleképpen írhatunk ki szöveget és többféleképpen kommentelhetünk.

---

# Kiírás

## `echo`

```php
echo "Hello!";
```

## `print`

```php
print "Hello!";
```

## HTML + PHP együtt

```php
<h1>Üdv!</h1>

<?php
echo "<p>Ez egy bekezdés.</p>";
?>
```

---

# Kommentek

## Egysoros komment

```php
// Ez egy komment
```

## Többsoros komment

```php
/*
Ez egy
többsoros komment
*/
```

---

# Gyakorlófeladatok

1. Írj ki három különböző mondatot `echo` segítségével.
2. Készíts HTML oldalt, amelyben PHP-val generálsz egy listát.
3. Írj programot, amelyben legalább három kommentet használsz.

---

## Megjegyzés

- Érdemes utánanézni a heredoc és nowdoc szintaxisnak.
- Lásd még: HTML escaping, XSS alapok.
