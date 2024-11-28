"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const tareas = [];
const fechaActual = new Date().toLocaleDateString();
const pendiente = '❗ Pendiente';
const enCurso = '🛠 En curso';
const terminada = '✔ Terminada';
const facil = '⭐';
const medio = '⭐⭐';
const dificil = '⭐⭐⭐';
function crearTarea(titulo, descripcion, dificultad, creacion, vencimiento, estado = pendiente) {
    return {
        id: tareas.length + 1,
        titulo,
        descripcion,
        dificultad,
        creacion,
        vencimiento,
        estado,
    };
}
function mostrarMenu() {
    console.log(`
===================================
📋 Bienvenid@ a la lista de tareas 📋
[1] Ver tareas.
[2] Buscar una tarea.
[3] Agregar una tarea.
[4] Editar una tarea.
[5] Eliminar una tarea.
[0] Salir.
===================================`);
    return parseInt(readlineSync.question('Selecciona una opción: '), 10);
}
function mostrarTareas(filtro) {
    console.log('===================================');
    console.log('📋 Tus tareas:');
    const lista = tareas.filter(t => !filtro || t.estado === filtro);
    lista.forEach(t => console.log(`[${t.id}] ${t.titulo} (${t.estado})`));
    if (!lista.length)
        console.log('No hay tareas en esta categoría.');
    console.log('===================================');
}
function agregarTarea() {
    console.log('===================================');
    console.log('🆕 Agregar nueva tarea:');
    const titulo = readlineSync.question('Título: ');
    const descripcion = readlineSync.question('Descripción: ');
    const dificultad = seleccionarDificultad();
    const vencimiento = readlineSync.question('Fecha de vencimiento (DD/MM/AAAA): ');
    tareas.push(crearTarea(titulo, descripcion, dificultad, fechaActual, vencimiento));
    console.log('✅ Tarea agregada con éxito.');
}
function buscarTarea() {
    const query = readlineSync.question('Parte del título de la tarea: ').toLowerCase();
    const resultados = tareas.filter(t => t.titulo.toLowerCase().includes(query));
    console.log(resultados.length ? resultados : '❌ No se encontraron tareas.');
}
function editarTarea() {
    mostrarTareas();
    const id = parseInt(readlineSync.question('ID de la tarea a editar: '), 10);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.titulo = readlineSync.question(`Nuevo título (${tarea.titulo}): `) || tarea.titulo;
        tarea.descripcion = readlineSync.question(`Nueva descripción (${tarea.descripcion}): `) || tarea.descripcion;
        tarea.estado = seleccionarEstado() || tarea.estado;
        console.log('✅ Tarea actualizada con éxito.');
    }
    else {
        console.log('❌ Tarea no encontrada.');
    }
}
function eliminarTarea() {
    mostrarTareas();
    const id = parseInt(readlineSync.question('ID de la tarea a eliminar: '), 10);
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        console.log('✅ Tarea eliminada con éxito.');
    }
    else {
        console.log('❌ Tarea no encontrada.');
    }
}
function seleccionarDificultad() {
    console.log('[1] ⭐ Fácil\n[2] ⭐⭐ Medio\n[3] ⭐⭐⭐ Difícil');
    const seleccion = parseInt(readlineSync.question('Selecciona dificultad: '), 10);
    return seleccion === 1 ? facil : seleccion === 2 ? medio : dificil;
}
function seleccionarEstado() {
    console.log('[1] ❗ Pendiente\n[2] 🛠 En curso\n[3] ✔ Terminada');
    const seleccion = parseInt(readlineSync.question('Selecciona estado: '), 10);
    return seleccion === 1 ? pendiente : seleccion === 2 ? enCurso : seleccion === 3 ? terminada : null;
}
// Bucle principal
let opcion;
do {
    opcion = mostrarMenu();
    switch (opcion) {
        case 1:
            mostrarTareas();
            break;
        case 2:
            buscarTarea();
            break;
        case 3:
            agregarTarea();
            break;
        case 4:
            editarTarea();
            break;
        case 5:
            eliminarTarea();
            break;
        case 0:
            console.log('👋 ¡Hasta pronto!');
            break;
        default:
            console.log('❌ Opción inválida.');
    }
} while (opcion !== 0);
