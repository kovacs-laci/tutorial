---
id: webbiztonsag
slug: /php/teszteles-es-biztonsag/webbiztonsag
title: "PHP webbiztonság"
---

# PHP webbiztonság

A biztonság nem egyetlen függvény, hanem több réteg együttese.

## Kimeneti escaping és SQL

A prepared statement az SQL injection ellen véd. A HTML-kimenetet ettől még escape-elni kell:

```php
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$stmt = $pdo->prepare('SELECT name FROM students WHERE id = :id');
$stmt->execute(['id' => $id]);
$student = $stmt->fetch(PDO::FETCH_ASSOC);

echo e($student['name']);
```

## CSRF-védelem

Állapotmódosító űrlapnál a szerver sessionben tárolt, véletlen tokent ellenőriz. A POST önmagában nem jelent biztonságot.

```php
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    exit('Érvénytelen kérés.');
}
```

## Session és autentikáció

Sikeres bejelentkezés után használjunk `session_regenerate_id(true)`-t. A cookie legyen `HttpOnly`, HTTPS esetén `Secure`, és megfelelő `SameSite` értékű.

A logout legyen POST-kérés, a jelszavakat pedig mindig `password_hash()` és `password_verify()` kezelje. A login- és OTP-próbálkozásokat korlátozni kell.
