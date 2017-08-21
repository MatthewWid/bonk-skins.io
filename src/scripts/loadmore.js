var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			console.log("Received response successfully");
			console.log(httpRequest.responseText);
		}
	}
}
httpRequest.open("GET", "./backend/getlistings.php");
httpRequest.send();