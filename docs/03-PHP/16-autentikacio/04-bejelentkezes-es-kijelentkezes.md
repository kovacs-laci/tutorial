---
id: login-logout-example
slug: /php/autentikacio/bejelentkezes-es-kijelentkezes
title: "Login és Logout példa"
---

# Login és Logout MVC mintával (PHP példával)

Ez a fejezet a korábbi regisztrációs példára épül, és bemutatja:

- hogyan történik a **bejelentkezés** (login),
- hogyan ellenőrzi a rendszer a jelszót,
- hogyan kezeli a session‑t,
- hogyan működik a **kijelentkezés** (logout),
- hogyan illeszkedik mindez az MVC mintába.

---

# 📂 Mappa struktúra (kiegészítve)

```
/app
    /Controllers
        RegisterController.php
        LoginController.php   ← ÚJ
    /Models
        User.php
    /Views
        register_form.php
        register_success.php
        verify_form.php
        login_form.php        ← ÚJ
        dashboard.php         ← ÚJ
    /Services
        MailService.php
        OtpService.php
/public
    index.php
```

---

# 🧩 Controller – LoginController.php

```php
<?php

class LoginController
{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new User($db);
        session_start();
    }

    public function showLoginForm()
    {
        include __DIR__ . '/../Views/login_form.php';
    }

    public function login()
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = $this->userModel->findByEmail($email);

        // 1. lépés: létezik-e a felhasználó?
        if (!$user) {
            echo "Hibás email vagy jelszó.";
            return;
        }

        // 2. lépés: aktív-e a fiók?
        if (!$user['is_active']) {
            echo "A fiók még nincs aktiválva.";
            return;
        }

        // 3. lépés: jelszó ellenőrzése
        if (!password_verify($password, $user['password_hash'])) {
            echo "Hibás email vagy jelszó.";
            return;
        }

        // A sikeres login után új session-azonosító kell.
        session_regenerate_id(true);

        // 4. lépés: session adatok mentése
        $_SESSION['user'] = [
            'id' => $user['id'],
            'email' => $user['email']
        ];

        include __DIR__ . '/../Views/dashboard.php';
    }

    public function logout()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            return;
        }

        session_start();
        $_SESSION = [];
        session_destroy();
        echo "Sikeresen kijelentkeztél.";
    }
}
```

---

## 🔍 Kódmagyarázat

### `session_start()`
A session kezeléséhez minden kérés elején szükséges.

### `findByEmail()`
A modellből kérdezzük le a felhasználót.

### 1. **Felhasználó létezik?**
Ha nincs ilyen e-mail, nem áruljuk el → biztonsági okokból mindig ugyanazt a hibaüzenetet adjuk.

### 2. **Aktív-e a fiók?**
Csak az OTP‑vel megerősített felhasználók léphetnek be.

### 3. **Jelszó ellenőrzése**
A `password_verify()` összehasonlítja a megadott jelszót a bcrypt hash-sel.

### 4. **Session létrehozása**
A session‑ben tároljuk a felhasználó azonosítóját és e-mail címét.

---

# 🧩 View – login_form.php

```php
<form method="POST" action="/index.php?action=login">
    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Jelszó:</label>
    <input type="password" name="password" required>

    <button type="submit">Bejelentkezés</button>
</form>
```

### 🔍 Kódmagyarázat

- Egyszerű HTML űrlap.
- A `POST` kérés a `LoginController::login()` metódushoz fut be.

---

# 🧩 View – dashboard.php

```php
<h2>Üdv újra itt!</h2>

<p>Be vagy jelentkezve mint: <?= $_SESSION['user']['email'] ?></p>

<a href="/index.php?action=logout">Kijelentkezés</a>
```

### 🔍 Kódmagyarázat

- A session‑ből olvassuk ki a bejelentkezett felhasználó adatait.
- A kijelentkezés egy GET kérés a `logout` action felé.

---

# 🧩 index.php (kiegészítve)

```php
<?php

require 'app/Models/User.php';
require 'app/Services/OtpService.php';
require 'app/Services/MailService.php';
require 'app/Controllers/RegisterController.php';
require 'app/Controllers/LoginController.php';

$db = new PDO("mysql:host=localhost;dbname=demo", "root", "");

$register = new RegisterController($db);
$login = new LoginController($db);

$action = $_GET['action'] ?? 'form';

switch ($action) {
    case 'register':
        $register->register();
        break;
    case 'verifyForm':
        $register->verifyForm();
        break;
    case 'verify':
        $register->verify();
        break;
    case 'loginForm':
        $login->showLoginForm();
        break;
    case 'login':
        $login->login();
        break;
    case 'logout':
        $login->logout();
        break;
    default:
        $register->showForm();
}
```

---

## 🔍 Kódmagyarázat

- A `LoginController` és `RegisterController` egymás mellett működik.
- A `loginForm`, `login`, `logout` actionök a login modulhoz tartoznak.
- A `default` továbbra is a regisztrációs űrlap.

---

# 🎓 Összefoglalás

A login/logout modul:

- session‑alapú bejelentkezést valósít meg,
- bcrypt‑tel ellenőrzi a jelszót,
- csak aktív (OTP‑vel megerősített) felhasználókat enged be,
- tiszta MVC szerkezetet követ,
- könnyen bővíthető szerepkörökkel, jogosultságokkal.
