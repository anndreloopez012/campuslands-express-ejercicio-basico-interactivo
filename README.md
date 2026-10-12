# 🚀 Campuslands - Ejercicio Básico Interactivo de Express.js y Node.js (ESM)

> **Guía pedagógica oficial** para campers y entrenadores de Campuslands. Aprende los fundamentos esenciales para construir una **API REST profesional** con **Node.js** y **Express**, utilizando exclusivamente el estándar moderno de **ECMAScript Modules (ESM)**, enrutadores modulares, arquitectura de middlewares y un CRUD completo que opera sobre un arreglo en memoria sin bases de datos complejas.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.x-informational.svg)](https://expressjs.com/)
[![Module Type](https://img.shields.io/badge/modules-ESM%20(EcmaScript)-blue.svg)](https://nodejs.org/api/esm.html)
[![Storage](https://img.shields.io/badge/persistencia-Arreglos%20en%20Memoria-yellow.svg)](src/data/campers.db.js)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Presentaci%C3%B3n%20Interactiva%20en%20Vivo-22c55e?style=for-the-badge&logo=githubpages&logoColor=white)](https://anndreloopez012.github.io/campuslands-express-ejercicio-basico-interactivo/)
[![Campuslands](https://img.shields.io/badge/Campuslands-Bootcamp-orange.svg)](https://campuslands.com)

---

## 🌐 🖥️ Presentación y Laboratorio Web Interactivo (GitHub Pages)

> 💡 **¿Quieres estudiar el ejercicio de inmediato sin clonar ni instalar nada?**  
> Hemos desplegado una **versión web interactiva completa** accesible desde cualquier navegador, teléfono o tablet a través de GitHub Pages.

👉 **Abre la plataforma web interactiva aquí:**  
### 🔗 **[https://anndreloopez012.github.io/campuslands-express-ejercicio-basico-interactivo/](https://anndreloopez012.github.io/campuslands-express-ejercicio-basico-interactivo/)**

### 🎮 ¿Qué funciones interactivas encontrarás en la web?
- 🛠️ **Inicialización y Estructura Paso a Paso (Slide 6):** Comandos exactos de terminal (`mkdir`, `npm init -y`, `npm install express`, creación de carpetas y archivos base) y diagrama del árbol de archivos antes de ver el código.
- 🔍 **Explorador Interactivo de Código Línea a Línea (Slide 7):** Haz clic sobre cualquier línea de código de `src/app.js`, `src/routes/campers.routes.js` o los middlewares para desplegar un panel con la explicación técnica detallada, su propósito en Node.js y advertencias de errores comunes.
- 💻 **Ejecución y Pruebas Locales (Slide 8):** Comandos para levantar el servidor localmente con `npm run dev` y suite de comandos `cURL` para probar los 5 endpoints del CRUD en tu propia máquina.
- ⚡ **Simulador REST en Tiempo Real (Sandbox en Slide 9):** Un cliente HTTP integrado en el navegador para disparar peticiones `GET`, `POST`, `PUT` y `DELETE` sobre el arreglo de campers en memoria, visualizando el código de estado, los encabezados, la respuesta JSON y la tabla actualizada en tiempo real.
- 📖 **Modo Presentación vs Modo Lectura:** Pulsa la tecla `M` o el botón superior para alternar entre diapositivas de clase (con navegación por flechas `←` y `→`) o un documento continuo para lectura individual.
- 📑 **Índice Temático Flotante (Tecla T):** Salta directamente a cualquiera de las 10 lecciones pedagógicas.

---

## 🎯 Conceptos Clave Explicados en Este Proyecto

### 1. ¿Qué es una API REST y cómo funciona HTTP?
Una **API REST** (Representational State Transfer) permite la comunicación estandarizada entre clientes (aplicaciones web, móviles o herramientas como Postman) y el servidor mediante el protocolo **HTTP**:
- **Cliente:** Envía una **Petición (Request)** indicando una URL, un método HTTP, encabezados y opcionalmente un cuerpo de datos (Body en JSON).
- **Servidor:** Procesa la lógica y retorna una **Respuesta (Response)** compuesta por un código de estado (Status Code) y los datos en JSON.

| Verbo HTTP | Propósito en el CRUD | Cuerpo JSON (Body) | Código de Éxito Típico |
| :--- | :--- | :--- | :--- |
| `GET` | Consultar y recuperar información | No | `200 OK` |
| `POST` | Registrar o crear un nuevo elemento | Sí (`req.body`) | `201 Created` |
| `PUT` | Actualizar por completo un elemento por su ID | Sí (`req.body`) | `200 OK` |
| `DELETE` | Eliminar un elemento según su ID | No | `200 OK` |

### 2. Códigos de Estado HTTP (Status Codes)
- **`200 OK`**: Petición resuelta satisfactoriamente (`GET`, `PUT`, `DELETE`).
- **`201 Created`**: Nuevo recurso creado exitosamente en el servidor (`POST`).
- **`400 Bad Request`**: Datos incompletos, inválidos o cuerpo JSON malformado.
- **`404 Not Found`**: El ID buscado o la ruta solicitada no existen en el servidor.
- **`500 Internal Server Error`**: Ocurrió un error inesperado en la ejecución del backend.

### 3. Middlewares en Express (El Pipeline de Peticiones)
Un middleware es una función con acceso a los objetos `(req, res, next)`. Se ejecutan en orden secuencial como una tubería:
1. `express.json()`: Parsea automáticamente cuerpos JSON entrantes hacia `req.body`.
2. `logger`: Middleware de auditoría que imprime en consola la fecha ISO, método HTTP y URL.
3. `validator`: Middleware que verifica que el cuerpo contenga `nombre`, `modulo` y `nivel` antes de llegar al controlador.
4. `errorHandler`: Middleware especial con firma de **4 parámetros** `(err, req, res, next)` para capturar excepciones globales sin detener Node.js.

> ⚠️ **Regla de oro de middlewares:** Si un middleware no envía una respuesta directa al cliente (por ejemplo con `res.json()`), **es obligatorio invocar `next()`**. Si lo olvidas, la petición quedará colgada por timeout.

### 4. Enrutadores Modulares (`express.Router()`)
En lugar de saturar `app.js` con decenas de rutas, utilizamos `express.Router()` en `src/routes/campers.routes.js` para aislar las rutas de campers y montarlas con un prefijo limpio en `src/app.js`:
```javascript
import campersRouter from "./routes/campers.routes.js";
app.use("/api/campers", campersRouter);
```

### 5. Persistencia en Memoria (Arreglos de JavaScript)
No se requiere configurar bases de datos externas. Los datos se almacenan en un arreglo mutable exportado en `src/data/campers.db.js`:
- `find()` para consultar por ID.
- `push()` para registrar nuevos elementos.
- `findIndex()` para ubicar el elemento a actualizar o borrar.
- `splice()` para remover elementos del arreglo.

---

## 🏗️ Estructura Limpia del Proyecto

```text
campuslands-express-ejercicio-basico-interactivo/
├── src/
│   ├── data/
│   │   └── campers.db.js           # Base de datos en memoria (Arreglo JavaScript mutable)
│   ├── middlewares/
│   │   ├── logger.js               # Registro de peticiones (método, URL, timestamp)
│   │   ├── validator.js            # Validación de campos obligatorios en el body
│   │   └── errorHandler.js        # Middleware global de 4 parámetros para captura de errores
│   ├── routes/
│   │   └── campers.routes.js       # express.Router() con los 5 endpoints CRUD
│   └── app.js                      # Configuración de Express, montaje de middlewares y listen
├── test/
│   └── test-api.js                 # Suite de pruebas automatizadas end-to-end con fetch nativo
├── .gitignore                      # Exclusión de dependencias (node_modules) y temporales
├── .nojekyll                       # Bypass de Jekyll para GitHub Pages
├── index.html                      # Aplicación web interactiva completa (Presentación + Visor + Sandbox)
├── LICENSE                         # Licencia libre MIT
├── package.json                    # Configuración "type": "module", scripts y dependencias
└── README.md                       # Documentación pedagógica integral
```

---

## 📋 Endpoints de la API REST (`/api/campers`)

| Método | Endpoint | Descripción | Body (JSON) | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Healthcheck y bienvenida con mapa de rutas | Ninguno | `200` |
| `GET` | `/api/campers` | Lista todos los campers en memoria | Ninguno | `200` |
| `GET` | `/api/campers/:id` | Busca un camper por su ID numérico | Ninguno | `200`, `400`, `404` |
| `POST` | `/api/campers` | Registra un nuevo camper | `{ nombre, modulo, nivel }` | `201`, `400` |
| `PUT` | `/api/campers/:id` | Actualiza un camper por su ID | `{ nombre, modulo, nivel }` | `200`, `400`, `404` |
| `DELETE` | `/api/campers/:id` | Elimina un camper por su ID | Ninguno | `200`, `400`, `404` |

---

## 💻 Instalación y Ejecución Local

### 1. Requisitos Previos
- **Node.js** versión 18.0.0 o superior instalada (`node -v`).
- **Git** instalado (`git -v`).

### 2. Clonar el Repositorio
```bash
git clone https://github.com/anndreloopez012/campuslands-express-ejercicio-basico-interactivo.git
cd campuslands-express-ejercicio-basico-interactivo
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Iniciar el Servidor de Desarrollo
```bash
# Modo con reinicio automático al guardar cambios:
npm run dev

# Modo tradicional:
npm start
```
El servidor arrancará en: **`http://localhost:3000`**

### 5. Ejecutar la Suite de Pruebas Automatizadas
Para verificar que todos los endpoints respondan con los códigos de estado exactos:
```bash
npm test
```

---

## 🧪 Ejemplos Rápidos con cURL

### 1. Listar todos los campers
```bash
curl -X GET http://localhost:3000/api/campers
```

### 2. Buscar camper con ID 1
```bash
curl -X GET http://localhost:3000/api/campers/1
```

### 3. Crear un nuevo camper
```bash
curl -X POST http://localhost:3000/api/campers \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Esteban Andrade", "modulo": "Node.js", "nivel": "Básico"}'
```

### 4. Actualizar camper con ID 1
```bash
curl -X PUT http://localhost:3000/api/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Valeria Gómez de León", "modulo": "Express Avanzado", "nivel": "Avanzado"}'
```

### 5. Eliminar camper con ID 2
```bash
curl -X DELETE http://localhost:3000/api/campers/2
```

---

## 🌿 Flujo de Ramas Git Utilizado en el Proyecto

El repositorio fue construido siguiendo las buenas prácticas de Git Flow colaborativo:
- **`main`**: Rama de producción estable, sincronizada y origen del despliegue en GitHub Pages.
- **`dev`**: Rama de integración activa donde se prueban y unifican las características.
- **`feat/*`**: Ramas de funcionalidades específicas:
  - `feat/01-setup-esm-express`: Inicialización del proyecto, package.json y configuración base.
  - `feat/02-data-array-crud`: Base de datos en memoria y rutas de express.Router().
  - `feat/03-middlewares-logging-validation`: Implementación de middlewares (logger, validator, errorHandler).
  - `feat/04-interactive-web-line-by-line`: Plataforma web didáctica en index.html y simulador REST.
  - `feat/05-documentation-readme`: Documentación exhaustiva y manual del estudiante.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles. Desarrollado con fines educativos para el ecosistema **Campuslands**.
