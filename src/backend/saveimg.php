<?php
	if (ISSET($_POST["id"]) && ISSET($_POST["img"])) {
		include "../assets/imports/config.php";

		$id = $_POST["id"];
		$img = $_POST["img"];

		// https://stackoverflow.com/a/22147929/2954591
		$img = str_replace('data:image/png;base64,', '', $img);
		$img = str_replace(" ", "+", $img);
		$data = base64_decode($img);

		file_put_contents("../backend/previews/" . $id . ".png", $data);

		echo "Saved to server!";
	}
?>