---
id: rest-api-client_flutter_app_styles
slug: /rest-api-client/flutter/app-styles
title: AppStyles – Központosított stíluskezelés Flutterben
---

# AppStyles – Központosított stíluskezelés Flutterben

Ebben a leckében az `AppStyles` osztályt vizsgáljuk meg.

Ez a komponens felel:

* az alkalmazás egységes megjelenéséért
* az újrafelhasználható gombstílusokért
* a swipe háttér stílusáért
* a vizuális konzisztenciáért

Ez már a **design rendszer alapja**.

---

## 📁 `styles.dart`

```dart id="app_styles_full"
import 'package:flutter/material.dart';

class AppStyles {
  static final ButtonStyle selectedButton = ElevatedButton.styleFrom(
    backgroundColor: Colors.blue,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
    textStyle: const TextStyle(fontSize: 20),
  );

  static final ButtonStyle unselectedButton = ElevatedButton.styleFrom(
    backgroundColor: Colors.grey[300],
    foregroundColor: Colors.black,
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
    textStyle: const TextStyle(fontSize: 20),
  );

  static final ButtonStyle addIconButton = ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.green),
    shape: WidgetStatePropertyAll(CircleBorder()),
    padding: WidgetStatePropertyAll(EdgeInsets.all(12)),
  );

  static final Widget dismissDeleteBackground = Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    padding: EdgeInsets.symmetric(horizontal: 20),
    child: Icon(Icons.delete, color: Colors.white),
  );

  static final Widget dismissEditBackground = Container(
    color: Colors.blue,
    alignment: Alignment.centerLeft,
    padding: EdgeInsets.symmetric(horizontal: 20),
    child: Icon(Icons.edit, color: Colors.white),
  );

  static final ButtonStyle saveIconButton = ElevatedButton.styleFrom(
    backgroundColor: Colors.green,
    foregroundColor: Colors.white,
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    textStyle: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
    ),
  );

  static final ButtonStyle cancelIconButton = ElevatedButton.styleFrom(
    backgroundColor: Colors.amber,
    foregroundColor: Colors.black,
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    textStyle: const TextStyle(fontSize: 16),
  );
}
```

---

# Miért fontos ez az osztály?

Ha minden gomb így nézne ki:

```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.green,
    ...
  ),
)
```

akkor:

* ismétlődne a kód
* nehezen lenne módosítható
* szétesne a design
* nem lenne konzisztens

Az `AppStyles` ezt centralizálja.

---

# 1 ButtonStyle használata

## selectedButton

```dart
static final ButtonStyle selectedButton = ElevatedButton.styleFrom(...)
```

Ez:

* aktív állapot
* kiemelt háttérszín
* fehér szöveg
* nagyobb betűméret

Jellemzően szűrő vagy állapotgomb esetén használható.

---

## unselectedButton

```dart
static final ButtonStyle unselectedButton = ElevatedButton.styleFrom(...)
```

Ez:

* halvány háttér
* sötét szöveg
* vizuálisan inaktív állapot

Ez egy klasszikus „toggle” minta.

---

# 2 WidgetStatePropertyAll használata

```dart
static final ButtonStyle addIconButton = ButtonStyle(
  backgroundColor: WidgetStatePropertyAll(Colors.green),
)
```

Ez egy modernebb API.

Régebben:

```dart
MaterialStateProperty.all(...)
```

Az új Flutter verziókban:

```dart
WidgetStatePropertyAll(...)
```

Ez biztosítja, hogy a stílus:

* minden állapotban (hover, pressed, disabled) azonos legyen

---

# 3 Swipe háttér (Dismissible)

Ez az egyik legszebb része a projektnek.

```dart
static final Widget dismissDeleteBackground = Container(...)
```

Ez kapcsolódik a `CityList`-hez.

## Törlés háttér

* piros
* jobb oldalra igazított ikon
* delete ikon

## Szerkesztés háttér

* kék
* bal oldalra igazított ikon
* edit ikon

Ez vizuálisan azonnal jelzi a műveletet.

---

# Miért jobb ez külön fájlban?

Ha később:

* sötét módot vezetünk be
* teljes arculatot cserélünk
* színeket egységesítünk
* design systemet vezetünk be

akkor csak itt kell módosítani.

---

# 4 Save és Cancel gombok

```dart
static final ButtonStyle saveIconButton
static final ButtonStyle cancelIconButton
```

Ez biztosítja:

* konzisztens mentési szín (zöld)
* konzisztens megszakítás szín (amber)
* egységes padding
* egységes tipográfia

Ez professzionális UX.

---

# Architektúra szempont

A UI réteg így néz ki:

```text
UI Widgets
   ↓
AppStyles (shared)
   ↓
Material Design
```

Az `AppStyles` egy köztes absztrakció.

---

# Jó gyakorlatok

## ✔ Ne használjunk inline stílust

Rossz:

```dart
ElevatedButton(style: ElevatedButton.styleFrom(...))
```

Jó:

```dart
ElevatedButton(style: AppStyles.saveIconButton)
```

---

## ✔ Központosított színkezelés

Még fejlettebb megoldás lehetne:

```dart
class AppColors { ... }
```

és az `AppStyles` azokat használná.

---

## ✔ Továbblépési lehetőség: ThemeData

Haladó megoldás:

```dart
ThemeData(
  elevatedButtonTheme: ...
)
```

---

# Mit tanultunk ebből?

Az `AppStyles`:

* megszünteti a kódduplikációt,
* egységesíti a megjelenést,
* skálázhatóvá teszi a UI-t,
* előkészíti a design system alapját,
* segít a karbantarthatóságban.

---

# Fontos szakmai kiegészítés

A form widgetekben érdemes lenne hozzáadni:

```dart
@override
void dispose() {
  nameController.dispose();
  zipController.dispose();
  super.dispose();
}
```

Ez megakadályozza a memóriaszivárgást.

---

# Összegzés

Az `AppStyles`:

* a projekt vizuális központja
* konzisztens UI-t biztosít
* tiszta architektúrát támogat
* előkészíti a haladóbb Theme alapú megoldásokat
* skálázható design irányba visz
