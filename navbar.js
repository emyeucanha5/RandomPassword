const sideBar = document.querySelector(".sidebar");
const dbtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
dbtn.addEventListener("click", function() {
	sideBar.classList.toggle("show-sidebar");
	dbtn.style.display = "none";
})
closeBtn.addEventListener("click", function() {
	sideBar.classList.remove("show-sidebar");
	dbtn.style.display = "block";
})