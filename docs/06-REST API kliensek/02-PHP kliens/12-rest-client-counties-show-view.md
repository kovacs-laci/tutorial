---
id: rest-client-counties-show-view
title: ShowView – Megye adatainak megjelenítése
sidebar_label: ShowView
slug: /rest-client/counties/show-view
---

# ShowView – Megye adatainak megjelenítése

A REST API kliensben minden oldal külön View osztályt kap, a Laravel gyakorlatát követve.  
A `ShowView` feladata:

- megjeleníteni egyetlen megye részletes adatait,
- áttekinthető, tiszta HTML‑t adni,
- a LayoutView‑ba ágyazva visszaadni a teljes oldalt.

---

# ShowView osztály elkészítése

📁 `app/Views/Counties/ShowView.php`

```php
<?php

namespace App\Views\Counties;

use App\Views\Layout\LayoutView;

class ShowView
{
    public function __construct(private array $county) {}

    public function render(): string
    {
        $id = $this->county["id"];
        $name = htmlspecialchars($this->county["name"]);

        $content = <<<HTML
        <h1>Megye részletei</h1>

        <table class="table details-table">
            <tr>
                <th>ID</th>
                <td>{$id}</td>
            </tr>
            <tr>
                <th>Megnevezés</th>
                <td>{$name}</td>
            </tr>
        </table>

        <br>

        <a href="/counties/edit/{$id}" class="btn btn-warning">Szerkesztés</a>
        <a href="/counties/delete/{$id}" class="btn btn-danger" onclick="return confirm('Biztos törlöd?')">Törlés</a>
        <a href="/counties" class="btn btn-secondary">Vissza a listához</a>
        HTML;

        return (new LayoutView($content, "Megye részletei"))->render();
    }
}
```

---

# Hogyan működik?

A controllerben így nézne ki a hozzá tartozó metódus:

```php
public function show(?int $id): string
{
    $county = $this->api->get("/counties/$id");
    return (new ShowView($county))->render();
}
```

A router pedig ezt az URL‑t kezelné:

```
/counties/show/5
```

A folyamat:

1. GET kérés → ApiRequest lekéri a megye adatait
2. ShowView megjeleníti a részleteket
3. A felhasználó szerkeszthet, törölhet, vagy visszaléphet a listára

---

# Miért jó ez a megoldás?

### ✔ Tiszta, egyszerű HTML
A View csak megjelenít, nem tartalmaz logikát.

### ✔ Könnyen bővíthető
Ha később több adatot ad vissza az API (pl. lakosság, terület), csak a táblázatot kell bővíteni.

### ✔ Átlátható projektstruktúra
A Counties modul minden nézete külön fájlban van:

```
IndexView
CreateView
EditView
ShowView
```
