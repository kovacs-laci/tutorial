---
id: sajat-fuggvenyek
slug: /php-alapok/sajat-fuggvenyek
title: "Saját függvények"
---

# Saját függvények

A függvények olyan újrahasználható kódrészek, amelyek egy adott feladatot végeznek el.  
Segítenek abban, hogy a kódunk átláthatóbb és karbantarthatóbb legyen.

---

# Függvény létrehozása

```php
function udvozles() {
    echo "Szia, üdv az oldalon!";
}

udvozles();
```

---

# Paraméterek

```php
function koszont($nev) {
    echo "Szia, $nev!";
}

koszont("László");
```

---

# Több paraméter

```php
function osszead($a, $b) {
    echo $a + $b;
}

osszead(5, 7); // 12
```

---

# Visszatérési érték

```php
function terulet($a, $b) {
    return $a * $b;
}

$eredmeny = terulet(5, 3);
echo $eredmeny; // 15
```

---

# Alapértelmezett paraméter

```php
function udvozlet($nev = "Vendég") {
    echo "Üdv, $nev!";
}

udvozlet();          // Üdv, Vendég!
udvozlet("Kata");    // Üdv, Kata!
```

---

# Gyakorlófeladatok

1. Készíts függvényt, amely kiírja a nevedet.
2. Írj függvényt, amely két számot összead és visszaadja az eredményt.
3. Készíts függvényt, amely egy névlistát kap paraméterként és kiírja az elemeit.
4. Írj függvényt, amely eldönti, hogy egy szám páros vagy páratlan.

---

## Megjegyzés

- Érdemes utánanézni a függvények típusdeklarációinak (`int`, `string`, `array`).
- Lásd még: névtelen függvények, arrow functionök.
