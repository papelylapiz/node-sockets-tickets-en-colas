//Codigo ECMAScript6
//Caracteristica class
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0; //Ultimo ticket
        this.hoy = new Date().getDate(); //Fecha de hoy
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return `No hay mas tickets`;
        }

        let numeroTicket = this.tickets[0].numero;
        //Eliminar un lemento del arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //Agregar al principio del arreglo
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            //Eliminar el ultimo elemento del arreglo
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4', this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }

    getUltimos4() {
        return this.ultimos4;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha re-inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('Se ha gurdado el archivo');
    }

}
module.exports = {
    TicketControl
}