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
if(!isset($_POST['id']) && $_POST['id']!==""){
    die('{"error": "No se recibio id"}');
}
require_once "../../php/clases/Product.php";
$product = new Product();
$imgDir = '../../imgs/products/';
$datos = ["id" => $_POST["id"]];

if (isset($_POST["name"]) && $_POST["name"]!=="") {
    $product->updatename($datos["id"], $_POST["name"]);
    $datos["name"] = $_POST["name"];
}
if (isset($_POST["descr"]) && $_POST["descr"]!=="") {
    $product->updatedescr($datos["id"], $_POST["descr"]);
    $datos["descr"] = $_POST["descr"];
}
if (isset($_POST["stock"]) && (((int) $_POST["stock"])>= 0)) {
    $product->updatestock($datos["id"], $_POST["stock"]);
    $datos["stock"] = $_POST["stock"];
}
if (isset($_POST["price"]) && (((int) $_POST["price"])>= 0)) {
    $product->updateprice($datos["id"], $_POST["price"]);
    $datos["price"] = $_POST["price"];
}

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imgName = uniqid(). '.png';
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imgDir . $imgName)) {
        die('{"error": "No se pudo guardar la imagen"}');
    }
    $product->updateimage($datos["id"], $imgName);
    $datos['image'] = $imgName;
} 

echo json_encode($datos);









