<?php
header('Content-Type: application/json; charset=utf-8');


$host = "sql303.infinityfree.com"; 
$user = "if0_41428018";           
$pass = "IITiAvhArV";
$db   = "if0_41428018_film";      

$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die(json_encode(["error" => "Kapcsolódási hiba"]));
}


$result = $conn->query("SELECT * FROM filmek");
$adatok = [];

while($row = $result->fetch_assoc()) {
    $adatok[] = $row;
}

echo json_encode($adatok);
$conn->close();
?>