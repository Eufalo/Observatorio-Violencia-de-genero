<?php
	require('db.php');
	$count=1;
	$sel_query="SELECT ID_Noticia, RelacionV_A FROM proyecto2.Informacion;";
	$result = mysqli_query($con,$sel_query);

	$json = "[ "; // se deja espacio para que al quitar ?ltimo car?cter no rompa si no hay resultados
	while($row = mysqli_fetch_assoc($result)) {
		$json = $json.'{"ID_Noticia":'.$row["ID_Noticia"].',"RelacionV_A":"'.$row["RelacionV_A"].'"},';

	}
	$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

	// se devuelve el resultado
	echo utf8_encode($json);
?>
