<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

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
        $result = $conn->query("SELECT * FROM mozik");
        $adatok = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($adatok);
        break;

    case 'POST':
        $input    = json_decode(file_get_contents("php://input"), true);
        $mozinev  = $conn->real_escape_string($input['mozinev']  ?? '');
        $fkod     = $conn->real_escape_string($input['fkod']     ?? '');
        $moziazon = $conn->real_escape_string($input['moziazon'] ?? '');
        $irszam   = $conn->real_escape_string($input['irszam']   ?? '');
        $cim      = $conn->real_escape_string($input['cim']      ?? '');
        $telefon  = $conn->real_escape_string($input['telefon']  ?? '');
        $stmt = $conn->prepare("INSERT INTO mozik (mozinev, fkod, moziazon, irszam, cim, telefon) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $mozinev, $fkod, $moziazon, $irszam, $cim, $telefon);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Hiba a mentés során"]);
        }
        $stmt->close();
        break;

    case 'PUT':
        $input    = json_decode(file_get_contents("php://input"), true);
        $id       = intval($input['id']       ?? 0);
        $mozinev  = $conn->real_escape_string($input['mozinev']  ?? '');
        $fkod     = $conn->real_escape_string($input['fkod']     ?? '');
        $moziazon = $conn->real_escape_string($input['moziazon'] ?? '');
        $irszam   = $conn->real_escape_string($input['irszam']   ?? '');
        $cim      = $conn->real_escape_string($input['cim']      ?? '');
        $telefon  = $conn->real_escape_string($input['telefon']  ?? '');
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Hiányzó ID"]);
            break;
        }
        $stmt = $conn->prepare("UPDATE mozik SET mozinev=?, fkod=?, moziazon=?, irszam=?, cim=?, telefon=? WHERE id=?");
        $stmt->bind_param("ssssssi", $mozinev, $fkod, $moziazon, $irszam, $cim, $telefon, $id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Sikeres módosítás"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Hiba a módosítás során"]);
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
            echo json_encode(["success" => true, "message" => "Sikeres törlés"]);
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
