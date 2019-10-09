class Usuarios {

    constructor() {
        this.personas = [];
    }


    //=============================================
    //Agregamos una persona al arreglo this.personas
    //=============================================
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);

        return this.personas;
    }




    //=============================================
    //Buscamos a una persona en particular
    //=============================================
    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0]; //la función regresa un nuevo arreglo, por lo cual solicitamos que me entregue el valor de la primera posición 

        return persona;
    }




    //=============================================
    //Obtener todas las personas
    //=============================================
    getPersonas() {
        return this.personas;
    }




    //=============================================
    //Obtener personas por sala 
    //=============================================
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }




    //=============================================
    //Borramos una persona del arreglo 
    //=============================================
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id
        });

        return personaBorrada;
    }



} //fin de la clase Usuarios













module.exports = {
    Usuarios
}