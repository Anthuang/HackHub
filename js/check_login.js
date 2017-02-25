firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("message").innerHTML = "logged in!";
  } else {
    document.getElementById("message").innerHTML = "dafuq u not a nikka";
  }
});