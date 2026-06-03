# Ecommerce API & Frontend 🚀

Un sistema completo de ecommerce (Backend + Frontend) desarrollado para gestionar productos. El backend consume automáticamente la API externa de [FakeStoreAPI](https://fakestoreapi.com/) para obtener imágenes cuando se crean nuevos productos.

![Ecommerce Preview](./frontend/public/favicon.ico)

## 🌟 Características

- **Backend (Express.js):** API RESTful, validación con Joi, MySQL.
- **Frontend (Next.js):** App Router, TailwindCSS con diseño Glassmorphism, completamente responsivo.
- **Auto-Imágenes:** Al crear un producto sin imagen, el backend obtiene una automáticamente de una API externa.

## 🛠 Instalación Local

Para correr el proyecto localmente, asegúrate de tener **Node.js** y **MySQL** instalados.

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio-url>
cd examen3
```

### 2. Configurar Base de Datos MySQL
Asegúrate de que el servicio MySQL esté corriendo. No necesitas crear las tablas manualmente; el backend lo hará automáticamente, pero sí necesitas crear la base de datos (o configurar las credenciales).

### 3. Setup del Backend
```bash
cd backend
npm install
```

Renombra el archivo `.env.example` a `.env` y configura tus credenciales de MySQL:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña # (déjalo vacío si usas XAMPP/WAMP por defecto)
DB_NAME=ecommerce_db
```

Inicia el backend:
```bash
npm run dev
```

### 4. Setup del Frontend
Abre otra terminal:
```bash
cd frontend
npm install
```

Inicia el frontend:
```bash
npm run dev
```
Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 🌐 Guía de Despliegue (Deploy)

Para completar los requerimientos, necesitas desplegar ambas partes.

### Base de Datos en la Nube
Te recomiendo usar **Aiven** (MySQL gratuito) o **TiDB Serverless**. Obtén tus credenciales (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

### Despliegue del Backend (Render / Railway)
1. Sube este código a GitHub.
2. Ve a [Render](https://render.com/) o [Railway](https://railway.app/).
3. Crea un nuevo **Web Service** y conecta tu repositorio.
4. Directorio raíz (Root Directory): `backend`
5. Comando de Build: `npm install`
6. Comando de Start: `npm start`
7. Añade las **Variables de Entorno** (Environment Variables) que configuraste en tu `.env` (credenciales de tu DB en la nube).

### Despliegue del Frontend (Vercel)
1. Ve a [Vercel](https://vercel.com/) y conecta tu repositorio.
2. Elige el directorio `frontend` como el directorio raíz.
3. Vercel detectará automáticamente que es un proyecto de Next.js.
4. En **Environment Variables**, añade:
   - `NEXT_PUBLIC_API_URL` con la URL de tu backend en Render (ej. `https://mi-backend.onrender.com/api/productos`).
5. Haz clic en **Deploy**.

---

## 📡 Ejemplos de uso de la API (Backend)

La base URL de la API es `http://localhost:3001/api/productos` (localmente).

### 1. Listar Productos (GET)
```bash
curl -X GET http://localhost:3001/api/productos
```

### 2. Crear Producto (POST)
El backend auto-generará el `image_url` consumiendo FakeStore API.
```bash
curl -X POST http://localhost:3001/api/productos \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Teclado Mecánico",
    "descripcion": "Switches Red, RGB.",
    "precio": 45.99,
    "stock": 10
}'
```

### 3. Actualizar Producto (PUT)
```bash
curl -X PUT http://localhost:3001/api/productos/1 \
-H "Content-Type: application/json" \
-d '{
    "precio": 39.99
}'
```

### 4. Eliminar Producto (DELETE)
```bash
curl -X DELETE http://localhost:3001/api/productos/1
```
