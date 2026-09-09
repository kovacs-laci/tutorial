---
id: password-reset-example
slug: /php/autentikacio/jelszo-visszaallitas
title: "Jelszó-visszaállítás"
---

# Jelszó-visszaállítás

A jelszó-visszaállításnál a rendszer ne árulja el, hogy az e-mail-címhez tartozik-e fiók. A felhasználó minden esetben ugyanazt az általános választ kapja.

## Biztonságos folyamat

1. A felhasználó megadja az e-mail-címét.
2. A rendszer időkorlátos, egyszer használható tokenhez kötött üzenetet küld.
3. A token ellenőrzése után a felhasználó új jelszót adhat meg.
4. Az új jelszót `password_hash()` segítségével mentjük.
5. A tokent azonnal érvénytelenítjük.

```php
$token = bin2hex(random_bytes(32));
$expiresAt = new DateTimeImmutable('+15 minutes');

$hash = hash('sha256', $token);
// A hash-t, az e-mail-címet és a lejáratot adatbázisban tároljuk.
```

A token nyers értéke csak az e-mailben szerepeljen; az adatbázisban annak hash-ét tároljuk. Éles rendszerben rate limiting és CSRF-védelem is szükséges.
