---
id: rest-api-client_flutter_setup
slug: /rest-api-client/flutter/setup
title: Fejlesztőkörnyezet telepítése
---

# Flutter fejlesztőkörnyezet telepítése

A Flutter fejlesztéshez három fő összetevőre van szükség:

1. Flutter SDK  
2. Fejlesztői környezet (Android Studio vagy VS Code)  
3. Android eszköz vagy emulátor  

Az alábbi lépések végigvezetnek a teljes telepítési folyamaton.

---

# 1. Flutter SDK telepítése

## 1. lépés – Hivatalos oldal megnyitása

A Flutter SDK a hivatalos weboldalról tölthető le:

👉 https://flutter.dev  
👉 https://docs.flutter.dev/get-started/install

Mindig a hivatalos forrásból töltsd le.

---

## 2. lépés – Operációs rendszer kiválasztása

A telepítő oldalon válaszd ki a saját rendszeredet:

- Windows  
- macOS  
- Linux  

A megfelelő ZIP csomagot töltsd le.

---

## 3. lépés – Kicsomagolás

A letöltött ZIP fájlt csomagold ki egy egyszerű elérési útra:

- Windows: `C:\flutter`  
- macOS / Linux: `~/development/flutter`

Fontos:  
Ne kerüljön olyan mappába, amely rendszerszintű jogosultságot igényel (pl. Program Files).

---

## 4. lépés – PATH változó beállítása

A `flutter/bin` mappát hozzá kell adni a PATH‑hoz.

Ellenőrzés:

```bash
flutter --version
```

Ha megjelenik a verziószám, a PATH beállítása sikeres.

Megjegyzés:  
A PATH módosítása után **új terminált kell nyitni**, különben a változás nem érvényesül.

---

## 5. lépés – Telepítés ellenőrzése

```bash
flutter doctor
```

A `flutter doctor` megmutatja:

- mi van rendben
- mi hiányzik
- milyen további komponensek szükségesek (Android SDK, emulátor, pluginok)

A telepítés akkor teljes, ha minden sor zöld pipát kap.

---

# 2. Fejlesztőkörnyezet telepítése

A Flutter fejlesztéshez szükség van egy IDE‑re. Két ajánlott lehetőség:

---

## Opció 1 – Android Studio

Letöltés:  
👉 https://developer.android.com/studio

Az Android Studio tartalmazza:

- Android SDK
- Android Virtual Device (emulátor)
- Platform‑eszközök
- ADB (Android Debug Bridge)

### Telepítés után:

1. Nyisd meg az Android Studio‑t
2. Menj a **Plugins** menübe
3. Telepítsd:
   - Flutter plugin
   - Dart plugin
4. Indítsd újra az IDE‑t

Ez a legteljesebb és legkényelmesebb környezet Flutter fejlesztéshez.

---

## Opció 2 – Visual Studio Code

Letöltés:  
👉 https://code.visualstudio.com

A VS Code könnyű és gyors, de **nem tartalmaz Android SDK‑t**, ezért az Android Studio telepítése továbbra is szükséges.

### Telepítés után:

Extensions menü → telepítsd:

- Flutter
- Dart

A VS Code jó választás, ha könnyű, gyors szerkesztőt szeretnél.

---

# 3. Android emulátor beállítása

Android emulátor létrehozása Android Studio‑ban:

1. Tools → Device Manager
2. Create Device
3. Telefon modell kiválasztása
4. Android verzió kiválasztása
5. Emulátor létrehozása és indítása

Megjegyzés:  
Az x86‑os (Intel/AMD) képfájlok gyorsabbak, mint az ARM‑osak.

### Alternatíva: fizikai Android készülék

1. Fejlesztői mód bekapcsolása
2. USB debugging engedélyezése
3. USB‑n csatlakoztatás

A Flutter automatikusan felismeri a csatlakoztatott eszközt.

---

# 4. Első Flutter projekt létrehozása

Parancssorban:

```bash
flutter create my_app
cd my_app
flutter run
```

Ez:

- létrehozza a projektet
- letölti a függőségeket
- elindítja az alkalmazást az emulátoron vagy a csatlakoztatott eszközön

Ha több eszköz is elérhető, a Flutter rákérdez, melyiken fusson.

---

# 5. Projektstruktúra áttekintése

A Flutter projekt fő mappái:

- `lib/` — az alkalmazás forráskódja
- `lib/main.dart` — a belépési pont
- `pubspec.yaml` — függőségek, assetek, verziószám
- `android/` — Android specifikus fájlok
- `ios/` — iOS specifikus fájlok
- `test/` — tesztek

A fejlesztés döntő része a `lib/` mappában történik.

---

# Flutter kliens fejlesztés REST API‑hoz

A REST API használata Flutterben ugyanarra az elvre épül, mint webes környezetben:

1. HTTP kérés küldése
2. JSON válasz fogadása
3. Objektummá alakítás (modellek)
4. Megjelenítés widgetekben

A különbség:

- nincs HTML
- nincs CSS
- nincs DOM
- a teljes UI Dart widgetekből épül fel

A Flutterben a REST API kommunikációhoz általában a `http` csomagot használjuk.

---

# Összegzés

A Flutter fejlesztőkörnyezet beállítása három fő lépésből áll:

1. Flutter SDK telepítése
2. IDE telepítése (Android Studio vagy VS Code)
3. Android eszköz vagy emulátor konfigurálása

Ha ezek rendben vannak, a fejlesztés azonnal elkezdhető.

A következő fejezetben megismerjük a Flutter widgeteket és az alkalmazás alapstruktúráját.
