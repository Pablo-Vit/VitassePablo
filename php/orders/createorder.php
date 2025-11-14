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


if (isset($_POST["items"])) {
    $items = json_decode($_POST["items"], true);
    if (is_array($items) && count($items) > 0) {
        echo json_encode($items);
        $order = new Order();
        $order->add($_SESSION["id"], $items);
    }
} else {
    echo '{"error": "Items invalidos"}';
}
