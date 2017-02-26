function clearField(input) {
	if (input) {
	  input.value = "";
	}
};

function remove_post(key) {
	if (confirm("Are you sure?")) {
		var firebase_ref = firebase.database().ref().child("Posts").child(key);
	  firebase_ref.child("comments").once('value').then(function(snapshot) {
	    // console.log(snapshot.val());
	    for (var i in snapshot.val()) {
	      firebase.database().ref().child("Comments").child(i).remove();
	    }
	  });
		firebase_ref.remove();
	  // var firebase_comments = firebase.database().ref().child("Comments");
		// how to remove the html depends on whether we want it to refresh or not
		window.location.replace("main.html");
	}
};

window.onload = function() {

	var data = [];

  firebase.database().ref("Tags").on("child_added", snap => {
    data.push({ id: data.length, text: snap.child("company").val() });
    $("#selectBox").select2({
  		width: '100%',
  		data: data,
  		placeholder: "Tags",
  		allowclear: true,
  	});
  });

	/*
	 * Switching tabs
	 */


 // var ref = firebase.database().ref();
 // var authData = ref.getAuth();
 // if (authData) {
 //   console.log("Authenticated user with uid:", authData.uid);
 // }
 //  console.log(curr_user);
 var curr_user;
 firebase.auth().onAuthStateChanged(user => {
 	if (user){
 		console.log(user.uid);
 		curr_user = user.uid;
		firebase.database().ref("Posts").orderByChild("user").equalTo(curr_user).on("child_added", function(snapshot) {
			console.log(snapshot.child("user").val());
			var tags = snapshot.child("tags").val();
			var tags_string = "";
			for (var i = 0; i < snapshot.child("tags").numChildren() - 1; i++) {
				tags_string += data[snapshot.child("tags").child(i).val()]['text'] + ", ";
			}
			if (snapshot.child("tags").numChildren() > 0) {
				tags_string += data[snapshot.child("tags").child(snapshot.child("tags").numChildren() - 1).val()]['text'];
			}
			// console.log(snapshot.val());
			var commentHTML = document.getElementById("comment");
			var commentTA = document.getElementById("comment_text");
			var user_li = document.createElement("li");
			user_li.addEventListener('click', function(e) {
				commentHTML.innerHTML = "";
				commentTA.value = "";
				window.scrollTo(0, 0);
				document.getElementById("msg_info_title").innerHTML = snapshot.child("title").val();
				document.getElementById("msg_info_text").innerHTML = snapshot.child("text").val();
				document.getElementById("msg_info").style.display = "block";
				outer_wrap.style.webkitFilter = "blur(3px)";
				document.getElementById("post_id").value = snapshot.key;
				//
				firebase.database().ref("Comments").off();
				firebase.database().ref("Comments").orderByChild("post").equalTo(snapshot.key).on("child_added", function(snapshot) {
					commentHTML.innerHTML += "<li><h3>" + snapshot.child("comment").val() + "</h3></li>";
				});
			}, false);
			// console.log(snapshot.key);
			user_li.innerHTML = "<h1>" + snapshot.child("title").val() + "</h1>\n<h3>" + snapshot.child("text").val() + "</h3>\n<h4>Tags: " + tags_string + "</h4><button onclick='remove_post(\"" + snapshot.key + "\")' value='" + snapshot.key + "' class='remove_post'><i class='fa fa-times' aria-hidden='true'></i></button>";
			document.getElementById("user").insertBefore(user_li, document.getElementById("user").firstChild);
		});

		firebase_ref.child("Posts").on('child_removed', snap => {
			$("#" + snap.key).remove();
		});

		var logout = document.getElementById("logout");
		logout.addEventListener('click', e => {
			firebase.auth().signOut();
		});
		 
 	} else {
 		window.location.replace("index.html");
 	}
 });
 
 // console.log(window.user);
  // console.log(window.user);
  // console.log(curr_user);
	// console.log(curr_user);
	var arr = document.getElementsByClassName("nav_el");
	var names = ["post", "announcement", "meeting", "user"];
	var last_active = 0;

	for (var i = arr.length-1; i >=0; --i) {
		arr[i].onclick = function() {
			arr[last_active].classList.remove("nav_active");
			document.getElementById(names[last_active]).style.display = "none";
			last_active = this.getAttribute('value');
			document.getElementById(names[this.getAttribute('value')]).style.display = "block";
			this.className += " nav_active";
		}
	}

	/*
	 * Add post functionality
	 */
	
	var add = document.getElementById("add");
	var add_wrap = document.getElementById("add_wrap");
	var outer_wrap = document.getElementById("outer_wrap");
	var add_exit = document.getElementById("add_exit");
	add.onclick = function() {
		add_wrap.style.display = "block";
		outer_wrap.style.webkitFilter = "blur(3px)";
	}
	add_exit.onclick = function() {
		add_wrap.style.display = "none";
		outer_wrap.style.webkitFilter = "";
	}

	/*
	 *
	 * Database stuff
	 *
	 */

	/*
	 * Sending stuff to Firebase
	 */
	 
	var firebase_ref = firebase.database().ref();
	var submit = document.getElementById("add_submit");
	submit.onclick = function() {
		var add_title = document.getElementById("add_title").value;
		var add_text = document.getElementById("add_text").value;
		var add_select = document.getElementById("add_select").value;
		var add_tags = $("#selectBox").val();
		console.log(curr_user);
		firebase_ref.child("Posts").push().set({
	    title: add_title,
	    text: add_text,
	    select: add_select,
			tags: add_tags,
			user: curr_user,
	  });

	  // Clear
		add_wrap.style.display = "none";
		outer_wrap.style.webkitFilter = "";
		clearField(document.getElementById("add_title"));
		clearField(document.getElementById("add_text"));
		clearField(document.getElementById("add_tags"));
	}

  var comment_submit = document.getElementById("comment_submit");
  comment_submit.onclick = function() {
    var add_comment = document.getElementById("comment_text").value;
    var post_key = document.getElementById("post_id").value;
    var new_key = firebase_ref.child("Posts").child(post_key).child("comments").push(true).getKey();
    firebase_ref.child("Comments").child(new_key).set({
      post: post_key,
      comment: add_comment
    });
    document.getElementById("comment_text").value = "";
  };

	/*
	 * Receiving data
	 */

	// Triggers when a value changes
	// Receive snapshot which includes whole list of posts
	// firebase_ref.child("Comments").on('child_added', snap => {
  //   var post_key = snap.child("post");
  //   if (post_key.val() == document.getElementById("post_id").value) {
  //     var comments = document.getElementById("comment");
  //     // comments.innerHTML = "";
  //     comments.innerHTML += snap.child("comment").val() + "\n";
  //     // console.log(snap.val());
  //   }
	// });

  // function update_comments(snap) {
  //   var comments = snap.child("comments").val();
  //   var commentHTML = document.getElementById("comment");
  //   commentHTML.innerHTML = "";
  //   for (var key in comments) {
  //     firebase_ref.child("Comments").child(key).child("comment").once('value').then(function(snapshot) {
  //       commentHTML.innerHTML += "<li><h3>" + snapshot.val() + "</h3></li>";
  //     });
  //   }
  // }

	// Triggers when a post is added
	// Receive a snap which is one post
	firebase_ref.child("Posts").on('child_added', snap => {
		var title = snap.child("title").val();
		var text = snap.child("text").val();
		var select = snap.child("select").val();
		var tags = snap.child("tags").val();
    var user = snap.child("user").val();
		// console.log(tags);
		var tags_string = "";
		for (var i = 0; i < snap.child("tags").numChildren() - 1; i++) {
			tags_string += data[snap.child("tags").child(i).val()]['text'] + ", ";
		}
		if (snap.child("tags").numChildren() > 0) {
			tags_string += data[snap.child("tags").child(snap.child("tags").numChildren() - 1).val()]['text'];
		}
    var commentHTML = document.getElementById("comment");
    var commentTA = document.getElementById("comment_text");

		/********************************************************/

		// var posts_ref = firebase.database().ref("Posts");
		// var user_li = document.createElement("li");
		// firebase.database().ref("Posts").orderByChild("user").equalTo(curr_user).on("child_added", function(snapshot) {
    //   console.log(snapshot.val());
		// 	user_li.addEventListener('click', function(e) {
    //     commentHTML.innerHTML = "";
    //     commentTA.value = "";
		// 		window.scrollTo(0, 0);
		// 		document.getElementById("msg_info_title").innerHTML = snapshot.child("title").val();
		// 		document.getElementById("msg_info_text").innerHTML = snapshot.child("text").val();
		// 		document.getElementById("msg_info").style.display = "block";
		// 		outer_wrap.style.webkitFilter = "blur(3px)";
    //     document.getElementById("post_id").value = snap.key;
		// 	}, false);
    //   // // console.log(title);
		// 	user_li.innerHTML = "<h1>" + snapshot.child("title").val() + "</h1>\n<h3>" + snapshot.child("text").val() + "</h3>\n<h4>Tags: " + tags_string + "</h4><button onclick='remove_post(\"" + snapshot.key + "\")' value='" + snapshot.key + "' class='remove_post'><i class='fa fa-times' aria-hidden='true'></i></button>";
    //   document.getElementById("user").insertBefore(user_li, document.getElementById("user").firstChild);
		// });
		/***********************************************************/

		if (select != "post") {
			var new_msg = document.createElement("li");
			new_msg.addEventListener('click', function(e) {
        commentHTML.innerHTML = "";
        commentTA.value = "";
				window.scrollTo(0, 0);
				document.getElementById("msg_info_title").innerHTML = title;
				document.getElementById("msg_info_text").innerHTML = text;
				document.getElementById("msg_info").style.display = "block";
				outer_wrap.style.webkitFilter = "blur(3px)";
        document.getElementById("post_id").value = snap.key;
        // update_comments(snap);
        firebase.database().ref("Comments").off();
        firebase.database().ref("Comments").orderByChild("post").equalTo(snap.key).on("child_added", function(snapshot) {
          commentHTML.innerHTML += "<li><h3>" + snapshot.child("comment").val() + "</h3></li>";
        });
			}, false);
      if (user == curr_user) {
        new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>\n<h4>Tags: " + tags_string + "</h4>";
        var but = document.createElement("button");
        but.addEventListener('click', function(e) {
        	remove_post(snap.key);
        	e.stopPropagation();
        }, false);
        but.className += "remove_post";
        but.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
        new_msg.appendChild(but);
      } else {
        new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>\n<h4>Tags: " + tags_string + "</h4>";
      }
      document.getElementById(select).insertBefore(new_msg, document.getElementById(select).firstChild);
		}
		var new_msg = document.createElement("li");
		new_msg.addEventListener('click', function(e) {
      commentHTML.innerHTML = "";
      commentTA.value = "";
			window.scrollTo(0, 0);
			document.getElementById("msg_info_title").innerHTML = title;
			document.getElementById("msg_info_text").innerHTML = text;
			document.getElementById("msg_info").style.display = "block";
			outer_wrap.style.webkitFilter = "blur(3px)";
      document.getElementById("post_id").value = snap.key;
      // update_comments(snap);
      firebase.database().ref("Comments").off();
      firebase.database().ref("Comments").orderByChild("post").equalTo(snap.key).on("child_added", function(snapshot) {
        commentHTML.innerHTML += "<li><h3>" + snapshot.child("comment").val() + "</h3></li>";
      });
		}, false);
    if (user == curr_user) {
      new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>\n<h4>Tags: " + tags_string + "</h4>";
      var but = document.createElement("button");
      but.addEventListener('click', function(e) {
      	remove_post(snap.key);
      	e.stopPropagation();
      }, false);
      but.className += "remove_post";
      but.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
      new_msg.appendChild(but);
    } else {
      new_msg.innerHTML = "<h1>" + title + "</h1>\n<h3>" + text + "</h3>\n<h4>Tags: " + tags_string + "</h4>";
    }
		document.getElementById("post").insertBefore(new_msg, document.getElementById("post").firstChild);
	});

	/*
	 * Shifting return
	 */
	document.getElementById("msg_info_return").onclick = function() {
		document.getElementById("msg_info").style.display = "none";
		outer_wrap.style.webkitFilter = "";
		window.scrollTo(0, 0);
	};

}
