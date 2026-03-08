---
id: rest-client-folder-structure
title: Projekt mappastruktúra és inicializálás
sidebar_label: Mappastruktúra
slug: /rest-client/folder-structure
---

# Projekt mappastruktúra és inicializálás

A REST API kliens egy önálló PHP alkalmazás, amely **nem tartalmaz adatbázist**,  
és **nem futtat SQL lekérdezéseket**.  
Minden adatot a háttérben futó REST API‑tól kér le HTTP kérésekkel.

Ahhoz, hogy a projekt átlátható és bővíthető legyen, először létre kell hoznunk  
a teljes mappastruktúrát.

Ebben a fejezetben:

- létrehozzuk a projekt könyvtárait,
- előkészítjük a Composer használatát,
- és felépítjük a REST kliens alapját.

---

# Mappastruktúra áttekintése

A projekt a következő könyvtárakból fog állni:

```
rest-client/
│
├── app/
│   ├── Controllers/      # Az alkalmazás vezérlői
│   ├── Http/             # API hívások (GET, POST, PUT, DELETE)
│   ├── Router/           # Egyszerű útvonalkezelő
│   ├── Views/            # Nézetek (HTML generálás)
│   │   ├── Layout/       # LayoutView, MenuView
│   │   ├── Components/   # Gombok, táblázatok, űrlapok
│   │   └── Counties/     # A megyékhez tartozó view-k
│   └── Models/           # (Opcionális) API válaszok modellezése
│
├── config/               # API URL és egyéb beállítások
│
├── public/               # Egyetlen belépési pont: index.php
│
├── logs/                 # API hívások naplózása
│
├── storage/              # Ideiglenes fájlok, cache
│
└── vendor/               # Composer által generált könyvtár
```

Ez a struktúra:

- tiszta,
- bővíthető,
- könnyen tanítható,
- és teljesen megfelel egy modern REST kliens architektúrának.

---

# Mappastruktúra létrehozása batch fájllal

Windows alatt egyszerűen létrehozhatjuk a projekt könyvtárait egy `.bat` fájl segítségével.

Hozz létre egy új fájlt:

```
init-rest-client.bat
```

és másold bele az alábbi tartalmat:

```bat
@echo off 
chcp 65001 >nul

echo REST API kliens projekt inicializálása...

REM --- Fő mappák ---
mkdir app
mkdir app\Controllers
mkdir app\Http
mkdir app\Router
mkdir app\Models
mkdir app\Views
mkdir app\Views\Layout
mkdir app\Views\Components
mkdir app\Views\Counties

REM --- Konfiguráció ---
mkdir config

REM --- Publikus mappa ---
mkdir public

REM --- Egyéb ---
mkdir logs
mkdir storage

echo Mappastruktúra létrehozva.
echo Most futtasd: composer init
```

---

# A batch fájl futtatása

1. Helyezd a `init-rest-client.bat` fájlt a projekt gyökérkönyvtárába.
2. Kattints rá duplán, vagy futtasd terminálból:

```
init-rest-client.bat
```

3. A fájl létrehozza a teljes projektstruktúrát.
4. A végén ezt írja ki:

```
Most futtasd: composer init
```

Ez lesz a következő lépés.
