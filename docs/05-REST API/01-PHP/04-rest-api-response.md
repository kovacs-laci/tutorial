---
id: rest-api-response-alternatives
slug: /rest-api-response-alternatives
title: "Válaszok kezelése – különböző megoldások"
---

# REST API válaszok kezelése – különböző megoldások

Ebben a fejezetben három különböző megoldást mutatunk be a `Response` osztályra.  
Mindhárom ugyanazt a célt szolgálja: **egységes JSON válasz küldése a kliensnek**, de más szintaxist és stílust használ.  
Szabadon kiválasztható, hogy melyik megközelítés tetszik a legjobban.

---

## 1. Statikus metódusok külön névvel

```php
<?php

namespace App\Html;

class Response
{
    public static function ok(array $data = []): void {
        self::send($data, 200);
    }

    public static function created(array $data = []): void {
        self::send($data, 201);
    }

    public static function deleted(array $data = []): void {
        self::send($data, 204);
    }
    
    public static function updated(array $data = []): void {
        self::send($data, 202);
    }
    
    public static function error(string $message, int $code = 400): void {
        self::send(['error' => $message], $code);
    }

    private static function send(array $data, int $code): void {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode(['code' => $code] + $data, JSON_THROW_ON_ERROR);
        exit;
    }
}
```

👉 **Használat**:
```php
Response::ok(['county' => $county]);
Response::created(['city' => $city]);
Response::updated(['city' => $city]);
Response::deleted();
Response::error('Not Found', 404);
```

---

## 2. Fluent interface (láncolható hívások)
Egy másik minta, hogy a `Response` példányosítható, és láncolva adhatjuk meg az adatokat:

```php
<?php

namespace App\Html;

class Response
{
    private array $payload = [];
    private int $status = 200;

    public static function json(): self {
        return new self();
    }

    public function withData(array $data): self {
        $this->payload = $data;
        return $this;
    }

    public function withStatus(int $status): self {
        $this->status = $status;
        return $this;
    }

    public function send(): void {
        http_response_code($this->status);
        header('Content-Type: application/json');
        echo json_encode(['code' => $this->status, 'data' => $this->payload], JSON_THROW_ON_ERROR);
        exit;
    }
}
```

👉 **Használat**:
```php
Response::json()
    ->withData(['county' => $county])
    ->withStatus(200)
    ->send();
```

Ez nagyon tiszta és jól olvasható, főleg ha komplex válaszokat kell összeállítani.
---

## 3. Rövid helper függvények
Ha egyszerűség a cél, lehet globális helper függvényeket is definiálni:

```php
<?php

function jsonResponse(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['code' => $code, 'data' => $data], JSON_THROW_ON_ERROR);
    exit;
}

function errorResponse(string $message, int $code = 400): void {
    jsonResponse(['error' => $message], $code);
}
```

👉 **Használat**:
```php
jsonResponse(['county' => $county]);
errorResponse('Not Found', 404);
```

---

# Összefoglalás

- **Statikus metódusok**: egyszerű és beszédes (`ok()`, `created()`, `error()`).
- **Fluent interface**: rugalmas és jól olvasható, láncolható hívásokkal.
- **Helper függvények**: a legegyszerűbb megoldás, gyorsan használható.

A három alternatíva közül a statikus metódusok a legkézenfekvőbb kezdőknek, a fluent interface inkább haladóbb szemlélet, a helper függvények pedig a legegyszerűbb. Így mindenki talál a szintjének megfelelő megoldást.