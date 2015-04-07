$(document).ready(function(){
	ensenyaTodoMesas();
	$('#historico').ready(function(){
		//alert("hola");
		//setInterval("location.reload()",5000);
		
	});

});

var ruta="model/functions.php";

function verPedido(id_mesa){
    $('#pedidos').html("");
    getPedido(id_mesa);   
}
/**
 * [getPedido => peticio a todas los pedidos]
 */
 function getPedido(id_mesa){//pasar numero_mesa
        $.ajax({
            url:ruta, // la URL para la petición
            data:"numero_mesa="+id_mesa,
            type: 'POST', // especifica si será una petición POST o GET
            dataType: 'json', // el tipo de información que se espera de respuesta
            success: function(data) { 
           // código a ejecutar si la petición es satisfactoria; // la respuesta es pasada como argumento a la función
                // guardar=json;
                  pintaPedido(data);
            },
            // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
            error : function(jqXHR, status, error) { 
                alert('Disculpe, existió un problema'); 
            },
            
        });
    }
/**
 * [ensenyaTodoMesas peticio todas las mesas]
 * @return {[void]} [pinta en HTML todas las mesas]
 */
function ensenyaTodoMesas(){
     $.ajax({
            url:ruta, // la URL para la petición
            dataType: 'json', // el tipo de información que se espera de respuesta
            success: function(data) { 
           // código a ejecutar si la petición es satisfactoria; // la respuesta es pasada como argumento a la función
                // guardar=json;
                pintaListadoMesa(data);
            },
            // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
            error : function(jqXHR, status, error) { 
                alert('Disculpe, existió un problema'); 
            },
            
        });   
}
/**
 * [pintaListadoMesa pinta las mesas]
 * @param  {[json]} data [array de objecto de todas las mesa]
 * @return {[type]}      [description]
 */
function pintaListadoMesa(data){
	var html="";
	var color;
	var string="";
    var pedido_color="yellow";
    var tabla="<tr><th>Data-Hora</th><th>Nº mesa</th><th>Estado</th></tr><tr>";
	var select="";
    for (var x = 0 ; x < data.length ; x++) {
        
			if(data[x].estado==1){
				color="block_mesa blanco";
				string="ocupada";
			}else if (data[x].estado==2){
				color="block_mesa rojo";
				string="llama camarero";
			}else if(data[x].estado==3){
				color="block_mesa rojo";
				string="hay pedido";
                pedido_color="verde";
			}else{
                color="block_mesa";
				string="libre";
            }

            select+="<option value='"+data[x].estado+"'>"+string+"</option>";

			var hora=data[x].hora.split(" ");
			var fecha=hora[0].split("-");
            var hora=hora[1];
			var anyo=fecha[0];
			var mes=fecha[1]+"-";
			var dia=fecha[2]+"-";
            tabla+="<td>"+dia+mes+anyo+" "+hora+"</td><td>"+data[x].numero_mesa+"</td><td>"+string+"</td></tr>";
			html+='<div class="'+color+'">MESA '+data[x].numero_mesa+
                    '<div onclick=verPedido("'+data[x].id+'") class="pedido_res '+pedido_color+'"></div>';
            if(data[x].estado!=0){
               html+="<div class='refresh' onclick='cambiarEstado("+data[x].id+")' ></div>";
               // html+='<img class="refresh" src="image/refresh.png" />';
            }
            html+='</div>';
        } 

        $("#historico table").append(tabla);
        $('#listaMesa').append(html); 
}
function cambiarEstado(id){   
        if (confirm("¿Seguro que quieres actualitzar el estado ?")){
            estadoMesa(id,0);
            //borrar pedidos
            borrarPedido(id);            
            alert("S'ha actualitzado la mesa "+id);
            window.location.reload();
        }
}
function pintaPedido(data){
    html="<h3>Pedidos</h3><table>";
    if(data==false){
        html+='<tr><td>No has pedido todavía</td></tr>';
    }else{
        html+="<tr><th>Nombre del plato</th><th>Precio</th><th>Cantidad</th><th>SubTotal</th></tr>";
        for (var x = 0 ; x < data.length-1 ; x++) {
            html+='<tr><td>'+data[x].nombre+'</td><td>'+data[x].precio+'</td><td>'+data[x].cantidad+'</td><td>'+data[x].subtotal+'</td></tr>';
        }

        html+="<tr><td colspan='3'><b>Total</b></td><td>"+data[x].total+"</td></tr>";
    }  
    html+="</table>";
    $('#pedidos').append(html);  
}
function borrarPedido(id){
     $.ajax({
        url:ruta, // la URL para la petición
        data:{id_mesa_pedido:id},
        type: 'POST', // especifica si será una petición POST o GET
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        },
        
    });    
}   

function estadoMesa(id_mesa,estado){
 $.ajax({
        url:ruta, // la URL para la petición
        data:{id_mesa:id_mesa,estado:estado},
        type: 'POST', // especifica si será una petición POST o GET
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        },
        
    });
}