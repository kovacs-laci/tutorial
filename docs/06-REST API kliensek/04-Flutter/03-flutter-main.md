---
id: rest-api-client_flutter_main
slug: /rest-api-client/flutter/main
title: Gyakorlati példa, main.dart
---

# A gyakorlati példa

Ebben a részben a konkrét projekt belépési pontját vizsgáljuk meg.  
Minden Flutter alkalmazás a `main.dart` fájlból indul.

Mielőtt azonban a kódot elemeznénk, érdemes áttekinteni:

- a projekt könyvtárstruktúráját  
- az alkalmazás architektúráját  
- az API felépítését  
- és azt, milyen sorrendben haladunk tovább  

---

# A projekt könyvtárstruktúrája

A `lib` mappa tartalma:

```text
lib/
 ├── main.dart
 ├── models/
 │    ├── county.dart
 │    └── city.dart
 ├── screens/
 │    └── home_screen.dart
 ├── services/
 │    └── cities_api_service.dart
 ├── widgets/
 │    ├── counties/
 │    │    └── county_dropdown.dart
 │    └── cities/
 │         ├── city_list.dart
 │         ├── add_city_form.dart
 │         └── edit_city_form.dart
 └── styles.dart
```

Ez egy tudatosan rétegzett struktúra.

## Rétegek szerepe

### models/

Adatmodellek:

- `County`
- `City`

Feladatuk:

- JSON → Dart objektum konverzió
- típusbiztos adatkezelés

---

### services/

Az API kommunikáció rétege:

- HTTP kérések
- végpontok kezelése
- JSON dekódolás

Ez a backendhez kapcsolódó logika.

---

### screens/

Teljes képernyők.

A `HomeScreen`:

- állapotot kezel
- API hívásokat indít
- összefogja az UI komponenseket

---

### widgets/

Újrafelhasználható UI elemek:

- dropdown
- lista
- űrlapok

Ez hasonló szerepet tölt be, mint weben a komponensek.

---

# Az API felépítése

Az alkalmazás egy REST API‑val kommunikál, amely két fő erőforrást kezel:

- `counties`
- `cities`

A két erőforrás között:

> 1 : n kapcsolat van – egy megye több várost tartalmaz.

---

## Hagyományos REST végpontok

### Counties

- `GET /counties`
- `GET /counties/{id}`
- `POST /counties`
- `PUT /counties/{id}`
- `DELETE /counties/{id}`

---

### Cities

- `GET /cities`
- `GET /cities/{id}`
- `POST /cities`
- `PUT /cities/{id}`
- `DELETE /cities/{id}`

---

### Kapcsolt végpont

- `GET /counties/{county}/cities`

Ez a kiválasztott megyéhez tartozó városokat adja vissza.

---

## Speciális szűrési végpontok

Az API rendelkezik két további, kifejezetten a kliensoldali szűrést támogató végponttal.

### 1️⃣ Kezdőbetűk lekérdezése

```http
GET /counties/{county}/abc
```

Ez visszaadja az adott megyében található városok kezdőbetűit.

Például:

```json
["A", "B", "C", "D"]
```

Ez alapján a kliens dinamikusan tud szűrőgombokat generálni.

---

### 2️⃣ Városok szűrése kezdőbetű alapján

```http
GET /counties/{county}/abc/{initial}
```

Ez visszaadja az adott megyében található, a megadott betűvel kezdődő városokat.

---

## Keresés

A városok kereshetők is.  
A kliens egy külön végponton keresztül tud szűrt listát kérni, például:

```http
GET /counties/{county}/cities?search=...
```

A konkrét implementáció a `cities_api_service.dart` fájlban látható.

---

# Hogyan fogunk haladni?

A gyakorlati bemutatás lépései:

1. **main.dart**
   - alkalmazás indítása
   - `MaterialApp` konfiguráció

2. **HomeScreen**
   - állapotkezelés
   - lifecycle (`initState`)
   - API hívások indítása

3. **ApiService**
   - HTTP kommunikáció
   - GET, POST, PUT, DELETE
   - JSON feldolgozás

4. **Model osztályok**
   - `fromJson`
   - `toJson`
   - típusbiztonság

5. **UI komponensek**
   - lista
   - űrlapok
   - modális ablakok

---

# A `main.dart` elemzése

A jelenlegi fájl tartalma:

```dart
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Counties & Cities',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}
```

> Megjegyzés: ha a `HomeScreen` nem használ konstruktorparamétert, érdemes `const`‑tal példányosítani (ahogy fent).

---

# 1. A main() függvény

```dart
void main() {
  runApp(const MyApp());
}
```

Ez az alkalmazás belépési pontja.

A `runApp()`:

- elindítja a Flutter renderelést
- létrehozza a widget‑fát
- a `MyApp` lesz a gyökér widget

---

# 2. A MyApp szerepe

A `MyApp`:

- nem kezel állapotot
- globális konfigurációt biztosít
- beállítja az első képernyőt

Ezért `StatelessWidget`.

---

# 3. A MaterialApp konfiguráció

```dart
MaterialApp(
  debugShowCheckedModeBanner: false,
  title: 'Counties & Cities',
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  home: const HomeScreen(),
)
```

### debugShowCheckedModeBanner

Eltávolítja a jobb felső sarokban megjelenő „DEBUG” címkét.

### title

Az alkalmazás neve (pl. appváltóban, task switcherben).

### theme

Globális megjelenési beállítások (színek, betűtípusok, stb.).

### home

Az első képernyő: `HomeScreen`.

---

# Mi történik indításkor?

1. A Dart meghívja a `main()` függvényt
2. A `runApp()` inicializálja az alkalmazást
3. A `MaterialApp` létrejön
4. A `HomeScreen` `build()` metódusa lefut
5. Megjelenik az első UI

Ezután a `HomeScreen` lifecycle mechanizmusa lép működésbe, ahol már:

- API hívás történik
- állapot frissül
- a UI újrarajzolódik

Ez lesz a következő rész témája.

---

# Összegzés

A `main.dart`:

- az alkalmazás belépési pontja
- globális konfigurációs réteg
- nem tartalmaz üzleti logikát
- nem kezel adatokat

Az adatkezelés és az API kommunikáció a `HomeScreen` és az `ApiService` feladata.

A következő részben a `HomeScreen` működését vizsgáljuk meg részletesen.
