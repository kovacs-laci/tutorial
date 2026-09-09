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

# Függvény létrehozása

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

# Paraméterek

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

# Több paraméter

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

# Visszatérési érték

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

# Alapértelmezett paraméter

```php
function greetUser(string $name = "Guest") {
    echo "Welcome, $name!";
}

greetUser();        // Welcome, Guest!
greetUser("Kate");  // Welcome, Kate!
```

---

# Típusdeklarációk (modern PHP)

```php
function multiply(int $a, int $b): int {
    return $a * $b;
}
```

---

# Tömb visszatérési érték

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

# Függvény + tömb

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

# Függvény + feltétel

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

# Függvény + ciklus

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

# `void` visszatérési típus

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

# Anonim függvény (closure)

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

# Arrow function (rövidített forma)

```php
$triple = fn($n) => $n * 3;

echo $triple(4);
```

**Output:**
```
12
```

---

# Tipikus hibák függvényeknél

:::info Tipikus hibák
- függvényen belül nem létező változó használata
- return hiánya → `null`
- túl sok felelősség egy függvényben
- rossz elnevezések (pl. `doStuff()`)
- túl hosszú függvények  
  :::

---

# Gyakorlófeladatok

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

# Megjegyzés

- Érdemes utánanézni a függvények típusdeklarációinak (int, string, array).
- Lásd még: névtelen függvények, arrow function-k.  

---