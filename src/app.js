/**
 * Servidor Principal de Express con EcmaScript Modules (ESM)
 * -----------------------------------------------------------
 * Este archivo centraliza la inicialización de Express, la configuración de los
 * middlewares globales, el montaje del enrutador y la apertura del puerto de escucha.
 */

import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import campersRouter from "./routes/campers.routes.js";

// 1. Instanciar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares Globales
// express.json() parsea solicitudes entrantes con cuerpo en formato application/json
app.use(express.json());

// Middleware personalizado para auditoría de solicitudes
app.use(logger);

// 3. Ruta Raíz / Bienvenida (Health check)
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "🚀 Bienvenido a la API REST de Campers en Express (Campuslands)",
    stack: "Node.js + Express + ECMAScript Modules (ESM)",
    almacenamiento: "Arreglo en memoria (sin base de datos externa)",
    documentacion_endpoints: {
      listar_todos: "GET /api/campers",
      obtener_por_id: "GET /api/campers/:id",
      crear_nuevo: "POST /api/campers",
      actualizar: "PUT /api/campers/:id",
      eliminar: "DELETE /api/campers/:id"
    }
  });
});

// 4. Montaje del Enrutador Modular
// Todas las rutas de campersRouter responderán bajo el prefijo "/api/campers"
app.use("/api/campers", campersRouter);

// 5. Manejador para Rutas Inexistentes (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    error: `Ruta '${req.method} ${req.originalUrl}' no encontrada en este servidor.`
  });
});

// 6. Middleware Global de Manejo de Errores (debe ser el último app.use)
app.use(errorHandler);

// 7. Iniciar el servidor si este archivo se ejecuta directamente
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`📡 Endpoints CRUD disponibles en http://localhost:${PORT}/api/campers`);
    console.log(`💡 Presiona CTRL+C para detener el servidor`);
    console.log(`==================================================\n`);
  });
}

export default app;
