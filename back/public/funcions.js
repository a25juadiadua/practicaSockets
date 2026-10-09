const socket = io();
let nom = localStorage.getItem("nom");

let formulariNom = document.getElementById("formNom");
let formulariMensaje = document.getElementById("formMensaje");
let botoDesconectar = document.getElementById("botoDesconectar");

//DESCONECTAR
socket.on('disconnect', () => {
    document.getElementById("estatConnexio").textContent = "Desconectado";
    botoDesconectar.textContent = "Conectar";
    document.getElementById("botoEnviar").disabled = true;
    document.getElementById("textMensaje").disable = true;
});

//CONECTAR
socket.on('connect', () => {
    document.getElementById("estatConnexio").textContent = "Conectado";
    botoDesconectar.textContent = "Desconnectar";

    if(nom){
        socket.emit("chat:login", nom);
    }

    document.getElementById("botoEnviar").disabled = false;
    document.getElementById("textMensaje").disable = false;
});

botoDesconectar.addEventListener("click", function() {
    if (socket.connected) {
        socket.disconnect();
    } else {
        socket.connect();
    }
});


//SI HAY ALGUN ERROR
socket.on('chat:error', (errorMessage) => {
    swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
    });
});


//MENSAJES DEL CHAT
socket.on('chat:message', (mensaje , nomServer, hora, minutos) => {
    let mensajes = document.getElementById("idChatMensaje");
    let divMensaje = document.createElement("div");
    let nuevoMensaje = document.createElement("h6");
    let horaMensaje = document.createElement("span");
    

    nuevoMensaje.textContent = `${nomServer}: ${mensaje}`;
    horaMensaje.textContent = `${hora}:${minutos}`;

    horaMensaje.className = "text-muted small d-block";

    if (nomServer === nom) {
    divMensaje.className = "d-table ms-auto text-end text-primary mb-3 bg-primary-subtle p-2 rounded";
} else {
    divMensaje.className = "d-table me-auto text-start text-success mb-3 bg-success-subtle p-2 rounded";
}


    divMensaje.appendChild(nuevoMensaje);
    divMensaje.appendChild(horaMensaje);

    mensajes.appendChild(divMensaje);
});

//FORMULARIO PARA EL NOMBRE
formulariNom.addEventListener("submit", function(e) {
    
    e.preventDefault();

    nom = document.getElementById("inputNom").value;
    
    socket.emit("chat:login", nom);
    console.log("Nombre enviado al servidor:", nom);
});


//SI BACK CONFIRMA QUE ESTA BIEN LO AÑADIMOS
socket.on('chat:login:ok', (nomServer) => {
    console.log("Nombre recibido del servidor:", nomServer);

    nom = nomServer;

    localStorage.setItem("nom", nom);


    document.getElementById("divForm").classList.add("d-none");
    document.getElementById("idChat").classList.remove("d-none");
    document.getElementById("nombreUsuario").textContent = nom;

    console.log("Nombre de usuario establecido:", nom);
    document.getElementById("textMensaje").focus();
});

//PARA ENVIAR LOS MENSAJES A BACK
formulariMensaje.addEventListener("submit", function(e) {
    
    e.preventDefault();
    let inputMensaje = document.getElementById("textMensaje");
    let mensaje = document.getElementById("textMensaje").value;


        try {

            socket.emit("chat:send", mensaje, nom);
            inputMensaje.value = "";

        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
        
        
    
    
});

document.getElementById("idVolver").addEventListener("click", function(){
    nom = null;

    document.getElementById("divForm").classList.remove("d-none");
    document.getElementById("idChat").classList.add("d-none");
})