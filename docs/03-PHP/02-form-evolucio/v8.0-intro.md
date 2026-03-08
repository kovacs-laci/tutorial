---
id: v8-intro
title: 8.0 Szülő - gyerek kapcsolat kezelése
sidebar_label: 8.0 Szülő - gyerek kapcsolat
slug: /form-evolucio/v8-intro
---

# 8.0  Szülő–gyerek kapcsolat kezelése (Osztályok és diákok)

Az eddigi fejezetekben megismertük a PHP‑alapú MVC (Model-View-Controller) felépítést, a modellek és kontrollerek működését, valamint a PDO‑val történő adatkezelést. A következő lépésben egy olyan problémát oldunk meg, amely minden valós alkalmazásban előfordul: **két adat között kapcsolat van**, és ezeket együtt kell kezelnünk.

Ebben a fejezetben az **osztályok (classes)** és a **diákok (students)** kapcsolatát építjük fel. Ez egy klasszikus **1:N reláció**, ahol egy osztályhoz több diák tartozhat.

---

## Mi az 1:N kapcsolat?

Az 1:N (egy–több) kapcsolat azt jelenti, hogy:

- **egy** rekord a szülő táblában
- **több** rekorddal kapcsolódhat a gyerek táblában.

A mi példánkban:

- egy osztály → több diák
- egy diák → pontosan egy osztályhoz tartozik

Ez a reláció az adatbázisban úgy jelenik meg, hogy a `students` táblában van egy `class_id` mező, amely az adott diák osztályára mutat.

---

## Miért pont osztályok és diákok?

Azért választjuk ezt a példát, mert:

- mindenki számára ismerős a működése,
- jól szemlélteti a szülő–gyerek kapcsolatot,
- egyszerűen bővíthető (pl. tantárgyak, jegyek, órarend),
- kiválóan alkalmas dinamikus frontend megoldások bemutatására (év → osztály → diákok).

A tananyag célja, hogy bemutassuk:

- hogyan épül fel egy reláció két tábla között,
- hogyan kérdezhetjük le a kapcsolódó adatokat,
- hogyan készíthetünk dinamikus felületeket AJAX/fetch/async segítségével.

---

## A grade mező numerikus (9–13)

Az osztályok évfolyamát a `grade` mező tárolja. Ez **szám**, nem szöveg:

- minimum érték: **9**
- maximum érték: **13**

Ez a gyakorlatban a középiskolai évfolyamokat jelenti:

- 9., 10., 11., 12., 13. évfolyam

A betűjel (`letter`) külön mezőben szerepel, így egy osztály például:

- year: 2025
- grade: 12
- letter: P

→ **2025‑ös 12P osztály**

---

## A modul célja

A 8.0 fejezetben egy teljes, működő modult építünk fel, amely:

- kezeli az osztályokat (listázás, hozzáadás, módosítás, törlés),
- kezeli a diákokat (listázás, hozzáadás, módosítás, törlés),
- dinamikusan tölti be az adatokat:

    - év → osztályok
    - osztály → diákok

- háromféle frontend megoldást mutat be:
    - jQuery AJAX
    - Fetch API
    - Async/Await

A cél, hogy bemutassuk a szülő–gyerek kapcsolat működését **modellben**, **kontrollerben**, **nézetben**, és **JavaScriptben** is.

---

A következő fejezetben létrehozzuk az adatbázis táblákat, amelyekre a teljes modul épül.