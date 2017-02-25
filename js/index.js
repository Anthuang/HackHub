window.onload = function() {
	/*
	 * Switching tabs 
	 */
	var arr = document.getElementsByClassName("nav_el");
	var names = ["messages", "announcements", "meetings", "users"];
	var last_active = 0;

	for (var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			arr[last_active].classList.remove("nav_active");
			document.getElementById(names[last_active]).style.display = "none";
			last_active = this.getAttribute('value');
			document.getElementById(names[this.getAttribute('value')]).style.display = "block";
			this.className += " nav_active";
		}
	}

	/*
	 * Add functionality 
	 */
	var add = document.getElementById("add");
	var add_wrap = document.getElementById("add_wrap");
	var outer_wrap = document.getElementById("outer_wrap");
	var add_exit = document.getElementById("add_exit");
	add.onclick = function() {
		add_wrap.style.display = "block";
		outer_wrap.style.webkitFilter = "blur(2px) brightness(80%)";
	}
	add_exit.onclick = function() {
		add_wrap.style.display = "none";
		outer_wrap.style.webkitFilter = "";
	}
}