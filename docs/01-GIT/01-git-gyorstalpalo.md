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
git checkout -b [branch neve]
```
Új branch létrehozása és azonnali átváltás rá.

### Váltás egy branch-re
```bash
git checkout [branch neve]
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
Az összes módosított fájl hozzáadása a staging area‑hoz.

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
git push --set-upstream origin master
```
Beállítja, hogy a helyi `master` branch kövesse a távoli `master` branch‑et. Ezután elég a sima `git push`.

---

## Push és Pull

### Változások beküldése
```bash
git push
```
A helyi commitok feltöltése a távoli repository‑ba.

### Aktuális branch lekérése
```bash
git pull
```
A távoli repository változásainak letöltése és beolvasztása a helyi branch‑be.

---

## Merge

```bash
git checkout [cél branch]
git merge [branch]
```
Az adott branch változásainak beolvasztása a cél branch‑be. Előtte mindig váltani kell a cél branch‑re.

---

## Visszaállítás és revert

### Egy fájl visszaállítása
```bash
git checkout [fájl neve]
```
A fájl visszaállítása az utolsó commit állapotára, a helyi módosítások elvetésével.

### Korábbi commit visszavonása
```bash
git revert <commit-hash>
```
Új commit létrehozása, amely visszavonja a megadott commit változtatásait.

---

## Ellenőrzés és diff

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
git stash
```
Az aktuális, commitolatlan változtatások ideiglenes elmentése egy verembe, majd a munkakönyvtár visszaállítása tiszta állapotra.

### Változások visszahozása
```bash
git stash pop
```
A legutolsó stash visszaállítása a munkakönyvtárba, és eltávolítása a veremből.
```

