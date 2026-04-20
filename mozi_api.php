<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "if0_41428018"; 
$pass = "IITiAvhArV";
$db   = "if0_41428018_mozik";

$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM mozik");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;
    // Később ide jöhet a POST (felvétel) és DELETE (törlés)
}
$conn->close();
?>