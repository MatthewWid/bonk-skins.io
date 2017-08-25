<?php
	include __DIR__ . "/../assets/imports/config.php";
	$con = mysqli_connect($server_ip, $server_user, $server_password, $server_db);

	$pagesize = 9;
	$initLoad = $pagesize * 3;

	function renderListings($sql) {
		if (mysqli_num_rows($sql) != 0) {
			while ($row = mysqli_fetch_array($sql)) {
				echo "<div class=\"card\">
					<a class=\"card-image\" href=\"editor?id=" . $row["skin_id"] . "&editable=false\">
						<img src=\"./backend/previews/" . $row["skin_id"] . ".png\" width=\"150\" />
					</a>
					<div class=\"card-details\">
						<p>" . $row["skin_name"] . "</p>
						<p class=\"author\">" . $row["skin_author"] . "</p>
					</div>
				</div>";
			}
		} else {
			echo "No results found.";
		}
	}

	$search = ISSET($_GET["q"]) ? ("WHERE skin_name LIKE \"%" . $_GET["q"] . "%\" OR skin_author LIKE \"%" . $_GET["q"] . "%\"") : "";
	$limitstr = "";
	if (ISSET($_GET["page"])) { // Requesting new page of skins on search page
		$pagenmbr = $initLoad + (intval($_GET["page"] - 1) * $pagesize); // Already loaded posts + (current page * amount of posts per page)
		$limitstr = "LIMIT " . $pagenmbr . ", " . $pagesize;
	}
	if (!ISSET($_GET["page"]) && !ISSET($_GET["q"])) { // Initial load on home page
		$limitstr = "LIMIT " . $initLoad;
	}
	if (!ISSET($_GET["page"]) && ISSET($_GET["q"])) { // Initial load on search page
		$limitstr = "LIMIT " . $initLoad;
	}
	$query = "SELECT skin_id, skin_name, skin_author FROM skins " . $search . " ORDER BY skin_creation DESC " . $limitstr;
	$sql = mysqli_query($con, $query);

	renderListings($sql);
?>