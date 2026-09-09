---
id: git-csoportmunka
slug: /git-csoportmunka
title: "Haladó workflow"
---
## Fejlesztés több fejlesztővel

Ez a workflow bemutatja:
- Hogyan dolgozik több fejlesztő párhuzamosan.
- Hogyan kezeljük a merge conflictokat.
- Hogyan használjuk a stash‑t, ha félbe kell hagyni a munkát.
---
👉 A Git nemcsak a verziókövetés, hanem a **csapatmunka eszköze** is.

### 1. Projekt klónozása
```bash
git clone https://github.com/team/projekt.git
cd projekt
```
👉 Minden fejlesztő ugyanabból a közös repo‑ból indul.

---

### 2. Saját branch létrehozása
```bash
git switch -c feature-ujfunkcio
```
👉 Mindenki külön branch‑en dolgozik, így a fő branch (`main`) stabil marad.

---

### 3. Módosítások commitolása
```bash
git status
git add [módosított fájl]
git diff --staged
git commit -m "Új funkció implementálása"
```
👉 A saját fejlesztés rögzítése.

---

### 4. Branch feltöltése
```bash
git push origin feature-ujfunkcio
```
👉 A csapat többi tagja is látja a fejlesztést.

Ezután a GitHubon vagy GitLabon pull requestet nyithatsz a `feature-ujfunkcio` és a `main` branch között. A pull request célja a kód átnézése, a tesztek futtatása és a változtatás jóváhagyása a merge előtt.

Saját fork frissítése az eredeti repositoryból:

```bash
git remote add upstream https://github.com/eredeti/projekt.git
git fetch upstream
git switch main
git merge upstream/main
```

Az `origin` általában a saját forkodra, az `upstream` pedig az eredeti projektre mutat.

---

### 5. Mások változtatásainak letöltése
```bash
git fetch origin
git log --oneline main..origin/main
git switch main
git pull --ff-only origin main
git switch feature-ujfunkcio
git merge main
```
👉 Előbb megtekintjük a távoli változásokat, frissítjük a `main` ágat, majd beolvasztjuk annak változásait a saját feature branch-be.

---

### 6. Merge conflict kezelése
Konfliktus keletkezhet a `git pull` vagy a saját feature branch frissítésekor kiadott `git merge main` után:
- A Git jelzi, mely fájlokban van ütközés.
- A fájlban speciális jelölések (`<<<<<<<`, `=======`, `>>>>>>>`) mutatják a két verziót.
- A fejlesztő kézzel kiválasztja vagy összevonja a megfelelő részeket.
- Ezután:
```bash
git add [érintett fájl]
git status
git commit
```

Ha a merge folyamatát meg szeretnéd szakítani:

```bash
git merge --abort
```

---

### 7. Stash használata (ha félbe kell hagyni a munkát)
```bash
git stash push -m "félbehagyott feature"
git pull --ff-only origin main
git stash pop
```
👉 A stash ideiglenesen elmenti a módosításokat, így frissíthető a repo, majd visszaállítható a munka. Ha ellenőrzés után szeretnéd megtartani a stash-t, használj `git stash apply stash@{0}` parancsot; a `git stash pop` sikeres alkalmazás után eltávolítja azt.

---

### 8. Branch összevonása a fő branch-be
```bash
git switch main
git merge feature-ujfunkcio
git push
```
👉 A fejlesztés bekerül a fő branch‑be, és mindenki számára elérhető.

---

