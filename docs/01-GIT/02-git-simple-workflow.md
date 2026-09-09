---
id: git-egyszeru-munkafolyamat
slug: /git-egyszeru-munkafolyamat
title: "Egyszerű munkafolyamat"
---
Ez a folyamat bemutatja, hogyan indul egy projekt, hogyan kezeljük a változtatásokat, és hogyan dolgozunk külön branch-eken. 

### 1. Új repository létrehozása
```bash
git init
git branch -M main
```
👉 Létrehoz egy üres Git repository-t az aktuális könyvtárban.

### 2. Első fájlok hozzáadása
Hozz létre előbb egy `.gitignore` fájlt, például:

```gitignore
.env
vendor/
node_modules/
build/
*.log
```

```bash
git status
git add README.md .gitignore
git diff --staged
git commit -m "Első commit: projekt inicializálása"
```
👉 Csak az ellenőrzött fájlok kerülnek a staging area-ba.

### 3. Távoli repository beállítása
```bash
git remote add origin https://github.com/felhasznalo/projekt.git
git push --set-upstream origin main
```
👉 Kapcsolat a GitHub/GitLab repo-val, majd az első feltöltés.

### 4. Új funkció fejlesztése külön branch-en
```bash
git switch -c feature-login
```
👉 Új branch létrehozása a login funkcióhoz.

### 5. Módosítások hozzáadása és commitolása
```bash
git add login.js
git diff --staged
git commit -m "Login funkció implementálása"
```
👉 A változtatások rögzítése a `feature-login` branch-en.

### 6. Branch feltöltése a távoli repo-ba
```bash
git push origin feature-login
```
👉 A fejlesztői branch megosztása a csapattal.

Feltöltés előtt ellenőrizd a munkafát és az utolsó commitokat:

```bash
git status
git log --oneline -3
```

### 7. Visszaolvasztás a fő branch-be
```bash
git switch main
git pull --ff-only origin main
git merge feature-login
git push
```
👉 A `feature-login` branch változásai bekerülnek a `main` branch-be, majd feltöltjük a távoli repo-ba.

---