<?php
	if (ISSET($_GET["name"]) && ISSET($_GET["author"]) && ISSET($_GET["data"])) {
		include "../assets/imports/config.php";

		$name = substr(htmlentities($_GET["name"]), 0, 16);
		$author = htmlentities($_GET["author"]);
		$data = $_GET["data"];

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);

		$sql = mysqli_query($con, "INSERT INTO skins (skin_name, skin_author, skin_data) VALUES ('" . $name . "', '" . $author . "', '" . $data . "')");

		if (!$con) {
			echo "Unable to connect to MySQL." . PHP_EOL;
			echo "Database connection error (Num): " . mysqli_connect_errno() . PHP_EOL;
			echo "Database connection error (Desc): " . mysqli_connect_error() . PHP_EOL;
			exit;
		}

		echo mysqli_insert_id($con);
	}
?>