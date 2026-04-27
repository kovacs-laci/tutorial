---
id: nodejs-rest-api
slug: /nodejs/rest-api
title: "Node.js REST API"
---

# Node.js REST API

## 1️⃣ A feladat célja

Ebben a tananyagban egy **Node.js + Express** alapú REST API-t készítünk, amely két adattáblából dolgozik:

### Adatbázis táblák

**counties**

```text
id | name
```

**cities**

```text
id | county_id | name | zip_code
```

Kapcsolat:

*   **1 megye → több város**
*   Ez pontosan megegyezik a Laravel `hasMany` kapcsolattal.

Laravelben így kérnénk le:

```php
County::with('cities')->get();
```

Node.js-ben ezt **kézzel** valósítjuk meg.

***

## 2️⃣ Teljes alap kód (Express + MySQL)

```js
var express = require('express')
var cors = require('cors')
var app = express()
const mysql = require('mysql2');

// middleware-ek
app.use(cors())
app.use(express.json())

// adatbázis kapcsolat
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'zip-api',
}).promise();
```

### Mit csinál ez?

*   `express.json()` → JSON adatokat tudunk fogadni
*   `cors()` → frontend hívhatja az API-t
*   `mysql2/promise` → async/await használata

***

## 3️⃣ GET /counties

### (Laravel `with()`‑szerű lekérdezés + keresés)

### URL

```http
GET /counties
GET /counties?needle=bud
```

***

### Kód

```js
app.get('/counties', async (req, res) => {
  try {
    const needle = req.query.needle || '';

    const [rows] = await pool.query(
      `
      SELECT
        counties.id   AS county_id,
        counties.name AS county_name,

        cities.id        AS city_id,
        cities.county_id AS city_county_id,
        cities.name      AS city_name,
        cities.zip_code  AS city_zip_code
      FROM counties
      LEFT JOIN cities ON counties.id = cities.county_id
      WHERE counties.name LIKE ?
         OR cities.name LIKE ?
      ORDER BY counties.name, cities.name
      `,
      [`%${needle}%`, `%${needle}%`]
    );

    const counties = {};

    for (const row of rows) {
      if (!counties[row.county_id]) {
        counties[row.county_id] = {
          id: row.county_id,
          name: row.county_name,
          cities: []
        };
      }

      if (row.city_id !== null) {
        counties[row.county_id].cities.push({
          id: row.city_id,
          county_id: row.city_county_id,
          name: row.city_name,
          zip_code: row.city_zip_code
        });
      }
    }

    res.status(200).json({
      data: Object.values(counties)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt' });
  }
});
```

***

### Mit tanulunk ebből?

✅ **LEFT JOIN**  
→ akkor is visszatér a megye, ha nincs városa

✅ **JS-es csoportosítás**  
→ itt történik az, amit Laravelben a `with()` csinál

✅ **needle keresés**  
→ megyére ÉS városra is keres

***

### Példa válasz (JSON)

```json
{
  "data": [
    {
      "id": 1,
      "name": "Pest",
      "cities": [
        { "id": 10, "county_id": 1, "name": "Budapest", "zip_code": "1051" },
        { "id": 11, "county_id": 1, "name": "Szentendre", "zip_code": "2000" }
      ]
    }
  ]
}
```

***

## 4️⃣ POST /counties

### Új megye felvétele

### URL

```http
POST /counties
```

### JSON input

```json
{
  "name": "Baranya"
}
```

### Kód

```js
app.post('/counties', async (req, res) => {
  try {
    const name = req.body.name;

    const [result] = await pool.query(
      'INSERT INTO counties (name) VALUES (?)',
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name: name
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt' });
  }
});
```

### JSON válasz

```json
{
  "id": 7,
  "name": "Baranya"
}
```

***

## 5️⃣ PUT /counties/:id

### Megye módosítása

### URL

```http
PUT /counties/7
```

### JSON input

```json
{
  "name": "Új Baranya"
}
```

### Kód

```js
app.put('/counties/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const [result] = await pool.query(
      'UPDATE counties SET name = ? WHERE id = ?',
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json([]);
    }

    res.json({
      id: id,
      name: name
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt' });
  }
});
```

***

## 6️⃣ DELETE /counties/:id

### Megye törlése

### URL

```http
DELETE /counties/7
```

### Kód

```js
app.delete('/counties/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await pool.query(
      'DELETE FROM counties WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json([]);
    }

    res.status(204).json([]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt' });
  }
});
```

***

## 7️⃣ POST /cities

### Új város felvétele

### URL

```http
POST /cities
```

### JSON input

```json
{
  "county_id": 1,
  "name": "Göd",
  "zip_code": "2131"
}
```

### Kód

```js
app.post('/cities', async (req, res) => {
  try {
    const { county_id, name, zip_code } = req.body;

    const [result] = await pool.query(
      'INSERT INTO cities (county_id, name, zip_code) VALUES (?, ?, ?)',
      [county_id, name, zip_code]
    );

    res.status(201).json({
      id: result.insertId,
      county_id,
      name,
      zip_code
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hiba történt' });
  }
});
```

***

## 8️⃣ Szerver indítása

```js
app.listen(3000, () => {
  console.log('web server listening on port 3000')
});
```

***

## 9️⃣ Összefoglalás

✅ **Laravel gondolkodás Node.js-ben**

*   SQL → adat
*   JavaScript → struktúra

✅ **Eloquent `with()` helyett**

*   JOIN + JS csoportosítás

✅ **REST alapműveletek**

*   GET / POST / PUT / DELETE

✅ **Ugyanaz az elv**

*   csak kevesebb „varázslat”, több megértés

***

