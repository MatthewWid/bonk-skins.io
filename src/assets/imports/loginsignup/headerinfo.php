<?php
	if (session_status() == PHP_SESSION_NONE) {
		echo "<div class=\"user-info\">
			<span id=\"login-button\" class=\"button-inline\">Log in</span> or <span id=\"signup-button\" class=\"button-inline\">Sign up</span>
		</div>";
	}
?>