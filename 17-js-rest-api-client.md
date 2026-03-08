---
id: js-rest-api-client
slug: /js-rest-api-client
title: "JavaScript REST API kliens és frontend"
---

# JavaScript REST API kliens és frontend

Ebben a fejezetben egy **JavaScript kliens osztályt** készítünk a korábban kidolgozott **Product REST API**‑hoz, majd bemutatjuk, hogyan lehet egy egyszerű **HTML + JS frontend** segítségével meghívni a végpontokat.

---

## 1. JavaScript kliens osztály (`apiClient.js`)

```javascript
class ApiClient {
    constructor(baseUrl, token = null) {
        this.baseUrl = baseUrl; // pl. http://localhost:8000/api
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP error ${response.status}`);
        }

        return response.json();
    }

    // --- Product endpoints ---

    async getProducts(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/products${query ? '?' + query : ''}`, 'GET');
    }

    async getProduct(id) {
        return this.request(`/products/${id}`, 'GET');
    }

    async createProduct(data) {
        return this.request('/products', 'POST', data);
    }

    async updateProduct(id, data) {
        return this.request(`/products/${id}`, 'PUT', data);
    }

    async deleteProduct(id) {
        return this.request(`/products/${id}`, 'DELETE');
    }

    // --- User endpoints ---

    async login(email, password) {
        const result = await this.request('/users/login', 'POST', { email, password });
        if (result.user?.token) {
            this.setToken(result.user.token);
        }
        return result;
    }

    async getUsers() {
        return this.request('/users', 'GET');
    }
}
```

### Magyarázat
- **`ApiClient` osztály**: tartalmazza az összes REST API végpontot.
- **`request()` metódus**: általános `fetch` wrapper, kezeli a fejlécet, tokent és hibákat.
- **CRUD metódusok**: `getProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`.
- **Autentikáció**: `login()` beállítja a tokent, amelyet a további hívásokhoz használ.

---

## 2. HTML + JS frontend (`index.html`)

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Product REST API kliens</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; }
        button { margin: 0.5rem; padding: 0.5rem 1rem; }
        #output { margin-top: 1rem; white-space: pre-wrap; background: #f4f4f4; padding: 1rem; }
    </style>
</head>
<body>
    <h1>Product REST API kliens</h1>

    <div>
        <button id="listProducts">Listázás</button>
        <button id="createProduct">Új termék létrehozása</button>
    </div>

    <div id="output">Kimenet itt jelenik meg...</div>

    <script src="apiClient.js"></script>
    <script>
        const client = new ApiClient('http://localhost:8000/api');

        // Automatikus login induláskor
        async function login() {
            try {
                const result = await client.login('user@example.com', '12345678');
                document.getElementById('output').textContent = 'Login sikeres: ' + JSON.stringify(result, null, 2);
            } catch (err) {
                document.getElementById('output').textContent = 'Login hiba: ' + err.message;
            }
        }

        // Termékek listázása
        document.getElementById('listProducts').addEventListener('click', async () => {
            try {
                const products = await client.getProducts();
                document.getElementById('output').textContent = 'Products:\n' + JSON.stringify(products, null, 2);
            } catch (err) {
                document.getElementById('output').textContent = 'Hiba: ' + err.message;
            }
        });

        // Új termék létrehozása
        document.getElementById('createProduct').addEventListener('click', async () => {
            try {
                const newProduct = await client.createProduct({
                    category: 'Electronics',
                    name: 'Tablet',
                    description: 'A new tablet device',
                    picture: 'http://example.com/tablet.png',
                    price: 50000,
                    stock: 10,
                });
                document.getElementById('output').textContent = 'Created product:\n' + JSON.stringify(newProduct, null, 2);
            } catch (err) {
                document.getElementById('output').textContent = 'Hiba: ' + err.message;
            }
        });

        login();
    </script>
</body>
</html>
```

### Magyarázat
- **Login**: induláskor automatikusan bejelentkezik a kliens a tesztfelhasználóval, és elmenti a tokent.
- **Listázás gomb**: meghívja a `getProducts()` metódust, és kiírja a JSON választ.
- **Új termék létrehozása gomb**: meghívja a `createProduct()` metódust, és kiírja a létrehozott terméket.
- **Kimenet**: a `#output` div‑ben jelenik meg a JSON válasz szépen formázva.

---

## 3. Összegzés

- A `ApiClient` osztály általános kliens, amely a REST API végpontokat kezeli.
- A `fetch` API segítségével hívja meg a végpontokat, kezeli a hibákat és a tokent.
- A HTML frontend egyszerű gombokkal mutatja be a kliens használatát.
- A példából létható, hogyan lehet JavaScriptből közvetlenül kommunikálni a Laravel REST API‑val.
