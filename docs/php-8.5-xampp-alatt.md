---
id: xampp-php85
slug: /xampp-with-php-85
title: "XAMPP + PHP 8.5"
---
# XAMPP + PHP 8.5 + Apache Lounge (OpenSSL 3.x) frissítési checklist

Ez a checklist azt írja le, hogyan lehet XAMPP alatt **kézzel frissített PHP 8.5**‑öt működésre bírni úgy, hogy az Apache is elinduljon, és ne legyen `ssl_get0_group_name` vagy `ee key too small` hiba.

---

## **1. Apache Lounge letöltése**
- Nyisd meg: [https://www.apachelounge.com/download/](https://www.apachelounge.com/download/)
- Töltsd le a legfrissebb **Apache 2.4.x Win64 VS17/VS18** ZIP csomagot (OpenSSL 3.x‑szel).

---

## **2. XAMPP Apache könyvtárainak átnevezése (nem törlés!)**
Menj ide:

```
D:\xampp\apache\
```

És nevezd át az alábbi mappákat:

| Eredeti | Új név |
|--------|--------|
| `bin` | `bin_backup` |
| `modules` | `modules_backup` |
| `include` | `include_backup` |
| `lib` | `lib_backup` |

Ez biztonságos, bármikor visszaállítható.

---

## **3. Apache Lounge könyvtárak bemásolása**
A letöltött Apache ZIP-ből másold be a következő mappákat a XAMPP `apache` könyvtárába:

- `bin`
- `modules`
- `include`
- `lib`

Így a XAMPP most már az új Apache‑ot használja.

---

## **4. SSL mappák létrehozása (mert az Apache Lounge nem tartalmazza)**
Menj ide:

```
D:\xampp\apache\conf\
```

Hozd létre kézzel:

```
ssl.key
ssl.crt
```

---

## **5. Új, erős (2048 bites) SSL kulcs és tanúsítvány generálása**
A PHP saját OpenSSL‑ét használjuk, mert az biztosan működik.

Admin jogú CMD:

```
cd D:\xampp\php
```

### 🔑 Privát kulcs:
```
openssl genrsa -out ..\apache\conf\ssl.key\server.key 2048
```

### 📜 Tanúsítvány:
```
openssl req -new -x509 -key ..\apache\conf\ssl.key\server.key -out ..\apache\conf\ssl.crt\server.crt -days 3650
```

**Fontos:**  
Amikor a CN-t kérdezi:

```
Common Name (e.g. server FQDN or YOUR name):
```

Írd be:

```
localhost
```

Ha üres vagy pont → Apache nem fogja elfogadni.

---

## **6. SSL útvonalak ellenőrzése**
Nyisd meg:

```
D:\xampp\apache\conf\extra\httpd-ssl.conf
```

Ellenőrizd, hogy ez a két sor így néz ki:

```
SSLCertificateFile "D:/xampp/apache/conf/ssl.crt/server.crt"
SSLCertificateKeyFile "D:/xampp/apache/conf/ssl.key/server.key"
```

Ha nem → javítsd.

---

## **7. Apache indítása**
Indítsd el a XAMPP Control Panelben az Apache‑ot.

Ha minden lépés helyes:

- Apache indul
- PHP 8.5 működik
- cURL működik
- Laravel működik
- nincs többé OpenSSL vagy DLL ütközés

---

## **8. (Opcionális) Visszaállítás**
Ha valami gond lenne:

- nevezd vissza a `bin_backup` → `bin`
- nevezd vissza a `modules_backup` → `modules`
- stb.

A rendszer azonnal visszaáll a XAMPP eredeti Apache‑ára.

---

# 🎓 **Ez a checklist oktatásra készült**
- minden lépés biztonságos (nincs törlés),
- a folyamat reprodukálható,
- a végén modern Apache + modern PHP + modern OpenSSL fut XAMPP alatt.
