---
id: mini-project-oop
slug: /php-alapok/mini-project
title: "Megoldás"
---

# Mini Project: School System

Ez a mini projekt egy egyszerű, de jól bővíthető **School Management System**, amely modern PHP‑s szemlélettel készül:

- objektumorientált felépítés
- namespace-ek
- Composer autoload
- Laravel-szerű mappastruktúra
- model–controller–view logika
- PDO adatbázis kapcsolat

---

# Miért csak OOP verziót készítünk?

A procedurális megoldás:

- könnyebb elsőre,
- de szétforgácsolja a fókuszt,
- és sok diák „beragad” ebbe a gondolkodásba.

A modern PHP viszont **OOP + namespaces + autoloading** alapú.

Az OOP:

- természetes átmenetet ad a modern keretrendszerekhez (Laravel, Symfony),
- tisztább, bővíthetőbb, újrafelhasználhatóbb kódot eredményez.

Ezért a mini projekt **kizárólag OOP + namespace + Composer autoload** megközelítéssel készül.

---

# A rendszer felépítése (áttekintés)

A projekt három fő rétegre oszlik:

## 1. **Model**
Az adatbázissal kommunikál.  
Minden SQL művelet itt történik.

## 2. **Controller**
A logikai réteg.  
Döntéseket hoz, adatot kér a modeltől, és átadja a view‑nak.

## 3. **View**
A megjelenítés.  
Csak HTML, minimális PHP‑val.

Ez a három réteg együtt alkot egy **mini MVC** rendszert.

---

# 1. Mappastruktúra

```
school-project/
│
├── app/
│   ├── Controllers/
│   │   └── StudentController.php
│   ├── Models/
│   │   └── Student.php
│   ├── Router/
│   │   └── Router.php
│   └── Views/
│       ├── LayoutView.php
│       ├── MenuView.php
│       └── Students/
│           ├── StudentListView.php
│           ├── StudentCreateView.php
│           └── StudentEditView.php
│
├── config/
│   └── database.php
│
├── public/
│   └── index.php
│
├── composer.json
└── vendor/
```

---
# 2. public/index.php (egyetlen belépési pont)

📁 **public/index.php**

```php
<?php

require __DIR__ . "/../vendor/autoload.php";

use App\Router\Router;
use App\Database\Database;
use App\Models\Student;
use App\Controllers\StudentController;

$config = require __DIR__ . "/../config/database.php";

$router = new Router();
[$resource, $action, $id] = $router->dispatch($_SERVER["REQUEST_URI"]);

$controllerClass = "App\\Controllers\\" . ucfirst($resource) . "Controller";

if (!class_exists($controllerClass)) {
    http_response_code(404);
    echo "$controllerClass not found";
    exit;
}

$modelClass = "App\\Models\\" . ucfirst(rtrim($resource, "s"));

if (!class_exists($modelClass)) {
    http_response_code(500);
    echo "$modelClass not found";
    exit;
}

$db = new Database($config);

$model = new $modelClass($db->connection());
$controller = new $controllerClass($model);

if (!method_exists($controller, $action)) {
    http_response_code(404);
    echo "$controllerClass->$action not found";
    exit;
}

echo $controller->$action($id);
```

Ez a fájl:

- betölti az autoloadot
- meghívja a routert
- példányosítja a megfelelő controller + model párost
- meghívja a megfelelő metódust
- **a controller visszaad egy View‑objektumot → render()**

---

# 3. Router osztály

# **Felelősség**

A Router a rendszer **útvonalkezelője**.  
Ő dönti el, hogy:

- melyik **controller** fusson,
- melyik **metódus** legyen meghívva,
- milyen **paraméterekkel** (pl. id).

A router tehát a webalkalmazás „forgalomirányítója”:  
minden beérkező URL‑t értelmez, és továbbítja a megfelelő helyre.

---

# **Miért fontos?**

Mert nélküle:

- minden művelethez külön PHP fájl kellene (students_create.php, students_edit.php…),
- a public mappa tele lenne fájlokkal,
- a rendszer nehezen lenne bővíthető,
- nem lehetne emberbarát URL‑eket használni.

A router segítségével viszont:

- **egy belépési pont** van (`public/index.php`),
- az URL‑ek tiszták és érthetők:

```
/students
/students/create
/students/edit/12
/students/delete/12
```

- a rendszer könnyen bővíthető új entitásokkal (teachers, subjects, classes),
- a controller‑logika egységes marad.

Ez a megközelítés pontosan úgy működik, mint a modern keretrendszerek (Laravel, Symfony, Express.js).

---

# **Hogyan illeszkedik a rendszerbe?**

A router a teljes alkalmazás **első lépése**:

1. A böngésző elküldi a kérést (pl. `/students/edit/5`).
2. A `public/index.php` meghívja a Routert.
3. A Router visszaadja:
    - resource: `students`
    - action: `edit`
    - id: `5`
4. A `public/index.php` ezek alapján:
    - példányosítja a `StudentController`‑t,
    - meghívja az `edit(5)` metódust.
5. A controller:
    - lekéri az adatot a modelltől,
    - átadja a view‑nak.
6. A view:
    - elkészíti a HTML‑t,
    - a LayoutView beágyazza az oldalba.

A router tehát a **modell → controller → view** folyamat első láncszeme.

---

# **Összegzés**

A Router:

- **értelmezi az URL‑t**,
- **kiválasztja a megfelelő controllert**,
- **kiválasztja a megfelelő metódust**,
- **átadja a paramétereket**,
- és ezzel biztosítja, hogy a rendszer bővíthető és tiszta maradjon.

Ez a komponens teszi lehetővé, hogy a projekt ne csak működjön, hanem **modern és karbantartható** legyen.

📁 **app/Router/Router.php**

```php
<?php

namespace App\Router;

class Router
{
    public function dispatch(string $uri): array
    {
        $path = trim(parse_url($uri, PHP_URL_PATH), "/");
        $parts = explode("/", $path);

        $resource = $parts[0] ?: "students";
        $action = $parts[1] ?? "index";
        $id = $parts[2] ?? null;

        return [$resource, $action, $id];
    }
}
```

A router **nem futtat semmit**, csak visszaadja:

```
[resource, action, id]
```

---


# 4. Database osztály
**Felelősség:**  
Ez az osztály felelős az adatbázis‑kapcsolat létrehozásáért.  
Ez az alkalmazás „kapuja” a MySQL felé.

**Miért külön osztály?**

- csak egyszer kell létrehozni a PDO kapcsolatot
- könnyen átadható más osztályoknak
- könnyen cserélhető (pl. SQLite ↔ MySQL)
- tiszta, jól elkülönített felelősség

**Hogyan illeszkedik a rendszerbe?**  
A `Student` modell ezt az osztályt kapja meg, és ezen keresztül éri el az adatbázist.

**Kód:**

```php
<?php

namespace App\Database;

use PDO;

class Database
{
    private PDO $pdo;

    public function __construct(array $config)
    {
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8";

        $this->pdo = new PDO($dsn, $config["user"], $config["pass"]);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function connection(): PDO
    {
        return $this->pdo;
    }
}
```

---

# 5. Student modell
**Felelősség:**  
A `Student` osztály az adatbázisban lévő `students` tábla „képviselője”.  
Ő felelős minden adatkezelési műveletért:

- lekérdezés
- beszúrás
- módosítás
- törlés

**Miért fontos?**  
Mert így a controllernek nem kell SQL‑t írnia.  
A controller csak azt mondja: „add vissza az összes diákot”, és a modell elvégzi a munkát.

**Hogyan illeszkedik a rendszerbe?**  
A modell a Database‑től kapja a PDO kapcsolatot,  
a controller pedig a modelltől kapja az adatot.

**Kód:**

```php
<?php

namespace App\Models;

use PDO;

class Student
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function all(): array
    {
        return $this->pdo->query("SELECT * FROM students")->fetchAll();
    }

    public function find(int $id): array|false
    {
        $sql = "SELECT * FROM students WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":id" => $id]);
        return $stmt->fetch();
    }

    public function create(string $name, int $age, string $class): void
    {
        $sql = "INSERT INTO students (name, age, class)
                VALUES (:name, :age, :class)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ":name" => $name,
            ":age" => $age,
            ":class" => $class
        ]);
    }

    public function update(int $id, string $name, int $age, string $class): void
    {
        $sql = "UPDATE students
                SET name = :name, age = :age, class = :class
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ":name" => $name,
            ":age" => $age,
            ":class" => $class,
            ":id" => $id
        ]);
    }

    public function delete(int $id): void
    {
        $sql = "DELETE FROM students WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":id" => $id]);
    }
}
```

---

# 6. Controller
**Felelősség:**  
A controller a „rendező”: eldönti, hogy mi történjen.

- Ha a felhasználó listát kér → modellből adatot kér → view‑nak átadja.
- Ha új diákot hoz létre → a modellt hívja → majd átirányít.
- Ha módosít → a modellt hívja → majd átirányít.

**Miért fontos?**  
Mert így a logika nem keveredik a HTML‑lel.  
A controller a „középső réteg” a modell és a view között.

**Hogyan illeszkedik a rendszerbe?**  
A controller a modellre támaszkodik,  
és a view‑t tölti be,  
de nem tartalmaz HTML‑t.

**Kód:**

📁 **app/Controllers/StudentController.php**

```php
<?php

namespace App\Controllers;

use App\Models\Student;
use App\Views\Students\StudentListView;
use App\Views\Students\StudentCreateView;
use App\Views\Students\StudentEditView;

class StudentController
{
    public function __construct(private Student $model) {}

    public function index(): string
    {
        $students = $this->model->all();
        return (new StudentListView($students))->render();
    }

    public function create(): string
    {
        return (new StudentCreateView())->render();
    }

    public function store(): string
    {
        $this->model->create($_POST["name"], $_POST["age"], $_POST["class"]);
        header("Location: /students");
        exit;
    }

    public function edit($id): string
    {
        $student = $this->model->find((int)$id);
        return (new StudentEditView($student))->render();
    }

    public function update($id): string
    {
        $this->model->update((int)$id, $_POST["name"], $_POST["age"], $_POST["class"]);
        header("Location: /students");
        exit;
    }

    public function delete($id): string
    {
        $this->model->delete((int)$id);
        header("Location: /students");
        exit;
    }
}
```

---

# 7. Nézetek (Views)
**Felelősség:**  
A view csak megjelenít.  
Semmi logika, semmi adatkezelés.

**Miért fontos?**  
Mert így a HTML tiszta marad, a kód könnyebben átlátható.

**Hogyan illeszkedik a rendszerbe?**  
A controller átadja neki az adatot, a view pedig megjeleníti.

---

## LayoutView

### **Felelősség**
A LayoutView a teljes oldal „kerete”.  
Ő felel a:

- HTML dokumentum alapstruktúrájáért,
- `<head>` részért,
- oldal címéért,
- menüért,
- és azért, hogy a tartalom a megfelelő helyre kerüljön.

A LayoutView **nem tudja**, milyen tartalom kerül bele — csak megjeleníti.

### **Miért fontos?**
Mert így:

- a HTML alapstruktúra nem ismétlődik minden view‑ban,
- a kinézet egységes marad,
- a view‑k csak a saját tartalmukra koncentrálnak,
- könnyen bővíthető (pl. CSS, Bootstrap, script tag).

Ez a megközelítés nagyon hasonlít a Laravel Blade „layout” funkciójára.

### **Hogyan illeszkedik a rendszerbe?**
A LayoutView a **legfelső szintű view**:

- a StudentListView, StudentCreateView, StudentEditView mind **tartalmat** ad neki,
- a LayoutView pedig ezt a tartalmat beilleszti a HTML vázba.

A controller mindig egy konkrét view‑t hoz létre, a view pedig a LayoutView‑t használja.

📁 **app/Views/LayoutView.php**

```php
<?php

namespace App\Views;

class LayoutView
{
    public function __construct(
        private string $content,
        private string $title = "Iskolai rendszer"
    ) {}

    public function render(): string
    {
        return <<<HTML
        <!DOCTYPE html>
        <html lang="hu">
        <head>
            <meta charset="UTF-8">
            <title>{$this->title}</title>
        </head>
        <body>
            <h1>{$this->title}</h1>
            <nav>
                <a href="/students">Diákok</a> |
                <a href="/students/create">Új diák</a>
            </nav>
            <hr>
            {$this->content}
        </body>
        </html>
        HTML;
    }
}
```
---

## StudentListView

### **Felelősség**
A StudentListView feladata:

- a diákok listájának megjelenítése,
- a diákok adatainak formázása,
- a szerkesztés/törlés linkek előállítása.

Ez a view **csak megjelenít**, semmilyen logikát nem tartalmaz.

### **Miért fontos?**
Mert így:

- a HTML nem keveredik a controller logikájával,
- a lista megjelenítése egy helyen történik,
- könnyen módosítható (pl. táblázatos nézetre váltás),
- a controller tiszta marad.

Látható, hogy a view **nem gondolkodik**, csak kirajzol.

### **Hogyan illeszkedik a rendszerbe?**
A controller:

1. lekéri a diákokat a modelltől,
2. átadja őket a StudentListView‑nak,
3. a view pedig elkészíti a HTML‑t,
4. majd a LayoutView beágyazza az oldalba.

Ez a klasszikus MVC működés.

📁 **app/Views/Students/StudentListView.php**

```php
<?php

namespace App\Views\Students;

use App\Views\LayoutView;

class StudentListView
{
    public function __construct(private array $students) {}

    public function render(): string
    {
        $rows = [];

        foreach ($this->students as $s) {
            $rows[] = <<<HTML
                <div>
                    {$s["name"]} ({$s["age"]}) – {$s["class"]}
                    <a href="/students/edit/{$s["id"]}">Szerkesztés</a>
                    <a href="/students/delete/{$s["id"]}">Törlés</a>
                </div>
            HTML;
        }

        $content = implode("", $rows);

        return (new LayoutView($content, "Diákok listája"))->render();
    }
}
```

---

## StudentCreateView

### **Felelősség**
A StudentCreateView feladata:

- az „Új diák felvétele” űrlap megjelenítése,
- a mezők előkészítése,
- a form action helyes beállítása.

Ez a view **nem ment adatot**, nem validál, nem dönt — csak megjelenít.

### **Miért fontos?**
Mert így:

- az űrlap HTML‑je nem keveredik a controller logikájával,
- a controller csak a POST feldolgozásával foglalkozik,
- az űrlap kinézete könnyen módosítható,
- a view teljesen önálló komponens.

Látható, hogy az űrlap is csak egy „nézet”.

### **Hogyan illeszkedik a rendszerbe?**
A controller:

- ha GET kérés érkezik → visszaadja a StudentCreateView‑t,
- ha POST érkezik → meghívja a modellt → átirányít.

A view csak a HTML‑t adja, a logika a controllerben marad.

📁 **app/Views/Students/StudentCreateView.php**

```php
<?php

namespace App\Views\Students;

use App\Views\LayoutView;

class StudentCreateView
{
    public function render(): string
    {
        $content = <<<HTML
        <h2>Új diák felvétele</h2>

        <form method="POST" action="/students/store">
            <label>Név: <input type="text" name="name" required></label><br>
            <label>Életkor: <input type="number" name="age" required></label><br>
            <label>Osztály: <input type="text" name="class" required></label><br><br>

            <button type="submit">Mentés</button>
        </form>
        HTML;

        return (new LayoutView($content, "Új diák"))->render();
    }
}
```

---

## StudentEditView

### **Felelősség**
A StudentEditView feladata:

- a meglévő diák adatainak megjelenítése az űrlapban,
- a mezők előtöltése,
- a form action helyes beállítása (id‑val együtt).

Ez a view **nem módosít adatot**, csak megjeleníti az űrlapot.

### **Miért fontos?**
Mert így:

- a szerkesztő űrlap HTML‑je nem keveredik a controller logikájával,
- a controller csak az adatok feldolgozását végzi,
- a view könnyen bővíthető (pl. új mezők hozzáadása),
- a felhasználó mindig a megfelelő adatokat látja.

Látható, hogy a view feladata a **prezentáció**, nem a logika.

### **Hogyan illeszkedik a rendszerbe?**
A controller:

1. lekéri a diák adatait a modelltől,
2. átadja a StudentEditView‑nak,
3. a view előtölti az űrlapot,
4. a LayoutView beágyazza az oldalba.

A módosítás logikája a controllerben marad.

📁 **app/Views/Students/StudentEditView.php**

```php
<?php

namespace App\Views\Students;

use App\Views\LayoutView;

class StudentEditView
{
    public function __construct(private array $student) {}

    public function render(): string
    {
        $content = <<<HTML
        <h2>Diák módosítása</h2>

        <form method="POST" action="/students/update/{$this->student["id"]}">
            <label>Név: <input type="text" name="name" value="{$this->student["name"]}" required></label><br>
            <label>Életkor: <input type="number" name="age" value="{$this->student["age"]}" required></label><br>
            <label>Osztály: <input type="text" name="class" value="{$this->student["class"]}" required></label><br><br>

            <button type="submit">Mentés</button>
        </form>
        HTML;

        return (new LayoutView($content, "Diák szerkesztése"))->render();
    }
}
```

---

# **Gyakorlófeladatok**

1. Adj hozzá egy új mezőt: `email`.
2. Készíts egy `Teacher` (tanár) modellt + controllert + teljes CRUD funkciót.
3. Készíts keresőmezőt, amellyel név alapján lehet szűrni a diákokat.
4. Valósíts meg rendezést (növekvő/csökkenő) név vagy életkor szerint.
5. Készíts lapozást (pagination).
6. Hozz létre egy `Subject` (tantárgy) modellt, és kapcsolódjon a diákokhoz (many‑to‑many kapcsolat).

---


