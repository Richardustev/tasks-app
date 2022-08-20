<?php
include('database.php');

$query = "SELECT * FROM `task`";
$result = mysqli_query($con, $query);

if(!$result){
    die('Query failed' . mysqli_error($con));
}

$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'descripcion' => $row['descripcion'],
        'id' => $row['id']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;

?>