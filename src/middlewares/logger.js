/**
 * Middleware de Registro y Auditoría (Logger)
 * -------------------------------------------
 * Los middlewares en Express forman una tubería (pipeline).
 * Cada petición HTTP que llega al servidor atraviesa este middleware antes
 * de alcanzar los enrutadores específicos.
 * 
 * Funciones de este middleware:
 * 1. Obtener la estampa de tiempo actual (ISO).
 * 2. Extraer el método HTTP (GET, POST, etc.) y la URL solicitada.
 * 3. Imprimir el registro en la consola del servidor.
 * 4. Llamar a next() para transferir el control al siguiente middleware.
 * 
 * ⚠️ IMPORTANTE: Si olvidas invocar next(), la petición quedará congelada
 * y el cliente esperará hasta agotar el tiempo límite (timeout).
 */

export function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const metodo = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] 📡 ${metodo} -> ${url}`);

  // Pasar el control al siguiente eslabón de la cadena
  next();
}
