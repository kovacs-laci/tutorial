---
id: csv
slug: /php/fajlkezeles/csv
title: "CSV fájlok kezelése"
---

A CSV (Comma Separated Values) egyszerű, szöveges formátum táblázatos adatok tárolására.  
PHP-ban könnyen olvasható és írható.

---

## CSV olvasása – `fgetcsv()`

```php
$file = fopen("diakok.csv", "r");

while (($sor = fgetcsv($file, 1000, ";")) !== false) {
    echo $sor[0] . " - " . $sor[1] . "<br>";
}

fclose($file);
```

---

## CSV írása – `fputcsv()`

```php
$file = fopen("diakok.csv", "a");

$ujDiak = ["Kata", 16, "10.B"];
fputcsv($file, $ujDiak, ";");

fclose($file);
```

---

## Komplett példa – diáklista kezelése

```php
$diakok = [
    ["Anna", 15, "9.A"],
    ["Béla", 16, "10.B"],
    ["Csaba", 17, "11.C"]
];

$file = fopen("diakok.csv", "w");

foreach ($diakok as $diak) {
    fputcsv($file, $diak, ";");
}

fclose($file);
```

---

## Hierarchikus asszociatív tömb létrehozása CSV állományból

A CSV-fájlok nemcsak rekordlistaként dolgozhatók fel, hanem olyan többszintű asszociatív tömbbé is alakíthatók, amely jobban tükrözi az adatok közötti kapcsolatokat.

A példában egy autókat tartalmazó CSV-fájllal fogunk dolgozni amely az alábbi linkről letölthető:

[cars.csv](/files/cars.csv)

A fájl tartalma:

```csv
country,make,model
Germany,Audi,A8
Germany,Audi,Q3
Germany,Audi,S5
Germany,Volkswagen,Golf
Germany,Volkswagen,Passat
Japan,Toyota,Corolla
Japan,Toyota,RAV-4
Japan,Mazda,626
...
```

A cél egy olyan hierarchikus struktúra létrehozása, amelyben az országok alatt találhatók a gyártók, a gyártók alatt pedig a modellek:

```php
[
    'Germany' => [
        'Audi' => [
            'A4',
            'A5',
            'S6'
        ],

        'Volkswagen' => [
            'Golf',
            'Passat',
            'T-Roc'
        ],

        'BMW' => [
            'X5'
        ]
    ],

    'Japan' => [
        'Mazda' => [
            'MX5',
            'Xedos'
        ],

        'Toyota' => [
            'Prius',
            'Corolla'
        ]
    ]
]
```

### A CSV beolvasása ebbe a struktúrába

```php
function loadCars(): array
{
	$filename = "cars.csv";
	
    if (!file_exists(filename)) {
		echo "$filename file not found!";
        return [];
    }

    $file = fopen('cars.csv', 'r');
	if ($file === false) {
		echo "Couldn't open $filename file!";
        return [];
    }
	
    // fejléc kihagyása
    fgetcsv($file);
	
    $cars = [];
    while (($row = fgetcsv($file)) !== false) {
        $country = $row[0];
        $make = $row[1];
        $model = $row[2];
        $cars[$country][$make][] = $model;
    }
    fclose($file);
	
    return $cars;
}

```

Az alábbi CSV-sor:

```csv
Germany,Audi,A4
```

a következő utasítást eredményezi:

```php
$cars['Germany']['Audi'][] = 'A4';
```

A következő sor:

```csv
Germany,Audi,A5
```

ugyanahhoz a gyártóhoz hozzáfűzi az új modellt:

```php
$cars['Germany']['Audi'][] = 'A5';
```

A ciklus minden beolvasott sor esetén tovább építi a tömböt, amíg kialakul az ország → gyártó → modell hierarchia.

### Kapcsolat relációs adatbázisokkal

A fenti struktúra hasonló kapcsolatot ír le, mint amit relációs adatbázisokban is gyakran használunk:

```text
Ország
 └─ Gyártó
     └─ Modell
```

Ebben a példában:

- egy országhoz több gyártó tartozhat;
- egy gyártóhoz több modell tartozhat.

A hierarchikus asszociatív tömbök lehetővé teszik, hogy az egymáshoz kapcsolódó adatokat természetes módon csoportosítsuk és kezeljük PHP-ben.

---

## Gyakorlófeladatok

1. Hozz létre egy `diakok.csv` fájlt, és olvasd be a tartalmát.
2. Adj hozzá egy új diákot a CSV-hez.
3. Készíts programot, amely kiírja a CSV fájl sorainak számát.
4. Írd ki a CSV tartalmát HTML táblázatként.

---

## Megjegyzés

- Érdemes utánanézni a CSV és az Excel közötti különbségeknek.
- Lásd még: UTF‑8 kódolás, BOM problémák.
