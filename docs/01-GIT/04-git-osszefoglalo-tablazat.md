---
id: git-osszefoglalo-tablazat
slug: /git-osszefoglalo-tablazat
title: "Összefoglaló táblázat"
---

Segít gyorsan átlátni, hogy különböző helyzetekben (egyéni projekt, csapatmunka, open source hozzájárulás) mely parancsok kerülnek elő leggyakrabban.

---

## Git workflow összefoglaló

| Szcenárió                 | Tipikus lépések | Gyakori parancsok                                                                      | Megjegyzés |
|---------------------------|-----------------|----------------------------------------------------------------------------------------|------------|
| **Egyéni projekt**        | Repo inicializálása, fájlok hozzáadása, commitok készítése, push/pull a saját távoli repo-ba | `git init` `git add .` `git commit -m` `git push`- `git pull`                          | Egyszerű folyamat, nincs merge conflict. |
| **Csapatmunka**           | Repo klónozása, saját branch létrehozása, fejlesztés, commit, push, pull, merge, stash szükség esetén | `git clone` `git checkout -b` `git add` `git commit` `git push` `git pull` `git merge` `git stash` | Merge conflict gyakori, stash segít félbehagyott munkánál. |
| **Open source hozzájárulás** | Fork készítése, klónozás, új branch, fejlesztés, commit, push, pull request létrehozása | Fork (GitHub/GitLab funkció) `git clone` `git checkout -b` `git commit` `git push`     | A változtatások PR formájában kerülnek be a fő projektbe. |
| **Haladó csapatmunka**    | Több fejlesztő párhuzamosan dolgozik, gyakori pull, merge conflict kezelése, revert szükség esetén | `git pull` `git merge` `git revert` `git blame` `git diff`                             | Fontos a kommunikáció és a konfliktusok gyors megoldása. |
| **Kísérleti fejlesztés**  | Új ötletek kipróbálása külön branch-en, majd törlés ha nem kell | `git checkout -b` `git branch -d` `git branch -D`                                      | Így a fő branch tiszta marad. |

---

## Használati tippek
- **Egyéni projekt**: fókusz a `init → add → commit → push` cikluson.
- **Csapatmunka**: mindig külön branch‑en dolgozz, és rendszeresen `pull`‑olj a fő branch‑ből.
- **Open source**: a fork + pull request workflow a kulcs.
- **Haladó csapatmunka**: merge conflict kezelés és `stash` használat a mindennapok része.
- **Kísérleti fejlesztés**: bátran próbálj ki új dolgokat külön branch‑en, majd töröld, ha nem kell.

---
