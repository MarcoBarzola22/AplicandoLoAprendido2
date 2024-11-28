import * as readlineSync from 'readline-sync';

type TaskState = '❗ Pendiente' | '🛠 En curso' | '✔ Terminada';
type TaskDifficulty = '⭐' | '⭐⭐' | '⭐⭐⭐';

interface Task {
    id: number;
    titulo: string;
    descripcion: string;
    dificultad: TaskDifficulty;
    creacion: string;
    vencimiento: string;
    estado: TaskState;
}

const tareas: Task[] = [];
const fechaActual = new Date().toLocaleDateString();

const pendiente: TaskState = '❗ Pendiente';
const enCurso: TaskState = '🛠 En curso';
const terminada: TaskState = '✔ Terminada';

const facil: TaskDifficulty = '⭐';
const medio: TaskDifficulty = '⭐⭐';
const dificil: TaskDifficulty = '⭐⭐⭐';

function crearTarea(
    titulo: string,
    descripcion: string,
    dificultad: TaskDifficulty,
    creacion: string,
    vencimiento: string,
    estado: TaskState = pendiente
): Task {
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

function mostrarMenu(): number {
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

function mostrarTareas(filtro?: TaskState): void {
    console.log('===================================');
    console.log('📋 Tus tareas:');
    const lista = tareas.filter(t => !filtro || t.estado === filtro);
    lista.forEach(t => console.log(`[${t.id}] ${t.titulo} (${t.estado})`));
    if (!lista.length) console.log('No hay tareas en esta categoría.');
    console.log('===================================');
}

function agregarTarea(): void {
    console.log('===================================');
    console.log('🆕 Agregar nueva tarea:');
    const titulo = readlineSync.question('Título: ');
    const descripcion = readlineSync.question('Descripción: ');
    const dificultad = seleccionarDificultad();
    const vencimiento = readlineSync.question('Fecha de vencimiento (DD/MM/AAAA): ');
    tareas.push(crearTarea(titulo, descripcion, dificultad, fechaActual, vencimiento));
    console.log('✅ Tarea agregada con éxito.');
}

function buscarTarea(): void {
    const query = readlineSync.question('Parte del título de la tarea: ').toLowerCase();
    const resultados = tareas.filter(t => t.titulo.toLowerCase().includes(query));
    console.log(resultados.length ? resultados : '❌ No se encontraron tareas.');
}

function editarTarea(): void {
    mostrarTareas();
    const id = parseInt(readlineSync.question('ID de la tarea a editar: '), 10);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.titulo = readlineSync.question(`Nuevo título (${tarea.titulo}): `) || tarea.titulo;
        tarea.descripcion = readlineSync.question(`Nueva descripción (${tarea.descripcion}): `) || tarea.descripcion;
        tarea.estado = seleccionarEstado() || tarea.estado;
        console.log('✅ Tarea actualizada con éxito.');
    } else {
        console.log('❌ Tarea no encontrada.');
    }
}

function eliminarTarea(): void {
    mostrarTareas();
    const id = parseInt(readlineSync.question('ID de la tarea a eliminar: '), 10);
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        console.log('✅ Tarea eliminada con éxito.');
    } else {
        console.log('❌ Tarea no encontrada.');
    }
}

function seleccionarDificultad(): TaskDifficulty {
    console.log('[1] ⭐ Fácil\n[2] ⭐⭐ Medio\n[3] ⭐⭐⭐ Difícil');
    const seleccion = parseInt(readlineSync.question('Selecciona dificultad: '), 10);
    return seleccion === 1 ? facil : seleccion === 2 ? medio : dificil;
}

function seleccionarEstado(): TaskState | null {
    console.log('[1] ❗ Pendiente\n[2] 🛠 En curso\n[3] ✔ Terminada');
    const seleccion = parseInt(readlineSync.question('Selecciona estado: '), 10);
    return seleccion === 1 ? pendiente : seleccion === 2 ? enCurso : seleccion === 3 ? terminada : null;
}

// Bucle principal
let opcion: number;
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
