var logout = document.getElementById("logout");
logout.addEventListener('click', e => {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
    // console.log(user);
    if(user){
        var curr_user = firebase.auth().currentUser;
    } else {
        window.location.replace("main.html");
    }
});
