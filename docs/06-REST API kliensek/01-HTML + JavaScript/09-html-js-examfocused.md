---
id: html_js_api_client_exam_version
slug: /rest-api-client/html-js/exam-version
title: Gyors megoldás
-------------------------------------------------------------------------

# Gyors megoldás: HTML + JavaScript REST API kliens

## Készítette: Király Gábor (13p/2025)

Ebben a leckében egy **egyszerű, gyors, feladatra optimalizált** HTML + JavaScript REST API klienst készítünk.

A cél nem a tökéletes architektúra, hanem:

* ✔ gyors implementáció
* ✔ jól olvasható megoldás
* ✔ működő adatlekérés
* ✔ két endpoint összekapcsolása
* ✔ minimális kód

---

# 🎯 Feladat

Adott két API végpont:

```text
GET /api/vehicles
GET /api/vignettes
```

A feladat:

* kérjük le mindkét adatot
* kapcsoljuk össze őket (`vehicle_id` alapján)
* jelenítsük meg egy HTML táblázatban

---

# 📄 Teljes megoldás (egy fájlban)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrica kliens</title>
</head>
<body>
    <h2>Matrica lista</h2>

    <table border="1">
        <thead>
            <tr>
                <th>Rendszám</th>
                <th>Típus</th>
                <th>Kategória</th>
                <th>Év</th>
                <th>Érvényes -tól</th>
                <th>Érvényes -ig</th>
            </tr>
        </thead>
        <tbody id="tabla"></tbody>
    </table>

    <script>
        fetch("http://localhost:8000/api/vehicles")
            .then(res => res.json())
            .then(vehiclesData => {

                fetch("http://localhost:8000/api/vignettes")
                    .then(res => res.json())
                    .then(vignettesData => {

                        const tabla = document.getElementById("tabla");

                        vignettesData.vignettes.forEach(vignette => {

                            const vehicle = vehiclesData.vehicles
                                .find(v => v.id == vignette.vehicle_id);

                            tabla.innerHTML += `
                                <tr>
                                    <td>${vehicle ? vehicle.plate_number : ""}</td>
                                    <td>${vignette.type}</td>
                                    <td>${vignette.category}</td>
                                    <td>${vignette.year}</td>
                                    <td>${vignette.valid_from}</td>
                                    <td>${vignette.valid_to}</td>
                                </tr>
                            `;
                        });

                    })
                    .catch(err => console.log("Hiba a matricák lekérésekor:", err));

            })
            .catch(err => console.log("Hiba a járművek lekérésekor:", err));
    </script>
</body>
</html>
```

---

# 🔎 A megoldás magyarázata

## 1️⃣ Első fetch – járművek lekérése

```javascript
fetch("http://localhost:8000/api/vehicles")
```

Ez visszaadja például:

```json
{
  "vehicles": [
    { "id": 1, "plate_number": "ABC-123" }
  ]
}
```

---

## 2️⃣ Második fetch – matricák lekérése

A második kérés az első `.then()` blokkjában történik.

```javascript
fetch("http://localhost:8000/api/vignettes")
```

Ez tartalmazza a `vehicle_id` mezőt, ami a kapcsolódási pont.

---

## 3️⃣ Az adatok összekapcsolása

Ez a kulcsrész:

```javascript
const vehicle = vehiclesData.vehicles
    .find(v => v.id == vignette.vehicle_id);
```

Itt történik az "összeJOIN-olás" frontend oldalon.

Ez gyakorlatilag egy:

```sql
JOIN vehicles ON vehicles.id = vignettes.vehicle_id
```

de JavaScriptben.

---

## 4️⃣ Táblázat feltöltése

```javascript
tabla.innerHTML += `
    <tr>
        <td>${vehicle ? vehicle.plate_number : ""}</td>
        ...
    </tr>
`;
```

Fontos rész:

```javascript
vehicle ? vehicle.plate_number : ""
```

Ez egy egyszerű biztonsági ellenőrzés:

* ha van jármű → kiírjuk
* ha nincs → üres mező

---

# ⚠ Miért gyors megoldás?

Ez a megoldás:

✔ Egy fájlban van
✔ Nem használ külön JS fájlt
✔ Nem használ async/await-et
✔ Nem használ keretrendszert
✔ Gyorsan leírható vizsgán
✔ Könnyen másolható

Viszont:

❌ Beágyazott fetch (nested promise)
❌ Nem optimális teljesítmény
❌ Nincs loading state
❌ Nincs komoly hibakezelés
❌ `innerHTML +=` nem ideális

---

# 🎓 Mire figyelj?

1. Mindig legyen `.catch()`
2. Használd a `find()`-ot kapcsoláshoz
3. Ne felejtsd el a `document.getElementById`
4. Ellenőrizd a JSON szerkezetet (`vehiclesData.vehicles`)
5. Ügyelj az URL-re (`localhost:8000`)

---

# 🧠 Haladóbb, de még egyszerűbb megoldás (async/await)

Ha megengedett:

```javascript
<script>
async function loadData() {
    try {
        const vehiclesRes = await fetch("http://localhost:8000/api/vehicles");
        const vehiclesData = await vehiclesRes.json();

        const vignettesRes = await fetch("http://localhost:8000/api/vignettes");
        const vignettesData = await vignettesRes.json();

        const tabla = document.getElementById("tabla");

        vignettesData.vignettes.forEach(vignette => {
            const vehicle = vehiclesData.vehicles
                .find(v => v.id == vignette.vehicle_id);

            tabla.innerHTML += `
                <tr>
                    <td>${vehicle ? vehicle.plate_number : ""}</td>
                    <td>${vignette.type}</td>
                    <td>${vignette.category}</td>
                    <td>${vignette.year}</td>
                    <td>${vignette.valid_from}</td>
                    <td>${vignette.valid_to}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.log("Hiba:", err);
    }
}

loadData();
</script>
```

---

# 📌 Összegzés

Ez a megoldás:

* egyszerű
* működőképes
* frontend oldali adatkapcsolást mutat
* REST API integráció alapjait demonstrálja
* gyorsan reprodukálható

Ha ezt biztosan tudod, akkor a HTML + JS REST kliens alapfeladatát stabilan meg tudod oldani. 🚀
