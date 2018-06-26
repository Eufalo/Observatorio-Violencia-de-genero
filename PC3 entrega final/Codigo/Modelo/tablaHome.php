<table id="tabla">
	<thead>
		<tr>
			<th><strong>Fecha</strong></th>
			<th><strong>Victima</strong></th>
			<th><strong>Edad</strong></th>
			<th><strong>Localizacion</strong></th>
			<th><strong>Agresor</strong></th>
      <th><strong>Parentesco</strong></th>

		</tr>
	</thead>
	<tbody>
	<?php
	require('db.php');
	$count=0;
	$sel_query="Select * from Noticias  order by ID_Noticia DESC LIMIT 7;";
	$result = mysqli_query($con,$sel_query);
  $id_noticia=array();

  $url=array();
  while($res = mysqli_fetch_assoc($result)) {
  array_push($id_noticia, $res["ID_Noticia"]);

  array_push($url, $res["ID_Noticia"]);
  }
  while($count<count($id_noticia) ){
  $sel_query="SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales as Agresor,Informacion.RelacionV_A,Localizacion.Fecha_,Localizacion.ID_CCAA,Localizacion.ID_Provincia,Localizacion.ID_Municipio FROM Victima,Agresor,Informacion,Localizacion "
                         ."WHERE Victima.ID_Noticia  like ". $id_noticia[$count]." and Agresor.ID_Noticia  like ". $id_noticia[$count]." and Informacion.ID_Noticia  like ". $id_noticia[$count]." and Localizacion.ID_Noticia like ".$id_noticia[$count]." ;";
	$result = mysqli_query($con,$sel_query);

	while($row = mysqli_fetch_assoc($result)) {//print_r($row);
		$query="SELECT Municipios.Nombre as munNombre,Provincias.Nombre as proNombre, Comunidades.Nombre as CCAANombre From Municipios,Provincias,Comunidades where Municipios.ID_Mun =".$row["ID_Municipio"]." and Provincias.ID_Prov = ".$row["ID_Provincia"]." and Comunidades.ID_CCAA = ".$row["ID_CCAA"]." ;";
		$localizacion=mysqli_query($con,$query);
		$loc=mysqli_fetch_assoc($localizacion);
?>
	<tr>
		<td><?php echo utf8_encode( $row["Fecha_"]); ?></td>
		<td><?php echo utf8_encode( $row["Iniciales"]); ?></td>
		<td><?php echo utf8_encode( $row["Edad"]); ?></td>
		<td><?php echo utf8_encode( $loc["munNombre"]."/".$loc["proNombre"]."/".$loc["CCAANombre"]); ?></td>
    <td><?php echo utf8_encode( $row["Agresor"]); ?></td>
    <td><?php echo utf8_encode( $row["RelacionV_A"]); ?></td>

	</tr>
	<?php $count++;
  }} ?>
	</tbody>
</table>
