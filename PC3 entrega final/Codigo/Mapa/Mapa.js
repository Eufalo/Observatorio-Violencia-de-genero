var map;
var casos;
/*
function waitForElement(cas){
    if(typeof(cas) !== "undefined"){
         return cas;
    }
    else{
        setTimeout(waitForElement(cas), 1000);
    }
}
*/
$(document).ready(function(){
	cargarCasos_IniciarMapa();

});

function initMap() {
$( "#map" ).empty();
 map = L.map('map').setView([40.4558288, -3.6561813], 5);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Mapa de España</h4>' +  (props ?
			'<b>' + props.name + '</b><br /> Numero de casos: ' + casos[props.cod_prov]['casos']
			: 'Sitúa el ratón en una provincia');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 150 ? '#800026' :
				d > 100  ? '#BD0026' :
				d > 80  ? '#E31A1C' :
				d > 50  ? '#FC4E2A' :
				d > 30   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
	}
	//Estilo del borde de las provs :D
	function style(feature) {

	//console.log("provincia: " +feature.properties.cod_prov + ", casos:" + casos[feature.properties.cod_prov]['casos']);

		return {
			weight: 2,
			opacity: 1,
			color: 'purple',
			dashArray: '5',
			//Relleno de las provs
			fillOpacity: 0.8,

			//PRUEBAS
			fillColor: getColor(casos[feature.properties.cod_prov]['casos'])



		};
	}
	//Color del borde en función de donde este el ratón
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#000',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());

	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: function clickMap(e) {
						//console.log(e.target.feature.properties.cod_prov);
						$('#espacioTabla').append('<div id="contenedor"></div><div id="contenedor"><div class="loader" id="loader">Loading...</div></div>');
						$.get( "../Modelo/tablaMapaCalor.php",{ID_Provincia:e.target.feature.properties.cod_prov},function(data){
							//console.log(data);
							$( "#espacioTabla" ).empty();
							$('#espacioTabla').append('<h2>'+e.target.feature.properties.name+"</h2>");
							$('#espacioTabla').append(data);
						});
					}
		});
	}
/*
	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
*/

	// load GeoJSON from an external file
	$.getJSON("../Mapa/spain-provinces3.geojson",function(data){

	//console.log(casos);
	// $.getJSON("barrios_madrid.geojson",function(data){
	// add GeoJSON layer to the map once the file is loaded
	  geojson = L.geoJson(data,{
		style: style,
		jsonCasos:casos,
		onEachFeature: onEachFeature
		/*
		pointToLayer: function(feature,latlng){
			  var marker = L.marker(latlng,{icon: ratIcon});
			  marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
			  return marker;
			}
			*/
	  }).addTo(map);
	});




	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 30, 50, 80, 100, 150],
			labels = [],
			from, to;
		labels.push('Numero de casos: ');
		for (var i = 0; i < grades.length; i++) {

			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"> </i>' +
				from + (to ? '&ndash;' + to : '+')+"");
		}
		//console.log(labels);
		div.innerHTML = labels.join("<br>");
		return div;
	};

	legend.addTo(map);


}
function cargarCasos_IniciarMapa() {
	//se solicitan los marcadores para pintarlos...
	$.get( "../Modelo/casosprovs.php", function( data ) {
		//console.log(data);
		// pasar de String a un array json
		var json = JSON.parse(data);
		//console.log(json);

		casos = json;
		//return json;

		initMap();
	});
}
function abrirNoticia(index){
	//console.log(index);
	$.get("../Modelo/sesionNoticia.php",{ID_Noticia:index})
	//location.href.replace("../visNoticias.php");
	window.open("../Vista/visNoticia.php", '_self');
}
