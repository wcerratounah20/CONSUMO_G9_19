var UrlPedidos = 'http://20.216.41.245:90/G9_19/CONTROL/PEDIDO.php?op=GetPedidos';
var UrlInsertPedidos = 'http://20.216.41.245:90/G9_19/CONTROL/PEDIDO.php?op=InsertPedido';
var UrlGetPedido = 'http://20.216.41.245:90/G9_19/CONTROL/PEDIDO.php?op=GetPedido';
var UrlUpdatePedidos = 'http://20.216.41.245:90/G9_19/CONTROL/PEDIDO.php?op=UpdatePedido';
var UrlDeletePedidos = 'http://20.216.41.245:90/G9_19/CONTROL/PEDIDO.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();

});

function CargarPedidos(){
    $.ajax({
       url: UrlPedidos,
       type: 'GET',
       datatype: 'JSON', 
       success: function(reponse){
        var MiItems = reponse
        var Valores= '';

        for(i=0; i<MiItems.length; i++){
            Valores +=   '<tr>'+
            
            '<td>'+ MiItems[i].NUMERO_PEDIDO +'</td>'+ 
            '<td>'+ MiItems[i].NUMERO_CLIENTE +'</td>'+ 
            '<td>'+ MiItems[i].EMPRESA +'</td>'+ 
            '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+ 
            '<td>'+ MiItems[i].DIRECCION +'</td>'+ 
            '<td>'+ MiItems[i].TIPO_DE_PAGO +'</td>'+ 
            '<td>'+ MiItems[i].MONTO_TOTAL +'<td>'+
            '<td>' +
            '<button class="btn" style="background-color:#94b8b8; " onclick="CargarPedido('+ MiItems[i].NUMERO_PEDIDO +')">Editar</button>'+
            '</td>'+
            '<td>' +
            '<button class="btn" style="background-color:#b8949d; "onclick="EliminarPedido('+ MiItems[i].NUMERO_PEDIDO +')">Eliminar</button>'+
            '</td>'+
        '</tr>';
        $('#DataPedidos').html(Valores);

        }
       }  
    });
}

function AgregarPedido(){
    var datospedidos = {
        NUMERO_PEDIDO: $('#NUMERO_PEDIDO').val(),
        NUMERO_CLIENTE: $('#NUMERO_CLIENTE').val(),
        EMPRESA: $('#EMPRESA').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPO_DE_PAGO: $('#TIPO_DE_PAGO').val(),
        MONTO_TOTAL: $('#MONTO_TOTAL').val()

    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlInsertPedidos,
        type: 'POST',
        data: datospedidosjson , 
        datatype: 'JSON', 
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pedido agregado correctamente');
        },
        error: function(textStatus, errorThrown ){
            alert('Error al agregar el pedido'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarPedido(numeropedido){
    var datospedido = {
    NUMERO_PEDIDO: numeropedido

    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON', 
        contentType: 'application/json',
        success: function(reponse){
         var MiItems = reponse
        
         $('#NUMERO_PEDIDO').val(MiItems[0].NUMERO_PEDIDO);
         $('#NUMERO_CLIENTE').val(MiItems[0].NUMERO_CLIENTE);
         $('#EMPRESA').val(MiItems[0].EMPRESA);
         $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
         $('#DIRECCION').val(MiItems[0].DIRECCION);
         $('#TIPO_DE_PAGO').val(MiItems[0].TIPO_DE_PAGO);
         $('#MONTO_TOTAL').val(MiItems[0].MONTO_TOTAL);
         var btnactualizar = '<input type="submit" id"btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].NUMERO_PEDIDO + ')"' + 
         'value="Actualizar Pedido" class="btn btn-primary"></input>';
         $('#btnagregarpedido').html(btnactualizar);

 
         }
        
     });
 }

 function ActualizarPedido(numeropedido){
    var datospedido = {
        NUMERO_PEDIDO: numeropedido,
        NUMERO_CLIENTE: $('#NUMERO_CLIENTE').val(),
        EMPRESA: $('#EMPRESA').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPO_DE_PAGO: $('#TIPO_DE_PAGO').val(),
        MONTO_TOTAL: $('#MONTO_TOTAL').val()


    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlUpdatePedidos,
        type: 'PUT',
        data: datospedidojson , 
        datatype: 'JSON', 
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pedido actualizado correctamente');
        },
        error: function(textStatus, errorThrown ){
            alert('Error al actualizar el pedido'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
 }

 function EliminarPedido(numeropedido){
    var datospedido = {
        NUMERO_PEDIDO: numeropedido

    };
    var datospedidojson = JSON.stringify(datospedido);


    $.ajax({
        url: UrlDeletePedidos,
        type: 'DELETE',
        data: datospedidojson , 
        datatype: 'JSON', 
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
          
        }
        
    });
    alert("Pedido Eliminado");
    CargarPedidos();
 }


