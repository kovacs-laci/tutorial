---
id: laravel-requests
slug: /laravel/requests
title: "Request osztályok és validáció"
---

# Request osztályok és validáció

A **FormRequest** osztályok a Laravelben lehetővé teszik, hogy a validációs logikát külön fájlokba szervezzük ki.

Ez különösen fontos nagyobb projektekben, mert:

- a controller tiszta marad
- a validáció újrahasználható
- a jogosultságkezelés külön kezelhető
- az alkalmazás szerkezete átláthatóbb lesz

---

## Szerepük az MVC-ben

- **Model (M):** csak a validált adatok kerülnek az adatbázisba.
- **Controller (C):** a controller a FormRequest által ellenőrzött adatokat kapja meg.
- **View (V):** a nézetben a validációs hibaüzenetek jelennek meg.

👉 Részletes dokumentáció:  
https://laravel.com/docs/12.x/validation#form-request-validation

---

# 1. FormRequest létrehozása

Példa a counties–cities rendszerben a City entitásra:

```bash
php artisan make:request CityRequest
````

Ez létrehozza:

```
app/Http/Requests/CityRequest.php
```

---

# 2. A `sometimes` szabály magyarázata

A `sometimes` kulcsszó azt jelenti:

> A mezőt csak akkor validáljuk, ha az szerepel a requestben.

Ez különösen hasznos:

* részleges frissítésnél (PUT / PATCH)
* amikor nem minden mező kötelező
* ha ugyanazt a Request osztályt használjuk create és update esetén

Ha a mező nincs benne a kérésben, a validáció nem fog hibát dobni.

---

# 3. Példa: CityRequest (közös Store és Update)

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Csak akkor validálódik, ha a mező benne van a requestben
            'name' => ['sometimes', 'string', 'max:255'],
            'zip_code' => ['sometimes', 'string', 'max:10'],

            // Kapcsolat ellenőrzése az 1:N relációban
            'county_id' => ['sometimes', 'exists:counties,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'A város neve csak szöveg lehet.',
            'name.max' => 'A város neve legfeljebb 255 karakter lehet.',
            'zip_code.string' => 'Az irányítószám csak szöveg lehet.',
            'zip_code.max' => 'Az irányítószám legfeljebb 10 karakter lehet.',
            'county_id.exists' => 'A kiválasztott megye nem létezik.',
        ];
    }
}
```

---

## Fontos megjegyzés

A `sometimes` használatával:

* **egy közös Request osztályt használhatunk**
* nem szükséges külön `StoreCityRequest` és `UpdateCityRequest`
* a validáció mégis rugalmas marad

---

# 4. Használat a Controllerben

```php
use App\Http\Requests\CityRequest;

public function store(CityRequest $request)
{
    City::create($request->validated());

    return redirect()->route('cities.index')
        ->with('status', 'Város sikeresen létrehozva!');
}

public function update(CityRequest $request, City $city)
{
    $city->update($request->validated());

    return redirect()->route('cities.index')
        ->with('status', 'Város sikeresen frissítve!');
}
```

### Mi történik itt?

* A validáció automatikusan lefut.
* Hibás adat esetén a Laravel visszairányít.
* A `validated()` csak a jóváhagyott mezőket adja vissza.
* A controller nem tartalmaz validációs logikát.

---

# 5. Hibaüzenetek megjelenítése Blade-ben

```blade
<form method="POST" action="{{ route('cities.store') }}">
    @csrf

    <input type="text" name="name" value="{{ old('name') }}">
    @error('name')
        <div class="error">{{ $message }}</div>
    @enderror

    <input type="text" name="zip_code" value="{{ old('zip_code') }}">
    @error('zip_code')
        <div class="error">{{ $message }}</div>
    @enderror

    <button type="submit">Mentés</button>
</form>
```

* `old()` → visszatölti a korábbi értéket
* `@error` → megjeleníti a hibaüzenetet

---

# 6. Hibaüzenetek lokalizálása

A hibaüzenetek testreszabhatók a:

```
resources/lang/hu/validation.php
```

Példa:

```php
return [
    'required' => 'A(z) :attribute mező kitöltése kötelező.',
    'string' => 'A(z) :attribute csak szöveg lehet.',
    'max' => [
        'string' => 'A(z) :attribute legfeljebb :max karakter lehet.',
    ],
    'attributes' => [
        'name' => 'város neve',
        'zip_code' => 'irányítószám',
        'county_id' => 'megye',
    ],
];
```

Így a rendszer automatikusan emberi nyelvű hibaüzeneteket ad.

---

# 7. Miért jó a FormRequest + sometimes kombináció?

* A controller tiszta marad.
* A validáció külön rétegben van.
* Egyetlen Request osztály elegendő.
* Rugalmas részleges frissítést tesz lehetővé.
* Professzionális, skálázható megoldás.

---

# 8. Összegzés

* A **FormRequest** a validáció elkülönítésére szolgál.
* A `sometimes` lehetővé teszi a rugalmas mezőkezelést.
* Counties–cities példában ez különösen jól használható.
* Egyetlen `CityRequest` osztály elegendő lehet.
* A controller így átlátható és tiszta marad.

