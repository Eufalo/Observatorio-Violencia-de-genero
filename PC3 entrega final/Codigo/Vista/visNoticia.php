<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
	  <!-- Librerías para usar Bootstrap -->
	  <meta name="viewport" content="width=device-width, initial-scale=1">

   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
   <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
   <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
	  <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>-->

   <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
   <script src="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
   <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"/>
   <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.1/jquery.mobile-1.2.1.min.css" />
   <script src="../Controlador/scriptsArriba.js"></script>

	  <!-- Nuestro código JavaScript y nuestro CSS-->

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" >
    <link rel="stylesheet" href="./Estilos/cabeceraEstilo.css">
    <link rel="stylesheet" href="./Estilos/footerEstilos.css">
    <link rel="stylesheet" href="./Estilos/mapaEstilo.css">
    <link rel="stylesheet" href="./Estilos/arriba.css">
  	<link rel="stylesheet" href="../img/ir-arriba/fonts.css">
    <link rel="stylesheet" href="./Estilos/info.css">
  </head>
  <body>
  <div data-role="page" data-theme="e">
  	<div data-role="header" id="cabecera">
         <a href="../index.php"  data-role="button" data-theme="e" data-icon="icon-home" data-iconpos="left"  data-iconpos="notext" data-theme="b" data-iconpos="Left" data-inline="true">Inicio</a>
         <div id ="titulo">Observatorio Violencia<br>Genero</div>
         <a href="#rowFooter"  id="btn_info" data-role="button"  data-theme="e" data-icon="icon-info"  data-iconpos="right" data-iconpos="notext" data-theme="b" data-iconpos="right" data-inline="true">Info</a>
         <div class="botonesMenuCabecera">
           <div data-role="navbar">
		      <ul>
            <li><a href="./Fecha.html"  data-theme="e" data-icon="icon-fecha" >Fecha</a></li>
      			<li><a href="./mapaCalor.html" data-icon="icon-mapaCalor" data-theme="e">Mapa</a></li>
            <li><a href="./relacionV_A.html" data-icon="icon-relacion" data-theme="e">V_A</a></li>
            <li><a href="./graficas.html" data-icon="icon-mapa" data-theme="e">Graph</a></li>
            <li><a href="./asistencia.html" data-icon="icon-asistencia" data-theme="e">Asistencia</a></li>
		      </ul>
	       </div><!-- /navbar -->
       </div>
    </div>
	<div data-role="content"> <div id="content">
    <div id="URl"></div>
<div class="row">
<div class="col-md-6">
  <h2 align="center">Victima</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="background" data-theme="a">
                <div id="Nombre">
                  <h4 align="center">Nombre</h4>
                </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="background">
                <div id="Fecha">
                  <h4 align="center">Fecha</h4>
                </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="backgroundImagenText">
                <div id="Edad">
                  <h4 align="center">Edad</h4  >
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md-6">
        <h2 align="center">Agresor</h2>
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-4">
                  <div class="background" data-theme="a">
                      <div id="NombreAgresor">
                        <h4 align="center">NombreAgresor</h4>
                      </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="background">
                    <div id="RealacionV_A">
                        <h4 align="center">RelacionV_A </h4>
                      </div>
                  </div>
                </div>

              </div>
              </div>
        </div>


              <div id="map"></div>

      </div>
      <div id="infoormacion" class="modal">

         </div>
    </div>
    <div data-role="footer" id="MyFooter">
  		<span class="ir-arriba icon-arrow-up"></span>
  						<div class="container">
                   <div class="row">
                       <div class="col-sm-4 myCols">
                           <h5>Comencemos</h5>
                           <ul>
                               <li><a href="index.html">Inicio</a></li>
                               <li><a href="como.html">Funcionamiento</a></li>
                               <li><a href="contribuir.html">Formulario</a></li>
                               <li><a href="donacion.html">Donaciones</a></li>

                           </ul>
                       </div>
                       <div class="col-sm-4 myCols">
                           <h5>Sobre nosotros</h5>
                           <ul>
                               <li><a href="quien.html">Informacion de la compañia</a></li>

                           </ul>
                       </div>
                       <div class="col-sm-4 myCols">
                           <h5>Soporte</h5>
                           <ul>
                               <li><a href="FAQ.html">FAQ</a></li>
                               <li><a href="como.html">Ayuda</a></li>
                           </ul>
                       </div>
                   </div>
               </div>
               <div class="social-networks">
                  <h5>Contacto</h5>
                   <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
                   <a href="#" class="facebook"><i class="fab fa-facebook"></i></a>
                   <a href="#" class="google"><i class="fab fa-google-plus"></i></a>
               </div>
               <div class="footer-copyright">
                   <p>© 2018 Copyright</p>
               </div>


          </div>
</div>

  <script src="../Controlador/visNoticia.js"></script>
  <link rel="stylesheet" href="./Estilos/ifonoticiaEstilo.css">
   <script src="../Controlador/info.js"></script>
  <?php
  if(isset($_SESSION['CargarNoticia'])){
    echo "<script> cargarVisNoticia(".$_SESSION['CargarNoticia'].");</script>";
  }
?>
  </body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
</html>
