<?php
	if (ISSET($_POST["username"]) && ISSET($_POST["password"]) && ISSET($_POST["email"])) {
		include "../assets/imports/config.php";

		if (preg_match("/[^A-Za-z0-9_]+/", $_POST["username"]) == 1) {
			echo "{\"type\":1,\"text\":\"That username is invalid.\"}";
			die();
		}

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
		// Do something to prevent SQL injection
		$sql1 = mysqli_query($con, "SELECT * FROM users WHERE user_name = \"" . $_POST["username"] . "\"");

		if (mysqli_num_rows($sql1) >= 1) { // If username already exists
			echo "{\"type\":0,\"text\":\"That username already exists.\"}";
			die();
		} else { // If username doesn't exist, create account
			echo "{\"type\":2,\"text\":\"Creating user account...\"}";
			$sql2 = mysqli_query($con, "INSERT INTO users (user_name, user_pword, user_email) VALUES (\"" . $_POST["username"] . "\", \"" . md5($_POST["password"]) . "\", \"" . $_POST["email"] . "\")");
		}
	}
?>