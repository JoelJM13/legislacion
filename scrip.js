// DOM
const loginOverlay = document.getElementById("loginOverlay");
const entrarBtn = document.getElementById("entrarBtn");
const nombreInput = document.getElementById("nombreInput");

// Duración de sesión: 1 minuto
const DURACION_SESION = 1 * 1200 * 1000; 

// Verificar si hay sesión válida
function verificarSesion() {
    let nombre = localStorage.getItem("nombre");
    let inicio = localStorage.getItem("inicioSesion");

    if (!nombre || !inicio) {
        mostrarLogin();
        return;
    }

    let tiempoPasado = Date.now() - parseInt(inicio);

    if (tiempoPasado >= DURACION_SESION) {
        cerrarSesion();
        return;
    }

    ocultarLogin();
}

// Mostrar login
function mostrarLogin() {
    loginOverlay.style.display = "flex";
}

// Ocultar login
function ocultarLogin() {
    loginOverlay.style.display = "none";
}

// Guardar sesión
function iniciarSesion(nombre) {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("inicioSesion", Date.now());

    // Mensaje solo la primera vez
    alert("Bienvenido " + nombre + " 😊");

    ocultarLogin();
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("inicioSesion");
    mostrarLogin();
}

entrarBtn.addEventListener("click", () => {
    let nombre = nombreInput.value.trim();

    if (nombre.length < 2) {
        alert("Escribe un nombre válido.");
        return;
    }

    iniciarSesion(nombre);
});

// Revisar sesión al cargar la página
verificarSesion();

// Revisar sesión cada minuto por si ya expiró
setInterval(verificarSesion, 60000);
