<!DOCTYPE html>
<html>
	<head>
		<title>Listings - Bonk-Skins.io</title>

		<!-- Typefaces -->
		<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Titillium+Web:700" />
		<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto" />
		<script src="https://use.fontawesome.com/12aad66375.js" defer></script>

		<!-- Favicon -->
		<link rel="apple-touch-icon" sizes="180x180" href="./assets/favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" href="./assets/favicon/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="./assets/favicon/favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="./assets/favicon/manifest.json">
		<link rel="mask-icon" href="./assets/favicon/safari-pinned-tab.svg" color="#5bbad5">

		<link rel="stylesheet" type="text/css" href="./styles/css/index.css" />
	</head>
	<body>
		<noscript>
			<h1>This website requires Javascript to be functional. Sorry :(</h1>
		</noscript>
		<div id="header">
			<?php
				include "./assets/imports/logo.php";
			?>
			<div class="sort-list">
				<a class="page" href="javascript:void(0);"><i class="fa fa-tag"></i> New</a>
				<a class="page disabled" href="javascript:void(0);"><i class="fa fa-star-o"></i> Top</a>
				<a class="page disabled" href="javascript:void(0);"><i class="fa fa-fire"></i> Hot</a>
			</div>
			<?php
				include "./assets/imports/search.php";
			?>
			<a id="makeaskin" class="button raised" href="editor">Make a skin</a>
		</div>
		<div id="content">
			<div class="page" id="page-0">
				<?php
					include "./backend/getlistings.php";
				?>
			</div>
		</div>
		<div class="under-content">
			<button id="loadmore" class="flat">LOAD MORE</button>
		</div>

		<div id="signup-modal" class="modal disabled">
			<div class="modal-bg"></div>
			<div class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Sign Up</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<form id="signup-form" class="user-form" autocomplete="off">
							<div class="user-section">
								<label class="user-text" for="username">Username</label>
								<input class="user-input" type="text" name="username" placeholder="Required" autocomplete="username" minlength="3" maxlength="16" required />
							</div>
							<div class="user-section">
								<label class="user-text" for="password">Password</label>
								<input class="user-input" type="password" name="password" placeholder="Required" autocomplete="new-password" minlength="8" maxlength="24" required />
							</div>
							<div class="user-section">
								<label class="user-text" for="email">Email</label>
								<input class="user-input" type="email" name="email" placeholder="Optional" autocomplete="email" />
							</div>
							<div class="user-section">
								<p id="signup-output" class="user-error hidden">SERVER RESPONSE</p>
							</div>
							<input class="user-submit" type="submit" />
					</form>
				</div>
			</div>
		</div>
		<div id="login-modal" class="modal">
			<div class="modal-bg"></div>
			<div class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Log In</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<form id="login-form" class="user-form" autocomplete="off">
							<div class="user-section">
								<label class="user-text" for="username">Username</label>
								<input class="user-input" type="text" name="username" placeholder="Required" autocomplete="username" required />
							</div>
							<div class="user-section">
								<label class="user-text" for="password">Password</label>
								<input class="user-input" type="password" name="password" placeholder="Required" autocomplete="new-password" required />
							</div>
							<div class="user-section">
								<p id="login-output" class="user-error hidden">SERVER RESPONSE</p>
							</div>
							<input class="user-submit" type="submit" />
					</form>
				</div>
			</div>
		</div>

		<script src="./scripts/search.js"></script>
		<script src="./scripts/loadmore.js"></script>
		<script src="./scripts/modal.js"></script>
		<script src="./scripts/user_form.js"></script>
	</body>
</html>