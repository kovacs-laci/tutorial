---
id: rest-client-counties-controller
title: CountiesController – A megyék CRUD vezérlője
sidebar_label: CountiesController
slug: /rest-client/counties-controller
---

# CountiesController – A megyék CRUD vezérlője

A REST API kliensünkben a controller felel azért, hogy:

- fogadja a routertől érkező kérést,
- meghívja az ApiRequest osztályt,
- feldolgozza a választ,
- átadja az adatot a megfelelő View‑nak.

A CountiesController tehát a **megyékhez tartozó CRUD műveletek központi vezérlője**.

Ebben a fejezetben elkészítjük a teljes controllert:

- listázás (`index`)
- létrehozás (`create`)
- módosítás (`edit`)
- törlés (`delete`)

---

# A controller szerepe

A controller:

- **nem tartalmaz HTML‑t** → azt a View kezeli,
- **nem tartalmaz HTTP logikát** → azt az ApiRequest kezeli,
- **nem tartalmaz adatbázis logikát** → azt az API kezeli.

A controller feladata mindössze:

1. meghívni az ApiRequest megfelelő metódusát,
2. átadni az adatot a View‑nak,
3. visszaadni a renderelt HTML‑t.

Ez a tiszta MVC alapelve.

---

# CountiesController elkészítése

📁 `app/Controllers/CountiesController.php`

```php
<?php

namespace App\Controllers;

use App\Http\ApiRequest;
use App\Views\Counties\CountiesView;
use App\Views\Counties\CountyFormView;

class CountiesController
{
    private ApiRequest $api;

    public function __construct()
    {
        $this->api = new ApiRequest();
    }

    public function index(): string
    {
        $counties = $this->api->get("/counties");
        return (new CountiesView($counties))->render();
    }

    public function create(): string
    {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $this->api->post("/counties", [
                "name" => $_POST["name"]
            ]);

            header("Location: /counties");
            exit;
        }

        return (new CountyFormView())->render();
    }

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
        return (new CountyFormView($county))->render();
    }

    public function delete(?int $id): void
    {
        $this->api->delete("/counties/$id");

        header("Location: /counties");
        exit;
    }
}
```

---

# Hogyan működik?

## 1) Listázás – `/counties`

A router meghívja:

```php
$controller->index();
```

A controller:

- GET kérést küld az API‑nak,
- átadja az adatot a CountiesView‑nak,
- visszaadja a HTML‑t.

---

## 2) Létrehozás – `/counties/create`

GET kérés → megjelenik az űrlap  
POST kérés → elküldi az adatot az API‑nak

---

## 3) Módosítás – `/counties/edit/5`

GET kérés → betölti a megye adatait  
POST kérés → elküldi a módosított adatot

---

## 4) Törlés – `/counties/delete/5`

A controller:

- meghívja a DELETE végpontot,
- visszairányít a listára.

---

# Miért jó ez a megoldás?

### ✔ Tiszta MVC
A controller csak vezérel, nem kever HTML‑t vagy HTTP logikát.

### ✔ Könnyen bővíthető
Ha később hozzáadjuk a városokat:

```
CitiesController
CitiesView
CityFormView
```

minden ugyanígy működik.

---
