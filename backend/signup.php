<?php

require_once('./functions.php');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST,GET,OPTION");
header("Access-Control-Allow-Headers:Content-Type");
$connection = make_connection();

if (create_database($database)) {
    $connection->select_db($database);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $query = "CREATE TABLE IF NOT EXISTS users (
            userId int(7) primary key auto_increment,
            username varchar(200) not null,
            email varchar(200) not null unique,
            passd varchar(255) not null 
        )";

        if (!$connection->query($query)) {
            echo json_encode(array("message" => "Database table not properly created"));
        } else {
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            if ($data === null) {
                http_response_code(400);
                echo json_encode(array("Error" => "Invalid Json Data"));
                exit;
            } else {
                $username = $data['username'];
                $email = $data['email'];
                $password_hash = password_hash($data["password"], PASSWORD_BCRYPT);

                $stmt = $connection->prepare("INSERT INTO `users` (username, email, passd) VALUES (?, ?, ?)");

                $stmt->bind_param("sss", $username, $email, $password_hash);
                $stmt->execute();

                echo json_encode(array("status" => "success", "message" => "Data inserted"));
            }
        }
    }
} else {
    echo json_encode(array("message" => "Error making connection"));
}
