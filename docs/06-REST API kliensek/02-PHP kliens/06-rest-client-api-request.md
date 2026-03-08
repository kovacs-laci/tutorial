---
id: rest-client-api-request
title: HTTP kérések küldése – ApiRequest osztály
sidebar_label: ApiRequest
slug: /rest-client/api-request
---

# ApiRequest osztály – a REST kliens motorja

A REST API kliensünk minden adatot egy külső API‑tól kér le.  
Ez azt jelenti, hogy a kliens **nem tartalmaz adatbázist**,  
és **nem futtat SQL lekérdezéseket**.

Minden művelet — listázás, létrehozás, módosítás, törlés —  
**HTTP kéréseken keresztül történik**:

- `GET` – adatok lekérése
- `POST` – új adat létrehozása
- `PUT` – meglévő adat módosítása
- `DELETE` – adat törlése

Ebben a fejezetben elkészítjük az `ApiRequest` osztályt, amely egységes módon kezeli ezeket a kéréseket.

---

# Miért van szükség ApiRequest osztályra?

Azért, mert a kliensben több modul is lesz:

- counties
- cities
- (később akár mások is)

Mindegyik modulnak szüksége lesz HTTP kérésekre.  
Ha minden controller saját maga küldené a kéréseket, a kód:

- ismétlődne,
- nehezen lenne karbantartható,
- hibalehetőségeket hordozna.

Ezért készítünk egy **központi osztályt**, amely:

- elküldi a kérést,
- beállítja a HTTP metódust,
- elküldi a JSON body‑t,
- visszaadja a választ tömbként.

---

# ApiRequest osztály elkészítése

📁 `app/Http/ApiRequest.php`

```php
<?php

namespace App\Http;

class ApiRequest
{
    private string $baseUrl;

    public function __construct()
    {
        // A config mappából is olvashatnánk, de első körben legyen fix
        $this->baseUrl = "http://localhost:8000";
    }

    public function get(string $endpoint): array
    {
        $url = $this->baseUrl . $endpoint;
        $json = file_get_contents($url);

        return json_decode($json, true);
    }

    public function post(string $endpoint, array $data): array
    {
        return $this->send("POST", $endpoint, $data);
    }

    public function put(string $endpoint, array $data): array
    {
        return $this->send("PUT", $endpoint, $data);
    }

    public function delete(string $endpoint): array
    {
        return $this->send("DELETE", $endpoint);
    }

    private function send(string $method, string $endpoint, array $data = []): array
    {
        $url = $this->baseUrl . $endpoint;

        $options = [
            "http" => [
                "method"  => $method,
                "header"  => "Content-Type: application/json",
                "content" => json_encode($data)
            ]
        ];

        $context = stream_context_create($options);
        $json = file_get_contents($url, false, $context);

        return json_decode($json, true);
    }
}
```

---

# Hogyan működik?

### 1) GET kérés

```php
$api = new ApiRequest();
$data = $api->get("/counties");
```

### 2) POST kérés

```php
$api->post("/counties", [
    "name" => "Pest"
]);
```

### 3) PUT kérés

```php
$api->put("/counties/3", [
    "name" => "Heves"
]);
```

### 4) DELETE kérés

```php
$api->delete("/counties/3");
```

---

# Miért jó ez a megoldás?

### ✔ Egységes API kommunikáció
Minden controller ugyanazt az osztályt használja.

### ✔ Tiszta, átlátható kód
A controllerekben nem lesz HTTP logika.

### ✔ Könnyen bővíthető
Ha később:

- tokenes authentikáció kell,
- header‑t kell hozzáadni,
- logolni kell a kéréseket,

csak az ApiRequest osztályt kell módosítani.


