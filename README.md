# Examen 3: Sistema de Gestión de Productos (Monorepo)

Este proyecto es una aplicación web full-stack diseñada para la gestión de productos, estructurada en un monorepo que integra un backend desarrollado con **Node.js/Express** y un frontend construido con **Next.js**.

El sistema utiliza una base de datos **MySQL alojada en Aiven** y cuenta con una integración automática con **FakeStoreAPI**, permitiendo asignar imágenes dinámicamente a los productos según su nombre.

---

## Despliegue (Live Demo)

* **Frontend (Vercel):** https://frontend-eight-kappa-30.vercel.app
* **Backend (Render):** https://coleccion-de-productos-apiimage.onrender.com

---

## Stack Tecnológico

### Backend (`/backend`)

* **Framework:** Express.js
* **Base de Datos:** MySQL (`mysql2/promise`)
* **Validación:** Joi
* **Logs:** Morgan
* **Integración Externa:** FakeStoreAPI
* **Despliegue:** Render

### Frontend (`/frontend`)

* **Framework:** Next.js (App Router)
* **Estilos:** Tailwind CSS
* **Funcionalidad:** Interfaz para gestión completa de productos mediante operaciones CRUD
* **Despliegue:** Vercel

---

## Características Principales

* Crear productos.
* Listar productos.
* Buscar productos por ID.
* Actualizar productos.
* Eliminar productos.
* Persistencia de datos en MySQL.
* Validación de datos mediante Joi.
* Obtención automática de imágenes desde FakeStoreAPI.
* Arquitectura monorepo.
* Interfaz responsiva desarrollada con Tailwind CSS.

---

## Modelo de Datos

Tabla: `productos`

| Campo       | Tipo          | Restricciones               |
| ----------- | ------------- | --------------------------- |
| id          | INT           | PRIMARY KEY, AUTO_INCREMENT |
| nombre      | VARCHAR(255)  | NOT NULL                    |
| descripcion | TEXT          | NULL                        |
| precio      | DECIMAL(10,2) | NOT NULL                    |
| stock       | INT           | NOT NULL                    |
| imagen_url  | VARCHAR(255)  | NULL                        |

---

## Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd examen3
```

### 2. Configurar el Backend

Ingresar al directorio del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env`:

```env
PORT=3001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=ecommerce_db
DB_PORT=3306
```

Ejecutar el servidor:

```bash
npm run dev
```

---

### 3. Configurar el Frontend

Abrir una nueva terminal:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## API REST

### Obtener todos los productos

**GET**

```http
/api/productos
```

**Respuesta**

```json
[
  {
    "id": 1,
    "nombre": "Producto",
    "descripcion": "Descripción",
    "precio": 10.5,
    "stock": 5,
    "imagen_url": "https://..."
  }
]
```

---

### Obtener producto por ID

**GET**

```http
/api/productos/:id
```

---

### Crear producto

**POST**

```http
/api/productos
```

**Body**

```json
{
  "nombre": "Logitech G PRO Keyboard",
  "descripcion": "Teclado mecánico RGB",
  "precio": 129.50,
  "stock": 8
}
```

**Proceso interno**

1. El backend recibe la solicitud.
2. Busca una imagen relacionada en FakeStoreAPI.
3. Obtiene una URL de imagen.
4. Guarda el producto junto con la imagen en MySQL.

---

### Actualizar producto

**PUT**

```http
/api/productos/:id
```

**Body**

```json
{
  "precio": 119.99,
  "stock": 5
}
```

---

### Eliminar producto

**DELETE**

```http
/api/productos/:id
```

---

## Estructura del Proyecto

```text
examen3/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db/
│   ├── app.js
│   └── init.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── public/
│
└── README.md
```

---

## Autor

Proyecto desarrollado como parte del Examen 3 del curso de Desarrollo Web avanzado.
