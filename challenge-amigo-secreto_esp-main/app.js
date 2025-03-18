// Arrays corregidos (nombres consistentes)
let arrayDeAmigos = []; 
let arrayParaAmigosSorteados = []; 

// Regex para asegurarse de que se ingresen nombres correctos 
const regex = /^(?!\s*$)[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;


function mostrarAmigos(elemento, texto) {
    document.querySelector(elemento).innerHTML = texto;
}

// Función para agregar amigos 
function añadirAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreDelAmigo = inputAmigo.value.trim(); // ✅ Added trim()

    if (regex.test(nombreDelAmigo)) {
        verificarRepeticionDeAmigo(nombreDelAmigo);
    } else {
        alert('Nombre inválido. Use solo letras y espacios.');
    }
    limpiarCaja();
}
	//verificar repeticiones 
function verificarRepeticionDeAmigo(nombreDelAmigo) { // ✅ parámetro correcto
    if (arrayDeAmigos.includes(nombreDelAmigo)) {
        alert('¡Nombre repetido!');
    } else {
        arrayDeAmigos.push(nombreDelAmigo);
        mostrarAmigosEnFilas(); // ✅ Nombre de función corregido
    }
}

// Función para mostrar la lista de amigos
function mostrarAmigosEnFilas() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";
    arrayDeAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        ul.appendChild(li);
    });
}

// Función para sortear 
function elegirAlAmigo() {
    if (arrayDeAmigos.length === 0) return null;
    if (arrayParaAmigosSorteados.length >= arrayDeAmigos.length) {
        textoParaSortearAmigos();
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * arrayDeAmigos.length);
    } while (arrayParaAmigosSorteados.includes(numeroGenerado)); // ✅ Bucle seguro

    arrayParaAmigosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

// Función de sorteo principal
function sortearAmigo() {
    if (arrayDeAmigos.length === 0) {
        alert('Añade al menos un amigo.');
        return;
    }

    const numeroDePosicion = elegirAlAmigo();
    if (numeroDePosicion === null) return;

    const nombreGanador = arrayDeAmigos[numeroDePosicion];
    resaltarGanador(nombreGanador);
    document.querySelector('#restablecer').disabled = false;
}

// Función de reinicio 
function reiniciarElJuego() {
    arrayDeAmigos = [];
    arrayParaAmigosSorteados = []; // ✅ Nombre correcto del array
    mostrarAmigos('ul', '');
    textoParaSortearAmigos();
    document.querySelector('#restablecer').disabled = true; 
    document.querySelectorAll('#listaAmigos li').forEach(li => li.remove());
}

// Función para actualizar texto del botón
function textoParaSortearAmigos() { 
    let texto = 'Sortear amigo';
    if (arrayParaAmigosSorteados.length > 0) {
        texto = 'Sortear otro amigo';
    }
    if (arrayParaAmigosSorteados.length === arrayDeAmigos.length && arrayDeAmigos.length > 0) {
        texto = '¡Todos sorteados!';
    }
    mostrarAmigos('#textoDeSorteo', texto);
}

// Función para resaltar ganador (sin cambios)
function resaltarGanador(nombre) {
    let ganadorActual = null;
    document.querySelectorAll("#listaAmigos li").forEach(item => {
        item.classList.remove("ganador");
        if (item.textContent === nombre) {
            item.classList.add("ganador");
            ganadorActual = item;
        }
    });
}

// añadir amigos por medio de la tecla enter 
document.getElementById('amigo').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') añadirAmigo();
});