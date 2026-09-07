---
id: fajlok-olvasasa
slug: /php-alapok/fajlok-olvasasa
title: "Fájlok olvasása"
---

# Fájlok olvasása

A PHP lehetővé teszi, hogy fájlok tartalmát beolvassuk és feldolgozzuk.  
Ez gyakran hasznos naplózásnál, konfigurációknál vagy egyszerű adatkezelésnél.

---

# `file_get_contents()`

A legegyszerűbb mód egy fájl teljes tartalmának beolvasására.

```php
$tartalom = file_get_contents("adat.txt");
echo $tartalom;
```

---

# `file()` – fájl soronként tömbbe

```php
$sorok = file("adat.txt");

foreach ($sorok as $sor) {
    echo $sor . "<br>";
}
```

---

# `fopen()` + `fgets()` – fájl soronkénti olvasása

```php
$fp = fopen("adat.txt", "r");

while (!feof($fp)) {
    $sor = fgets($fp);
    echo $sor . "<br>";
}

fclose($fp);
```

---

# Gyakorlófeladatok

1. Hozz létre egy `uzenet.txt` fájlt, és olvasd be a tartalmát.
2. Írd ki egy fájl sorait számozva (1. sor: ..., 2. sor: ...).
3. Olvasd be egy fájl tartalmát tömbbe, majd írd ki visszafelé.

---

## Megjegyzés

- Érdemes utánanézni a fájlkezelési hibák kezelésének (`file_exists()`, `is_readable()`).
- Lásd még: fájlműveletek jogosultságai Linux alatt.
