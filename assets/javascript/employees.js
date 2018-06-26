// Initialize Firebase
var config = {
    apiKey: "AIzaSyAd3oW918rHigpri6GeNxjwxSG9Di8Bdvo",
    authDomain: "projectone-b0b0c.firebaseapp.com",
    databaseURL: "https://projectone-b0b0c.firebaseio.com",
    projectId: "projectone-b0b0c",
    storageBucket: "",
    messagingSenderId: "789722548155"
};
firebase.initializeApp(config);

var database = firebase.database();
$(document).ready(function() {
    $("#addEmployee").on("click", function() {
        $("#employeeModal").show()
    })

    $("#saveEmployee").on("click", function(event) {
        event.preventDefault();

        var name = $("#name-input").val().trim();
        var title = $("#title-input").val().trim();

        database.ref().push({
            Name: name,
            jobTitle: title
        })
    })
})