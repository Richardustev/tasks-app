<?php
    include 'database.php';

    $search = $_POST['search'];
    
    if(!empty($search)){
        //Primero ejecutamos el query
        $query = "SELECT * FROM `task` WHERE name LIKE '$search%'";
        $result = mysqli_query($con, $query);

        //Comprobamos que el resultado sea positivo
        if(!$result){
            die('Error de consulta' . mysqli_error($con));
        }

        //Creamos un array json
        $json = array();
        //Hacemos un while en el que se haga el vaciado de datos
        while($row = mysqli_fetch_array($result)){
            //A continuacion, utilizamos el array json para crear un objeto
            $json[] = array(
                'name' => $row['name'],
                'descripcion' => $row['descripcion'],
                'id' => $row['id']
            );
        };
        //Los datos obtenidos del json, los almacenamos en jsonstring
        $jsonstring = json_encode($json);

        //Mostramos los datos.
        echo $jsonstring;
    }


?>