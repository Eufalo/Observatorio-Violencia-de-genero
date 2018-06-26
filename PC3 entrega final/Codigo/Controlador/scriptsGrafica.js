var tipo="";
function Cargardatepiker(){
	var fecha1 = "";
	var fecha2 = "";
	var maxY = parseInt(moment().format('YYYY'),10);//Año maximo
	//$('input[name="rango"]').daterangepicker().empty();
	var maxD = moment().format('L'); //MM/DD/YYYY
  $('input[name="rango"]').daterangepicker({
      "autoUpdateInput": false,
	  "showDropdowns": true,//Muestra combo meses
	  "minDate": moment("19990105"), //Primera noticia
	  "minYear": 1999,//Primera noticia
	  "maxDate": maxD,
	  "maxYear": maxY,//Año maximo
	  "dateLimit": {
            "days": 10000//Mas de 3 años colapsa servidor
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
        "customRangeLabel": "Custom",
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

};

function cargarContenido() {

	  $.ajax( {url:"../Modelo/graficaCasos"+tipo+".php",success: function(data){
			var json = JSON.parse(data);
			var ccaa=[];
			var casos=[];
			//console.log(json);
			json.forEach(function(elemento){
				ccaa.push(elemento['Nombre']);
				casos.push(elemento['Casos']);
			});
			//console.log(provincias,casos);
			$("#ChartTotal").html(" ");
			$("#ChartTotal").html('<h2>Casos totales '+tipo+'</h2>  <canvas id="myChartCCAA" style="height:100vh; width:100vw"></canvas>');
			crearBarChart("myChartCCAA",ccaa,casos,"Casos totales "+tipo,"horizontalBar");
}});
$("#titulofecha").empty();
$("#titulofecha").append("Seleccione "+tipo+" y fecha")

$.get("../Modelo/Nombre"+tipo+".php",function (data){
$("#provs").empty();
	var json = JSON.parse(data);
	//console.log(json);
	json.forEach(function (dat){
		$('<option value="'+dat.ID+'">'+dat.Nombre+'</option>').appendTo("#provs");
	});
});

}
//["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
function crearBarChart(name, provincias,casos,leyenda,tipochart){
	var max = Math.max.apply(Math, casos);
	//console.log(provincias,casos,leyenda)
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
});//console.log(myChart);
}
function radioClick(categoria){
	//$("#divGraficas").empty();
	if(categoria==1){
		tipo="CCAA";
		cargarContenido();
		$("#ChartProvFech").html(" ");

	}else if(categoria==0){
		tipo="Provincia";

		cargarContenido();
		$("#ChartProvFech").html(" ");

	}
}
function changemestoanos(){
	console.log($('input[name="rango"]').val());
	var fechas=$('input[name="rango"]').val();
	var fe=fechas.trim();
	var fech=fe.split("-");
	console.log(fech[0],fech[1]);
	graficaFecha(fech[0].trim(),fech[1].trim());
}
function graficaFecha(fecha1BD,fecha2BD){
	var comboprovs = document.getElementById("provs");
	var seleccionada = comboprovs.value;
	var mes_ano = $('#mes_ano option:selected').val();
//console.log(mes_ano);
if(seleccionada != ""){
	//console.log("BIEEEEEEEN");
		$("input[name='rango']").val(fecha1BD + ' - ' + fecha2BD);
	//console.log("Fecha Inicio: " + fecha1BD);
	var labels = [];
	var datos = [];
	var myColors=[];
	if(mes_ano=="Meses"){
		//console.log("entramos por meses");
	$.get( "../Modelo/meses"+tipo+".php",{id: seleccionada,Inicio: fecha1BD, Fin: fecha2BD }, function( data ) {
		var json = JSON.parse(data);
		//console.log("datos "+tipo+" entre dos fechas ",json);
		var lugar = comboprovs.options[comboprovs.selectedIndex].text;
		json.forEach(function(elemento){
				labels.push(elemento['Mes']);
				datos.push(elemento['casos']);
		});
		var monthNames =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
		var aux;
		for ( var i = 0; i < labels.length ; i++){
			labels[i] = monthNames[labels[i]-1];
		}
		$("#ChartProvFech").html(" ");
		$("#ChartProvFech").html('<canvas id="myChartProvFech"></canvas>');
		crearBarChart("myChartProvFech",labels,datos,"Casos "+tipo+"("+fecha1BD +" hasta "+ fecha2BD+")","bar");
		//console.log(fecha1,fecha2);
	});
}else if(mes_ano=="Años"){
	//console.log("entramos por años")
	$.get( "../Modelo/anos"+tipo+".php",{id: seleccionada,Inicio: fecha1BD, Fin: fecha2BD }, function( data ) {
		var json = JSON.parse(data);
		//console.log("datos "+tipo+" entre dos fechas ",json);
		var lugar = comboprovs.options[comboprovs.selectedIndex].text;
		json.forEach(function(elemento){
				labels.push(elemento['Ano']);
				datos.push(elemento['casos']);
		});

		//console.log(fecha1,fecha2);
		$("#ChartProvFech").html(" ");
		$("#ChartProvFech").html('<canvas id="myChartProvFech"style="height:40vh; width:100vw"></canvas>');
		crearBarChart("myChartProvFech",labels,datos,"Casos "+tipo+"("+fecha1BD +" hasta "+ fecha2BD+")","bar");
	});
}

}
}
function introducirFecha(){
	//console.log($('input[name="rango"]').val());

	//console.log(fech[0],fech[1]);
	graficaFecha("1999/01/05",moment().format('YYYY/MM/DD'));
	}
$('input[name="rango"]').on('cancel.daterangepicker', function(ev, picker) {
	      $(this).val('¡Ninguna fecha seleccionada!');
	  });
	 //Comportamiento al mostrar el calendario y no seleccionar fecha
	  $('input[name="rango"]').on('hide.daterangepicker', function(ev, picker) {
	      $(this).val('¡Ninguna fecha seleccionada!');
	  });
	$('input[name="rango"]').on('apply.daterangepicker', function(ev, picker) {
		//console.log(picker.startDate.format('YYYY/MM/DD'),picker.endDate.format('YYYY/MM/DD'));
	fecha1BD = picker.startDate.format('YYYY/MM/DD');
	fecha2BD = picker.endDate.format('YYYY/MM/DD');
			graficaFecha(fecha1BD,fecha2BD);
		});
