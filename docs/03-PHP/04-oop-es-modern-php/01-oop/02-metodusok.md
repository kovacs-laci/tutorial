---
id: oop-metodusok
slug: /php-alapok/oop-metodusok
title: "Láthatóság, bezártság és metódusok"
---

# Láthatóság, bezártság és metódusok

Az OOP egyik legfontosabb tulajdonsága a **bezártság** (encapsulation).  
Ez azt jelenti, hogy az objektum belső működését elrejtjük, és csak meghatározott módon engedjük elérni.

---

# Láthatósági szintek

| Láthatóság | Jelentés |
|-----------|----------|
| `public` | bárhonnan elérhető |
| `protected` | csak az osztályból és leszármazottaiból |
| `private` | csak az adott osztályból |

---

# Példa: public, private, protected

```php
class BankSzamla {
    private $egyenleg = 0;

    public function betesz($osszeg) {
        $this->egyenleg += $osszeg;
    }

    public function egyenleg() {
        return $this->egyenleg;
    }
}

$szamla = new BankSzamla();
$szamla->betesz(5000);
echo $szamla->egyenleg(); // 5000
```

A `$egyenleg` változó **nem módosítható kívülről**, csak metódusokon keresztül.

---

# Getter és setter metódusok

```php
class Tanulo {
    private $nev;

    public function setNev($nev) {
        $this->nev = $nev;
    }

    public function getNev() {
        return $this->nev;
    }
}

$diak = new Tanulo();
$diak->setNev("Kata");
echo $diak->getNev();
```

---

# Statikus metódusok

```php
class Matek {
    public static function osszeg($a, $b) {
        return $a + $b;
    }
}

echo Matek::osszeg(3, 4);
```

---

# Gyakorlófeladatok

1. Készíts `BankSzamla` osztályt privát egyenleggel és `betesz()`, `kivesz()` metódusokkal.
2. Készíts `Szemely` osztályt getter/setter metódusokkal.
3. Készíts statikus `Atlag` metódust, amely egy tömb átlagát számolja ki.

---

## Megjegyzés

- Érdemes utánanézni a property promotion (PHP 8) lehetőségeinek.
- Lásd még: immutable objektumok.
