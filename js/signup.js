var signup = document.getElementById("signup");

var curr_user;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
   console.log(typeof(user.uid));
   curr_user = user.uid;
  } else {
    console.log("not logged in");
  }
});

signup.addEventListener('click', e => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var mentor_status = document.getElementById("mentor").checked;
    var name_in = document.getElementById("name").value;
    console.log(mentor_status);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
        } else {
        alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
    var firebase_ref = firebase.database().ref("Users");
    firebase_ref.child(curr_user).set({
        mentor: mentor_status,
        name: name_in
    });
    if (mentor_status) {
      firebase.database().ref().child("Tags").push().set({
          company: name_in,
      });
    }
    window.location.replace("main.html");
});
