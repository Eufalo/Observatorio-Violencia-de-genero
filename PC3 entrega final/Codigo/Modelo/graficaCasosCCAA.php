<?php
	require('./db.php');
	$count=1;

	$sel_query="SELECT  Comunidades.Nombre,count(Localizacion.`ID_Noticia`) as casos From Localizacion INNER JOIN Comunidades ON Comunidades.ID_CCAA = Localizacion.ID_CCAA  Group by Comunidades.ID_CCAA ORDER BY Comunidades.ID_CCAA";

	$result = mysqli_query($con,$sel_query);

	$json = "[ "; // se deja espacio para que al quitar ?ltimo car?cter no rompa si no hay resultados
	while($row = mysqli_fetch_assoc($result)) {
		$json = $json.'{"Nombre": "'.$row["Nombre"].'","Casos":'.$row["casos"].'},';

	}
	$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

	// se devuelve el resultado
	echo utf8_encode($json);
?>
