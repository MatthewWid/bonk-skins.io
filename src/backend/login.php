<?php
	if (ISSET($_POST["username"]) && ISSET($_POST["password"])) {
		include "../assets/imports/config.php";

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
		$sql1 = mysqli_query($con, "SELECT * FROM users WHERE user_name = \"" . $_POST["username"] . "\" AND \"" . md5($_POST["password"]) . "\"");

		if (mysqli_num_rows($sql1) == 1) { // A user has been found
			echo "{\"type\":1,\"text\":\"Found user: " . $_POST["username"] . "\"}";
		} else { // User doesn't exist or username/password is incorrect
			echo "{\"type\":0,\"text\":\"Username or password is incorrect.\"}";
		}
	}
?>