---
id: kivetelkezeles
slug: /php/fuggvenyek/kivetelkezeles
title: "Kivételkezelés"
---

# Kivételkezelés

A kivétel olyan rendkívüli helyzet, amelyet a program futás közben jelez. Például adatbázis-kapcsolat vagy fájl olvasása is sikertelen lehet.

## `try`, `catch` és `finally`

```php
try {
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (PDOException $exception) {
    error_log($exception->getMessage());
    echo 'Az adatbázis jelenleg nem érhető el.';
} finally {
    echo 'A kapcsolat ellenőrzése befejeződött.';
}
```

A felhasználónak általános hibaüzenetet adjunk, a részleteket pedig naplózzuk. A kivételeket a későbbi PDO- és autentikációs példákban is így kezeljük.

## Saját kivétel

```php
class InvalidAgeException extends RuntimeException
{
}

function validateAge(int $age): void
{
    if ($age < 0) {
        throw new InvalidAgeException('Az életkor nem lehet negatív.');
    }
}
```

A kivételkezelés célja nem az összes hiba elrejtése, hanem a várható hibák kulturált kezelése és a váratlan hibák naplózása.
