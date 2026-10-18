---
id: pdo-tranzakciok-es-lapozas
slug: /php/pdo-lekerdezesek-crud/tranzakciok-es-lapozas
title: "Tranzakciók és lapozás"
---

# Tranzakciók és lapozás

## Tranzakció

Tranzakcióban több módosítást egyetlen egységként kezelünk. Hiba esetén minden módosítás visszavonható.

```php
$pdo->beginTransaction();

try {
    $pdo->prepare('INSERT INTO classes (name) VALUES (:name)')
        ->execute(['name' => $className]);
    $classId = (int) $pdo->lastInsertId();

    $pdo->prepare('UPDATE students SET class_id = :class_id WHERE id = :id')
        ->execute(['class_id' => $classId, 'id' => $studentId]);

    $pdo->commit();
} catch (Throwable $exception) {
    $pdo->rollBack();
    throw $exception;
}
```

## Lapozás

A lapozásnál az oldal- és elemszámot egész számmá alakítjuk, majd az SQL-be csak ellenőrzött érték kerül:

```php
$page = max(1, (int) ($_GET['page'] ?? 1));
$perPage = 10;
$offset = ($page - 1) * $perPage;

$sql = 'SELECT * FROM students ORDER BY name LIMIT :limit OFFSET :offset';
$stmt = $pdo->prepare($sql);
$stmt->bindValue('limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue('offset', $offset, PDO::PARAM_INT);
$stmt->execute();
```
