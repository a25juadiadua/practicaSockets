const socket = io();

let formulariNom = document.getElementById("formNom");
let formulariMensaje = document.getElementById("formMensaje");

socket.on('mensaje', (mensaje) => {
    console.log(mensaje);

    let mensajes = document.getElementById("idMensaje");
    let nuevoMensaje = document.createElement("p");

    nuevoMensaje.textContent = mensajes;

    mensajes.appendChild(nuevoMensaje);
});

formulariNom.addEventListener("submit", function(e) {
    
    e.preventDefault();

    let nom = document.getElementById("inputNom").value;

    if (nom.trim() === "") {
        console.log("El nombre está vacío");
        return;
    }

    if (nom.length > 20) {
        console.log("Tiene más de 20 caracteres");
        return;
    }


    document.getElementById("divForm").classList.add("d-none");
    document.getElementById("idChat").classList.remove("d-none");
    document.getElementById("nombreUsuario").textContent = nom;
});


formulariMensaje.addEventListener("submit", function(e) {
    
    e.preventDefault();

    let mensaje = document.getElementById("textMensaje").value;

    socket.emit("mensaje", mensaje);
});