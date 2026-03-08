---
id: rest-api-repositories
slug: /rest-api-repositories
title: "Repository réteg"
---

# REST API Repository réteg

Ebben a fejezetben bemutatjuk, hogyan építjük fel a Repository réteget.  
Az **interface** előírja a CRUD metódusokat, a **BaseRepository** központilag implementálja őket, a konkrét repositoryk pedig a táblákhoz igazodnak.

---

## 1. RepositoryInterface

```php
<?php
namespace App\Interfaces;

interface RepositoryInterface
{
    public function create(array $data): ?int;
    public function find(int $id): array;
    public function getAll(): array;
    public function update(int $id, array $data);
    public function delete(int $id);
}
```

👉 **Magyarázat**:
- Ez egy szerződés: minden repository osztálynak kötelező megvalósítani a CRUD metódusokat.
- Így a controllerek biztosak lehetnek benne, hogy bármely repository ugyanazt az API‑t kínálja.

---

## 2. BaseRepository

```php
<?php
namespace App\Repositories;

use App\Database\DatabaseConnection;
use App\Interfaces\RepositoryInterface;
use Exception;

abstract class BaseRepository extends DatabaseConnection implements RepositoryInterface
{
    public string $tableName = '';

    public function __construct(
        $host = self::HOST,
        $user = self::USER,
        $password = self::PASSWORD,
        $database = self::DATABASE
    ) {
        parent::__construct($host, $user, $password, $database);

        if (empty($this->tableName)) {
            throw new Exception("Repository error: tableName must be defined in child class.");
        }
    }

    public function create(array $data): ?int
    {
        $fields = implode(',', array_keys($data));
        $values = implode(',', array_map(fn($v) => "'$v'", $data));

        $sql = sprintf("INSERT INTO `%s` (%s) VALUES (%s)", $this->tableName, $fields, $values);
        $this->mysqli->query($sql);

        $lastInserted = $this->mysqli->query("SELECT LAST_INSERT_ID() id;")->fetch_assoc();
        return $lastInserted['id'] ?? null;
    }

    public function find(int $id): array
    {
        $query = $this->select() . "WHERE id = $id";
        return $this->mysqli->query($query)->fetch_assoc() ?? [];
    }

    public function getAll(): array
    {
        $query = $this->select() . "ORDER BY name";
        return $this->mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }

    public function update(int $id, array $data)
    {
        $set = implode(', ', array_map(fn($f, $v) => "$f = '$v'", array_keys($data), $data));
        $query = sprintf("UPDATE `%s` SET %s WHERE id = %d", $this->tableName, $set, $id);
        $this->mysqli->query($query);

        return $this->find($id);
    }

    public function delete(int $id)
    {
        $query = sprintf("DELETE FROM `%s` WHERE id = %d", $this->tableName, $id);
        return $this->mysqli->query($query);
    }

    protected function select(): string
    {
        return "SELECT * FROM `{$this->tableName}` ";
    }
}
```

👉 **Magyarázat**:
- A konstruktor ellenőrzi, hogy a gyerek osztály megadta‑e a `tableName` értékét. Ha nem, hibát dob.
- A CRUD metódusok központilag implementálva vannak.
- A gyerek osztályoknak csak a `tableName`‑et kell beállítaniuk.

---

## 3. CountyRepository

```php
<?php
namespace App\Repositories;

class CountyRepository extends BaseRepository
{
    public string $tableName = 'counties';
}
```

👉 **Magyarázat**:
- A `CountyRepository` csak beállítja a `tableName` értékét.
- Az összes CRUD metódust örökli a `BaseRepository`‑től.
- Így a controllerek egyszerűen használhatják:
  ```php
  $repo = new CountyRepository();
  $repo->create(['name' => 'Pest']);
  ```

---

## 4. CityRepository

```php
<?php
namespace App\Repositories;

class CityRepository extends BaseRepository
{
    public string $tableName = 'cities';

    public function create(array $data): ?int
    {
        if (!isset($data['county_id'])) {
            throw new \Exception("CityRepository error: county_id is required.");
        }

        return parent::create($data);
    }

    public function getByCounty(int $countyId): array
    {
        $query = $this->select() . "WHERE county_id = $countyId ORDER BY name";
        return $this->mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }
}
```

👉 **Magyarázat**:
- A `CityRepository` örökli a CRUD metódusokat, de a `create()` metódust kiegészíti: kötelező a `county_id`.
- Új metódust ad hozzá: `getByCounty()`, amely egy adott megye városait listázza.
- Így a városok kezelése összekapcsolódik a megyékkel.

---
## 5. UserRepository

```php
<?php
namespace App\Repositories;

use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    public string $tableName = 'users';

    /**
     * Új felhasználó létrehozása
     * - Jelszó hash-elése
     * - Email egyediség ellenőrzése
     */
    public function create(array $data): ?int
    {
        if (!isset($data['email']) || !isset($data['password'])) {
            throw new \Exception("UserRepository error: email és password kötelező.");
        }

        // Jelszó biztonságos tárolása
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        return parent::create($data);
    }

    /**
     * Felhasználó keresése email alapján
     * - Login során használjuk
     */
    public function findByEmail(string $email): ?array
    {
        $query = $this->select() . "WHERE email = '$email'";
        return $this->mysqli->query($query)->fetch_assoc() ?? null;
    }

    /**
     * Token létrehozása és mentése
     * - Login után generáljuk
     */
    public function createToken(int $userId): string
    {
        // Biztonságos véletlen token generálása
        $rawToken = bin2hex(random_bytes(32)); // biztonságos, 64 karakter hosszú hexadecimális token.
    
        // a nyers tokent (`$rawToken`) tároljuk az adatbázisban, így összehasonlításkor egyszerűbb
        $query = sprintf(
            "UPDATE `%s` SET token = '%s' WHERE id = %d",
            $this->tableName,
            $rawToken,
            $userId
        );
        $this->mysqli->query($query);
    
        // a kliensnek `"Bearer <token>"` formátumban adjuk vissza,
        // így azonnal használható az `Authorization` headerben.
        return "Bearer " . $rawToken;
    }

    /**
     * Token érvénytelenítése
     * - Logout során használjuk
     */
    public function invalidateToken(string $token): bool
    {
        $query = sprintf("UPDATE `%s` SET token = NULL WHERE token = '%s'", $this->tableName, $token);
        return $this->mysqli->query($query);
    }

    /**
     * Token alapján felhasználó keresése
     * - Védett végpontoknál használjuk
     */
    public function findByToken(string $token): ?array
    {
        $query = $this->select() . "WHERE token = '$token'";
        return $this->mysqli->query($query)->fetch_assoc() ?? null;
    }
}
```

---

👉 **Magyarázat**:

- **create()**: új felhasználó létrehozásakor kötelező az email és jelszó. A jelszót mindig hash-eljük.
- **findByEmail()**: login során ellenőrizzük, hogy létezik-e a felhasználó.
- **createToken()**: sikeres login után generálunk egy véletlen tokent, amit az adatbázisban eltárolunk.
- **invalidateToken()**: logout során töröljük a tokent.
- **findByToken()**: védett végpontoknál ellenőrizzük, hogy a kliens által küldött token érvényes-e.


---

## Összefoglalás

- Az **interface** előírja a CRUD metódusokat.
- A **BaseRepository** központilag implementálja őket, és hibát dob, ha nincs megadva `tableName`.
- A **CountyRepository** egyszerű, csak a `counties` táblát kezeli.
- A **CityRepository** speciális: kötelező a `county_id` létrehozáskor, és van `getByCounty()` metódusa.
- A **UserRepository** a `users` táblát kezeli, és a CRUD metódusok mellett kiegészül autentikációs funkciókkal:
  - jelszó hash-elése létrehozáskor,
  - felhasználó keresése email alapján,
  - token generálása login után,
  - token érvénytelenítése logout során,
  - token alapján felhasználó keresése védett végpontokhoz.

✨ Így láthatjuk, hogyan lehet az interface + abstract class mintát használni, és hogyan lehet a gyerek osztályokat testre szabni a táblák igényeihez.
