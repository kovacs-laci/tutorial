---
id: php-docker
slug: /php-alapok/docker
title: "PHP futtatása Dockerben"
sidebar_label: "Docker"
---

# PHP futtatása Dockerben

A Docker lehetővé teszi, hogy a PHP különálló, elkülönített környezetben fusson.  
A PHP futtatásához így nincs szükség a PHP telepítésére a gépen, mert a futtatókörnyezet a konténerben található.

---

## Előkészületek

A Docker használatához szükséges:

1. Docker Desktop telepítése  
2. Egy projektkönyvtár a gépen, amely a PHP‑fájlokat tartalmazza

A projektkönyvtár tartalma becsatolható a konténerbe, így a PHP a gépen lévő fájlokat futtatja.

---

## PHP futtatása konténerben

Egyszerű példa a beépített PHP webszerver indítására:

```bash
docker run -p 8000:8000 -v ${PWD}:/app php:8.2-cli php -S 0.0.0.0:8000 -t /app
```

### A parancs elemei

- `docker run` – új konténer indítása
- `-p 8000:8000` – a konténer 8000-es portja elérhető a gépen
- `-v ${PWD}:/app` – a jelenlegi könyvtár becsatolása a konténer `/app` könyvtárába
- `php:8.2-cli` – a hivatalos PHP 8.2 konténerkép
- `php -S 0.0.0.0:8000 -t /app` – a PHP beépített webszerverének indítása

A böngészőben a projekt elérhető:
```
http://localhost:8000
```

---

## PHP futtatása parancssorból

Egyszerű PHP‑fájl futtatása:

```bash
docker run -v ${PWD}:/app php:8.2-cli php /app/script.php
```

Interaktív PHP konzol:

```bash
docker run -it --rm php:8.2-cli php -a
```

Kilépés: `exit`

---

## Konténer leállítása

A konténer leállítása két módon történhet:

### Terminálban futó konténer

Ha a konténer a terminálban fut:

```
Ctrl + C
```

### Háttérben futó konténer

1. Futó konténerek listázása:

   ```bash
   docker ps
   ```

2. Leállítás:

   ```bash
   docker stop <container-id>
   ```

3. Törlés (opcionális):

   ```bash
   docker rm <container-id>
   ```

---

## Mi történik a fájlokkal és adatokkal?

A fájlok megmaradása attól függ, hogy a konténer használ-e volume‑ot.

### Composer által telepített fájlok

#### Ha a projektkönyvtár be van csatolva

Példa:

```bash
docker run -v ${PWD}:/app php:8.2-cli php -S 0.0.0.0:8000 -t /app
```

- a `vendor/` könyvtár a gépen jön létre
- a konténer leállítása után a fájlok megmaradnak
- a konténer törlése sem törli a fájlokat

#### Ha nincs volume

Példa:

```bash
docker run php:8.2-cli composer install
```

- a `vendor/` könyvtár a konténerben jön létre
- a konténer leállítása után a fájlok elvesznek
- a konténer törlése után semmi nem marad meg

### Adatbázis

#### Volume használata esetén

Példa:

```bash
docker run -v db_data:/var/lib/mysql mysql:8
```

- az adatbázis a gépen tárolódik
- a konténer leállítása után az adatok megmaradnak
- a konténer törlése után is megmaradnak

#### Volume nélkül

Példa:

```bash
docker run mysql:8
```

- az adatbázis a konténerben tárolódik
- a konténer leállítása után az adatok megmaradnak
- a konténer törlése után minden adat elveszik

---

## Összefoglaló

| Tárolás helye | Leállítás után | Törlés után |
|---------------|----------------|-------------|
| Volume (gép)  | Megmarad       | Megmarad    |
| Konténer      | Megmarad       | Elveszik    |

---

## Docker konfiguráció a projektben (docker-compose.yml)

A `docker-compose.yml` fájl lehetővé teszi, hogy a teljes környezet egyetlen paranccsal induljon.  
A fájl a projekt könyvtárába kerül.

### Példa konfiguráció

```yaml
version: "3.9"

services:
  php:
    image: php:8.2-apache
    container_name: php-app
    ports:
      - "8000:80"
    volumes:
      - ./src:/var/www/html
    depends_on:
      - db

  db:
    image: mysql:8
    container_name: php-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app
      MYSQL_USER: app
      MYSQL_PASSWORD: app
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin
    restart: always
    ports:
      - "8080:80"
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: root

volumes:
  db_data:
```

---

## A konfiguráció használata

### Indítás

```bash
docker compose up
```

Háttérben:

```bash
docker compose up -d
```

### Leállítás

```bash
docker compose down
```

A volume‑ok megmaradnak.

### Composer futtatása

```bash
docker compose exec php composer install
```

A `vendor/` könyvtár a gépen jön létre.

---

## Elérési pontok

- PHP alkalmazás:
  ```
  http://localhost:8000
  ```

- phpMyAdmin:
  ```
  http://localhost:8080
  ```
