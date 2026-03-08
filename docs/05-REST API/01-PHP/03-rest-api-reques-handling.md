---
id: rest-api-request-handling
slug: /rest-api-request-handling
title: "HTML kérések kezelése"
---

# REST API HTML kérések kezelése

Ebben a fejezetben bemutatjuk a `Request` osztályt, amely a REST API bejövő kéréseit dolgozza fel.  
Lépésről lépésre haladunk: először az elfogadott route‑ok definiálása, majd a `handle()` metódus, végül a segédfüggvények.

---

## 1. Elfogadott route-ok

```php
<?php

namespace App\Html;

use App\Repositories\BaseRepository;
use App\Repositories\CountyRepository;
use App\Repositories\CityRepository;

class Request
{
    static array $acceptedRoutes = [
        'POST' => [
            '/users/login',
            '/users/logout',
            '/users',                
            '/counties',
            '/cities',
            '/counties/{county}/cities'
        ],
        'GET' => [
            '/users',                
            '/users/{id}',           
            '/counties',
            '/counties/{id}',
            '/cities',
            '/cities/{id}',
            '/counties/{county}/cities'
        ],
        'PUT' => [
            '/users/{id}',           
            '/counties/{id}',
            '/cities/{id}',
            '/counties/{county}/cities/{id}'
        ],
        'DELETE' => [
            '/users/{id}',           
            '/counties/{id}',
            '/cities/{id}',
            '/counties/{county}/cities/{id}'
        ],
    ];

```

### Magyarázat
- Az `$acceptedRoutes` tömb tartalmazza az összes engedélyezett végpontot.
- A route‑ok HTTP metódusok szerint vannak csoportosítva (`GET`, `POST`, `PUT`, `DELETE`).
- A `{id}` és `{county}` jelölések paraméterhelyettesítők, amelyek bármilyen értéket elfogadnak.
- Így a rendszer tudja, mely kérések érvényesek, és melyeket kell elutasítani.

---

## 2. A handle() metódus

```php
    static function handle()
    {
        // Lekérjük a HTTP metódust és az URI-t
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

        // Ellenőrizzük, hogy a kérés engedélyezett route-ra mutat-e
        if (!self::isRouteAllowed($requestMethod, $requestUri, self::$acceptedRoutes)) {
            return Response::response(['error' => 'Route not allowed'], 400);
        }

        // Feldolgozzuk az URI-t és az adatokat
        $requestData = self::getRequestData();
        $arrUri = self::requestUriToArray($_SERVER['REQUEST_URI']);
        $resourceName = self::getResourceName($arrUri);
        $resourceId = self::getResourceId($arrUri);
        $childResourceName = self::getChildResourceName($arrUri);

        // A metódus alapján meghívjuk a megfelelő függvényt
        switch ($requestMethod){
            case "POST":
                self::postRequest($resourceName, $requestData);
                break;
            case "PUT":
                self::putRequest($resourceName, $resourceId, $requestData);
                break;
            case "GET":
                self::getRequest($resourceName, $resourceId, $childResourceName);
                break;
            case "DELETE":
                self::deleteRequest($resourceName, $resourceId);
                break;
            default:
                echo 'Unknown request type';
                break;
        }
    }
```

### Magyarázat
- **`$_SERVER['REQUEST_METHOD']`**: lekéri a HTTP metódust (GET, POST, PUT, DELETE).
- **`$_SERVER['REQUEST_URI']`**: lekéri az aktuális URI‑t.
- **`isRouteAllowed()`**: ellenőrzi, hogy az URI szerepel‑e az `$acceptedRoutes` tömbben.
- Ha nem engedélyezett, 400‑as hibát ad vissza.
- Ha engedélyezett, feldarabolja az URI‑t (`requestUriToArray`) és meghívja a megfelelő CRUD metódust.
- A `switch` szerkezet választja ki, melyik metódus futjon a HTTP kérés típusa alapján.

---

## 3. Segédfüggvények

### getRequestData()

```php
    private static function getRequestData(): ?array
    {
        return json_decode(file_get_contents("php://input"), true);
    }
```

👉 Ez a függvény beolvassa a kliens által küldött JSON adatot (POST/PUT kéréseknél).

---

### requestUriToArray()

```php
    private static function requestUriToArray($uri): array
    {
        $arrUri = explode("/", trim($uri, "/"));
        return [
            'resourceName' => $arrUri[0] ?? null,
            'resourceId' => !empty($arrUri[1]) ? (int)$arrUri[1] :  null,
            'childResourceName' => $arrUri[2] ?? null,
            'childResourceId' => !empty($arrUri[3]) ? (int)$arrUri[3] : null,
        ];
    }
```

👉 Feldarabolja az URI‑t részekre.  
Példa: `/counties/1/cities/5` →
```php
[
  'resourceName' => 'counties',
  'resourceId' => 1,
  'childResourceName' => 'cities',
  'childResourceId' => 5
]
```
### Segédfüggvények az uri feldolgozásához

```php
    private static function getResourceId(array $arrUri): ?int
    {
        return $arrUri['resourceId'];
    }

    private static function getResourceName(array $arrUri): ?string
    {
        return $arrUri['resourceName'];
    }

    private static function getChildResourceId(array $arrUri): ?int
    {
        return $arrUri['childResourceId'];
    }

    private static function getChildResourceName(array $arrUri): ?string
    {
        return $arrUri['childResourceName'];
    }
```
---

### isRouteMatch() és isRouteAllowed()

```php
    private static function isRouteMatch($route, $uri): bool
    {
        $routeParts = explode('/', trim($route, '/'));
        $uriParts = explode('/', trim($uri, '/'));

        if (count($routeParts) !== count($uriParts)) {
            return false;
        }

        foreach ($routeParts as $index => $routePart) {
            if (preg_match('/^{.*}$/', $routePart)) {
                continue; // Paraméter placeholder, bármilyen értéket elfogad
            }
            if ($routePart !== $uriParts[$index]) {
                return false;
            }
        }

        return true;
    }

    private static function isRouteAllowed($method, $uri, $routes): bool
    {
        if (!isset($routes[$method])) {
            return false;
        }

        foreach ($routes[$method] as $route) {
            if (self::isRouteMatch($route, $uri)) {
                return true;
            }
        }

        return false;
    }
```

👉 Ezek a függvények ellenőrzik, hogy az URI megfelel‑e a route mintának, és hogy engedélyezett‑e az adott metódushoz.

---

### getRepository()

```php
    private static function getRepository($resourceName): ?BaseRepository
    {
        switch ($resourceName) {
            case 'counties':
                $repository = new CountyRepository();
                break;
            case 'cities':
                $repository = new CityRepository();
                break;
            case 'users':
                $repository = new UserRepository();
                break;
            default:
                $repository = null;
        }

        return $repository;
    }
```

👉 A `resourceName` alapján visszaadja a megfelelő repositoryt.  
Ez biztosítja, hogy a controller ne SQL‑t írjon, hanem a repositoryt hívja.

---

## CRUD metódusok implementálása

- **POST**: új erőforrás létrehozása → `201 Created`
- **GET**: erőforrás(ok) lekérdezése → `200 OK` vagy `404 Not Found`
- **PUT**: meglévő erőforrás frissítése → `202 Accepted` vagy `404 Not Found`
- **DELETE**: erőforrás törlése → `204 No Content`

Ez a struktúra biztosítja, hogy minden CRUD művelethez megfelelő HTTP státuszkódot és választ adjunk, így a REST API szabványos és kiszámítható lesz a kliens számára.

### POST – Új erőforrás létrehozása ill. login / logout kezelése
```php
    private static function postRequest($resourceName, $requestData)
    {
        // Speciális login kezelés
        if ($resourceName === 'users' && self::isLoginRequest()) {
            self::handleLogin($requestData);
            return;
        }
        // LOGOUT speciális kezelés
        if ($resourceName === 'users' && self::isLogoutRequest()) {
            self::handleLogout();
            return;
        }

        // Általános CRUD POST
        $repository = self::getRepository($resourceName);
        if (!$repository) {
            Response::error("Couldn't get repository", 400);
            return;
        }

        $newId = $repository->create($requestData);
        if ($newId) {
            Response::created(['id' => $newId]); // 201 Created
            return;
        }

        Response::error("Bad request", 400);
    }
```

**Segédfüggvény: login felismerése**

```php
private static function isLoginRequest(): bool
{
    return isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/users/login') !== false;
}
```

**Segédfüggvény: login logika**

```php
private static function handleLogin(array $requestData): void
{
    $repository = self::getRepository('users');
    if (!$repository) {
        Response::error("Couldn't get repository", 400);
        return;
    }

    $user = $repository->findByEmail($requestData['email'] ?? '');
    if (!$user || !password_verify($requestData['password'] ?? '', $user['password'])) {
        Response::error("Invalid credentials", 401); // Unauthorized
        return;
    }

    $token = $repository->createToken($user['id']);
    Response::success([
        'token' => $token,
        'user'  => [
            'id'    => $user['id'],
            'name'  => $user['name'],
            'email' => $user['email']
        ]
    ], 200);
}
```


**Segédfüggvény: logout felismerése**

```php
    private static function isLogoutRequest(): bool
    {
        return isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/users/logout') !== false;
    }
```

**Segédfüggvény: logout logika**

```php
private static function handleLogout(): void
{
    $repository = self::getRepository('users');
    if (!$repository) {
        Response::error("Couldn't get repository", 400);
        return;
    }

    // Token kinyerése az Authorization headerből
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    if (strpos($authHeader, 'Bearer ') !== 0) {
        Response::error("Missing or invalid Authorization header", 401);
        return;
    }

    $token = substr($authHeader, 7); // "Bearer " levágása

    // Token érvénytelenítése
    $result = $repository->invalidateToken($token);
    if ($result) {
        Response::success(['message' => 'Logged out'], 204);
    } else {
        Response::error("Invalid token", 401);
    }
}
```

**Magyarázat:**
- A `getRepository()` függvény visszaadja a megfelelő adattárat (pl. CountyRepository).
- Ha nincs repository, 400-as hibát adunk vissza.
- Sikeres létrehozás esetén a válaszban visszaküldjük az új entitás azonosítóját, és a státuszkód `201 Created`.
- Ha nem sikerül, marad a `400 Bad Request`.
- **isLoginRequest():** felismeri, ha az URI `/users/login`.
- **handleLogin():** `email` és `password` alapján azonosítja a felhasználót és generál a részére egy tokent.
- **isLogoutRequest():** felismeri, ha az URI `/users/logout`.
- **handleLogout():**
    - Kinyeri a tokent az `Authorization` headerből.
    - Ellenőrzi, hogy Bearer formátumban van.
    - Meghívja a `UserRepository::invalidateToken()` metódust.
    - Siker esetén `204 No Content` vagy egy rövid üzenet (`Logged out`).
    - Hibás token esetén `401 Unauthorized`.

**Miért kell az Authorization header logoutnál?**
- **Token azonosítás:** A szervernek tudnia kell, melyik tokenhez tartozó felhasználót kell kijelentkeztetni. Ha nincs header, nincs információ arról, melyik sessiont kell megszüntetni.
- **Biztonság:** Ha a kliens csak egy „logout” kérést küldene token nélkül, bárki küldhetne ilyen kérést, és nem lenne garantálható, hogy a megfelelő felhasználó kerül kijelentkeztetésre.
- **Egységesség:** A REST API-ban minden védett művelet ugyanúgy az `Authorization: Bearer <token>` header alapján azonosítja a felhasználót. A logout is egy védett művelet, ezért követi ezt a mintát.
- **Best practice:** Az iparági szabvány (RFC 6750 – Bearer Token Usage) szerint minden tokenhez kötött műveletnél a kliensnek a headerben kell átadnia a tokent.

**Alternatívák**
- **Body paraméter:** A kliens küldhetné a tokent a request body-ban is (`{ "token": "..." }`), de ez kevésbé szabványos, és nem illeszkedik az Authorization header konvencióhoz.
- **Cookie alapú megoldás:** Ha session cookie-t használnál, akkor nem kellene header, de az már nem tisztán RESTful, hanem inkább webalkalmazás‑szerű.

---

### DELETE – Erőforrás törlése
```php
private static function deleteRequest($resourceName, $resourceId)
{
    $repository = self::getRepository($resourceName);
    $result = $repository->delete($resourceId);
    if ($result) {
        $code = 204;
    }
    Response::response([], $code);
}
```

**Magyarázat:**
- A `delete()` metódus megpróbálja törölni az adott azonosítójú entitást.
- Ha sikerül, `204 No Content` státuszkódot küldünk vissza.
- A válasz törzs üres, hiszen a törölt erőforrás már nem létezik.
- Ha nem sikerül, a státuszkód marad hibás (pl. 400 vagy 404).

---

### GET – Erőforrás lekérdezése
```php
private static function getRequest($resourceName, $resourceId = null, $childResourceName = null)
    {
        // Child resource (pl. /counties/5/cities)
        if ($childResourceName) {
            $repository = self::getRepository($childResourceName);
            if ($resourceId) {
                if ($childResourceName === 'cities') {
                    $entities = $repository->getCitiesByCounty($resourceId);
                    Response::ok(['entities' => $entities]);
                    exit;
                }
            }
        }

        // Normál resource
        $repository = self::getRepository($resourceName);

        // ID szerinti lekérés
        if ($resourceId) {
            $entity = $repository->find($resourceId);
            if (!$entity) {
                Response::error('Not found', 404);
                exit;
            }
            Response::ok(['entity' => $entity]);
            exit;
        }

        // 🔍 Keresés támogatása
        $needle = $_GET['needle'] ?? null;

        if ($needle) {
            // A repository-nak kell egy search() metódus
            $entities = $repository->findByName($needle);
            Response::ok(['entities' => $entities]);
            exit;
        }

        // Teljes lista
        $entities = $repository->getAll();
        Response::ok(['entities' => $entities]);
    }
```

**Magyarázat:**
- Ha van `childResourceName`, akkor például `/counties/{id}/cities` esetén a kapcsolódó városokat kérdezzük le.
- Ha van `resourceId`, akkor egy konkrét entitást keresünk (`find()`), és ha nincs találat, `404 Not Found`.
- Ha nincs `resourceId`, akkor az összes entitást visszaadjuk (`getAll()`).
- A sikeres válasz mindig `200 OK`.

---

### PUT – Erőforrás frissítése
```php
private static function putRequest($resourceName, $resourceId, $requestData)
{
    $repository = self::getRepository($resourceName);
    $code = 404;
    $entity = $repository->find($resourceId);
    if ($entity) {
        $data = [];
        foreach ($requestData as $key => $value) {
            $data[$key] = $value;
        }
        $result = $repository->update($resourceId, $data);
        if ($result) {
            $code = 202;
        }
    }
    Response::response([], $code);
}
```

**Magyarázat:**
- Először ellenőrizzük, hogy létezik-e az adott erőforrás (`find()`).
- Ha nem található, `404 Not Found`.
- Ha létezik, az új adatokkal frissítjük (`update()`), és siker esetén `202 Accepted` státuszkódot küldünk.
- A válasz törzs üres, hiszen csak a frissítés tényét jelezzük.

---

# Összefoglalás

- Az `$acceptedRoutes` tömbben definiáljuk az engedélyezett végpontokat.
- A `handle()` metódus a belépési pont, amely eldönti, mely CRUD műveletet kell meghívni.
- A segédfüggvények feldarabolják az URI‑t, ellenőrzik a route‑okat, és visszaadják a megfelelő repositoryt.
- A CRUD metódusok előkészítve várják a részletes implementációt.

Ez a struktúra biztosítja, hogy a REST API kérések kezelése átlátható és bővíthető legyen.
