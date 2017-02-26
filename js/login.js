var login = document.getElementById("login");

// var curr_user;
// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//    console.log(typeof(user.uid));
//    curr_user = user.uid;
//   } else {
//     console.log("not logged in");
//   }
// });

login.addEventListener('click', e =>{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var no_error = true;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
        console.log("account logged in");
        console.log(firebase.auth().currentUser.uid);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        // window.user = firebase.auth().currentUser.uid;
        window.location.replace("main.html");
    })
    .catch(function(error) {
        alert(error.message);
        no_error = false;
    });
});
