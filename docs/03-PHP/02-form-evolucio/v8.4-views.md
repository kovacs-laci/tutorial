---
id: v8-views
title: 8.4 ClassView és StudentView
sidebar_label: 8.4 Nézetek
slug: /form-evolucio/v8-views
---

# 8.4 ClassView és StudentView

A nézetek (View osztályok) felelősek a HTML megjelenítésért.  
A projektben minden modul saját View osztályt kapott (pl. SubjectView), ezért az **osztályok** és **diákok** kezeléséhez is külön nézeteket készítünk:

- **ClassView** – osztályok listázása, hozzáadása, módosítása  
- **StudentView** – diákok listázása, hozzáadása, módosítása  

Mindkét osztály a `LayoutView` által biztosított keretben jelenik meg.

Mindkét nézet **táblázatos** megjelenítést használ.

---

# 8.4.1 ClassView

A ClassView három fő funkciót lát el:

- osztályok listázása,
- új osztály hozzáadása,
- meglévő osztály módosítása.

A grade mező numerikus, 9–13 közötti értékkel.

## ClassView kódja

```php
<?php

class ClassView
{
    public static function list($classes)
    {
        echo "<h1>Osztályok</h1>";

        echo '<p><a href="index.php?page=add-class">Új osztály hozzáadása</a></p>';

        echo <<<HTML
        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Év</th>
                <th>Évfolyam</th>
                <th>Betűjel</th>
                <th>Műveletek</th>
            </tr>
        HTML;

        foreach ($classes as $c) {
            $id = $c['id'];
            $year = $c['year'];
            $grade = $c['grade'];
            $letter = htmlspecialchars($c['letter'], ENT_QUOTES, 'UTF-8');

            echo <<<HTML
                <tr>
                    <td>{$id}</td>
                    <td>{$year}</td>
                    <td>{$grade}</td>
                    <td>{$letter}</td>
                    <td>
                        <a href="index.php?page=edit-class&id={$id}">Módosítás</a> |
                        <a href="index.php?page=classes&delete={$id}"
                           onclick="return confirm('Biztos törlöd az osztályt?')">Törlés</a>
                    </td>
                </tr>
            HTML;
        }

        echo "</table>";
    }

    public static function addForm()
    {
        echo <<<HTML
        <h1>Új osztály hozzáadása</h1>

        <form method="post" action="index.php?page=classes">
            <label>Év:</label><br>
            <input type="number" name="year" min="2000" max="2100" required><br><br>

            <label>Évfolyam (grade):</label><br>
            <input type="number" name="grade" min="9" max="13" required><br><br>

            <label>Betűjel:</label><br>
            <input type="text" name="letter" maxlength="1" required><br><br>

            <button type="submit" name="add-class">Hozzáadás</button>
            <a href="index.php?page=classes">Mégse</a>
        </form>
        HTML;
    }

    public static function editForm($class)
    {
        $id = $class['id'];
        $year = $class['year'];
        $grade = $class['grade'];
        $letter = htmlspecialchars($class['letter'], ENT_QUOTES, 'UTF-8');

        echo <<<HTML
        <h1>Osztály módosítása</h1>

        <form method="post" action="index.php?page=classes">
            <input type="hidden" name="id" value="{$id}">

            <label>Év:</label><br>
            <input type="number" name="year" value="{$year}" min="2000" max="2100" required><br><br>

            <label>Évfolyam (grade):</label><br>
            <input type="number" name="grade" value="{$grade}" min="9" max="13" required><br><br>

            <label>Betűjel:</label><br>
            <input type="text" name="letter" value="{$letter}" maxlength="1" required><br><br>

            <button type="submit" name="update-class">Mentés</button>
            <a href="index.php?page=classes">Mégse</a>
        </form>
        HTML;
    }
}
```

---

# 8.4.2 StudentView

A StudentView feladata:

- diákok listázása egy adott osztályban,
- új diák hozzáadása,
- meglévő diák módosítása.

A listázás **táblázatos formában** történik.

## StudentView kódja

```php
<?php

class StudentView
{
    public static function list($students, $class)
    {
        $className = "{$class['year']} | {$class['grade']}{$class['letter']}";

        echo "<h1>Diákok – {$className} osztály</h1>";

        echo '<p><a href="index.php?page=add-student">Új diák hozzáadása</a></p>';

        echo <<<HTML
        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Születési dátum</th>
                <th>Műveletek</th>
            </tr>
        HTML;

        foreach ($students as $s) {
            $id = $s['id'];
            $name = htmlspecialchars($s['name'], ENT_QUOTES, 'UTF-8');
            $birthdate = $s['birthdate'];

            echo <<<HTML
                <tr>
                    <td>{$id}</td>
                    <td>{$name}</td>
                    <td>{$birthdate}</td>
                    <td>
                        <a href="index.php?page=edit-student&id={$id}">Módosítás</a> |
                        <a href="index.php?page=students&delete={$id}&class_id={$class['id']}"
                           onclick="return confirm('Biztos törlöd a diákot?')">Törlés</a>
                    </td>
                </tr>
            HTML;
        }

        echo "</table>";
    }

    public static function addForm($classes)
    {
        echo "<h1>Új diák hozzáadása</h1>";

        echo <<<HTML
        <form method="post" action="index.php?page=students">
            <label>Osztály:</label><br>
            <select name="class_id" required>
        HTML;

        foreach ($classes as $c) {
            $id = $c['id'];
            $label = "{$c['year']} | {$c['grade']}{$c['letter']}";
            echo "<option value='{$id}'>{$label}</option>";
        }

        echo <<<HTML
            </select><br><br>

            <label>Név:</label><br>
            <input type="text" name="name" required><br><br>

            <label>Születési dátum:</label><br>
            <input type="date" name="birthdate" required><br><br>

            <button type="submit" name="add-student">Hozzáadás</button>
            <a href="index.php?page=students">Mégse</a>
        </form>
        HTML;
    }

    public static function editForm($student, $classes)
    {
        $id = $student['id'];
        $name = htmlspecialchars($student['name'], ENT_QUOTES, 'UTF-8');
        $birthdate = $student['birthdate'];
        $currentClass = $student['class_id'];

        echo "<h1>Diák módosítása</h1>";

        echo <<<HTML
        <form method="post" action="index.php?page=students">
            <input type="hidden" name="id" value="{$id}">

            <label>Osztály:</label><br>
            <select name="class_id" required>
        HTML;

        foreach ($classes as $c) {
            $cid = $c['id'];
            $label = "{$c['year']} | {$c['grade']}{$c['letter']}";
            $selected = ($cid == $currentClass) ? "selected" : "";
            echo "<option value='{$cid}' {$selected}>{$label}</option>";
        }

        echo <<<HTML
            </select><br><br>

            <label>Név:</label><br>
            <input type="text" name="name" value="{$name}" required><br><br>

            <label>Születési dátum:</label><br>
            <input type="date" name="birthdate" value="{$birthdate}" required><br><br>

            <button type="submit" name="update-student">Mentés</button>
            <a href="index.php?page=students&class_id={$currentClass}">Mégse</a>
        </form>
        HTML;
    }
}
```

---

A következő fejezetben (8.5) a **Router** bővítése következik, hogy a ClassController és StudentController útvonalai is működjenek.