<?php
	if (ISSET($_POST["username"]) && ISSET($_POST["password"]) && ISSET($_POST["email"])) {
		include "../assets/imports/config.php";

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
		$sql1 = mysqli_query($con, "SELECT * FROM users WHERE user_name = \"" . $_POST["username"] . "\"");

		if (mysqli_num_rows($sql1) >= 1) { // If username already exists
			echo "{\"type\":0,\"text\":\"That username already exists.\"}";
		} else { // If username doesn't exist, create account
			echo "{\"type\":1,\"text\":\"Creating user account...\"}";
			$sql2 = mysqli_query($con, "INSERT INTO users (user_name, user_pword, user_email) VALUES (\"" . $_POST["username"] . "\", \"" . md5($_POST["password"]) . "\", \"" . $_POST["email"] . "\")");
		}
	}
?>