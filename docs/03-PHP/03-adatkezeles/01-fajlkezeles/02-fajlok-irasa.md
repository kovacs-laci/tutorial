---
id: fajlok-iras
slug: /php-alapok/fajlok-iras
title: "Fájlok írása"
---

# Fájlok írása

A PHP segítségével fájlokba is írhatunk adatot.  
Ez lehet naplózás, egyszerű adatmentés vagy konfigurációk tárolása.

---

# `file_put_contents()`

A legegyszerűbb mód fájlba írni.

```php
file_put_contents("naplo.txt", "Első bejegyzés");
```

Felülírja a fájlt.  
Hozzáfűzés:

```php
file_put_contents("naplo.txt", "Új sor\n", FILE_APPEND);
```

---

# `fopen()` + `fwrite()`

```php
$fp = fopen("naplo.txt", "a"); // a = append

fwrite($fp, "Bejegyzés: " . date("Y-m-d H:i:s") . "\n");

fclose($fp);
```

---

# Fájl létrehozása, ha nem létezik

```php
if (!file_exists("adat.txt")) {
    file_put_contents("adat.txt", "Kezdő tartalom");
}
```

---

# Gyakorlófeladatok

1. Készíts naplófájlt, amely minden futáskor hozzáfűzi az aktuális időt.
2. Írj programot, amely egy űrlapból érkező üzenetet fájlba ment.
3. Készíts programot, amely egy fájlba 1–10-ig kiírja a számokat.

---

## Megjegyzés

- Érdemes utánanézni a fájlzárás (`flock()`) működésének.
- Lásd még: fájlok írása bináris módban.
