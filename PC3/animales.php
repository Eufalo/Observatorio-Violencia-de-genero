<?php
	require('db.php');
// id producto categoria
	$count=1;
	$json = "[ ";

	//$categoria=0;

	if(isset($_REQUEST['ID_Animal'])){// Introduciendo un id animales.
		$id_producto= $_REQUEST['ID_Animal'];
		$sel_query="Select * from Animales where ID_Animal = '". $id_producto ."' order by ID_Animal;";
		$result = mysqli_query($con,$sel_query);
		while($row = mysqli_fetch_assoc($result)) {
			$json = $json.'{"NombreCientifico":"'.$row["NombreCientifico"].'","Nombre":"'.$row["Nombre"].'","Descripcion":"'.$row["Descripcion"].'","Reino":'.$row["Reino"].'},';
			//$json = $json.'{"poblacion":"'.$row["poblacion"].'","idpoblacion":'.$row["idpoblacion"].'},';
		}

	}else {// Sin introducir id animal resultado todas los animales
		$sel_query="Select * from Animales order by ID_Animal;";
		$result = mysqli_query($con,$sel_query);
		while($row = mysqli_fetch_assoc($result)) {
			$json = $json.'{"NombreCientifico":"'.$row["NombreCientifico"].'","Nombre":"'.$row["Nombre"].'","Descripcion":"'.$row["Descripcion"].'","Reino":'.$row["Reino"].',"ID_Animal":'.$row["ID_Animal"].'},';
			//$json = $json.'{"poblacion":"'.$row["poblacion"].'","idpoblacion":'.$row["idpoblacion"].'},';
		}
	}
	$json = substr($json, 0, -1)."]";
	// se devuelve el resultado
	echo utf8_encode($json);// Resultado NombreCientifico Nombre Descripcion Familia
?>
