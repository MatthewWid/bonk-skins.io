<!DOCTYPE html>
<html>
	
	<head>

		<title>Bonk-Skins.io</title>

		<?php
			include "assets/imports/header.php";
		?>

	</head>

	<body>

		<div class="header">
			<span class="title">Bonk Skins</span>
			<span class="user disabled">MatthewMob <span class="totalScore ">(0)</span></span>
			<a class="page" href="javascript:void(0);"><i class="fa fa-fire"></i> Hot</a>
			<a class="page disabled" href="javascript:void(0);"><i class="fa fa-star-o"></i> Top</a>
			<a class="page disabled" href="javascript:void(0);"><i class="fa fa-tag"></i> New</a>
			<button id="makeaskin" class="raised">Make a skin</button>
		</div>
		<div class="container">
			<?php
				$arr = array("deadpool!", "CRY LAUGHING", "idek", "LUL");

				foreach($arr as $key => $value): ?>
					<a class="card">
						<img src="http://lorempixel.com/100/100" />
						<div class="under"><?php echo $value; ?></div>
					</a>
				<?php endforeach; ?>
		</div>
		<div class="under-content">
			<button id="loadmore" class="flat">LOAD MORE</button>
		</div>

	</body>

</html>