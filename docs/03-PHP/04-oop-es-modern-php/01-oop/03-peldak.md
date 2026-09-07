---
id: oop-peldak
slug: /php-alapok/oop-peldak
title: "Öröklődés, polimorfizmus és absztrakció"
---

# Öröklődés, polimorfizmus és absztrakció

Az OOP ereje a **kapcsolatokban** rejlik: osztályok örökölhetnek egymástól, felülírhatnak metódusokat, és egységes módon viselkedhetnek.

---

# Öröklődés (inheritance)

```php
class Allat {
    public function hang() {
        echo "Valamilyen hang";
    }
}

class Kutya extends Allat {
    public function hang() {
        echo "Vau!";
    }
}

$k = new Kutya();
$k->hang(); // Vau!
```

A `Kutya` örökli az `Allat` tulajdonságait és metódusait, de felül is írhatja őket.

---

# Polimorfizmus

A polimorfizmus azt jelenti, hogy különböző objektumok **ugyanarra a metódusra** különböző módon reagálnak.

```php
$allatok = [new Kutya(), new Allat()];

foreach ($allatok as $a) {
    $a->hang(); // Vau! majd Valamilyen hang
}
```

---

# Absztrakt osztályok

Az absztrakt osztály nem példányosítható, csak örökölhető.

```php
abstract class Alakzat {
    abstract public function terulet();
}

class Kor extends Alakzat {
    public function terulet() {
        return 3.14 * 5 * 5;
    }
}
```

---

# Interfészek

Az interfész előírja, hogy milyen metódusoknak kell szerepelniük az osztályban.

```php
interface Logger {
    public function log($uzenet);
}

class FileLogger implements Logger {
    public function log($uzenet) {
        file_put_contents("log.txt", $uzenet . "\n", FILE_APPEND);
    }
}
```

---

# Trait-ek

A trait-ek lehetővé teszik kódrészletek újrahasznosítását öröklés nélkül.

```php
trait Azonosito {
    public function ujId() {
        return uniqid();
    }
}

class Felhasznalo {
    use Azonosito;
}

$f = new Felhasznalo();
echo $f->ujId();
```

---

# Mini projekt – „Iskolai szereplők”

Készíts három osztályt:

- `Szemely` (alaposztály)
    - név, életkor
    - `bemutatkozik()` metódus

- `Tanulo` (örökli a Szemely-t)
    - osztály, jegyek tömb
    - `atlag()` metódus

- `Tanar` (örökli a Szemely-t)
    - tantárgy
    - `tanit()` metódus

Majd hozz létre:

- 2 tanulót
- 1 tanárt
- írd ki mindegyik bemutatkozását
- a tanulók átlagát

---

# Gyakorlófeladatok

1. Készíts `Allat` → `Kutya`, `Macska` öröklődési láncot.
2. Készíts interfészt `Szamolhato` néven, `osszeg()` metódussal.
3. Készíts absztrakt `Jarmu` osztályt és `Auto`, `Motor` leszármazottakat.
4. Készíts trait-et, amely naplóz minden metódushívást.

---

## Megjegyzés

- Érdemes utánanézni a SOLID elveknek.
- Lásd még: dependency injection, design patternök.
