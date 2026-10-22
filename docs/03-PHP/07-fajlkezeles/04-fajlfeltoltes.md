---
id: fajlfeltoltes
slug: /php/fajlkezeles/fajlfeltoltes
title: "Fájlfeltöltés"
---

A böngészőből érkező fájlokat a PHP a `$_FILES` szuperglobális tömbben teszi elérhetővé. A fájl először egy ideiglenes helyre kerül; ha a feldolgozás sikeres, a `move_uploaded_file()` függvénnyel helyezhetjük át a tárhelyünkre.

## Fájlfeltöltő űrlap

Az űrlapnak `POST` metódust és `enctype="multipart/form-data"` attribútumot kell használnia.

```html
<form method="POST" enctype="multipart/form-data">
    <label for="profile-picture">Válassz egy képet:</label>
    <input
        type="file"
        id="profile-picture"
        name="profilePicture"
        accept="image/jpeg,image/png,image/gif"
        required>
    <button type="submit">Feltöltés</button>
</form>
```

Az `accept` attribútum csak a fájlválasztóban megjelenő lehetőségeket szűri; nem biztonsági ellenőrzés. A szerveren is ellenőrizni kell a fájlt.

## A `$_FILES` mezői

Egy `profilePicture` nevű mező adatai a `$_FILES["profilePicture"]` tömbben érhetők el:

| Kulcs | Jelentés |
|---|---|
| `name` | A kliens által megadott eredeti fájlnév |
| `type` | A kliens által küldött MIME-típus; nem megbízható |
| `tmp_name` | A feltöltött fájl ideiglenes szerveroldali útvonala |
| `error` | A feltöltés eredményét jelző hibakód |
| `size` | A fájl mérete bájtban |

Az `error` mező `UPLOAD_ERR_OK` értéke jelzi a sikeres feltöltést. Más hibakód jelenthet például túl nagy fájlt, hiányzó fájlt vagy szerveroldali hibát. A PHP feltöltési méretkorlátait a `php.ini` beállításai is befolyásolják.

## A feltöltés ellenőrzése és áthelyezése

Az alábbi példa legfeljebb 2 MB-os JPEG, PNG vagy GIF képet fogad. A típus ellenőrzéséhez a fájl tartalmából dolgozó `finfo` osztályt használja, nem a kliens `type` mezőjére vagy az eredeti kiterjesztésre hagyatkozik. A mentett fájlnév véletlenszerű, így a kliens által küldött fájlnév nem kerül be útvonalként.

Hozd létre előre az `uploads` mappát a PHP-fájl mellett, és gondoskodj róla, hogy a PHP írni tudjon bele.

```php
<?php
$upload = $_FILES["profilePicture"] ?? null;

if (!is_array($upload)) {
    echo "Nem érkezett feltöltött fájl.";
    return;
}

if (
    !isset($upload["error"], $upload["size"], $upload["tmp_name"])
    || !is_int($upload["error"])
    || !is_int($upload["size"])
    || !is_string($upload["tmp_name"])
) {
    echo "A feltöltési adatok formátuma nem megfelelő.";
    return;
}

if ($upload["error"] !== UPLOAD_ERR_OK) {
    echo "A fájl feltöltése nem sikerült.";
    return;
}

$maximumSize = 2 * 1024 * 1024;
if ($upload["size"] > $maximumSize) {
    echo "A fájl legfeljebb 2 MB lehet.";
    return;
}

$fileInfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $fileInfo->file($upload["tmp_name"]);

$allowedTypes = [
    "image/jpeg" => "jpg",
    "image/png" => "png",
    "image/gif" => "gif",
];

if (!is_string($mimeType) || !isset($allowedTypes[$mimeType])) {
    echo "Csak JPEG, PNG vagy GIF kép tölthető fel.";
    return;
}

$extension = $allowedTypes[$mimeType];
$fileName = bin2hex(random_bytes(16)) . "." . $extension;
$uploadPath = __DIR__ . "/uploads/" . $fileName;

if (!move_uploaded_file($upload["tmp_name"], $uploadPath)) {
    echo "A fájl mentése nem sikerült.";
    return;
}

echo "A kép feltöltése sikeres.";
```

A `move_uploaded_file()` ellenőrzi, hogy a forrás valóban HTTP-feltöltésből származó ideiglenes fájl-e, és csak ezután helyezi át. A visszatérési értékét is ellenőrizzük, mert a mentés meghiúsulhat például jogosultsági vagy útvonalhiba miatt.

## A feltöltött kép megjelenítése

Ha az `uploads` mappa a webhelyről elérhető, a sikeres mentés után megjeleníthetjük a képet. A `src` értékét a szerver által generált fájlnévből állítjuk össze:

```php
$imageUrl = "uploads/" . rawurlencode($fileName);

echo '<img src="' . htmlspecialchars(
    $imageUrl,
    ENT_QUOTES | ENT_SUBSTITUTE,
    "UTF-8"
) . '" alt="Feltöltött kép">';
```

Nagyobb alkalmazásokban a fájlokat célszerű a webes dokumentumgyökéren kívül tárolni, és ellenőrzött kiszolgáló útvonalon keresztül elérhetővé tenni.

## Fontos biztonsági szempontok

- Ne bízz a kliens által küldött fájlnévben, kiterjesztésben vagy MIME-típusban.
- Korlátozd a megengedett fájltípusokat és a méretet; csak arra a fájltípusra legyen engedély, amelyre az alkalmazásnak valóban szüksége van.
- Használj szerveroldalon generált fájlnevet, és ellenőrizd a `move_uploaded_file()` eredményét.
- A feltöltött mappában ne lehessen feltöltött fájlokat szerverkódként végrehajtani. Éles alkalmazásban a dokumentumgyökéren kívüli tárolás és a jogosultságok gondos beállítása ajánlott.
- A fájlok böngészőben való megjelenítése előtt gondold át, kik férhetnek hozzájuk; a feltöltés és a jogosultság-ellenőrzés külön feladat.

## Gyakorlófeladatok

1. Készíts űrlapot, amely egy képet küld a szervernek.
2. Kezeld azt az esetet, amikor nem érkezik fájl vagy a feltöltés hibakóddal zárul.
3. Korlátozd a feltöltött fájl méretét 1 MB-ra.
4. Engedélyezz csak JPEG és PNG képeket, és mentsd őket generált fájlnévvel.
5. Jeleníts meg hibaüzenetet, ha a fájl mentése sikertelen.
