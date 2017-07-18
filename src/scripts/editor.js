/*
	A student project by Matthew W.
	Intended as an improved version of the current skin editor available in bonk.io
	I do not own, nor am I in any way affiliated with the website, game or creator of bonk.io
*/
console.clear();

var url = new URL(location.href);
var editDisabled = false;
if (url.searchParams.get("editable") != null && url.searchParams.get("editable") == "false") {
	editDisabled = true;
	document.body.classList.add("no-edit");
	document.getElementById("skin-title").disabled = true;
}

// Retrieve URL of image asset for shape
// "i" is an index of an image from 1-110
function getImgUrl(i) {
	//return "https://matthewmob.github.io/bonk-skins.io/src/assets/images/shapes/%.png".replace("%", i);
	return "./assets/images/shapes/%.png".replace("%", i);
}

/* Code for generation and editing of layer modal to edit layer shape */

// Create elements for all images and insert them into the shape picker modal
if (!editDisabled) {
	var shape = {
		shapes: 110,
		loadedShapes: 0,
		shapeListEl: document.querySelector("#shape-picker .list")
	};
	(function() {
		var imgPreload = [];
		for (var i = 1; i <= shape.shapes; i++) {
			imgPreload[i] = new Image();
			imgPreload[i].src = getImgUrl(i);
			imgPreload[i].addEventListener("load", function() {
				shape.loadedShapes++;
			});
		}
	})();
	for (var i = 1; i <= shape.shapes; i++) {
		var shapeItem = document.createElement("div");
		shapeItem.className = "shape-item";
		shapeItem.style.backgroundImage = "url(" + getImgUrl(i) + ")";
		shapeItem.dataset.num = i;
		shapeItem.addEventListener("click", function() {
			if (selectedLayer) {
				selectedLayer.properties.shape = this.dataset.num;
				drawCanvas(selectedLayer.c.id, selectedLayer);
				propertiesEl.shape.value.style.backgroundImage = "url(" + getImgUrl(this.dataset.num) + ")";
				this.parentElement.parentElement.parentElement.classList.add("disabled");
			}
		});
		shape.shapeListEl.appendChild(shapeItem);
	}
}

/* Presets and functions for modal for editing layer/background colours */

// When a colour is selected in the colour picker change the colour of the selected layer (or background layer)
// "colour" is a value representing a colour
function changeColour(colour) {
	if (bgLayer.picking || selectedLayer) {
		if (bgLayer.picking) {
			bgLayer.colour = colour;
			basecolour_sample.style.backgroundColor = colour;
			redrawBackground();
			bgLayer.picking = false;
		} else {
			if (selectedLayer) {
				selectedLayer.properties.colour = colour;
				drawCanvas(selectedLayer.c.id, selectedLayer);
				updateProperties();
			}
		}
	}
}
// Create all elements for every colour in the colour array and insert them into the colour picker modal element
var basecolour_sample = document.getElementById("basecolour-sample");
// https://codepen.io/MatthewMob/pen/MmrOvN
var colours = ["rgb(238, 153, 153)", "rgb(228, 114, 114)", "rgb(238, 82, 79)", "rgb(243, 66, 53)", "rgb(228, 56, 52)", "rgb(210, 46, 46)", "rgb(197, 39, 39)", "rgb(182, 27, 27)", "rgb(243, 142, 176)", "rgb(239, 97, 145)", "rgb(235, 63, 121)", "rgb(232, 29, 98)", "rgb(215, 26, 95)", "rgb(193, 23, 90)", "rgb(172, 19, 86)", "rgb(135, 13, 78)", "rgb(205, 146, 215)", "rgb(185, 103, 199)", "rgb(170, 70, 187)", "rgb(155, 38, 175)", "rgb(141, 35, 169)", "rgb(122, 30, 161)", "rgb(105, 26, 153)", "rgb(73, 19, 139)", "rgb(178, 156, 218)", "rgb(148, 116, 204)", "rgb(125, 86, 193)", "rgb(102, 57, 182)", "rgb(93, 52, 176)", "rgb(80, 44, 167)", "rgb(68, 38, 159)", "rgb(48, 26, 145)", "rgb(158, 167, 217)", "rgb(120, 133, 202)", "rgb(91, 106, 191)", "rgb(62, 80, 180)", "rgb(56, 72, 170)", "rgb(47, 62, 158)", "rgb(39, 52, 146)", "rgb(25, 34, 125)", "rgb(143, 201, 248)", "rgb(99, 180, 245)", "rgb(65, 164, 244)", "rgb(32, 149, 242)", "rgb(29, 135, 228)", "rgb(24, 117, 209)", "rgb(20, 100, 191)", "rgb(12, 70, 160)", "rgb(128, 211, 249)", "rgb(78, 194, 246)", "rgb(40, 181, 245)", "rgb(2, 168, 243)", "rgb(2, 154, 228)", "rgb(1, 135, 208)", "rgb(1, 118, 188)", "rgb(0, 86, 154)", "rgb(127, 221, 233)", "rgb(76, 207, 224)", "rgb(37, 197, 217)", "rgb(0, 187, 211)", "rgb(0, 171, 192)", "rgb(0, 150, 166)", "rgb(0, 130, 142)", "rgb(0, 95, 99)", "rgb(127, 202, 195)", "rgb(76, 181, 171)", "rgb(37, 165, 153)", "rgb(0, 149, 135)", "rgb(0, 136, 122)", "rgb(0, 120, 106)", "rgb(0, 104, 91)", "rgb(0, 76, 63)", "rgb(164, 213, 166)", "rgb(128, 198, 131)", "rgb(101, 186, 105)", "rgb(75, 174, 79)", "rgb(66, 159, 70)", "rgb(55, 141, 59)", "rgb(45, 124, 49)", "rgb(26, 93, 31)", "rgb(196, 224, 164)", "rgb(173, 212, 128)", "rgb(155, 203, 100)", "rgb(138, 194, 73)", "rgb(123, 178, 65)", "rgb(103, 158, 55)", "rgb(84, 138, 46)", "rgb(50, 104, 29)", "rgb(229, 237, 155)", "rgb(219, 230, 116)", "rgb(211, 224, 86)", "rgb(204, 219, 56)", "rgb(191, 201, 50)", "rgb(174, 179, 42)", "rgb(157, 156, 35)", "rgb(129, 118, 22)", "rgb(254, 244, 156)", "rgb(254, 240, 117)", "rgb(254, 237, 87)", "rgb(254, 234, 58)", "rgb(252, 215, 52)", "rgb(250, 191, 44)", "rgb(248, 167, 36)", "rgb(244, 126, 22)", "rgb(254, 223, 129)", "rgb(254, 212, 78)", "rgb(254, 201, 39)", "rgb(254, 192, 6)", "rgb(254, 178, 0)", "rgb(254, 159, 0)", "rgb(254, 142, 0)", "rgb(254, 110, 0)", "rgb(254, 203, 127)", "rgb(254, 182, 76)", "rgb(254, 166, 37)", "rgb(254, 151, 0)", "rgb(250, 139, 0)", "rgb(244, 123, 0)", "rgb(238, 107, 0)", "rgb(229, 80, 0)", "rgb(254, 170, 144)", "rgb(254, 137, 100)", "rgb(254, 111, 66)", "rgb(254, 86, 33)", "rgb(243, 80, 29)", "rgb(229, 73, 24)", "rgb(215, 66, 20)", "rgb(190, 53, 11)", "rgb(249, 249, 249)", "rgb(244, 244, 244)", "rgb(237, 237, 237)", "rgb(223, 223, 223)", "rgb(188, 188, 188)", "rgb(157, 157, 157)", "rgb(116, 116, 116)", "rgb(96, 96, 96)", "rgb(65, 65, 65)", "rgb(32, 32, 32)", "rgb(0, 0, 0)", "rgb(25, 187, 155)", "rgb(67, 137, 254)", "rgb(210, 46, 46)"];
var colourList = document.querySelector("#colour-picker .list");
for (var i = 0; i < colours.length; i++) {
	var colour = document.createElement("div");
	colour.className = "colour-item";
	colour.style.backgroundColor = colour.dataset.colour = colour.title = colours[i];
	colour.addEventListener("click", function() {
		changeColour(this.dataset.colour);
		this.parentElement.parentElement.parentElement.classList.add("disabled");
	});
	colourList.appendChild(colour);
}

/* Logic and functions for rendering and editing the background layer */

// Background layer setup
var bgLayer = {
	colour: "rgb(254, 237, 87)", // Default light yellow colour,
	bgColour: "rgb(45, 63, 77)", // Dark blue colour for outer background colour
	size: 90,
	picking: false,
	c: document.getElementById("c-bg"),
	dim: 200
};
document.getElementById("canvas-container").style.backgroundColor = bgLayer.bgColour;
bgLayer.ctx = bgLayer.c.getContext("2d");
bgLayer.c.width = bgLayer.c.height = bgLayer.dim;
// Function to draw background layer (Background colour and circle)
function redrawBackground() {
	bgLayer.ctx.clearRect(0, 0, bgLayer.c.width, bgLayer.c.height);
	bgLayer.ctx.beginPath();
	bgLayer.ctx.fillStyle = bgLayer.colour;
	bgLayer.ctx.arc(100, 100, bgLayer.size, 0, 2 * Math.PI);
	bgLayer.ctx.fill();
}
redrawBackground();
// "Base colour:" sample event listener
basecolour_sample.style.backgroundColor = bgLayer.colour;
if (!editDisabled) {
	document.getElementById("basecolour").addEventListener("click", function() {
		bgLayer.picking = true;
		document.getElementById("colour-container").classList.remove("disabled");
	});
}

/* Functions for organizing, setting, clearing and rendering the layer list, layer properties and layer canvas */

var layerTemplate = document.getElementById("l-template");
var layerList = document.querySelector(".section.layer-list .content");
// Return initialized data for a layer given an index value
// "i" is an ID to initialize the layer with
// "clearID" is an ID that should be retained, not overwritten (Optional)
function initData(i, clearId) {
	return {
		id: (typeof clearId != "undefined" ? clearId : i), // Unique ID of layer
		selected: false, // If the layer is selected (For dragging and colour switching)
		name: "Layer " + (typeof clearId != "undefined" ? (clearId + 1) : (i + 1)), // Custom name of the layer
		index: i, // Index of layer (For ordering of layers top to bottom)
		c: document.getElementById("c-" + (typeof clearId != "undefined" ? clearId : i)),
		properties: { // Properties of layer
			shape: 0,
			x: 0,
			y: 0,
			angle: 0,
			scale: 0.25,
			fliph: false,
			flipv: false,
			aalias: false,
			colour: "rgb(0, 0, 0)"
		},
		offset: { // Offsets as temporary values when live editing properties
			x: 0,
			y: 0,
			angle: 0,
			scale: 0.25
		}
	};
}
// Variables for layer selecting, layer restoring, and layer property elements
var movingLayer, copyingLayer, selectedLayer;
var propertiesEl = {
	name: {
		container: document.getElementById("property-container-name"),
		value: document.getElementById("property-value-name")
	},
	shape: {
		container: document.getElementById("property-container-shape"),
		value: document.getElementById("property-value-shape")
	},
	xy: document.getElementById("property-selectable-xy"),
	x: {
		container: document.getElementById("property-container-x"),
		value: document.getElementById("property-value-x")
	},
	y: {
		container: document.getElementById("property-container-y"),
		value: document.getElementById("property-value-y")
	},
	angle: {
		container: document.getElementById("property-container-angle"),
		value: document.getElementById("property-value-angle")
	},
	scale: {
		container: document.getElementById("property-container-scale"),
		value: document.getElementById("property-value-scale")
	},
	fliph: {
		container: document.getElementById("property-container-fliph"),
		value: document.getElementById("property-value-fliph")
	},
	flipv: {
		container: document.getElementById("property-container-flipv"),
		value: document.getElementById("property-value-flipv")
	},
	aalias: {
		container: document.getElementById("property-container-aalias"),
		value: document.getElementById("property-value-aalias")
	},
	colour: {
		container: document.getElementById("property-container-colour"),
		value: document.getElementById("layercolour-sample")
	}
};
// Set property value elements to property values of selected layer
function updateProperties() {
	if (selectedLayer) {
		propertiesEl.name.value.textContent = selectedLayer.name;
		if (selectedLayer.properties.shape >= 1) {
			propertiesEl.shape.value.style.backgroundImage = "url(" + getImgUrl(selectedLayer.properties.shape) + ")";
		} else {
			propertiesEl.shape.value.style.backgroundImage = "initial";
		}
		propertiesEl.x.value.textContent = parseFloat(selectedLayer.properties.x / 6).toFixed(2);
		propertiesEl.y.value.textContent = parseFloat(selectedLayer.properties.y / 6).toFixed(2);
		propertiesEl.angle.value.textContent = selectedLayer.properties.angle;
		propertiesEl.scale.value.textContent = parseFloat(selectedLayer.properties.scale).toFixed(2);
		propertiesEl.fliph.value.textContent = selectedLayer.properties.fliph;
		propertiesEl.flipv.value.textContent = selectedLayer.properties.flipv;
		propertiesEl.aalias.value.textContent = selectedLayer.properties.aalias;
		propertiesEl.colour.value.style.backgroundColor = selectedLayer.properties.colour;
	}
}
// Clear and re-render layer list
function renderLayerList() {
	while (layerList.firstChild) {
		layerList.removeChild(layerList.firstChild);
	}
	
	layers = sortLayers();
	for (var i = 0; i < layers.length; i++) {
		(function(i) {
			var dupe = layerTemplate.cloneNode(true);
			dupe.id = "l-" + layers[i].id;
			dupe.classList.remove("disabled");
			dupe.getElementsByClassName("layer-title")[0].textContent = layers[i].name;
			if (!editDisabled) {
				dupe.getElementsByClassName("rename")[0].addEventListener("click", function(evt) {
					evt.stopPropagation();
					var newName = prompt("Rename Layer (Max. 9 Characters)");
					if (newName.trim().length <= 0) {
						return false;
					}
					layers[i].name = newName.substring(0, 9);
					if (selectedLayer && layers[i].id === selectedLayer.id) {
						updateProperties();
					}
					renderLayerList();
				});
				dupe.getElementsByClassName("clear")[0].addEventListener("click", function(evt) {
					evt.stopPropagation();
					layers[i] = initData(i, layers[i].id);
					if (layers[i].id == selectedLayer.id) {
						selectedLayer = layers[i];
						updateProperties();
					}
					clearCanvas(layers[i].id);
					renderLayerList();
				});
				dupe.getElementsByClassName("move")[0].addEventListener("click", function(evt) {
					evt.stopPropagation();
					if (!movingLayer) {
						movingLayer = layers[i];
						this.classList.add("moving");
					} else {
						var moveFrom = movingLayer.index;
						var moveTo = layers[i].index;
						layers[i].index = moveFrom;
						movingLayer.index = moveTo;
						movingLayer = undefined;
						sortLayerCanvas();
						renderLayerList();
					}
				});
				dupe.getElementsByClassName("copy")[0].addEventListener("click", function(evt) {
					evt.stopPropagation();
					if (!copyingLayer) {
						copyingLayer = layers[i];
						this.classList.add("moving");
					} else {
						var copyFrom = copyingLayer;
						var copyTo = layers[i];
						copyTo.name = copyFrom.name;
						for (var key in copyFrom.properties) {
							copyTo.properties[key] = copyFrom.properties[key];
						}
						for (var key in copyFrom.offset) {
							copyTo.offset[key] = copyFrom.offset[key];
						}
						if (copyTo.properties.shape > 0) {
							drawCanvas(copyTo.c.id, copyTo);
						}
						copyingLayer = undefined;
						copyTo.el.click();
						renderLayerList();
						updateProperties();
					}
				});
			}
			dupe.addEventListener("click", function(e) {
				selectedLayer = layers[i];
				document.querySelector(".layer-properties .content").classList.remove("disabled");
				renderLayerList();
				updateProperties();
			});
			layers[i].el = dupe;
			if (selectedLayer && selectedLayer.id == layers[i].id) {
				layers[i].el.getElementsByClassName("layer-title")[0].style.fontWeight = "bold";
			}
			layerList.appendChild(dupe);
		}(i));
	}
}
// Re-order canvasses (via z-index) based on layers index property
function sortLayerCanvas() {
	for (var i = 0; i < layers.length; i++) {
		layers[i].c.style.zIndex = layers[i].index;
	}
}
// Return a copy of the layers array that is sorted by their index property
function sortLayers() {
	return layers.sort(function(a, b) {
		if (a.index < b.index) {
			return -1;
		}
		if (a.index > b.index) {
			return 1;
		}
		return;
	});
}
// Create an array for all layers and their properties and render canvasses
var layers = [];
var init = false;
function generateNewLayers(evt) {
	if (evt) {
		evt.stopPropagation();
	}
	layers = [];
	for (var i = 0; i < 16; i++) {
		(function(i) {
			layers.push(initData(i));
			
			if (!init) {
				var c = document.createElement("canvas");
				var ctx = c.getContext("2d");
				c.width = c.height = bgLayer.dim;
				c.className = "layer-canvas no-select";
				c.id = "c-" + layers[i].id;
				c.style.zIndex = layers[i].index;
				document.getElementById("canvas-container").appendChild(c);
			}
			layers[i].c = document.getElementById("c-" + layers[i].id);
			clearCanvas(layers[i].id);
		}(i));
	}
	init = true;
	selectedLayer = initData(-1);
	updateProperties();
	selectedLayer = undefined;
	document.querySelector(".layer-properties .content").classList.add("disabled");
	renderLayerList();
}
generateNewLayers();
// Event listener for resetting all layers
document.getElementById("reset-all").addEventListener("click", function(evt) {
	evt.stopPropagation();
	if (confirm("Are you sure you want to reset all layers?")) {
		generateNewLayers();
	} else {
		return;
	}
});

/* Logic and functions for downloading, uploading and saving skins as .bskin or .png */

// https://stackoverflow.com/a/18197511/2954591
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    pom.setAttribute("download", filename);

    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

var cImg = document.getElementById("overallImg");
var cImgCtx = cImg.getContext("2d");
cImg.width = cImg.height = bgLayer.dim;
// Compile all layers canvasses onto a single canvas and return the image data for it.
function compileToImage() {
	cImgCtx.clearRect(0, 0, bgLayer.dim, bgLayer.dim);

	cImgCtx.fillStyle = bgLayer.bgColour;
	cImgCtx.fillRect(0, 0, bgLayer.dim, bgLayer.dim);
	cImgCtx.beginPath();
	cImgCtx.fillStyle = bgLayer.colour;
	cImgCtx.arc(100, 100, bgLayer.size, 0, 2 * Math.PI);
	cImgCtx.fill();

	for (var i = 0; i < layers.length; i++) {
		cImgCtx.drawImage(document.getElementById("c-" + layers[i].id), 0, 0);
	}

	var data = cImg.toDataURL();
	cImgCtx.clearRect(0, 0, cImg.width, cImg.height);

	return data;
}

// [a-zA-Z0-9]*_?\s*
function submitskin() {
	console.clear();
	var skin_author = "";
	// What is Regex?
	var allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var rejectName = true;
	while (rejectName) {
		skin_author = prompt("Authors name\nOnly alphanumeric and underscore. Maximum 16 characters.");
		if (skin_author && skin_author.length >= 1 && skin_author.length <= 16) {
			rejectName = false;
			for (var i = 0; i < skin_author.length; i++) {
				console.log(skin_author[i]);
				console.log(allowedChars.indexOf(skin_author[i]));
				if (allowedChars.indexOf(skin_author[i].toLowerCase()) == -1) {
					rejectName = true;
				}
			}
		} else if (!skin_author) {
			return;
		}
	}
	var tempLayers = layers;
	for (var i = 0; i < tempLayers.length; i++) {
		delete tempLayers[i].c;
		delete tempLayers[i].el;
	}

	// Oh god...
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				/*
					TODO:
					Redirect to readonly version of skin once skin is submitted.
				*/
				console.log("Received response successfully - submitskin()");
				location.href = "editor?id=" + parseInt(httpRequest.responseText) + "&editable=false";

				var imgHttpRequest = new XMLHttpRequest();
				imgHttpRequest.onreadystatechange = function() {
					if (imgHttpRequest.readyState === XMLHttpRequest.DONE) {
						if (imgHttpRequest.status === 200) {
							console.log("Received image response successfully - submitskin()");
						}
					}
				}
				var imgString = compileToImage();
				var form = new FormData();
				form.append("id", httpRequest.responseText);
				form.append("img", imgString);
				imgHttpRequest.open("POST", "./backend/saveimg.php");
				imgHttpRequest.send(form);
			}
		}
	}

	var skin_name = document.getElementById("skin-title").value;
	if (skin_name.length < 1) {
		name = "Bonk_Skin";
	}
	var skin_data = JSON.stringify({
		skinName: skin_name,
		v: skinV,
		author: skin_author,
		baseColour: bgLayer.colour,
		layers: tempLayers
	});

	var sendString = "name=" + skin_name + "&author=" + skin_author + "&data=" + skin_data;

	httpRequest.open("GET", "./backend/saveskin.php?" + sendString);
	httpRequest.send();
}
if (!editDisabled) {
	document.getElementById("submitskin").addEventListener("click", function() {
		if (checkValidName()) {
			submitskin();
		}
	});
}

// Variable that sets the skin version - This is updated every time a major change to the format/structure of a layer is made.
// If a saved skins version differs from this version, the user will receive a warning that their skin may appear incorrect or distorted.
var skinV = 9;
// Convert layers to JSON data, include skin metadata, and download all almagamated data as a .bskin file
function exportskin() {
	var tempLayers = layers;
	var name = document.getElementById("skin-title").value;
	if (name.length < 1) {
		name = "Bonk_Skin";
	}
	for (var i = 0; i < tempLayers.length; i++) {
		delete tempLayers[i].c;
		delete tempLayers[i].el;
	}
	var exportData = {
		skinName: name,
		v: skinV,
		author: "",
		baseColour: bgLayer.colour,
		layers: tempLayers
	};
	// https://stackoverflow.com/a/389075/2954591
	download(name.replace(/[^a-z0-9_]/gi, "") + ".bskin", JSON.stringify(exportData));
}
// Check if the user has something inputted into the "Name of skin" text input
function checkValidName() {
	if (document.getElementById("skin-title").value.trim().length > 0){
		return true;
	} else {
		document.getElementById("pencil-icon").classList.toggle("flashred1");
		document.getElementById("pencil-icon").classList.toggle("flashred2");
		return false;
	}
}
document.getElementById("downloadskin").addEventListener("click", function() {
	if (checkValidName()) {
		exportskin();
	}
});

// Decode JSON data of .bskin file then clear current layers and replace with new data
// "data" is a JSON object containing the information of the skin overall, as well as the data of each layer
function importskin(data) {
	generateNewLayers();
	if (data.length > 0) {
		var pData = JSON.parse(data);
		if (pData.v != skinV) {
			var continueImport = confirm("Your skin version is out of date! Your skin may appear distorted and some elements may be out of place.\n\nWould you still like to import your skin?");
			console.error("bonk-skins.io: importskin: Skin version is outdated.\nCurrent Version: " + skinV + "\nSkin Version: " + pData.v);
			if (!continueImport) {
				return;
			}
		}
		document.getElementById("skin-title").value = pData.skinName;
		document.querySelector("#madeby .name").textContent = pData.author;
		document.getElementById("madeby").classList.remove("disabled");
		bgLayer.picking = true;
		changeColour(pData.baseColour);
		layers = pData.layers;
		for (var i = 0; i < layers.length; i++) {
			layers[i].c = document.getElementById("c-" + layers[i].id);
			if (layers[i].properties.shape != 0) {
				drawCanvas(layers[i].c.id, layers[i]);
			}
		}
		renderLayerList();
		sortLayerCanvas();
		updateProperties();
	}
}
if (!editDisabled) {
	// https://codepen.io/MatthewMob/pen/GmVJWx
	document.getElementById("skinuploader").addEventListener("change", function() {
		var selectedFile = this.files[0];
		var reader = new FileReader();
		reader.addEventListener("load", function() {
			if (selectedFile.name.match(/\.[0-9a-z]+$/i)[0] == ".bskin") {
				importskin(reader.result);
			} else {
				alert("That is not a valid file type!\n\nMust be a .bskin file.")
			}
		});
		reader.readAsText(selectedFile);
	});
	document.getElementById("uploadskin").addEventListener("click", function() {
		document.getElementById("skinuploader").click();
	});
}

document.getElementById("downloadimage").addEventListener("click", function(evt) {
	if (checkValidName()) {
		var name = document.getElementById("skin-title").value;

		var pom = document.createElement("a");
		pom.setAttribute("href", compileToImage());
		pom.setAttribute("download", name.replace(/[^a-z0-9_]/gi, "") + ".png");
		if (document.createEvent) {
			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, true);
			pom.dispatchEvent(event);
		} else {
			pom.click();
		}
	}
});

/* Event listeners for selecting/changing layer properties */

var editing_property = 0;
if (!editDisabled) {
	// Event listeners on property elements for modification of current layer
	propertiesEl.colour.container.addEventListener("click", function() {
		if (selectedLayer) {
			document.getElementById("colour-container").classList.remove("disabled");
		}
	});
	propertiesEl.shape.container.addEventListener("click", function() {
		if (selectedLayer) {
			document.getElementById("shape-container").classList.remove("disabled");
		}
	});
	propertiesEl.name.container.addEventListener("click", function() {
		if (selectedLayer) {
			var newName = prompt("Rename Layer (Max. 9 Characters)");
			if (newName.trim().length <= 0) {
				return false;
			}
			selectedLayer.name = newName.substring(0, 9);
			updateProperties();
			renderLayerList();
		}
	});
}
// Clear red bar from all possible property selections
function clearSelectedProperties() {
	propertiesEl.xy.classList.remove("editing");
	propertiesEl.angle.container.classList.remove("editing");
	propertiesEl.scale.container.classList.remove("editing");
}
if (!editDisabled) {
	// Event listeners for selecting different properties to edit
	propertiesEl.xy.addEventListener("click", function() {
		editing_property = 1;
		clearSelectedProperties();
		this.classList.add("editing");
	});
	propertiesEl.angle.container.addEventListener("click", function() {
		editing_property = 2;
		clearSelectedProperties();
		this.classList.add("editing");
	});
	propertiesEl.scale.container.addEventListener("click", function() {
		editing_property = 3;
		clearSelectedProperties();
		this.classList.add("editing");
	});
	propertiesEl.fliph.container.addEventListener("click", function() {
		if (selectedLayer) {
			if (!selectedLayer.properties.fliph) {
				selectedLayer.properties.fliph = true;
			} else {
				selectedLayer.properties.fliph = false;
			}
			drawCanvas(selectedLayer.c.id, selectedLayer);
			updateProperties();
		}
	});
	propertiesEl.flipv.container.addEventListener("click", function() {
		if (selectedLayer) {
			if (!selectedLayer.properties.flipv) {
				selectedLayer.properties.flipv = true;
			} else {
				selectedLayer.properties.flipv = false;
			}
			drawCanvas(selectedLayer.c.id, selectedLayer);
			updateProperties();
		}
	});
	propertiesEl.aalias.container.addEventListener("click", function() {
		if (selectedLayer) {
			if (!selectedLayer.properties.aalias) {
				selectedLayer.properties.aalias = true;
			} else {
				selectedLayer.properties.aalias = false;
			}
			drawCanvas(selectedLayer.c.id, selectedLayer);
			updateProperties();
		}
	});
}

/* Event listeners and logic for live updating properties */

var c_container = document.getElementById("canvas-container");
var e = {
	mdown: false,
	current: {
		x: 0,
		y: 0
	},
	init: {
		x: 0,
		y: 0
	}
};
if (!editDisabled) {
	c_container.addEventListener("mousedown", function(evt) {
		e.mdown = true;
		document.body.classList.add("no-select");
		e.init.x = evt.pageX;
		e.init.y = evt.pageY;
	});
}
// Create offsets for layer properties so that each click/button press doesn't reset the property to 0
// "layer" is a layer object to set the offsets of the provided layer's properties
function createOffsets(layer) {
	if (selectedLayer) {
		selectedLayer.offset.x = layer.x;
		selectedLayer.offset.y = layer.y;
		selectedLayer.offset.angle = layer.angle;
		selectedLayer.offset.scale = layer.scale;
	}
}
if (!editDisabled) {
	document.addEventListener("mouseup", function() {
		if (e.mdown) {
			e.mdown = false;
			createOffsets(lay);
			document.body.classList.remove("no-select");
		}
	});
	// Event listener and logic for dragging to modify selected properties
	document.addEventListener("mousemove", function(evt) {
		e.current.x = evt.pageX;
		e.current.y = evt.pageY;
		if (e.mdown && selectedLayer && editing_property > 0) {
			switch (editing_property) {
				case 1:
					selectedLayer.properties.x = -(e.init.x - e.current.x) + selectedLayer.offset.x
					selectedLayer.properties.y = -(e.init.y - e.current.y) + selectedLayer.offset.y;
					break;
				case 2:
					//selectedLayer.properties.angle = -(e.init.y - e.current.y) + selectedLayer.offset.angle;
					
					/*
						BUG:
						Moving the mouse instantly snaps it to the angle it's at relative to the 0 degree.
						Create an offset of the angle so it doesn't snap, and starts at where the mouse already is.
					*/
					
					var midpoint = {
						x: c_container.getBoundingClientRect().left + c_container.getBoundingClientRect().width / 2 + selectedLayer.properties.x,
						y: c_container.getBoundingClientRect().top + c_container.getBoundingClientRect().height / 2 + selectedLayer.properties.y
					};
					var theta = parseInt(Math.atan2(e.current.y - midpoint.y, e.current.x - midpoint.x) * 180 / Math.PI);// - parseInt(Math.atan2(e.init.y - midpoint.y, e.init.x - midpoint.x) * 180 / Math.PI);
					selectedLayer.properties.angle = theta;
					break;
				case 3:
					selectedLayer.properties.scale = parseFloat((((e.init.y - e.current.y) / 100) + selectedLayer.offset.scale).toFixed(2));
					break;
			}
			drawCanvas("c-" + selectedLayer.id, layers[selectedLayer.index]);
			updateProperties();
		}
	});
}

/* Logic and rendering for drawing on preview */

var lay;
// Draw on canvas based on layer properties
// "i" is an ID of a canvas to draw on. For example, providing 1 will target "c-1".
// "layer" is a layer to provide properties for drawing. If no layer is provided then selectedLayer will be used.
function drawCanvas(i, layer) {
	if (typeof i == "undefined") {
		console.error("bonk-skins.io: drawCanvas: No canvas ID was provided");
		return;
	}
	
	var c = document.getElementById(i);
	var ctx = c.getContext("2d");
	lay = layer ? layer.properties : selectedLayer ? selectedLayer.properties : null;
	
	// Error checking
	if (!lay) {
		console.error("bonk-skins.io: drawCanvas: No layer was provided and there was no selectedLayer");
		return;
	} else if (layer.properties.shape <= 0) {
		console.error("bonk-skins.io: drawCanvas: Layer attempting to be drawn has no shape");
		return;
	}
	
	var props = lay;
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = getImgUrl(lay.shape);
	img.addEventListener("load", function() {
		if (props.aalias) {
			ctx.imageSmoothingEnabled = true;
		} else {
			ctx.imageSmoothingEnabled = false;
		}
		// https://codepen.io/MatthewMob/pen/KmXWWv
		var buffer = document.createElement("canvas");
		buffer.width = img.width;
		buffer.height = img.height;
		var bx = buffer.getContext("2d");
		bx.fillStyle = props.colour;
		bx.fillRect(0, 0, buffer.width, buffer.height);
		bx.globalCompositeOperation = "destination-atop";
		bx.drawImage(img, 0, 0, img.width * props.scale, img.height * props.scale);
		
		ctx.save();
		if (i != "overallImg") {
			ctx.clearRect(0, 0, c.width, c.height);
		}
		
		ctx.translate((img.width * props.scale) / 2 + props.x + (c.width / 2 - img.width * props.scale / 2), (img.height * props.scale) / 2 + props.y + (c.height / 2 - img.height * props.scale / 2));
		if (props.flipv) {
			ctx.rotate((props.angle + 180) * Math.PI / 180);
		} else {
			ctx.rotate(props.angle * Math.PI / 180);
		}
		if (props.fliph) {
			ctx.scale(-1, 1);
		}
		ctx.translate(-((img.width * props.scale) / 2), -((img.height * props.scale) / 2));
		
		ctx.drawImage(buffer, 0, 0);
		ctx.restore();
		
		ctx.save();
		ctx.globalCompositeOperation = "destination-in";
		ctx.beginPath();
		ctx.fillStyle = bgLayer.colour;
		ctx.arc(100, 100, bgLayer.size, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	});
}

// Clears a specified canvas
// "i" is an ID of a canvas to be cleared. For example, providing 1 will target "c-1".
function clearCanvas(i) {
	if (typeof i == "undefined") {
		console.error("bonk-skins.io: clearCanvas: No canvas ID was provided");
		return;
	}
	var c = document.getElementById("c-" + i);
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
}

/* Tutorial logic and drawing */

// Object containing elements for highlighting
var d = {
	container: document.getElementById("highlight-container"),
	c: document.getElementById("highlight-canvas")
}
d.ctx = d.c.getContext("2d");
// Object for logic and tracking of highlighting
var highlighting = {
	inUse: false,
	e: "",
	text: document.getElementById("highlight-text"),
	padding: 3
};
// Highlight a specific element and place text beneath it
// "e" is an element that is to be highlighted
// "text" is the text to be placed below the highlighted element
// "offsetleft" is the amount to offset the highlight of the element (it is occasionally misaligned)
function highlight(e, text, offsetleft) {
	var el = document.querySelector(e).getBoundingClientRect();
	
	d.container.classList.remove("disabled");
	d.c.width = document.documentElement.clientWidth;
	d.c.height = document.documentElement.clientHeight;
	
	d.ctx.clearRect(0, 0, d.c.width, d.c.height);
	d.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	d.ctx.fillRect(0, 0, d.c.width, d.c.height);
	d.ctx.clearRect(el.left - highlighting.padding - offsetleft, el.top - highlighting.padding, el.width + (highlighting.padding * 2), el.height + (highlighting.padding * 2));
	
	if (text) {
		highlighting.text.innerHTML = text + "<div class=\"stepsleft\">" + (stepsInc + 1) + "/" + steps.length + "</div> ";
		highlighting.text.style.left = (el.left - highlighting.padding - offsetleft) + "px";
		highlighting.text.style.top = (el.top + el.height + (highlighting.padding * 2)) + "px";
		/*} else {
			highlighting.text.style.top = "initial";
			console.log(bottom);
			console.log(el.top);
			highlighting.text.style.bottom = (el.top * 2 + 40 + highlighting.padding) + "px";
		}*/
		highlighting.text.style.maxWidth = el.width + "px";
	}
}
// Reset and clear the current highlight
function stopHighlight() {
	d.ctx.clearRect(0, 0, d.c.width, d.c.height);
	highlighting.text.textContent = "";
	highlighting.inUse = false;
	d.container.classList.add("disabled");
}

// Array of instructions for tutorial
var stepsInc = -1;
var steps = [
	{
		e: "#container .container-title",
		text: "This is where you can change the name of your skin.",
		offsetleft: 5,
		script: function() {document.getElementById("pencil-icon").classList.toggle("flashred1");document.getElementById("pencil-icon").classList.toggle("flashred2");return;}
	},
	{
		e: "#l-0",
		text: "Hover over a layer to bring up edit buttons.<br /><br />Click on the layer name to select it.<br /><br />Hover each edit button to view what it does.",
		offsetleft: 3,
		script: function() {document.getElementById("l-0").classList.add("tut");return;}
	},
	{
		e: "#container .container-flex .layer-properties",
		text: "Once you select a layer its properties appear here.<br /><br />Click any of the properties to edit them.",
		offsetleft: 0,
		script: function() {document.getElementById("l-0").classList.remove("tut");document.getElementById("l-0").click();return;}
	},
	{
		e: "#canvas-container",
		text: "Once you select a shape it will appear in the preview.",
		offsetleft: 0,
		script: function() {document.querySelector("#shape-picker .shape-item[data-num=\"6\"]").click();return;}
	},
	{
		e: "#tut-selectors-1",
		text: "Select either <b>X Y</b>, <b>Angle</b>, or <b>Scale</b> (by clicking on them or pressing keys 1-3) to make them editable.",
		offsetleft: 0,
		script: function() {return;}
	},
	{
		e: "#canvas-container",
		text: "Click <b>INSIDE</b> the preview window and drag to modify the selected property.",
		offsetleft: 0,
		script: function() {document.getElementById("tut-mousemover").classList.add("tut-active");return;}
	},
	{
		e: "#header > div",
		text: "Click <b style=\"color: rgb(102, 160, 255);\">Submit Skin</b> to save your skin and upload it to the database.<br /><br />Click the <b style=\"color: rgb(255, 0, 0);\">download</b> button to download your skin to send to a friend.<br /><br />Click the <b style=\"color: rgb(105, 105, 105);\">upload</b> button to upload a skin data file to the editor.<br /><br />Click the <b style=\"color: rgb(204, 0, 219);\">image</b> button to download your skin as an image.",
		offsetleft: 0,
		script: function() {document.getElementById("tut-mousemover").classList.remove("tut-active");return;}
	},
	{
		e: "#tutorial",
		text: "You can revisit this tutorial at any time by clicking here.",
		offsetleft: -4,
		script: function() {return;}
	}
];
// Move to next step in tutorial from the array
function showNext() {
	stepsInc++;
	steps[stepsInc].script();
	highlighting.e = steps[stepsInc].e;
	highlighting.inUse = true;
	highlight(highlighting.e, steps[stepsInc].text, steps[stepsInc].offsetleft)
}
if (!editDisabled) {
	// When "Guided Tutorial" is clicked clear all layers and start the first step in the array of tutorial steps
	document.getElementById("tutorial").addEventListener("click", function() {
		generateNewLayers();
		showNext();
	});
}
// When the highlight overlay is clicked go to the next step in the tutorial or end the tutorial if we've reached the end of the tutorial steps array
function progressStep() {
	if(stepsInc + 1 < steps.length) {
		showNext();
	} else {
		stepsInc = -1;
		stopHighlight();
		generateNewLayers();
	}
}
if (!editDisabled) {
	document.getElementById("highlight-container").addEventListener("click", progressStep);
	// Event listener that dynamically redraws highlights as the window resizes
	window.addEventListener("resize", function() {
		if (highlighting.inUse) {
			highlight(highlighting.e, steps[stepsInc].text);
		}
	});
}
// When an arrow key is pressed then modify the selected property
// "e" is a keydown event object
function keyMoveProperty(e) {
	if (editing_property > 0) {
		switch (editing_property) {
			case 1:
				if (e.keyCode == 39) {
					e.preventDefault();
					selectedLayer.properties.x++;
				} else if (e.keyCode == 37) {
					e.preventDefault();
					selectedLayer.properties.x--;
				} else if (e.keyCode == 40) {
					e.preventDefault();
					selectedLayer.properties.y++;
				} else if (e.keyCode == 38) {
					e.preventDefault();
					selectedLayer.properties.y--;
				}
				break;
			case 2:
				if (e.keyCode == 38) {
					e.preventDefault();
					selectedLayer.properties.angle++;
				} else if (e.keyCode == 40) {
					e.preventDefault();
					selectedLayer.properties.angle--;
				}
				break;
			case 3:
				if (e.keyCode == 38) {
					e.preventDefault();
					selectedLayer.properties.scale += 0.01;
				} else if (e.keyCode == 40) {
					e.preventDefault();
					selectedLayer.properties.scale -= 0.01;
				}
				selectedLayer.properties.scale = parseFloat(selectedLayer.properties.scale.toFixed(2));
				break;
		}
		createOffsets(selectedLayer.properties);
		updateProperties();
		drawCanvas(selectedLayer.c.id, selectedLayer);
	}
}

/* Quality of life shortcuts/hotkeys */

if (!editDisabled) {
// Click X or background of modal to close it
	document.querySelectorAll(".modal .close").forEach(function(e) {
		e.addEventListener("click", function() {
			e.parentElement.parentElement.parentElement.classList.toggle("disabled");
			bgLayer.picking = false;
		});
	});
	document.querySelectorAll(".modal .bg").forEach(function(e) {
		e.addEventListener("click", function() {
			e.parentElement.classList.add("disabled");
			bgLayer.picking = false;
		});
	});
	window.addEventListener("keydown", function(e) {
		if (highlighting.inUse && e.keyCode == 32) {
			e.preventDefault();
			progressStep();
		} else if (e.keyCode == 27) {
			if (highlighting.inUse) {
				e.preventDefault();
				stepsInc = steps.length;
				progressStep();
			}
			if (!document.getElementById("shape-container").classList.contains("disabled")) {
				document.getElementById("shape-container").classList.add("disabled");
			}
			if (!document.getElementById("colour-container").classList.contains("disabled")) {
				document.getElementById("colour-container").classList.add("disabled");
			}
		} else if (selectedLayer) {
			switch (e.keyCode) {
				case 49:
					e.preventDefault();
					document.getElementById("property-selectable-xy").click();
					return;
					break;
				case 50:
					e.preventDefault();
					document.getElementById("property-container-angle").click();
					return;
					break;
				case 51:
					e.preventDefault();
					document.getElementById("property-container-scale").click();
					return;
					break;
			}
			keyMoveProperty(e);
		}
	});
}
// Collapse sections when clicking their header
document.querySelectorAll(".section .header").forEach(function(e) {
	e.addEventListener("click", function() {
		e.parentElement.classList.toggle("collapsed");
	});
});

// Initialize editable property as the XY property
propertiesEl.xy.click();

/* Logic for handling URL parameters such as being editable or preloading from an ID */

/*
var isEditable = !(location.href.split("?")[1].split("&").filter(function(e) {
	return e.split("=")[0] == "editable";
})[0].split("=")[1] == "false");
var skinId = location.href.split("?")[1].split("&").filter(function(e) {
	return e.split("=")[0] == "id";
})[0].split("=")[1];
*/

if (url.searchParams.get("id")) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				console.log("Received response successfully - .get(\"id\")");
				importskin(httpRequest.responseText);
			}
		}
	}
	httpRequest.open("GET", "./backend/getskin.php?id=" + url.searchParams.get("id"));
	httpRequest.send();
}