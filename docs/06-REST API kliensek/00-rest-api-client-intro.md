---
id: rest-api-client-intro
slug: /rest-api-client/intro
title: "REST API kliens – Bevezetés"
sidebar_label: Bevezető
---

# REST API kliens – Bevezetés

A modern webalkalmazások többsége már nem közvetlenül az adatbázissal kommunikál.  
Az adatok kezelését egy **köztes réteg**, egy **REST API** végzi, amelyhez a különböző kliensek (web, mobil, desktop, más backend rendszerek) **HTTP kéréseken keresztül** kapcsolódnak.

A REST API kliens olyan alkalmazás vagy modul, amely:

- HTTP-kéréseket küld a szervernek (GET, POST, PUT, DELETE),
- fogadja és feldolgozza a JSON válaszokat,
- megjeleníti az adatokat a felhasználó számára.

A kliens:

- ❌ nem fér hozzá közvetlenül az adatbázishoz
- ❌ nem futtat SQL lekérdezéseket
- ❌ nem tartalmaz üzleti logikát
- ✅ kizárólag a REST API végpontjait ismeri

Ez a működési modell jellemző a modern architektúrákra (pl. külön frontend és backend alkalmazások esetén).

---

## Mi az a REST API?

A REST (Representational State Transfer) egy architektúrális stílus, amely meghatározza, hogyan kommunikáljanak egymással rendszerek HTTP protokollon keresztül.

A REST API jellemzői:

- **URL-eken keresztül érhető el**
- **HTTP metódusokat használ**
- **JSON formátumban ad vissza adatokat**
- **független a klienstől**

### Példa egy REST API végpontra

```

GET [http://localhost:8000/counties](http://localhost:8000/counties)

````

Lehetséges válasz:

```json
[
  { "id": 1, "name": "Pest" },
  { "id": 2, "name": "Heves" }
]
````

A kliens számára teljesen mindegy, hogy a háttérben milyen adatbázis vagy programozási nyelv működik.
👉 Csak az számít, hogy az API milyen URL-eken, milyen formátumban szolgáltat adatot.

---

## Miért előnyös a REST API architektúra?

A REST API-k népszerűsége nem véletlen. Több fontos előnyt biztosítanak:

### Platformfüggetlenség

A szerver és a kliens teljesen külön fejleszthető.
A backend készülhet PHP, Node.js, Python vagy Go környezetben, míg a kliens lehet webes, mobilos vagy asztali alkalmazás.

### Egyszerű kommunikáció

A HTTP minden platformon elérhető, így a kommunikáció szabványos és könnyen implementálható.

### Skálázhatóság

A backend és a frontend külön skálázható, külön telepíthető, külön frissíthető.

### Egységes adatcsere

A JSON formátum könnyen feldolgozható minden modern programozási nyelvben.

### Új kliensek könnyű fejlesztése

Ha a szerver már elkészült, bármikor készíthető hozzá új kliens – anélkül, hogy a backend módosítására lenne szükség.

---

## A REST API kliens szerepe a gyakorlatban

Egy REST API kliens feladata tehát:

1. HTTP kérés összeállítása
2. kérés elküldése a szervernek
3. válasz fogadása
4. JSON feldolgozása
5. adatok megjelenítése (HTML, mobil UI, stb.)

A kliens nem tudja:

* hogyan működik az adatbázis,
* milyen SQL fut a háttérben,
* hogyan van implementálva az üzleti logika.

👉 Csak a végpontokat (endpointokat) és az adatstruktúrát ismeri.

---

## Hol használunk REST API klienst?

A REST API egyik legnagyobb előnye, hogy szinte bármilyen platform képes kliensként működni.

### Web

* HTML + JavaScript
* SPA alkalmazások

### Mobilalkalmazások

* Android (Kotlin / Java)
* iOS (Swift)
* Flutter (Dart)
* React Native (JavaScript)

### Asztali alkalmazások

* Electron
* .NET (C#)
* Java (Swing / JavaFX)

### Backend rendszerek

* Node.js
* Python
* PHP
* Go
* Java Spring

### IoT eszközök

* Raspberry Pi
* ESP32
* Arduino (korlátozottan)

A közös pont minden esetben ugyanaz:
📡 **HTTP-kérések küldése és JSON válasz feldolgozása.**

---

## Összegzés

A REST API kliens:

* nem adatbázist kezel,
* nem üzleti logikát tartalmaz,
* kizárólag HTTP-n keresztül kommunikál,
* JSON adatokat dolgoz fel,
* bármilyen platformon megvalósítható.

Ez a megközelítés a modern szoftverfejlesztés alapja, és lehetővé teszi, hogy a backend és a frontend teljesen függetlenül fejlődjön.
