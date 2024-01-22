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
            username varchar(200) not null unique,
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

                $check_username_query = "SELECT username FROM users WHERE username=? ";

                $check_username_stmt = $connection->prepare($check_username_query);
                $check_username_stmt->bind_param("s", $username);

                $check_username_stmt->execute();

                $check_username_stmt_result = $check_username_stmt->get_result();

                if ($check_username_stmt_result->num_rows > 0) {
                    echo json_encode(array("status" => "Failue", "message" => "This username is already used"));
                } else {
                    $password_hash = password_hash($data["password"], PASSWORD_BCRYPT);

                    $stmt = $connection->prepare("INSERT INTO `users` (username, email, passd) VALUES (?, ?, ?)");

                    $stmt->bind_param("sss", $username, $email, $password_hash);
                    $stmt->execute();

                    echo json_encode(array("status" => "success", "message" => "Data inserted"));
                }
            }
        }
    }
} else {
    echo json_encode(array("message" => "Error making connection"));
}
