var logout = document.getElementById("logout");
logout.addEventListener('click', e => {
    firebase.auth().signOut();
});  

firebase.auth().onAuthStateChanged(user => {
    if(user == null) {
        window.location.replace("not_logged_in.html")
    }
});