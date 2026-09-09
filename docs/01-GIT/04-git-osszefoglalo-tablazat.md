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
| **Egyéni projekt**        | Repo inicializálása, `.gitignore`, fájlok ellenőrzése, commit, push | `git init` `git status` `git add` `git diff --staged` `git commit` `git push` | Egyszerű folyamat, a staging ellenőrzése fontos. |
| **Csapatmunka**           | Repo klónozása, feature branch, fetch, merge, konfliktuskezelés | `git clone` `git switch -c` `git fetch` `git merge` `git stash` | A `main` branch maradjon stabil. |
| **Open source hozzájárulás** | Fork, klónozás, branch, push, pull request, review | `git clone` `git switch -c` `git push` | A változtatások pull request formájában kerülnek be. |
| **Visszavonás**           | Biztonságos fájl-visszaállítás vagy korábbi commit visszavonása | `git restore` `git revert` | A `restore` helyi módosítást dob el, a `revert` új commitot készít. |
| **Kísérleti fejlesztés**  | Új ötlet kipróbálása külön branch-en, majd törlés | `git switch -c` `git branch -d` `git branch -D` | A `-D` csak akkor használható, ha tudatosan eldobod a branch-et. |

---

## Használati tippek
- **Egyéni projekt**: fókusz a `status → add → diff --staged → commit → push` cikluson.
- **Csapatmunka**: mindig külön branch-en dolgozz, frissíts `fetch`/`pull` segítségével, majd merge-öld a `main` változásait.
- **Open source**: a fork + pull request workflow a kulcs.
- **Haladó csapatmunka**: merge conflict kezelés és `stash` használat a mindennapok része.
- **Kísérleti fejlesztés**: bátran próbálj ki új dolgokat külön branch‑en, majd töröld, ha nem kell.

---
