var signup = document.getElementById("create");

signup.addEventListener('click', e =>{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("haha");
    var promise = firebase.auth().createUserWithEmailAndPassword(email, password)    .catch(function(error) {
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
});


// login_button.onclick = function() {
    
// }

document.getElementById("logout").onclick = function() {
    firebase.auth().signOut().then(function() {
        console.log(firebase.auth().currentUser);
        console.log("we out this bitch");
    }, function(error) {
        console.log("dafuq");
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   document.getElementById("message").innerHTML = "logged in fam";
  } else {
    console.log("not logged in");
  }
});
