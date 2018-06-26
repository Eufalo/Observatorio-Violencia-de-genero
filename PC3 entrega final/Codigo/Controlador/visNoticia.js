var tiporelacion = [];


function cargarVisNoticia(noticia){
	$.get( "../Modelo/infoNoticia.php",{ID_Noticia: noticia}, function(data) {
		var json = JSON.parse(data);
			//console.log(json);
			//console.log(json[0]);
			//console.log(noticia);
			//$( "#espacioTabla" ).empty();

			$('#Nombre').append('<h5 align="middle">'+json[0]['Nombre']+"</h5>");
			$('#Fecha').append('<h5 align="middle">'+json[0]['Fecha_']+"</h5>");
			if(json[0]['Edad']!=-1){
			$('#Edad').append('<h5 align="middle">'+json[0]['Edad']+"</h5>");
			}else{
				$('#Edad').append('<h5 align="middle">Desconocida</h5>');
			}
			if(json[0]['Agresor']!="nan"){
			$('#NombreAgresor').append('<h5 align="middle">'+json[0]['Agresor']+"</h5>");
		}else {$('#NombreAgresor').append('<h5 align="middle">Desconocido</h5>');}

			$('#RealacionV_A').append('<h5 align="middle">'+json[0]['RelacionV_A']+"</h5>");
			console.log("URL",json[0]['URL']);
			if(json[0]['URL']!="nan" && json[0]['URL']!=" "){
				$('#URl').append('<iframe  src="'+json[0]['URL']+'"></iframe>');
			}
			if(json[0]['ID_Municipio']!= -1){
				//latlogMuni(json[0]['ID_Municipio']);
				$.get( "../Modelo/latlogMuni.php",{ID_Municipio: json[0]['ID_Municipio']}, function(data){
					var jso = JSON.parse(data);
					//console.log(jso);
					if(jso[0]["LON"]!=0.000000){
						initMap(jso[0]["LAT"],jso[0]["LON"],jso[0]["NOMBRE"]);
					}else {
						//console.log("Entro");
						$.get( "latlogProv.php",{ID_Provincia: json[0]['ID_Provincia']}, function(data){
							var jso = JSON.parse(data);
								initMap(jso[0]["LAT"],jso[0]["LON"],jso[0]["NOMBRE"]);
						});
					}
				});
			}else {
				$.get( "../Modelo/latlogProv.php",{ID_Provincia: json[0]['ID_Provincia']}, function(data){
					var jso = JSON.parse(data);
						initMap(jso[0]["LAT"],jso[0]["LON"],jso[0]["NOMBRE"]);
				});
				//latlongProv(json[0]['ID_Provincia'])
			}

	});
}
function initMap(latitud,longitud,nom) {

 var map = L.map('map').setView([40.3, -3.7167], 6);
 map.flyTo([latitud, longitud], 7);
 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	 maxZoom: 18,
	 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	 id: 'mapbox.streets'
 }).addTo(map);
 L.marker([latitud, longitud]).addTo(map)
    .bindPopup(nom)
    .openPopup();

}
