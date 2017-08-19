function sendSearch() {
	var query = document.getElementById("search-bar").value;
	console.log("Sending search... " + encodeURI(query));
	location.href = "./search?q=" + query;
}

document.getElementById("search-bar").addEventListener("keydown", function(evt) {
	if (evt.keyCode == 13) {
		sendSearch();
	}
});