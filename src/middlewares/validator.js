/**
 * Middleware de Validación de Campers
 * ------------------------------------
 * Un middleware es una función intermediaria que tiene acceso a los objetos:
 * - req: Petición entrante
 * - res: Objeto de respuesta
 * - next: Función para pasar el control al siguiente middleware o controlador
 * 
 * Este middleware valida que el cuerpo de la petición contenga los datos
 * obligatorios antes de permitir que la ruta procese la creación o edición.
 */

export function validarCamper(req, res, next) {
  const { nombre, modulo, nivel } = req.body;

  // 1. Verificar existencia del cuerpo de la petición
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      error: "Se requiere un cuerpo JSON válido en la petición."
    });
  }

  // 2. Validar presencia y formato de cada campo obligatorio
  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    return res.status(400).json({
      error: "El campo 'nombre' es obligatorio y debe ser una cadena de texto no vacía."
    });
  }

  if (!modulo || typeof modulo !== "string" || modulo.trim().length === 0) {
    return res.status(400).json({
      error: "El campo 'modulo' es obligatorio (ej: Node.js, Express, JavaScript)."
    });
  }

  if (!nivel || typeof nivel !== "string" || nivel.trim().length === 0) {
    return res.status(400).json({
      error: "El campo 'nivel' es obligatorio (ej: Básico, Intermedio, Avanzado)."
    });
  }

  // 3. Si todas las validaciones pasaron con éxito, invocamos next()
  next();
}
