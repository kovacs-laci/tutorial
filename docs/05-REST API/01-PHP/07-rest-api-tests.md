---
id: rest-api-tests
slug: /rest-api-tests
title: "Automata tesztek"
---

# REST API automata tesztek

A szoftverfejlesztésben a tesztelés kulcsfontosságú.  
Az automata tesztek célja, hogy ellenőrizzék: a kód **valóban teljesíti az elvárásokat**.  
Általánosságban:
- **Van egy elvárás** (pl. „az adatbázis kapcsolat létrejön”).
- **A teszt lefut** és ellenőrzi, hogy a kapott eredmény megfelel‑e az elvárásnak.
- Ha igen → a teszt sikeres.
- Ha nem → a teszt hibát jelez.

---

## Tesztelési alapelvek

- **Ne futtass teszteket éles adatbázison!**
    - A tesztek gyakran létrehoznak, módosítanak és törölnek rekordokat.
    - Ha ez éles adatbázison történik, adatvesztést okozhat.
    - Mindig használj külön **teszt adatbázist** (pl. `postoffice_test`).

- **Minden teszt szeparáltan fut.**
    - Egy teszt nem építhet a másik eredményére.
    - Például: ha az egyik teszt létrehoz egy rekordot, a másik teszt nem számíthat arra, hogy az a rekord létezik.

- **Tesztadatok előkészítése és takarítása.**
    - Használj `setUp()` metódust a tesztosztályban, hogy minden teszt előtt létrehozd a szükséges környezetet.
    - Használj `tearDown()` metódust, hogy minden teszt után töröld a létrehozott adatokat.
    - Így biztosítható, hogy a tesztek mindig tiszta állapotból indulnak.

- **Determinista tesztek.**
    - A teszt mindig ugyanazt az eredményt kell adja, függetlenül attól, hányszor futtatod.

---

## 1. PHPUnit telepítése

Telepítés Composerrel:
```bash
composer require --dev phpunit/phpunit
```

---

## 2. PHPUnit konfiguráció

`phpunit.xml` fájl a gyökérben:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php"
         colors="true"
         verbose="true">
    <testsuites>
        <testsuite name="Application Test Suite">
            <directory>./tests</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

---

## 3. Tesztek írása

### DatabaseConnectionTest

```php
<?php
namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Database\DatabaseConnection;
use mysqli;

class DatabaseConnectionTest extends TestCase
{
    private $dbConnection;

    protected function setUp(): void
    {
        $this->dbConnection = new DatabaseConnection();
    }

    protected function tearDown(): void
    {
        $this->dbConnection = null;
    }

    public function testConnectionSuccess()
    {
        $this->assertInstanceOf(mysqli::class, $this->dbConnection->mysqli);
    }

    public function testConnectionFailure()
    {
        $this->expectException(\Exception::class);
        new DatabaseConnection('localhost', 'root', null, 'wrong_db');
    }
}
```

---

### BaseRepositoryTest

```php
<?php
namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Repositories\BaseRepository;
use mysqli;
use mysqli_result;

class BaseRepositoryTest extends TestCase
{
    private $mysqliMock;
    private $repository;

    protected function setUp(): void
    {
        // Mockolt mysqli objektum
        $this->mysqliMock = $this->createMock(\mysqli::class);

        // Névtelen gyerek osztály, amely a mockolt mysqli-t használja
        $this->repository = new class($this->mysqliMock) extends BaseRepository {
            public string $tableName = 'test_table';
            public function __construct($mysqliMock) {
                $this->mysqli = $mysqliMock;
            }
        };
    }

    protected function tearDown(): void
    {
        $this->mysqliMock = null;
        $this->repository = null;
    }

    public function testCreate()
    {
        $this->mysqliMock->expects($this->exactly(2))
            ->method('query')
            ->willReturnOnConsecutiveCalls(
                true,
                $this->createMockMysqliResult(['id' => 1])
            );

        $newId = $this->repository->create(['name' => 'Sample Data']);
        $this->assertEquals(1, $newId);
    }

    public function testFind()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains('SELECT * FROM `test_table` WHERE id = 1'))
            ->willReturn($this->createMockMysqliResult(['id' => 1, 'name' => 'Sample Data']));

        $result = $this->repository->find(1);
        $this->assertEquals(['id' => 1, 'name' => 'Sample Data'], $result);
    }

    public function testGetAll()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains('SELECT * FROM `test_table` ORDER BY name'))
            ->willReturn($this->createMockMysqliResultMultiple([
                ['id' => 1, 'name' => 'Sample Data 1'],
                ['id' => 2, 'name' => 'Sample Data 2']
            ]));

        $result = $this->repository->getAll();
        $this->assertEquals([
            ['id' => 1, 'name' => 'Sample Data 1'],
            ['id' => 2, 'name' => 'Sample Data 2']
        ], $result);
    }

    public function testUpdate()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains("UPDATE `test_table` SET name = 'Updated Data' WHERE id = 1"))
            ->willReturn(true);

        // Itt a find() metódus is hívódik, ezért mockoljuk a SELECT-et
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains("SELECT * FROM `test_table` WHERE id = 1"))
            ->willReturn($this->createMockMysqliResult(['id' => 1, 'name' => 'Updated Data']));

        $updatedRecord = $this->repository->update(1, ['name' => 'Updated Data']);
        $this->assertEquals(['id' => 1, 'name' => 'Updated Data'], $updatedRecord);
    }

    public function testDelete()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains('DELETE FROM `test_table` WHERE id = 1'))
            ->willReturn(true);

        $result = $this->repository->delete(1);
        $this->assertTrue($result);
    }

    public function testFindByName()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains("WHERE name LIKE '%sample%' ORDER BY name"))
            ->willReturn($this->createMockMysqliResultMultiple([
                ['id' => 1, 'name' => 'Sample Data 1'],
                ['id' => 2, 'name' => 'Sample Data 2']
            ]));

        $result = $this->repository->findByName('sample');
        $this->assertEquals([
            ['id' => 1, 'name' => 'Sample Data 1'],
            ['id' => 2, 'name' => 'Sample Data 2']
        ], $result);
    }

    public function testGetCount()
    {
        $this->mysqliMock->expects($this->once())
            ->method('query')
            ->with($this->stringContains('SELECT COUNT(1) AS cnt FROM `test_table`'))
            ->willReturn($this->createMockMysqliResult(['cnt' => 2]));

        $result = $this->repository->getCount();
        $this->assertEquals(2, $result);
    }

    // Helper methods
    private function createMockMysqliResult(array $row)
    {
        $resultMock = $this->getMockBuilder(mysqli_result::class)
            ->disableOriginalConstructor()
            ->getMock();

        $resultMock->method('fetch_assoc')->willReturn($row);
        return $resultMock;
    }

    private function createMockMysqliResultMultiple(array $rows)
    {
        $resultMock = $this->getMockBuilder(mysqli_result::class)
            ->disableOriginalConstructor()
            ->getMock();

        $resultMock->method('fetch_all')->willReturn($rows);
        return $resultMock;
    }
}

```

---

### CountyRepositoryTest

```php
<?php
namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Repositories\CountyRepository;

class CountyRepositoryTest extends TestCase
{
    private $repo;

    protected function setUp(): void
    {
        $this->repo = new CountyRepository();
        // Tesztadat előkészítése
        $this->repo->truncate();
    }

    protected function tearDown(): void
    {
        $this->repo->truncate();
        $this->repo = null;
    }

    public function testCreateAndFind()
    {
        $id = $this->repo->create(['name' => 'TestCounty']);
        $county = $this->repo->find($id);

        $this->assertEquals('TestCounty', $county['name']);
    }

    public function testGetAll()
    {
        $this->repo->create(['name' => 'AnotherCounty']);
        $all = $this->repo->getAll();

        $this->assertIsArray($all);
        $this->assertGreaterThanOrEqual(1, count($all));
    }
}
```

---

### CityRepositoryTest

```php
<?php
namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Repositories\CityRepository;

class CityRepositoryTest extends TestCase
{
    private $repo;

    protected function setUp(): void
    {
        $this->repo = new CityRepository();
        $this->repo->truncate();
    }

    protected function tearDown(): void
    {
        $this->repo->truncate();
        $this->repo = null;
    }

    public function testCreateRequiresCountyId()
    {
        $this->expectException(\Exception::class);
        $this->repo->create(['name' => 'TestCity']); // county_id hiányzik
    }

    public function testGetByCounty()
    {
        $this->repo->create(['name' => 'CityA', 'county_id' => 1]);
        $cities = $this->repo->getByCounty(1);

        $this->assertIsArray($cities);
        $this->assertEquals('CityA', $cities[0]['name']);
    }
}
```
---

### RequestTest

A `RequestTest` osztály ellenőrzi, hogy a `Request` osztály helyesen kezeli a különböző HTTP metódusokat (GET, POST, DELETE, PUT).

```php
<?php
namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Repositories\CountyRepository;
use App\Html\Request;

class RequestTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Minden teszt előtt tisztítjuk a $_SERVER szuperglobálist
        $_SERVER = [];
    }

    public function testGetRequest()
    {
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['REQUEST_URI'] = '/counties';

        $repositoryMock = $this->getMockBuilder(CountyRepository::class)
            ->onlyMethods(['getAll'])
            ->getMock();

        $repositoryMock->method('getAll')
            ->willReturn([
                ['id' => 1, 'name' => 'County A'],
                ['id' => 2, 'name' => 'County B']
            ]);

        $this->expectOutputString(json_encode([
            'data' => [
                ['id' => 1, 'name' => 'County A'],
                ['id' => 2, 'name' => 'County B']
            ],
            'message' => 'OK',
            'status' => 200
        ]));

        Request::handle();
    }

    public function testPostRequest()
    {
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['REQUEST_URI'] = '/counties';

        $repositoryMock = $this->getMockBuilder(CountyRepository::class)
            ->onlyMethods(['create'])
            ->getMock();

        $repositoryMock->method('create')->willReturn(57);

        $this->mockPostData(['name' => 'Bereg']);

        $this->expectOutputString(json_encode([
            'data' => ['id' => 57],
            'message' => 'Created',
            'status' => 201
        ]));

        Request::handle();
    }

    public function testDeleteRequest()
    {
        $_SERVER['REQUEST_METHOD'] = 'DELETE';
        $_SERVER['REQUEST_URI'] = '/counties/57';

        $repositoryMock = $this->getMockBuilder(CountyRepository::class)
            ->onlyMethods(['delete'])
            ->getMock();

        $repositoryMock->method('delete')->willReturn(true);

        $this->expectOutputString(json_encode([
            'data' => [],
            'message' => 'No content',
            'status' => 204
        ]));

        Request::handle();
    }

    public function testPutRequest()
    {
        $_SERVER['REQUEST_METHOD'] = 'PUT';
        $_SERVER['REQUEST_URI'] = '/counties/57';

        $repositoryMock = $this->getMockBuilder(CountyRepository::class)
            ->onlyMethods(['find', 'update'])
            ->getMock();

        $repositoryMock->method('find')->willReturn(['id' => 57, 'name' => 'Old Name']);
        $repositoryMock->method('update')->willReturn(true);

        $this->mockPutData(['name' => 'New Name']);

        $this->expectOutputString(json_encode([
            'data' => [],
            'message' => 'Accepted',
            'status' => 202
        ]));

        Request::handle();
    }

    // Helper methods
    private function mockPostData(array $data)
    {
        file_put_contents('php://input', json_encode($data));
    }

    private function mockPutData(array $data)
    {
        file_put_contents('php://input', json_encode($data));
    }
}
```

👉 **Magyarázat**:
- A `$_SERVER` szuperglobális manipulálásával szimuláljuk a különböző HTTP metódusokat.
- A repositoryt mockoljuk, így nem kell valódi adatbázist használni.
- Az `expectOutputString()` ellenőrzi, hogy a `Request::handle()` metódus a megfelelő JSON választ adja.
- A `mockPostData()` és `mockPutData()` segédfüggvényekkel szimuláljuk a kliens által küldött adatokat.


---

## 4. Tesztek futtatása

```bash
vendor/bin/phpunit
```

👉 Példa sikeres futásra:
```
PHPUnit 10.5.0 by Sebastian Bergmann and contributors.

....                                                            4 / 4 (100%)

OK (4 tests, 8 assertions)
```

👉 Példa hibás futásra:
```
.F..                                                            4 / 4 (100%)

There was 1 failure:

1) App\Tests\CityRepositoryTest::testCreateRequiresCountyId
Failed asserting that exception of type "Exception" is thrown.

FAILURES!
Tests: 4, Assertions: 8, Failures: 1.
```

# Összefoglalás

- A teszteket **soha nem szabad éles adatbázison futtatni** – mindig külön teszt adatbázist használjunk.
- Minden teszt **önállóan fut**, nem építhet más teszt eredményére.
- A `setUp()` és `tearDown()` metódusokkal biztosítjuk, hogy minden teszt tiszta környezetből induljon.
- A PHPUnit telepítése Composerrel történik, konfigurációját a `phpunit.xml` fájlban adjuk meg.
- A futtatás `vendor/bin/phpunit` paranccsal történik, a kimenet színesen jelzi a sikeres és hibás teszteket.

---

## 5. Mock vs. Valódi adatbázis teszt

A tesztelésnél két alapvető megközelítés létezik:

### 5.1 Mock alapú tesztelés
- **Lényege**: az adatbázist nem használjuk, hanem a `mysqli` vagy repository osztályokat mockoljuk.
- **Előnyök**:
  - Gyors futás, nincs külső függőség.
  - Izolált unit teszt: csak a kód logikáját ellenőrzi.
  - Determinisztikus eredmény.
- **Hátrányok**:
  - Nem ellenőrzi a SQL lekérdezések tényleges helyességét.
- **Példa**: a `BaseRepositoryTest` mockolt `mysqli` objektummal szimulálja a DB válaszokat.

### 5.2 Valódi adatbázis (pl. SQLite in‑memory)
- **Lényege**: a teszt ténylegesen lefuttatja a SQL parancsokat egy külön teszt adatbázison.
- **Előnyök**:
  - Integrációs teszt: biztosítja, hogy a lekérdezések működnek.
  - Valós környezethez közelebb áll.
- **Hátrányok**:
  - Lassabb, mint a mock.
  - Bonyolultabb setup/tearDown: minden teszt előtt tisztítani kell az adatbázist.
  - Eltérhet a cél adatbázistól (pl. MySQL vs. SQLite).
- **Példa setup SQLite‑tal**:
  ```php
  protected function setUp(): void
  {
      $this->mysqli = new \mysqli('localhost', 'root', '', ':memory:');
      $this->mysqli->query("CREATE TABLE counties (id INTEGER PRIMARY KEY, name TEXT)");
  }

  protected function tearDown(): void
  {
      $this->mysqli->close();
  }
  ```

---

## Összefoglalás

- **Unit tesztekhez** → mock elegendő, gyors és izolált.
- **Integrációs tesztekhez** → használhatunk SQLite in‑memory adatbázist, hogy ténylegesen lefussanak a SQL parancsok.
- **Legjobb gyakorlat**:
  - Mock → egyszerűbb, gyorsabb.
  - Valódi DB → valósabb, de összetettebb.

---
