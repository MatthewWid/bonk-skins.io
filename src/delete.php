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
		<meta name="theme-color" content="#ffffff">

		<link rel="stylesheet" type="text/css" href="./styles/css/index.css" />
	</head>
	<body>
		<div class="header">
			<?php
				include "./assets/imports/logo.php";
			?>
		</div>
		<div class="container">
			<input type="text" placeholder="Skin ID" id="skinId" />
			<input type="password" placeholder="Password" id="skinPass" />
			<button id="submitDelete" style="color: black;">Submit</button>
			<div id="output"></div>
		</div>

		<script>
			document.getElementById("submitDelete").addEventListener("click", function() {
				var skinid = document.getElementById("skinId").value;
				var skinpass = document.getElementById("skinPass").value;

				var httpRequest = new XMLHttpRequest();
				httpRequest.onreadystatechange = function() {
					if (httpRequest.readyState === XMLHttpRequest.DONE) {
						if (httpRequest.status === 200) {
							console.log("Received response successfully - #submitDelete");
							document.getElementById("output").innerHTML = httpRequest.responseText;
						}
					}
				}
				httpRequest.open("GET", "./backend/deleteskin.php?id=" + skinid + "&pword=" + skinpass);
				httpRequest.send();
			});
		</script>
	</body>
</html>