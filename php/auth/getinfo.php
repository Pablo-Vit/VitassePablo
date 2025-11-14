<?php
session_start();
if (!$_SERVER["REQUEST_METHOD"] === "POST") {
    die('{"error": "Usa POST"}');
}
if (!isset($_SESSION["id"])) {
    session_destroy();
    die('{"error": "Inicia sesion"}');
}
require_once "../Clases/User.php";

$user = new User();
$datos = $user->getInfo($_SESSION["id"])[0];

echo json_encode([
        "id" => $_SESSION["id"],
        "username" => $datos["firstname"],
        "admin" => ($datos["is_admin"] == 1 ? true : false)
]);

