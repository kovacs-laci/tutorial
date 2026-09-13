---
id: rest-api-planning
slug: /rest-api-planning
title: "Tervezés"
---
# REST API alkalmazás – Tervezés

## Miért fontos a tervezés?
A REST API fejlesztésének első lépése a **tervezés**.  
Ez biztosítja, hogy:
- **Átlátható legyen a rendszer**: mindenki tudja, milyen táblák és végpontok lesznek.
- **Egységes legyen a kommunikáció**: a kliens és a szerver ugyanazt az interfészt használja.
- **Biztonságos legyen az adatkezelés**: előre meghatározzuk, mely műveletekhez kell hitelesítés.
- **Skálázható legyen a rendszer**: később könnyen bővíthető új funkciókkal.

---

## Adatbázis struktúra

### users
- `id` – egyedi azonosító
- `name` – felhasználó neve
- `email` – felhasználó e-mail címe
- `password` – jelszó (hash-elve tárolva)
- `token` – bejelentkezés után generált azonosító

👉 A `users` tábla biztosítja a tokenes hitelesítést.

### counties
- `id` – egyedi azonosító
- `name` – megye neve

👉 A `counties` tábla tartalmazza a megyék listáját.

### cities
- `id` – egyedi azonosító
- `county_id` – hivatkozás a `counties.id` mezőre
- `name` – város neve

👉 A `cities` tábla tartalmazza a városokat, és kapcsolódik a megyékhez.

---

## REST API végpontok

| HTTP metódus | Végpont | Leírás | Hitelesítés | Sikeres státusz | Válasz példa |
|---|---|---|---|---|---|
| GET | `/counties` | Megyék listázása | Nem | `200 OK` | `{ "counties": [...] }` |
| GET | `/counties/{id}` | Megye lekérése | Nem | `200 OK` | `{ "county": { ... } }` |
| POST | `/counties` | Új megye létrehozása | Igen | `201 Created` | `{ "county": { ... } }` |
| PUT | `/counties/{id}` | Megye módosítása | Igen | `200 OK` | `{ "county": { ... } }` |
| DELETE | `/counties/{id}` | Megye törlése | Igen | `204 No Content` | nincs választest |
| GET | `/cities` | Városok listázása | Nem | `200 OK` | `{ "cities": [...] }` |
| GET | `/cities/{id}` | Város lekérése | Nem | `200 OK` | `{ "city": { ... } }` |
| POST | `/cities` | Új város létrehozása | Igen | `201 Created` | `{ "city": { ... } }` |
| PUT | `/cities/{id}` | Város módosítása | Igen | `200 OK` | `{ "city": { ... } }` |
| DELETE | `/cities/{id}` | Város törlése | Igen | `204 No Content` | nincs választest |
| GET | `/counties/{countyId}/cities` | Adott megye városainak listázása | Nem | `200 OK` | `{ "cities": [...] }` |
| POST | `/users/login` | Bejelentkezés | Nem | `200 OK` | `{ "token": "...", "user": { ... } }` |
| POST | `/users/logout` | Kijelentkezés | Igen | `204 No Content` | nincs választest |
| POST | `/users` | Új felhasználó létrehozása | Nem | `201 Created` | `{ "id": 1, "message": "Created" }` |
| GET | `/users` | Felhasználók listázása | Igen | `200 OK` | `{ "users": [...] }` |
| GET | `/users/{id}` | Felhasználó lekérése | Igen | `200 OK` | `{ "user": { ... } }` |
| PUT | `/users/{id}` | Felhasználó módosítása | Igen | `200 OK` | `{ "user": { ... } }` |
| DELETE | `/users/{id}` | Felhasználó törlése | Igen | `204 No Content` | nincs választest |
Opcionális
| POST | `/counties/{countyId}/cities` | Új város létrehozása adott megyében | Igen | `201 Created` | `{ "city": { ... } }` |
| PUT | `/counties/{countyId}/cities/{id}` | Város módosítása adott megyében | Igen | `200 OK` | `{ "city": { ... } }` |
| DELETE | `/counties/{countyId}/cities/{id}` | Város törlése adott megyében | Igen | `204 No Content` | nincs választest |

Ha a kért erőforrás nem található, a végpont `404 Not Found` választ ad. Hibás vagy hiányos bemenet esetén `400 Bad Request`, hitelesítési hiba esetén pedig `401 Unauthorized` vagy jogosultsági hiba esetén `403 Forbidden` használható.

---

## Összefoglalás
A tervezés során:
- Meghatároztuk az adatbázis táblákat és azok szerepét.
- Összeállítottuk a REST API végpontokat, beleértve a megyékhez kapcsolódó városok kezelését.
- Jeleztük, mely műveletekhez szükséges hitelesítés.
