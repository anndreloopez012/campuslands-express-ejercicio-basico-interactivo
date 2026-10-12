/**
 * Test de Verificación Automatizado para la API de Campers
 * ---------------------------------------------------------
 * Ejecuta pruebas end-to-end con fetch nativo de Node.js 18+ para validar:
 * 1. GET /api/campers (Listar todos)
 * 2. GET /api/campers/:id (Buscar por ID existente)
 * 3. GET /api/campers/:id (Buscar por ID no existente -> 404)
 * 4. POST /api/campers (Crear camper exitoso -> 201)
 * 5. POST /api/campers (Validación de cuerpo incompleto -> 400)
 * 6. PUT /api/campers/:id (Actualizar camper existente -> 200)
 * 7. DELETE /api/campers/:id (Eliminar camper existente -> 200)
 * 8. GET /api/campers/:id (Verificar que el eliminado ya no existe -> 404)
 */

import assert from "node:assert/strict";
import app from "../src/app.js";

process.env.NODE_ENV = "test";
const PORT = 3199;
const BASE_URL = `http://localhost:${PORT}`;

let server;

async function runTests() {
  console.log("🧪 [INICIANDO PRUEBAS DE LA API REST DE CAMPERS]...\n");

  server = app.listen(PORT);

  try {
    // 1. GET /
    console.log("1. Probando GET / (Healthcheck / Bienvenida)...");
    const resHome = await fetch(`${BASE_URL}/`);
    assert.equal(resHome.status, 200, "GET / debe retornar 200");
    const jsonHome = await resHome.json();
    assert.ok(jsonHome.mensaje.includes("Bienvenido"), "Debe incluir mensaje de bienvenida");
    console.log("   ✅ PASÓ: GET / respondió 200 OK");

    // 2. GET /api/campers
    console.log("2. Probando GET /api/campers (Listar campers iniciales)...");
    const resList = await fetch(`${BASE_URL}/api/campers`);
    assert.equal(resList.status, 200, "GET /api/campers debe retornar 200");
    const jsonList = await resList.json();
    assert.equal(jsonList.total, 3, "Debe iniciar con 3 campers semilla");
    console.log("   ✅ PASÓ: GET /api/campers retornó 3 campers");

    // 3. GET /api/campers/1
    console.log("3. Probando GET /api/campers/1 (Buscar camper existente)...");
    const resGetOne = await fetch(`${BASE_URL}/api/campers/1`);
    assert.equal(resGetOne.status, 200, "GET /api/campers/1 debe retornar 200");
    const jsonGetOne = await resGetOne.json();
    assert.equal(jsonGetOne.camper.id, 1, "El ID debe ser 1");
    assert.equal(jsonGetOne.camper.nombre, "Valeria Gómez", "El nombre debe coincidir");
    console.log("   ✅ PASÓ: GET /api/campers/1 encontró a Valeria Gómez");

    // 4. GET /api/campers/999 (No existente)
    console.log("4. Probando GET /api/campers/999 (ID inexistente -> 404)...");
    const resNotFound = await fetch(`${BASE_URL}/api/campers/999`);
    assert.equal(resNotFound.status, 404, "GET /api/campers/999 debe retornar 404");
    console.log("   ✅ PASÓ: Retornó 404 Not Found correctamente");

    // 5. POST /api/campers (Creación exitosa)
    console.log("5. Probando POST /api/campers (Crear nuevo camper)...");
    const nuevoCamper = {
      nombre: "Esteban Andrade",
      modulo: "Node.js",
      nivel: "Básico"
    };
    const resPost = await fetch(`${BASE_URL}/api/campers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCamper)
    });
    assert.equal(resPost.status, 201, "POST debe retornar 201 Created");
    const jsonPost = await resPost.json();
    assert.equal(jsonPost.camper.id, 4, "Nuevo camper debe recibir ID autoincremental 4");
    assert.equal(jsonPost.camper.nombre, "Esteban Andrade");
    console.log("   ✅ PASÓ: POST /api/campers creó camper con ID 4");

    // 6. POST /api/campers (Validación de campos faltantes -> 400)
    console.log("6. Probando POST /api/campers con datos incompletos (Validación -> 400)...");
    const resPostBad = await fetch(`${BASE_URL}/api/campers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: "" }) // falta modulo y nivel
    });
    assert.equal(resPostBad.status, 400, "Debe rechazar con 400 Bad Request");
    console.log("   ✅ PASÓ: Middleware de validación interceptó datos incompletos (400)");

    // 7. PUT /api/campers/1 (Actualización exitosa)
    console.log("7. Probando PUT /api/campers/1 (Actualizar camper)...");
    const datosActualizados = {
      nombre: "Valeria Gómez de León",
      modulo: "Express Avanzado",
      nivel: "Avanzado"
    };
    const resPut = await fetch(`${BASE_URL}/api/campers/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados)
    });
    assert.equal(resPut.status, 200, "PUT debe retornar 200 OK");
    const jsonPut = await resPut.json();
    assert.equal(jsonPut.camper.nombre, "Valeria Gómez de León");
    console.log("   ✅ PASÓ: PUT /api/campers/1 actualizó el camper exitosamente");

    // 8. DELETE /api/campers/2 (Eliminación exitosa)
    console.log("8. Probando DELETE /api/campers/2 (Eliminar camper)...");
    const resDel = await fetch(`${BASE_URL}/api/campers/2`, {
      method: "DELETE"
    });
    assert.equal(resDel.status, 200, "DELETE debe retornar 200 OK");
    console.log("   ✅ PASÓ: DELETE /api/campers/2 removió el camper");

    // 9. GET /api/campers/2 (Verificar eliminación)
    console.log("9. Verificando que el camper 2 ya no exista...");
    const resVerifyDel = await fetch(`${BASE_URL}/api/campers/2`);
    assert.equal(resVerifyDel.status, 404, "El camper eliminado ya no debe existir (404)");
    console.log("   ✅ PASÓ: Camper 2 ya no está disponible (404)");

    console.log("\n✨ ¡TODAS LAS PRUEBAS (9/9) PASARON SATISFACTORIAMENTE!\n");
  } catch (error) {
    console.error("❌ Falló una prueba:", error);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();
