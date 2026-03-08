---
id: rest-client-counties-create-view
title: CreateView – Új megye létrehozása
sidebar_label: CreateView
slug: /rest-client/counties/create-view
---

# CreateView – Új megye létrehozása

A REST API kliensben minden oldal külön View osztályt kap, a Laravel gyakorlatát követve.  
A `CreateView` feladata:

- megjeleníteni az új megye létrehozásához szükséges űrlapot,
- POST metódussal elküldeni az adatot a controllernek,
- a LayoutView‑ba ágyazva visszaadni a teljes HTML‑oldalt.

A View **nem tartalmaz logikát**, csak HTML‑t generál.

---

# CreateView osztály elkészítése

📁 `app/Views/Counties/CreateView.php`

```php
<?php

namespace App\Views\Counties;

use App\Views\Layout\LayoutView;

class CreateView
{
    public function render(): string
    {
        $content = <<<HTML
        <h1>Új megye létrehozása</h1>

        <form method="post" action="/counties/create" class="form">

            <label for="name">Megye neve</label>
            <input type="text" id="name" name="name" required>

            <br><br>

            <button type="submit" class="btn btn-primary">Mentés</button>
            <a href="/counties" class="btn btn-secondary">Mégse</a>

        </form>
        HTML;

        return (new LayoutView($content, "Új megye"))->render();
    }
}
```

---

# Hogyan működik?

A controller így hívja:

```php
public function create(): string
{
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $this->api->post("/counties", [
            "name" => $_POST["name"]
        ]);

        header("Location: /counties");
        exit;
    }

    return (new CreateView())->render();
}
```

A folyamat:

1. GET kérés → megjelenik az űrlap
2. POST kérés → ApiRequest elküldi az adatot
3. redirect → vissza a listára

---

# Miért jó ez a megoldás?

### ✔ Tiszta, egyszerű HTML
A View csak megjelenít, nem tartalmaz logikát.

### ✔ Könnyen bővíthető
Ha később több mező kell (pl. megye kódja), csak az űrlapot kell módosítani.

### ✔ Átlátható projektstruktúra
A Counties modul minden nézete külön fájlban van:

```
IndexView
CreateView
EditView
ShowView (opcionális)
```
