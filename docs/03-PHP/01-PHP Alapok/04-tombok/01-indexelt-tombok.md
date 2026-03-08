---
id: indexelt-tombok
slug: /php-alapok/indexelt-tombok
title: "Indexelt tömbök"
---

# Indexelt tömbök

A tömbök több érték tárolására alkalmasak egyetlen változóban.  
Az indexelt tömbök elemei **számozott indexekkel** érhetők el, 0-tól kezdődően.

---

# Tömb létrehozása

```php
$szamok = [10, 20, 30, 40];
```

Ugyanez hosszabb formában:

```php
$szamok = array(10, 20, 30, 40);
```

---

# Elem elérése

```php
echo $szamok[0]; // 10
echo $szamok[2]; // 30
```

---

# Elem módosítása

```php
$szamok[1] = 25;
```

---

# Új elem hozzáadása

```php
$szamok[] = 50;
```

---

# Tömb bejárása

```php
$gyumolcsok = ["alma", "körte", "szilva"];

foreach ($gyumolcsok as $gyumolcs) {
    echo $gyumolcs . "<br>";
}
```

---

# Gyakorlófeladatok

1. Hozz létre egy tömböt 5 kedvenc filmed címével, majd írd ki őket.
2. Készíts egy tömböt 1–10 közötti számokkal, majd írd ki a harmadik elemet.
3. Adj hozzá egy új elemet egy meglévő tömbhöz.
4. Írd ki egy tömb összes elemét `foreach` segítségével.

---

## Megjegyzés

- Érdemes utánanézni a tömbök memóriakezelésének PHP-ben.
- Lásd még: `count()`, `var_dump()`, `print_r()`.
