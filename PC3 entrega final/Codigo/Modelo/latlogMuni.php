
	<?php
	require('db.php');
	$json = "[ ";
	if(isset($_REQUEST['ID_Municipio'])){// Introduciendo un id planta.
		$id_mun= $_REQUEST['ID_Municipio'];
  $sel_query="SELECT LAT, LON, NOMBRE From Municipios where ID_MUN = ".$id_mun. " ;";
	$result = mysqli_query($con,$sel_query);

	while($row = mysqli_fetch_assoc($result)) {
	$json = $json.'{"LAT":'.$row["LAT"].',"LON":'.$row["LON"].',"NOMBRE":"'.$row["NOMBRE"].'"},';
}
$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

// se devuelve el resultado
echo utf8_encode($json);
}
