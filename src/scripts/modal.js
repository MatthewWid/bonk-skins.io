function closeAllModals() {
	document.querySelectorAll(".modal").forEach(function(e) {
		if (!e.classList.contains("disabled")) {
			e.classList.add("disabled");
		}
	});
}
document.addEventListener("keydown", function(e) {
	if (e.keyCode == 27) { // Esc
		e.preventDefault();
		closeAllModals();
	}
});
document.querySelectorAll(".modal .modal-close").forEach(function(e) {
	e.addEventListener("click", function() {
		e.parentElement.parentElement.parentElement.classList.toggle("disabled");
	});
});
document.querySelectorAll(".modal .modal-bg").forEach(function(e) {
	e.addEventListener("click", function() {
		e.parentElement.classList.add("disabled");
	});
});