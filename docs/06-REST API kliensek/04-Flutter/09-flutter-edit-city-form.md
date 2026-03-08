---
id: rest-api-client_flutter_edit_city_form
slug: /rest-api-client/flutter/edit-city-form
title: EditCityForm
---

# EditCityForm – Város módosítása
Város módosítása (PUT kérés, előtöltött adatok)

Ebben a leckében az `EditCityForm` widgetet vizsgáljuk meg.



Ez a komponens felel:

* egy meglévő város adatainak megjelenítéséért
* az adatok szerkesztéséért
* a PUT kérés elküldéséért
* a modal bezárásáért
* a lista frissítésének jelzéséért

Ez egy **StatefulWidget**, mert:

* előre kitöltött adatokat kezel
* `initState()`-et használ
* `TextEditingController`-t inicializál
* aszinkron műveletet végez

---

## 📁 `widgets\cities\edit_city_form.dart`

```dart id="edit_city_form_full"
import 'package:flutter/material.dart';
import '../../models/city.dart';
import '../../services/cities_api_service.dart';
import '../../styles.dart';

class EditCityForm extends StatefulWidget {
  final City city;
  final VoidCallback onSaved;

  const EditCityForm({
    super.key,
    required this.city,
    required this.onSaved,
  });

  @override
  State<EditCityForm> createState() => _EditCityFormState();
}

class _EditCityFormState extends State<EditCityForm> {
  final ApiService api = ApiService();

  late TextEditingController nameController;
  late TextEditingController zipController;

  @override
  void initState() {
    super.initState();
    nameController =
        TextEditingController(text: widget.city.name);
    zipController =
        TextEditingController(text: widget.city.zipCode);
  }

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
                'Város módosítása',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
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
              mainAxisAlignment:
                  MainAxisAlignment.spaceBetween,
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

                    final updatedCity = City(
                      id: widget.city.id,
                      name: nameController.text.trim(),
                      zipCode: zipController.text.trim(),
                      countyId: widget.city.countyId,
                    );

                    await api.updateCity(
                      widget.city.id,
                      updatedCity,
                    );

                    if (!mounted) return;

                    Navigator.of(context).pop();
                    widget.onSaved();
                  },
                  child: Icon(Icons.check),
                ),
              ],
            ),

            SizedBox(height: 20),
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

Az `EditCityForm`:

* előtöltött adatokat használ
* controller-eket inicializál
* módosított adatokat küld el

Ezért szükséges az állapot.

---

## 2️⃣ Az initState() szerepe

```dart id="edit_initstate"
@override
void initState() {
  super.initState();
  nameController =
      TextEditingController(text: widget.city.name);
  zipController =
      TextEditingController(text: widget.city.zipCode);
}
```

Ez kulcsfontosságú rész.

Itt történik:

* a meglévő város adatainak betöltése az űrlapba
* a TextField-ek előre kitöltése

A `widget.city` az a város, amit a `CityList` adott át szerkesztésre.

---

## 3️⃣ TextEditingController használata

A controller-ek:

* lehetővé teszik az aktuális szöveg lekérését
* kezelik az input mező tartalmát
* biztosítják az adat szinkronizációt

---

## 4️⃣ PUT művelet

Amikor a mentés gombra kattintunk:

```dart id="edit_put_call"
await api.updateCity(
  widget.city.id,
  updatedCity,
);
```

Ez a backend megfelelő végpontját hívja:

```id="put_endpoint"
PUT /cities/{id}
```

Ez a REST szabályok szerinti módosítás.

---

## 5️⃣ Az új City objektum

```dart id="updated_city"
final updatedCity = City(
  id: widget.city.id,
  name: nameController.text.trim(),
  zipCode: zipController.text.trim(),
  countyId: widget.city.countyId,
);
```

Fontos:

* az `id` változatlan marad
* csak a módosítható mezők frissülnek
* ez biztosítja az adat integritást

---

## 6️⃣ Modal bezárása és frissítés

```dart id="edit_close"
Navigator.of(context).pop();
widget.onSaved();
```

Ez két dolgot csinál:

1. Bezárja a bottom sheetet
2. Értesíti a HomeScreen-t, hogy frissítenie kell a listát

---

# Architektúra működés

```id="edit_flow"
EditCityForm
   ↓
ApiService.updateCity()
   ↓
Backend (PUT)
   ↓
HomeScreen.onSaved()
   ↓
CityList újratöltés
```

Ez teljes CRUD ciklus.

---

# AddCityForm vs EditCityForm

| Jellemző              | Add           | Edit      |
| --------------------- | ------------- | --------- |
| Widget típusa         | Stateful      | Stateful  |
| HTTP metódus          | POST          | PUT       |
| Id kezelése           | 0 / új        | meglévő   |
| initState használat   | Nem szükséges | Szükséges |
| Előre kitöltött mezők | Nem           | Igen      |

---

# Miért fontos ez a két komponens együtt?

Mert így teljes a városkezelés:

* Lista megjelenítés
* Új elem létrehozás
* Meglévő elem módosítás
* Törlés (CityList swipe)
* Backend szinkron

Ez egy komplett REST kliens megvalósítás.

---

# Összegzés

Az `EditCityForm`:

* StatefulWidget
* initState-ben előtölti az adatokat
* PUT kérést küld
* modalban működik
* callbacken keresztül frissíti a listát
* tisztán illeszkedik a rétegzett architektúrába

Ez a komponens a projekt egyik legfontosabb része, mert bemutatja:

> hogyan történik egy meglévő erőforrás módosítása Flutterben REST API segítségével.

---

A következő lépés a **CountyDropdown** komponens.