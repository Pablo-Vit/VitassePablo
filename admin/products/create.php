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
if (!isset($_POST["name"]) || !isset($_POST["descr"]) || !isset($_POST["price"]) || !isset($_POST["stock"])) {
    die('{"error": "Faltan datos del formulario"}');
}
require_once "../../php/clases/Product.php";
$product = new Product();

$name = $_POST["name"];
$descr = $_POST["descr"];
$price = $_POST["price"];
$stock = $_POST["stock"];
$category = 1; // Luego si hay tiempo creo categorias
$imgName = '';
$imgDir = "../../imgs/products/";
if (!is_dir($imgDir)) {
    if (!mkdir($imgDir, 0755, true)) {
        die('{"error": "No se pudo crear el directorio de imágenes"}');
    }
}

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imgName = uniqid(). '.png';
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imgDir . $imgName)) {
        die('{"error": "No se pudo guardar la imagen"}');
    }
} else {
    $imgName = 'noimage.png';
}

$datos = [
    "name" => $name,
    "descr" => $descr,
    "path" => $imgName,
    "stock" => (int) $stock,
    "price" => (float) $price,
    "category" => (int )$category
];

echo json_encode($datos);
$product->add($datos);