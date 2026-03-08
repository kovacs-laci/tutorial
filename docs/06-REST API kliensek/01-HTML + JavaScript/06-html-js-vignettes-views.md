---
id: rest-api-client-js-vignettes-views
slug: /rest-api-client/js/vignettes-views
title: Matrica nézetek
---

# Matricák megjelenítése – `vignettes.views.js`

Ebben a fájlban két függvény található:

```text
renderVignetteTable
renderVignetteListTable
```

Mindkettő táblázatot generál, de más célra.

---
# Példa API válasz – Matricák listája

Az alábbi JSON egy tipikus REST API válasz, amelyet a matrica lista végpont ad vissza:

```json
{
  "data": [
    {
      "id": 1,
      "vehicle_id": 1,
      "type": "D2",
      "category": "Megyei",
      "region": "Baranya",
      "year": 2024,
      "valid_from": "2024-01-01",
      "valid_to": "2025-01-31",
      "vehicle": {
        "id": 1,
        "country_code": "H",
        "plate_number": "AAA001"
      }
    },
    {
      "id": 2,
      "vehicle_id": 2,
      "type": "D2",
      "category": "Heti",
      "region": null,
      "year": 2026,
      "valid_from": "2026-02-08",
      "valid_to": "2026-02-23",
      "vehicle": {
        "id": 2,
        "country_code": "H",
        "plate_number": "BBB234"
      }
    }
  ]
}
````

## Mit jelent ez az adatstruktúra?

* A fő lista a `data` tömb.
* A tömb elemei matricák.
* Minden matrica tartalmazza:

    * saját mezőit (pl. `type`, `year`)
    * egy `vehicle` objektumot.
* A `vehicle` egy beágyazott objektum, amely a kapcsolt jármű adatait tartalmazza.

Ez a struktúra lehetővé teszi, hogy a frontend egyetlen kérésből megjelenítse a matricát és a hozzá tartozó jármű adatait is.

---

# 1️ `renderVignetteTable(data)`

Ez a függvény:

* egy járműhöz tartozó matricákat jelenít meg
* beágyazott (embedded) táblázat formájában

Ez a nézet általában a járművek listájában jelenik meg.

---

## A kód

```js id="vtable1"
export function renderVignetteTable(data) {
    const vignettes = data.vignettes || [];
    if (vignettes.length === 0) return "<em>Nincs megjeleníthető adat.</em>";

    let html = `
        <table class="embedded">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Típus</th>
                    <th>Kategória</th>
                    <th>Megye</th>
                    <th>Év</th>
                    <th>Érvényesség kezdete</th>
                    <th>Érvényesség vége</th>
                </tr>
            </thead>
            <tbody>`;

    vignettes.forEach(v => {
        html += `
            <tr>
                <td>${v.id ?? ''}</td>
                <td>${v.type ?? ''}</td>
                <td>${v.category ?? ''}</td>
                <td>${v.region ?? ''}</td>
                <td>${v.year ?? ''}</td>
                <td>${v.valid_from ?? ''}</td>
                <td>${v.valid_to ?? ''}</td>
            </tr>`;
    });

    html += `</tbody></table>`;
    return html;
}
```

---

## Hogyan működik?

### 1 Adatok kinyerése

```js
const vignettes = data.vignettes || [];
```

Ez azt jelenti:

* ha van `vignettes` tömb → azt használja
* ha nincs → üres tömb lesz

Ez megakadályozza a hibákat.

---

### 2 Üres lista kezelése

Ha nincs matrica:

```js
return "<em>Nincs megjeleníthető adat.</em>";
```

Ez egy egyszerű üzenetet jelenít meg.

---

### 3️ Táblázat generálása

A függvény:

* létrehozza a HTML táblázatot
* végigmegy a matricákon
* minden matrica egy sor lesz

A `forEach` ciklus minden elemet feldolgoz.

---

### 4️ Megjelenített mezők

Ebben a nézetben ezek az adatok láthatók:

* ID
* Típus
* Kategória
* Megye
* Év
* Érvényesség kezdete
* Érvényesség vége

Ez a jármű listában beágyazott megjelenítéshez készült.

---

# 2️ `renderVignetteListTable(response)`

Ez a függvény egy **önálló matrica listát** jelenít meg.

Ez nem beágyazott nézet, hanem teljes lista oldal.

---

## A kód

```js id="vtable2"
export function renderVignetteListTable(response) {
    const vignettes = response.data || [];
    if (vignettes.length === 0) return "<em>Nincs megjeleníthető adat.</em>";

    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Típus</th>
                    <th>Kategória</th>
                    <th>Megye</th>
                    <th>Év</th>
                    <th>Érvényesség kezdete</th>
                    <th>Érvényesség vége</th>
                    <th>Országkód</th>
                    <th>Rendszám</th>
                </tr>
            </thead>
            <tbody>`;

    vignettes.forEach(v => {
        const country = v.vehicle?.country_code || '';
        const plate = v.vehicle?.plate_number || '';

        html += `
            <tr>
                <td>${v.id ?? ''}</td>
                <td>${v.type ?? ''}</td>
                <td>${v.category ?? ''}</td>
                <td>${v.region ?? ''}</td>
                <td>${v.year ?? ''}</td>
                <td>${v.valid_from ?? ''}</td>
                <td>${v.valid_to ?? ''}</td>
                <td>${country}</td>
                <td>${plate}</td>
            </tr>`;
    });

    html += `</tbody></table>`;
    return html;
}
```

---

## Hogyan működik ez a nézet?

### 1️ Adatok beolvasása

```js
const vignettes = response.data || [];
```

Itt az adatok a backend válaszából érkeznek.

---

### 2️ Kapcsolt adatok

Ebben a listában nemcsak a matrica adatai jelennek meg, hanem a hozzá tartozó jármű adatai is:

```js
v.vehicle?.country_code
v.vehicle?.plate_number
```

Ez azt jelenti, hogy:

* a matrica objektum tartalmaz egy `vehicle` mezőt
* ez egy beágyazott objektum
* ebből lehet kiolvasni az adatokat

Ez a frontend oldali nested objektum kezelés.

---

### 3️ Extra oszlopok

Ez a nézet két plusz információt is mutat:

* Országkód
* Rendszám

Ezért különbözik a beágyazott táblától.

---

# Mit tanulhatunk ebből a részből?

* Hogyan lehet HTML-t generálni JavaScript segítségével
* Hogyan kell kezelni azt az esetet, amikor nincs megjeleníthető adat
* Hogyan lehet tömböket feldolgozni JavaScriptben
* Hogyan működik a `forEach` ciklus
* Hogyan lehet beágyazott objektumok adatait elérni (például `v.vehicle`)
* Mi a különbség egy beágyazott nézet és egy önálló lista nézet között

---

# Összegzés

A `vignettes.views.js`:

* kizárólag megjelenítési logikát tartalmaz
* két külön táblázatot definiál
* kezeli a nested adatokat
* újrahasznosítható komponenseket biztosít
* jól illeszkedik a moduláris frontend felépítéshez
