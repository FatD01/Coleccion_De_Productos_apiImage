# Examen 3: Sistema de Gestión de Productos (Monorepo)

Este proyecto consiste en una aplicación web full-stack para la gestión de productos, estructurada como un monorepo que integra un backend en Node.js/Express y un frontend en Next.js. El sistema automatiza la asignación de imágenes consumiendo una API externa y cuenta con persistencia de datos en una base de datos MySQL en la nube (Aiven).

## Enlaces del Proyecto
- **Frontend (Vercel):** https://frontend-eight-kappa-30.vercel.app
- **Backend (Render):** https://coleccion-de-productos-apiimage.onrender.com

---

## Tecnologías y Requerimientos Implementados

### Backend (`/backend`)
- **Framework:** Express.js configurado para una API RESTful.
- **Base de Datos:** MySQL (con pool de conexiones `mysql2/promise` adaptativo con soporte SSL para Aiven).
- **Validación de Datos:** Uso de la librería **Joi** para asegurar tipos de datos correctos antes de la inserción.
- **Logs / Monitoreo:** Middleware **Morgan** (`dev`) para el registro de solicitudes en consola.
- **Consumo de API Externa:** Integración con **FakeStoreAPI** para recuperar y asignar dinámicamente un `image_url` a cada producto registrado.

### Frontend (`/frontend`)
- **Framework:** Next.js (App Router).
- **Estilos:** TailwindCSS con interfaz responsiva y componentes interactivos para la gestión del CRUD.

---

## Estructura de la Tabla `productos` (MySQL)
La base de datos cuenta con la tabla `productos` autogenerada mediante un script de inicialización (`init.js`) bajo el siguiente esquema:
- `id` (INT, Primary Key, Auto Increment)
- `nombre` (VARCHAR)
- `descripcion` (TEXT)
- `precio` (DECIMAL)
- `stock` (INT)
- `imagen_url` (VARCHAR)

---

## Instalación y Configuración Local

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio-url>
cd examen3