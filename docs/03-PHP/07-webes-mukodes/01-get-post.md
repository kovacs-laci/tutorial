---
id: get-post
slug: /php/webes-mukodes/get-post
title: "GET és POST kérések"
---

# GET és POST kérések

A PHP-ban az űrlapokból érkező adatokat a **GET** és **POST** HTTP metódusokkal tudjuk fogadni.  
Mindkettő adatot küld a szerver felé, de különböző módon.

---

# GET metódus

A GET a címsorban küldi az adatokat:

```
http://localhost/oldal.php?nev=Anna&kor=17
```

Az adatokat a `$_GET` szuperglobális tömb tartalmazza.

```php
echo $_GET["nev"];
echo $_GET["kor"];
```

## Egyszerű GET űrlap

```html
<form method="GET" action="feldolgozas.php">
    <input type="text" name="nev" placeholder="Név">
    <button type="submit">Küldés</button>
</form>
```

---

# POST metódus

A POST az adatokat **nem** a címsorban küldi, hanem a kérés törzsében. Ez nem titkosítás: érzékeny adatokhoz HTTPS, szerveroldali validáció és megfelelő CSRF-védelem is szükséges.

```php
echo $_POST["nev"];
```

## Egyszerű POST űrlap

```html
<form method="POST" action="feldolgozas.php">
    <input type="text" name="nev" placeholder="Név">
    <input type="password" name="jelszo" placeholder="Jelszó">
    <button type="submit">Belépés</button>
</form>
```

---

# GET vs POST

| Tulajdonság | GET | POST |
|------------|------|-------|
| Adat helye | URL-ben | Kérés törzsében |
| Látható az URL-ben | Igen | Nem |
| Maximális hossz | Van | Gyakorlatilag nincs |
| Mire jó | Keresés, szűrés | Bejelentkezés, űrlapok |

---

# Gyakorlófeladatok

1. Készíts GET űrlapot, amely bekéri a nevedet és kiírja: „Szia, NÉV!”.
2. Készíts POST űrlapot, amely bekéri a felhasználónevet és jelszót.
3. Készíts űrlapot, amely két számot kér be, és kiírja az összegüket.

---

## Megjegyzés

- Érdemes utánanézni a HTTP metódusok teljes listájának (PUT, DELETE, PATCH).
- Lásd még: URL‑kódolás, query string működése.
