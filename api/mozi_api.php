<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Adatbázis adatok
$host = "localhost";
$user = "if0_41428018"; 
$pass = "IITiAvhArV";
$db   = "if0_41428018_mozik";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Kapcsolódási hiba: " . $conn->connect_error]));
}
$conn->set_charset("utf8");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM mozik");
        $adatok = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($adatok);
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("DELETE FROM mozik WHERE id = ?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Sikeres törlés"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Hiba a törlés során"]);
            }
            $stmt->close();
        }
        break;
        
    case 'OPTIONS':
        // CORS előzetes kérés kezelése
        http_response_code(200);
        break;
}

$conn->close();
?>