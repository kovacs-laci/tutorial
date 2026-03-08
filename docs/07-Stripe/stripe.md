---
id: stripe
slug: /stripe
title: "Bankkártyás fizetés Stripe segítségével"
---

# Stripe Integrációs útmutató – FitGuide Projekt

## Készítette: Tahu István Szilárd, Szili (13p/2025) 

Ez a dokumentum lépésről lépésre bemutatja, hogyan lehet a Stripe-ot telepíteni és integrálni a projektbe.

---

## 1. Stripe CLI telepítése és konfigurálása (Windows példa)

1. Nyisd meg a hivatalos Stripe CLI letöltési oldalt: [https://docs.stripe.com/stripe-cli/install](https://docs.stripe.com/stripe-cli/install)
   - Válaszd ki a használt operációs rendszert (Linux, macOS, Windows...)

2. Windows esetén töltsd le a következő verziót: [Stripe CLI v1.34.0](https://github.com/stripe/stripe-cli/releases/tag/v1.34.0)

3. A letöltött `.zip` fájlt csomagold ki, és helyezd el a `C:\stripe` mappába.

4. Nyisd meg a Stripe Dashboardot, és regisztrálj/bejelentkezz: [https://dashboard.stripe.com/login](https://dashboard.stripe.com/login)

5. Kapcsold be a **Test mode** opciót felül a kezelőfelületen.

6. Navigálj a **Developers > API keys** menüpontra (bal oldalon alul található).
   - A **Secret key** (backend használja) és a **Publishable key** (frontend használja) értékét illeszd be a projekt `.env` fájljába így:

```env
STRIPE_SECRET=sk_test_...
STRIPE_KEY=pk_test_...
```

7. A projekt termináljában futtasd a Stripe CLI-t a következő paranccsal:

```bash
C:\stripe\stripe.exe listen --forward-to http://localhost:8000/webhooks/stripe
```

8. A parancs futtatása után ezt fogod látni:

```
> Ready! You are using Stripe API Version [2023-10-16]
> Your webhook signing secret is whsec_********************************
```

- A megjelenő `whsec_...` értéket másold ki és illeszd be az `.env` fájlba:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

9. Frissítsd a `config/services.php` fájlt a következő beállításokkal:

```php
'stripe' => [
    'key' => env('STRIPE_KEY'),
    'secret' => env('STRIPE_SECRET'),
    'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
],
```

---

## 2. Tesztelés Stripe CLI-vel

Futtasd a következő parancsot a sikeres fizetési esemény szimulálásához:

```bash
C:\stripe\stripe.exe trigger payment_intent.succeeded
```

Ez automatikusan meghívja a projektedben definiált webhook URL-t (`/webhooks/stripe`) a megfelelő tesztadatokkal.

---

## 3. Fontos megjegyzések

- A `.env` fájlban tárolt kulcsokat soha ne oszd meg.
- Tesztelés során mindig ellenőrizd a konzolban, hogy megérkeznek-e a webhook események.
- Éles környezetben kötelező a HTTPS használata webhookokhoz.
- A `stripe.exe` CLI eszköz lehet, hogy hamis pozitívként szerepel vírusirtókban – ez ismert jelenség.

---

## 4. Tesztkártyák fizetéshez

A Stripe tesztkörnyezetében a következő tesztkártya adatokkal lehet próbafizetéseket végezni:

### Általános sikeres fizetés:
- Kártyaszám: `4242 4242 4242 4242`
- Lejárat: bármilyen jövőbeli hónap/év (pl. `12/34`)
- CVC: bármilyen 3 számjegy (pl. `123`)
- Név: tetszőleges
- Ország: tetszőleges (pl. Magyarország)

### Egyéb tesztkártyák:
- Hibás kártya: `4000 0000 0000 0002` (elutasított fizetés)
- Elutasítás elégtelen fedezet miatt: `4000 0000 0000 9995`
- 3D Secure megerősítést igénylő: `4000 0025 0000 3155`

További tesztkártyák listája: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## 5. Stripe Checkout működése localhoston

A Stripe fizetési felület nem a projektben jelenik meg, hanem a Stripe által biztosított biztonságos weboldalon. A felhasználó oda kerül átirányításra, majd a fizetés után visszatér a projektedbe.

### Backend – Checkout Session létrehozása:

```js
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Teszt termék',
        },
        unit_amount: 1000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:8000/payment-success',
    cancel_url: 'http://localhost:8000/payment-cancel',
  });

  res.json({ id: session.id });
});
```
### Laravel verzió

Létre kell hozni a StripeCheckoutController-t:

```bash
php artisan make:controller StripeCheckoutController
```

`app\Http\Controllers\StripeCheckoutController.php`

```php
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
 
class StripeCheckoutController extends Controller
{
    public function create(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));
 
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Teszt termék',
                    ],
                    'unit_amount' => 1000,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => url('/payment-success'),
            'cancel_url' => url('/payment-cancel'),
        ]);
 
        return response()->json([
            'id' => $session->id,
        ]);
    }
}
```

web.php-ban meg kell adni a route-t

`routes/web.php`:
```php
use App\Http\Controllers\StripeCheckoutController;

Route::post('/create-checkout-session', [StripeCheckoutController::class, 'create']);
```


### Frontend – Átirányítás Stripe Checkout-ra:

```js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...'); 

async function redirectToCheckout(sessionId) {
  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId });
}
```
### Fontos tudnivalók:
- A fizetés a Stripe weboldalán történik, nem a projekteden belül.
- A `success_url` és `cancel_url` lehet `http://localhost...` – ez teszt módban működik.
- A Stripe CLI (`stripe listen`) gondoskodik arról, hogy a webhook események eljussanak a `localhost`-odra.