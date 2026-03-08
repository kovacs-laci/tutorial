---
id: v8-frontend
title: 8.6 Dinamikus év–osztály–diák kiválasztás
sidebar_label: 8.6 Frontend
slug: /form-evolucio/v8-frontend
---

# 8.6 Dinamikus év–osztály–diák kiválasztás (HTML + működés)

A szülő–gyerek kapcsolat a gyakorlatban akkor válik igazán érthetővé, amikor a felhasználó a böngészőben **dinamikusan** tudja kiválasztani:

1. melyik év osztályait szeretné látni,
2. majd az adott évből egy konkrét osztályt,
3. végül az adott osztály diákjait.

Ebben a fejezetben kizárólag a **frontend HTML felépítésével** és a **működés logikájával** foglalkozunk.  
A JavaScript megoldások (jQuery, Fetch, Async/Await) a következő fejezetben, a **8.7-ben** szerepelnek.

---

## A HTML és a JavaScript kapcsolata

A dinamikus működés alapja, hogy a JavaScript a HTML elemeket **id attribútum alapján** éri el.  
Ezért minden olyan elem, amelyet a JS-nek módosítania kell, egyedi `id`-t kap:

- `select-year` – az év kiválasztása  
- `select-class` – az adott év osztályai  
- `students` – a diákok listájának helye  
- `select-class-full` – a „2025 | 12P” típusú egymezős megoldás  
- `students-full` – a diákok listája ebben a megoldásban  

A JavaScript majd így hivatkozik ezekre:

```javascript
document.getElementById('select-year')
$('#select-class')
```

Ezért **nagyon fontos**, hogy a HTML-ben megadott id-k pontosan megegyezzenek a JS-ben használt id-kkel.  
Ha egy karakter eltér, a JS nem találja meg az elemet, és a funkció nem működik.

---

# 8.6.1 Megoldás 1: Év → Osztály → Diákok

Ez a klasszikus háromlépcsős szülő–gyerek kapcsolat:

- A felhasználó kiválaszt egy **évet**.
- A rendszer betölti az adott évhez tartozó **osztályokat**.
- A felhasználó kiválaszt egy osztályt.
- A rendszer betölti az adott osztály **diákjait**.

### HTML struktúra

```html
<h2>Év → Osztály → Diákok</h2>

<label>Év:</label><br>
<select id="select-year">
    <option value="">-- Válassz évet --</option>
</select>
<br><br>

<label>Osztály:</label><br>
<select id="select-class">
    <option value="">-- Válassz osztályt --</option>
</select>
<br><br>

<h3>Diákok:</h3>
<div id="students"></div>
```

### Működés logikája

1. A JavaScript lekéri az elérhető éveket a backendtől:  
   `index.php?page=fetch-years`
2. A felhasználó kiválaszt egy évet → JS lekéri az adott év osztályait:  
   `index.php?page=fetch-classes-by-year&year=2025`
3. A felhasználó kiválaszt egy osztályt → JS lekéri a diákokat:  
   `index.php?page=fetch-students-by-class&id=12`
4. A diákok listája megjelenik a `<div id="students">` elemben.

A JavaScript a következő fejezetben kerül bemutatásra.

---

# 8.6.2 Megoldás 2: Egy listában: „2025 | 12P”

Ez egy egyszerűbb felhasználói felület, ahol a felhasználó egyetlen listából választ:

- 2025 | 12P
- 2024 | 10A
- 2024 | 11B
- stb.

### HTML struktúra

```html
<h2>Osztály kiválasztása egy listából</h2>

<select id="select-class-full">
    <option value="">-- Válassz osztályt --</option>
</select>

<h3>Diákok:</h3>
<div id="students-full"></div>
```

### Működés logikája

1. A JavaScript lekéri az összes osztályt a backendtől (év + grade + letter).
2. A felhasználó kiválaszt egy osztályt.
3. A JS lekéri az adott osztály diákjait:  
   `index.php?page=fetch-students-by-class&id=...`
4. A diákok megjelennek a `<div id="students-full">` elemben.

---

# 8.6.3 Miért fontos az id attribútum?

A JavaScript csak akkor tudja módosítani a HTML elemeket, ha:

- egyedi id-t kapnak,
- a JS pontosan ugyanazzal az id-vel hivatkozik rájuk.

Például:

```html
<select id="select-year"></select>
```

A JS-ben:

```javascript
document.getElementById('select-year')
```

Ha a HTML-ben `select-year`, de a JS-ben `select_year` szerepel, a kapcsolat megszakad, és a funkció nem működik.

Ezért a tananyag minden példájában **következetesen ugyanazokat az id-ket használjuk**.

---

# Mi következik?

A következő fejezetben (8.7) bemutatjuk a három JavaScript‑technikát:

- jQuery AJAX
- Fetch API
- Async/Await

Mindhárom ugyanazt a logikát valósítja meg, így lhetősg van az összehasonlításukra.
