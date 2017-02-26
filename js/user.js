firebase.database().ref("Posts").orderByChild("user").equalTo(curr).on("child_Added",
function(snapshot) {
    
});