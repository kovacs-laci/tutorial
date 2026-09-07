---
id: password-reset-example
title: "Jelszó‑visszaállítás példa"
slug: /login/password-reset
---

# Jelszó‑visszaállítás MVC mintával (PHP példával)

A jelszó‑visszaállítás célja, hogy a felhasználó akkor is hozzáférjen a fiókjához, ha elfelejtette a jelszavát.  
A folyamat két lépésből áll:

1. **E-mail cím megadása → OTP kód küldése**
2. **OTP + új jelszó megadása → jelszó frissítése**

A megoldás teljesen illeszkedik a korábbi regisztráció/login/logout példákhoz.

---

# 📂 Mappa struktúra (kiegészítve)

```
/app
    /Controllers
        RegisterController.php
        LoginController.php
        PasswordResetController.php   ← ÚJ
    /Models
        User.php
    /Views
        ...
        password_reset_request.php    ← ÚJ
        password_reset_verify.php     ← ÚJ
    /Services
        MailService.php
        OtpService.php
/public
    index.php
```

---

# 🧩 1. Controller – PasswordResetController.php

```php
<?php

class PasswordResetController
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

    public function showRequestForm()
    {
        include __DIR__ . '/../Views/password_reset_request.php';
    }

    public function sendResetCode()
    {
        $email = $_POST['email'];
        $user = $this->userModel->findByEmail($email);

        // Biztonsági okokból nem áruljuk el, hogy létezik-e a fiók
        if (!$user) {
            echo "Ha létezik ilyen fiók, elküldtük a kódot.";
            return;
        }

        $otp = $this->otpService->generate();

        $this->userModel->storeResetOtp($email, $otp);
        $this->mailService->sendOtp($email, $otp['code']);

        include __DIR__ . '/../Views/password_reset_verify.php';
    }

    public function resetPassword()
    {
        $email = $_POST['email'];
        $otp = $_POST['otp'];
        $newPassword = $_POST['password'];

        $user = $this->userModel->findByEmail($email);

        if (!$user || !$this->otpService->isValid($user, $otp)) {
            echo "Hibás vagy lejárt kód.";
            return;
        }

        $this->userModel->updatePassword($email, $newPassword);

        echo "A jelszó sikeresen megváltozott.";
    }
}
```

---

## 🔍 Kódmagyarázat

### `showRequestForm()`
Megjeleníti az e-mail bekérő űrlapot.

### `sendResetCode()`
- Lekérdezi a felhasználót.
- Ha nincs ilyen → **ugyanazt a választ adja**, hogy ne lehessen e-mail címeket találgatni.
- OTP kódot generál.
- Eltárolja az OTP-t.
- E-mailben elküldi a kódot.
- Megjeleníti a kód + új jelszó űrlapot.

### `resetPassword()`
- Ellenőrzi az OTP-t.
- Ha helyes → bcrypt‑tel új jelszót ment.
- Ha hibás → hibaüzenet.

---

# 🧩 2. Model – User.php (kiegészítés)

```php
public function storeResetOtp($email, $otp)
{
    $stmt = $this->db->prepare("
        UPDATE users
        SET otp_code = ?, otp_expires_at = ?
        WHERE email = ?
    ");

    return $stmt->execute([
        $otp['code'],
        $otp['expires_at'],
        $email
    ]);
}

public function updatePassword($email, $newPassword)
{
    $stmt = $this->db->prepare("
        UPDATE users
        SET password_hash = ?, otp_code = NULL, otp_expires_at = NULL
        WHERE email = ?
    ");

    return $stmt->execute([
        password_hash($newPassword, PASSWORD_BCRYPT),
        $email
    ]);
}
```

---

## 🔍 Kódmagyarázat

### `storeResetOtp()`
- A jelszó‑visszaállítás OTP kódját tárolja.
- Ugyanazt a mezőt használjuk, mint a regisztrációnál → egyszerűbb adatmodell.

### `updatePassword()`
- Bcrypt‑tel új jelszót ment.
- Az OTP mezőket törli → nem használható újra.

---

# 🧩 3. View – password_reset_request.php

```php
<form method="POST" action="/index.php?action=sendResetCode">
    <label>Email cím:</label>
    <input type="email" name="email" required>

    <button type="submit">Kód küldése</button>
</form>
```

### 🔍 Kódmagyarázat

- A felhasználó megadja az e-mail címét.
- A rendszer nem árulja el, hogy létezik-e ilyen fiók.

---

# 🧩 4. View – password_reset_verify.php

```php
<form method="POST" action="/index.php?action=resetPassword">
    <label>Email cím:</label>
    <input type="email" name="email" required>

    <label>Megerősítő kód:</label>
    <input type="text" name="otp" required>

    <label>Új jelszó:</label>
    <input type="password" name="password" required>

    <button type="submit">Jelszó módosítása</button>
</form>
```

### 🔍 Kódmagyarázat

- A felhasználó megadja:
    - e-mail címét,
    - az OTP kódot,
    - az új jelszót.
- A controller ellenőrzi és frissíti a jelszót.

---

# 🧩 5. index.php (kiegészítve)

```php
require 'app/Controllers/PasswordResetController.php';

$reset = new PasswordResetController($db);

switch ($action) {
    ...
    case 'passwordResetRequest':
        $reset->showRequestForm();
        break;
    case 'sendResetCode':
        $reset->sendResetCode();
        break;
    case 'resetPassword':
        $reset->resetPassword();
        break;
}
```

---

# 🎓 Összefoglalás

A jelszó‑visszaállítás modul:

- illeszkedik a regisztráció/login/logout MVC struktúrájába,
- OTP‑s megerősítést használ,
- biztonságos (bcrypt, OTP lejárat, e-mail cím nem felfedhető),
- tiszta, oktatási célú PHP kóddal készült,
- könnyen bővíthető (pl. tokenes reset linkkel).
