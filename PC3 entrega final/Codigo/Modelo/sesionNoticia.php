<?php
session_start();
?>
<?php
	if(isset($_REQUEST['ID_Noticia'])){// Introduciendo un idProducto y una categoria
		$_SESSION["CargarNoticia"]= $_REQUEST['ID_Noticia'];
	}
?>
