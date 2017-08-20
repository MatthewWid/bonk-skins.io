function sendSearch() {
	var query = searchEl.value;
	if (query.length > 0) {
		console.log("Sending search... " + encodeURI(query));
		location.href = "./search?q=" + query;
	}
}

var searchEl = document.getElementById("search-bar");
searchEl.addEventListener("keydown", function(evt) {
	if (evt.keyCode == 13) {
		sendSearch();
	}
});
document.getElementById("search-button").addEventListener("click", sendSearch);
searchEl.addEventListener("click", function() {
	this.value = "";
});