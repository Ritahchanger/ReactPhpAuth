<?php

$database = "reactPhpAuthentication";

function make_connection()
{
    $servername = "localhost";
    $username = "root";
    $password = "";

    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        die("This connection could not be set. " . $conn->connect_error);
    }
    return $conn;
}
function create_database($database)
{
    $conn = make_connection();
    $sql = "CREATE DATABASE IF NOT EXISTS $database";
    if (!$conn->query($sql)) {
        return false;
    } else {
        return true;
    }
}
