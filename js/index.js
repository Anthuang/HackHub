window.onload = function() {
	/*
	 * Switching tabs
	 */

	var arr = document.getElementsByClassName("nav_el");
	var names = ["post", "announcement", "meeting", "user"];
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

	/*
	 * Sending stuff to Firebase
	 */

	var firebase_ref = firebase.database().ref();
	var submit = document.getElementById("add_submit");
	submit.onclick = function() {
		var add_title = document.getElementById("add_title").value;
		var add_text = document.getElementById("add_text").value;
		var add_select = document.getElementById("add_select").value;
		firebase_ref.child("Posts").push().set({
	    title: add_title,
	    text: add_text,
	    select: add_select,
		user: user.uid
	  });
	}

	/*
	 * Receiving data
	 */

	// Triggers when a value changes
	// Receive snapshot which includes whole list of posts
	firebase_ref.child("Posts").on('value', function(snapshot) {
	  // console.log(snapshot.val());
	});

	// Triggers when a post is added
	// Receive a snap which is one post
	firebase_ref.child("Posts").on('child_added', snap => {
		var title = snap.child("title").val();
		var text = snap.child("text").val();
		var select = snap.child("select").val();
		
		if (select != "post") {
			var new_msg = document.createElement("li");
			new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>";
			document.getElementById("post").appendChild(new_msg);
		}
		var new_msg = document.createElement("li");
		new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>";
		document.getElementById(select).appendChild(new_msg);
	});
}
