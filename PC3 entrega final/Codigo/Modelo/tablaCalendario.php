<table id="tabla">
	<thead>
		<tr>
			<th><strong>Fecha</strong></th>
			<th><strong>Victima</strong></th>
			<th><strong>Edad</strong></th>
			<th><strong>Agresor</strong></th>
			<th><strong>Parentesco</strong></th>
			<th><strong>ver</strong></th>
		</tr>
	</thead>
	<tbody>
	<?php
	require('db.php');
	if(isset($_REQUEST['Inicio'])){
		$inicio= $_REQUEST['Inicio'];
	}
	if(isset($_REQUEST['Fin'])){
		$fin= $_REQUEST['Fin'];
	}
	$count=0;
	$nombre="";
	$sel_query="SELECT Localizacion.ID_Noticia FROM Localizacion WHERE Fecha_ BETWEEN '".$inicio."' AND '".$fin."' order by ID_Noticia DESC;";
	$result = mysqli_query($con,$sel_query);
	$id_noticia=array();
	$id_not=0;
	$url=array();
	while($row = mysqli_fetch_assoc($result)) {
		array_push($id_noticia, $row["ID_Noticia"]);
		$id_not=$row["ID_Noticia"];
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
			<a onclick="abrirNoticia(<?php echo $id_not ?>);">Ver</a>
		</td>
	</tr>
	<?php $count++;
  }} ?>
	</tbody>
</table>
