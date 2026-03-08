---
id: szuperglobalisok
slug: /php-alapok/szuperglobalisok
title: "Szuperglobális változók"
---

# Szuperglobális változók

A PHP több előre definiált tömböt biztosít, amelyek mindenhol elérhetők.  
Ezeket nevezzük **szuperglobálisoknak**.

---

# `$_GET`

GET metódussal érkező adatok.

```php
echo $_GET["kereses"];
```

---

# `$_POST`

POST metódussal érkező adatok.

```php
echo $_POST["uzenet"];
```

---

# `$_REQUEST`

GET + POST együtt (nem ajánlott biztonsági okokból).

```php
echo $_REQUEST["nev"];
```

---

# `$_SERVER`

A szerverrel kapcsolatos információk.

```php
echo $_SERVER["REQUEST_METHOD"];
echo $_SERVER["HTTP_USER_AGENT"];
```

---

# `$_SESSION`

Munkamenet adatok tárolása.

```php
session_start();
$_SESSION["nev"] = "László";
```

---

# `$_COOKIE`

Kisebb adatok tárolása a böngészőben.

```php
setcookie("szin", "kek", time() + 3600);
```

---

# `$_FILES`

Fájlok feltöltésekor használjuk.

```php
echo $_FILES["dokumentum"]["name"];
```

---

# Gyakorlófeladatok

1. Írd ki a böngésző típusát `$_SERVER["HTTP_USER_AGENT"]` segítségével.
2. Készíts egyszerű session példát (név tárolása).
3. Készíts cookie-t, amely 1 órán át tárol egy színt.
4. Készíts fájlfeltöltő űrlapot, és írd ki a feltöltött fájl nevét.

---

## Megjegyzés

- Érdemes utánanézni a session és cookie különbségeinek.
- Lásd még: HTTP állapotmentesség, munkamenetkezelés.
