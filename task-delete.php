<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $query = "DELETE FROM `task` WHERE id = '$id'";
        $result = mysqli_query($con, $query);

        if(!$result){
            die('Query failed!');
        }
        echo "Task Deleted successfully.";
    }

    
?>