---
id: asszociativ-tombok
slug: /php-alapok/asszociativ-tombok
title: "Asszociatív tömbök"
---

# Asszociatív tömbök

Az asszociatív tömbökben az elemeket **kulcs–érték párok** formájában tároljuk.  
A kulcs lehet szöveg vagy szám, de leggyakrabban szöveg.

---

# Létrehozás

```php
$student = [
    "name" => "Kate",
    "age" => 16,
    "class" => "10.B"
];
```

**Output:**
```
Array
(
    [name] => Kate
    [age] => 16
    [class] => 10.B
)
```

---

# Elem elérése kulccsal

```php
echo $student["name"]; // Kate
echo $student["age"];  // 16
```

**Output:**
```
Kate
16
```

---

# Új elem hozzáadása

```php
$student["city"] = "Vác";
```

**Output:**
```
Array
(
    [name] => Kate
    [age] => 16
    [class] => 10.B
    [city] => Vác
)
```

---

# Elem módosítása

```php
$student["age"] = 17;
```

**Output:**
```
17
```

---

# Kulcs létezésének ellenőrzése

```php
isset($student["age"]);           // true
array_key_exists("class", $student); // true
```

**Megjegyzés:**  
`isset()` false, ha az érték **null**,  
`array_key_exists()` true, még akkor is.

---

# Elem törlése

```php
unset($student["class"]);
```

**Output:**
```
Array
(
    [name] => Kate
    [age] => 17
    [city] => Vác
)
```

---

# Bejárás kulccsal és értékkel

```php
foreach ($student as $key => $value) {
    echo "$key: $value<br>";
}
```

**Output:**
```
name: Kate
age: 17
city: Vác
```

---

# Csak kulcsok bejárása

```php
foreach (array_keys($student) as $key) {
    echo $key . "<br>";
}
```

**Output:**
```
name
age
city
```

---

# Csak értékek bejárása

```php
foreach (array_values($student) as $value) {
    echo $value . "<br>";
}
```

**Output:**
```
Kate
17
Vác
```

---

# Asszociatív tömb módosítása bejárás közben (referencia)

```php
foreach ($student as &$value) {
    $value = strtoupper($value);
}
```

**Output:**
```
Array
(
    [name] => KATE
    [age] => 17
    [city] => VÁC
)
```

---

# Rendezés kulcs vagy érték szerint

```php
ksort($student); // kulcs szerint
asort($student); // érték szerint
```

---

# Többdimenziós asszociatív tömb

```php
$students = [
    [
        "name" => "Anna",
        "age" => 15
    ],
    [
        "name" => "Bela",
        "age" => 16
    ]
];

echo $students[1]["name"]; // Bela
```

**Output:**
```
Bela
```

---

# Tipikus hibák asszociatív tömböknél

:::info Tipikus hibák
- nem létező kulcs elérése → warning
- kulcsok sorrendje nem garantált
- `isset()` vs `array_key_exists()` különbsége
- referencia szerinti foreach után a változó „bennragad”  
  :::

---

# Gyakorlófeladatok

**1. Hozz létre egy asszociatív tömböt egy könyvről (title, author, year).**
<details>
<summary>Megoldás</summary>

```php
$book = [
    "title" => "1984",
    "author" => "George Orwell",
    "year" => 1949
];

print_r($book);
```
</details>

---

**2. Írd ki a könyv címét és szerzőjét.**
<details>
<summary>Megoldás</summary>

```php
echo $book["title"] . "<br>";
echo $book["author"];
```
</details>

---

**3. Adj hozzá egy új kulcsot: "pages".**
<details>
<summary>Megoldás</summary>

```php
$book["pages"] = 328;

print_r($book);
```
</details>

---

**4. Készíts egy tömböt három diákról, mindegyik asszociatív tömb legyen.**
<details>
<summary>Megoldás</summary>

```php
$students = [
    [
        "name" => "Anna",
        "age" => 15,
        "class" => "9A"
    ],
    [
        "name" => "Bela",
        "age" => 16,
        "class" => "10B"
    ],
    [
        "name" => "Csaba",
        "age" => 17,
        "class" => "11C"
    ]
];

foreach ($students as $student) {
    echo $student["name"] . " (" . $student["class"] . ")<br>";
}
```
</details>

---

## Megjegyzés

- Érdemes utánanézni a JSON és az asszociatív tömbök kapcsolatának.
- Lásd még: tömbök beágyazása, API válaszok feldolgozása.   

---