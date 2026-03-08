---
id: rest-api-client_flutter_models
slug: /rest-api-client/flutter/models
title: Modellek
---

# Modellek Flutterben – County és City osztályok

Ebben a leckében a projekt két adatmodelljét vizsgáljuk meg:

- `County`
- `City`

A modellek a REST API kliens egyik legfontosabb rétegét alkotják, mert a backend JSON válaszait típusbiztos Dart objektumokká alakítják.

---

# A modellek szerepe a Flutter architektúrában

A modellek feladata:

- a backend JSON válaszainak reprezentálása,
- típusbiztos adatszerkezet biztosítása,
- a JSON → Dart objektum átalakítás (`fromJson()`),
- a UI és a Service réteg közötti adatátadás.

A folyamat:

```
JSON → fromJson() → Dart objektum → UI
```

Ez a réteg hidat képez:

- az `ApiService` (hálózat),
- és a UI (widgetek)

között.

A modellek **nem tartalmaznak üzleti logikát**, csak adatot és konverziót.

---

# A City modell

```dart
class City {
  final int id;
  final String name;
  final int countyId;
  final String zipCode;

  City({
    required this.id,
    required this.name,
    required this.countyId,
    required this.zipCode,
  });

  factory City.fromJson(Map<String, dynamic> json) {
    return City(
      id: int.parse(json['id'].toString()),
      name: json['city'],
      countyId: int.parse(json['id_county'].toString()),
      zipCode: json['zip_code'].toString(),
    );
  }
}
```

## A mezők szerepe

A mezők `final` kulcsszóval vannak deklarálva:

```dart
final int id;
final String name;
final int countyId;
final String zipCode;
```

Ez azt jelenti, hogy az objektum létrehozása után nem módosíthatók.  
A modellek így **immutable** jellegűek, ami biztonságosabb és kiszámíthatóbb működést eredményez.

---

## Konstruktor

```dart
City({
  required this.id,
  required this.name,
  required this.countyId,
  required this.zipCode,
});
```

A `required` kulcsszó biztosítja, hogy minden mezőt meg kell adni.  
Ez megakadályozza a hiányos vagy hibás objektumok létrehozását.

---

## A fromJson() factory konstruktor

```dart
factory City.fromJson(Map<String, dynamic> json)
```

A `factory` konstruktor:

- nem kötelezően új példányt hoz létre,
- rugalmasabb objektumépítést tesz lehetővé,
- ideális JSON → objektum konverzióhoz.

### JSON mezők megfeleltetése

Backend válasz:

```json
{
  "id": 5,
  "city": "Pécs",
  "id_county": 1,
  "zip_code": "7621"
}
```

Leképezés:

| JSON kulcs | Dart mező |
| ---------- | --------- |
| id         | id        |
| city       | name      |
| id_county  | countyId  |
| zip_code   | zipCode   |

### Miért `int.parse()`?

```dart
id: int.parse(json['id'].toString()),
```

Mert a backend néha:

- számként,
- néha stringként

küldi az értéket.  
A `toString()` + `int.parse()` biztosítja a típushelyességet.

---

# A County modell

```dart
class County {
  final int id;
  final String name;

  County({required this.id, required this.name});

  factory County.fromJson(Map<String, dynamic> json) {
    return County(
      id: int.parse(json['id'].toString()),
      name: json['name'],
    );
  }
}
```

A `County` egyszerűbb modell:

- csak két mezőt tartalmaz,
- nincs kapcsolt adat,
- nincs lista benne.

Ez egy klasszikus „parent” entitás a County → City kapcsolatban.

---

# Miért fontosak a modellek?

## Típusbiztonság

A UI nem `Map`‑ekkel dolgozik, hanem:

```dart
List<City>
List<County>
```

Ez csökkenti a hibalehetőséget és növeli az olvashatóságot.

---

## Átláthatóság

A UI kódban:

```dart
city.name
```

sokkal érthetőbb, mint:

```dart
json['city']
```

---

## Architektúra tisztasága

A rétegek:

```
API → Service → Model → UI
```

A UI nem tud a JSON struktúráról.  
Ez jó szoftvertervezési gyakorlat és könnyebb karbantarthatóságot eredményez.

---

# Kapcsolat a HomeScreen-nel

A `HomeScreen` így tárolja az adatokat:

```dart
List<City> cities = [];
List<County> counties = [];
```

Ezért az `ApiService`:

- nem JSON‑t ad vissza,
- hanem már kész modelleket.

Ez a design biztosítja a tiszta felelősségi köröket.

---

# Összehasonlítás más technológiákkal

## JavaScript

Ott gyakran közvetlenül a JSON‑nal dolgozunk:

```javascript
response.json()
```

Flutterben viszont:

- explicit model osztály,
- factory konstruktor,
- típusdefiníció.

---

## Laravel backend

A `fromJson()` hasonló szerepű, mint:

- Eloquent model,
- Resource osztály.

---

# Miért nincs több logika a modellekben?

A modellek:

- nem tartalmaznak HTTP hívást,
- nem tartalmaznak UI logikát,
- nem tartalmaznak validációt.

Csak adatstruktúra + konverzió.  
Ez megfelel a **Single Responsibility Principle** elvnek.

---

# Összegzés

A `City` és `County` modellek:

- reprezentálják az API adatait,
- biztosítják a típushelyességet,
- átalakítják a JSON‑t Dart objektummá,
- elkülönítik az adatstruktúrát a hálózati és UI rétegtől.

Ezzel a projekt három fő rétege teljes:

```
UI (screens, widgets)
Service (ApiService)
Model (City, County)
```

A következő lépésben a UI komponensek és a Service réteg együttműködését vizsgáljuk meg.
