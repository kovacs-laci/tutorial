---
id: v6-model-router
title: 6.0 Modellek és router bevezetése
sidebar_label: 6.0 Modellek és router
slug: /form-evolucio/v6-model-router
---

## 6.0 Modellek és router bevezetése

Az 5. verzióban a nézeteket már osztályokba szerveztük, és a layout is külön keretbe került.  
A 6. verzióban tovább tisztítjuk a projekt szerkezetét, és bevezetjük a modern PHP alkalmazások egyik legfontosabb mintáját:

- **Model réteg** (SubjectModel)
- **Router/Controller réteg** (Router)
- **Tiszta front controller** (index.php)

Ez a verzió már tényleg egy mini‑MVC alapja.

---

## Mi változott az 5. verzióhoz képest?

### 1. Megjelent a Model réteg (`models/SubjectModel.php`)
A tantárgyakhoz tartozó adatbázis műveletek mostantól külön osztályban vannak:

- `getAll()`
- `find($id)`
- `create($name)`
- `update($id, $name)`
- `delete($id)`

A controller többé nem ír SQL-t — ez a modern PHP egyik alapelve.

### 2. Megjelent a Router osztály (`controllers/Router.php`)
A router:

- átveszi a vezérlést az index.php-tól,
- eldönti, melyik oldal töltődjön be,
- meghívja a megfelelő View metódust,
- szükség esetén betölti a Modelt is.

Ez már tényleg egy **mini controller**.

### 3. Az index.php végre tiszta front controller
Az index.php:

- betölti az osztályokat,
- létrehozza a PDO-t,
- feldolgozza a POST/GET műveleteket,
- meghívja a routert,
- meghívja a layoutot.

Nincs benne HTML, nincs benne SQL — csak vezérlés.

### 4. A View réteg változatlan maradt
Ez azt jelenti, hogy a V5-ben jól dolgoztunk:

- a nézetek tiszták,
- a layout egységes,
- a SubjectView és HomeView jól szervezett.

### 5. A POST és GET műveletek most már a Modelt használják
Ahelyett, hogy SQL-t írnánk:

```php
$stmt = $pdo->prepare("INSERT INTO ...");
```

Most ezt csináljuk:

```php
$model = new SubjectModel($pdo);
$model->create($_POST['name']);
```

Ez tisztább, biztonságosabb, bővíthetőbb.

---

## Mi történik a V6-ban?

A V6 az első olyan verzió, ahol a projekt valóban **háromrétegűvé** válik:

- **Model** – adatbázis műveletek
- **View** – megjelenítés
- **Controller/Router** – vezérlés

Ez a modern PHP alkalmazások alapja.

---

**1. A Model réteg megjelenése – SubjectModel**

A `SubjectModel`:

- egy helyre gyűjti a tantárgyakkal kapcsolatos adatbázis műveleteket,
- tiszta, jól elnevezett metódusokat ad,
- leválasztja az SQL-t a vezérlésről.

---

**2. A Router osztály átveszi a controller szerepét**

A `Router`:

- átveszi a vezérlést az index.php-tól,
- eldönti, melyik oldal töltődjön be,
- meghívja a megfelelő View metódust,
- szükség esetén betölti a Modelt is.

---

**3. Az index.php végre tiszta front controller**

Az index.php:

- nem tartalmaz HTML-t,
- nem tartalmaz SQL-t,
- nem tartalmaz include-okat,
- csak vezérli a folyamatot.

Ez a modern PHP alkalmazások belépési pontja.

---

**4. A View réteg változatlan – és ez jó jel**

A `views/` mappa nem változott.

Ez azt jelenti:

- a nézetek már jók voltak,
- a layout már jó volt,
- a SubjectView és HomeView már tiszta volt.

A V6 csak a logikát szervezi át — a megjelenítés már rendben van.

---

**5. A projekt szerkezete most már tényleg MVC-szerű**

---

**6. A kód olvashatósága és bővíthetősége drasztikusan javult**

- A model könnyen bővíthető (pl. keresés, szűrés).
- A router könnyen bővíthető (pl. új oldalak).
- A view könnyen bővíthető (pl. új formok).
- Az index.php mindig tiszta marad.

Ez a verzió már valóban professzionális szerkezet.

## *A teljes V6 projekt kódja (index.php + Router + SubjectModel)*

A projekt szerkezete:

```
v6/
│
├── index.php
│
├── controllers/
│   └── Router.php
│
├── models/
│   └── SubjectModel.php
│
└── views/
    ├── LayoutView.php
    ├── HomeView.php
    └── SubjectView.php

```

A `views/` mappa **változatlan** maradt a V5-höz képest, ami tökéletesen mutatja, hogy a nézetréteg már stabil.

---

## **index.php**  
*Központi front controller + POST/GET feldolgozás + router + layout*

```php
<?php
require_once "views/LayoutView.php";
require_once "views/HomeView.php";
require_once "views/SubjectView.php";
require_once "models/SubjectModel.php";
require_once "controllers/Router.php";

$pdo = new PDO("mysql:host=localhost;dbname=school;charset=utf8", "root", "");

// --- POST feldolgozás
if (isset($_POST['add-subject'])) {
    $model = new SubjectModel($pdo);
    $model->create($_POST['name']);
    header("Location: index.php?page=subjects");
    exit;
}

if (isset($_POST['update-subject'])) {
    $model = new SubjectModel($pdo);
    $model->update($_POST['id'], $_POST['name']);
    header("Location: index.php?page=subjects");
    exit;
}

// --- GET törlés 
if (isset($_GET['delete'])) {
    $model = new SubjectModel($pdo);
    $model->delete($_GET['delete']);
    header("Location: index.php?page=subjects");
    exit;
}

// --- Router ---
$page = $_GET['page'] ?? 'home';
$router = new Router($pdo);

// --- Layout kezdete ---
LayoutView::head();
LayoutView::menu();

// --- Nézet meghívása ---
$router->handle($page);

// --- Layout vége ---
LayoutView::footer();
```

---

## **controllers/Router.php**
*A router dönti el, melyik oldal töltődjön be*

```php
<?php

class Router
{
    private PDO $pdo;
    private SubjectModel $subjectModel;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->subjectModel = new SubjectModel($pdo);
    }

    public function handle(string $page): void
    {
        switch ($page) {

            case 'subjects':
                $subjects = $this->subjectModel->getAll();
                SubjectView::list($subjects);
                break;

            case 'add-subject':
                SubjectView::addForm();
                break;

            case 'edit-subject':
                $id = $_GET['id'] ?? null;
                $subject = $this->subjectModel->find($id);
                SubjectView::editForm($subject);
                break;

            default:
                HomeView::render();
        }
    }
}
```

---

## **models/SubjectModel.php**
*A tantárgyakhoz tartozó adatbázis műveletek (CRUD)*

```php
<?php

class SubjectModel
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        return $this->pdo
            ->query("SELECT * FROM subjects ORDER BY id DESC")
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM subjects WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($name)
    {
        $stmt = $this->pdo->prepare("INSERT INTO subjects (name) VALUES (:name)");
        $stmt->execute(['name' => $name]);
    }

    public function update($id, $name)
    {
        $stmt = $this->pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id");
        $stmt->execute(['name' => $name, 'id' => $id]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM subjects WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}
```

---

## Mit tanultunk ebben a verzióban?

A 6. verzióban a projekt szerkezete elérte azt a pontot, ahol már valóban felismerhető a modern PHP alkalmazások felépítése.  
A kód három jól elkülönülő rétegre vált szét:

- **Model** – adatbázis műveletek  
- **View** – megjelenítés  
- **Controller/Router** – vezérlés  

---

**1. A Model réteg bevezetése (SubjectModel)**

A tantárgyakhoz tartozó adatbázis műveletek mostantól külön osztályban vannak:

- `getAll()`
- `find($id)`
- `create($name)`
- `update($id, $name)`
- `delete($id)`

A controller többé nem ír SQL-t — ez a modern PHP egyik legfontosabb alapelve.

---

**2. A Router osztály átveszi a controller szerepét**

A `Router`:

- átveszi a vezérlést az index.php-tól,
- eldönti, melyik oldal töltődjön be,
- meghívja a megfelelő View metódust,
- szükség esetén betölti a Modelt is.

Ez már tényleg egy **mini controller**, amely a keretrendszerek routing logikáját idézi.

---

**3. Az index.php végre tiszta front controller**

Az index.php:

- nem tartalmaz HTML-t,
- nem tartalmaz SQL-t,
- nem tartalmaz include-okat,
- csak vezérli a folyamatot.

Ez a modern PHP alkalmazások belépési pontja.

---

**4. A View réteg változatlan maradt — és ez jó jel**

A `views/` mappa nem változott a V5-höz képest.

Ez azt jelenti:

- a nézetek már jól szervezettek,
- a layout egységes,
- a SubjectView és HomeView tiszta, HTML‑központú.

A V6 csak a logikát szervezi át — a megjelenítés már rendben van.

---

**5. A kód olvashatósága és bővíthetősége drasztikusan javult**

- A model könnyen bővíthető (pl. keresés, szűrés).
- A router könnyen bővíthető (pl. új oldalak).
- A view könnyen bővíthető (pl. új formok).
- Az index.php mindig tiszta marad.

Ez a verzió már valóban professzionális szerkezet.
