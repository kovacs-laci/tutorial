---
id: ajax
slug: /php/webes-mukodes/ajax
title: "AJAX és Fetch API"
---

Az előző leckékben a PHP minden kérésre egy teljes HTML oldalt állított elő.

Az AJAX (Asynchronous JavaScript and XML) lehetővé teszi, hogy a böngésző a már betöltött oldalról további kéréseket küldjön a szervernek anélkül, hogy az egész oldalt újra kellene tölteni.

A modern webalkalmazások többsége AJAX-kéréseket használ adatok lekérésére, keresésre, szűrésre vagy dinamikus tartalom betöltésére.

### Példák fájljai

A leckében szereplő kódrészletek mindig jelezni fogják, hogy melyik fájlhoz tartoznak. A leggyakoribb szerkezet:

```text
projekt/
├─ index.html
├─ app.js
├─ ajax.php
└─ ...
```

A `fetch()` által küldött URL mindig a böngésző által elérhető fájlhoz kötődik, ezért a példákban a PHP és a JavaScript fájljainak ugyanabban a mappában kell lenniük.

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

```php title="ajax.php"
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

A legegyszerűbb példa egy gombra kattintva betölt egy JSON adatokat tartalmazó PHP-végpontot. Ahhoz, hogy a JavaScript lefusson, az `index.html` oldal alján be kell hívni az `app.js` fájlt.

```html title="index.html"
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>AJAX példa</title>
</head>
<body>

    <button id="loadButton">
        Adatok betöltése
    </button>

    <script src="app.js"></script>

</body>
</html>
```

```javascript title="app.js"
fetch('ajax.php')
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

```javascript title="app.js"
fetch('ajax.php?country=Germany')
    .then(response => response.json())
    .then(data => {

        console.log(data);

    });
```

PHP oldalon:

```php title="ajax.php"
$country = $_GET['country'] ?? '';
```

A lekért paraméter ugyanúgy működik, mint amikor egy URL-ben szerepel.

---

## Egyszerű API-végpont

Ahelyett, hogy minden művelethez külön PHP-fájlt készítenénk, gyakran egyetlen végpont szolgálja ki a kéréseket.

```php title="ajax.php"
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

```javascript title="app.js"
fetch('ajax.php?action=cars')
```

---

## Kapcsolat a CSV-leckével

A CSV-fájlok kezelése leckében az autóadatokat hierarchikus asszociatív tömbbé alakítottuk:

```php title="get-data.php"
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

```php title="get-data.php"
array_keys($cars);
```

Az országok.

```php title="get-data.php"
array_keys($cars['Germany']);
```

A német gyártók.

```php title="get-data.php"
$cars['Germany']['Audi'];
```

Az Audi modellek.

A böngésző ezekhez az adatokhoz AJAX-kérésekkel is hozzáférhet.

---

## HTML tartalom frissítése AJAX segítségével

A korábbi példákban a lekért adatokat csak a konzolra írtuk ki. A gyakorlatban azonban az AJAX egyik legfontosabb feladata, hogy a már megjelenített oldal tartalmát módosítsa újratöltés nélkül.

:::note Miért külön fájlban van a JavaScript?

Kisebb példákban a JavaScript közvetlenül a HTML-fájlban is elhelyezhető egy `<script>` elemben. Nagyobb projektekben azonban a JavaScriptet általában külön `.js` fájlokban tároljuk, mert így az alkalmazás áttekinthetőbbé és könnyebben karbantarthatóvá válik.

:::

### PHP végpont

```php title="ajax.php"
<?php

header('Content-Type: application/json');

echo json_encode([
    'name' => 'Audi'
]);
```

### HTML oldal

```html title="index.html"
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>AJAX példa</title>
</head>
<body>

    <button id="loadButton">Adatok betöltése</button>

    <div id="result">
        Még nincs adat betöltve.
    </div>

    <script src="app.js"></script>

</body>
</html>
```

Az alábbi sor betölti és futtatja az `app.js` állományt:

```html title="index.html"
<script src="app.js"></script>
```


### JavaScript

```javascript title="app.js"
document.getElementById('loadButton').addEventListener('click', () => {
    fetch('ajax.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML =
                `<h3>${data.name}</h3>`;
        });
});
```

### Mi történik?

1. A böngésző betölti az `index.html` oldalt.
2. Az oldal alján található `<script src="app.js"></script>` elem betölti az `app.js` fájlt.
3. Az `app.js` figyeli a gomb kattintását.
4. Kattintáskor az `app.js` `fetch()` segítségével elküld egy HTTP-kérést az `ajax.php` fájlnak.
5. Az `ajax.php` JSON formátumban visszaküldi az adatot.
6. Az `app.js` lecseréli a `result` azonosítójú HTML elem tartalmát.

Kezdeti állapot:

```html
<div id="result">
    Még nincs adat betöltve.
</div>
```

Kattintás után:

```html
<div id="result">
    <h3>Audi</h3>
</div>
```

Az oldal nem töltődik újra, csak a kijelölt HTML-elem tartalma változik meg. Ez az AJAX egyik legfontosabb előnye.

:::tip Mire használják ezt a technikát?

A modern webalkalmazások gyakran így frissítik:

- a keresési találatokat;
- a terméklistákat;
- a chat üzeneteket;
- az értesítéseket;
- a táblázatok tartalmát.

Ilyenkor a szerver általában JSON adatot küld vissza, a JavaScript pedig abból új HTML-t épít fel és megjeleníti azt.

:::

### Tömb megjelenítése listaként

Gyakori eset, hogy a PHP nem egyetlen értéket, hanem egy tömböt küld vissza.

### PHP végpont

```php title="ajax.php"
<?php

header('Content-Type: application/json');

echo json_encode([
    'Audi',
    'BMW',
    'Tesla'
]);
```

### HTML oldal

```html title="index.html"
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>AJAX példa</title>
</head>
<body>

    <button id="loadButton">Autók betöltése</button>

    <div id="result"></div>

    <script src="app.js"></script>

</body>
</html>
```

### JavaScript

```javascript title="app.js"
document.getElementById('loadButton').addEventListener('click', () => {
    fetch('ajax.php')
        .then(response => response.json())
        .then(cars => {
            document.getElementById('result').innerHTML =
                '<ul>' +
                cars.map(car => `<li>${car}</li>`).join('') +
                '</ul>';
        });
});
```

### Mi történik?

Az `ajax.php` három autómárkát tartalmazó JSON tömböt küld vissza:

```json
[
    "Audi",
    "BMW",
    "Tesla"
]
```

Az `app.js` minden tömbelemből egy `<li>` elemet készít, majd az elkészült lista HTML-kódját a `result` elembe helyezi.

Eredmény:

```html
<ul>
    <li>Audi</li>
    <li>BMW</li>
    <li>Tesla</li>
</ul>
```

Ebben a példában a JavaScript a JSON tömb elemeiből HTML listát készít, majd lecseréli a `result` elem tartalmát. Ez a megoldás alapja a később elkészíthető ország → gyártó → modell választóknak, keresési találati listáknak és más dinamikus felületeknek.

---

### Lenyíló lista dinamikus feltöltése

A listás példánál sokszor nem `<li>` elemeket, hanem egy `<select>` elemben megjelenő opciókat kell generálni.

### PHP végpont

```php title="ajax.php"
<?php

header('Content-Type: application/json');

echo json_encode([
    'Audi',
    'BMW',
    'Tesla'
]);
```

### HTML oldal

```html title="index.html"
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>AJAX példa</title>
</head>
<body>

    <button id="loadButton">Autók betöltése</button>

    <select id="carSelect">
        <option value="">Válassz autót...</option>
    </select>

    <script src="app.js"></script>

</body>
</html>
```

### JavaScript

```javascript title="app.js"
document.getElementById('loadButton').addEventListener('click', () => {
    fetch('ajax.php')
        .then(response => response.json())
        .then(cars => {
            const select = document.getElementById('carSelect');

            select.innerHTML = '<option value="">Válassz autót...</option>';

            for (const car of cars) {
                const option = document.createElement('option');
                option.value = car;
                option.textContent = car;
                select.appendChild(option);
            }
        });
});
```

### Mi történik?

Az `ajax.php` a korábbihoz hasonlóan egy JSON tömböt küld vissza:

```json
[
    "Audi",
    "BMW",
    "Tesla"
]
```

Az `app.js` ezután minden elemhez létrehoz egy `<option>` elemet, és beírja a `select` elembe. A felhasználó ezután a legördülő listából kiválaszthat egy autómárkát.

Eredmény:

```html
<select id="carSelect">
    <option value="">Válassz autót...</option>
    <option value="Audi">Audi</option>
    <option value="BMW">BMW</option>
    <option value="Tesla">Tesla</option>
</select>
```

Ez a megoldás különösen hasznos lesz országok, gyártók, kategóriák vagy termékek dinamikus feltöltéséhez, amikor a felhasználó a lehetőségekből választ.

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
