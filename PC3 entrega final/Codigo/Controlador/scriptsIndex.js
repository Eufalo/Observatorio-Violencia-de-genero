/**
 * Created by alejandroabadmartinez on 12/4/18.
 */
 $(document).ready(function() {

	cargarImagenesCarrousel();
});
 function cargarImagenesCarrousel(){
 	$.get( "./Modelo/listDir.php",{dir:"./img/Carrousel/"}, function(data) {
 	//console.log( "datos descargados: " + data )
 	// pasar de String a un array json
 	var json = JSON.parse(data);
 	//    console.log(json);

 	var index=0;
 	json.forEach(function(elemento){
    //console.log(elemento);
 		$('<div class="item container-fluid"><img src="'+elemento.ruta+'" class="img-fluid img-thumbnail"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
     $('<li data-target="#myCarousel" data-slide-to="'+index+'"></li>').appendTo('.carousel-indicators');
 		index++;
 		});
 		$('.item').first().addClass('active');
 	  $('.carousel-indicators > li').first().addClass('active');
 	  $('#myCarousel').carousel();
 		});
 	}
