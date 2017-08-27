function getFormData(form) {
	var str = "";
	for (var i = 0; i < form.elements.length - 1; i++) {
		str += encodeURI(form.elements[i].name) + "=" + encodeURI(form.elements[i].value) + "&";
	}
	return str.substring(0, str.length - 1);
}
document.getElementById("signup-form").addEventListener("submit", function(evt) {
	evt.preventDefault();
	console.log("Submitting signup form...");

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var res = JSON.parse(httpRequest.responseText);
				console.log(httpRequest.responseText);
				document.getElementById("signup-output").classList.remove("hidden");
				document.getElementById("signup-output").innerHTML = res.text;
			}
		}
	};

	httpRequest.open("POST", "./backend/createacc.php", true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(getFormData(this));
});
document.getElementById("login-form").addEventListener("submit", function(evt) {
	evt.preventDefault();
	console.log("Submitting login form...");

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				var res = JSON.parse(httpRequest.responseText);
				console.log(httpRequest.responseText);
				document.getElementById("login-output").classList.remove("hidden");
				document.getElementById("login-output").innerHTML = res.text;
			}
		}
	};

	httpRequest.open("POST", "./backend/login.php", true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(getFormData(this));
});