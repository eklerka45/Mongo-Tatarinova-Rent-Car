<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
require_once "../vendor/autoload.php";

try {
    $mongodb = new MongoDB\Client;
} catch (Exception $e) {
    exit($e->getMessage());
}

$cars = $mongodb->carsRent->cars;
$rent = $mongodb->carsRent->rent;

if(isset($_GET['car'])) {
    $documents = $cars->findOne(
        array('name' => $_GET['car'])
    );
    echo json_encode($documents['price']);
}

if(isset($_GET['race'])) {
    $documents = $cars->find(
        array('race'=> array('$lt' => (int)$_GET['race']))
    );
    printDocs($documents);
}

if(isset($_GET['cars'])) {
    $documents = $cars->find(
        array('name' => $_GET['cars'])
    );

    printDocs($documents);
}

function printDocs($documents) {
    $result = array();

    foreach($documents as $document) {
        array_push($result, $document);
    }

    echo json_encode($result);
}
