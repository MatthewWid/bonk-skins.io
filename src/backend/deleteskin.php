<?php
	if (ISSET($_GET["id"]) && ISSET($_GET["pword"])) {
		if (md5($_GET["pword"]) == "295f697f137b5c6aa59f86bad1033cf2") {
			include "../assets/imports/config.php";

			$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);
			$sql = mysqli_query($con, "DELETE FROM skins WHERE skin_id = " . $_GET["id"]);

			if (!$con) {
				echo "Unable to connect to MySQL." . PHP_EOL;
				echo "Database connection error (Num): " . mysqli_connect_errno() . PHP_EOL;
				echo "Database connection error (Desc): " . mysqli_connect_error() . PHP_EOL;
				exit;
			}

			echo "Deleted skin with ID: " . $_GET["id"];
		} else {
			echo "Password incorrect";
			echo md5("Mattey116");
		}
	}
?>