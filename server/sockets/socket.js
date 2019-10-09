const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios'); //importamos el archivo usuarios.js para usar particularmente la clase Usuarios
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();



//Entorno de conexión con el usuario
io.on('connection', (client) => {
    //======================================================
    //Se recibe la autenticación del usuario (socket-chat.js) 'entrarChat'
    //======================================================
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));

    });





    //======================================================
    //El servidor manda un mensaje a todos los que están conectados
    //======================================================
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });





    //======================================================
    //Desconectamos a los usuarios que no están en el chat 
    //======================================================
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });





    //======================================================
    //Mensajes Privados. 'mensajePrivado' de socket-chat.js
    //======================================================
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });



});