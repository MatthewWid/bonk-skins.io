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
						<a href=\"./profile?u=" . $row["skin_author"] . "\" class=\"author\">" . $row["skin_author"] . "</a>
					</div>
				</div>";
			}
		} else {
			echo "No results found.";
		}
	}

	// Terrible code...
	$search = ISSET($_GET["q"]) ? ("WHERE skin_name LIKE \"%" . $_GET["q"] . "%\" OR skin_author LIKE \"%" . $_GET["q"] . "%\"") : "";
	$limitstr = "";
	$userfind = "";
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
	if (ISSET($_GET["u"])) { // Inital load on user page
		$userFindQuery = "SELECT user_id FROM users WHERE user_name = \"" . $_GET["u"] . "\"";
		$sql = mysqli_query($con, $userFindQuery);

		if (mysqli_num_rows($sql) == 1) {
			$row = mysqli_fetch_array($sql);
			$userfind = "WHERE skins.creator_id = " . $row["user_id"];
		} else {
			echo "That user does not exist.";
			die();
		}
	}
	if (ISSET($_GET["u"])) { // Getting skins by user takes precedence over getting skins by query
		$query = "SELECT DISTINCT skin_id, skin_name, skin_author FROM skins, users " . $userfind . " ORDER BY skin_creation DESC " . $limitstr;
	} elseif (ISSET($_GET["q"])) { // Get skins by query
		$query = "SELECT skin_id, skin_name, skin_author, creator_id FROM skins " . $search . " ORDER BY skin_creation DESC " . $limitstr;
	} else {// Get skins normally
		$query = "SELECT * FROM skins ORDER BY skin_creation DESC " . $limitstr;
	}
	$sql = mysqli_query($con, $query);

	renderListings($sql);
?>