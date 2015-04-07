//------------------------------------------------------------------
//--------------------------CONTROLADOR-----------------------------

//CREAR ARRAY DE TODOS LOS PRODUCTOS
getCategorias(); //Esta función genera un array llamado categorías[]
getProductos(); //Esta función genera un array llamado productos[]



//CUANDO SE HACE CLICK EN ITEM "CARTA", ENTONCES PINTO LA CARTA
$( "#menu" ).click(function() {
	pintarListadoDeCarta();
});

//CUANDO SE HACE CLICK EN BOTON "ANADIR MAS", ENTONCES PINTO LA CARTA
$( "#anadirmas" ).click(function() {
	pintarListadoDeCarta();
    $( "#menu" ).addClass("active");
    $( "#factura" ).removeClass("active");
});

//CUANDO SE HACE CLICK EN ITEM "PEDIDO", ENTONCES PINTO EL PEDIDO
$( "#factura" ).click(function() {
	pintarListadoDePedido();
});

//CUANDO SE HACE CLICK EN EL BOTÓN "+"
$('#carta').on('click','.fa-plus',function(){
	//Averiguo la cantidad que se ha seleccionado hasta el momento:
	var cantidadelemento= parseInt($(this).parent().children().next('.numeroitems').html());
	//Agrego una unidad a la cantidad:
	cantidadelemento++;
	$(this).parent().children().next('.numeroitems').html(cantidadelemento);
	//Averiguo qué ID tiene el producto clickeado:
	var id = $(this).parent().parent().attr('id').split("_");
	//Busco el producto con ese ID y le actualizo la cantidad:
	for (i in productos) {
		if(productos[i].id == id[1]){
			productos[i].cantidad = cantidadelemento;
		}
	}
    $('.sumaCantidades').empty();
    $('.sumaCantidades').append(sumarCantidades());
});

//CUANDO SE HACE CLICK EN EL BOTÓN "-"
$('#carta').on('click','.fa-minus',function(){
	//Averiguo la cantidad que se ha seleccionado hasta el momento:
	var cantidadelemento= parseInt($(this).parent().children().next('.numeroitems').html());
	if(cantidadelemento>0){
        //Quito una unidad a la cantidad:
		cantidadelemento--;
		$(this).parent().children().next('.numeroitems').html(cantidadelemento);
		//Averiguo qué ID tiene el producto clickeado:
		var id = $(this).parent().parent().attr('id').split("_");
		//Busco el producto con ese ID y actualizo la cantidad:
		for (i in productos) {
			if(productos[i].id == id[1]){
				productos[i].cantidad = cantidadelemento;
			}
		}
        $('.sumaCantidades').empty();
        $('.sumaCantidades').append(sumarCantidades());         
	}
});

//CLICK EN BOTON "LLAMAR CAMARERO"
$("#LlamarCamarero").click(function(){
    //bd->actualizar el estado de mesa por llamar --> 2
    var local_id_mesa=localStorage.getItem("id_mesa");
    estadoMesa(local_id_mesa,2);    
    alert("Has llamado el camerero");
});

//CLICK EN BOTON "ConfirmarPedido"
$("#ConfirmarPedido").click(function(){
	var total=parseInt($("#total_pedido").text());//insertar la pedido -> la mesa y total
	
    pedido = [];
    //RECORRER ARRAY PRODUCTOS Y CREAR NUEVO ARRAY PEDIDO
    for (x in productos){
        //SI LA CANTIDAD ES MAYOR A CERO
        if(productos[x].cantidad > 0){
            //INSERTAR PRODUCTO EN ARRAY PEDIDO
            pedido.push(productos[x]);
        }
    }
    var local_id_mesa=localStorage.getItem("id_mesa");
    confirmarPedido(local_id_mesa,pedido,total); 
    estadoMesa(local_id_mesa,3);
    //Setear las cantidades de cada producto nuevamente a cero
    limpiarCantidades(); 
});