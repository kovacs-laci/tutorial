---
id: csv
slug: /php-alapok/csv
title: "CSV fájlok kezelése"
---

# CSV fájlok kezelése

A CSV (Comma Separated Values) egyszerű, szöveges formátum táblázatos adatok tárolására.  
PHP-ban könnyen olvasható és írható.

---

# CSV olvasása – `fgetcsv()`

```php
$fp = fopen("diakok.csv", "r");

while (($sor = fgetcsv($fp, 1000, ";")) !== false) {
    echo $sor[0] . " - " . $sor[1] . "<br>";
}

fclose($fp);
```

---

# CSV írása – `fputcsv()`

```php
$fp = fopen("diakok.csv", "a");

$ujDiak = ["Kata", 16, "10.B"];
fputcsv($fp, $ujDiak, ";");

fclose($fp);
```

---

# Komplett példa – diáklista kezelése

```php
$diakok = [
    ["Anna", 15, "9.A"],
    ["Béla", 16, "10.B"],
    ["Csaba", 17, "11.C"]
];

$fp = fopen("diakok.csv", "w");

foreach ($diakok as $diak) {
    fputcsv($fp, $diak, ";");
}

fclose($fp);
```

---

# Gyakorlófeladatok

1. Hozz létre egy `diakok.csv` fájlt, és olvasd be a tartalmát.
2. Adj hozzá egy új diákot a CSV-hez.
3. Készíts programot, amely kiírja a CSV fájl sorainak számát.
4. Írd ki a CSV tartalmát HTML táblázatként.

---

## Megjegyzés

- Érdemes utánanézni a CSV és az Excel közötti különbségeknek.
- Lásd még: UTF‑8 kódolás, BOM problémák.
