$(document).ready(function(){
        $('#selectmesa').attr("disabled",false);
        getMesas();
        localStorage.removeItem("id_mesa"); 
});//acaba document ready
var ruta="model/functions.php";

$("#btn_entrar").click(function(){
        var id_mesa=$("#selectmesa option:selected").val();
        localStorage.setItem("id_mesa",id_mesa);
        //bd-->la tabla mesa cambia por estado ocupado --> 1
        if(localStorage.getItem("id_mesa")!=null){
           var local_id_mesa=localStorage.getItem("id_mesa");
           estadoMesa(local_id_mesa,1);   
        }
});
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
    /**
 * [getMesas => todas las mesas]
 */
function getMesas(){
      $.ajax({
        url:ruta, // la URL para la petición
        data:"selectmesa=null",
        type: 'POST', // especifica si será una petición POST o GET
        dataType: 'json', // el tipo de información que se espera de respuesta
        success: function(data) { 
       // código a ejecutar si la petición es satisfactoria; // la respuesta es pasada como argumento a la función
            // guardar=json;
            var html="";
            for (var x = 0 ; x < data.length ; x++) {
                html+='<option value="'+data[x].id+'">'+data[x].numero_mesa+'</option>';
            }
            $("#selectmesa").append(html);
        },
        // código a ejecutar si la petición falla;: los parámetros sonunobjeto jqXHR(extensión de XMLHttpRequest), un untexto con el estatus de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) { 
            alert('Disculpe, existió un problema'); 
        },
        
    });
}