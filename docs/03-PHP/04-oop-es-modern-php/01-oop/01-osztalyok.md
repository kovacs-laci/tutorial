---
id: oop-osztalyok
slug: /php-alapok/oop-osztalyok
title: "OOP alapok: osztályok és objektumok"
---

# OOP alapok: osztályok és objektumok

Az objektumorientált programozás (OOP) célja, hogy a programot **objektumok** köré szervezzük.  
Egy objektum olyan, mint egy „valós dolog” modellje: van **állapota** (tulajdonságok) és **viselkedése** (metódusok).

---

# Osztály létrehozása

```php
class Tanulo {
    public $nev;
    public $kor;

    public function koszont() {
        echo "Szia, $this->nev!";
    }
}
```

---

# Objektum példányosítása

```php
$diak = new Tanulo();
$diak->nev = "László";
$diak->kor = 17;

$diak->koszont(); // Szia, László!
```

---

# Konstruktor

A konstruktor automatikusan lefut, amikor létrehozunk egy objektumot.

```php
class Tanulo {
    public $nev;
    public $kor;

    public function __construct($nev, $kor) {
        $this->nev = $nev;
        $this->kor = $kor;
    }
}

$diak = new Tanulo("Anna", 16);
```

---

# Gyakorlófeladatok

1. Hozz létre egy `Auto` osztályt (márka, évjárat), és írj egy metódust, amely kiírja az adatokat.
2. Készíts `Konyv` osztályt (cím, szerző), konstruktorral.
3. Hozz létre több objektumot ugyanabból az osztályból.

---

## Megjegyzés

- Érdemes utánanézni a `__toString()` metódusnak.
- Lásd még: objektumok memóriakezelése PHP-ben.
