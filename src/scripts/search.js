function sendSearch() {
	var query = searchEl.value;
	if (query.length > 0) {
		console.log("Sending search... " + encodeURI(query));
		location.href = "./search?q=" + query;
	}
}

function highlightResults(elContainer) {
	var cardTextList = document.querySelectorAll(elContainer + " .card .card-details p");
	for (var i = 0; i < cardTextList.length; i++) {
		// https://stackoverflow.com/a/280824/2954591
		var reg = new RegExp("(" + query + ")", "gi");
		cardTextList[i].innerHTML = cardTextList[i].innerHTML.replace(reg, "<span style=\"background-color: rgb(254, 237, 87);\">$1</span>");
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

var url_obj = new URL(location.href);
var query = url_obj.searchParams.get("q");

if (query) {
	highlightResults("#content");
}