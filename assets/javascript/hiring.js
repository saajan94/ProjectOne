// $(function () {

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
        var input = $("<input>").attr({class: "form-control ml-2 mr-2",id: "query",type: "text"})
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
        })
        button.append("Submit")
        var formGroup = $("<div>").attr("class", "form group")
        formGroup.append(button)
        form.append(formGroup)
        skillsForm.prepend(form)
        $(".container").prepend(skillsForm)

    }
    var results = $("<div>").attr("id", "results")
    $(".container").append(results)


}

$(document).on("click", "#search", function () {
    event.preventDefault();

    $("#noResults").remove()
    $(".container").append(loading)
    $("#results").empty()
    var query = $('#query').val()
    var location = $("#location").val()
    start = 0;
    callIndeed(query, location, start)
})


    $(window).scroll(function () {
        // console.log($(window).scrollTop());
        // console.log($(document).height());
        // console.log($(window).height())
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


function callIndeed(query, location, start) {
    $.ajax({
        url: `https://indeedapi.herokuapp.com/?l=${location}&v=1&q=${query}&start=${start}`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#loading").remove()
        var datas = response.data.resumes
        // console.log(datas.length)
        if (datas.length === 0 && start > 51) {
            console.log("Start is: " + start)
            $("#results").append(noMoreResults)
        }
        else if (datas.length === 0 && start < 51) {
            console.log(start)
            $("#results").append(noResults)
        }
        else {
            for (i = 0; i < datas.length; i++) {
                if (datas[i].skillsList.length > 0 && datas[i].firstName != "" && datas[i].lastName != "") {
                    var card = $("<div>")
                    card.attr("class", "card float-left m-2 bg-dark ")
                    var cardBody = $("<div>")
                    cardBody.attr({
                        class: "card-body pt-none",
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
                    $("#results").append(card)
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

    $(".container").append(form)

}
// })//End of doc ready