// variables globales. Para poder usarlas desde todas las funciones.
var map;
var zonasCalor = []; // contenedor para los marcadores del mapa
var bounds; // Se crea una "envoltura" para gestionar zoom y centrado del mapa


function initMap() {
	// Se crea una "envoltura" para gestionar zoom y centrado del mapa
	var posicion = {lat: 40.373056, lng: -3.919213};
	map = L.map('map').setView([40.373056, -3.919213], 5);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);
	//Cargamos el combo box de provincias
	$.get( "plantas.php", function(data) {
	//console.log( "datos descargados: " + data )
	// pasar de String a un array json
	var json = JSON.parse(data);
	//console.log(json);
	var selector = document.getElementById("planta");//$("#provincias")
	json.forEach(function(elemento){
    var opcion = document.createElement("option");
        opcion.text = elemento.NombreCientifico;
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = elemento.ID_Planta;
        selector.add(opcion);
    });
		selector.selectedIndex = -1;
		});
		$.get( "animales.php", function(data) {
		//console.log( "datos descargados: " + data )
		// pasar de String a un array json
		var json = JSON.parse(data);
		//console.log(json);
		var selector = document.getElementById("animal");//$("#provincias")
		json.forEach(function(elemento){
	    var opcion = document.createElement("option");
	        opcion.text = elemento.NombreCientifico;
	        // Añadimos un value a los option para hacer mas facil escoger los pueblos
	        opcion.value = elemento.ID_Animal;
	        selector.add(opcion);
	    });
			selector.selectedIndex = -1;
			});


	// SE A�ADEN LOS MARCADORES QUE YA EXISTEN EN LA BBDD
	//pintarMarcadoresBBDD();
}
function Animales(){
	MapaCalor("animal",1);
}
function Plantas(){
	MapaCalor("planta",0);
}
function MapaCalor(aux,categoria){

	var selector = document.getElementById(aux);

	$.get( "ubicacion.php",{ID_Producto:(selector).value,Categoria:categoria}, function(data) {
	// pasar de String a un array json
	var json = JSON.parse(data);
	var nombreProducto= selector.options[selector.selectedIndex].text;
	//console.log(aux);
	//console.log(selector.options[selector.selectedIndex].text);//Recuperamos el texto del obejo selector
	if(json.length=4){
		var polygon = L.polygon([
    [json[0].Latitud,json[0].Longitud],
    [json[1].Latitud,json[1].Longitud],
    [json[3].Latitud,json[3].Longitud],
		[json[2].Latitud,json[2].Longitud],
]).addTo(map);

	zonasCalor.push(polygon);
	}
		selector.selectedIndex = -1;

	map.setView([json[0].Latitud, json[0].Longitud], 3);

	polygon.bindPopup(nombreProducto.toString().concat(", ",json[0].Latitud.toString(),", ",json[0].Longitud.toString() )).openPopup();
	zonasCalor.push(polygon);

});

}
