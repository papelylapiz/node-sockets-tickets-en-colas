//Comando para obtener la coneccion desde el servidor
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor');
});
socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(respuestaRecibida){ 
    label.text(respuestaRecibida.actual);
 });

$('button').on('click', function(){
   
    socket.emit('siguienteTicket',//nombre del mensaje q capturar en backend o servidor node
            null //Detalle del mensaje a enviar
            , function(siguienteTicket){ //Funcion callback se ejecuta luego del envio el parametro siguienteTicket es el recibido desde el backend
       
        label.text(siguienteTicket);
     });
});

