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
$tanulo = [
    "nev" => "Kata",
    "kor" => 16,
    "osztaly" => "10.B"
];
```

---

# Elem elérése kulccsal

```php
echo $tanulo["nev"]; // Kata
echo $tanulo["kor"]; // 16
```

---

# Új elem hozzáadása

```php
$tanulo["lakhely"] = "Vác";
```

---

# Elem módosítása

```php
$tanulo["kor"] = 17;
```

---

# Bejárás kulccsal és értékkel

```php
foreach ($tanulo as $kulcs => $ertek) {
    echo "$kulcs: $ertek<br>";
}
```

---

# Többdimenziós asszociatív tömb

```php
$diakok = [
    [
        "nev" => "Anna",
        "kor" => 15
    ],
    [
        "nev" => "Béla",
        "kor" => 16
    ]
];

echo $diakok[1]["nev"]; // Béla
```

---

# Gyakorlófeladatok

1. Hozz létre egy asszociatív tömböt egy könyvről (cím, szerző, év).
2. Írd ki a könyv címét és szerzőjét.
3. Adj hozzá egy új kulcsot: „oldalszám”.
4. Készíts egy tömböt három diákról, mindegyik asszociatív tömb legyen.

---

## Megjegyzés

- Érdemes utánanézni a JSON és az asszociatív tömbök kapcsolatának.
- Lásd még: tömbök beágyazása, API válaszok feldolgozása.
