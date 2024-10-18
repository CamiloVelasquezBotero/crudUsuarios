<?php
// Datos de conexión
$host = 'localhost'; // Nombre del host (generalmente localhost)
$dbname = 'usuarios'; // Nombre de tu base de datos
$username = 'root'; // Nombre de usuario de la base de datos
$password = ''; // Contraseña del usuario de la base de datos

try {
    // Instancia PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Coniguracion PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /* echo "Conexión exitosa a la base de datos."; */
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error en la conexión: " . $e->getMessage();
}
?>
