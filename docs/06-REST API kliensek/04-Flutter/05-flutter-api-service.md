---
id: rest-api-client_flutter_api_service
slug: /rest-api-client/flutter/api-service
title: Az ApiService
---

# API kommunikáció Flutterben – Az `ApiService` részletes bemutatása

Ebben a részben a teljes HTTP‑kommunikációt megvalósító `ApiService` osztályt vizsgáljuk meg.  
A fájl nagy, ezért logikai egységekre bontva, függvényenként haladunk végig rajta.

A cél:

- megérteni a REST végpontok hívását,
- látni a JSON → Dart objektum átalakítást,
- megérteni a HTTP metódusok használatát (GET, POST, PUT, DELETE),
- végül összeállítani az egész osztályt egyben.

---

# Importok és alapfüggőségek

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart' show kIsWeb;
import '../models/county.dart';
import '../models/city.dart';
```

## Mit csinálnak ezek?

### `dart:convert`
A JSON kódolásához és dekódolásához szükséges.

- `jsonDecode()` → JSON string → Dart Map
- `jsonEncode()` → Dart Map → JSON string

### `dart:io`
Platformfelismeréshez használjuk (Android, Windows, Linux, macOS).

### `http` csomag
A Flutterben a leggyakrabban használt HTTP kliens:

- `http.get()`
- `http.post()`
- `http.put()`
- `http.delete()`

### `kIsWeb`
Megmondja, hogy az alkalmazás Flutter Weben fut‑e.

### Modellek
A JSON válaszokat Dart objektumokká alakítjuk:

- `County.fromJson()`
- `City.fromJson()`

---

# Az ApiService osztály alapja

```dart
class ApiService {

  late final String baseUrl;

  ApiService() {
    if (kIsWeb) {
      baseUrl = 'http://localhost:8000';
    }
    else if (Platform.isAndroid) {
      baseUrl = 'http://localhost:8000';
    }
    else {
      baseUrl = 'http://127.0.0.1:8000';
    }
  }
}
```

## Mi történik itt?

A `baseUrl` értéke platformtól függően változik.

### Miért fontos ez?

Android emulátor esetén a `localhost` nem a számítógépet jelenti, hanem az emulátor saját rendszerét.  
A legtöbb esetben a helyes cím:

```
10.0.2.2
```

Ez a gépünk localhost‑ját jelenti az emulátor számára.

A fenti kód egyszerűsített, de működő megoldás.  
Ha Androidon nem működik a `localhost`, érdemes módosítani:

```dart
else if (Platform.isAndroid) {
  baseUrl = 'http://10.0.2.2:8000';
}
```

---

# GET – Megyék lekérése

```dart
Future<List<County>> getCounties() async {
  try {
    final response = await http.get(
      Uri.parse('$baseUrl/counties')
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData =
          jsonDecode(response.body);

      final List data = responseData['entities'] ?? [];

      return data
          .map((e) => County.fromJson(e))
          .toList();
    } else {
      throw Exception(
        'Failed to load counties: ${response.statusCode}'
      );
    }
  } catch (e) {
    print("Failed to fetch counties: $e");
    return [];
  }
}
```

## Mit csinál?

1. GET kérés a `/counties` végpontra
2. Ha 200 OK:
   - JSON dekódolás
   - `entities` kulcs kiolvasása
   - Map → County objektum
3. Ha hiba:
   - Exception
   - üres lista visszaadása

---

# Városok lekérése megyénként

```dart
Future<List<City>> getCitiesByCounty(int countyId) async {
  try {
    final response = await http.get(
      Uri.parse('$baseUrl/counties/$countyId/cities')
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData =
          jsonDecode(response.body);

      final List data = responseData['entities'] ?? [];

      return data
          .map((e) => City.fromJson(e))
          .toList();
    } else {
      throw Exception(
        'Failed to load cities: ${response.statusCode}'
      );
    }
  } catch (e) {
    return [];
  }
}
```

Ez a klasszikus 1:n kapcsolat:

```
County → Cities
```

REST végpont:

```
GET /counties/{county}/cities
```

---

# Speciális végpont – kezdőbetűk lekérése

```dart
Future<List<String>> getCityInitials(int countyId) async {
  final response = await http.get(
    Uri.parse('$baseUrl/counties/$countyId/abc'),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    final initials = data['initials'] as List;

    return initials
        .map((e) => e['initial'] as String)
        .toList();
  } else {
    throw Exception('Failed to load initials');
  }
}
```

Ez a végpont a városok kezdőbetűit adja vissza.  
A kliens ez alapján generálja a szűrőgombokat.

---

# Városok lekérése kezdőbetű szerint

```dart
Future<List<City>> getCitiesByInitial(
    int countyId,
    String initial
) async {
  try {
    final response = await http.get(
      Uri.parse('$baseUrl/counties/$countyId/abc/$initial'),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData =
          jsonDecode(response.body);

      final List data = responseData['entities'] ?? [];

      return data
          .map((e) => City.fromJson(e))
          .toList();
    } else {
      throw Exception(
        'Failed to load cities: ${response.statusCode}'
      );
    }
  } catch (e) {
    return [];
  }
}
```

---

# Keresés query paraméterrel

```dart
Future<List<City>> searchCities(
    int countyId,
    String needle
) async {
  final response = await http.get(
    Uri.parse('$baseUrl/counties/$countyId/cities?needle=$needle'),
  );

  if (response.statusCode == 200) {
    final decoded = jsonDecode(response.body);

    final List citiesJson = decoded['entities'] ?? [];

    return citiesJson
        .map((e) => City.fromJson(e))
        .toList();
  } else {
    throw Exception('Failed to search cities');
  }
}
```

Ez már query paramétert használ:

```
?needle=pecs
```

---

# POST – Város létrehozása

```dart
Future<City> createCity(
    int countyId,
    City city
) async {
  final url = Uri.parse('$baseUrl/counties/$countyId/cities');

  final response = await http.post(
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonEncode({
      'city': city.name,
      'zip_code': city.zipCode,
      'id_county': city.countyId,
    }),
  );

  if (response.statusCode == 201 ||
      response.statusCode == 200) {

    final decoded = jsonDecode(response.body);

    return City.fromJson(decoded['entity']);
  } else {
    throw Exception(
      'Failed to create city: ${response.body}'
    );
  }
}
```

---

# PUT – Város frissítése

```dart
Future<City> updateCity(int id, City city) async {
  final url = Uri.parse('$baseUrl/cities/$id');

  final response = await http.put(
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonEncode({
      'city': city.name,
      'zip_code': city.zipCode,
    }),
  );

  if (response.statusCode == 200 ||
      response.statusCode == 202) {

    final decoded = jsonDecode(response.body);

    return City.fromJson(decoded['entity']);
  } else {
    throw Exception(
      'Failed to update city: ${response.body}'
    );
  }
}
```

---

# DELETE – Város törlése

```dart
Future<void> deleteCity(int id) async {
  final url = Uri.parse('$baseUrl/cities/$id');

  final response = await http.delete(url);

  if (response.statusCode != 200 &&
      response.statusCode != 204) {
    throw Exception(
      'Failed to delete city: ${response.body}'
    );
  }
}
```

---

# Összegzés

Az `ApiService`:

- a teljes HTTP‑kommunikációt kezeli,
- elrejti a hálózati részleteket a UI elől,
- modelleket ad vissza, nem JSON‑t,
- REST szabályok szerint működik.

Ez a réteg felel meg:

- Laravelben: Service / Repository,
- JavaScriptben: külön API modul,
- Backendben: Controller + Http Client réteg.

A következő részben a `County` és `City` modellek működését vizsgáljuk meg.
