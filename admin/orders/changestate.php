<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die('{"error": "Usa POST"}');
}
if (!isset($_SESSION["id"])) {
    die('{"error": "Inicia sesion"}');
}
if (!isset($_SESSION['admin'])) {
    die('{"error": "No eres admin"}');
}
if(!isset($_POST['id']) && ((int) $_POST['id']>= 1)){
    die('{"error": "No se recibio id"}');
}
if(!isset($_POST['state'])){
    die('{"error": "No se recibio el estado"}');
}
require_once "../../php/clases/Order.php";
$order = new Order();

$order->updateState($_POST["id"], $_POST["state"]);

echo '{"msg":"Estado cambiado correctamente('.$_POST["state"].')"}';


