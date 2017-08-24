<!DOCTYPE html>
<html>
	<head>
		<title>Skin Editor - Bonk-Skins.io</title>

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

		<link rel="stylesheet" type="text/css" href="./styles/css/editor.css" />
		<script src="./scripts/modal.js" defer></script>
		<script src="./scripts/editor.js" defer></script>
	</head>
	<body>
		<div id="header">
			<?php
				include "./assets/imports/logo.php";
			?>
			<span class="user disabled" id="madeby">Made by <span class="name">MatthewMob</span></span>
			<div>
				<button id="submitskin" class="raised" title="Save your skin to the database">Submit Skin</button>
				<div class="portbuttons">
					<button id="downloadskin" class="raised" title="Download your skin as a .bskin file"><i class="fa fa-download" aria-hidden="true"></i></button>
					<button id="uploadskin" class="raised" title="Upload a .bskin file"><i class="fa fa-upload" aria-hidden="true"></i></button>
					<input type="file" id="skinuploader" accept=".bskin" />
					<button id="downloadimage" class="raised" title="Download your skin as an image (200x200)"><i class="fa fa-file-image-o" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
		<div id="shape-container" class="modal disabled">
			<div class="modal-bg"></div>
			<div id="shape-picker" class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Shape Picker</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<div class="list"></div>
				</div>
			</div>
		</div>
		<div id="colour-container" class="modal disabled">
			<div class="modal-bg"></div>
			<div id="colour-picker" class="modal-container">
				<div class="modal-header">
					<span class="modal-title">Colour Picker</span>
					<span class="modal-close">x</span>
				</div>
				<div class="modal-content">
					<div class="list colours"></div>
				</div>
			</div>
		</div>
		<div id="container">
			<div class="container-title">
				<input type="text" id="skin-title" placeholder="Name of skin" maxlength="16" minlength="1" required title="" />
				<i id="pencil-icon" class="fa fa-flip-horizontal fa-pencil flashred1" aria-hidden="true"></i>
			</div>
			<div class="container-flex">
				<div class="section layer-list">
					<div class="header no-select">
						Layers
						<span id="reset-all" class="layer-button reset-all" title="Reset All Layers"><i class="fa fa-flip-horizontal fa-repeat reset-all"></i></span>
					</div>
					<div class="content"></div>
				</div>
				<div class="section skin-preview">
					<div class="header no-select">Preview</div>
					<div class="content">
						<div id="canvas-container">
							<img id="tut-mousemover" src="https://openclipart.org/image/2400px/svg_to_png/222076/Mouse-Cursor-Arow-Fixed.png" />
							<canvas id="c-bg" class="layer-canvas no-select"></canvas>
						</div>
						<div id="basecolour">Base colour: <div class="colour-sample" id="basecolour-sample"></div></div>
					</div>
				</div>
				<div class="section layer-properties">
					<div class="header no-select">Layer Properties</div>
					<div class="content disabled">
						<div id="property-container-name" class="row selectable" title="Change layer name"><div class="property no-select">Name:</div><div id="property-value-name" class="value"></div></div>
						<div id="property-container-shape" class="row selectable" title="Change layer shape"><div class="property no-select">Shape:</div><div id="property-value-shape" class="value"></div></div>
						<div id="tut-selectors-1">
							<div id="property-selectable-xy" class="selectable main">
								<div id="property-container-x" class="row"><div class="property no-select">X:</div><div id="property-value-x" class="value">0</div></div>
								<div id="property-container-y" class="row"><div class="property no-select">Y:</div><div id="property-value-y" class="value">0</div></div>
							</div>
							<div id="property-container-angle" class="row selectable main" title="Rotate layer shape around its center"><div class="property no-select">Angle:</div><div id="property-value-angle" class="value">0</div></div>
							<div id="property-container-scale" class="row selectable main" title="Change size of layer shape"><div class="property no-select">Scale:</div><div id="property-value-scale" class="value">0</div></div>
						</div>
						<div id="tut-selectors-2">
							<div id="property-container-fliph" class="row selectable"><div class="property no-select">Flip Left/Right:</div><div id="property-value-fliph" class="value">False</div></div>
							<div id="property-container-flipv" class="row selectable"><div class="property no-select">Flip Up/Down:</div><div id="property-value-flipv" class="value">False</div></div>
						</div>
						<div id="property-container-aalias" class="row selectable" title="Toggle image smoothing on/off"><div class="property no-select">Anti-Alias:</div><div id="property-value-aalias" class="value">False</div></div>
						<div id="property-container-colour" class="row selectable" title="Change colour of layer shape"><div class="property no-select">Colour:</div><div id="property-value-colour" class="value"><div class="colour-sample" id="layercolour-sample"></div></div></div>
					</div>
				</div>
			</div>
			<div class="container-tutorial">
				<span id="tutorial">
					<span class="tutorial-icon no-select">?</span>
					<span class="tutorial-innertext">Guided Tutorial</span>
				</span>
			</div>
		</div>
		<div id="l-template" class="layer-item no-select disabled">
			<span class="layer-title"></span>
			<span class="layer-button clear" title="Reset Layer"><i class="fa fa-trash-o clear"></i></span>
			<span class="layer-button rename" title="Rename Layer"><i class="fa fa-pencil-square-o rename"></i></span>
			<span class="layer-button move" title="Reorder Layer (Click to swap)"><i class="fa fa-arrows move"></i></span>
			<span class="layer-button copy" title="Clone layer onto another (Click to copy/paste)"><i class="fa fa-clone fa-flip-horizontal copy"></i></span>
		</div>
		<div id="highlight-container" class="disabled">
			<canvas id="highlight-canvas"></canvas>
			<div id="highlight-text" class="no-select"></div>
		</div>
		<canvas id="overallImg"></canvas>
	</body>
</html>