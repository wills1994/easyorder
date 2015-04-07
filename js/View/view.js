//------------------------------------------------------------------
//----------------------------VISTAS--------------------------------

//FUNCION PARA IMPRIMIR EL "UL" DE UNA CATEGORIA DE LA CARTA
function imprimir_ul_carta (id, nombre){
    html = '<section class="categoria"><h2 class="cat">'+ nombre + 
          '<i class="fa fa-caret-square-o-down"></i></h2>' +
          '<ul class="listaplatos" id="categoria_'+ id +'"></ul></section>';
    return html;
} 
    
//FUNCION PARA IMPRIMIR EL "LI" DE UN PRODUCTO DE LA CARTA
function imprimir_li_carta (id, nombre, precio, cantidad, descripcion){
    var botones ='<button class="btnmenu fa fa-plus "></button>	<span class="numeroitems"> ' + cantidad + ' </span>	<button class="btnmenu fa fa-minus "></button>';	
    return "<li id='carta_" + id + "'><span class='plato'>" + nombre + "</span><span class='precio right'>" + precio + "€ " + botones + "</span></li>";
}    

//FUNCION PARA IMPRIMIR EL "LI" DE UN PRODUCTO DEL PEDIDO   
function imprimir_li_pedido (id, nombre, precio, cantidad){
    return "<li id='carta_" + id + "'><span class='plato'>" + nombre + "</span><span class='precio right'>" + precio + "€ (" + cantidad + ")</span></li>";
} 


//FUNCION PARA PINTAR TODO EL LISTADO DE UNA CARTA
function pintarListadoDeCarta(){
    $("#listado").empty(); //Limpio pantalla para volver a imprimirla
	$("#carta").empty(); //Limpio pantalla para volver a imprimirla
    //MUESTRO EL LISTADO DE PRODUCTOS de TODA LA CARTA
	for (c in categorias) {  
        $("#carta").append(imprimir_ul_carta(categorias[c].id, categorias[c].nombre));
        for (p in productos) {
            if(productos[p].id_categoria == categorias[c].id){
                var htmlprodtemp=imprimir_li_carta(productos[p].id, productos[p].nombre, productos[p].precio, productos[p].cantidad, productos[p].descripcion);
                $(htmlprodtemp).appendTo('#categoria_' + categorias[c].id);
            }
        }  
	}
}

//FUNCION PARA PINTAR TODO EL LISTADO DE UN PEDIDO
function pintarListadoDePedido(){
    $("#carta").empty(); //Limpio pantalla para volver a imprimirla
	//MUESTRO EL LISTADO DE PRODUCTOS DEL RESUMEN 
	$("#listado").empty(); //Limpio pantalla para volver a imprimirla
	var precio_total = 0;
	for (i in productos) {
		//SI EL PRODUCTO TIENE UNA CANTIDAD MAYOR A CERO ENTONCES...
		if(productos[i].cantidad > 0){            
			$("#listado").append(imprimir_li_pedido(productos[i].id, productos[i].nombre, productos[i].precio, productos[i].cantidad));//IMPRIMO PRODUCTO QUE SE HA PEDIDO
			precio_total += productos[i].cantidad * productos[i].precio; //SUMO EL PRECIO TOTAL
		}
	}
    if(precio_total > 0){
/*        var botones = "<section><ul id='listadoPedido'></ul><button id='ConfirmarPedido'>Confirmar Pedido</button> <a id='anadirmas'><button>Anadir mas</button></a></section>";
        $("#resumenpedido").append("<br/><br/><span class='right'><b>EL PRECIO TOTAL ES: " + precio_total + "€</b></span>" + botones);*/
        $("#listado").append("<br/><br/><span class='right'>EL PRECIO TOTAL ES:<b id='total_pedido'>" + precio_total + "</b>€</span>");
        $("#botones").show();
    }
    else{
        $("#listado").append("<div class='no-pedido'>¡Aún no has pedido nada!</div>");
        $("#botones").hide();
    }
} 

//CONFIRMACION DE PEDIDO
function pintarConfirmacion(){
    $("#carta").empty(); //Limpio pantalla para volver a imprimirla
	//MUESTRO EL LISTADO DE PRODUCTOS DEL RESUMEN 
	$("#listado").empty(); //Limpio pantalla para volver a imprimirla
	$("#listado").append("<span style='font-size:30px; color:gray;'> <br><i class='fa fa-check-circle-o'></i> ¡Felicidades! Has realizado el pedido correctamente <br><br><br><span class='animated infinite bounce alerta'><i class='fa fa-exclamation-triangle'></i> EMERGENCIA: NO TE OLVIDES DE PEDIR DOBLE DE BRAVAS</span></span>");
    $("#botones").hide();
}

/*-------------------------------ANIMACIONES-------------------------------*/

//TOOGLE EN LAS CATEGORIAS DE LA CARTA
$("#carta").on("click",'.cat', function(){        
   $(this).next('ul').slideToggle().siblings('ul').slideUp();   
   $(this).toggleClass('active').find('i').toggleClass('fa-caret-square-o-down fa-caret-square-o-up')});

//EFECTO ANIMACION IZQUIERDA -> DERECHA EN SECCION "CARTA"
$("#menu").click(function(){     
    $("#waitersection").hide();
    $("#resumenpedido").hide();
    $("#carta").show("3000");
    $(this).addClass("active");
    $(this).siblings().removeClass();
});

$("#anadirmas").click(function(){     
    $("#waitersection").hide();
    $("#resumenpedido").hide();
    $("#carta").show("3000");
    $(this).addClass("active");
    $(this).siblings().removeClass();
});

//EFECTO ANIMACION IZQUIERDA -> DERECHA EN SECCION "WAITERSECTION"
$("#camarero").click(function(){
    $("#carta").hide();
    $("#resumenpedido").hide();
    $("#waitersection").show("3000");
    $(this).addClass("active");
    $(this).siblings().removeClass();
});

//EFECTO ANIMACION IZQUIERDA -> DERECHA EN SECCION "RESUMENPEDIDO"
$("#factura").click(function(){         
    $("#carta").hide();
    $("#waitersection").hide();
    $("#resumenpedido").show("3000");
    $(this).addClass("active");
    $(this).siblings().removeClass();
});
   