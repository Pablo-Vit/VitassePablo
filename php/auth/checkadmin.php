<?php
session_start();
if (isset($_SESSION["id"]) && isset($_SESSION["admin"])) {
    die('{"success": true, "id": ' . $_SESSION["id"] . '}');
} else {
    die('{"success": false}');
}