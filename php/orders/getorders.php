<?php
session_start();
if (!$_SERVER["REQUEST_METHOD"] === "POST") {
    die('{"error": "Usa POST"}');
}
if (!isset($_SESSION["id"])) {
    session_destroy();
    die('{"error": "Inicia sesion"}');
}
require_once "../clases/Order.php";
$order = new Order();
$orders = $order->getAllByUser($_SESSION["id"]);
for ($i=0; $i < count($orders); $i++) { 
    $orders[$i]["items"] = $order->getProducts($orders[$i]["id"]);
    $orders[$i]["total"] = $order->getPrice($orders[$i]["id"]);
}

if (count($orders) < 0) {
    die('{"error":"No hay pedidos guardados"}');
}
echo json_encode($orders);
