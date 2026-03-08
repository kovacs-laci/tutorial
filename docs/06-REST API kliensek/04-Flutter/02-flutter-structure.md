---
id: rest-api-client_flutter_structure
slug: /rest-api-client/flutter/structure
title: Widgetek és az alkalmazás alapstruktúrája
---

# Widgetek és az alkalmazás alapstruktúrája Flutterben

A Flutter egyik legfontosabb alapelve:

> **Minden widget.**

A teljes felhasználói felület – szöveg, gomb, margó, lista, teljes képernyő – widgetekből épül fel. A Flutter deklaratív UI‑t használ: nem azt mondjuk, hogy *módosítsd ezt az elemet*, hanem azt, hogy *ilyen állapot esetén így nézzen ki az UI*.

---

# 1. Egy Flutter alkalmazás felépítése

Egy új projekt létrehozásakor a legfontosabb fájl:

```
lib/main.dart
```

Ez az alkalmazás belépési pontja, innen indul a widget‑fa.

## Minimális példa

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello Flutter'),
        ),
      ),
    );
  }
}
```

Ez a lehető legegyszerűbb Flutter alkalmazás: egyetlen képernyő, egyetlen szöveggel.

---

# 2. Az alkalmazás fő elemei

## main()

A program belépési pontja. A `runApp()` indítja el a widget‑fát, amelyet a Flutter motor renderel.

## MaterialApp

A `MaterialApp` az alkalmazás „kerete”:

- téma (theme)
- routing
- lokalizáció
- debug banner kezelése
- alapértelmezett Material Design stílus

A legtöbb Flutter alkalmazás ezzel indul.

## Scaffold

A `Scaffold` egy képernyő váza. Tartalmazhat:

- AppBar
- body
- floatingActionButton
- drawer
- bottomNavigationBar

A legtöbb képernyő egy Scaffold‑dal kezdődik.

---

# 3. Mi az a widget?

A widget egy osztály, amely leírja a felhasználói felület egy részét. Két fő típusa van:

## StatelessWidget

Nem tartalmaz módosítható állapotot.

```dart
class MyText extends StatelessWidget {
  const MyText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Stateless példa');
  }
}
```

A megjelenés csak a bemeneti paraméterektől függ.

---

## StatefulWidget

Tartalmaz állapotot, amely futás közben változhat.

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Érték: $count'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              count++;
            });
          },
          child: const Text('Növel'),
        ),
      ],
    );
  }
}
```

A `setState()` újrarajzolja a widgetet az aktuális állapot alapján.

---

# 4. A widget‑fa (Widget Tree)

A Flutter UI hierarchikus struktúrában épül fel.

Példa:

```
MaterialApp
 └── Scaffold
      └── Center
           └── Column
                ├── Text
                └── ElevatedButton
```

Ez hasonlít a HTML DOM‑ra, de:

- nincs valódi DOM
- nincs közvetlen manipuláció
- minden újrarajzolás deklaratív módon történik

---

# 5. Layout widgetek

A Flutterben a layoutot is widgetekkel építjük fel.

## Column

Függőleges elrendezés.

## Row

Vízszintes elrendezés.

## Container

Doboz jellegű widget:

- padding
- margin
- háttérszín
- méretezés

## Expanded

Rugalmas térkitöltés, gyakran használjuk Row/Column gyerekeiként.

---

# 6. Navigáció alapjai

Több képernyő esetén navigáció szükséges.

Egyszerű példa:

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => const SecondScreen(),
  ),
);
```

A `Navigator` veremként kezeli a képernyőket (stack).

---

# 7. Projektstruktúra javaslat REST API klienshez

Egy jól szervezett Flutter projekt tipikusan így épül fel:

```
lib/
 ├── main.dart
 ├── screens/
 ├── models/
 ├── services/
 └── widgets/
```

## screens/

Képernyők (lista oldal, részletező oldal, űrlapok).

## models/

Adatmodellek (JSON → Dart objektum).

## services/

HTTP kommunikáció (REST API hívások, pl. `ApiService`).

## widgets/

Újrahasznosítható UI elemek (pl. gombok, kártyák, listacellák).

Ez a struktúra nagyon hasonló a webes rétegzett gondolkodáshoz:

- Laravel → Controller / Model / Service
- Flutter REST kliens → UI / Data / Network réteg

---

# 8. Declarative UI szemlélet

A Flutter deklaratív UI‑t használ.

Nem azt mondjuk:

> „változtasd meg ezt az elemet”

Hanem:

> „ilyen állapot esetén így nézzen ki az UI”

Ez jelentős szemléletváltás a klasszikus DOM‑manipulációhoz képest.

A Flutter újrarajzolja a widgetet, ha változik az állapot – nekünk csak azt kell leírni, hogy az adott állapothoz milyen UI tartozik.

---

# Összegzés

A Flutter alkalmazás:

- widgetek hierarchiájából épül fel,
- deklaratív módon működik,
- Stateless és Stateful widgetekre épít,
- jól strukturálható REST API kliens készítéséhez.

A következő lépésben egy gyakorlati példán keresztül mutatjuk be a REST API kliens fejlesztésének lépéseit Flutterben.
