var page = 0;
var loadButton = document.getElementById("loadmore");
var url = new URL(location.href);
var searchQ = url.searchParams.get("q");

loadButton.addEventListener("click", function() {
	page++;

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				if (httpRequest.responseText == "No results found.") {
					loadButton.classList.add("disabled");
				} else {
					document.getElementById("content").innerHTML += "<div class=\"page\" id=\"page-" + page +  "\">" + httpRequest.responseText + "</div>";
					highlightResults("#page-" + page);
				}
			}
		}
	}
	httpRequest.open("GET", "./backend/getlistings.php?page=" + page + (searchQ ? "&q=" + searchQ : ""));
	httpRequest.send();
});