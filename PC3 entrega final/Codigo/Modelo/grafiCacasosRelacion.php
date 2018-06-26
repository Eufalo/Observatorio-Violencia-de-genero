
<?php
	require('db.php');
	$count=1;
	$sel_query='SELECT RelacionV_A as relacion, COUNT(ID_Noticia) as casos FROM proyecto2.Informacion GROUP BY(RelacionV_A) ORDER BY casos DESC LIMIT 10;';
	$result = mysqli_query($con,$sel_query);

	$json = "[ "; // se deja espacio para que al quitar ?ltimo car?cter no rompa si no hay resultados
	while($row = mysqli_fetch_assoc($result)) {
		$json = $json.'{"Relacion":"'.$row["relacion"].'","casos":'.$row["casos"].'},';

	}
	$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

	// se devuelve el resultado
	echo utf8_encode($json);
?>
