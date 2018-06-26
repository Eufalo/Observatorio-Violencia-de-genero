<?php
// Enter your Host, username, password, database below.
// I left password empty because i do not set password on localhost.
//$con = mysqli_connect("localhost","root","","proyecto2");
$con = mysqli_connect("18.218.59.123:3306","Richi","weed","proyecto2");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
