---
id: login-bevezeto
title: "Regisztráció, bejelentkezés és autentikáció alapjai"
slug: /login-bevezeto
---

# Regisztráció, bejelentkezés és autentikáció alapjai

A webalkalmazások működésének alapja, hogy a rendszer tudja, ki használja az adott funkciókat.  
A felhasználó azonosításának első lépése a **regisztráció**, amelyet a **bejelentkezés** és az **autentikáció** követ.  
A jól megtervezett folyamatok biztosítják az adatok védelmét, a jogosultságok helyes kezelését és a rendszer megbízhatóságát.

---

## Regisztrációs folyamatok

A regisztráció célja egy egyedi felhasználói fiók létrehozása.  
A regisztráció módja függ a rendszer típusától, a biztonsági követelményektől és a felhasználói kör összetételétől.

### 1. Felhasználó által kezdeményezett regisztráció

Nyilvános vagy félig nyilvános rendszerekben a leggyakoribb.

**Folyamat:**

1. A felhasználó megadja az alapadatokat
    - e‑mail cím
    - jelszó
    - név vagy felhasználónév

2. A rendszer ellenőrzi az adatok formátumát
    - e‑mail validáció
    - jelszó erősség vizsgálata

3. A rendszer létrehozza a felhasználói fiókot
    - a jelszó hash‑elve kerül tárolásra
    - a felhasználó alapértelmezett szerepkört kap (pl. „user”)

4. E-mailes megerősítés (opcionális, de ajánlott)
    - aktiváló link
    - egyszer használatos token

---

### 1.1 Aktiváló linkes megerősítés

A rendszer egy egyedi URL‑t küld a felhasználónak.  
A link tartalmaz egy egyszer használatos tokent, amely aktiválja a fiókot.

**Előnyök:**
- kényelmes, egy kattintás
- klasszikus webes regisztrációkban bevált

**Hátrányok:**
- mobilon kényelmetlenebb lehet
- a link lejárhat vagy elveszhet

---

### 1.2 Kódos (OTP - One Time Password) e‑mail megerősítés

A rendszer egy rövid, egyszer használatos kódot küld a felhasználó e‑mail címére.

**Folyamat:**

1. A rendszer létrehozza a fiókot **inaktív** állapotban.
2. Generál egy 4–8 számjegyű kódot (OTP).
3. A kódot e‑mailben elküldi.
4. A felhasználó a weboldalon beírja a kódot.
5. A rendszer ellenőrzi:
    - helyes‑e a kód
    - nem járt‑e le
    - nem lett‑e már felhasználva
6. A fiók aktívvá válik.

**Előnyök:**
- gyors, mobilbarát
- egyszerű implementáció
- rövid érvényesség → biztonságos

**Hátrányok:**
- a felhasználónak be kell írnia a kódot
- próbálkozások számát korlátozni kell

---

### 2. Adminisztrátor által kezdeményezett regisztráció

Zárt rendszerekben gyakori (vállalat, iskola, belső adminfelület).

**Folyamat:**

1. Az admin létrehozza a felhasználót
    - név
    - e‑mail
    - szerepkör

2. A rendszer generál egy ideiglenes jelszót vagy aktiváló linket.
3. A felhasználó első bejelentkezéskor új jelszót állít be.

**Előnyök:**
- kontrollált felhasználói kör
- előre kiosztható szerepkörök

**Hátrányok:**
- adminisztrátori időráfordítás

---

### 3. Külső szolgáltatón keresztüli regisztráció (OAuth2 / OpenID Connect)

A felhasználó nem hoz létre külön jelszót, hanem külső szolgáltatóval azonosítja magát:

- Google
- Microsoft
- GitHub
- Facebook

**Előnyök:**
- nincs jelszókezelés
- gyors és kényelmes
- magas biztonság

**Hátrányok:**
- külső szolgáltató elérhetőségétől függ
- nem mindenki szeret külső fiókot használni

---

## A regisztráció és bejelentkezés kapcsolata

A regisztráció létrehozza a fiókot.  
A bejelentkezés ezt a fiókot használja az azonosításhoz.

A folyamat logikája:

- regisztráció → fiók létrejön
- e‑mail megerősítés → fiók aktiválódik
- bejelentkezés → azonosítás
- autentikáció → jelszó vagy token ellenőrzése
- autorizáció → szerepkörök és jogosultságok érvényesítése

---

## A bejelentkezés folyamata

A bejelentkezés célja, hogy a rendszer megállapítsa, ki használja az alkalmazást.

1. **Azonosítás** – e‑mail vagy felhasználónév megadása
2. **Hitelesítés (autentikáció)** – jelszó vagy más módszer ellenőrzése
3. **Jogosultságkezelés (autorizáció)** – szerepkörök alapján meghatározott hozzáférések

---

## Autentikációs módszerek

### 1. Jelszavas autentikáció

A legelterjedtebb forma.

**Jó megoldás:**
- bcrypt, Argon2, PBKDF2
- minimum 12–14 karakter
- sózás
- brute-force elleni védelem

**Rossz megoldás:**
- jelszó tárolása plain textben
- MD5 vagy SHA1
- túl rövid jelszó

---

### 2. Kétfaktoros autentikáció (2FA)

A felhasználó két különböző módon igazolja magát:

- jelszó + SMS kód
- jelszó + authenticator app
- jelszó + e-mail kód

---

### 3. Token alapú autentikáció (JWT - JSON Web Token, API - Application Programming Interface tokenek)

A szerver bejelentkezés után tokent ad vissza, amelyet a kliens minden kérésnél elküld.

**Előnyök:**
- gyors
- stateless
- API‑khoz ideális

**Hátrányok:**
- token ellopása veszélyes
- lejárati időt kezelni kell

---

### 4. OAuth2 / OpenID Connect

Külső szolgáltató hitelesíti a felhasználót.  
A rendszer csak a szükséges adatokat kapja meg.

---

## Szerepkörök és jogosultságok

A szerepkörök határozzák meg, hogy a felhasználó milyen műveleteket végezhet.

**Tipikus szerepkörök:**

- **Admin** – teljes hozzáférés
- **Szerkesztő** – tartalom módosítása
- **Olvasó** – csak megtekintés
- **Vendég** – minimális jogosultság

**Jogosultságkezelési modellek:**

- RBAC – Role-Based Access Control
- PBAC – Permission-Based Access Control
- ABAC – Attribute-Based Access Control

---

## Gyenge és erős megoldások összehasonlítása

| Megoldás típusa | Leírás | Kockázat | Ajánlott? |
|-----------------|--------|----------|-----------|
| Plain text jelszó | Jelszó titkosítás nélkül | Kritikus | ❌ |
| MD5/SHA1 hash | Gyenge hash algoritmus | Magas | ❌ |
| bcrypt/Argon2 | Modern, biztonságos hash | Alacsony | ✔️ |
| Token localStorage-ben | XSS esetén ellopható | Közepes | ⚠️ |
| Token HttpOnly cookie-ban | XSS ellen védett | Alacsony | ✔️ |
| 2FA használata | Második védelmi réteg | Nagyon alacsony | ✔️ |

---

## Összefoglalás

- A regisztráció hozza létre a felhasználói fiókot.
- A regisztráció történhet felhasználó által, admin által vagy külső szolgáltatóval.
- Az e‑mail megerősítés történhet aktiváló linkkel vagy kódos (OTP) módszerrel.
- A bejelentkezés azonosítja a felhasználót, az autentikáció ellenőrzi az adatait.
- A szerepkörök és jogosultságok határozzák meg, ki mit tehet a rendszerben.
- A biztonságos megoldások hosszú távon stabil és megbízható rendszert eredményeznek.
