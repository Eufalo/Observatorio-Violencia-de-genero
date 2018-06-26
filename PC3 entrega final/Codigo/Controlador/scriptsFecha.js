$(document).ready(function($) {


	$("#graficaFecha").html(" ");
	$('  <h2>Visualizador Fecha</h2> <canvas id="myChartFechas"></canvas>').appendTo("#graficaFecha");
	$.get( "../Modelo/casosAnoTotal.php", function( data ) {

		  		var json = JSON.parse(data);
				//console.log(json);

		  		var labels = [];
		  		var data = [];

				json.forEach(function(elemento){
		  			labels.push(elemento['Ano']);
		  			data.push(elemento['casos']);
				});

				crearBarChart("myChartFechas",labels,data,"Casos por años)","bar");


			});

	var fecha1 = "";
	var fecha2 = "";
	var maxY = parseInt(moment().format('YYYY'),10);//Año maximo
	var maxD = moment().format('L'); //MM/DD/YYYY
  $('input[name="rango"]').daterangepicker({
      "autoUpdateInput": false,
	  "showDropdowns": true,//Muestra combo meses
	  "minDate": moment("19990105"), //Primera noticia
	  "minYear": 1999,//Primera noticia
	  "maxDate": maxD,
	  "maxYear": maxY,//Año maximo
	  "dateLimit": {
            "days": 1080//Mas de 3 años colapsa servidor
        },
	  "linkedCalendars": false,
	  "ranges": { //Selecciones rapidas
           'Hoy': [moment(), moment()],
           'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
           'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
           'Este mes': [moment().startOf('month'), moment().endOf('month')],
           'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
      "locale": { //Configuracion general y traduccion
        "format": "MM/DD/YYYY",
        "separator": " - ",
        "applyLabel": "Aceptar",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Personalizado",
        "weekLabel": "W",
        "daysOfWeek": [
            "Do",
            "Lu",
            "Ma",
            "Mi",
            "Ju",
            "Vi",
            "Sa"
        ],
        "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],
        "firstDay": 1
      }
  });
//Comportamiento al aceptar
  $('input[name="rango"]').on('apply.daterangepicker', function(ev, picker) {
	  fecha1 = picker.startDate.format('DD/MM/YYYY');
	  fecha2 = picker.endDate.format('DD/MM/YYYY');
	  fecha1BD = picker.startDate.format('YYYY/MM/DD');
	  fecha2BD = picker.endDate.format('YYYY/MM/DD');
      $(this).val(fecha1 + ' - ' + fecha2);
	  //console.log("Fecha Inicio: " + fecha1);
	  //console.log("Fecha Fin: " + fecha2);
	  $( "#espacioTabla" ).empty();
	  $('#espacioTabla').append('<div id="contenedor"></div><div id="contenedor"><div class="loader" id="loader">Loading...</div></div>');
	  $.get( "../Modelo/tablaCalendario.php",{Inicio:fecha1BD,Fin:fecha2BD},function(data){

		//console.log(data);
		$( "#espacioTabla" ).empty();
		$('#espacioTabla').append('<h2>Noticias entre '+fecha1 + " y "+ fecha2 + "</h2>");
		$('#espacioTabla').append(data);
		});
  });
 //Comportamiento al cancelar
  $('input[name="rango"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('¡Ninguna fecha seleccionada!');
  });
 //Comportamiento al mostrar el calendario y no seleccionar fecha
  $('input[name="rango"]').on('hide.daterangepicker', function(ev, picker) {
      $(this).val('¡Ninguna fecha seleccionada!');
  });



});
function abrirNoticia(index){
	//console.log(index);
	$.get("../Modelo/sesionNoticia.php",{ID_Noticia:index})
	//location.href.replace("../visNoticias.php");
	window.open("./visNoticia.php", '_self');
}
function crearBarChart(name, provincias,casos,leyenda,tipochart){
	var max = Math.max.apply(Math, casos);
	console.log(provincias,casos,leyenda)
	var myColors=[];
	$.each(casos, function( index,value ) {
		  if(value> max / 1.5){
			 myColors[index]="#330033";
		  }else if ( value > max / 2){
			 myColors[index]="#990099";
		  }else if ( value > max / 2.5){
			 myColors[index]="#CC00CC";
		  }else if ( value > max / 3){
			 myColors[index]="#FF00FF";
		  }else if ( value > max / 3.5){
			 myColors[index]="#FF33FF";
		  }else if ( value > max / 4){
			 myColors[index]="#FF66FF";
		  }else if ( value > max / 4.5){
			 myColors[index]="#FF99FF";
		  }else{
			myColors[index]="#FFCCFF";
		  }
		});
		//console.log(name,"myChartProvFech");
	var ctx = document.getElementById(name).getContext('2d');

		var myChart = new Chart(ctx, {
    type: tipochart,
    data: {
        labels: provincias,
        datasets: [{
            label: leyenda,
            backgroundColor: myColors,
            borderColor: 'rgb(255, 99, 132)',
						data: casos,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
