const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');

const app = express();

const server = createServer(app);

const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket)=> {

    socket.on('mensaje', (mensaje, nom) => {


        console.log("Mensaje Recibido", mensaje);
        console.log("Nombre Recibido", nom);


        io.emit('mensaje', mensaje, nom);
    })
});


server.listen(3000, () => {
    console.log("Conectado al puerto 3000");
});