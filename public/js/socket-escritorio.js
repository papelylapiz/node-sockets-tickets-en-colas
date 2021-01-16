//ES RECOMENDABLE TRABAJAR CON EMACSCRIPT 5 QUE ES COMPATIBLE CON VARIOS TIPOS DE NAVEGADORES DEL LADO DEL FRONT
var socket = io();
var label = $('small');
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay mas tickets') {
            alert(resp);
            return;
        }
        label.text(resp.numero);
    })
});