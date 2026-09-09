---
id: login-registration-example
slug: /php/autentikacio/regisztracio
title: "Regisztráció példa"
---

# Regisztráció MVC mintával (PHP példával, kódmagyarázatokkal)

Ez a fejezet bemutatja, hogyan épül fel egy **regisztrációs folyamat** a klasszikus **MVC tervezési minta** szerint tiszta PHP-ben.

A rendszer:

- felveszi a felhasználó adatait,
- létrehozza a fiókot inaktív állapotban,
- generál egy egyszer használatos **OTP kódot**,
- elküldi e-mailben,
- majd a felhasználó a kód megadásával aktiválja a fiókját.

---

# 📂 Mappa struktúra

```
/app
    /Controllers
        RegisterController.php
    /Models
        User.php
    /Views
        register_form.php
        register_success.php
        verify_form.php
    /Services
        MailService.php
        OtpService.php
/public
    index.php
```

A mappák szerepe:

- **Models** – adatkezelés (adatbázis műveletek)
- **Views** – HTML nézetek
- **Controllers** – üzleti logika, folyamatok irányítása
- **Services** – különálló szolgáltatások (OTP generálás, e-mail küldés)
- **public/index.php** – front controller, minden kérés ide fut be

---

# 🧩 Model – User.php

```php
<?php

class User
{
    public $id;
    public $email;
    public $password_hash;
    public $otp_code;
    public $otp_expires_at;
    public $is_active = false;

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function create($email, $password, $otp)
    {
        $stmt = $this->db->prepare("
            INSERT INTO users (email, password_hash, otp_code, otp_expires_at, is_active)
            VALUES (?, ?, ?, ?, 0)
        ");

        return $stmt->execute([
            $email,
            password_hash($password, PASSWORD_BCRYPT),
            $otp['code'],
            $otp['expires_at']
        ]);
    }

    public function findByEmail($email)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function activate($email)
    {
        $stmt = $this->db->prepare("UPDATE users SET is_active = 1 WHERE email = ?");
        return $stmt->execute([$email]);
    }
}
```

### 🔍 Kódmagyarázat

- A modell **nem tartalmaz HTML-t vagy üzleti logikát**, csak adatbázis műveleteket.
- A `$db` egy PDO kapcsolat, amit konstruktorban kap meg.
- A `create()` metódus:
    - bcrypt-tel hash-eli a jelszót,
    - eltárolja az OTP kódot és lejárati idejét,
    - a felhasználó kezdetben `is_active = 0`.
- A `findByEmail()` visszaadja a felhasználó adatait.
- Az `activate()` metódus aktiválja a fiókot.

---

# 🧩 Service – OtpService.php

```php
<?php

class OtpService
{
    public function generate()
    {
        return [
            'code' => random_int(100000, 999999),
            'expires_at' => date('Y-m-d H:i:s', time() + 300) // 5 perc
        ];
    }

    public function isValid($user, $inputCode)
    {
        if ($user['otp_code'] != $inputCode) {
            return false;
        }

        return strtotime($user['otp_expires_at']) > time();
    }
}
```

### 🔍 Kódmagyarázat

- Az OTP egy **6 számjegyű véletlen kód**.
- 5 percig érvényes (`time() + 300`).
- Az `isValid()` ellenőrzi:
    - a kód egyezik-e,
    - nem járt-e le.
- Ez a logika külön szolgáltatásban van → **újrahasznosítható**, könnyen tesztelhető.

---

# 🧩 Service – MailService.php

```php
<?php

class MailService
{
    public function sendOtp($email, $otpCode)
    {
        $subject = "Regisztráció megerősítése";
        $message = "A megerősítő kódod: " . $otpCode;

        mail($email, $subject, $message);
    }
}
```

### 🔍 Kódmagyarázat

- Oktatási célú példa → a `mail()` függvény egyszerű, de valós projektben SMTP vagy PHPMailer kell.
- A szolgáltatás felelős az e-mail küldésért → **nem a controller**.

---

# 🧩 Controller – RegisterController.php

```php
<?php

class RegisterController
{
    private $userModel;
    private $otpService;
    private $mailService;

    public function __construct($db)
    {
        $this->userModel = new User($db);
        $this->otpService = new OtpService();
        $this->mailService = new MailService();
    }

    public function showForm()
    {
        include __DIR__ . '/../Views/register_form.php';
    }

    public function register()
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $otp = $this->otpService->generate();

        $this->userModel->create($email, $password, $otp);

        $this->mailService->sendOtp($email, $otp['code']);

        include __DIR__ . '/../Views/register_success.php';
    }

    public function verifyForm()
    {
        include __DIR__ . '/../Views/verify_form.php';
    }

    public function verify()
    {
        $email = $_POST['email'];
        $code = $_POST['otp'];

        $user = $this->userModel->findByEmail($email);

        if ($this->otpService->isValid($user, $code)) {
            $this->userModel->activate($email);
            echo "Fiók aktiválva!";
        } else {
            echo "Hibás vagy lejárt kód.";
        }
    }
}
```

### 🔍 Kódmagyarázat

- A controller **irányítja a folyamatot**, de nem végez adatbázis vagy e-mail műveleteket.
- A `register()` metódus:
    - beolvassa az űrlap adatait,
    - OTP-t generál,
    - létrehozza a felhasználót,
    - elküldi az OTP-t,
    - megjeleníti a siker nézetet.
- A `verify()`:
    - lekéri a felhasználót,
    - ellenőrzi az OTP-t,
    - aktiválja a fiókot.

---

# 🧩 View – register_form.php

```php
<form method="POST" action="/index.php?action=register">
    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Jelszó:</label>
    <input type="password" name="password" required>

    <button type="submit">Regisztráció</button>
</form>
```

### 🔍 Kódmagyarázat

- Egyszerű HTML űrlap.
- A `POST` kérés a controller `register()` metódusához fut be.

---

# 🧩 View – register_success.php

```php
<p>Regisztráció sikeres! A megerősítő kódot elküldtük e-mailben.</p>

<a href="/index.php?action=verifyForm">Kód megadása</a>
```

### 🔍 Kódmagyarázat

- A felhasználó értesítést kap, hogy e-mailben megérkezett a kód.
- Link a kód megadásához.

---

# 🧩 View – verify_form.php

```php
<form method="POST" action="/index.php?action=verify">
    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Megerősítő kód:</label>
    <input type="text" name="otp" required>

    <button type="submit">Fiók aktiválása</button>
</form>
```

### 🔍 Kódmagyarázat

- A felhasználó beírja az e-mail címét és az OTP kódot.
- A controller ellenőrzi és aktiválja a fiókot.

---

# 🧩 index.php (front controller)

```php
<?php

require 'app/Models/User.php';
require 'app/Services/OtpService.php';
require 'app/Services/MailService.php';
require 'app/Controllers/RegisterController.php';

$db = new PDO("mysql:host=localhost;dbname=demo", "root", "");

$controller = new RegisterController($db);

$action = $_GET['action'] ?? 'form';

switch ($action) {
    case 'register':
        $controller->register();
        break;
    case 'verifyForm':
        $controller->verifyForm();
        break;
    case 'verify':
        $controller->verify();
        break;
    default:
        $controller->showForm();
}
```

### 🔍 Kódmagyarázat

- Ez a **front controller**, minden kérés ide érkezik.
- A `$_GET['action']` alapján dönti el, melyik controller metódus fusson.
- Ez a megoldás egyszerű, de jól szemlélteti az MVC működését.

---

# 🎓 Összefoglalás

Ez a tananyag bemutatta:

- hogyan épül fel egy **MVC alapú regisztrációs folyamat**,
- hogyan generálunk és ellenőrzünk **OTP kódot**,
- hogyan különül el a **modell**, **kontroller** és **nézet**,
- hogyan működik a **front controller**.

A kódok egyszerűek, de a valódi rendszerek logikáját követik.
