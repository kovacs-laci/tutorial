---
id: html-js-vehicles-view
slug: /rest-api-client/html-js/vehicles-view
title: Járművek nézetei
---

# Járművek nézetei – `vehicles.views.js`

A `vehicles.views.js` modul feladata a járművekről érkező REST API válasz HTML formátummá alakítása.

Ez a réteg:

- kizárólag megjelenítési logikát tartalmaz,
- nem végez API-hívásokat,
- nem tartalmaz üzleti szabályokat,
- a `main.js` által kapott adatot alakítja át HTML-re.

A modul támogatja a beágyazott megjelenítést is, amely az 1:n kapcsolat vizuális megjelenítését teszi lehetővé.

---

# Adatstruktúra – hogyan érkeznek az adatok?

A backend a következő struktúrában küldi a járművek listáját:

```json
{
  "data": [
    {
      "id": 3,
      "country_code": "H",
      "plate_number": "CCC567",
      "vignettes": [
        {
          "id": 3,
          "type": "Éves",
          "category": "Éves",
          "region": null,
          "year": 2026,
          "valid_from": "2026-01-01",
          "valid_to": "2027-01-31"
        },
        {
          "id": 4,
          "type": "U",
          "category": "Megyei",
          "region": null,
          "year": 2026,
          "valid_from": "2026-01-01",
          "valid_to": "2027-01-31"
        }
      ]
    }
  ]
}
````

## Az adatstruktúra jelentése

* A `data` tömb tartalmazza a járműveket.
* Minden jármű tartalmaz egy `vignettes` tömböt.
* A `vignettes` egy vagy több matricát tartalmaz.

Ez azt jelenti, hogy:

**egy járműhöz több matrica is tartozhat (1:n kapcsolat).**

A nézet ezt a struktúrát használja fel a megjelenítéshez.

---

# A vehicles.views.js kódja

```js
import { renderVignetteTable } from './vignettes.views.js';

export function renderVehicleForm(data = {}) {
    const country = data.country_code ?? '';
    const plate = data.plate_number ?? '';

    return `
        <div class="modal-overlay">
            <div class="modal">
                <h2>${data.id ? 'Jármű szerkesztése' : 'Új jármű'}</h2>
                <form id="vehicleForm">
                    <label>Országkód<br>
                        <input name="country_code" value="${country}" required>
                    </label>

                    <label>Rendszám<br>
                        <input name="plate_number" value="${plate}" required>
                    </label>

                    <div class="form-actions">
                        <button type="submit">Mentés</button>
                        <button type="button" id="cancelVehicle">Mégse</button>
                    </div>

                    <div id="vehicleFormError" class="error"></div>
                </form>
            </div>
        </div>
    `;
}
```

Ez a függvény egy űrlapot generál új jármű létrehozásához vagy szerkesztéséhez.

---

```js
export function renderVehicleTable(response) {
    const vehicles = response.data || [];

    if (vehicles.length === 0)
        return "<em>Nincs megjeleníthető adat.</em>";

    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Országkód</th>
                    <th>Rendszám</th>
                    <th>Matricák</th>
                </tr>
            </thead>
            <tbody>`;

    vehicles.forEach(v => {
        html += `
            <tr>
                <td>${v.id ?? ''}</td>
                <td>${v.country_code ?? ''}</td>
                <td>${v.plate_number ?? ''}</td>
                <td class="embedded-cell">
                    ${renderVignetteTable({ vignettes: v.vignettes ?? [] })}
                </td>
            </tr>`;
    });

    html += `</tbody></table>`;
    return html;
}
```

Ez a függvény jeleníti meg a járművek (szülő) listáját a beágyazott matricák (gyerekek) táblázattal.
---

# A nézet működése

## 1 Bemenet

A függvény a backend válaszát várja, amelyben:

```js
response.data
```

tartalmazza a járművek tömbjét.

---

## 2 Üres állapot kezelése

Ha nincs adat, a függvény egyszerű üzenetet ad vissza:

```html
<em>Nincs megjeleníthető adat.</em>
```

Ez megakadályozza az üres táblázat megjelenítését.

---

## 3️ Táblázat generálás

* Minden jármű egy sor lesz.
* A jármű mezői közvetlenül a táblázatba kerülnek.
* A `forEach` ciklus végigiterál a tömbön.

---

## 4️ Beágyazott matricák megjelenítése

A matricák megjelenítése külön függvény feladata:

```js
renderVignetteTable({ vignettes: v.vignettes ?? [] })
```

Ez a megoldás:

* újrafelhasználható,
* moduláris,
* tiszta felelősség-szétválasztást biztosít.

---

# A beágyazott nézetek szerepe

A járművek nézete a matricák nézetét használja fel.

Ez azt jelenti, hogy:

* a matricák megjelenítése külön komponens,
* a jármű nézet csak beilleszti azt,
* a kód nem ismétlődik,
* az 1:n kapcsolat vizuálisan megjelenik.

---

# Összegzés

A `vehicles.views.js`:

* REST API választ alakít HTML-pé,
* kezeli az üres adatot,
* megjeleníti a járművek listáját,
* beágyazott matricatáblázatot használ,
* moduláris és újrafelhasználható,
* kizárólag megjelenítési logikát tartalmaz.

Ez a nézet jól szemlélteti a hierarchikus adatok frontend oldali kezelését.
