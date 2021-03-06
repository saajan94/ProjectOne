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

//Adds the employees to the html
var employeeCount = 0;
$(document).ready(function() {
    $("#addEmployee").on("click", function() {
        $("#employeeModal").show()
    })
    //Saves the employee information and pushes it to firebase
    $("#saveEmployee").on("click", function(event) {
        event.preventDefault();
      
        // Captures values entered into the modal fields
        var name = $("#name-input").val().trim();
        var title = $("#title-input").val().trim();
        var startDate = $("#startDate-input").val().trim();
        var monthlyRate = $("#monthlyRate-input").val().trim();


        // Uploads the data acquired from the user to the Firebase database

        //Path for the information to follow

        database.ref('/employees').push({
            name: name,
            jobTitle: title,
            startDate: startDate,
            monthlyRate: monthlyRate
        })
      
        // Empties modal fields upon submission

        //Information collected in firebase
      
        $("#name-input").val("");
        $("#title-input").val("");
        $("#startDate-input").val("");
        $("#monthlyRate-input").val("");
        $('#employeeModal').modal('hide');

    })


    // Creates a Firebase event to add employees to the database

    //Pulling info from firebase to put on html
  
    database.ref('/employees').on("child_added", function(snapshot) {
        var employeeName = snapshot.val().name;
        var employeeTitle = snapshot.val().jobTitle;
        var startDate = snapshot.val().startDate;
        var monthlyRate = snapshot.val().monthlyRate;

        // Convert startDate to be read by MomentJS
        var convertedMonths = moment(startDate)
        console.log(convertedMonths);

        // Difference between current date and start date
        var monthsWorked = moment().diff(moment(convertedMonths), "months")
        console.log(monthsWorked);

        // Calculation for total billed
        var totalBilled = monthlyRate * monthsWorked

        // Append employee table with new employee
        $("#new-employee").append("<tr><td>" + employeeName + "</td><td>" + employeeTitle + "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + totalBilled +"</td></tr>")
    })
})