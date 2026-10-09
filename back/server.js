const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');

const app = express();

const server = createServer(app);

const io = new Server(server);

app.use(express.static('public'));


try {
    //CONECTAR
    io.on('connection', (socket) => {

        //DESCONECTAR
        socket.on('disconnect', () => {
                if (socket.nom) {
                    console.log("Usuario desconectado:", socket.nom);
                } else {
                console.log("Usuario desconectado sin iniciar sesión");
                }        
            });

        


        //LOGEAR CON NOMBRE
        socket.on('chat:login', (nom) => {
            console.log("Nombre recibido del cliente:", nom);

            if (typeof nom !== "string" || nom.trim() === "" || nom.length > 20 || nom.trim().length < 3) {
                socket.emit("chat:error", "El nombre debe tener entre 3 y 20 caracteres.");
                return;
            }

            socket.nom = nom.trim();

            console.log("Usuario conectado:", socket.nom);

            socket.emit("chat:login:ok", socket.nom);

            
        });


        //ENVIAR MENSAJES
        socket.on('chat:send', (mensaje, nom) => {

            const ahora = new Date();
            const hora = ahora.getHours();
            const minutos = String(ahora.getMinutes()).padStart(2, "0");


            if (typeof nom !== "string" || nom.trim() === "" || nom.length > 20 || nom.trim().length < 3) {
                socket.emit("chat:error", "El nombre no es válido.");
                return;
            }

            if (typeof mensaje !== "string" || mensaje.trim() === "" || mensaje.length > 500) {
                socket.emit("chat:error", "El mensaje no es válido. No puede estar vacío ni superar los 500 caracteres.");
                return;
            }

            

            console.log("Mensaje Recibido:", mensaje);
            console.log("Nombre Recibido:", nom);
            console.log(`Hora: ${hora}:${minutos}`);

            if(socket.nom != null){
                io.emit('chat:message', mensaje,socket.nom, hora, minutos);
            }
        });
    });
} catch (error) {
    console.error("Error en la conexión de socket:", error);
}

try {
    server.listen(3000, () => {
        console.log("Conectado al puerto 3000");
    });
} catch (error) {
    console.error("Error al iniciar el servidor:", error);
}