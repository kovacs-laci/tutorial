---
id: indexelt-tombok
slug: /php/tombok/indexelt-tombok
title: "Indexelt tömbök"
---

# Indexelt tömbök

Az indexelt tömbökben az elemeket **számozott indexek** alapján érjük el.  
Az első elem indexe mindig **0**.

---

# Tömb létrehozása

```php
$numbers = [10, 20, 30];
```

Ugyanez hosszú formában:

```php
$numbers = array(10, 20, 30);
```

Üres tömb:

```php
$numbers = [];
```

Vegyes típusú tömb:

```php
$items = [10, "apple", true];
```

---

# Elem elérése index alapján

```php
$fruits = ["apple", "pear", "plum"];

echo $fruits[0]; // apple
echo $fruits[2]; // plum
```

---

# Elem módosítása

```php
$fruits[1] = "banana";
```

---

# Új elem hozzáadása

```php
$fruits[] = "orange";
```

---

# Tömb hossza – `count()`

```php
$numbers = [10, 20, 30];
echo count($numbers); // 3
```

---

# Tömb bejárása `foreach`-el

```php
$fruits = ["apple", "pear", "plum"];

foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
```

---

# Tömb bejárása indexszel – `for`

```php
$fruits = ["apple", "pear", "plum"];

for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
```

---

# Tömb módosítása bejárás közben (referencia)

```php
$numbers = [1, 2, 3];

foreach ($numbers as &$number) {
    $number *= 2;
}

print_r($numbers); // [2, 4, 6]
```

---

# Tömb megfordítása (reverse)

```php
$fruits = ["apple", "pear", "plum"];

for ($i = count($fruits) - 1; $i >= 0; $i--) {
    echo $fruits[$i] . "<br>";
}
```

---

# Tipikus hibák indexelt tömböknél

:::info Tipikus hibák
- nem létező index elérése → warning
- off-by-one hiba (`<=` vs `<`)
- `count()` hívása minden iterációban → lassabb
- referencia szerinti foreach után a változó „bennragad”  
  :::

---

# Gyakorlófeladatok

**1. Hozz létre egy tömböt 5 gyümölccsel, majd írd ki őket.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum", "banana", "orange"];

foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
```
</details>

---

**2. Írd ki egy tömb első és utolsó elemét.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];

echo $fruits[0] . "<br>";
echo $fruits[count($fruits) - 1] . "<br>";
```
</details>

---

**3. Adj hozzá egy új elemet a tömbhöz.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];

$fruits[] = "banana";

print_r($fruits);
```
</details>

---

**4. Írd ki a tömb hosszát.**

<details>
<summary>Megoldás</summary>

```php
$numbers = [10, 20, 30, 40];

echo count($numbers); // 4
```
</details>

---

**5. Járd be a tömböt `for` ciklussal.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];

for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
```
</details>

---

**6. Járd be a tömböt `foreach`-el.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];

foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
```
</details>

---

**7. Írd ki a tömb elemeit visszafelé.**

<details>
<summary>Megoldás</summary>

```php
$fruits = ["apple", "pear", "plum"];

for ($i = count($fruits) - 1; $i >= 0; $i--) {
    echo $fruits[$i] . "<br>";
}
```
</details>

---

**8. Duplázd meg egy tömb számait referencia szerinti bejárással.**

<details>
<summary>Megoldás</summary>

```php
$numbers = [1, 2, 3];

foreach ($numbers as &$number) {
    $number *= 2;
}

print_r($numbers); // [2, 4, 6]
```
</details>

---

## Megjegyzés

- Az asszociatív tömböket külön leckében tárgyaljuk.
- A tömbműveletek (rendezés, keresés, törlés, implode/explode stb.) a **Tömbműveletek** leckében találhatók.

---