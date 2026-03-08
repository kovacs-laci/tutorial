---
id: rest-api-client-js-index
slug: /rest-api-client/js/index
title: Az első lépés - index.html
---

A REST API-hoz készülő frontend első építőköve az `index.html` állomány. Ez a fájl adja a felhasználói felület alapját, és innen indul minden JavaScript-alapú interakció a backend felé.

Az alkalmazás már nem csak egyszerű listázó felület, hanem **bejelentkezést kezelő**, jogosultsághoz kötött működésű kliens. Az oldal ennek megfelelően dinamikusan változó szekciókat tartalmaz.

---

## Az index.html szerepe a projektben

A HTML oldal feladata, hogy:

- megjelenítse az alkalmazás címét,
- kezelje a bejelentkezett / nem bejelentkezett állapotot,
- gombokat biztosítson a REST API hívások indításához,
- helyet adjon a lekérdezések eredményeinek,
- biztosítson egy modális (felugró) konténert űrlapok számára,
- betöltse a JavaScript modult, amely a tényleges API-kommunikációt végzi.

Fontos elv:  
👉 **A HTML csak a szerkezetet adja.**  
👉 A logika teljes egészében a JavaScript fájlokban van.

---

## Az index.html aktuális kódja

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Matrica REST API kliens</title>
    <link rel="stylesheet" href="style.css">    
</head>
<body>
    <h1>Matrica REST API kliens</h1>

    <div class="header">
        <div id="authSection" style="display:none;">
            <span id="userName"></span>
            <button id="logoutBtn">Kijelentkezés</button>
        </div>
        <div id="loginSection">
            <button id="loginBtn">Bejelentkezés</button>
        </div>
    </div>

    <div id="appSection" style="display:none;">
        <div>
            <button id="newVehicle">Új jármű</button>
            <button id="listVehicles">Járművek listázása</button>
            <button id="listVignettes">Matricák listázása</button>
        </div>
    </div>

    <div id="content">A lekérdezés eredménye itt jelenik meg...</div>
    <div id="modal" class="hidden"></div>

    <script type="module" src="main.js"></script>
</body>
</html>
````

---

# A kód részletes magyarázata

## 1. A dokumentum alapjai

* `<!DOCTYPE html>` → HTML5 dokumentum
* `<html lang="hu">` → magyar nyelvi beállítás
* `<meta charset="UTF-8">` → ékezetes karakterek helyes kezelése

Ez a modern webes alapkonfiguráció.

---

## 2. Fejléc és hitelesítés (authSection / loginSection)

```html
<div class="header">
```

A fejléc két állapotot kezel:

### 🔐 Bejelentkezett állapot

```html
<div id="authSection" style="display:none;">
```

Ez a rész:

* a felhasználó nevét (`#userName`) jeleníti meg,
* egy kijelentkezés gombot tartalmaz.

Alapértelmezetten rejtett (`display:none`),
és csak sikeres login után jelenik meg.

---

### 🔓 Nem bejelentkezett állapot

```html
<div id="loginSection">
```

Ez tartalmazza a:

* **Bejelentkezés** gombot (`#loginBtn`)

Sikeres login után ez a rész elrejtésre kerül,
és az `authSection` jelenik meg helyette.

👉 A két blokk közötti váltást a JavaScript végzi.

---

## 3. Alkalmazás szekció (appSection)

```html
<div id="appSection" style="display:none;">
```

Ez az a rész, amely csak **bejelentkezés után** érhető el.

Tartalma:

* **Új jármű létrehozása**
* **Járművek listázása**
* **Matricák listázása**

Ez a blokk alapértelmezetten rejtett.
Sikeres login után válik láthatóvá.

Ez a struktúra jól szemlélteti:

* a kliensoldali jogosultságkezelést,
* az állapotvezérelt UI működést.

---

## 4. Tartalom konténer

```html
<div id="content">
```

Ez az alkalmazás fő megjelenítési területe.

Ide kerül:

* a járművek listája,
* a matricák listája,
* esetleges hibaüzenetek,
* dinamikusan generált HTML struktúrák.

A JavaScript mindig ezt a konténert tölti fel új tartalommal.

---

## 5. Modal konténer

```html
<div id="modal" class="hidden"></div>
```

Ez egy üres konténer, amely:

* felugró űrlapokhoz,
* új jármű létrehozásához,
* szerkesztési ablakokhoz használható.

A `hidden` CSS osztály szabályozza a láthatóságát.

Ez a megoldás lehetővé teszi:

* a DOM dinamikus módosítását,
* űrlapok külön fájlban történő generálását,
* tiszta, újrafelhasználható view komponensek készítését.

---

## 6. JavaScript modul betöltése

```html
<script type="module" src="main.js"></script>
```

A `type="module"` használata lehetővé teszi:

* ES6 modul import/export használatát
* fájlokra bontott struktúrát
* tiszta felelősségi köröket

A projektben:

* `main.js` → inicializál
* `api-client.js` → HTTP kommunikáció
* `users.js`, `vehicles.js`, `vignettes.js` → API réteg
* `*.views.js` → megjelenítés

---

# Miért fontos ez a struktúra?

Ez az `index.html` már nem egy statikus oldal, hanem:

* állapotvezérelt
* hitelesítést kezelő
* dinamikus tartalommal dolgozó
* moduláris frontend alap

Ez a szemlélet:

* közel áll a modern SPA alkalmazások működéséhez,
* jól előkészíti a Vue / React alapú gondolkodást,
* tisztán elválasztja a HTML szerkezetet a JavaScript logikától.

---

# Összegzés

Az `index.html`:

* biztosítja az alkalmazás alap UI szerkezetét,
* kezeli a login és auth állapot blokkjait,
* külön alkalmazás szekciót tartalmaz jogosultsághoz kötve,
* dinamikus tartalom konténert biztosít,
* modális ablakhoz is előkészített struktúrát ad,
* modern ES6 modul alapú JavaScriptet tölt be.

A következő lépésben megnézzük, hogyan inicializálja a `main.js` az alkalmazást, és hogyan kapcsolódnak össze a különálló modulok.
