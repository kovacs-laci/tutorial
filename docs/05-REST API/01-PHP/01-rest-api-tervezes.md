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

| HTTP metódus | Végpont                          | Leírás                               | Hitelesítés | Válasz példa |
|--------------|----------------------------------|--------------------------------------|-------------|--------------|
| POST         | /users/login                     | Bejelentkezés                        | Nem         | \{ "token": "...", "user": \{...\} \} |
| POST         | /users/logout                    | Kijelentkezés                        | Igen        | \{ "message": "Logged out" \} |
| GET          | /counties                        | Megyék listázása                     | Nem         | \{ "counties": [...] \} |
| GET          | /counties/\{id\}                   | Megye lekérése                       | Nem         | \{ "county": \{...\} \} |
| POST         | /counties                        | Új megye létrehozása                 | Igen        | \{ "message": "Created", "county": \{...\} \} |
| PUT          | /counties/\{id\}                   | Megye módosítása                     | Igen        | \{ "message": "Updated", "county": \{...\} \} |
| DELETE       | /counties/\{id\}                   | Megye törlése                        | Igen        | \{ "message": "Deleted" \} |
| GET          | /cities                          | Városok listázása                    | Nem         | \{ "cities": [...] \} |
| GET          | /cities/\{id\}                     | Város lekérése                       | Nem         | \{ "city": \{...\} \} |
| POST         | /cities                          | Új város létrehozása                 | Igen        | \{ "message": "Created", "city": \{...\} \} |
| PUT          | /cities/\{id\}                     | Város módosítása                     | Igen        | \{ "message": "Updated", "city": \{...\} \} |
| DELETE       | /cities/\{id\}                     | Város törlése                        | Igen        | \{ "message": "Deleted" \} |
| GET          | /counties/\{county\}/cities        | Adott megye városainak listázása     | Nem         | \{ "cities": [...] \} |
| POST         | /counties/\{county\}/cities        | Új város létrehozása adott megyében  | Igen        | \{ "message": "Created", "city": \{...\} \} |
| PUT          | /counties/\{county\}/cities/\{id\}   | Város módosítása adott megyében      | Igen        | \{ "message": "Updated", "city": \{...\} \} |
| DELETE       | /counties/\{county\}/cities/\{id\}   | Város törlése adott megyében         | Igen        | \{ "message": "Deleted" \} |
| POST         | /users/login        | Bejelentkezés              | Nem         | \{ "token": "...", "user": \{...\} \} |
| POST         | /users/logout       | Kijelentkezés              | Igen        | \{ "message": "Logged out" \} |
| POST         | /users              | Új felhasználó létrehozása | Nem         | \{ "id": 1, "message": "Created" \} |
| GET          | /users              | Felhasználók listázása     | Igen        | \{ "users": [...] \} |
| GET          | /users/\{id\}         | Felhasználó lekérése       | Igen        | \{ "user": \{...\} \} |
| PUT          | /users/\{id\}         | Felhasználó módosítása     | Igen        | \{ "message": "Updated", "user": \{...\} \} |
| DELETE       | /users/\{id\}         | Felhasználó törlése        | Igen        | \{ "message": "Deleted" \} |

---

## Összefoglalás
A tervezés során:
- Meghatároztuk az adatbázis táblákat és azok szerepét.
- Összeállítottuk a REST API végpontokat, beleértve a megyékhez kapcsolódó városok kezelését.
- Jeleztük, mely műveletekhez szükséges hitelesítés.
