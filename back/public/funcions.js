const socket = io();
let nom;

let formulariNom = document.getElementById("formNom");
let formulariMensaje = document.getElementById("formMensaje");


socket.on('connect', () => {
    document.getElementById("estatConnexio").textContent = "Conectado";
});

socket.on('disconnect', () => {
    document.getElementById("estatConnexio").textContent = "Conectado";
});


socket.on('mensaje', (mensaje , nomServer) => {
    let mensajes = document.getElementById("idChatMensaje");
    let nuevoMensaje = document.createElement("p");
    const ahora = new Date();
    
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();

    console.log("Hora: ", hora ,minutos);

    if(nomServer === nom){
        nuevoMensaje.className = "text-end text-primary";
        nuevoMensaje.textContent = `${nom}: ${mensaje} ${hora} : ${minutos}`;
    }else{
        
        nuevoMensaje.textContent = `${nomServer}: ${mensaje} ${hora} : ${minutos}`
    }


    mensajes.appendChild(nuevoMensaje);
});


formulariNom.addEventListener("submit", function(e) {
    
    e.preventDefault();

    nom = document.getElementById("inputNom").value;

    if (nom.trim() === "") {
        console.log("El nombre está vacío");
        return;
    }

    if (nom.length > 20) {
        console.log("Tiene más de 20 caracteres");
        return;
    }

    if (nom.length < 3) {
        console.log("Tiene menos de 3 caracteres");
        return;
    }


    document.getElementById("divForm").classList.add("d-none");
    document.getElementById("idChat").classList.remove("d-none");
    document.getElementById("nombreUsuario").textContent = nom;
});


formulariMensaje.addEventListener("submit", function(e) {
    
    e.preventDefault();
    let inputMensaje = document.getElementById("textMensaje");
    let mensaje = document.getElementById("textMensaje").value;

    if(mensaje.trim === ""){
        console.log("El nombre está vacío");
        
    }else if(mensaje.length > 500){
        console.log("Supera el limite de caracteres");

    }else if(mensaje.trim() != ""){
        socket.emit("mensaje", mensaje, nom);
        inputMensaje.value = "";
    }

    mensaje.value = "";

    
});