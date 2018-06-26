var tiporelacion = [];

$(document).ready(function(){
	$('  <h2>Visualizador Relacion Victima Agresor </h2> <canvas id="myChartRelacionV_A"></canvas>').appendTo("#graficarelacionV_A");
	cargarParentescos();
	cargarGrafica();

});
function cargarParentescos() {
//console.log("hola");
	$.get( "../Modelo/relacion.php", function( data ) {
		//console.log( "Datos descargados: " + data );
		//console.log(data);
		// pasar de String a un array json
		var json = JSON.parse(data);
		var comboParentescos = document.getElementById("Parentesco");
		json.forEach(function(obj) {
			var isIn = false;
			var i = 0;
			if(tiporelacion.length != 0){
				while(i < tiporelacion.length && !isIn){
					if(obj.RelacionV_A == tiporelacion[i]){
						isIn = true;
					} else{
						i++;
					}
				}
				if(!isIn){
					tiporelacion.push(obj.RelacionV_A);
				}

			} else {
				tiporelacion.push(obj.RelacionV_A);
			}
		});

		//console.log(tiporelacion);

		tiporelacion.forEach (function(obj){
		var option = document.createElement('option');
			option.text = obj;
			comboParentescos.add(option);
		});

		comboParentescos.selectedIndex = -1;

	});
}

function cargarTabla() {

	var comboParentescos = document.getElementById("Parentesco");
	var seleccionada = comboParentescos.value;

	//console.log( seleccionada );

	$.get( "../Modelo/tablaRelacion.php",{Parentesco: seleccionada}, function(data) {
			//console.log(data);
			$( "#espacioTabla" ).empty();
			$('#espacioTabla').append('<h2>'+seleccionada+"</h2>");
			$('#espacioTabla').append(data);


	});
}
function cargarGrafica(){
	$.get( "../Modelo/grafiCacasosRelacion.php", function( data ) {

		//console.log(data);

		var json = JSON.parse(data);
		var labels = [];
		var datos = [];
		var myColors=[];

		json.forEach(function(elemento){
			labels.push(elemento['Relacion']);
			datos.push(elemento['casos']);
	});


	var max = Math.max.apply(Math, datos);


	$.each(datos, function( index,value ) {
		  if(value> max / 1.1){
			 myColors[index]="#990099";
		  }else if ( value > max / 2){
			 myColors[index]="#CC00CC";
		  }else if ( value > max / 6){
			 myColors[index]="#FF33CC";
		  }else if ( value > max / 15){
			 myColors[index]="#FF00FF";
		  }else if ( value > max / 30){
			 myColors[index]="#FF66FF";
		  }else if ( value > max / 40){
			 myColors[index]="#FF99FF";
		  }else{
			myColors[index]="#FFCCFF";
		  }
		});


	var ctx = document.getElementById('myChartRelacionV_A').getContext('2d');
		var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'doughnut',

			// The data for our dataset
			data: {
				labels: labels,
				datasets: [{
					label: "Casos por tipo de Relacion V_A",
					backgroundColor: myColors,
					data: datos,
				}]
			},

			// Configuration options go here
			options: {
				scales: {
					   xAxes: [{

							gridLines: {
							display: false
									},
							ticks: {
							fontSize: 0
									}
					   }],
					   yAxes: [{
							gridLines: {
							display: false
						  },
						  ticks: {
							fontSize: 0
									}
					   }]
					},

					}
			});

});

}
function abrirNoticia(index){
	//console.log(index);
	$.get("../Modelo/sesionNoticia.php",{ID_Noticia:index})
	//location.href.replace("../visNoticias.php");
	window.open("./visNoticia.php", '_self');
}
