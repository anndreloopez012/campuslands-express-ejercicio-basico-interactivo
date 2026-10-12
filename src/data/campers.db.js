/**
 * Base de Datos en Memoria (Arreglo JavaScript Nativo)
 * -----------------------------------------------------
 * En este ejercicio pedagógico no utilizamos una base de datos externa (como PostgreSQL o MongoDB).
 * En su lugar, utilizamos un arreglo mutable exportado mediante ECMAScript Modules (ESM).
 * 
 * Cada elemento representa a un "Camper" con las propiedades:
 * - id: Identificador numérico único
 * - nombre: Nombre completo del estudiante
 * - modulo: Tecnología o materia en curso
 * - nivel: Grado de avance (Básico, Intermedio, Avanzado)
 */

export let campers = [
  { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel: "Intermedio" },
  { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel: "Básico" },
  { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
];

/**
 * Función auxiliar para restablecer los datos iniciales (útil para pruebas y demostraciones).
 */
export function reiniciarCampers() {
  campers = [
    { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel: "Intermedio" },
    { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel: "Básico" },
    { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
  ];
  return campers;
}
