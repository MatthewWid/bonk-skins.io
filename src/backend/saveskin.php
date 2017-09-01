<?php
	session_start();
	if (ISSET($_GET["name"]) && ISSET($_GET["data"]) && ISSET($_SESSION["login_id"]) && ISSET($_SESSION["login_user"])) {
		include "../assets/imports/config.php";

		$name = substr(preg_replace('/[^A-Za-z0-9\_\ ]/', '', $_GET["name"]), 0, 16);
		$arr = json_decode($_GET["data"], true);
		$arr["author"] = $_SESSION["login_user"];
		$json = json_encode($arr);

		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);

		$sql = mysqli_query($con, "INSERT INTO skins (skin_name, skin_author, creator_id, skin_data) VALUES ('" . $name . "', '" . $_SESSION["login_user"] . "', '" . $_SESSION["login_id"] . "', '" . $json . "')");

		echo $con->insert_id;
	}
?>