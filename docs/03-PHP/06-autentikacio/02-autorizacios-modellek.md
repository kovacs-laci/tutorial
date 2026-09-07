# Jogosultságkezelési modellek: RBAC, PBAC, ABAC

A jogosultságkezelés célja, hogy a rendszer meghatározza:

- ki férhet hozzá egy adott erőforráshoz,
- milyen műveleteket végezhet,
- milyen feltételek mellett.

A modern webalkalmazásokban három fő modell terjedt el:

- **RBAC** – Role-Based Access Control
- **PBAC** – Permission-Based Access Control
- **ABAC** – Attribute-Based Access Control

Mindhárom más logikát követ, más problémákra ad jó megoldást.

---

# 🎭 RBAC – Role-Based Access Control (Szerepkör alapú jogosultságkezelés)

## Lényege

A felhasználók **szerepköröket (role)** kapnak, és a szerepkörök határozzák meg a jogosultságokat.

```
Felhasználó → Szerepkör → Jogosultságok → Mit tehet?
```

## Példa szerepkörökre

- **admin** – teljes hozzáférés
- **editor** – tartalom létrehozása és módosítása
- **reader** – csak megtekintés

## Egyszerű PHP példa

```php
class Role {
    const ADMIN = 'admin';
    const EDITOR = 'editor';
    const READER = 'reader';
}

$userRole = Role::EDITOR;

if ($userRole === Role::ADMIN) {
    echo "Teljes hozzáférés";
} elseif ($userRole === Role::EDITOR) {
    echo "Szerkesztési jogok";
} else {
    echo "Csak olvasási jogok";
}
```

## Előnyök

- egyszerű, átlátható
- könnyen implementálható
- jól működik kis és közepes rendszerekben

## Hátrányok

- kevésbé rugalmas
- sok szerepkör esetén bonyolulttá válhat
- egyedi kivételek kezelése nehézkes

## Mikor ideális?

- adminfelületek
- blogok, CMS-ek
- iskolai rendszerek (tanár, diák, admin)

---

# 🧩 PBAC – Permission-Based Access Control (Jogosultság alapú modell)

## Lényege

A jogosultságok **nem szerepkörökhöz**, hanem **közvetlenül a felhasználókhoz** vagy funkciókhoz vannak rendelve.

A rendszer azt vizsgálja:

> Van-e engedélye a felhasználónak erre a műveletre?

## Példa jogosultságokra

- `create_post`
- `edit_post`
- `delete_post`
- `view_post`

## PHP példa

```php
$userPermissions = ['create_post', 'edit_post'];

function can($permission, $userPermissions) {
    return in_array($permission, $userPermissions);
}

if (can('delete_post', $userPermissions)) {
    echo "Törölhet";
} else {
    echo "Nincs törlési joga";
}
```

## Előnyök

- nagyon rugalmas
- finomhangolható
- egyedi kivételek könnyen kezelhetők

## Hátrányok

- több adminisztráció
- nehezebb átlátni nagy rendszerekben
- könnyebb hibázni (pl. túl sok jogot adni)

## Mikor ideális?

- nagy rendszerek
- SaaS alkalmazások
- sokféle művelet esetén

---

# 🧠 ABAC – Attribute-Based Access Control (Attribútum alapú modell)

## Lényege

A hozzáférést **szabályok és feltételek** alapján dönti el a rendszer.  
Nem csak a szerepkör számít, hanem bármilyen attribútum:

- felhasználó adatai
- erőforrás adatai
- időpont
- hely
- státusz
- csoporttagság

A döntés logikája:

> Engedélyezett ez a művelet, ha a feltételek teljesülnek?

## Példa

- A tanár csak a saját osztályának diákjait láthatja.
- A dokumentum csak munkaidőben érhető el (8:00–16:00).
- A felhasználó csak akkor tölthet le fájlt, ha a státusza „aktív”.

## PHP példa

```php
$user = [
    'role' => 'teacher',
    'class' => '10A',
];

$resource = [
    'type' => 'student_list',
    'class' => '10A',
];

$time = date('H');

function canAccess($user, $resource, $time) {
    if ($resource['type'] === 'student_list') {
        if ($user['role'] === 'teacher' && $user['class'] === $resource['class']) {
            return $time >= 8 && $time <= 16; // csak munkaidőben
        }
    }
    return false;
}

echo canAccess($user, $resource, $time)
    ? "Hozzáférés engedélyezve"
    : "Hozzáférés megtagadva";
```

## Előnyök

- rendkívül rugalmas
- összetett üzleti szabályok is kezelhetők
- automatizálható

## Hátrányok

- bonyolult implementáció
- nehéz tesztelni
- nehéz átlátni sok szabály esetén

## Mikor ideális?

- nagyvállalati rendszerek
- banki rendszerek
- oktatási platformok (tanár–diák–osztály logika)

---

# 🔍 A három modell összehasonlítása

| Modell | Mit használ? | Előny | Hátrány | Mikor jó? |
|-------|--------------|-------|---------|-----------|
| **RBAC** | szerepkörök | egyszerű, átlátható | kevésbé rugalmas | kisebb rendszerek |
| **PBAC** | jogosultságok | nagyon rugalmas | nehezebb kezelni | közepes–nagy rendszerek |
| **ABAC** | attribútumok + szabályok | legnagyobb rugalmasság | bonyolult | nagyvállalati, komplex rendszerek |

---

# 🏗 Kell-e adatbázis a szerepkörökhöz?

A válasz: **attól függ**.

## Nem szükséges adatbázis, ha:

- a szerepkörök fixek (admin, editor, reader),
- a rendszer kicsi,
- nincs szükség finomhangolt jogosultságokra.

Ilyenkor elegendő egy `role` mező a felhasználónál.

## Szükséges adatbázis, ha:

- a szerepkörök bővülhetnek,
- jogosultságok finomodnak,
- admin felületen szeretnéd kezelni a szerepköröket,
- permission alapú rendszerre váltasz,
- több szerepkör tartozhat egy felhasználóhoz.

## Példa egyszerű adatbázisos megoldásra

**roles tábla:**

```
id | name
--------------
1  | admin
2  | editor
3  | reader
```

**users tábla:**

```
id | name | email | role_id
```

**PHP lekérdezés:**

```php
$userRoleId = $user['role_id'];

$role = $db->query("SELECT name FROM roles WHERE id = $userRoleId")->fetchColumn();

if ($role === 'admin') {
    echo "Admin jogosultság";
}
```

---

# 🎓 Összefoglalás

- **RBAC**: szerepkörök alapján dönt → egyszerű, de kevésbé rugalmas.
- **PBAC**: konkrét jogosultságok alapján dönt → részletes, jól szabályozható.
- **ABAC**: feltételek és attribútumok alapján dönt → a legrugalmasabb, de a legbonyolultabb.
- A szerepkörök adatbázisban tárolása akkor indokolt, ha a rendszer bővülhet vagy finomhangolt jogosultságokra van szükség.
