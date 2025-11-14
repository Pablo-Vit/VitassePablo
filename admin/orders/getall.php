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
require_once "../../php/clases/Order.php";
require_once "../../php/clases/User.php";
$order = new Order();
$user = new User();

$orders = $order->getAll();

for ($i=0; $i < count($orders); $i++) { 
    $orders[$i]["items"] = $order->getProducts($orders[$i]["id"]);
}
for ($i=0; $i < count($orders); $i++) { 
    $orders[$i]["user"] = $user->getInfoForAdmin($orders[$i]["user_id"])[0];
}

if (count($orders) < 0) {
    die('{"error":"No hay pedidos guardados"}');
}
echo json_encode($orders);