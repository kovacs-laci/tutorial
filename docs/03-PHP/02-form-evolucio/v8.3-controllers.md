---
id: v8-controllers
title: 8.3 ClassController és StudentController
sidebar_label: 8.3 Controllerek
slug: /form-evolucio/v8-controllers
---

# 8.3 ClassController és StudentController

A modellek elkészítése után a következő lépés a **controller réteg** felépítése. A controllerek feladata, hogy:

- fogadják a felhasználói kéréseket (GET, POST),
- meghívják a megfelelő modellek metódusait,
- kiválasszák a megfelelő nézetet (View),
- kezeljék az AJAX/fetch/async végpontokat.

Ebben a fejezetben két új controllert készítünk:

- **ClassController** – az osztályok kezeléséhez  
- **StudentController** – a diákok kezeléséhez  

Mindkettő a SubjectController mintájára épül, így egy ismerős szerkezetet követnek.

---

# 8.3.1 ClassController

A ClassController feladatai:

- osztályok listázása,
- új osztály hozzáadása,
- meglévő osztály módosítása,
- osztály törlése,
- AJAX végpontok kiszolgálása:
  - évszámok lekérése (`fetch-years`)
  - adott év osztályainak lekérése (`fetch-classes-by-year`)

## ClassController kódja

```php
<?php

class ClassController
{
    private ClassModel $model;

    public function __construct(PDO $pdo)
    {
        $this->model = new ClassModel($pdo);
    }

    public function handleRequest(string $page)
    {
        // --- POST műveletek ---
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            if (isset($_POST['add-class'])) {
                $this->model->create($_POST['year'], $_POST['grade'], $_POST['letter']);
                header("Location: index.php?page=classes");
                exit;
            }

            if (isset($_POST['update-class'])) {
                $this->model->update($_POST['id'], $_POST['year'], $_POST['grade'], $_POST['letter']);
                header("Location: index.php?page=classes");
                exit;
            }
        }

        // --- GET törlés ---
        if (isset($_GET['delete'])) {
            $this->model->delete($_GET['delete']);
            header("Location: index.php?page=classes");
            exit;
        }

        // --- AJAX végpontok ---
        if ($page === 'fetch-years') {
            echo json_encode(['years' => $this->model->getYears()]);
            exit;
        }

        if ($page === 'fetch-classes-by-year') {
            $year = $_GET['year'] ?? null;
            echo json_encode(['classes' => $this->model->getClassesByYear($year)]);
            exit;
        }

        // --- Nézetek ---
        switch ($page) {

            case 'classes':
                $classes = $this->model->getAll();
                ClassView::list($classes);
                break;

            case 'add-class':
                ClassView::addForm();
                break;

            case 'edit-class':
                $class = $this->model->find($_GET['id']);
                ClassView::editForm($class);
                break;
        }
    }
}
```

---

# 8.3.2 StudentController

A StudentController feladatai:

- diákok listázása egy adott osztályban,
- új diák hozzáadása,
- meglévő diák módosítása,
- diák törlése,
- AJAX végpont:
    - adott osztály diákjainak lekérése (`fetch-students-by-class`)

## StudentController kódja

```php
<?php

class StudentController
{
    private StudentModel $model;
    private ClassModel $classModel;

    public function __construct(PDO $pdo)
    {
        $this->model = new StudentModel($pdo);
        $this->classModel = new ClassModel($pdo);
    }

    public function handleRequest(string $page)
    {
        // --- POST műveletek ---
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            if (isset($_POST['add-student'])) {
                $this->model->create($_POST['class_id'], $_POST['name'], $_POST['birthdate']);
                header("Location: index.php?page=students&class_id=" . $_POST['class_id']);
                exit;
            }

            if (isset($_POST['update-student'])) {
                $this->model->update($_POST['id'], $_POST['class_id'], $_POST['name'], $_POST['birthdate']);
                header("Location: index.php?page=students&class_id=" . $_POST['class_id']);
                exit;
            }
        }

        // --- GET törlés ---
        if (isset($_GET['delete'])) {
            $this->model->delete($_GET['delete']);
            header("Location: index.php?page=students&class_id=" . $_GET['class_id']);
            exit;
        }

        // --- AJAX végpont ---
        if ($page === 'fetch-students-by-class') {
            $classId = $_GET['id'] ?? null;
            echo json_encode(['students' => $this->model->getByClass($classId)]);
            exit;
        }

        // --- Nézetek ---
        switch ($page) {

            case 'students':
                $classId = $_GET['class_id'] ?? null;
                $students = $this->model->getByClass($classId);
                $class = $this->classModel->find($classId);
                StudentView::list($students, $class);
                break;

            case 'add-student':
                $classes = $this->classModel->getAll();
                StudentView::addForm($classes);
                break;

            case 'edit-student':
                $student = $this->model->find($_GET['id']);
                $classes = $this->classModel->getAll();
                StudentView::editForm($student, $classes);
                break;
        }
    }
}
```

---

# Mit építünk tovább?

A következő fejezetben (8.4) elkészítjük a **ClassView** és **StudentView** osztályokat, amelyek HTML‑t generálnak:

- osztályok listája,
- diákok listája,
- űrlapok hozzáadáshoz és módosításhoz.

Ezután következik a Router bővítése (8.5).
