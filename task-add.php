<?php

    include('database.php');
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $descripcion = $_POST['descripcion'];

        $query = "INSERT INTO task VALUES (null, '$name', '$descripcion')";
        $result = mysqli_query($con, $query);

        if(!$result){
            die('La consulta ha fallado.');
        }
        echo 'Task added successfully.';
    }

?>