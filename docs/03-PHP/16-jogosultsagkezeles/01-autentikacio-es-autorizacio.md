---
id: autentikacio-es-autorizacio
slug: /php/jogosultsagkezeles/autentikacio-es-autorizacio
title: "Autentikáció és autorizáció"
---

# Autentikáció és autorizáció

Az autentikáció azt válaszolja meg, hogy ki a felhasználó. Az autorizáció azt, hogy az adott felhasználó mit tehet.

## Ellenőrzési folyamat

1. A sessionből kiolvassuk a bejelentkezett felhasználót.
2. Megkeressük az erőforrás tulajdonosát vagy a szükséges jogosultságot.
3. A szabály alapján engedélyezünk vagy `403 Forbidden` választ adunk.

A szerepkör önmagában nem helyettesíti az erőforrás-szintű ellenőrzést: egy szerkesztő sem módosíthat olyan rekordot, amelyhez nincs hozzáférése.
