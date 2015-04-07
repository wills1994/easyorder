<?php
$mysql_user='root';
$mysql_password='';
$my_database='easyorder';
$mysql_host=$_SERVER['SERVER_NAME']; 
// Connecting, selecting database
$link = mysql_connect($mysql_host, $mysql_user, $mysql_password) or die('Could not connect: ' . mysql_error());
mysql_select_db($my_database) or die('Could not select database');
mysql_query("SET NAMES 'utf8'");
?>