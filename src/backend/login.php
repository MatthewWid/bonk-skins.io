<?php
	session_start();
	if (ISSET($_POST["username"]) && ISSET($_POST["password"])) {
		include "../assets/imports/config.php";

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
		// Do something to prevent SQL injection
		$sql1 = mysqli_query($con, "SELECT * FROM users WHERE user_name = \"" . $_POST["username"] . "\" AND \"" . md5($_POST["password"]) . "\"");

		if (mysqli_num_rows($sql1) == 1) { // A user has been found
			$row = mysqli_fetch_array($sql1);
			$_SESSION["login_id"] = $row["user_id"];
			$_SESSION["login_user"] = $row["user_name"];
			echo "{\"type\":1,\"text\":\"Logging in: " . $_POST["username"] . "\"}";
		} else { // User doesn't exist or username/password is incorrect
			echo "{\"type\":0,\"text\":\"Username or password is incorrect.\"}";
		}
	}
?>