
	<?php
	require('db.php');
	$json = "[ ";
	if(isset($_REQUEST['ID_Noticia'])){// Introduciendo un id planta.
		$id_noticia= $_REQUEST['ID_Noticia'];
  $sel_query="SELECT Localizacion.Fecha_,Victima.Edad,Victima.Iniciales,Agresor.Iniciales as Agresor,Noticias.URL,Localizacion.ID_CCAA,Localizacion.ID_Provincia,Localizacion.ID_Municipio,Informacion.RelacionV_A FROM Victima,Agresor,Informacion,Noticias,Localizacion "
              ."WHERE Victima.ID_Noticia  like '". $id_noticia."' and Agresor.ID_Noticia  like '".$id_noticia
			  . "' and Informacion.ID_Noticia  like '".$id_noticia."' and Noticias.ID_Noticia like '".$id_noticia."' and Localizacion.ID_Noticia like ".$id_noticia;
	$result = mysqli_query($con,$sel_query);
		
	while($row = mysqli_fetch_assoc($result)) {
	$json = $json.'{"Fecha_":"'.$row["Fecha_"].'","Edad":'.$row["Edad"].',"Nombre":"'.$row["Iniciales"].'","Agresor":"'.$row["Agresor"].'","URL":"'.$row["URL"].'","ID_CCAA":'.$row["ID_CCAA"].',"ID_Provincia":'.$row["ID_Provincia"]
		.',"RelacionV_A":"'.$row["RelacionV_A"].'","ID_Municipio":"'.$row["ID_Municipio"].'"},';
}
$json = substr($json, 0, -1)."]"; // se quita la ?ltima coma y se cierra el array

// se devuelve el resultado
echo utf8_encode($json);
}
