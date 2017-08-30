<?php
	if (ISSET($_GET["u"])) {
		include "config.php";
		$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);

		$userFindQuery = "SELECT user_id, user_name, user_creation FROM users WHERE user_name = \"" . $_GET["u"] . "\"";
		$sql1 = mysqli_query($con, $userFindQuery);
		if (mysqli_num_rows($sql1) == 1) {
			$row = mysqli_fetch_array($sql1);

			$query = "SELECT * FROM skins WHERE skins.creator_id = " . $row["user_id"];
			$sql2 = mysqli_query($con, $query);
			echo "<span class=\"user\" title=\"User since " . $row["user_creation"] . "\">" . $row["user_name"] . " <span class=\"totalScore \">(" . mysqli_num_rows($sql2) . ")</span></span>";
		}
	}
?>