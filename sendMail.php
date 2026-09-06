<?php
// Erlaubt Angular, mit dieser Datei zu kommunizieren
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Lese die Daten aus, die Angular schickt
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

// HIER DEINE HETZNER MAIL-ADRESSE EINTRAGEN:
$to = "hi@timo-boening.de"; 
$subject = "Neue Kontaktanfrage von: " . $name;

$emailContent = "Name: " . $name . "\n";
$emailContent .= "E-Mail: " . $email . "\n\n";
$emailContent .= "Nachricht:\n" . $message . "\n";

$headers = "From: noreply@timo-boening.de\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $emailContent, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>