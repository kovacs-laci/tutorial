---
id: rest-client-index-php
title: A belépési pont - public/index.php
sidebar_label: index.php
slug: /rest-client/index-php
---

# A belépési pont: `public/index.php`

A REST API kliensünk egyetlen belépési pontja a `public/index.php` fájl lesz.  
Minden kérés — legyen az:

- megyék listázása,
- új megye létrehozása,
- megye módosítása,
- megye törlése,

— **mindig ebbe az egy fájlba érkezik**.

Ez a modern PHP alkalmazások alapelve:  
👉 **egy belépési pont, amely átadja a vezérlést a routernek**.

Ebben a fejezetben elkészítjük az `index.php` első, működő verzióját.

---

# Mi a feladata az index.php‑nak?

A belépési pont:

1. betölti a Composer autoloadot,  
2. példányosítja a routert,  
3. feldolgozza az URL‑t,  
4. kiválasztja a megfelelő controllert,  
5. meghívja a megfelelő metódust,  
6. kiírja a HTML‑t.

Az index.php **nem tartalmaz logikát**, csak összeköti a komponenseket.

---

# A public/index.php elkészítése

📁 `public/index.php`

```php
<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Router\Router;

// Router
$router = new Router();
[$resource, $action, $id] = $router->dispatch($_SERVER['REQUEST_URI']);

// Controller neve
$controllerName = "App\\Controllers\\" . ucfirst($resource) . "Controller";

// 1) Controller létezik?
if (!class_exists($controllerName)) {
    http_response_code(404);
    echo "<h1>404 – A(z) {$controllerName} nem található</h1>";
    exit;
}

// 2) Controller példányosítása
$controller = new $controllerName();

// 3) Metódus létezik?
if (!method_exists($controller, $action)) {
    http_response_code(404);
    echo "<h1>404 – A(z) {$controllerName}::{$action}() metódus nem található</h1>";
    exit;
}

// 4) Metódus meghívása
echo $controller->$action($id);

```

---

# Hogyan működik ez?

Nézzünk meg néhány példát.

---

## 1) Megyék listázása

URL:

```
/counties
```

A router visszaadja:

```
resource = "counties"
action = "index"
id = null
```

Az index.php ezt hívja:

```php
$controller = new App\Controllers\CountiesController();
echo $controller->index(null);
```

---

## 2) Új megye létrehozása

URL:

```
/counties/create
```

A hívás:

```php
$controller->create(null);
```

---

## 3) Megye szerkesztése

URL:

```
/counties/edit/5
```

A hívás:

```php
$controller->edit(5);
```

---

## 4) Városok listázása (később)

URL:

```
/cities
```

A hívás:

```php
$controller = new App\Controllers\CitiesController();
$controller->index(null);
```

Semmit nem kell módosítani az index.php‑ban — ez a router ereje.

---

# Miért jó ez a megoldás?

### ✔ Egyszerű  
Az index.php mindössze néhány sor, mégis az egész alkalmazást vezérli.

### ✔ Bővíthető  
Ha később hozzáadjuk a városokat, tanárokat, bármit —  
az index.php változatlan marad.

### ✔ Modern  
Ugyanazt az elvet követi, mint a Laravel, Symfony, Express.js vagy Django.

