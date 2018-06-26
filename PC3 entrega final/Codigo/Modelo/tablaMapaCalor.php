
<table id="tabla">
	<thead>
		<tr>
			<th>Fecha</th>
			<th>Victima</th>
			<th>Edad</th>
			<th>Agresor</th>
      <th>Parentesco</th>
			<th>ver</th>
		</tr>
	</thead>
	<tbody>
	<?php
	require('db.php');
	if(isset($_REQUEST['ID_Provincia'])){// Introduciendo un id planta.
		$id_prov= $_REQUEST['ID_Provincia'];
	$count=0;
	$nombre="";
	//$sel_query="SELECT Localizacion.ID_Noticia,Provincias.NOMBRE FROM Localizacion, Provincias WHERE Provincias.ID_PROV  = ". $id_prov." and Localizacion.ID_Provincia = ". $id_prov." order by ID_Noticia DESC;";
	$sel_query="SELECT Localizacion.ID_Noticia FROM Localizacion WHERE  Localizacion.ID_Provincia = ". $id_prov." order by ID_Noticia DESC;";
	$result = mysqli_query($con,$sel_query);
  $id_noticia=array();
	$id_not=0;
  $url=array();
  while($row = mysqli_fetch_assoc($result)) {
  array_push($id_noticia, $row["ID_Noticia"]);
	$id_not=$row["ID_Noticia"];
	//$nombre=$row["NOMBRE"];
  //array_push($url, $row["ID_Noticia"]);
  	}
  while($count<count($id_noticia) ){
  $sel_query="SELECT Localizacion.Fecha_,Victima.Edad,Victima.Iniciales,Agresor.Iniciales as Agresor,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias,Localizacion "
                         ."WHERE Victima.ID_Noticia  like ". $id_noticia[$count]." and Agresor.ID_Noticia  like ".$id_noticia[$count]
												 . " and Informacion.ID_Noticia  like ".$id_noticia[$count]." and Noticias.ID_Noticia like ".$id_noticia[$count]." and Localizacion.ID_Noticia like ".$id_noticia[$count];
	$result = mysqli_query($con,$sel_query);

	while($row = mysqli_fetch_assoc($result)) {

?>


	<tr>
		<td><?php echo utf8_encode( $row["Fecha_"]); ?></td>
		<td><?php echo utf8_encode( $row["Iniciales"]); ?></td>
		<td><?php echo utf8_encode( $row["Edad"]); ?></td>
    <td><?php echo utf8_encode( $row["Agresor"]); ?></td>
    <td><?php echo utf8_encode( $row["RelacionV_A"]); ?></td>
		<td align="center">
			<a onclick="abrirNoticia(<?php echo $id_not ?>);">ver</a>
		</td>
	</tr>
	<?php $count++;
}}} ?>
	</tbody>
</table>
