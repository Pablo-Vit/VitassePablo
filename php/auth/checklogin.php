<?php
session_start();
if (isset($_SESSION["id"])) {
    die('{"success": true, "id": ' . $_SESSION["id"] . '}');
} else {
    die('{"success": false}');
}