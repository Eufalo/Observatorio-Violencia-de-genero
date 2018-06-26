<?php
	if(isset($_REQUEST['id'])) {
	$id = $_REQUEST['id'];
	}

	if(isset($_REQUEST['Inicio'])){
		$inicio= $_REQUEST['Inicio'];
	}

	if(isset($_REQUEST['Fin'])){
		$fin= $_REQUEST['Fin'];
	}
	require('db.php');
	$sel_query="SELECT MONTH(Fecha_) as mes, COUNT(ID_Noticia) as casos from 	proyecto2.Localizacion where ID_CCAA like ".$id." AND Fecha_ BETWEEN '".$inicio."' 	AND '".$fin."' group by month(Fecha_);";
	//echo $sel_query;
	
	$result = mysqli_query($con,$sel_query);

	$json = "[ "; // se deja espacio para que al quitar ?ltimo car?cter no rompa si no hay resultados
	while($row = mysqli_fetch_assoc($result)) {
		$json = $json.'{"Mes":'.$row["mes"].',"casos":'.$row["casos"].'},';

	}
	$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

	// se devuelve el resultado
	echo utf8_encode($json);
?>
