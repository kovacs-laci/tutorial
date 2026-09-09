---
id: valtozok-tipusok
slug: /php/szintaxis/valtozok-tipusok
title: "Változók és típusok"
---

# Változók és típusok

A változók olyan „dobozok”, amelyekben adatot tárolunk.  
PHP-ben minden változó **$ jellel** kezdődik.

```php
$name = "Jimmy";
$age = 17;
```

---

## Változónevek szabályai és jó gyakorlatai

A változónevek:

- nem kezdődhetnek számmal,
- csak betűt, számot és alulvonást (_) tartalmazhatnak,
- ékezet nélküliek,
- angolul íródnak,
- beszédesek legyenek (a név utaljon a tartalomra),
- camelCase formát használnak.

### CamelCase példa

A camelCase azt jelenti, hogy:

- az első szó kisbetű,
- a következő szavak nagybetűvel kezdődnek,
- nincs szóköz, nincs kötőjel.

```php
$firstName = "John";
$paymentDeadline = "2026-09-01";
$totalPrice = 199.99;
$isLoggedIn = true;
```

---

## Logikai változók konvenciói

A boolean változók nevei kezdődjenek:

- **`is*`** – állapot  
  `$isActive`, `$isVisible`, `$isAdmin`
- **`has*`** – birtoklás  
  `$hasPermission`, `$hasDiscount`, `$hasErrors`
- **`can*`** – képesség / jogosultság  
  `$canEdit`, `$canDelete`, `$canView`
- **`should*`** – szükségesség  
  `$shouldRedirect`, `$shouldSave`
- **`needs*`** – szükséglet  
  `$needsUpdate`, `$needsValidation`
- **`allowed*`** – engedélyezés  
  `$allowedToProceed`, `$allowedToLogin`

### Példa

```php
$isActive = true;
$hasPermission = false;
$canEdit = true;
$shouldRedirect = false;
$needsUpdate = true;
$allowedToProceed = true;
```

---

## Mikor jók a rövid változónevek?

Bizonyos esetekben a rövid nevek teljesen elfogadottak:

- matematikai műveleteknél: `$a`, `$b`, `$x`
- ciklusváltozónál: `$i`, `$j`

```php
for ($i = 0; $i < 10; $i++) {
    echo $i;
}
```

---

## Mikor rosszak a rövid változónevek?

Ha a változó **valós adatot** tárol, a rövid név rontja az olvashatóságot:

```php
// Rossz példa
$pdl = "2026-09-01";
$deadline = "2026-09-01";

// Jó példa
$paymentDeadline = "2026-09-01";
```

A jó változónév segít megérteni a kódot anélkül, hogy kommentet kellene írni.

---

## Tömbök nevei legyenek többes számban

Ez segít megkülönböztetni az egy elemet a listától.

```php
$student = ["name" => "Kate"];
$students = ["Kate", "John", "Emma"];
```

---

## Függvénynevek legyenek cselekvések

A függvény neve utaljon arra, hogy **mit csinál**:

```php
getUser();
saveOrder();
calculatePrice();
validateInput();
```

---

## Alapvető típusok

### Szöveg (string)

```php
$text = "Hello!";
```

### Egész szám (integer)

```php
$year = 2026;
```

### Lebegőpontos szám (float)

```php
$average = 4.57;
```

### Logikai érték (boolean)

```php
$isActive = true;
$isStudent = false;
```

### Null érték

```php
$middleName = null;
```

A `null` azt jelenti, hogy a változónak **nincs értéke**.

### Tömb (array)

```php
$numbers = [1, 2, 3];
```

### Asszociatív tömb


$student → egyetlen diák adatai
```php
$student = [
    "name" => "Kate",
    "age" => 16,
    "class" => "10A"
];
```

$students → diákok listája (többes szám, helyes konvenció)
minden elem asszociatív tömb, így a diákok adatai jól strukturáltak
```php
$students = [
    [
        "name" => "Kate",
        "age" => 16,
        "class" => "10A"
    ],
    [
        "name" => "John",
        "age" => 17,
        "class" => "11B"
    ],
    [
        "name" => "Emma",
        "age" => 15,
        "class" => "9C"
    ]
];
```

a diákok listája később könnyen bejárható

```php
foreach ($students as $student) {
    echo $student["name"] . "<br>";
}
```

---

## Változók kiírása

```php
$name = "Jimmy";
echo $name;
```

---

## Változók összefűzése

### Dupla idézőjel (változóérték megjelenik)

```php
$name = "Laszlo";
echo "Hello, $name!";
```

### Pont operátor (összefűzés)

```php
$name = "Laszlo";
echo "Hello, " . $name . "!";
```

---

## A PHP automatikus típusváltása (type juggling)

A PHP gyengén típusos nyelv, ezért automatikusan átalakítja a típusokat, ha szükséges.

```php
$number = "5";   // string
$result = $number + 3; // automatikusan számmá alakul

echo $result; // 8
```

---

## Típusellenőrző függvények

```php
is_string($text);
is_int($year);
is_bool($isActive);
is_array($numbers);
```

---

## Változók vizsgálata (debug)

A `var_dump()` és `print_r()` hasznos eszközök a változók tartalmának és típusának megvizsgálásához.

```php
$student = [
    "name" => "Kate",
    "age" => 16
];

var_dump($student);
print_r($student);
```

---

## Változó felülírása

A változó új értéket kaphat:

```php
$age = 17;
$age = 18; // új érték
```

---

# Gyakorlófeladatok

1. Hozz létre három változót: `name`, `age`, `favoriteSubject`. Írd ki őket.
2. Készíts egy változót, amely egy mondatot tartalmaz, és jelenítsd meg.
3. Hozz létre egy asszociatív tömböt egy diákról (`name`, `age`, `class`). Írd ki az adatokat.
4. Hozz létre egy tömböt számokkal, és vizsgáld meg `var_dump()` segítségével.
5. Készíts egy változót `null` értékkel, majd adj neki új értéket.

---

## Megjegyzés

A PHP **weak typing** rendszert használ, ezért a típusok automatikusan változhatnak.  
A `var_dump()` és `print_r()` később az űrlapkezelésnél és adatbázis‑műveleteknél is nagyon hasznosak lesznek.
---