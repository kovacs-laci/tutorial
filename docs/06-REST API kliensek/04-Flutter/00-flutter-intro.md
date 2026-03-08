---
id: rest-api-client_flutter_intro
slug: /rest-api-client/flutter/intro
title: Alapok
---

# Mobilalkalmazás-fejlesztés alapjai

A mobilalkalmazás-fejlesztés célja olyan szoftverek készítése, amelyek okostelefonokon és tableteken futnak. A két legelterjedtebb mobil operációs rendszer:

- **Android**
- **iOS**

Hagyományosan külön technológiával kellett fejleszteni ezekre a platformokra:

- Android → Kotlin / Java  
- iOS → Swift / Objective‑C  

Ez azt jelenti, hogy ugyanazt az alkalmazást kétszer kellett megírni.  
Erre jelent megoldást a **cross‑platform fejlesztés**, ahol egyetlen kódbázisból lehet több platformra alkalmazást készíteni.

---

# Mi az a Flutter?

A **Flutter** egy nyílt forráskódú UI toolkit, amelyet a **Google** fejleszt. Segítségével egyetlen kódbázisból lehet alkalmazásokat készíteni:

- Androidra  
- iOS‑re  
- Webre  
- Asztali rendszerekre (Windows, Linux, macOS)

A Flutter a **Dart** programozási nyelvet használja.

## A Flutter fő jellemzői

- Saját renderelő motor (nem a natív UI elemeket használja)
- Gyors fejlesztés a **Hot Reload** segítségével
- Egységes megjelenés minden platformon
- Deklaratív UI szemlélet
- Erős közösségi és csomagtámogatás
- JIT (fejlesztés közben) és AOT (éles build) fordítás

A Flutterben minden **widget**. A felhasználói felület elemei (szöveg, gomb, lista, elrendezés) mind widgetekből épülnek fel.

---

# Mobilalkalmazás vs. webalkalmazás

Korábban webes környezetben dolgoztál:

- Frontend: JavaScript  
- Backend: PHP, Laravel  
- REST API kommunikáció JSON formátumban  

A Flutter kliens fejlesztés több ponton hasonlít ehhez, de vannak lényeges különbségek.

## Hasonlóságok

- REST API használata (HTTP kérések)
- JSON feldolgozás
- Backend–frontend szétválasztás
- MVC‑szerű gondolkodás (logika elkülönítése a megjelenítéstől)

## Különbségek

### 1. Nem HTML + CSS alapú

Flutterben nincs:

- HTML  
- CSS  
- DOM  

A felületet Dart kódban, widgetekkel építjük fel.

### 2. Nem böngészőben fut

A Flutter alkalmazás:

- natív kóddá fordul,
- közvetlenül az operációs rendszeren fut,
- saját renderelő motort használ.

### 3. Az állapotkezelés központi szerepet kap

Mivel nincs DOM, nincs „manuális frissítés”.  
A Flutter deklaratív: ha változik az állapot, újrarajzolja a widgetet.

### 4. Build folyamat

Webes környezetben a böngésző futtatja a kódot.  
Flutter esetén:

- fejlesztés közben Hot Reload / Hot Restart,
- éles buildnél APK / IPA készül,
- emulátoron vagy fizikai eszközön fut.

---

# Miért jó a Flutter REST API klienshez?

- Könnyű HTTP‑kommunikáció (`http` package)
- Egyszerű JSON → Dart modellek
- Tiszta rétegzett architektúra (service, model, widget)
- Gyors fejlesztés Hot Reload‑dal
- Platformfüggetlen működés (Android + iOS + Web)

A Flutter tökéletes választás olyan alkalmazásokhoz, amelyek:

- adatot kérnek le egy API‑ból,
- listákat jelenítenek meg,
- űrlapokat kezelnek,
- CRUD műveleteket végeznek.

---

# Mit fogunk építeni?

Ebben a tananyagban egy **REST API klienst** készítünk Flutterben, amely:

- HTTP kéréseket küld egy meglévő API‑nak,
- JSON adatokat dolgoz fel,
- listáz, hozzáad, módosít és töröl rekordokat,
- több képernyőn jeleníti meg az adatokat.

A következő fejezetben megismerjük a Flutter widgetek működését és az alkalmazás alapstruktúráját.
```
