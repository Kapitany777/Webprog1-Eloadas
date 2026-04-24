<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Adatbázis adatok
$host = "sql303.infinityfree.com";
$user = "if0_41428018";
$pass = "IITiAvhArV";
$db   = "if0_41428018_mozik";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Kapcsolódási hiba: " . $conn->connect_error]));
}
$conn->set_charset("utf8");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {

    case 'GET':
        $result = $conn->query("SELECT * FROM mozik ORDER BY id DESC");
        $adatok = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($adatok);
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        if (!$input || !isset($input['id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Érvénytelen adatok"]);
            break;
        }

        $stmt = $conn->prepare("UPDATE mozik SET mozinev=?, fkod=?, moziazon=?, irszam=?, cim=?, telefon=? WHERE id=?");
        $stmt->bind_param("ssssssi", 
            $input['mozinev'], 
            $input['fkod'], 
            $input['moziazon'], 
            $input['irszam'], 
            $input['cim'], 
            $input['telefon'], 
            $input['id']
        );

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Szerver hiba a módosításkor"]);
        }
        $stmt->close();
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Hiányzó ID"]);
            break;
        }
        $stmt = $conn->prepare("DELETE FROM mozik WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Hiba a törlés során"]);
        }
        $stmt->close();
        break;

    case 'OPTIONS':
        http_response_code(200);
        break;
}

$conn->close();
?>