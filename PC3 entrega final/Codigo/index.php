<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
	  <!-- Librerías para usar Bootstrap -->
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
   <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
   integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
   <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	  <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>-->
   <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.css" />
   <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
   <script src="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.js"></script>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
   <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
	  <!-- Nuestro código JavaScript y nuestro CSS-->
    <link rel="stylesheet" href="./Vista/Estilos/cabeceraEstilo.css">
    <link rel="stylesheet" href="./Vista/Estilos/footerEstilos.css">
    <link rel="stylesheet" href="./Vista/Estilos/indexEstilo.css">
  </head>
  <body>
  <div data-role="page" data-theme="e">
    <div data-role="header" id="cabecera">
           <a href="./index.php"  data-role="button" data-theme="e" data-icon="icon-home" data-iconpos="left"  data-iconpos="notext" data-theme="b" data-iconpos="Left" data-inline="true">Inicio</a>
           <div id ="titulo">Observatorio Violencia<br>Genero</div>
           <a href="#rowFooter" data-role="button"  data-theme="e" data-icon="icon-info"  data-iconpos="right" data-iconpos="notext" data-theme="b" data-iconpos="right" data-inline="true">Info</a>
           <div class="botonesMenuCabecera">
             <div data-role="navbar">
            <ul>
              <li><a href="./Vista/Fecha.html"  data-theme="e" data-icon="icon-fecha" >Fecha</a></li>
              <li><a href="./Vista/mapaCalor.html" data-icon="icon-mapaCalor" data-theme="e">Mapa</a></li>
              <li><a href="./Vista/relacionV_A.html" data-icon="icon-relacion" data-theme="e">V_A</a></li>
              <li><a href="./Vista/graficas.html" data-icon="icon-mapa" data-theme="e">Graph</a></li>
            <li><a href="./Vista/asistencia.html" data-icon="icon-asistencia" data-theme="e">Asistencia</a></li>
            </ul>
           </div><!-- /navbar -->
         </div>
      </div>
      <div data-role="content">
        <div id="content">
          <h2>Computamos las víctimas de violencia de género de toda España:</h2>
            <p><i> Mujeres asesinadas, ademas de  niños y niñas que han sido asesinados/as para dañar a estas.
                    Incluimos  aquellas a las que les han robado el nombre.</i></p>
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        				  <!-- Indicators -->
                  <ol class="carousel-indicators" id="listCarrousel">

        				  </ol>

        				  <!-- Wrapper for slides -->
        				  <div class="carousel-inner">


        				  </div>

        				  <!-- Left and right controls -->
        				  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        					<span class="glyphicon glyphicon-chevron-left"></span>
        					<span class="sr-only">Anterior</span>
        				  </a>
        				  <a class="right carousel-control" href="#myCarousel" data-slide="next">
        					<span class="glyphicon glyphicon-chevron-right"></span>
        					<span class="sr-only">Siguiente</span>
        				  </a>
        				</div>
                    <?php require('./Modelo/tablaHome.php');?>
        </div>
        </div>
    <div data-role="footer" id="MyFooter">

              <div class="footerContenedor">
                <div class="rowFooter">
                  <div class="col-sm-3 myCols">
                    <h5>Get started</h5>
                    <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Sign up</a></li>
                      <li><a href="#">Downloads</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-3 myCols">
                    <h5>About us</h5>
                    <ul>
                      <li><a href="#">Company Information</a></li>
                      <li><a href="#">Contact us</a></li>
                      <li><a href="#">Reviews</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-3 myCols">
                    <h5>Support</h5>
                    <ul>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Help desk</a></li>
                      <li><a href="#">Forums</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-3 myCols">
                    <h5>Legal</h5>
                    <ul>
                      <li><a href="#">Terms of Service</a></li>
                      <li><a href="#">Terms of Use</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              <div class="social-networks">
                <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                <a href="#" class="facebook"><i class="fa fa-facebook-official"></i></a>
                <a href="#" class="google"><i class="fa fa-google-plus"></i></a>
              </div>
              </div>
              <div class="footer-copyright">
                <p>© 2018 Copyright Text </p>
              </div>
          </div>

<script src="./Controlador/scriptsIndex.js"></script>
<link rel="stylesheet" href="./Vista/Estilos/TableEstilo.css">
<link rel="stylesheet" href="./Vista/Estilos/indexEstilo.css">
  </body>
</html>
