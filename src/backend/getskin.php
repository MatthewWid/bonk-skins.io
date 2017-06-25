<?php
	if (ISSET($_GET["id"])) {
		include "../assets/imports/config.php";
		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);

		$sql = mysqli_query($con, "SELECT * FROM skins WHERE skin_id = " . $_GET["id"]);

		while ($row = mysqli_fetch_assoc($sql)) {
			echo $row["skin_data"];
		}
	}
?>