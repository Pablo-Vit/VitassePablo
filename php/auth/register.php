<?php
require_once "../Clases/Database.php";
require_once "../Clases/User.php";
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_SESSION["id"])) {
    session_destroy();
    die(json_encode([
        "error" => 1,
        "msg" => "Ya has iniciado sesion."
    ]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $db = (new Database())->connect();

    // Verificar si existe el correo
    $sql = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute([':email' => $email]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    $existingEmail = $resultado !== false;

    if ($existingEmail) {
        die(json_encode([
            "error" => 2,
            "msg" => "El correo ya está en uso."
        ]));
    }

    // Registrar usuario
    $info = [
        "firstname" => $firstname,
        "lastname"=> $lastname,
        "email" => $email,
        "password" => password_hash($password, PASSWORD_BCRYPT)
    ];

    $user = new User();
    $user->add($info);

    die(json_encode([
        "error" => 0,
        "msg" => "Registrado correctamente."
    ]));
}
