/**
 * Middleware Global de Manejo de Errores
 * ---------------------------------------
 * En Express, un middleware de error se distingue OBLIGATORIAMENTE por tener
 * exactamente 4 parámetros en su firma: (err, req, res, next).
 * 
 * Si defines la función con solo 3 parámetros, Express la tratará como un middleware
 * normal y no interceptará las excepciones lanzadas con next(error) o throw.
 * 
 * Funciones de este middleware:
 * 1. Capturar cualquier error no controlado que ocurra en la aplicación.
 * 2. Imprimir el detalle técnico del error en los logs del servidor para depuración.
 * 3. Responder al cliente con un estado HTTP 500 (Internal Server Error) y un formato
 *    JSON seguro sin exponer trazas confidenciales en producción.
 */

export function errorHandler(err, req, res, next) {
  console.error("🚨 [ERROR GLOBAL CAPTURADO]:", err.message || err);

  const codigoEstado = err.statusCode || 500;
  const mensajeRespuesta = err.message || "Ocurrió un error interno en el servidor.";

  res.status(codigoEstado).json({
    exito: false,
    error: {
      codigo: codigoEstado,
      mensaje: mensajeRespuesta
    }
  });
}
