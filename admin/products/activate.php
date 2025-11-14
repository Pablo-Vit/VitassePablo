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
require_once "../../php/clases/Product.php";
$product = new Product();

$product->activate($_POST['id']);
echo '{"success": "Producto activado"}';