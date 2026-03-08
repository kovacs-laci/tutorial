---
id: rest-client-counties-index-view
title: IndexView – A megyék listájának nézete
sidebar_label: IndexView
slug: /rest-client/counties/index-view
---

# IndexView – A megyék listájának nézete

A REST API kliensben minden oldalhoz külön View osztályt készítünk, a Laravel gyakorlatát követve:

- `IndexView` – listázás
- `CreateView` – új elem létrehozása
- `EditView` – meglévő elem módosítása
- `ShowView` – részletek megjelenítése (opcionális)

Ebben a fejezetben elkészítjük a **Counties modul IndexView osztályát**, amely:

- táblázatban jeleníti meg a megyéket,
- tartalmaz egy keresőmezőt,
- tartalmaz egy „Új megye” gombot,
- minden sorhoz szerkesztés és törlés gombot ad,
- a LayoutView‑ba ágyazva adja vissza a teljes oldalt.

---

# A View szerepe

A View kizárólag HTML‑t generál.  
Nem tartalmaz:

- üzleti logikát,
- HTTP kéréseket,
- router logikát,
- adatfeldolgozást.

A controller átadja az adatot, a View pedig megjeleníti.

---

# IndexView osztály elkészítése

📁 `app/Views/Counties/IndexView.php`

```php
<?php

namespace App\Views\Counties;

use App\Views\Layout\LayoutView;

class IndexView
{
    public function __construct(private array $counties) {}

    public function render(): string
    {
        $rows = array_map(fn($c) => $this->renderRow($c), $this->counties['entities']);
        $rowsHtml = implode("", $rows);

        $content = <<<HTML
        <h1>Megyék</h1>

        {$this->renderSearchBar()}

        <a href="/counties/create" class="btn btn-primary">Új megye</a>
        <br><br>

        <table class="table">
            {$this->renderTableHead()}
            <tbody>
                {$rowsHtml}
            </tbody>
        </table>
        HTML;

        return (new LayoutView($content, "Megyék"))->render();
    }

    private function renderTableHead(): string
    {
        return <<<HTML
        <thead>
            <tr>
                <th>#</th>
                <th>Megnevezés</th>
                <th class="text-right">Műveletek</th>
            </tr>
        </thead>
        HTML;
    }

    private function renderRow(array $c): string
    {
        $id = $c["id"];
        $name = htmlspecialchars($c["name"]);

        return <<<HTML
        <tr>
            <td>{$id}</td>
            <td>{$name}</td>
            <td class="text-right">
                <a href="/counties/edit/{$id}" class="btn btn-sm btn-warning">Szerkesztés</a>
                <a href="/counties/delete/{$id}" class="btn btn-sm btn-danger" onclick="return confirm('Biztos törlöd?')">Törlés</a>
            </td>
        </tr>
        HTML;
    }

    private function renderSearchBar(): string
    {
        return <<<HTML
        <form method="get" action="/counties" class="search-bar">
            <input type="search" name="needle" placeholder="Keresés..." class="search-input">
            <button type="submit" class="btn btn-secondary">Keres</button>
        </form>
        <br>
        HTML;
    }
}
```

---

# Hogyan működik?

A controller így hívja:

```php
$counties = $this->api->get("/counties");
return (new IndexView($counties))->render();
```

Az IndexView:

1. megkapja a megyék tömbjét,
2. soronként HTML‑t generál,
3. beágyazza a LayoutView‑ba,
4. visszaadja a teljes oldalt.

---

# Miért jó ez a megoldás?

### ✔ Laravel‑szerű struktúra
Később a Blade‑ben is fogjuk használni.

### ✔ Tiszta, moduláris View réteg
Minden oldal külön osztály.

### ✔ Könnyen bővíthető
A Cities modul ugyanígy fog kinézni.

### ✔ Átlátható HTML generálás
A táblázat fejléce, sora és keresője külön metódusok.

