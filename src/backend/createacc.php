<?php
	if (ISSET($_POST["username"]) && ISSET($_POST["password"]) && ISSET($_POST["email"])) {
		include "../assets/imports/config.php";

		if (preg_match("/[^A-Za-z0-9_]+/", $_POST["username"]) == 1 || !(strlen($_POST["username"]) >= 3 && strlen($_POST["username"]) <= 16)) {
			echo "{\"type\":1,\"text\":\"That username is invalid.\"}";
			die();
		}
		if (!(strlen($_POST["password"]) >= 8 && strlen($_POST["password"]) <= 24)) {
			echo "{\"type\":4,\"text\":\"That password is invalid.\"}";
			die();
		}

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
		// Do something to prevent SQL injection
		$sql1 = mysqli_query($con, "SELECT * FROM users WHERE user_name = \"" . $_POST["username"] . "\"");

		if (mysqli_num_rows($sql1) >= 1) { // If username already exists
			echo "{\"type\":0,\"text\":\"That username already exists.\"}";
			die();
		} elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) && $_POST["email"]) {
			echo "{\"type\":2,\"text\":\"That email is invalid.\"}";
			die();
		} else { // If username doesn't exist, create account
			$sql2 = mysqli_query($con, "INSERT INTO users (user_name, user_pword" . (ISSET($_POST["email"]) ? ", user_email" : "") . ") VALUES (\"" . $_POST["username"] . "\", \"" . md5($_POST["password"]) . "\"" . (ISSET($_POST["email"]) ? ", \"" . $_POST["email"] . "\")" : ""));
			if (mysqli_affected_rows($con) != 0) {
				echo "{\"type\":3,\"text\":\"Your account has been created. You can now log in.\"}";
			}
		}
	}
?>