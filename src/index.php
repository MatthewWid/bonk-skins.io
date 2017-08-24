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
		<div class="content">
			<?php
				include "./backend/getlistings.php";
			?>
		</div>
		<div class="under-content">
			<button id="loadmore" class="flat">LOAD MORE</button>
		</div>

		<div class="modal">
			<div class="modal-bg"></div>
			<div class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Sign Up</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<div class="user-form">
						<div class="user-section">
							<div class="user-text">Username</div>
							<input class="user-input" type="text" autocomplete="username" />
						</div>
						<div class="user-section">
							<div class="user-text">Password</div>
							<input class="user-input" type="password" autocomplete="new-password" />
						</div>
						<div class="user-section">
							<div class="user-text">Email</div>
							<input class="user-input" type="email" autocomplete="email" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal disabled">
			<div class="modal-bg"></div>
			<div class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Log In</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<div class="user-form">
						<div class="user-section">
							<div class="user-text">Username</div>
							<input class="user-input" type="text" autocomplete="username" />
						</div>
						<div class="user-section">
							<div class="user-text">Password</div>
							<input class="user-input" type="password" autocomplete="current-password" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="./scripts/search.js" defer></script>
		<script src="./scripts/loadmore.js" defer></script>
		<script src="./scripts/modal.js" defer></script>
	</body>
</html>