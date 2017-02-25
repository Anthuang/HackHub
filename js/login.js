var login = document.getElementById("login");
var logout = document.getElementById("logout");

login.addEventListener('click', e =>{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(err) {
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
    });
});


// login_button.onclick = function() {
    
// }

logout.addEventListener('click', e => {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
   console.log(user);
  } else {
    console.log("not logged in");
  }
});