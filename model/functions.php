<?php
require("../BD/conn.php");
if(isset($_POST['id_mesa'],$_POST['estado'])){
	$id_mesa=$_POST['id_mesa'];
	$estado=$_POST['estado'];
	/**
	 * [updateEstadoMesa description]
	 * @param  [int] $id_mesa [description]
	 * @param  [int] $estado  [estado del mesa=> 0-la mesa desocupada => 1-ocupada => 2-llamando al camarero ]
	 * @return [void] [ejecuta sql]
	 */
	function updateEstadoMesa($id_mesa,$estado){

		$query="UPDATE `mesa` SET `estado`=".$estado." WHERE mesa.id=".$id_mesa;
		$result = mysql_query($query) or handleDBerror();
	}
	updateEstadoMesa($id_mesa,$estado);
    
}else if(isset($_POST["id_mesa"],$_POST["pedido"],$_POST['total'])){
	$id_mesa=$_POST['id_mesa'];
    $arrayPedido = $_POST['pedido'];
    $total=$_POST['total'];
    
    //INGRESAR EL PEDIDO A LA TABLA "PEDIDOS"
    $query="INSERT INTO `pedido` (id_mesa,total) VALUES ($id_mesa,$total)";
    $result = mysql_query($query) or handleDBerror();
    
    //RECUPERAR EL ID DEL PEDIDO INGRESADO (PORQUE LO GENERA AUTOMATICAMENTE MYSQL)
    $id_pedido = mysql_insert_id();

    //INGRESAR PRODUCTOS A LA TABLA "PRODUCTO_HAS_PEDIDO"
    foreach ($arrayPedido as $producto) {
        $query="INSERT INTO `producto_has_pedido` (id_producto, id_pedido, cantidad) VALUES (".$producto[id].",".$id_pedido.",".$producto[cantidad].")";
        $result = mysql_query($query) or handleDBerror();         
    }    
    
}else if(isset($_POST["selectmesa"])){
	$query = "SELECT * FROM mesa";
	consulta($query);

}else if(isset($_POST['id'])){
	$idCat=$_POST['id'];
	$query = "SELECT producto.nombre as nom_pro,producto.precio ,categoria.nombre as cat_nombre FROM producto,categoria WHERE producto.id_categoria=categoria.id AND categoria.id=".$idCat;
	consulta($query);
}else if(isset($_POST['producto'])){
	$query = "SELECT * FROM producto";
	consulta($query);
}
else{
	$query = "SELECT * FROM categoria";
	consulta($query);
}

/**
 * [consulta => esta funcion ejecuta la sentencia sql]
 * @param  [String] $sql [parametro serà sql]
 * @return [json]      [retorna array de objectos]
 */
function consulta($sql){
	$vacio=false;
	$result = mysql_query($sql) or handleDBerror();
		
		if(mysql_num_rows($result) == 0){ 
			$vacio=false;
			echo json_encode($vacio);
		}else{
			$vacio=true;
			while($row = mysql_fetch_object($result)){
				$array[] = $row;
			}
			echo json_encode($array);	
		}
}
?>