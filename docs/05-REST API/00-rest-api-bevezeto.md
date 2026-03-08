---
id: rest-api-bevezeto
slug: /rest-api/intro
title: "Bevezető"
---
# Bevezető a REST API‑hoz

## Mi az a REST API?
- A **REST** (*Representational State Transfer*) egy architekturális stílus, amelyet webes szolgáltatások készítésére használnak.
- Az **API** (*Application Programming Interface*) lehetővé teszi, hogy különböző alkalmazások kommunikáljanak egymással.
- A REST API tehát egy **webes interfész**, amelyen keresztül kliens alkalmazások (pl. böngésző, mobil app, másik szerver) elérhetik és módosíthatják az adatokat.

---

## Mire jó?
- **Adatok elérése és módosítása**: pl. megyék és városok listázása, új rekord létrehozása, meglévő frissítése vagy törlése.
- **Integráció**: frontend és backend összekapcsolása, vagy különböző rendszerek közötti kommunikáció.
- **Skálázhatóság**: ugyanazt az API‑t több kliens is használhatja (web, mobil, IoT).
- **Egységes interfész**: a kliensnek nem kell tudnia, hogyan tárolja a szerver az adatokat, csak az API végpontokat kell hívnia.

---

## Hogyan működik?
- A kliens **HTTP kéréseket** küld (GET, POST, PUT, DELETE).
- A szerver feldolgozza a kérést, és **JSON formátumban** választ ad.
- Példa:
    - `GET /counties` → visszaadja az összes megyét.
    - `POST /cities` → létrehoz egy új várost.

---

## Miért JSON?
- **Egyszerű**: könnyen olvasható és írható.
- **Szabványos**: minden modern nyelv támogatja.
- **Könnyen feldolgozható**: kliens oldalon JavaScript natívan kezeli.
- Példa JSON válasz:
  ```json
  {
    "id": 1,
    "name": "Budapest"
  }
  ```

---

## Miért fontos a biztonság?
- **Hitelesítés**: csak jogosult felhasználók módosíthatják az adatokat (pl. token).
- **Adatvédelem**: megakadályozza, hogy illetéktelenek hozzáférjenek az érzékeny információkhoz.
- **Integritás**: biztosítja, hogy az adatok ne sérüljenek vagy változzanak meg jogosulatlanul.
- **Megoldások**:
    - Token alapú autentikáció (Bearer token).
    - HTTPS használata a kommunikáció titkosítására.
    - Input validáció a SQL injection és XSS támadások ellen.

## Szabványosság
- A REST API‑k általában a **HTTP szabványos metódusait** használják:
    - `GET` → lekérés
    - `POST` → létrehozás
    - `PUT/PATCH` → módosítás
    - `DELETE` → törlés
- Ez segít, hogy a kliens fejlesztők könnyen megértsék az API működését.

## Verziózás
- Az API‑k idővel változnak.
- Jó gyakorlat: az URL‑ben vagy a headerben jelölni a verziót (pl. `/api/v1/products`).
- Így a régi kliensek továbbra is működhetnek, miközben az új funkciók is elérhetők.

## Hibakezelés
- Fontos, hogy az API **értelmes hibaválaszokat** adjon.
- Példa:
  ```json
  { "error": "Not Found", "status": 404 }
  ```
- Ez segít a kliensnek megérteni, mi történt, és hogyan reagáljon.

## Dokumentáció
- Egy jó API‑hoz mindig van **dokumentáció** (pl. Swagger/OpenAPI).
- Ez segít a fejlesztőknek, hogy tudják, milyen végpontok érhetők el, milyen paraméterekkel és válaszokkal.

## Teljesítmény és cache
- A REST API‑k gyakran nagy mennyiségű adatot szolgáltatnak.
- Érdemes cache‑t használni (pl. `ETag`, `Last-Modified` header), hogy ne kelljen minden kérést újra feldolgozni.

---

## Összefoglalás
A REST API egy **modern, szabványos módszer** arra, hogy alkalmazások kommunikáljanak egymással.  
Az adatokhoz **HTTP kéréseken** keresztül férünk hozzá, a válaszokat **JSON formátumban** kapjuk.  
A biztonság kulcsfontosságú: tokenekkel és titkosítással védjük az adatokat.  
Emellett fontos a **szabványosság, verziózás, hibakezelés, dokumentáció és teljesítmény optimalizálás**, hogy az API hosszú távon is megbízható és jól használható legyen.
