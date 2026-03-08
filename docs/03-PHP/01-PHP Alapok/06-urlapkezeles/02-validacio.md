---
id: validacio
slug: /php-alapok/validacio
title: "Űrlapok validálása"
---

# Űrlapok validálása

A validáció célja, hogy ellenőrizzük: a felhasználó helyes adatokat adott‑e meg.  
A validáció lehet:

- **kliensoldali** (JavaScript)
- **szerveroldali** (PHP)

Ebben a fejezetben a szerveroldali validációt nézzük.

---

# Alap validáció

```php
if (empty($_POST["nev"])) {
    echo "A név megadása kötelező!";
}
```

---

# Szám ellenőrzése

```php
$kor = $_POST["kor"];

if (!is_numeric($kor)) {
    echo "A kor csak szám lehet!";
}
```

---

# Minimális és maximális hossz

```php
$jelszo = $_POST["jelszo"];

if (strlen($jelszo) < 6) {
    echo "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
}
```

---

# E-mail ellenőrzése

```php
$email = $_POST["email"];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Érvénytelen e-mail cím!";
}
```

---

# Komplett példa

```php
$hibak = [];

if (empty($_POST["nev"])) {
    $hibak[] = "A név kötelező.";
}

if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $hibak[] = "Érvénytelen e-mail cím.";
}

if (count($hibak) > 0) {
    foreach ($hibak as $hiba) {
        echo "<p>$hiba</p>";
    }
} else {
    echo "Sikeres beküldés!";
}
```

---

# Gyakorlófeladatok

1. Készíts űrlapot név + életkor mezővel, és ellenőrizd, hogy az életkor szám‑e.
2. Készíts űrlapot e-mail mezővel, és validáld a címet.
3. Készíts jelszó mezőt, amely legalább 8 karakter hosszú.

---

## Megjegyzés

- Érdemes utánanézni a `filter_var()` további szűrőinek.
- Lásd még: szerveroldali és kliensoldali validáció összehasonlítása.
