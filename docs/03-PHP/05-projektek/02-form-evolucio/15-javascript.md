---
id: v8-js
title: 8.7 AJAX, Fetch és Async/Await megoldások
sidebar_label: 8.7 JavaScript
slug: /form-evolucio/v8-js
---

# 8.7 AJAX, Fetch és Async/Await megoldások

A 8.6 fejezetben elkészült a dinamikus felület HTML‑része, ahol év → osztály → diákok sorrendben lehet választani.  
Ebben a fejezetben azt nézzük meg, hogyan lehet ezt a működést JavaScript segítségével megvalósítani.

Három különböző technikát ismerhetsz meg:

- jQuery AJAX  
- Fetch API  
- Async/Await  

Mindhárom ugyanazt csinálja, csak más stílusban.  
A cél az, hogy lásd a különbségeket, és tudd, melyik megoldást mikor érdemes használni.

A JavaScript a következő végpontokat hívja meg:

- `index.php?page=fetch-years`
- `index.php?page=fetch-classes-by-year&year=...`
- `index.php?page=fetch-students-by-class&id=...`

---

## 8.7.1 jQuery AJAX

A jQuery régebbi, de sok helyen még mindig használják.  
Egyszerű, rövid kódot lehet vele írni.

### Kód

```javascript
// Évek betöltése
$.get('index.php?page=fetch-years', function (response) {
    response.years.forEach(function (year) {
        $('#select-year').append(`<option value="${year}">${year}</option>`);
    });
});

// Osztályok betöltése év alapján
$('#select-year').change(function () {
    const year = $(this).val();
    $('#select-class').empty().append('<option value="">-- Válassz osztályt --</option>');

    $.get('index.php?page=fetch-classes-by-year&year=' + year, function (response) {
        response.classes.forEach(function (c) {
            $('#select-class').append(
                `<option value="${c.id}">${c.grade}${c.letter}</option>`
            );
        });
    });
});

// Diákok betöltése osztály alapján
$('#select-class').change(function () {
    const classId = $(this).val();

    $.get('index.php?page=fetch-students-by-class&id=' + classId, function (response) {
        let html = '<ul>';
        response.students.forEach(function (s) {
            html += `<li>${s.name} (${s.birthdate})</li>`;
        });
        html += '</ul>';
        $('#students').html(html);
    });
});
```

### Mikor érdemes használni?

- Ha a projekt már tartalmaz jQuery‑t.
- Ha gyorsan szeretnél működő AJAX‑ot írni.
- Ha régebbi kódbázissal dolgozol.

---

## 8.7.2 Fetch API

A Fetch API a modern böngészők beépített megoldása.  
Nem kell hozzá külső könyvtár, és tisztább, mint a jQuery.

### Kód

```javascript
// Évek betöltése
fetch('index.php?page=fetch-years')
    .then(res => res.json())
    .then(data => {
        data.years.forEach(year => {
            document.getElementById('select-year')
                .innerHTML += `<option value="${year}">${year}</option>`;
        });
    });

// Osztályok betöltése
document.getElementById('select-year').addEventListener('change', function () {
    const year = this.value;
    const select = document.getElementById('select-class');
    select.innerHTML = '<option value="">-- Válassz osztályt --</option>';

    fetch(`index.php?page=fetch-classes-by-year&year=${year}`)
        .then(res => res.json())
        .then(data => {
            data.classes.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.grade}${c.letter}</option>`;
            });
        });
});

// Diákok betöltése
document.getElementById('select-class').addEventListener('change', function () {
    const classId = this.value;

    fetch(`index.php?page=fetch-students-by-class&id=${classId}`)
        .then(res => res.json())
        .then(data => {
            let html = '<ul>';
            data.students.forEach(s => {
                html += `<li>${s.name} (${s.birthdate})</li>`;
            });
            html += '</ul>';
            document.getElementById('students').innerHTML = html;
        });
});
```

### Mikor érdemes használni?

- Ha modern böngészőkre fejlesztesz.
- Ha nem szeretnél jQuery‑t használni.
- Ha tisztább, egyszerűbb kódot szeretnél.

---

## 8.7.3 Async/Await

Ez a legáttekinthetőbb és legmodernebb megoldás.  
A Fetch API‑ra épül, de sokkal olvashatóbb formában.

### Kód

```javascript
// Évek betöltése
async function loadYears() {
    const res = await fetch('index.php?page=fetch-years');
    const data = await res.json();

    const select = document.getElementById('select-year');
    data.years.forEach(year => {
        select.innerHTML += `<option value="${year}">${year}</option>`;
    });
}
loadYears();

// Osztályok betöltése
document.getElementById('select-year').addEventListener('change', async function () {
    const year = this.value;
    const select = document.getElementById('select-class');
    select.innerHTML = '<option value="">-- Válassz osztályt --</option>';

    const res = await fetch(`index.php?page=fetch-classes-by-year&year=${year}`);
    const data = await res.json();

    data.classes.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.grade}${c.letter}</option>`;
    });
});

// Diákok betöltése
document.getElementById('select-class').addEventListener('change', async function () {
    const classId = this.value;

    const res = await fetch(`index.php?page=fetch-students-by-class&id=${classId}`);
    const data = await res.json();

    let html = '<ul>';
    data.students.forEach(s => {
        html += `<li>${s.name} (${s.birthdate})</li>`;
    });
    html += '</ul>';

    document.getElementById('students').innerHTML = html;
});
```

### Mikor érdemes használni?

- Ha szeretnél tiszta, könnyen olvasható kódot.
- Ha modern JavaScriptet tanulsz vagy tanítasz.
- Ha a projekt hosszú távon fejlődni fog.

---

## 8.7.4 Összehasonlítás

| Technika       | Előny | Hátrány |
|----------------|-------|---------|
| **jQuery AJAX** | Egyszerű, rövid | Külső könyvtár kell hozzá |
| **Fetch API** | Modern, beépített | Promise‑láncok néha nehezen olvashatók |
| **Async/Await** | A legáttekinthetőbb | Csak modern böngészőkben működik |

---
