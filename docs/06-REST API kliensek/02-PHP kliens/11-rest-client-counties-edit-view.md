---
id: rest-client-counties-edit-view
title: EditView – Meglévő megye módosítása
sidebar_label: EditView
slug: /rest-client/counties/edit-view
---

# EditView – Meglévő megye módosítása

A REST API kliensben minden oldal külön View osztályt kap, a Laravel gyakorlatát követve.  
Az `EditView` feladata:

- megjeleníteni a meglévő megye adatait,
- lehetővé tenni a módosítást,
- POST metódussal elküldeni a frissített adatot a controllernek,
- a LayoutView‑ba ágyazva visszaadni a teljes HTML‑oldalt.

A View **nem tartalmaz logikát**, csak HTML‑t generál.

---

# EditView osztály elkészítése

📁 `app/Views/Counties/EditView.php`

```php
<?php

namespace App\Views\Counties;

use App\Views\Layout\LayoutView;

class EditView
{
    public function __construct(private array $county) {}

    public function render(): string
    {
        $county = $this->county['entity'];
        $id = $county["id"];
        $name = htmlspecialchars($county["name"]);

        $content = <<<HTML
        <h1>Megye módosítása</h1>

        <form method="post" action="/counties/edit/{$id}" class="form">

            <label for="name">Megye neve</label>
            <input type="text" id="name" name="name" value="{$name}" required>

            <br><br>

            <button type="submit" class="btn btn-primary">Mentés</button>
            <a href="/counties" class="btn btn-secondary">Mégse</a>

        </form>
        HTML;

        return (new LayoutView($content, "Megye módosítása"))->render();
    }
}
```

---

# Hogyan működik?

A controller így hívja:

```php
public function edit(?int $id): string
{
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $this->api->put("/counties/$id", [
            "name" => $_POST["name"]
        ]);

        header("Location: /counties");
        exit;
    }

    $county = $this->api->get("/counties/$id");
    return (new EditView($county))->render();
}
```

A folyamat:

1. GET kérés → betölti a megye adatait → megjelenik az űrlap
2. POST kérés → ApiRequest elküldi a módosított adatot
3. redirect → vissza a listára

---

# Miért jó ez a megoldás?

### ✔ Laravel‑szerű nézetstruktúra
Később könnyebb átállni Blade‑re.

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
