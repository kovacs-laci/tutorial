---
id: rest-client-layout-view
title: LayoutView – Közös oldalstruktúra
sidebar_label: LayoutView
slug: /rest-client/layout-view
---

# LayoutView – Közös oldalstruktúra

A REST API kliensben minden oldal külön View osztályt kap, de a HTML‑oldalak közös részei — mint a fejléc, menü, konténer és lábléc — ismétlődnének.

A Laravel gyakorlatát követve ezért készítünk egy **LayoutView** osztályt, amely:

- egységes keretet ad minden oldalnak,
- beágyazza a tartalmat,
- kezeli a `<head>` részt (title, CSS),
- tartalmaz egy egyszerű menüt,
- biztosítja a konzisztens megjelenést.

A LayoutView a teljes alkalmazás vizuális alapja.

---

# LayoutView osztály elkészítése

📁 `app/Views/Layout/LayoutView.php`

```php
<?php

namespace App\Views\Layout;

class LayoutView
{
    public function __construct(
        private string $content,
        private string $title = "REST kliens"
    ) {}

    public function render(): string
    {
        return <<<HTML
        <!DOCTYPE html>
        <html lang="hu">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{$this->title}</title>

            <link rel="stylesheet" href="/assets/style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        </head>

        <body>

            {$this->renderMenu()}

            <main class="container">
                {$this->content}
            </main>

        </body>
        </html>
        HTML;
    }

    private function renderMenu(): string
    {
        return <<<HTML
        <nav class="navbar">
            <a href="/counties">Megyék</a>
            <a href="/cities">Városok</a>
        </nav>
        HTML;
    }
}
```

---

# Hogyan működik?

Minden View így adja vissza a HTML‑t:

```php
return (new LayoutView($content, "Oldal címe"))->render();
```

A LayoutView:

1. beállítja a `<title>` értékét,
2. betölti a CSS‑t,
3. megjeleníti a menüt,
4. beágyazza a tartalmat a `<main>` részbe.

---

# Miért jó ez a megoldás?

### ✔ Laravel‑szerű layout struktúra
Pont úgy működik, mint a Blade `layouts/app.blade.php`.

### ✔ Minden oldal egységes

### ✔ Könnyen bővíthető
Ha később kell:

- lábléc,
- sötét mód,
- több menüpont,
- CSS framework (Bootstrap, Tailwind),

csak a LayoutView‑t kell módosítani.

### ✔ Tiszta, átlátható kód
A View‑k csak a tartalommal foglalkoznak.

