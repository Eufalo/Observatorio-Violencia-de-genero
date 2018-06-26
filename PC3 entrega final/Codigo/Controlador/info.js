
$( document ).ready(function() {
	$('<div class="modal-content" data-theme="e"><div class="modal-header"><span class="close">&times;</span><h2 id ="informaH2">INFORMACIÓN</h2></div><div class="modal-body">'
	      +'<h1>INICIO</h1><p>En esta página, el usuario podra observar imágenes relacionadas con nuestra causa. Además, en la sección inferior, podrá consultar una tabla con nuestras últimas       noticias sobre violencia de género.</p>'
      +'<h1>FECHA</h1><p>En esta página, el usuario podrá introducir una rango de fechas para obtener casos sobre violencia de género que hayan ocurrido en el periodo de tiempo            introducido</p>'
      +'<h1>MAPA</h1><p>En esta sección, ponemos a disposición de usuario un mapa de España. En él, el usuario podra seleccionar una provincia de España para consultar los casos de'
      +'violencia de género que se han desarrollado en esa población. Para emplear esta herramienta, no es necesario acceder a una provincia en específico, sino que       simplemente que pasando el ratón por las diferentes provincias, obtendremos una información previa sobre el número de casos que han sucedido alli.</p>'
      +'<h1>V_A</h1><p>Esta pestaña nos mostrará un gráfico con los 10 tipos de relación entre una pareja que mas casos registran. Este gráfico es interactivo, por lo que podemos'
      +'modificar los casos que queremos visualizar. Además, en la parte inferior de la página, disponemos de una sección donde elegir un tipo concreto de relación, lo que             nos permitirá cargar todos los casos que se han dado siguiendo ese criterio. Estos datos son obtenidos de una base de datos, por lo que la información que nos             muestra el gráfico concuerda con el numero de casos que cargará la gráfica.</p>'
      +'<h1>Graph</h1><p>En esta sección de la página, permitiremos al usuario visualizar los datos que tenemos en la BBDD. Para interactuar con esta parte, unicamente debemos seleccionar el tipo de datos que queremos visualizar. Una vez hemos aplicado el primero filtro, podemos aplicar el segundo, concretando una CCAA o una Provincia en función de lo que hayamos seleccionado. Además, para esta última elección que haga el usuario, podrá seleccionar un rango de fechas, por lo que obtendra' +'información sobre un periodo de tiempo determinado.</p>'
+'<h1>Asistencia</h1><p>Finalmente, en cuanto a la última sección de la página, podemos encontrarnos con información relevante con el objetivo de la página. Podemos hayar el número de casos que tenemos registrados automaticamente y msotramos frases de apoyo para motivar a las victimas motivandolas a que cuenten su experiencia. Además, en este apartado informamos al usuario sobre quienes somos los creadores de la página y los distintos motivos por los que la creamos. Finalmente, situamos una' +'sección con accesos directos a información extra sobre la violencia de género.</p>'
    +'</div><div class="modal-footer"><h3 id ="informaH2">© 2018 Copyright</h3></div>').appendTo("#infoormacion");
var info=document.getElementById("infoormacion");
	var btn = document.getElementById("btn_info");

	btn.onclick = function() {
		//console.log(info.style);
	    info.style.display = "block";
			//console.log(info.style);
	}
 //console.log();
	//cuando el usuario clica en la x cierra
	var span = document.getElementsByClassName("close")[0];

		span.onclick = function() {
			//console.log(info.style);
		    info.style.display = "none";

}





	// cuando se toca en cualquier parte de la pantalla se cierra

});
