---
id: rest-api-client_flutter_home_screen
slug: /rest-api-client/flutter/home-screen
title: A HomeScreen működése
---

# A HomeScreen szerepe az alkalmazásban

A `main.dart` kizárólag az alkalmazás indításáért felel. A tényleges működés – állapotkezelés, API‑kommunikáció, szűrés, keresés, UI‑frissítés – a `HomeScreen` osztályban történik.

A `HomeScreen` az alkalmazás központi vezérlőrétege:

- betölti a megyéket,
- kezeli a kiválasztást,
- API‑hívásokat indít,
- kezeli a szűrést és keresést,
- frissíti az UI‑t.

Ez funkcionálisan hasonló szerepet tölt be, mint webes környezetben egy controller.

---

# A `screens/home_screen.dart` fájl

```dart
import 'package:flutter/material.dart';
import '../models/county.dart';
import '../models/city.dart';
import '../services/cities_api_service.dart';
import '../styles.dart';
import '../widgets/cities/add_city_form.dart';
import '../widgets/cities/edit_city_form.dart';
import '../widgets/cities/city_list.dart';
import '../widgets/counties/country_dropdown.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  final api = ApiService();

  List<County> counties = [];
  List<City> cities = [];
  List<String> initials = [];

  int? selectedCountyId;
  String? selectedInitial;

  @override
  void initState() {
    super.initState();
    loadCounties();
  }

  void loadCounties() async {
    try {
      final loadedCounties = await api.getCounties();
      setState(() {
        counties = loadedCounties;
      });
    } catch (e) {
      print('Error loading counties: $e');
    }
  }

  void loadCities(int countyId) async {
    cities = await api.getCitiesByCounty(countyId);
    setState(() {});
  }

  void loadInitials(int countyId) async {
    try {
      initials = await api.getCityInitials(countyId);
      setState(() {});
    } catch (e) {
      print('Error loading initials: $e');
    }
  }

  void loadCitiesByInitial(int countyId, String initial) async {
    try {
      cities = await api.getCitiesByInitial(countyId, initial);
      setState(() {});
    } catch (e) {
      print('Error loading cities: $e');
    }
  }

  void searchCities(int countyId, String query) async {
    if (query.isEmpty) {
      if (selectedInitial == '*') {
        loadCities(countyId);
      } else if (selectedInitial != null) {
        loadCitiesByInitial(countyId, selectedInitial!);
      } else {
        cities.clear();
        setState(() {});
      }
      return;
    }

    try {
      cities = await api.searchCities(countyId, query);
      setState(() {});
    } catch (e) {
      print('Error searching cities: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Megyék & Városok'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [

            CountyDropdown(
              counties: counties,
              selectedCountyId: selectedCountyId,
              onChanged: (value) {
                setState(() {
                  selectedCountyId = value;
                  selectedInitial = null;
                  cities.clear();
                  initials.clear();
                });
                if (value != null) {
                  loadInitials(value);
                }
              },
            ),

            const SizedBox(height: 16),

            TextField(
              decoration: const InputDecoration(
                labelText: 'Keresés',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (value) {
                if (selectedCountyId != null) {
                  searchCities(selectedCountyId!, value);
                }
              },
            ),

            const SizedBox(height: 20),

            Wrap(
              alignment: WrapAlignment.center,
              spacing: 12,
              runSpacing: 12,
              children: [
                IconButton(
                  icon: const Icon(Icons.add, color: Colors.white),
                  style: AppStyles.addIconButton,
                  onPressed: () {
                    if (selectedCountyId != null) {
                      final county = counties.firstWhere((c) => c.id == selectedCountyId);

                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        useRootNavigator: true,
                        builder: (context) => AddCityForm(
                          countyId: selectedCountyId!,
                          countyName: county.name,
                          onSaved: () => loadCities(selectedCountyId!),
                        ),
                      );
                    }
                  },
                ),

                ElevatedButton(
                  onPressed: () {
                    if (selectedCountyId != null) {
                      setState(() {
                        selectedInitial = '*';
                      });
                      loadCities(selectedCountyId!);
                    }
                  },
                  style: selectedInitial == '*'
                      ? AppStyles.selectedButton
                      : AppStyles.unselectedButton,
                  child: const Text('*'),
                ),

                ...initials.map((initial) {
                  final bool isSelected = selectedInitial == initial;

                  return ElevatedButton(
                    onPressed: () {
                      setState(() {
                        selectedInitial = initial;
                      });
                      loadCitiesByInitial(selectedCountyId!, initial);
                    },
                    style: isSelected
                        ? AppStyles.selectedButton
                        : AppStyles.unselectedButton,
                    child: Text(initial),
                  );
                }),
              ],
            ),

            const SizedBox(height: 20),

            CityList(
              cities: cities,
              onEdit: (city) {
                showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  useRootNavigator: true,
                  builder: (context) => EditCityForm(
                    city: city,
                    onSaved: () => loadCities(selectedCountyId!),
                  ),
                );
              },
              onDelete: (id) async {
                await api.deleteCity(id);
                if (selectedCountyId != null) loadCities(selectedCountyId!);
              },
            ),

          ],
        ),
      ),
    );
  }
}
```

---

# Miért StatefulWidget?

A `HomeScreen` állapotot kezel:

- API‑válaszok érkeznek,
- a felhasználó választ megyét,
- szűrőgombokat generálunk,
- keresés történik,
- a városlista folyamatosan változik.

Ezért szükséges a `StatefulWidget` + `State` páros.

---

# Állapotváltozók szerepe

A HomeScreen több állapotot tart fenn:

- **counties** – a backendről betöltött megyék
- **cities** – az aktuálisan megjelenített városok
- **initials** – a városok kezdőbetűi
- **selectedCountyId** – kiválasztott megye
- **selectedInitial** – aktív betűszűrő

Minden változás `setState()`‑et igényel, hogy a UI frissüljön.

---

# Lifecycle: initState()

Az `initState()` egyszer fut le, amikor a widget létrejön.  
Itt indítjuk az első API‑hívást:

```dart
loadCounties();
```

Ez garantálja, hogy a megyék betöltése csak egyszer történik meg.

---

# API‑hívások működése

A HomeScreen több külön API‑hívást indít:

- **loadCounties()** – megyék betöltése
- **loadInitials()** – kezdőbetűk betöltése
- **loadCities()** – összes város betöltése
- **loadCitiesByInitial()** – betű szerinti szűrés
- **searchCities()** – keresés

Mindegyik aszinkron (`async/await`), és a végén `setState()` frissíti a UI‑t.

---

# Keresés logikája

A keresés kétféle működést támogat:

- üres keresőmező → visszaáll az ABC szerinti lista
- szöveg megadása → backend oldali szűrés

Ez tiszta és jól elkülönített logika.

---

# A build() metódus felépítése

A UI deklaratív módon épül fel:

```
Scaffold
 ├── AppBar
 └── ListView
      ├── CountyDropdown
      ├── TextField (keresés)
      ├── Wrap (szűrőgombok)
      └── CityList
```

Minden rész külön widgetben van, ami tiszta és karbantartható struktúrát eredményez.

---

# Dinamikus gombgenerálás

A kezdőbetűk alapján generált gombok:

```dart
...initials.map((initial) => ElevatedButton(...))
```

Ez a Flutter deklaratív UI‑jának egyik legjobb példája:  
az állapot → automatikusan meghatározza a megjelenést.

---

# Modal bottom sheet – űrlapok

Az új város hozzáadása és a szerkesztés külön widgetekben történik:

- `AddCityForm`
- `EditCityForm`

A mentés után callback fut, amely újratölti a listát.  
Ez tiszta, komponens‑alapú megoldás.

---

# Tipikus felhasználói folyamat

1. Betöltődnek a megyék
2. Kiválasztunk egy megyét
3. Betöltődnek a kezdőbetűk
4. Betű szerinti szűrés
5. Keresés
6. Város hozzáadása / szerkesztése / törlése
7. Lista frissül

Ez egy teljes értékű REST API kliens működése Flutterben.

---

# Összegzés

A `HomeScreen`:

- állapotot kezel,
- lifecycle‑t használ,
- aszinkron API‑hívásokat indít,
- deklaratív UI‑t épít,
- komponensekre bontja a megjelenítést.

Itt találkozik:

- state management,
- async/await,
- HTTP kommunikáció,
- dinamikus UI generálás.

A következő részben az `ApiService` működését vizsgáljuk meg, ahol a HTTP‑hívások és a JSON‑feldolgozás részleteit mutatjuk be.
