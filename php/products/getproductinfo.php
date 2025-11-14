<?php
session_start();
require_once "../clases/Product.php";
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die('{"error": "Usa POST"}');
}
if (!isset($_SESSION["id"])) {
    die('{"error": "Inicia sesion"}');
}
if (!isset($_POST['id']) && (int) $_POST['id'] >= 1) {
    die('{"error": "Envia una id valida"}');
}
require_once '../clases/Product.php';

$product = new Product();
$info = $product->getInfo($_POST['id']);
echo json_encode($info[0]);


