<!DOCTYPE html>
<html>
  
<head>
    <title>Insert Page page</title>
</head>
  
<body>
    <center>
        <?php
  
        // servername => localhost
        // username => root
        // password => empty
        // database name => staff
        $conn = mysqli_connect("dbreviews.cjpf0zbghhrf.us-east-1.rds.amazonaws.com", "admin", "Bklounge1!", "reviews");
          
        // Check connection
        if($conn === false){
            die("ERROR: Could not connect. " 
                . mysqli_connect_error());
        }
          
        // Taking all 5 values from the form data(input)
        $Username =  $_REQUEST['Username'];
        $Score = $_REQUEST['Score'];
        $Restaurantname =  $_REQUEST['Restaurantname'];
        $review = $_REQUEST['review'];
        $cityname = $_REQUEST['cityname'];
          
        // Performing insert query execution
        // here our table name is foodreviews
        $sql = "INSERT INTO foodreviews  VALUES ('$Username', 
            '$Score','$Restaurantname','$review','$cityname')";
          
        if(mysqli_query($conn, $sql)){
            echo "<h3>data stored in a database successfully." 
                . " Please browse your localhost php my admin" 
                . " to view the updated data</h3>"; 
  
            echo ("$Username $Score "
                . "$Restaurantname $review $cityname");
        } else{
            echo "ERROR: Hush! Sorry $sql. " 
                . mysqli_error($conn);
        }
          
        // Close connection
        mysqli_close($conn);
        ?>
    </center>
</body>
  
</html>