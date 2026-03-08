---
id: git-egyszeru-munkafolyamat
slug: /git-egyszeru-munkafolyamat
title: "Egyszerű munkafolyamat"
---
Ez a folyamat bemutatja, hogyan indul egy projekt, hogyan kezeljük a változtatásokat, és hogyan dolgozunk külön branch-eken. 

### 1. Új repository létrehozása
```bash
git init
```
👉 Létrehoz egy üres Git repository-t az aktuális könyvtárban.

### 2. Első fájlok hozzáadása
```bash
git add .
git commit -m "Első commit: projekt inicializálása"
```
👉 Az összes fájl bekerül a verziókövetésbe, és rögzítjük az első állapotot.

### 3. Távoli repository beállítása
```bash
git remote add origin https://github.com/felhasznalo/projekt.git
git push --set-upstream origin master
```
👉 Kapcsolat a GitHub/GitLab repo-val, majd az első feltöltés.

### 4. Új funkció fejlesztése külön branch-en
```bash
git checkout -b feature-login
```
👉 Új branch létrehozása a login funkcióhoz.

### 5. Módosítások hozzáadása és commitolása
```bash
git add login.js
git commit -m "Login funkció implementálása"
```
👉 A változtatások rögzítése a `feature-login` branch-en.

### 6. Branch feltöltése a távoli repo-ba
```bash
git push origin feature-login
```
👉 A fejlesztői branch megosztása a csapattal.

### 7. Visszaolvasztás a fő branch-be
```bash
git checkout master
git pull
git merge feature-login
git push
```
👉 A `feature-login` branch változásai bekerülnek a `master` branch-be, majd feltöltjük a távoli repo-ba.

---