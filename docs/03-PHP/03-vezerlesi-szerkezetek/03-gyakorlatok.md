---
id: vezerlesi-gyakorlatok
slug: /php/vezerlesi-szerkezetek/gyakorlatok
title: "Haladó feladatok – Vezérlési szerkezetek"
---

# Haladó feladatok – Vezérlési szerkezetek

Ebben a részben összetettebb feladatokkal gyakorolhatod az elágazásokat és ciklusokat.  
A feladatokhoz **rejtett megoldásokat** is találsz.

---

# 1. Szorzótábla generálása

Írj programot, amely kiírja a 10×10-es szorzótáblát két egymásba ágyazott `for` ciklus segítségével.

<details>
<summary>Megoldás</summary>

```php
for ($row = 1; $row <= 10; $row++) {
    for ($col = 1; $col <= 10; $col++) {
        echo ($row * $col) . " ";
    }
    echo "<br>";
}
```
</details>

---

# 2. Minimum és maximum keresése tömbben

Adott egy tömb:

```php
$numbers = [12, 5, 8, 20, 3];
```

Feladat:
- keresd meg a legkisebb számot
- keresd meg a legnagyobb számot

<details>
<summary>Megoldás</summary>

```php
$numbers = [12, 5, 8, 20, 3];

$min = $numbers[0];
$max = $numbers[0];

foreach ($numbers as $number) {
    if ($number < $min) $min = $number;
    if ($number > $max) $max = $number;
}

echo "Min: $min<br>";
echo "Max: $max<br>";
```
</details>

---

# 3. Számok összege

Írj programot, amely egy tömb elemeinek összegét számolja ki.

<details>
<summary>Megoldás</summary>

```php
$numbers = [12, 5, 8, 20, 3];

$sum = 0;

foreach ($numbers as $number) {
    $sum += $number;
}

echo "Sum: $sum";
```
</details>

---

# 4. Csillagpiramis

Készíts programot, amely az alábbi mintát rajzolja ki:

```
*
**
***
****
*****
```

<details>
<summary>Megoldás</summary>

```php
for ($i = 1; $i <= 5; $i++) {
    echo str_repeat("*", $i) . "<br>";
}
```
</details>

---

# 5. Egyszerű menü

Írj programot, amely:

- kiír egy menüt,
- bekér egy számot (1–3),
- `switch` segítségével kiírja a választott menüpontot.

<details>
<summary>Megoldás</summary>

```php
echo "Menu:<br>";
echo "1. Home<br>";
echo "2. Settings<br>";
echo "3. Exit<br><br>";

$choice = 2; // példaként beállítva

switch ($choice) {
    case 1:
        echo "You selected Home";
        break;
    case 2:
        echo "You selected Settings";
        break;
    case 3:
        echo "You selected Exit";
        break;
    default:
        echo "Invalid choice";
}
```
</details>

---

# 6. Input normalizálás és validálás (early return + mapping)

Írj függvényt, amely egy felhasználói szerepet kap (`admin`, `editor`, `user`, `guest`), és visszaadja a jogosultsági szintet.  
Érvénytelen bemenet esetén: `"Invalid role"`.

<details>
<summary>Megoldás</summary>

```php
function getRoleLevel(string $role): string|int
{
    $role = strtolower(trim($role));

    $map = [
        "admin"  => 3,
        "editor" => 2,
        "user"   => 1,
        "guest"  => 0,
    ];

    return $map[$role] ?? "Invalid role";
}
```
</details>

---

# 7. Termék megjeleníthetősége (truthy/falsy + guard clause)

A termék akkor jeleníthető meg, ha:

- van neve,
- ára pozitív,
- nincs letiltva,
- készlete nem nulla.

<details>
<summary>Megoldás</summary>

```php
function canDisplayProduct(array $product): bool
{
    if (empty($product["name"])) return false;
    if (($product["price"] ?? 0) <= 0) return false;
    if (!empty($product["disabled"])) return false;
    if (($product["stock"] ?? 0) <= 0) return false;

    return true;
}
```
</details>

---

# 8. Pontszám kategorizálása match-csel

Írj függvényt, amely egy pontszám alapján kategóriát ad vissza:

- 90–100 → "Excellent"
- 70–89 → "Good"
- 50–69 → "Average"
- 0–49 → "Poor"

<details>
<summary>Megoldás</summary>

```php
function getScoreCategory(int $score): string
{
    return match (true) {
        $score >= 90 => "Excellent",
        $score >= 70 => "Good",
        $score >= 50 => "Average",
        default      => "Poor",
    };
}
```
</details>

---

# 9. Switch vs match – különbségek felismerése

Készíts két függvényt:

- az egyik switch‑et használ,
- a másik match‑et,

ugyanarra a feladatra: nap száma → nap neve.

Majd írd le kommentben a különbségeket.

<details>
<summary>Megoldás</summary>

```php
function getDaySwitch(int $day): string
{
    switch ($day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        default: return "Unknown";
    }
}

function getDayMatch(int $day): string
{
    return match ($day) {
        1 => "Monday",
        2 => "Tuesday",
        3 => "Wednesday",
        default => "Unknown",
    };
}

// switch → laza összehasonlítás (==), break szükséges
// match → szigorú összehasonlítás (===), break nem kell, visszaad értéket
```
</details>

---

# 10. Cyclomatic complexity csökkentése – három megoldás

Adott egy rossz kód:

```php
function getAgeCategoryBad(int $age): string
{
    if ($age < 0) {
        return "Invalid";
    } else {
        if ($age < 18) {
            return "Minor";
        } else {
            if ($age < 65) {
                return "Adult";
            } else {
                return "Senior";
            }
        }
    }
}

```

alakítsd át:
- early return mintára,
- match szerkezetre,
- mapping tömbre.

<details>
<summary>Early return</summary>

```php
function getAgeCategoryEarly(int $age): string
{
    if ($age < 0) return "Invalid";
    if ($age < 18) return "Minor";
    if ($age < 65) return "Adult";
    return "Senior";
}
```
</details>

<details>
<summary>Match</summary>

```php
function getAgeCategoryMatch(int $age): string
{
    return match (true) {
        $age < 0  => "Invalid",
        $age < 18 => "Minor",
        $age < 65 => "Adult",
        default   => "Senior",
    };
}
```
</details>

<details>
<summary>Mapping</summary>

```php
function getAgeCategoryMap(int $age): string
{
    if ($age < 0) return "Invalid";

    $map = [
        $age < 18 => "Minor",
        $age < 65 => "Adult",
    ];

    foreach ($map as $condition => $result) {
        if ($condition) return $result;
    }

    return "Senior";
}
```
</details>

---

# 11. Komplex jogosultsági rendszer tiszta logikával

Írj függvényt, amely eldönti, hogy egy felhasználó hozzáférhet‑e egy admin oldalhoz.

A hozzáférés akkor engedélyezett, ha:

- a role = admin, vagy
- role = editor és canEditAdmin = true, vagy
- role = user és betaTester = true.

<details>
<summary>Megoldás</summary>

```php
function canAccessAdmin(array $user): bool
{
    $role = $user["role"] ?? "";
    $canEditAdmin = $user["canEditAdmin"] ?? false;
    $betaTester = $user["betaTester"] ?? false;

    return match (true) {
        $role === "admin" => true,
        $role === "editor" && $canEditAdmin => true,
        $role === "user" && $betaTester => true,
        default => false,
    };
}
```
</details>

---

# 12. Input normalizálás több lépésben

Írj függvényt, amely:

1. levágja a szóközöket,
2. kisbetűssé alakítja,
3. mapping alapján visszaadja a szerephez tartozó szöveget.

<details>
<summary>Megoldás</summary>

```php
function normalizeRole(string $role): string
{
    $role = strtolower(trim($role));

    $map = [
        "admin"  => "Administrator",
        "editor" => "Editor",
        "user"   => "User",
        "guest"  => "Guest",
    ];

    return $map[$role] ?? "Unknown";
}
```
</details>

---

# 13. Komplex feltétel optimalizálása

Írj függvényt, amely három külön logikát kezel:

- felnőtt + személyi igazolvány,
- 16+ szülői engedély + nem tiltott,
- VIP + meghívó.

Majd egy végső függvényben kombináld őket.

<details>
<summary>Megoldás</summary>

```php
function isAdultWithId(int $age, bool $hasId): bool
{
    return $age >= 18 && $hasId;
}

function isTeenWithConsent(int $age, bool $hasParentConsent, bool $banned): bool
{
    return $age >= 16 && $hasParentConsent && !$banned;
}

function isVipAllowed(bool $vip, bool $hasInvitation): bool
{
    return $vip && $hasInvitation;
}

function isAllowed(array $user): bool
{
    return
        isAdultWithId($user["age"], $user["hasId"]) ||
        isTeenWithConsent($user["age"], $user["hasParentConsent"], $user["banned"]) ||
        isVipAllowed($user["vip"], $user["hasInvitation"]);
}
```
</details>

---

# 14. Hibakódok kezelése prioritással

Írj függvényt, amely:

- logolja a hibakódot,
- visszaadja a megfelelő hibaüzenetet.

<details>
<summary>Megoldás</summary>

```php
function logError(int $code): void
{
    error_log("Error code: " . $code);
}

function getErrorMessage(int $code): string
{
    logError($code);

    return match ($code) {
        404 => "Not Found",
        500 => "Server Error",
        403 => "Forbidden",
        401 => "Unauthorized",
        default => "Unknown Error",
    };
}
```
</details>

---

# 15. Routing tömb alapú vezérléssel

Készíts routing logikát tömbbel:

```php
$routes = [
    "/home"    => "HomeController",
    "/login"   => "LoginController",
    "/profile" => "ProfileController",
];
```

A függvény:

- kap egy útvonalat,
- visszaadja a megfelelő kontrollert,
- ha nem létezik → `"404"`.

<details>
<summary>Megoldás</summary>

```php
function resolveRoute(string $path): string
{
    $routes = [
        "/home"    => "HomeController",
        "/login"   => "LoginController",
        "/profile" => "ProfileController",
    ];

    return $routes[$path] ?? "404";
}
```
</details>

---

# Megjegyzés

Érdemes utánanézni a beágyazott ciklusok működésének, az algoritmusok alapjainak, valamint az iteráció és rekurzió közötti különbségeknek.

---