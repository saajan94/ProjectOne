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
        var startDate = $("#startDate-input").val().trim();
        var monthlyRate = $("#monthlyRate-input").val().trim();

        database.ref().push({
            name: name,
            jobTitle: title,
            startDate: startDate,
            monthlyRate: monthlyRate
        })
    })

    database.ref().on("child_added", function(snapshot) {
        var employeeName = snapshot.val().name;
        var employeeTitle = snapshot.val().jobTitle;
        var startDate = snapshot.val().startDate;
        var monthlyRate = snapshot.val().monthlyRate;

        var convertedMonths = moment(startDate, "MM/DD/YYYY")
        console.log(convertedMonths);

        var monthsWorked = moment().diff(moment(convertedMonths), "months")
        console.log(monthsWorked);

        var totalBilled = monthlyRate * monthsWorked

        $("#new-employee").append("<tr><td>" + employeeName + "</td><td>" + employeeTitle + "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + totalBilled +"</td></tr>")
    })
})