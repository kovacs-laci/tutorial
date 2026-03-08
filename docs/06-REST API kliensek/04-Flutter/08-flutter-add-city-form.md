---
id: rest-api-client_flutter_add_city_form
slug: /rest-api-client/flutter/add-city-form
title: AddCityForm 
---

# AddCityForm – Új város hozzáadása

Ebben a leckében az `AddCityForm` widgetet vizsgáljuk meg. 
Új város létrehozása (POST kérés, Modal Bottom Sheet)

Ez a komponens felel:

* új város adatainak beviteléért
* az űrlap kezeléséért
* a POST kérés indításáért
* a modal ablak bezárásáért
* a lista frissítésének jelzéséért

Ez egy **StatefulWidget**, mert:

* szövegbevitelt kezel
* `TextEditingController`-t használ
* aszinkron műveletet végez

---

## 📁 `widgets\cities\add_city_form.dart`

```dart id="add_city_form_full"
import 'package:flutter/material.dart';
import '../../models/city.dart';
import '../../services/cities_api_service.dart';
import '../../styles.dart';

class AddCityForm extends StatefulWidget {
  final int countyId;
  final String countyName;
  final VoidCallback onSaved;

  const AddCityForm({
    super.key,
    required this.countyId,
    required this.countyName,
    required this.onSaved,
  });

  @override
  State<AddCityForm> createState() => _AddCityFormState();
}

class _AddCityFormState extends State<AddCityForm> {
  final api = ApiService();
  final nameController = TextEditingController();
  final zipController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 24,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Center(
              child: Text(
                'Új város hozzáadása',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            SizedBox(height: 20),

            Text(
              'Megye: ${widget.countyName}',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),

            SizedBox(height: 20),

            TextField(
              controller: nameController,
              decoration: InputDecoration(
                labelText: 'Város neve',
                border: OutlineInputBorder(),
              ),
            ),

            SizedBox(height: 16),

            TextField(
              controller: zipController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Irányítószám',
                border: OutlineInputBorder(),
              ),
            ),

            SizedBox(height: 20),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [

                // Mégse gomb
                ElevatedButton(
                  style: AppStyles.cancelIconButton,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Icon(Icons.close),
                ),

                // Mentés gomb
                ElevatedButton(
                  style: AppStyles.saveIconButton,
                  onPressed: () async {
                    final name = nameController.text.trim();
                    final zip = zipController.text.trim();

                    if (name.isEmpty || zip.isEmpty) return;

                    final newCity = City(
                      id: 0,
                      name: name,
                      zipCode: zip,
                      countyId: widget.countyId,
                    );

                    await api.createCity(
                      widget.countyId,
                      newCity,
                    );

                    if (!mounted) return;

                    Navigator.of(context).pop();
                    widget.onSaved();
                  },
                  child: Icon(Icons.check),
                ),

              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

---

# A komponens működésének részletes magyarázata

---

## 1️⃣ Miért StatefulWidget?

Az űrlap:

* szövegbevitelt kezel
* `TextEditingController`-t használ
* aszinkron API hívást indít

Ezért szükséges az állapotkezelés.

---

## 2️⃣ Konstruktor paraméterek

```dart id="add_form_params"
final int countyId;
final String countyName;
final VoidCallback onSaved;
```

### countyId

Az új város melyik megyéhez tartozik.

### countyName

Csak megjelenítési célra.

### onSaved

Callback a HomeScreen felé.

Ez jelzi, hogy:

> a mentés sikeres volt → frissíteni kell a listát

Ez tiszta komponens-kommunikáció.

---

## 3️⃣ TextEditingController

```dart id="controllers"
final nameController = TextEditingController();
final zipController = TextEditingController();
```

Ezek:

* kezelik a beviteli mezők tartalmát
* lehetővé teszik az érték kiolvasását

---

## 4️⃣ Modal Bottom Sheet kompatibilitás

```dart id="scroll_view"
SingleChildScrollView
```

Ez biztosítja, hogy:

* billentyűzet ne takarja el az űrlapot
* kisebb képernyőn is jól működjön

Padding használata:

```dart id="keyboard_padding"
bottom: MediaQuery.of(context).viewInsets.bottom,
```

Ez dinamikusan alkalmazkodik a billentyűzethez.

---

## 5️⃣ Mentés folyamata (POST kérés)

Amikor a felhasználó a mentés gombra kattint:

### 1. Adatok kiolvasása

```dart id="read_input"
final name = nameController.text.trim();
final zip = zipController.text.trim();
```

---

### 2. Validáció

```dart id="validation"
if (name.isEmpty || zip.isEmpty) return;
```

Egyszerű ellenőrzés.

---

### 3. City objektum létrehozása

```dart id="new_city"
final newCity = City(
  id: 0,
  name: name,
  zipCode: zip,
  countyId: widget.countyId,
);
```

Az `id` itt még nem valós — a backend fogja generálni.

---

### 4. API hívás

```dart id="create_call"
await api.createCity(widget.countyId, newCity);
```

Ez egy POST kérés:

```
POST /counties/{county}/cities
```

---

### 5. Modal bezárása

```dart id="close_modal"
Navigator.of(context).pop();
```

Ez zárja a bottom sheetet.

---

### 6. Lista frissítése

```dart id="refresh"
widget.onSaved();
```

Ez visszahívja a HomeScreen-t, amely újratölti a városokat.

---

# Architektúra szerep

```id="flow_add"
AddCityForm
   ↓
ApiService
   ↓
Backend
   ↓
HomeScreen.onSaved()
   ↓
CityList frissül
```

---

# UX szempont

Ez a komponens:

* modal ablakban jelenik meg
* fókuszált adatbevitel
* gyors mentés
* intuitív bezárás

Ez professzionális mobil UI minta.

---

# Összegzés

Az `AddCityForm`:

* StatefulWidget
* POST kérést indít
* modal bottom sheetben működik
* callbacken keresztül kommunikál
* tiszta rétegzett architektúrába illeszkedik

Ez a projekt egyik kulcseleme, mert itt jelenik meg először a teljes:

> felhasználói interakció → API → állapotfrissítés → UI újrarajzolás

folyamat.

---

A következő leckében az **EditCityForm** részletes bemutatásával folytatjuk, ahol már a PUT művelet és az `initState()` szerepe is kiemelten fontos lesz.
