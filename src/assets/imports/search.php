<div class="search-container">
	<input id="search-bar" type="text" maxlength="16" minlength="1" required <?php if (ISSET($_GET["q"])) { echo "value=\"" . $_GET["q"] . "\""; } ?> />
	<div class="search-placeholder">Search...</div>
	<div id="search-button"><i class="fa fa-search" aria-hidden="true"></i></div>
</div>