var UrlPagos = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=GetPagos';

$(document).ready(function(){
    CargarPagos();
});

function CargarPagos(){
    $.ajax({
        url: UrlPagos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NUMERO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].FECHA_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].MONTO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].TIPO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].NUMERO_DE_PEDIDO +'</td>'+
                '<td>' + MiItems[i].EMPRESA +'</td>'+
            '</tr>';
            $('#DataPagos').html(Valores);
            }
        }
    });
}