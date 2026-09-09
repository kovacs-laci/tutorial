---
id: login-roles
slug: /php/jogosultsagkezeles/szerepkorok
title: "Szerepkörkezelés (RBAC) példa"
---

# Szerepkörkezelés (RBAC) MVC mintával – PHP példával

A szerepkörkezelés (RBAC – Role-Based Access Control) célja, hogy a rendszer meghatározza:

- ki milyen funkciókat érhet el,
- milyen műveleteket végezhet,
- milyen oldalakhoz férhet hozzá.

Ebben a fejezetben egy egyszerű, oktatási célú RBAC rendszert valósítunk meg:

- **admin** – teljes hozzáférés
- **editor** – tartalom szerkesztése
- **reader** – csak olvasás

A megoldás illeszkedik a korábbi regisztráció/login/logout/password reset modulokhoz.

---

# 📂 Mappa struktúra (kiegészítve)

```
/app
    /Controllers
        RegisterController.php
        LoginController.php
        PasswordResetController.php
        DashboardController.php      ← ÚJ
    /Models
        User.php
    /Views
        dashboard_admin.php          ← ÚJ
        dashboard_editor.php         ← ÚJ
        dashboard_reader.php         ← ÚJ
    /Middleware
        AuthMiddleware.php           ← ÚJ
        RoleMiddleware.php           ← ÚJ
/public
    index.php
```

---

# 🧩 1. Adatbázis módosítása – szerepkör mező

A `users` táblához hozzáadunk egy `role` mezőt:

```
ALTER TABLE users ADD role VARCHAR(20) DEFAULT 'reader';
```

### 🔍 Magyarázat

- Minden felhasználó alapértelmezett szerepköre: **reader**.
- Regisztrációkor ezt automatikusan megkapja.
- Admin felületen később módosítható (opcionális).

---

# 🧩 2. Model – User.php (kiegészítés)

```php
public function setRole($email, $role)
{
    $stmt = $this->db->prepare("
        UPDATE users SET role = ? WHERE email = ?
    ");

    return $stmt->execute([$role, $email]);
}
```

### 🔍 Magyarázat

- Ezzel később admin felületen módosítható a szerepkör.
- A login során a szerepkört a session‑be is betöltjük.

---

# 🧩 3. LoginController – szerepkör betöltése

A login metódusban egészítsük ki:

```php
$_SESSION['user'] = [
    'id' => $user['id'],
    'email' => $user['email'],
    'role' => $user['role']   // ← ÚJ
];
```

### 🔍 Magyarázat

- A szerepkör bekerül a session‑be.
- Így minden kérésnél elérhető.

---

# 🧩 4. Middleware – AuthMiddleware.php

```php
<?php

class AuthMiddleware
{
    public static function handle()
    {
        session_start();

        if (!isset($_SESSION['user'])) {
            echo "Be kell jelentkezned.";
            exit;
        }
    }
}
```

### 🔍 Magyarázat

- Ez biztosítja, hogy csak bejelentkezett felhasználók érhessék el a védett oldalakat.
- Ha nincs session → kilép.

---

# 🧩 5. Middleware – RoleMiddleware.php

```php
<?php

class RoleMiddleware
{
    public static function allow($roles = [])
    {
        session_start();

        if (!in_array($_SESSION['user']['role'], $roles)) {
            echo "Nincs jogosultságod az oldal megtekintéséhez.";
            exit;
        }
    }
}
```

### 🔍 Magyarázat

- A metódus paraméterként kapja, mely szerepkörök férhetnek hozzá.
- Ha a felhasználó szerepe nincs a listában → megtagadja a hozzáférést.

---

# 🧩 6. Controller – DashboardController.php

```php
<?php

class DashboardController
{
    public function index()
    {
        AuthMiddleware::handle();

        $role = $_SESSION['user']['role'];

        switch ($role) {
            case 'admin':
                include __DIR__ . '/../Views/dashboard_admin.php';
                break;

            case 'editor':
                include __DIR__ . '/../Views/dashboard_editor.php';
                break;

            default:
                include __DIR__ . '/../Views/dashboard_reader.php';
        }
    }
}
```

### 🔍 Magyarázat

- A dashboard minden szerepkörnek más nézetet mutat.
- Az admin látja a teljes admin felületet.
- Az editor csak a szerkesztői funkciókat.
- A reader csak olvasni tud.

---

# 🧩 7. Nézetek – dashboard_admin.php

```php
<h2>Admin felület</h2>
<p>Üdv, <?= $_SESSION['user']['email'] ?>!</p>

<ul>
    <li>Felhasználók kezelése</li>
    <li>Szerepkörök módosítása</li>
    <li>Beállítások</li>
</ul>
```

---

# 🧩 dashboard_editor.php

```php
<h2>Szerkesztői felület</h2>
<p>Üdv, <?= $_SESSION['user']['email'] ?>!</p>

<ul>
    <li>Tartalom létrehozása</li>
    <li>Tartalom módosítása</li>
</ul>
```

---

# 🧩 dashboard_reader.php

```php
<h2>Olvasói felület</h2>
<p>Üdv, <?= $_SESSION['user']['email'] ?>!</p>

<p>Csak olvasási jogosultsággal rendelkezel.</p>
```

---

# 🧩 8. index.php (kiegészítve)

```php
require 'app/Middleware/AuthMiddleware.php';
require 'app/Middleware/RoleMiddleware.php';
require 'app/Controllers/DashboardController.php';

$dashboard = new DashboardController($db);

switch ($action) {
    ...
    case 'dashboard':
        $dashboard->index();
        break;
}
```

---

# 🎓 Összefoglalás

Ez a modul:

- teljesen illeszkedik a korábbi regisztráció/login/logout/password reset példákhoz,
- tiszta PHP‑ben, MVC mintával valósítja meg az RBAC‑ot,
- session‑alapú szerepkörkezelést használ,
- middleware‑szerű megoldással védi a védett oldalakat,
- külön nézetet ad admin / editor / reader szerepköröknek.
