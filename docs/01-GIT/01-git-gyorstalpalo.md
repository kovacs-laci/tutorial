---
id: git-gyorstalpalo
slug: /git-gyorstalpalo
title: "Gyorstalpaló"
---
# Git parancsok és példák

Ez a dokumentum rövid áttekintést ad a leggyakoribb Git parancsokról, rövid magyarázatokkal és példákkal kiegészítve.

---

## Repo inicializálása

```bash
git init
```
Új, üres Git repository létrehozása az aktuális könyvtárban.

```bash
git clone <url> [cél mappa]
```
Meglévő távoli repository klónozása. Ha nem adsz meg cél mappát, a repo nevével jön létre a könyvtár.

---

## Branch kezelés

### Új branch létrehozása
```bash
git switch -c [branch neve]
```
Új branch létrehozása és azonnali átváltás rá. Régebbi Git-verziókban ugyanerre a `git checkout -b` parancsot használják.

### Váltás egy branch-re
```bash
git switch [branch neve]
```
Átváltás egy már létező branch‑re.

### Branchek lekérdezése
```bash
git branch -a
```
Az összes helyi és távoli branch listázása.

---

## Változások kezelése

### Kód változásainak lekérdezése
```bash
git status
```
Megmutatja, mely fájlok módosultak, melyek kerültek a staging area‑ba, és melyek nincsenek verziókövetés alatt.

### Változások hozzáadása
```bash
git add [fájl neve]
```
Egy konkrét fájl hozzáadása a staging area‑hoz.

```bash
git add .
```
Az összes módosított fájl hozzáadása a staging area-hoz. Csak a `git status` ellenőrzése után használd, mert érzékeny vagy ideiglenes fájlokat is hozzáadhat.

### Staging ellenőrzése
```bash
git diff
git diff --staged
```
Az első a még staging előtt álló, a második a commitra előkészített módosításokat mutatja.

### Commit készítése
```bash
git commit -m "commit message"
```
A staging area tartalmának rögzítése a repository‑ban. A commit üzenet röviden írja le a változtatás célját.

---

## Távoli repo beállítása

```bash
git remote add origin [url_to_remote_repository]
```
Távoli repository (pl. GitHub) hozzárendelése az aktuális projekthez.

### Upstream beállítása
```bash
git push --set-upstream origin main
```
Beállítja, hogy a helyi `main` branch kövesse a távoli `main` branch‑et. Ezután elég a sima `git push`.

---

## Push és Pull

### Változások beküldése
```bash
git push
```
A helyi commitok feltöltése a távoli repository‑ba.

Push előtt érdemes ellenőrizni, hogy valóban a megfelelő commitokat küldöd-e fel:

```bash
git status
git log --oneline -3
git push
```

### Aktuális branch lekérése
```bash
git pull --ff-only origin main
```
A távoli repository változásainak letöltése és beolvasztása a helyi `main` branch-be. A `--ff-only` megakadályozza a váratlan merge commit létrehozását.

A `git pull` két lépést végez el egymás után:

```text
git pull = git fetch + git merge
```

Ha előbb csak megnéznéd a távoli változásokat, használd külön a `git fetch` parancsot.

### Távoli változások előzetes megtekintése
```bash
git fetch origin
git log --oneline main..origin/main
```
A `fetch` letölti a távoli változásokat, de nem módosítja automatikusan a munkakönyvtárat.

---

## Merge

```bash
git switch [cél branch]
git merge [branch]
```
Az adott branch változásainak beolvasztása a cél branch‑be. Előtte mindig váltani kell a cél branch‑re.

---

## Visszaállítás és revert

### Egy fájl visszaállítása
```bash
git restore --source=HEAD -- [fájl neve]
```
A fájl visszaállítása az utolsó commit állapotára. A helyi módosítások elvesznek, ezért a parancs előtt ellenőrizd a `git diff` kimenetét.

### Korábbi commit visszavonása
```bash
git revert <commit-hash>
```
Új commit létrehozása, amely visszavonja a megadott commit változtatásait.

---

## Ellenőrzés és diff

### Commitok áttekintése
```bash
git log --oneline --graph --decorate --all
```

### Távoli repository ellenőrzése
```bash
git remote -v
```

### Ki módosította az adott fájlt
```bash
git blame <fájl neve>
```
Megmutatja, mely commitban és ki módosította az adott sorokat.

### Módosítások megtekintése
```bash
git diff <fájl neve>
```
Megjeleníti a fájl aktuális állapota és az utolsó commit közötti különbséget.

---

## Branch törlése

### Helyi branch törlése
```bash
git branch -d kiserleti
```
Törli a helyi branch‑et, ha már be van olvasztva.

### Branch törlése mindenhol
```bash
git branch -D kiserleti
```
Erőszakosan törli a branch‑et, akkor is, ha nincs merge‑ölve.

---

## Stash

### Változások mentése
```bash
git stash push -m "félbehagyott munka"
```
Az aktuális, commitolatlan változtatások ideiglenes elmentése egy verembe, majd a munkakönyvtár visszaállítása tiszta állapotra.

### Változások visszahozása
```bash
git stash list
git stash pop
```
A stash-ek listázása, majd a legutolsó visszaállítása és eltávolítása a veremből. Ütközés esetén a stash nem feltétlenül törlődik automatikusan.

Ha előbb ellenőriznéd a visszaállított változásokat, használd az `apply` parancsot, majd szükség esetén töröld a stash-t:

```bash
git stash list
git stash apply stash@{0}
git stash drop stash@{0}
```

## Commitüzenetek

Az alábbi előtagok használata ajánlott konvenció, nem kötelező Git-szabály:

```bash
git commit -m "feat: add login form"
git commit -m "fix: validate empty email"
git commit -m "docs: update Git workflow"
```

- `feat`: új funkció;
- `fix`: hibajavítás;
- `docs`: dokumentáció;
- `refactor`: szerkezeti átalakítás;
- `test`: teszt módosítása.


