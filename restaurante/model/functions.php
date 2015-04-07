<?php
require("../../BD/conn.php");
if(isset($_POST['numero_mesa'])){
	$numero_mesa=$_POST['numero_mesa'];
	listaPedido($numero_mesa);
}else if(isset($_POST['id_mesa'],$_POST['estado'])){
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
		$result = mysql_query($query);
	}
	updateEstadoMesa($id_mesa,$estado);
}elseif (isset($_POST['id_mesa_pedido'])) {
	$id_mesa_pedido=$_POST['id_mesa_pedido'];
	$query="DELETE FROM `pedido` WHERE id_mesa=".$id_mesa_pedido;
	$result = mysql_query($query);

}else{
	listadoMesa();
}
/**
 * [listadoMesa ver todas las mesas]
 * @return [json] [array de objecto]
 */
function listadoMesa(){
	$query="SELECT * FROM mesa ORDER BY hora asc";
	consulta($query);	
} 

function listaPedido($numero_mesa){
	$query="SELECT producto.nombre,cantidad,precio, cantidad*precio as subtotal FROM producto_has_pedido,pedido,producto 
			where producto_has_pedido.id_producto=producto.id and producto_has_pedido.id_pedido=pedido.id
				and pedido.id_mesa=".$numero_mesa;
	$query2="SELECT SUM(cantidad*precio) as total FROM producto_has_pedido,pedido,producto 
			where producto_has_pedido.id_producto=producto.id and producto_has_pedido.id_pedido=pedido.id
				and pedido.id_mesa=".$numero_mesa;				
	$vacio=false;
	$result = mysql_query($query) or handleDBerror();
	
	$result2 = mysql_query($query2) or handleDBerror();	

		if(mysql_num_rows($result) == 0){ 
			$vacio=false;
			echo json_encode($vacio);
		}else{
			$vacio=true;
			while($row = mysql_fetch_object($result)){
				$array[] = $row;
			}
			while($row2 = mysql_fetch_object($result2)){
				$array[]=$row2;
			}

			echo json_encode($array);	
		}

}


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