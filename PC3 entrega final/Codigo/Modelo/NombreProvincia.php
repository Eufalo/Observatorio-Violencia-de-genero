<?php
	require('./db.php');
	$count=1;

	$sel_query="SELECT  Nombre,ID_PROV From Provincias ;";

	$result = mysqli_query($con,$sel_query);

	$json = "[ "; // se deja espacio para que al quitar ?ltimo car?cter no rompa si no hay resultados
	while($row = mysqli_fetch_assoc($result)) {
		$json = $json.'{"Nombre": "'.$row["Nombre"].'","ID":'.$row["ID_PROV"].'},';

	}
	$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

	// se devuelve el resultado
	echo utf8_encode($json);
?>
