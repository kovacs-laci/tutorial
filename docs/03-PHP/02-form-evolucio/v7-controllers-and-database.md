---
id: v7-controllers-and-database
title: 7.0 Controller osztályok és Database osztály bevezetése
sidebar_label: 7.0 Controller + Database
slug: /form-evolucio/v7-controllers-database
---

## 7.0 Controller osztályok és Database osztály bevezetése

A 6. verzióban a projekt már egyértelműen MVC-szerű felépítést kapott:  
külön Model, View és Router réteg működött együtt.  
A 7. verzió célja, hogy a felelősségi köröket tovább tisztítsuk:

- a Router már nem kezel üzleti logikát,  
- megjelenik a **SubjectController**, amely átveszi a tantárgyakhoz tartozó műveleteket,  
- megjelenik a **Database** osztály, amely központi helyen kezeli a PDO kapcsolatot.

Ez a verzió már valóban egy **mini‑framework** alapjait mutatja.

---

## Mi változott a 6. verzióhoz képest?

A 7. verzióval a projekt eléri a klasszikus MVC mintának megfelelő, professzionális szerkezetet. A V6-ban bevezetett Model–View–Router alap elrendezés most tovább tisztul, a felelősségi körök végleg szétválnak.

---

### 1. Új Database osztály – központosított PDO kapcsolat

Megjelent a `database/Database.php`, amely:

- egyetlen helyen hozza létre a PDO kapcsolatot,
- Singleton‑szerűen működik, így minden osztály ugyanazt a kapcsolatot használja,
- leveszi az adatbázis‑kezelést az `index.php`, a controller és a modellek válláról,
- gyorsabbá, tisztábbá és biztonságosabbá teszi az alkalmazást.

Ez a modern PHP alkalmazások egyik alapelve.

---

### 2. SubjectController – az üzleti logika leválasztása

A tantárgyakhoz tartozó logika önálló controllerbe került:

- kezeli a POST műveleteket (create, update),
- kezeli a GET törlést,
- meghívja a megfelelő modellmetódusokat,
- betölti a hozzá tartozó view-kat.

Ezzel a router és az index.php teljesen logikamentessé válik.

---

### 3. A Router kizárólag útválasztó lett

A Router most:

- felismeri a `page` paramétert,
- meghívja a megfelelő controller metódust,
- **nem** tartalmaz SQL-t,
- **nem** tartalmaz POST/GET feldolgozást.

Ez már a keretrendszer-szerű felépítés egyik alapeleme.

---

### 4. Az index.php teljesen megtisztult

A front controller most már csak:

- betölti az osztályokat,
- lekéri a PDO kapcsolatot a Database osztálytól,
- példányosítja a routert,
- meghívja a layoutot (head, menu, footer).

Ami **kikerült** belőle:

- SQL
- üzleti logika
- HTML
- POST/GET feldolgozás

Ez megfelel a modern front controller mintának.

---

### 5. A Model és View réteg változatlan maradt

Ez annak bizonyítéka, hogy a V6-ban jól lett kialakítva:

- a modellek továbbra is tiszta adatbázis‑műveletek,
- a view-k tiszta HTML‑orientált nézetek,
- a `LayoutView` biztosítja az egységes megjelenést.

A V7 főként a controller és adatbázis réteg tisztításáról szólt, a Model–View rész stabil maradt.

---

### 6. A projekt szerkezete professzionális MVC struktúrává érett

A 7. verzió mappaszerkezete már tisztán mutatja a teljes MVC felépítést:

```text
v7/
├── index.php
├── database/
│   └── Database.php
├── controllers/
│   ├── Router.php
│   └── SubjectController.php
├── models/
│   └── SubjectModel.php
└── views/
    ├── LayoutView.php
    ├── HomeView.php
    └── SubjectView.php
```

- **Model** – adatbázis műveletek
- **View** – megjelenítés
- **Controller** – üzleti logika
- **Router** – útválasztás
- **Database** – központi PDO kapcsolat
- **index.php** – front controller

---

## **database/Database.php**
*Központi PDO kapcsolat, Singleton-szerű működés*

```php
<?php

class Database
{
    private static ?PDO $connection = null;

    public static function getConnection(): PDO
    {
        if (self::$connection === null) {
            self::$connection = new PDO(
                "mysql:host=localhost;dbname=school;charset=utf8",
                "root",
                ""
            );
        }

        return self::$connection;
    }
}
```

---

## **index.php**
*A front controller most már teljesen logikamentes*

```php
<?php
require_once "database/Database.php";
require_once "views/LayoutView.php";
require_once "views/HomeView.php";
require_once "views/SubjectView.php";
require_once "models/SubjectModel.php";
require_once "controllers/SubjectController.php";
require_once "controllers/Router.php";

$pdo = Database::getConnection();

$page = $_GET['page'] ?? 'home';
$router = new Router($pdo);

LayoutView::head();
LayoutView::menu();

$router->handle($page);

LayoutView::footer();
```

---

## **controllers/Router.php**
*A Router most már csak útválasztó — nem kezel logikát*

```php
<?php

class Router
{
    private PDO $pdo;
    private SubjectController $subjectController;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->subjectController = new SubjectController($pdo);
    }

    public function handle(string $page): void
    {
        switch ($page) {

            case 'subjects':
            case 'add-subject':
            case 'edit-subject':
                $this->subjectController->handleRequest($page);
                break;

            default:
                HomeView::render();
        }
    }
}
```

---

## **controllers/SubjectController.php**
*A Subject modul teljes üzleti logikája külön controllerben*

```php
<?php

class SubjectController
{
    private SubjectModel $model;

    public function __construct(PDO $pdo)
    {
        $this->model = new SubjectModel($pdo);
    }

    public function handleRequest(string $page)
    {
        // --- POST műveletek ---
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            if (isset($_POST['add-subject'])) {
                $this->model->create($_POST['name']);
                header("Location: index.php?page=subjects");
                exit;
            }

            if (isset($_POST['update-subject'])) {
                $this->model->update($_POST['id'], $_POST['name']);
                header("Location: index.php?page=subjects");
                exit;
            }
        }

        // --- GET törlés ---
        if (isset($_GET['delete'])) {
            $this->model->delete($_GET['delete']);
            header("Location: index.php?page=subjects");
            exit;
        }

        // --- Nézetek ---
        switch ($page) {

            case 'subjects':
                $subjects = $this->model->getAll();
                SubjectView::list($subjects);
                break;

            case 'add-subject':
                SubjectView::addForm();
                break;

            case 'edit-subject':
                $subject = $this->model->find($_GET['id']);
                SubjectView::editForm($subject);
                break;
        }
    }
}
```

---

## Mit tanultunk a 7. verzióban?

A 7. verzióban a projekt szerkezete elérte azt a pontot, ahol már valóban felismerhető a modern MVC‑s felépítés.  
A felelősségi körök teljesen szétváltak:

- **Model** – adatbázis műveletek  
- **View** – megjelenítés  
- **Controller** – üzleti logika  
- **Router** – útválasztás  
- **Database** – központi PDO kapcsolat  
- **index.php** – front controller  

---

**1. A Database osztály központosítja az adatbázis‑kapcsolatot**

A `database/Database.php` osztály:

- egyetlen helyen hozza létre a PDO kapcsolatot,
- Singleton‑szerűen működik,
- minden modell és controller ugyanazt a kapcsolatot használja,
- az index.php teljesen megtisztul az adatbázis‑logikától.

Ez a modern PHP alkalmazások egyik alapelve.

---

**2. A SubjectController átveszi az üzleti logikát**

A tantárgyakhoz tartozó műveletek (create, update, delete, find, listázás) mostantól külön controllerben vannak.  
Ez azt jelenti, hogy:

- a Router nem tartalmaz logikát,
- az index.php nem tartalmaz logikát,
- a Model nem tartalmaz megjelenítést,
- a View nem tartalmaz adatbázis műveleteket.

---

**3. A Router most már csak útválasztó**

A Router:

- felismeri a `page` paramétert,
- meghívja a megfelelő controller metódust,
- nem tartalmaz SQL-t,
- nem tartalmaz POST/GET feldolgozást.

---

**4. Az index.php végre teljesen tiszta**

Az index.php:

- betölti az osztályokat,
- lekéri a PDO kapcsolatot a Database osztálytól,
- meghívja a routert,
- meghívja a layoutot.

Nincs benne:

- SQL,
- HTML,
- üzleti logika,
- POST/GET feldolgozás.

Ez a modern front controller mintája.

---

**5. A Model és View réteg változatlan maradt**

Ez azt jelenti, hogy a V6-ban jól dolgoztunk:

- a Model tiszta és jól szervezett,
- a View tiszta és HTML‑központú,
- a LayoutView egységes megjelenést biztosít.

A 7. verzió csak a controller és az adatbázis réteget tisztította tovább.

---

**6. A projekt szerkezete professzionális szintre lépett**
