---
id: scope
slug: /php/fuggvenyek/scope
title: "Változók hatóköre (scope)"
---

# Változók hatóköre (scope)

A „scope” azt jelenti, hogy egy változó **hol érhető el a programban**.  
A PHP-ban a változók hatóköre különösen fontos, mert meghatározza, hogy egy függvény vagy kódrészlet milyen változókat lát.

---

# Lokális változó

A függvényen belül létrehozott változó **csak ott érhető el**.  
A böngészőben látható eredeti példa is ezt mutatja 

```php
function example() {
    $x = 10;
    echo $x;
}

example();

// echo $x; // HIBA: $x nem létezik itt
```

**Output:**
```
10
```

---

# Paraméterek mint lokális változók

A függvény paraméterei **szintén lokális változók**, és nem látnak rá a külső változókra.

```php
$number = 50;

function printNumber($number) {
    echo $number;
}

printNumber(10); // a paraméter értéke 10
```

**Output:**
```
10
```

---

# Globális változó

A függvényen kívül létrehozott változó **nem érhető el automatikusan** a függvényben.  

```php
$value = 5;

function showValue() {
    echo $value; // HIBA
}
```

---

# `global` kulcsszó

A böngészőben látható példa szerint a `global` kulcsszóval elérhetővé tehetjük a külső változót a függvényben 

```php
$value = 5;

function showValue() {
    global $value;
    echo $value;
}

showValue();
```

**Output:**
```
5
```

### Miért veszélyes?

- nehezen követhető kódot eredményez
- a függvény „láthatatlan” függőségeket kap
- tesztelhetőség romlik
- nagy projektekben kerülendő

---

# `$GLOBALS` tömb

Alternatív megoldás

```php
$value = 10;

function printGlobal() {
    echo $GLOBALS["value"];
}

printGlobal();
```

**Output:**
```
10
```

### Miért veszélyes?

- minden változó mindenhol elérhető → könnyű hibázni
- nehéz követni, honnan jön egy érték
- modern PHP-ban kerülendő

---

# Statikus változó

A statikus változó **megőrzi az értékét a függvényhívások között**.  

```php
function counter() {
    static $i = 0;
    $i++;
    echo $i . "<br>";
}

counter(); // 1
counter(); // 2
counter(); // 3
```

**Output:**
```
1
2
3
```

### Fontos megjegyzések

- a statikus változó **nem globális**
- csak a függvényen belül érhető el
- minden hívásnál megőrzi az előző értéket
- nem ugyanaz, mint az OOP static property

---

Íme a **kiegészített, teljesen beilleszthető** rész, amely pontosan ott folytatja, ahol a leckéd tartalma véget ér — és tartalmazza az `include` / `require`, valamint az `include` / `include_once` közötti különbségek magyarázatát is.  
A szöveg minden állítása a böngészőben látott eredeti részhez kapcsolódik, különösen az *Include / require és scope* szakaszhoz   [Aktuális oldal](citation-section://1303364753/13).

---

# Include / require és scope

Az include-olt fájlok **nem hoznak létre új scope‑ot**.  
A változók bekerülnek a globális hatókörbe.   [Aktuális oldal](citation-section://1303364753/13)

```php
// file1.php
$name = "Kate";

// file2.php
include "file1.php";

echo $name; // működik
```

## Include vs. require — mi a különbség?

A PHP két nagyon hasonló fájlbeillesztő utasítást használ, de **hiba esetén teljesen máshogy viselkednek**:

### **include**
- Ha a fájl nem létezik → **warning** (`E_WARNING`)
- A program **tovább fut**
- Ezért kevésbé „szigorú” megoldás

```php
include 'nem_letezik.php';
echo "Ez még lefut.";
```

### **require**
- Ha a fájl nem létezik → **fatal error** (`E_ERROR`)
- A program **azonnal leáll**
- Olyan fájloknál használd, amelyek **nélkül a program nem működhet**

```php
require 'nem_letezik.php';
echo "Ez már nem fut le.";
```

**Összefoglalva:**  
- `include` → hiba esetén *warning*, a script fut tovább  
- `require` → hiba esetén *fatal error*, a script leáll  

---

## include() vs. include_once() — mi a különbség?

Mindkettő beilleszti a fájlt, de az `include_once()` **ellenőrzi**, hogy a fájl már be volt-e töltve.

### **include()**
- A fájlt **minden híváskor** beilleszti
- Duplikált HTML, duplikált változók, duplikált függvénydefiníciók → akár **fatal error**

```php
include 'header.php';
include 'header.php'; // kétszer fog megjelenni
```

### **include_once()**
- Csak **egyszer** tölti be a fájlt
- Megakadályozza a duplikált függvény- vagy osztálydefiníciókat
- Biztonságosabb konfigurációk, függvénykönyvtárak, osztályok betöltésére

```php
include_once 'header.php';
include_once 'header.php'; // másodszor már nem történik semmi
```

**Összefoglalva:**  
- `include()` → mindig beilleszt  
- `include_once()` → csak egyszer, még akkor is, ha többször hívod  

---

## Mikor melyiket érdemes használni?

| Funkció | Hiba esetén | Többszöri betöltés | Ajánlott használat |
|--------|-------------|--------------------|--------------------|
| **include** | warning | igen | opcionális fájlok |
| **require** | fatal error | igen | kritikus fájlok |
| **include_once** | warning | nem | függvények, osztályok, config |
| **require_once** | fatal error | nem | kritikus, egyszer betöltendő fájlok |

---

# Anonim függvények és `use()`

Az anonim függvények **nem látják a külső változókat**, hacsak nem adjuk át őket `use()` segítségével.

```php
$message = "Hello";

$fn = function() use ($message) {
    echo $message;
};

$fn();
```

**Output:**
```
Hello
```

---

# Tipikus hibák

:::info Tipikus hibák
- „Undefined variable” – rossz scope
- `global` túlhasználása
- `$GLOBALS` túlhasználása
- closure nem látja a külső változót `use()` nélkül
- statikus változó „bennragad” és nem nullázódik  
  :::

---

# Gyakorlófeladatok

**1. Hozz létre egy függvényt, amelyben lokális változót használsz.**
<details>
<summary>Megoldás</summary>

```php
function demo() {
    $x = 10;
    echo $x;
}

demo();
```
</details>

---

**2. Készíts példát globális változó használatára.**
<details>
<summary>Megoldás</summary>

```php
$value = 7;

function show() {
    global $value;
    echo $value;
}

show();
```
</details>

---

**3. Írj függvényt, amely statikus változóval számolja a hívások számát.**
<details>
<summary>Megoldás</summary>

```php
function counter() {
    static $i = 0;
    $i++;
    echo $i . "<br>";
}

counter();
counter();
counter();
```
</details>

---

**4. Készíts programot, amely `$GLOBALS` segítségével ér el egy változót.**
<details>
<summary>Megoldás</summary>

```php
$number = 42;

function printNumber() {
    echo $GLOBALS["number"];
}

printNumber();
```
</details>

---

**5. Írj függvényt, amely paramétert használ lokális változóként.**
<details>
<summary>Megoldás</summary>

```php
function greet($name) {
    echo "Hello, $name!";
}

greet("Anna");
```
</details>

---

**6. Készíts closure-t, amely `use()` segítségével használ külső változót.**
<details>
<summary>Megoldás</summary>

```php
$message = "Hi there";

$fn = function() use ($message) {
    echo $message;
};

$fn();
```
</details>

---

**7. Mutasd be, hogy include nem hoz létre új scope‑ot.**
<details>
<summary>Megoldás</summary>

```php
// file1.php
$name = "Kate";

// file2.php
include "file1.php";

echo $name; // működik
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a változók élettartamának és memóriahasználatának.
- Lásd még: függvények paraméterátadása érték szerint és referencia szerint.

---