// Array para almacenar los nombres de los amigos
const amigos = [];
// Array para almacenar los amigos que ya han sido sorteados
const amigosSorteados = [];

// Función para agregar amigos a la lista
function agregarAmigo() {
    // Capturar el valor del campo de entrada
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    
    // Validar que el nombre no contenga números ni caracteres especiales
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!regex.test(nombreAmigo)) {
        alert('El nombre no debe contener números ni caracteres especiales.');
        return;
    }
    
    // Añadir el nombre al array de amigos
    amigos.push(nombreAmigo);
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    
    // Actualizar la lista visual de amigos
    actualizarListaAmigos();
}

// Función auxiliar para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar la lista actual
    listaAmigos.innerHTML = '';
    
    // Añadir cada amigo a la lista
    amigos.forEach(amigo => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaAmigos.appendChild(itemLista);
    });
}

// Función para sortear amigos
function sortearAmigo() {
    // Validar que haya amigos disponibles
    if (amigos.length === 0) {
        alert('No hay amigos para sortear. Por favor, añada al menos un nombre.');
        return;
    }
    
    // Verificar si todos los amigos ya han sido sorteados
    if (amigosSorteados.length >= amigos.length) {
        const elementoResultado = document.getElementById('resultado');
        elementoResultado.innerHTML = '<li>¡Todos los posibles amigos han sido sorteados!</li>';
        return;
    }
    
    // Filtrar amigos que aún no han sido sorteados
    const amigosDisponibles = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    
    // Generar un índice aleatorio entre los amigos disponibles
    const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    
    // Obtener el nombre sorteado
    const amigoSorteado = amigosDisponibles[indiceAleatorio];
    
    // Añadir el amigo a la lista de sorteados
    amigosSorteados.push(amigoSorteado);
    
    // Mostrar el resultado
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `<li>¡Tu amigo secreto es: <strong>${amigoSorteado}</strong>!</li>`;
}

// Añadir evento para permitir añadir amigos con la tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});
