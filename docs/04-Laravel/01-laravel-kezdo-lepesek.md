---
id: laravel-fullstack-setup
slug: /laravel/fullstack-setup
title: "Projekt előkészítése"
---

# Laravel Fullstack projekt létrehozása

Ebben a fejezetben lépésről lépésre előkészítünk egy **Laravel fullstack projektet**, amelyben a következő adatmodellel fogunk dolgozni:

```text
County
- id
- name

City
- id
- county_id
- name
- zip_code
````

A példákban a **megyék és városok** adatait fogjuk kezelni.

---

# 1. Laravel projekt létrehozása

Új Laravel projekt létrehozása a Composer segítségével:

```bash
composer create-project laravel/laravel [project_name]
```

**Példa:**

```bash
composer create-project laravel/laravel laravel-zip
```

Ez létrehozza a projekt teljes könyvtárszerkezetét.

---

# 2. Laravel projekt klónozása repóból

Ha a projektet egy meglévő Git repóból szeretnénk klónozni:

```bash
git clone <url> [projekt-konyvtar]
```

* A `projekt-konyvtar` megadása **opcionális**.
* Ha nem adjuk meg, akkor a repó nevével hozza létre a könyvtárat.

---

# 3. Belépés a projekt könyvtárába

```bash
cd [project_name]
```

**Példa:**

```bash
cd laravel-zip
```

---

# 4. Függőségek telepítése klónozás után

Ha a projektet repóból klónoztuk, először futtassuk:

```bash
composer update
```

Ez letölti és frissíti a szükséges PHP csomagokat.

---

# 5. `.env` fájl előkészítése

Készítsünk másolatot a `.env.example` fájlból, és nevezzük át `.env`-re:

Windows rendszeren:

```bash
copy .env.example .env
```

Linux vagy Mac rendszeren:

```bash
cp .env.example .env
```

Ezután szerkesszük a `.env` fájlt az adatbázis kapcsolat beállításához.

---

# 6. Adatbázis kapcsolat beállítása

A `.env` fájlban állítsuk be az adatbázis kapcsolatot:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_zip
DB_USERNAME=root
DB_PASSWORD=
```

Ez az adatbázis fogja tárolni a következő táblákat:

```text
counties
cities
```

---

# 7. APP_KEY létrehozása

Ha a `.env` fájlban nincs beállítva az `APP_KEY`, futtassuk a következő parancsot:

```bash
php artisan key:generate
```

Ez létrehozza és beállítja az alkalmazás titkos kulcsát.

Az `APP_KEY` szükséges több Laravel funkció működéséhez, például:

* session kezelés
* titkosítás
* cookie-k kezelése

---

# Következő lépés

A következő leckében létrehozzuk az adatbázis migrációkat a következő táblákhoz:

```text
counties
cities
```

és definiáljuk a mezőket:

```text
counties
- id
- name

cities
- id
- county_id
- name
- zip_code
```
