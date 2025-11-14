<?php
require_once "../Clases/Database.php";
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_SESSION["id"])) {
    die(json_encode([
        "error" => 1,
        "msg" => "Ya has iniciado sesion."
    ]));
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = trim($_POST["password"] ?? "");

    $db = (new Database())->connect();
    $sql = 'SELECT id FROM users WHERE email = :email';
    $stmt = $db->prepare($sql);
    $stmt->execute([':email' => $email]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    $existingEmail = $resultado !== false;

    if (!$existingEmail) {
        session_destroy();
        die(json_encode([
            "error" => 2,
            "msg" => "El email no existe."
        ]));
    }
    $sql = 'SELECT id, password, is_admin FROM users WHERE email = :email';
    $stmt = $db->prepare($sql);
    $stmt->execute([':email' => $email]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!password_verify($password, $data['password'])) {
        session_destroy();
        die(json_encode([
            "error" => 3,
            "msg" => "Contraseña incorrecta."
        ]));
    }
    $_SESSION['id'] = $data['id'];
    if ($data['is_admin'] == 1) {
        $_SESSION['admin'] = true;
    }
    die(json_encode([
        "error" => 0,
        "msg" => "Logeado correctamente."
    ]));
}
