var socket = io();

var params = new URLSearchParams(window.location.search); //URLSearchParams obtiene de la url del navegador los parámetros necesarios. En este caso el nombre

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}



//======================================================
//El usuario se autentifica ante el servidor (socket.js) 'entrarChat'
//======================================================
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios Conectados: ', resp);
    });
});




//======================================================
//El usuario se desconecta del chat
//======================================================
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});




// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */




//======================================================
//Recibimos el mensaje de 'crearMensaje' de socket.js
//======================================================
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});




//======================================================
//Escuchar cambios de usuarios. Cuando un usuario entra o sale del chat. 'listaPersona' de socket.js
//======================================================
socket.on('listaPersona', function(personas) {
    console.log(personas);
});






//======================================================
//Mensajes Privados. 'mensajePrivado' de socket.js
//======================================================
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});