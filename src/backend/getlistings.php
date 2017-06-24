<?php
	
	//include "../assets/imports/config.php";
	$con = mysqli_connect("localhost", "root", "cisco", "bonk-skins");

	$sql = mysqli_query($con, "SELECT * FROM skins");

	$res = array();
	while ($row = mysqli_fetch_assoc($sql)) {
		echo "<a class=\"card\">
			<img src=\"./backend/previews/" . $row["skin_id"] . ".png\" width=\"150\" />
			<div class=\"under\">
				<p>" . $row["skin_name"] . "</p>
				<p class=\"author\">" . $row["skin_author"] . "</p>
			</div>
		</a>";
	}

?>