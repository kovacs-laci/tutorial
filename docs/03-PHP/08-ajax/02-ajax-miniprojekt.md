---
id: ajax-miniproject
slug: /php/webes-mukodes/ajax-miniprojekt
title: "AJAX miniprojekt"
---

## Autókatalógus

Ebben a projektben a CSV-fájlok kezelése leckében elkészített hierarchikus asszociatív tömböt fogjuk felhasználni.

A cél egy háromszintű választó létrehozása:

```text
Ország
 ↓
Gyártó
 ↓
Modell
```

A gyártók listája mindig a kiválasztott országtól függ, a modellek listája pedig a kiválasztott gyártótól.

A projekt során az országokat már az oldal generálásakor kiírjuk PHP segítségével. AJAX kéréseket csak akkor küldünk a szervernek, amikor a felhasználó kiválaszt egy országot vagy egy gyártót.

Ez hatékonyabb és egyszerűbb megoldás, mint minden adatot AJAX segítségével lekérni.

### Fájlszerkezet

A projektben a következő fájlok lesznek:

```text
projekt/
├─ get-data.php
├─ ajax.php
├─ index.php
├─ app.js
└─ cars.csv
```

A `get-data.php` fájl tartalmazza a CSV feldolgozását, az `ajax.php` szolgálja ki a JavaScript kérését, az `index.php` mutatja a felületet, az `app.js` pedig a klienst vezérli.

---

## 1. lépés – A CSV fájl beolvasása

A korábbi leckében elkészítettük a `loadCars()` függvényt.

```php title="get-data.php"
function loadCars(): array
{
    if (!file_exists('cars.csv')) {
        return [];
    }

    $file = fopen('cars.csv', 'r');
    if ($file === false) {
        return [];
    }
    
    $cars = [];
    // Fejléc kihagyása
    fgetcsv($file);

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

A függvény egy hierarchikus asszociatív tömböt ad vissza:

```php
[
    'Germany' => [
        'Audi' => [
            'A8',
            'Q3',
            'S5'
        ],
        'BMW' => [
            'M3'
        ]
    ],

    'Japan' => [
        'Toyota' => [
            'Corolla',
            'RAV-4'
        ]
    ]
]
```

---

## 2. lépés – Az országlista kiírása PHP-val

Mivel az oldal generálásakor már rendelkezésünkre áll az összes ország, nincs szükség AJAX kérésre.

```php title="index.php"
<?php

require 'get-data.php';
$cars = loadCars();
?>

<select id="country">
    <option value="">
        Válassz országot
    </option>

    <?php foreach (array_keys($cars) as $country): ?>
        <option value="<?= $country ?>">
            <?= $country ?>
        </option>
    <?php endforeach; ?>

</select>
```

---

## 3. lépés – Az AJAX végpont létrehozása

Hozzunk létre egy `ajax.php` fájlt.

Ez a fájl lesz felelős a gyártók és modellek kiszolgálásáért.

```php title="ajax.php"
<?php

require 'get-data.php';

$cars = loadCars();

$action = $_GET['action'] ?? '';

header('Content-Type: application/json');

switch ($action) {

    case 'makes':

        $country =
            $_GET['country'] ?? '';

        echo json_encode(
            array_keys(
                $cars[$country] ?? []
            )
        );

        break;

    case 'models':

        $country =
            $_GET['country'] ?? '';

        $make =
            $_GET['make'] ?? '';

        echo json_encode(
            $cars[$country][$make] ?? []
        );

        break;

    default:

        echo json_encode([]);
}
```

---

## 4. lépés – A teljes HTML űrlap

```html title="index.php"

Adjuk hozzá a gyártók és modellek lenyíló listáit. A gyártó és modell lista kezdetben üres.


<select id="make">

    <option value="">
        Válassz gyártót
    </option>

</select>

<select id="model">

    <option value="">
        Válassz modellt
    </option>

</select>
```

---

## 5. lépés – Gyártók betöltése AJAX segítségével

Amikor a felhasználó országot választ, AJAX kérést küldünk a szervernek.

```javascript title="app.js"
const countrySelect =
    document.getElementById('country');

const makeSelect =
    document.getElementById('make');

countrySelect.addEventListener(
    'change',
    () => {

        makeSelect.innerHTML = `
            <option value="">
                Válassz gyártót
            </option>
        `;

        fetch(
            `ajax.php?action=makes&country=${countrySelect.value}`
        )
            .then(response => response.json())
            .then(makes => {

                makes.forEach(make => {

                    makeSelect.innerHTML += `
                        <option value="${make}">
                            ${make}
                        </option>
                    `;

                });

            });

    }
);
```

**Mi történik?**

A felhasználó például kiválasztja:

```text
Germany
```

A böngésző elküldi:

```text
ajax.php?action=makes&country=Germany
```

A PHP visszaküldi:

```json
[
    "Audi",
    "BMW",
    "Mercedes",
    "Volkswagen"
]
```

A JavaScript ezután létrehozza a megfelelő `<option>` elemeket.

---

## 6. lépés – Modellek betöltése

Ha a felhasználó kiválaszt egy gyártót, akkor a modelleket kérjük le.

```javascript title="app.js"
const modelSelect =
    document.getElementById('model');

makeSelect.addEventListener(
    'change',
    () => {

        modelSelect.innerHTML = `
            <option value="">
                Válassz modellt
            </option>
        `;

        fetch(
            `ajax.php?action=models&country=${countrySelect.value}&make=${makeSelect.value}`
        )
            .then(response => response.json())
            .then(models => {

                models.forEach(model => {

                    modelSelect.innerHTML += `
                        <option value="${model}">
                            ${model}
                        </option>
                    `;

                });

            });

    }
);
```

**Mi történik?**

A felhasználó kiválasztja:

```text
Germany
↓
Audi
```

A böngésző elküldi:

```text
ajax.php?action=models&country=Germany&make=Audi
```

A PHP például ezt válaszolja:

```json
[
    "A8",
    "Q3",
    "S5"
]
```

A JavaScript feltölti a harmadik lenyíló listát.

---

## Teljes JavaScript példa

```javascript title="app.js"
const countrySelect =
    document.querySelector('#country');

const makeSelect =
    document.querySelector('#make');

const modelSelect =
    document.querySelector('#model');

countrySelect.addEventListener(
    'change',
    () => {

        makeSelect.innerHTML = `
            <option value="">
                Válassz gyártót
            </option>
        `;

        modelSelect.innerHTML = `
            <option value="">
                Válassz modellt
            </option>
        `;

        fetch(
            `ajax.php?action=makes&country=${countrySelect.value}`
        )
            .then(response => response.json())
            .then(makes => {

                makes.forEach(make => {

                    makeSelect.innerHTML += `
                        <option value="${make}">
                            ${make}
                        </option>
                    `;

                });

            });

    }
);

makeSelect.addEventListener(
    'change',
    () => {

        modelSelect.innerHTML = `
            <option value="">
                Válassz modellt
            </option>
        `;

        fetch(
            `ajax.php?action=models&country=${countrySelect.value}&make=${makeSelect.value}`
        )
            .then(response => response.json())
            .then(models => {

                models.forEach(model => {

                    modelSelect.innerHTML += `
                        <option value="${model}">
                            ${model}
                        </option>
                    `;

                });

            });

    }
);
```

---

## Teljes index.php példa

```php title="index.php"
<?php

require 'get-data.php';

$cars = loadCars();

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Autókatalógus</title>
</head>
<body>

    <h1>Autókatalógus</h1>

    <select id="country">

        <option value="">
            Válassz országot
        </option>

        <?php foreach (array_keys($cars) as $country): ?>

            <option value="<?= $country ?>">
                <?= $country ?>
            </option>

        <?php endforeach; ?>

    </select>

    <select id="make">

        <option value="">
            Válassz gyártót
        </option>

    </select>

    <select id="model">

        <option value="">
            Válassz modellt
        </option>

    </select>

    <script src="app.js"></script>

</body>
</html>
```

---

## Teljes ajax.php példa

```php title="ajax.php"
<?php

require 'get-data.php';

$cars = loadCars();

$action = $_GET['action'] ?? '';

header('Content-Type: application/json');

switch ($action) {

    case 'makes':

        $country = $_GET['country'] ?? '';

        echo json_encode(
            array_keys(
                $cars[$country] ?? []
            )
        );

        break;

    case 'models':

        $country = $_GET['country'] ?? '';

        $make = $_GET['make'] ?? '';

        echo json_encode(
            $cars[$country][$make] ?? []
        );

        break;

    default:

        echo json_encode([]);
}
```

---

## A kész alkalmazás működése

```text
Oldal betöltése
      ↓
PHP kiírja az országokat
      ↓
Ország kiválasztása
      ↓
AJAX kérés
      ↓
Gyártók lekérése
      ↓
Gyártó kiválasztása
      ↓
AJAX kérés
      ↓
Modellek lekérése
```

---

:::tip Fontos gondolat

A JavaScript számára teljesen mindegy, hogy az adatok:

- CSV-fájlból,
- adatbázisból,
- vagy külső API-ból

származnak.

A frontend minden esetben ugyanazt a JSON választ kapja.
:::

:::tip További fejlesztési lehetőségek

A projekt könnyen továbbfejleszthető:

- gyártási év hozzáadása;
- keresőmező készítése;
- képek megjelenítése;
- adatok tárolása MySQL adatbázisban;
- autó részletes adatlap készítése.
:::

---

## Gyakorlófeladatok

1. Jelenítsd meg a kiválasztott országot, gyártót és modellt a lenyíló listák alatt.
2. Jelenítsd meg a kiválasztott autó teljes adatsorát.
3. Készíts negyedik lenyíló listát a gyártási év számára.
4. Alakítsd át a projektet úgy, hogy az adatok MySQL adatbázisból érkezzenek.
5. Készíts keresőmezőt, amely modellnév alapján szűri az autókat.
6. **(Haladó feladat)**

   Amikor a felhasználó országot választ, jelenítsd meg az ország zászlaját.
   
   Amikor a felhasználó gyártót választ, jelenítsd meg a gyártó logóját.
   
   Hozd létre a szükséges képmappákat, majd szerezz be néhány országzászlót és gyártói logót.
   
   A JavaScript segítségével jelenítsd meg a kiválasztott országhoz és gyártóhoz tartozó képet.
   
   Gondold végig, hogyan lehet a kiválasztott érték alapján dinamikusan meghatározni a betöltendő képfájl nevét.

<details>
<summary><strong>Megoldás</strong></summary>

**HTML kiegészítés**

Az országválasztó lista után:

```html
<img
    id="flag"
    src=""
    alt="Ország zászlaja"
    width="120"
    style="display:none;"
>
```

A gyártóválasztó lista után:

```html
<img
    id="logo"
    src=""
    alt="Gyártó logója"
    width="120"
    style="display:none;"
>
```

**JavaScript kiegészítés**

```javascript
const flagImage = document.getElementById('flag');

const logoImage = document.getElementById('logo');
```

**Zászló megjelenítése országválasztáskor**

A `countrySelect` eseménykezelő elejére:

```javascript
if (countrySelect.value) {
    flagImage.src = `images/flags/flag-${countrySelect.value}.png`;
    flagImage.alt = `${countrySelect.value} zászlója`;
    flagImage.style.display = 'inline';
} else {
    flagImage.style.display = 'none';
}
```

**A logó elrejtése országváltáskor**

```javascript
logoImage.style.display =
    'none';
```

**Logó megjelenítése gyártóválasztáskor**

A `makeSelect` eseménykezelő elejére:

```javascript
if (makeSelect.value) {
    logoImage.src = `images/logos/logo-${makeSelect.value}.png`;
    logoImage.alt = `${makeSelect.value} logója`;
    logoImage.style.display = 'inline';
} else {
    logoImage.style.display = 'none';
}
```

</details>
