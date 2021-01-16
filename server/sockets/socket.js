const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-controller');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, // informacion
        callback // Este es el callback para enviar la respuesta a la vista
    ) => {
        let siguiente = ticketControl.siguienteTicket();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        //Si no viene el escritorio no se puede asignar ticket
        if (!data.escritorio) {
            return callback({
                ok: false,
                err: {
                    message: 'El escritorio es necesario'
                }
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Actualizar o notificar cambios a los ultimos 4
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        })


    })

});