---
id: dinamikus-weboldal
slug: /php/webes-mukodes/dinamikus-weboldal
title: "Dinamikus weboldal készítése"
---

Ebben a leckében azt tanulod meg, hogyan állít elő a PHP **adatok alapján változó HTML-t**. A korábbi leckékben megismert szuperglobális változók és űrlapok segítségével az adat érkezhet például a felhasználótól, de származhat tömbből vagy más szerveroldali forrásból is.

Fontos alapelv: a szerver állítja elő a HTML-t, a böngésző pedig a kész HTML választ jeleníti meg.

---

## 1. Mi az a dinamikus weboldal?

A dinamikus weboldal tartalma nem minden kérésnél ugyanaz: a PHP az adatok és a program logikája alapján állítja elő a választ.

Ez az adat lehet:

- egy változó vagy tömb;
- űrlapból érkező adat (`$_GET` vagy `$_POST`);
- sessionben tárolt adat;
- később adatbázisból vagy API-ból lekért adat.

Az adatokat mindig a megfelelő helyen kell ellenőrizni és a HTML-be írás előtt escape-elni. A szerveroldali validációról és a GET/POST kérésekről az előző leckék szólnak.

---

## 2. PHP és HTML együtt használva

Egyszerű oldalaknál átlátható megoldás, ha a HTML-t közvetlenül írjuk, és csak ott váltunk PHP-ra, ahol dinamikus értékre vagy logikára van szükség.

```php
<?php
$title = "Üdvözlünk!";
$name = "Anna";
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") ?></title>
</head>
<body>
    <h1><?= htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") ?></h1>
    <p>Szia, <?= htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") ?>!</p>
</body>
</html>
```

A `<?= ... ?>` rövid kiíró forma ugyanazt jelenti, mint az `<?php echo ...; ?>`. A HTML-válaszba kerülő dinamikus szöveget `htmlspecialchars()` függvénnyel escape-eljük.

Az `ENT_QUOTES` az idézőjeleket is átalakítja, az `ENT_SUBSTITUTE` pedig érvénytelen UTF-8 bájtok esetén helyettesítő karaktert használ. A megadott `"UTF-8"` a kimenet karakterkódolása. Ez a példa HTML-szöveghez és idézőjelek közé tett HTML-attribútumokhoz való; JavaScript-, CSS- vagy URL-környezetre külön szabályok érvényesek.

Például az alábbi bemenet nem fut le HTML-kódként:

```php
$name = '<script>alert("Hello")</script>';
echo htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
```

A böngészőben a tagek szövegként jelennek meg, nem végrehajtható kódként. Az escape-elés nem helyettesíti az adat validálását: a két lépés külön célt szolgál.

### HEREDOC használata

A HEREDOC akkor lehet hasznos, ha egy hosszabb szöveget PHP-változóban szeretnénk összeállítani. A HEREDOC **nem escape-eli automatikusan** a beillesztett adatokat, ezért a változókat előtte kell biztonságosan előkészíteni.

```php
<?php
$name = "Anna";
$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");

$html = <<<HTML
<h1>Üdvözlünk!</h1>
<p>Szia, {$safeName}!</p>
HTML;

echo $html;
?>
```

Ebben a példában a `$safeName` már HTML-szövegként biztonságosan beilleszthető. Attribútumértéknél is idézőjelek közé kell tenni a dinamikus értéket, és escape-elni kell.

---

## 3. Tartalom generálása tömbből

`foreach` ciklussal a tömb minden eleméhez előállíthatunk egy HTML-elemet.

```php
<?php
$fruits = ["Alma", "Banán", "Narancs"];
?>

<h2>Gyümölcsök</h2>
<ul>
    <?php foreach ($fruits as $fruit): ?>
        <li><?= htmlspecialchars($fruit, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") ?></li>
    <?php endforeach; ?>
</ul>
```

Az escape-elés itt minden elemnél szükséges: a tömb tartalma származhat később adatbázisból vagy felhasználói adatból is.

---

## 4. Feltételes tartalom

A PHP feltételek alapján más-más HTML-t jeleníthet meg.

```php
<?php
$isLoggedIn = false;
?>

<?php if ($isLoggedIn): ?>
    <p>Be vagy jelentkezve.</p>
<?php else: ?>
    <p>A folytatáshoz jelentkezz be.</p>
<?php endif; ?>
```

---

## 5. Tartalom kiválasztása GET paraméter alapján

Egy GET paraméter például kereséshez vagy szűréshez használható. A felhasználótól érkező kulcsot ne használjuk közvetlenül tömbindexként: előbb ellenőrizzük, hogy az engedélyezett értékek között szerepel-e.

Például az oldal a `?category=cars` címmel nyitható meg.

```php
<?php

$catalog = [
    "fruits" => ["Alma", "Banán", "Narancs"],
    "cars" => ["Audi", "BMW", "Tesla"]
];
$requestedCategory = $_GET["category"] ?? "fruits";
if (!is_string($requestedCategory) || !isset($catalog[$requestedCategory])) {
    $requestedCategory = "fruits";
}
$items = $catalog[$requestedCategory];
$listItems = "";
foreach ($items as $item) {
    $safeItem = htmlspecialchars($item, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
    $listItems .= "<li>{$safeItem}</li>\n";
}
$safeCategory = htmlspecialchars(
    $requestedCategory,
    ENT_QUOTES | ENT_SUBSTITUTE,
    "UTF-8"
);

echo <<<HTML
<h1>Kategória: {$safeCategory}</h1>

<ul>
    {$listItems}
</ul>
HTML;
```

Ebben a példában az `isset()` ellenőrzi, hogy a kért kategória megtalálható-e az előre megadott tömbben. Ismeretlen érték esetén a program biztonságos alapértelmezett kategóriára vált.

---

## 6. Mini projekt – terméklista

Az alábbi példa összekapcsolja a változókat, a tömböt, a ciklust és az escape-elést:

```php
<?php

$title = "Termékek";
$products = ["Laptop", "Egér", "Billentyűzet"];

$safeTitle = htmlspecialchars(
    $title,
    ENT_QUOTES | ENT_SUBSTITUTE,
    "UTF-8"
);

$content = "";

if (count($products) > 0) {
    $content .= "<ul>\n";

    foreach ($products as $product) {
        $safeProduct = htmlspecialchars(
            $product,
            ENT_QUOTES | ENT_SUBSTITUTE,
            "UTF-8"
        );

        $content .= "    <li>{$safeProduct}</li>\n";
    }

    $content .= "</ul>";
} else {
    $content = "<p>Jelenleg nincs megjeleníthető termék.</p>";
}

echo <<<HTML
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>{$safeTitle}</title>
</head>
<body>
    <h1>{$safeTitle}</h1>
    {$content}
</body>
</html>
HTML;
```

:::info 
Mikor érdemes Heredoc-ot használni? A Heredoc jól használható nagyobb HTML-részletek, e-mailek vagy sablonszerű szövegek generálására. Komplexebb weboldalaknál azonban általában célszerűbb külön PHP és HTML fájlokat vagy sablonmotorokat (például Blade-et) használni. 
:::

## Összefoglalás

- A PHP változókból, tömbökből és kérésadatokból állíthat elő dinamikus HTML-t.
- A HTML és PHP váltogatása alkalmas sablonok és listák áttekinthető megjelenítésére.
- A HEREDOC hasznos lehet hosszabb szövegek összeállításához, de nem escape-eli automatikusan a változókat.
- Minden, HTML-kimenetbe kerülő dinamikus szöveget a kiírás előtt escape-elni kell.
- A felhasználótól érkező értékeket ellenőrizni kell, mielőtt tömbök vagy más erőforrások kiválasztására használjuk.

További részletek: 
[GET és POST kérések](./02-get-post.md), 
[űrlapok validálása](./03-validacio.md) és 
[szuperglobális változók](./01-szuperglobalisok.md).

---