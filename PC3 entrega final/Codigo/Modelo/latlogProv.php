
	<?php
	require('db.php');
	$json = "[ ";
	if(isset($_REQUEST['ID_Provincia'])){// Introduciendo un id planta.
	$id_prov= $_REQUEST['ID_Provincia'];
  $sel_query="SELECT LAT, LON, NOMBRE From Provincias where ID_PROV = ".$id_prov. " ;";
	$result = mysqli_query($con,$sel_query);

	while($row = mysqli_fetch_assoc($result)) {
	$json = $json.'{"LAT":'.$row["LAT"].',"LON":'.$row["LON"].',"NOMBRE":"'.$row["NOMBRE"].'"},';
}
$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

// se devuelve el resultado
echo utf8_encode($json);
}?>
