var total;
$( document ).ready(function() {

	$.get( "../Modelo/numNoticias.php", function( data ) {

		var json = JSON.parse(data);
			//console.log("datos "+tipo+" entre dos fechas ",json);


		total = json[0]['casosTotales'];



		$('<h3>NUMERO TOTAL DE VICTIMAS HASTA LA FECHA : ' + total +' </h3>').appendTo('#victima');
	});

});
