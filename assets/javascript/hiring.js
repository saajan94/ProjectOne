// setting up firebase
var config = {
    apiKey: "AIzaSyDjOICOB9Zfd3_Kun3Hc_x1JNtRNSrV7QI",
    authDomain: "mangenda-f7411.firebaseapp.com",
    databaseURL: "https://mangenda-f7411.firebaseio.com",
    projectId: "mangenda-f7411",
    storageBucket: "mangenda-f7411.appspot.com",
    messagingSenderId: "75994685936"
};
firebase.initializeApp(config);
database = firebase.database();

//setting up attributes for the information
var start;
var noResults = $('<h1 id="noResults" class="text-center display-1"><span class="sadFace">:-(</span><br> No Results Found</h1>')
var noMoreResults = $('<h1 id="noResults" class="text-center display-1">No more results</h1>')
var loading = $('<img id="loading" class="mx-auto d-block" src="assets/images/loading.gif">')

function skillSearch() {
    $(".container").empty();
    //form creating
    if (!($("#skillsForm").length)) {
        var skillsForm = $("<div>").attr({
            id: "skillsForm",
            class: "text-center mt-2",
        })
        var form = $("<form>")
        form.attr({
            class: "form-inline",
        })
        //label for skill
        var label = $("<label>")
        label.append("Search for a skill:")
        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(label)
        form.append(formGroup)

        //input for skill
        var input = $("<input>").attr({ class: "form-control ml-2 mr-2", id: "query", type: "text" })
        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(input)
        form.append(formGroup)

        //label for location
        var label = $("<label>")
        label.append("Location:")
        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(label)
        form.append(formGroup)

        //input for location
        var input = $("<input>")
        input.attr({
            class: "form-control ml-2 mr-2",
            id: "location",
            type: "text"
        })
        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(input)
        form.append(formGroup)

        //submit button
        var button = $("<button>")
        button.attr({
            class: "btn btn-primary",
            type: "submit",
            id: "search"
        }).append("Submit")

        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(button)
        form.append(formGroup)
        skillsForm.prepend(form)
        // $('*[aria-labelledby="skills-tab"]').prepend(skillsForm)
        $("#skills > .container").prepend((skillsForm))
    }
}
//setting up search to compare salaries in Miami Dade
function salaryAnalysis(){
    $(".container").empty();

    var salaryForm = $("<div>").attr({
        id: "salaryForm",
        class: "text-center mt-2",
    })
    var form = $("<form>")
    form.attr({
        class: "form-inline",
    })
    //label for skill
    var label = $("<label>")
    label.append("Search for a postion:")
    var formGroup = $("<div>").attr("class", "form group")
    formGroup.append(label)
    form.append(formGroup)

    //input for skill
    var input = $("<input>").attr({ class: "form-control ml-2 mr-2", id: "query", type: "text" })
    var formGroup = $("<div>").attr("class", "form group")
    formGroup.append(input)
    form.append(formGroup)
    var button = $("<button>")
        button.attr({
            class: "btn btn-primary",
            type: "submit",
            id: "searchSalaries"
        }).append("Submit")
        formGroup.append(button)
    salaryForm.append(form)
    $("#salary > .container").append(salaryForm)
}
//setting the up the search of the salaries
$(document).on("click", "#search", function (event) {
    event.preventDefault();
    $("#noResults").remove()
    $(".container").append(loading)
    // $(".container").empty()
    var query = $('#query').val()
    var location = $("#location").val()
    start = 0;
    callIndeed(query, location, start)
})
//function to set up the search for the salaries from the API
$(document).on("click", "#searchSalaries", function (event) {
    event.preventDefault();
    var query = $('#query').val()
    callMDC(query)
})
//Runs the actual search for the info from the API
function callMDC(query) {
    event.preventDefault()
    $.ajax({
        url: "https://opendata.miamidade.gov/resource/uxti-s6ix.json",
        method: "GET",
        data: {
            "$limit": 100,
            "$$app_token": "qkEdULtaZjOJu5obC0ygJ1KMT"
            , "$q": query
        }
    }).then(function (response) {
        // console.log(response)
        var card = $("<div>").attr("class", "card bg-dark mt-3")
    var graph = $("<div>").attr({id: "graph", class: "m-4"})
    card.append(graph)
    $("#salary > .container").append(card)
        var trace1 = {
            x: [], //employees
            y: [], //$$
            mode: 'markers+text',
            name: "salaries"
        };
        //for loop to set up the line chart
        for (i = 0; i < response.length; i++) {
            trace1.x.push(response[i].title)
            trace1.y.push(response[i].annualsalary)


        }
        trace1.y.sort(function (a, b) { return a - b })
        console.log(trace1.y)
        var data = [trace1];
        var layout = {};
        Plotly.newPlot('graph', data, layout, { displayModeBar: false });
    })
}

$(window).scroll(function () {
    if ($("#skillsForm").length) {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            var query = $("#query").val()
            var location = $("#location").val()
            start += 50
            $(".container").append(loading)
            callIndeed(query, location, start)
        }
    }
});

function callIndeed(query1, location, start) {
    $.ajax({
        url: `https://indeedapi.herokuapp.com/?l=${location}&v=1&q=${query1}&start=${start}`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $(".container > #loading").remove()
        var datas = response.data.resumes
        // console.log(datas.length)
        if (datas.length === 0 && start > 51) {
            console.log("Start is: " + start)
            $("#results").append(noMoreResults)
        }
        else if (datas.length === 0 && start < 51) {
            console.log(start)
            $(".container").append(noResults)
        }
        else {
            for (i = 0; i < datas.length; i++) {
                if (datas[i].skillsList.length > 0 && datas[i].firstName != "" && datas[i].lastName != "") {
                    var card = $("<div>")
                    card.attr("class", "card resume float-left m-2 bg-dark ")
                    var cardBody = $("<div>")
                    cardBody.attr({
                        class: "card-body pt-none resume-body",
                        style: "width: 18rem;"
                    })
                    cardBody.append("<p class='font-weight-light'>" + datas[i].city + "</p>")
                    var buttonDiv = $("<div>")
                    buttonDiv.attr("class", "btn-group")
                    buttonDiv.append('<a class="btn btn-info" href="http://indeed.com' + datas[i].url + '"target="_blank">Resume Profile</a>')
                    buttonDiv.append('<a class="btn btn-primary " href="' + 'https://www.linkedin.com/search/results/index/?keywords=' + datas[i].firstName + '%20' + datas[i].lastName + '"target="_blank">Linked In Search</a>')
                    var cardFooter = $("<div>").attr("class", "card-footer text-center")
                    cardFooter.append(buttonDiv)
                    // cardBody.append("<div class='card-header text-capitalize mb-0'>" + datas[i].firstName + " " + datas[i].lastName + "</div><p class='font-weight-light'>" + datas[i].city +"</p>")
                    var list = $("<ul>")
                    for (j = 0; j < datas[i].skillsList.length; j++) {
                        if (j < 5) {
                            list.append("<li class='text-capitalize'>" + (datas[i].skillsList[j].text).toLowerCase() + " - " + datas[i].skillsList[j].monthsOfExperience + " Months </li>")
                        }
                        else {
                            j = datas[i].skillsList.length - 1
                            list.append("<li class='text-capitalize'> <a href='http://indeed.com" + datas[i].url + "'target='_blank'>See More...</a></li>")
                        }
                    }
                    cardBody.append(list)
                    card.append("<div class='card-header text-capitalize mb-0'><h3>" + datas[i].firstName + " " + datas[i].lastName + "</h3></div>")
                    card.append(cardBody)
                    card.append(cardFooter)
                    console.log(card)
                    $(".container").append(card)
                }//end of if to check theres data in all fields
            }//end of outer forloor
        }//End else
    })//end of ajax call then
}//end indeed func

function postAJob() {
    $(".container").empty();

    var form = $("<form>")

    var formGroup = $("<div>").attr("class", "form-group")
    var label = $("<label>")
    label.append("Position Title")
    var input = $("<input>").attr({ class: "form-control", id: "jobTitle", type: "text" })
    formGroup.append(label, input)
    form.append(formGroup)

    var formGroup = $("<div>").attr("class", "form-group")
    var label = $("<label>")
    label.append("Job Description")
    var input = $("<textarea>").attr({ class: "form-control", id: "jobDescription" })
    formGroup.append(label, input)
    form.append(formGroup)

    var formGroup = $("<div>").attr("class", "form-group")
    var label = $("<label>")
    label.append("Requirements")
    var input = $("<textarea>").attr({ class: "form-control", id: "requirements" })
    formGroup.append(label, input)
    form.append(formGroup)

    var formGroup = $("<div>").attr("class", "form-group")
    var label = $("<label>")
    label.append("Type of Position")
    var input = $("<select>").attr({ class: "form-control", id: "type" })
    input.append("<option>Full Time</option>", "<option>Part Time</option>", "<option>Temporary</option>")
    formGroup.append(label, input)
    form.append(formGroup)

    var formGroup = $("<div>").attr("class", "form-group")
    var label = $("<label>")
    label.append("Salary")
    var input = $("<input>").attr({ class: "form-control", id: "salary", type: "number" })
    formGroup.append(label, input)
    form.append(formGroup)


    var formGroup = $("<div>").attr("class", "form-group")
    var button = $("<button>").attr({ class: "btn btn-primary", id: "submit", type: "submit" }).append("Submit")
    var button2 = $("<button>").attr({ class: "btn btn-danger ml-1", type: "reset" }).append("Clear")
    formGroup.append(button, button2)
    form.append(formGroup)

    // $(".container").append(form)
    $("#post > .container").append(form)

    $('#submit').on('click', function (event) {
        event.preventDefault();

        //Get input info
        jobTitle = $('#jobTitle').val().trim();
        jobDescription = $('#jobDescription').val().trim();
        requirements = $('#requirements').val().trim();
        type = $('#type').val().trim();
        salary = $('#salary').val().trim();

        //Removed input info 
        $('#jobTitle').val('');
        $('#jobDescription').val('');
        $('#requirements').val('');
        $('#type').val('');
        $('#salary').val('');


        database.ref('/jobs').push({
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            requirements: requirements,
            type: type,
            salary: salary,

        });
    });


}

function listApplicants() {
    $(".container").empty();
    var counter = 0;


    database.ref('jobs/').on('child_added', function (snap) {
        console.log(snap.val().jobTitle)
        var card = $("<div>").attr({ class: "card mt-2 text-white bg-dark" })
        var body = $("<div>").attr({ class: "card-body", id: snap.key })
        var jobTitle = $("<h3>").attr("class", "card-header").append(snap.val().jobTitle)
        var badge = $("<h4>").attr({ class: "badge badge-primary" }).append("Job Description")
        var jobDescription = $("<p>").attr({ class: "font-italic" }).append(snap.val().jobDescription)
        var app = $("<h4>").attr("class", "card-title").append("Applicants")

        card.append(jobTitle)
        body.append(badge)
        body.append(jobDescription)
        body.append(app)
        counter++
        database.ref('jobs/' + snap.key + '/applicants').on('child_added', function (snap) {
            var name = snap.val().name
            var card2 = $("<div>").attr({ class: "card applicants float-left text-dark mr-2 " })
            var body2 = $("<div>").attr({ class: "card-body" })
            var name = $("<h5>").attr({ class: "card-title", }).append(name)
            body2.append(name)
            body2.append("<p><span class='font-weight-bold'>Phone: </span>" + snap.val().phone + "</p>")
            body2.append("<p><span class='font-weight-bold'>Email: </span><a href='mailto:" + snap.val().email + "'>" + snap.val().email + "</a></p>")
            body2.append("<button class='btn btn-primary name='" + name + "'>Hire</button>")
            card2.append(body2)
            body.append(card2)
        })
        card.append(body)
        $(".container").append(card)
        console.log(counter)
    })


}



// })//End of doc ready