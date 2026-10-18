---
id: kivetelkezeles
slug: /php/fuggvenyek/kivetelkezeles
title: "Kivételkezelés"
---

# Kivételkezelés

A kivétel olyan rendkívüli helyzet, amelyet a program futás közben jelez.  
Például adatbázis‑kapcsolat vagy fájl olvasása is sikertelen lehet.  
A kivételkezelés célja nem az összes hiba elrejtése, hanem a **várható hibák kulturált kezelése** és a **váratlan hibák naplózása**.

---

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

A felhasználónak általános hibaüzenetet adjunk,  
a részleteket pedig naplózzuk.  
A kivételeket a későbbi PDO‑ és autentikációs példákban is így kezeljük.

---

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

---

# Matematikai hibák kezelése kivétellel

Az osztás tipikus hibaforrás: ha a nevező 0, a művelet matematikailag értelmezhetetlen.  
PHP-ben ezt kulturáltan kivétellel kezeljük.

---

## Osztás beépített kivétellel: `DivisionByZeroError`

```php
function divide(int $a, int $b): float
{
    if ($b === 0) {
        throw new DivisionByZeroError('Nullával nem lehet osztani.');
    }

    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (DivisionByZeroError $e) {
    echo 'Hiba történt: ' . $e->getMessage();
}
```

---

## Saját kivétel: `DivisionByZeroException`

```php
class DivisionByZeroException extends Exception
{
}

function safeDivide(int $a, int $b): float
{
    if ($b === 0) {
        throw new DivisionByZeroException('A nevező nem lehet 0.');
    }

    return $a / $b;
}

try {
    echo safeDivide(10, 0);
} catch (DivisionByZeroException $e) {
    error_log($e->getMessage());
    echo 'A művelet nem hajtható végre.';
}
```

---

# Beépített kivételosztályok megismerése

A PHP minden kivételosztályt az **Exception** vagy az **Error** osztályból származtat.  
A teljes listát legegyszerűbben Reflection segítségével tudjuk lekérdezni.

## Beépített kivételosztályok listázása Reflectionnel

```php
$declared = get_declared_classes();

foreach ($declared as $class) {
    if (is_subclass_of($class, Exception::class) || is_subclass_of($class, Error::class)) {
        echo $class . PHP_EOL;
    }
}
```

Ez kiírja az összes olyan osztályt, amely az Exception vagy Error leszármazottja.

---

## Fontosabb beépített kivételek

- Exception  
- Error  
- TypeError  
- ParseError  
- ArgumentCountError  
- DivisionByZeroError  
- PDOException  
- RuntimeException  
- InvalidArgumentException  
- OutOfBoundsException  
- LengthException  
- LogicException  
- stb.

---

## CLI-ből osztályok listázása

```bash
php -r "print_r(get_declared_classes());"
```

Majd ezek közül kiszűrjük az Exception / Error leszármazottakat:

```php
foreach (get_declared_classes() as $class) {
    if (is_subclass_of($class, Exception::class) || is_subclass_of($class, Error::class)) {
        echo $class . PHP_EOL;
    }
}
```

---

# Gyakorló feladat

**Feladat:**  
Írj egy `listExceptions()` függvényt, amely:

- lekéri az összes deklarált osztályt,
- kiválogatja közülük az Exception és Error leszármazottakat,
- visszaadja őket egy tömbben.

Majd hívd meg a függvényt, és írd ki a kivételosztályok listáját.

<details>
<summary>Megoldás</summary>

```php
function listExceptions(): array
{
    $result = [];

    foreach (get_declared_classes() as $class) {
        if (is_subclass_of($class, Exception::class) ||
            is_subclass_of($class, Error::class)) {
            $result[] = $class;
        }
    }

    return $result;
}

foreach (listExceptions() as $exceptionClass) {
    echo $exceptionClass . PHP_EOL;
}
```

</details>

---

# Összefoglalás

- A kivételkezelés célja a várható hibák kulturált kezelése.  
- A `try` blokkban fut a kód, a `catch` kezeli a hibát, a `finally` pedig mindig lefut.  
- Készíthetünk saját kivételosztályokat, ha a hibákra külön neveket vagy struktúrát szeretnénk.  
- Hibák kezelése esetén használhatjuk a beépített osztályokat, pl. `DivisionByZeroError`‑t, vagy létrehozhatunk saját hibakezelőt, pl.: `DivisionByZeroException`.  
- A beépített kivételosztályok listája Reflectionnel lekérdezhető.  
- A gyakorló feladat segít megérteni, hogyan szűrjük ki az Exception / Error leszármazottakat.
