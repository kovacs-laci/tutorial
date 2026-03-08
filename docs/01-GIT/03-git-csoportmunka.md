---
id: git-csoportmunka
slug: /git-csoportmunka
title:  Haladó workflow
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
git checkout -b feature-ujfunkcio
```
👉 Mindenki külön branch‑en dolgozik, így a fő branch (`main` vagy `master`) stabil marad.

---

### 3. Módosítások commitolása
```bash
git add .
git commit -m "Új funkció implementálása"
```
👉 A saját fejlesztés rögzítése.

---

### 4. Branch feltöltése
```bash
git push origin feature-ujfunkcio
```
👉 A csapat többi tagja is látja a fejlesztést.

---

### 5. Mások változtatásainak letöltése
```bash
git pull origin main
```
👉 A fő branch frissítése a távoli repo‑ból. Ha valaki más már commitolt, itt jönnek elő az eltérések.

---

### 6. Merge conflict kezelése
Ha a `git pull` után konfliktus van:
- A Git jelzi, mely fájlokban van ütközés.
- A fájlban speciális jelölések (`<<<<<<<`, `=======`, `>>>>>>>`) mutatják a két verziót.
- A fejlesztő kézzel kiválasztja vagy összevonja a megfelelő részeket.
- Ezután:
```bash
git add [érintett fájl]
git commit -m "Merge conflict megoldása"
```

---

### 7. Stash használata (ha félbe kell hagyni a munkát)
```bash
git stash
git pull origin main
git stash pop
```
👉 A stash ideiglenesen elmenti a módosításokat, így frissíthető a repo, majd visszaállítható a munka.

---

### 8. Branch összevonása a fő branch-be
```bash
git checkout main
git merge feature-ujfunkcio
git push
```
👉 A fejlesztés bekerül a fő branch‑be, és mindenki számára elérhető.

---

