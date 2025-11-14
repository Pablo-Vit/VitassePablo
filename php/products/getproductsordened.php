<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die('{"error": "Usa POST"}');
}
if (!isset($_SESSION["id"])) {
    die('{"error": "Inicia sesion"}');
}
require_once "../clases/Product.php";
$product = new Product();
$products = $product->getAll();
echo json_encode($products);
