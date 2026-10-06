---
id: sajat-fuggvenyek
slug: /php/fuggvenyek/sajat-fuggvenyek
title: "Saját függvények"
---

# Saját függvények

A függvények olyan **újrahasználható kódrészek**, amelyek egy adott feladatot végeznek.  
Segítenek abban, hogy a kódunk **átláthatóbb**, **modulárisabb** és **karbantarthatóbb** legyen.  

---

# Miért használunk függvényeket?

- ismétlődő kód elkerülése  
- logika elkülönítése  
- könnyebb tesztelhetőség  
- újrafelhasználhatóság  
- tisztább, rendezettebb kód  

---

## Függvény létrehozása

```php
function greet() {
    echo "Hello, welcome!";
}

greet();
```

**Output:**
```
Hello, welcome!
```

---

### Paraméterek

```php
function greetPerson(string $name) {
    echo "Hello, $name!";
}

greetPerson("László");
```

**Output:**
```
Hello, László!
```

---

### Több paraméter

```php
function addNumbers(int $a, int $b) {
    echo $a + $b;
}

addNumbers(5, 7);
```

**Output:**
```
12
```

---

### Visszatérési érték

```php
function area(int $width, int $height): int {
    return $width * $height;
}

$result = area(5, 3);
echo $result;
```

**Output:**
```
15
```

---

### Alapértelmezett paraméter

```php
function greetUser(string $name = "Guest") {
    echo "Welcome, $name!";
}

greetUser();        // Welcome, Guest!
greetUser("Kate");  // Welcome, Kate!
```

---

## Típusdeklarációk (modern PHP)

```php
function multiply(int $a, int $b): int {
    return $a * $b;
}
```

---

## Tömb visszatérési érték

```php
function getUser(): array {
    return [
        "name" => "Kate",
        "age" => 16
    ];
}

print_r(getUser());
```

**Output:**
```
Array
(
    [name] => Kate
    [age] => 16
)
```

---

## Függvény + tömb

```php
function sumArray(array $numbers): int {
    $sum = 0;
    foreach ($numbers as $number) {
        $sum += $number;
    }
    return $sum;
}

echo sumArray([1, 2, 3, 4]);
```

**Output:**
```
10
```

---

## Függvény + feltétel

```php
function isAdult(int $age): bool {
    return $age >= 18;
}

echo isAdult(20) ? "Adult" : "Minor";
```

**Output:**
```
Adult
```

---

## Függvény + ciklus

```php
function printFruits(array $fruits): void {
    foreach ($fruits as $fruit) {
        echo $fruit . "<br>";
    }
}

printFruits(["apple", "pear", "plum"]);
```

**Output:**
```
apple
pear
plum
```

---

## `void` visszatérési típus

```php
function logMessage(string $msg): void {
    echo "[LOG] $msg<br>";
}

logMessage("System started");
```

**Output:**
```
[LOG] System started
```

---

## Anonim függvény (closure)

```php
$double = function (int $n): int {
    return $n * 2;
};

echo $double(5);
```

**Output:**
```
10
```

---

## Arrow function (rövidített forma)

```php
$triple = fn($n) => $n * 3;

echo $triple(4);
```

**Output:**
```
12
```

---

## Tipikus hibák függvényeknél

:::info Tipikus hibák
- függvényen belül nem létező változó használata
- return hiánya → `null`
- túl sok felelősség egy függvényben
- rossz elnevezések (pl. `doStuff()`)
- túl hosszú függvények  
  :::

---

## Gyakorlófeladatok

**1. Készíts függvényt, amely kiírja a nevedet.**  

<details>
<summary>Megoldás</summary>

```php
function printName(): void {
    echo "László";
}

printName();
```
</details>

---

**2. Írj függvényt, amely két számot összead és visszaadja az eredményt.**  

<details>
<summary>Megoldás</summary>

```php
function add(int $a, int $b): int {
    return $a + $b;
}

echo add(5, 7);
```
</details>

---

**3. Készíts függvényt, amely egy névlistát kap paraméterként és kiírja az elemeit.**  

<details>
<summary>Megoldás</summary>

```php
function printNames(array $names): void {
    foreach ($names as $name) {
        echo $name . "<br>";
    }
}

printNames(["Anna", "Bela", "Csaba"]);
```
</details>

---

**4. Írj függvényt, amely eldönti, hogy egy szám páros vagy páratlan.**  

<details>
<summary>Megoldás</summary>

```php
function isEven(int $n): bool {
    return $n % 2 === 0;
}

echo isEven(4) ? "Even" : "Odd";
```
</details>

---

**5. Készíts függvényeket mátrix generálására és megjelenítésére!**  
A feladat célja, hogy lásd: **a program szerkezete nem változik**, csak a megjelenítő függvény — és ezzel teljesen megváltozik a kimenet.

Készítsd el az alábbi függvényeket:

- `getMatrix($rows, $cols)` – véletlen számokkal feltöltött mátrixot ad vissza  
- `showMatrix($outputType, $matrix)` – a megjelenítés módját választja  
- `showMatrixCli($matrix)` – CLI kimenet  
- `showMatrixHtml($matrix)` – HTML táblázatos kimenet  

Majd hívd meg a `showMatrix()` függvényt kétféle módon:

- `showMatrix('cli', $matrix)`  
- `showMatrix('html', $matrix)`  

A főprogram NEM változik, csak az `outputType`.

---

<details>
<summary>Megoldás</summary>

```php
function getMatrix(int $rows, int $cols): array
{
    $matrix = [];

    for ($row = 0; $row < $rows; $r++) {
        for ($col = 0; $col < $cols; $c++) {
            $matrix[$row][$col] = rand(1, 99);
        }
    }

    return $matrix;
}

function showRowCli(array $row): void
{
    echo implode(" ", $row) . PHP_EOL;
}

function showMatrixCli(array $matrix): void
{
    foreach ($matrix as $row) {
        showRowCli($row);
    }
}

function showRowHtml(array $row): void
{
    echo "<tr>";
    foreach ($row as $value) {
        echo "<td>$value</td>";
    }
    echo "</tr>";
}


function showMatrixHtml(array $matrix): void
{
    echo '<table border="1" cellpadding="8" style="border-collapse: collapse;">';
    foreach ($matrix as $row) {
        showRowHtml($row);
    }
    echo '</table>';
}

function showMatrix(string $outputType, array $matrix): void
{
    switch ($outputType) {
        case 'cli':
            showMatrixCli($matrix);
            break;

        case 'html':
            showMatrixHtml($matrix);
            break;

        default:
            throw new InvalidArgumentException("Ismeretlen output típus: $outputType");
    }
}

$matrix = getMatrix(3, 3);

// CLI kimenet
showMatrix('cli', $matrix);

// HTML kimenet
showMatrix('html', $matrix);
```
</details>

---

**6. Készíts függvényt, amely eldönti, hogy egy szám prím‑e.**  
A függvény neve legyen: `isPrime(int $number): bool`.

A prím szám definíciója:  
> Olyan egész szám, amely **nagyobb mint 1**, és **nem osztható** egyetlen nála kisebb pozitív számmal sem, csak 1‑gyel és önmagával.

<details>
<summary>Megoldás</summary>

```php
function isPrime(int $number): bool
{
    // A prímek 2-től indulnak
    if ($number <= 1) {
        return false;
    }

    // 2 az első prím
    if ($number === 2) {
        return true;
    }

    // A páros számok nem prímek (kivéve 2)
    if ($number % 2 === 0) {
        return false;
    }

    // Csak a négyzetgyökig kell vizsgálni
    // Csak páratlan számokat vizsgálunk (3,5,7...)
    for ($i = 3; $i * $i <= $number; $i += 2) {
        if ($number % $i === 0) {
            return false;
        }
    }

    return true;
}

$number = 101;
echo isPrime($number) ? "$number prím" : "$number nem prím"
```
:::info Miért elég a négyzetgyökig vizsgálni?

A prímvizsgálatnál nem kell minden számot végigpróbálni 2-től a vizsgált számig.  
Elég csak a **négyzetgyökéig** ellenőrizni az osztókat.

**Miért?**  

> Ha az *n* szám nem prím, akkor létezik két szám:  
> **a × b = n**,  
> ahol **legalább az egyik** biztosan ≤ √n.

Ezért ha √n‑ig nem találtunk osztót, akkor **n biztosan prím**.

---

# Példa: 97 prím-e?

√97 ≈ 9.8 → elég 9‑ig vizsgálni.

Tehát csak ezeket kell megnézni:

```
2, 3, 4, 5, 6, 7, 8, 9
```

Ha ezek közül egyik sem osztja 97-et → 97 prím.

Nem kell 10, 11, 12, … 96-ig vizsgálni.

---

# Miért garantált, hogy az egyik osztó ≤ √n?

Vegyünk egy összetett számot:

```
n = 36
```

Az osztópárok:

```
1 × 36
2 × 18
3 × 12
4 × 9
6 × 6
```

Figyeld meg:

- minden párban **az egyik szám ≤ 6**,  
- és 6 = √36.

Ez **minden számra igaz**:

Ha n = a × b, akkor:

- ha mindkettő > √n lenne,  
- akkor a × b > √n × √n = n  
- ami lehetetlen.

Tehát **legalább az egyik osztó biztosan a négyzetgyök alatt van**.

---

# Miért fontos ez a programozásban?

Mert így a prímvizsgálat:

- **O(n)** helyett **O(√n)** időben fut,
- 1 000 000 esetén:
  - nem 1 000 000 osztót vizsgálunk,
  - hanem csak 1000-et.

Ez **ezerszer gyorsabb**.

:::
</details>

---
# Megjegyzés

- Érdemes utánanézni a függvények típusdeklarációinak (int, string, array).
- Lásd még: névtelen függvények, arrow function-k.  

---

## Rekurzió

A rekurzió olyan programozási technika, ahol egy függvény **önmagát hívja meg** egy kisebb részfeladat megoldására.  
A rekurzió akkor működik jól, ha a feladat:

1. felbontható kisebb, ugyanolyan szerkezetű részekre,
2. van egy **alapeset**, ahol a függvény már nem hívja meg önmagát.

A rekurzió sokszor egyszerűbbé teszi a kódot, de nem mindenre jó.  
A ciklusokat nem mindig érdemes kiváltani vele, mert bizonyos feladatoknál lassabb lehet.

---

### Mikor jó a rekurzió?

- amikor a feladat természetesen **részekre bontható**,  
- amikor a matematikai definíció is rekurzív (pl. faktoriális, Fibonacci),  
- amikor a feladat **fa‑szerkezetű** (pl. mappák bejárása),  
- amikor a megoldás lépései **ugyanolyan szerkezetűek**, csak kisebbek.

### Mikor nem jó?

- ha a feladat nagyon sok lépést igényel (pl. Fibonacci nagy számokra),  
- ha a rekurzió túl mély lenne → stack overflow veszély,  
- ha a ciklus egyszerűbb, gyorsabb és átláthatóbb.

---

## Példa: Fibonacci-sorozat

A Fibonacci-sorozat definíciója:

- F(0) = 0  
- F(1) = 1  
- F(n) = F(n−1) + F(n−2)

Ez a definíció **pont úgy néz ki**, mint egy rekurzív függvény.

```php
function fib(int $n): int
{
    if ($n <= 1) {
        return $n;   // alapeset
    }

    return fib($n - 1) + fib($n - 2);   // rekurzív hívások
}

function printFibonacci(int $n): void
{
    for ($i = 0; $i < $n; $i++) {
        echo fib($i) . "<br>";
    }
}

printFibonacci(10);
```

:::info
A Fibonacci-sorozat minden eleme két korábbi elem összege.  
A rekurzió két irányba ágazik:  
- `fib(n - 1)`  
- `fib(n - 2)`  

Ezért a függvény sok hívást végez, és nagy `n` esetén lassú.  
A módszer viszont jól szemlélteti a rekurzió működését.
:::

---

## Gyakorlófeladatok

### Faktoriális

**Feladat:**  
Írj függvényt, amely kiszámítja egy szám faktoriálisát.  
A faktoriális definíciója:

- n! = n × (n−1) × (n−2) × … × 1  
- 1! = 1

<details>
<summary>Megoldás</summary>

```php
function factorial(int $n): int
{
    if ($n <= 1) {
        return 1;   // alapeset
    }

    return $n * factorial($n - 1);   // rekurzív lépés
}

echo factorial(5); // 120
```
:::info
A faktoriális minden lépésben egyre kisebb számra hívja meg a függvényt.  
A folyamat addig tart, amíg el nem érjük az alapesetet (1).
:::
</details>

---

### Számjegyek összege

**Feladat:**  
Írj függvényt, amely visszaadja egy szám számjegyeinek összegét.  
Példa: 12345 → 1 + 2 + 3 + 4 + 5 = 15

<details>
<summary>Megoldás</summary>

```php
function digitSum(int $n): int
{
    if ($n < 10) {
        return $n;   // alapeset: egyjegyű szám
    }

    return ($n % 10) + digitSum(intdiv($n, 10));
}

echo digitSum(12345); // 15
```
:::info
A függvény minden lépésben leválasztja az utolsó számjegyet (`n % 10`),  
majd a maradék számra (`n / 10`) újra meghívja önmagát.  
A folyamat addig tart, amíg egyjegyű számot nem kapunk.
:::

</details>


---

### Lista bejárása (rekurzió ciklus helyett)

**Feladat:**  
Írj függvényt, amely kiírja egy tömb elemeit rekurzióval.

<details>
<summary>Megoldás</summary>

```php
function printList(array $items, int $index = 0): void
{
    if ($index >= count($items)) {
        return;   // alapeset: nincs több elem
    }

    echo $items[$index] . "<br>";
    printList($items, $index + 1);   // következő elem
}

printList(["alma", "körte", "szilva"]);
```
:::info
A függvény minden lépésben kiírja az aktuális elemet,  
majd a következő indexszel újra meghívja önmagát.  
A rekurzió addig tart, amíg az index el nem éri a tömb végét.
:::

</details>


