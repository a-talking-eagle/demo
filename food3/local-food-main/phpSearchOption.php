<?php

$search = $_POST['search'];
$column = $_POST['column'];

$conn = mysqli_connect("dbreviews.cjpf0zbghhrf.us-east-1.rds.amazonaws.com", "admin", "Bklounge1!", "reviews");

if ($conn->connect_error){
	die("Connection failed: ". $conn->connect_error);
}

$sql = "select * from foodreviews where $column like '%$search%'";

$result = $conn->query($sql);

if ($result->num_rows > 0){
while($row = $result->fetch_assoc() ){
	echo $row["Username"]."  ".$row["Score"]." ".$row["Restaurantname"]." ".$row["review"]."  ".$row["cityname"]."<br>";
}
} else {
	echo "0 records";
}

$conn->close();

?>