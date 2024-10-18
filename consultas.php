<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Permitir CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

/* ----- POST */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo JSON de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica que se hayan recibido los datos correctamente
    if ($data && isset($data['nombre'], $data['email'], $data['telefono'], $data['direccion'])) {
        // Asignar los valores del JSON a las variables
        $nombre = $data['nombre'];
        $email = $data['email'];
        $telefono = $data['telefono'];
        $direccion = $data['direccion'];

        // Para depuración: imprimir la dirección
        echo "Dirección recibida: " . $direccion;

        try {
            // Preparar la consulta
            $query = "INSERT INTO usuario (nombre, email, telefono, direccion) VALUES (:nombre, :email, :telefono, :direccion)";
            $statement = $pdo->prepare($query);

            // Asignar los valores a los parámetros de la consulta
            $statement->bindParam(':nombre', $nombre);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':telefono', $telefono);
            $statement->bindParam(':direccion', $direccion);

            // Ejecutar la consulta
            $statement->execute();

            echo 'Datos insertados correctamente';
        } catch (PDOException $e) {
            echo 'Error al insertar los datos: ' . $e->getMessage();
        }
    } else {
        // Mensaje de error si faltan datos
        echo 'Error: No se recibieron todos los datos.';
    }
}

/* ----- GET-ALL */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Obtener y asegurar que el ID sea un entero
        try {
            // Preparar la consulta para obtener un usuario por ID
            $query = "SELECT * FROM usuario WHERE id = :id";
            $statement = $pdo->prepare($query);
            $statement->bindParam(':id', $id, PDO::PARAM_INT); // Vincular el parámetro
            $statement->execute();

            // Obtener el resultado
            $result = $statement->fetch(PDO::FETCH_ASSOC);

            // Devolver el resultado como JSON
            if ($result) {
                echo json_encode($result);
            } else {
                echo json_encode(['message' => 'Usuario no encontrado']);
            }
        } catch (PDOException $e) {
            echo 'Error al obtener los datos: ' . $e->getMessage();
        }
    } else { /* SI NO SE ENCUENTRA EL ID EN EL GET */
        try {
            
            // Preparar la consulta
            $query = "SELECT * FROM usuario"; // O especifica las columnas que deseas
            $statement = $pdo->prepare($query);
            $statement->execute();
    
            // Obtener los resultados como un array asociativo
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    
            // Devolver los resultados como JSON
            echo json_encode($result);
        } catch (PDOException $e) {
            echo 'Error al obtener los datos: ' . $e->getMessage();
        }
    }
}

/* ----- PUT */
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Decodificar el cuerpo JSON de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica que se hayan recibido los datos correctamente
    if ($data && isset($data['id'], $data['nombre'], $data['email'], $data['telefono'], $data['direccion'])) {
        // Asignar los valores del JSON a las variables
        $id = $data['id'];
        $nombre = $data['nombre'];
        $email = $data['email'];
        $telefono = $data['telefono'];
        $direccion = $data['direccion'];

        try {
            /* Preparamos consulta */
            $query = "UPDATE usuario SET nombre = :nombre, email = :email, telefono = :telefono, direccion = :direccion WHERE telefono = :telefono";
            $statement = $pdo->prepare($query);

            // Asignar los valores a los parámetros de la consulta
            $statement->bindParam(':nombre', $nombre);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':telefono', $telefono);
            $statement->bindParam(':direccion', $direccion);
            $statement->bindParam(':id', $id);

            // Ejecutar la consulta
            $statement->execute();

            echo 'Datos actualizados correctamente';
        } catch (PDOException $e) {
            echo 'Error al actualizar los datos: ' . $e->getMessage();
        }
    } else {
        // Mensaje de error si faltan datos
        echo 'Error: No se recibieron todos los datos.';
    }
}
/* ----- DELETE */
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Decodificar el cuerpo JSON de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica que se haya recibido el ID del usuario a eliminar
    if ($data && isset($data['id'])) {
        // Asignar el ID del JSON a la variable
        $id = $data['id'];

        try {
            // Preparar la consulta para eliminar el usuario
            $query = "DELETE FROM usuario WHERE id = :id";
            $statement = $pdo->prepare($query);

            // Asignar el valor a los parámetros de la consulta
            $statement->bindParam(':id', $id);

            // Ejecutar la consulta
            $statement->execute();

            // Verifica si se eliminó algún registro
            if ($statement->rowCount() > 0) {
                echo 'Usuario eliminado correctamente';
            } else {
                echo 'No se encontró ningún usuario con ese ID';
            }
        } catch (PDOException $e) {
            echo 'Error al eliminar el usuario: ' . $e->getMessage();
        }
    } else {
        // Mensaje de error si no se recibe el ID
        echo 'Error: No se recibió el ID del usuario.';
    }
}

?>
