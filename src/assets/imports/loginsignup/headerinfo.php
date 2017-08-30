<?php
	if (!ISSET($_SESSION["login_user"])) {
		echo "<div class=\"user-info\">
			<span id=\"login-button\" class=\"button-inline\">Log in</span> or <span id=\"signup-button\" class=\"button-inline\">Sign up</span>
		</div>";
	} else {
		echo "<div class=\"user-info\">
			Logged in as <a class=\"name\" href=\"./profile?u=" . $_SESSION["login_user"] . "\">" . $_SESSION["login_user"] . "</a>. <span id=\"logout-button\" class=\"button-inline\">Logout</span>
		</div>";
	}
?>