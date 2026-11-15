---
id: ajax
slug: /php/webes-mukodes/ajax
title: "AJAX és Fetch API"
---

Az előző leckékben a PHP minden kérésre egy teljes HTML oldalt állított elő.

Az AJAX (Asynchronous JavaScript and XML) lehetővé teszi, hogy a böngésző a már betöltött oldalról további kéréseket küldjön a szervernek anélkül, hogy az egész oldalt újra kellene tölteni.

A modern webalkalmazások többsége AJAX-kéréseket használ adatok lekérésére, keresésre, szűrésre vagy dinamikus tartalom betöltésére.

---

## Hogyan működik?

Hagyományos működés:

```text
Böngésző
    ↓ kérés
PHP
    ↓ HTML
Böngésző
```

AJAX használatakor:

```text
Böngésző
    ↓ fetch()
PHP
    ↓ JSON
JavaScript
    ↓
HTML frissítése
```

A PHP ilyenkor nem HTML-t, hanem általában JSON adatot küld vissza.

---

## JSON válasz készítése PHP-ban

```php
<?php

header('Content-Type: application/json');

$data = [
    'name' => 'Audi',
    'models' => ['A8', 'Q3', 'S5']
];

echo json_encode($data);
```

A válasz:

```json
{
    "name": "Audi",
    "models": [
        "A8",
        "Q3",
        "S5"
    ]
}
```

---

## Az első fetch() kérés

```html
<button id="loadButton">
    Adatok betöltése
</button>
```

```javascript
fetch('api.php')
    .then(response => response.json())
    .then(data => {

        console.log(data);

    });
```

A `fetch()` HTTP-kérést küld a szervernek.

A `response.json()` a JSON választ JavaScript objektummá alakítja.

---

## Paraméterek küldése

A korábban tanult GET paraméterek AJAX-kérésekben is használhatók.

```javascript
fetch('api.php?country=Germany')
    .then(response => response.json())
    .then(data => {

        console.log(data);

    });
```

PHP oldalon:

```php
$country = $_GET['country'] ?? '';
```

A lekért paraméter ugyanúgy működik, mint amikor egy URL-ben szerepel.

---

## Egyszerű API-végpont

Ahelyett, hogy minden művelethez külön PHP-fájlt készítenénk, gyakran egyetlen végpont szolgálja ki a kéréseket.

```php
<?php

$action = $_GET['action'] ?? '';

switch ($action) {

    case 'cars':
        echo json_encode([
            'Audi',
            'BMW',
            'Tesla'
        ]);
        break;

    case 'fruits':
        echo json_encode([
            'Alma',
            'Banán',
            'Narancs'
        ]);
        break;

    default:
        echo json_encode([]);
}
```

Kérés:

```javascript
fetch('api.php?action=cars')
```

---

## Kapcsolat a CSV-leckével

A CSV-fájlok kezelése leckében az autóadatokat hierarchikus asszociatív tömbbé alakítottuk:

```php
$cars = [
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
];
```

Egy ilyen struktúrából egyszerűen kinyerhetők:

```php
array_keys($cars);
```

Az országok.

```php
array_keys($cars['Germany']);
```

A német gyártók.

```php
$cars['Germany']['Audi'];
```

Az Audi modellek.

A böngésző ezekhez az adatokhoz AJAX-kérésekkel is hozzáférhet.

---

## Mire használható az AJAX?

Néhány gyakori példa:

- automatikus keresőmezők;
- függő lenyíló listák;
- terméklisták szűrése;
- chat alkalmazások;
- értesítések;
- időjárás- vagy árfolyamadatok frissítése;
- adatbázisból betöltött adatok megjelenítése.

---

## Összefoglalás

- Az AJAX lehetővé teszi, hogy a böngésző az oldal újratöltése nélkül kérjen adatokat a szervertől.
- A modern JavaScriptben a leggyakoribb megoldás a `fetch()` használata.
- A PHP gyakran JSON formátumban küldi vissza az adatokat.
- A GET paraméterek AJAX-kérésekben ugyanúgy használhatók, mint korábban.
- A CSV-leckében létrehozott hierarchikus asszociatív tömbökből egyszerűen készíthetők AJAX-on keresztül lekérdezhető adatszerkezetek.

---

## Gyakorlófeladatok

1. Készíts PHP-végpontot, amely egy tömböt JSON formában visszaad.
2. Írj JavaScript kódot, amely a `fetch()` segítségével lekéri és kiírja az adatokat a konzolra.
3. Küldj GET paramétert a PHP-végpontnak, és jeleníts meg eltérő adatokat a paraméter értékétől függően.
4. A CSV-leckében elkészített `cars.csv` állomány alapján add vissza egy kiválasztott ország gyártóit JSON formában.
5. Készíts ország → gyártó → modell választót az AJAX és a hierarchikus asszociatív tömb felhasználásával.
