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
				<a class="page" href="javascript:void(0);"><i class="fa fa-star-o"></i> Top</a>
				<a class="page" href="javascript:void(0);"><i class="fa fa-fire"></i> Hot</a>
			</div>
			<a id="makeaskin" class="button raised" href="editor">Make a skin</a>
		</div>
		<div class="container">
			<?php
				include "./backend/getlistings.php";
			?>
		</div>
		<div class="under-content disabled">
			<button id="loadmore" class="flat">LOAD MORE</button>
		</div>
	</body>
</html>