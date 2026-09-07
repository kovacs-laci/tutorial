---
id: pdo-lekerdezesek
slug: /php-alapok/pdo-lekerdezesek
title: "Lekérdezések és prepared statementek"
---

# Lekérdezések és prepared statementek

A PDO egyik legnagyobb előnye a **prepared statement**, amely megakadályozza az SQL injection támadásokat.  
Ebben a fejezetben minden példában **nevesített paramétereket** használunk.

---

# SELECT lekérdezés (egyszerű)

```php
$sql = "SELECT * FROM diakok";
$stmt = $pdo->query($sql);

foreach ($stmt as $sor) {
    echo $sor["nev"] . " - " . $sor["kor"] . "<br>";
}
```

---

# SELECT nevesített paraméterrel

```php
$sql = "SELECT * FROM diakok WHERE kor > :kor";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":kor" => 15
]);

$eredmeny = $stmt->fetchAll();

foreach ($eredmeny as $sor) {
    echo $sor["nev"] . "<br>";
}
```

---

# INSERT (nevesített paraméterekkel)

```php
$sql = "INSERT INTO diakok (nev, kor) 
        VALUES (:nev, :kor)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nev" => "Kata",
    ":kor" => 16
]);
```

---

# UPDATE (nevesített paraméterekkel)

```php
$sql = "UPDATE diakok 
        SET nev = :nev, kor = :kor 
        WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nev" => "Béla",
    ":kor" => 17,
    ":id"  => 3
]);
```

---

# DELETE (nevesített paraméterrel)

```php
$sql = "DELETE FROM diakok WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":id" => 5
]);
```

---

# fetch() és fetchAll()

```php
$stmt = $pdo->query("SELECT * FROM diakok");

$egySor = $stmt->fetch();      // egy sor
$osszes = $stmt->fetchAll();   // összes sor
```

---

# Gyakorlófeladatok

1. Írj SELECT lekérdezést, amely csak a 18 év feletti diákokat listázza.
2. Adj hozzá új diákot az adatbázishoz nevesített paraméterekkel.
3. Módosítsd egy diák életkorát.
4. Törölj egy diákot az adatbázisból.
5. Írd ki a diákok számát (`COUNT(*)`).

---

## Megjegyzés

- Érdemes utánanézni a `bindParam()` és `bindValue()` különbségének.
- Lásd még: tranzakciók (`beginTransaction()`).
