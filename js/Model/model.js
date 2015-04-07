//------------------------------------------------------------------
//-----------------------------MODELO-------------------------------- 

//CREAR LA CLASE CATEGORIA
function Ccategoria(id, nombre){
	this.id = id;
	this.nombre = nombre;
} 
    
//CREAR LA CLASE PRODUCTO
function Cproducto(id, nombre, precio, cantidad, id_categoria, descripcion, foto){
	this.id = id;
	this.nombre = nombre;
	this.precio = precio;
	this.cantidad = cantidad;
    this.id_categoria = id_categoria;
    this.descripcion = descripcion;
    this.foto = foto;
} 

var ruta="model/functions.php";
    
//PIDO POR AJAX LAS CATEGORIAS
function getCategorias(){
    $.ajax({
        url:ruta, // la URL para la petición
        data:"categoria=null",
        type: 'POST', // especifica si será una petición POST o GET
        dataType: 'json', // el tipo de información que se espera de respuesta
        success: function(data) { 
       // código a ejecutar si la petición es satisfactoria; // la respuesta es pasada como argumento a la función
            // guardar=json;
            categorias = [];
            for (var x = 0 ; x < data.length ; x++) {
                categorias.push(new Ccategoria(data[x].id,data[x].nombre));
            }
        },
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        }
    });
} 

//PIDO POR AJAX LOS PRODUCTOS
function getProductos(){   
    $.ajax({
        url:ruta, // la URL para la petición
        data:"producto=null",
        type: 'POST', // especifica si será una petición POST o GET
        dataType: 'json', // el tipo de información que se espera de respuesta
        success: function(data) { 
       // código a ejecutar si la petición es satisfactoria; // la respuesta es pasada como argumento a la función
            // guardar=json;
            productos = [];
            for (var x = 0 ; x < data.length ; x++) {
                productos.push(new Cproducto(data[x].id, data[x].nombre, data[x].precio, 0, data[x].id_categoria, data[x].descripcion, data[x].foto));
            }
        },
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        }
    });
}


/**
 * [estadoMesa peticio del estado de toda las mesas]
 * @param  {[int]} id_mesa [id del mesa]
 * @param  {[int]} estado  [estado del mesa]
 */
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


function confirmarPedido(id_mesa,pedido,total){
    $.ajax({
        url:ruta, // la URL para la petición
        data:{id_mesa:id_mesa,pedido:pedido,total:total},
        success:pintarConfirmacion(),
        type: 'POST', // especifica si será una petición POST o GET
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        },

    });
}

function limpiarCantidades(){
    //RECORRER EL ARRAY PRODUCTOS Y SETEAR TODAS LAS CANTIDADES A CERO
	for (i in productos) {
		//SI EL PRODUCTO TIENE UNA CANTIDAD MAYOR A CERO ENTONCES...
		if(productos[i].cantidad > 0){            
			productos[i].cantidad = 0;
		}
	}
    $('.sumaCantidades').hide();
}

function sumarCantidades(){
    cant = 0;
	for (i in productos) {
		cant += productos[i].cantidad;
	}
    if(cant == 0){
        $('.sumaCantidades').hide();
    }
    else{
        $('.sumaCantidades').show();
    }
    return cant;
}