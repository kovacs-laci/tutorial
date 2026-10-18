---
id: pdo-joinok-es-lekerdezesek
slug: /php/pdo-lekerdezesek-crud/joinok-es-lekerdezesek
title: "JOIN-ok és összetettebb lekérdezések"
---

# JOIN-ok és összetettebb lekérdezések

A kapcsolódó táblák adatait `JOIN` segítségével kérdezhetjük le egyetlen eredményben.

```php
$sql = <<<'SQL'
    SELECT students.name AS student_name, classes.name AS class_name
    FROM students
    INNER JOIN classes ON classes.id = students.class_id
    WHERE classes.id = :class_id
    ORDER BY students.name
SQL;

$stmt = $pdo->prepare($sql);
$stmt->execute(['class_id' => $classId]);
$students = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

A felhasználótól érkező értékeket továbbra is paraméterként adjuk át. Az oszlopnevek és az SQL-szerkezet ne felhasználói bemenetből származzon.

## Szűrés és összesítés

A `WHERE` a sorokat szűri, a `GROUP BY` csoportosít, a `COUNT` pedig összesít:

```sql
SELECT class_id, COUNT(*) AS student_count
FROM students
GROUP BY class_id;
```
