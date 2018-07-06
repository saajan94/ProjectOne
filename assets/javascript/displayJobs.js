
//Linking Firebase to pull jobs from

$(function (){

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

//collects the jobs from Firebase to be displayed
  database.ref('/jobs').on('child_added', function(snap){
   var card = $("<div>").attr({
      class: "card mb-4",
      style: "width: 100%"
    })
    //sets attributes for the jobs pulled from FB
    var body = $("<div>").attr({
      class: "card-body"
    })
    //More attributes being added
    var ul = $("<ul>").attr({
      class: "list-group"
    })
    //Pulling the information from FB based on the items we need to display
    var li = $("<li>").attr("class", "list-group-item list-group-item-dark").append('<span class="font-weight-bold">Tittle: </span>'+snap.val().jobTitle)

    var li = $("<li>").attr("class", "list-group-item list-group-item-dark").append('<h3>'+snap.val().jobTitle+'</h3>')
    ul.append(li)
    var li = $("<li>").attr("class", "list-group-item").append('<span class="font-weight-bold">Description: </span>'+ snap.val().jobDescription)
    ul.append(li)
    var li = $("<li>").attr("class", "list-group-item").append('<span class="font-weight-bold">Requirements : </span>'+ snap.val().requirements)
    ul.append(li)
    var li = $("<li>").attr("class", "list-group-item").append('<span class="font-weight-bold">Type : </span>'+ snap.val().type)
    ul.append(li)
    var li = $("<li>").attr("class", "list-group-item").append('<span class="font-weight-bold">Salary: </span>$'+ snap.val().salary)
    ul.append(li)
    var title = snap.val().jobTitle
    //Adding the information how we want it to be displayed 
    var apply = $("<button>").attr({type: 'button',class: "btn btn-primary float-right mt-3",'data-toggle':'modal','data-target':'#apply', key:snap.key, title: title}).append("Apply")
    body.append(ul)
    body.append(apply)
    card.append(body)


  //Places the card on the HTML page
    $(".row").append(card)
  
      //debugging
      console.log(snap.key)

    $(".row").append(card)
  
      console.log(snap.key)
      
      })
      //setting up buttons for applying
      $('#apply').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var jobId = button.attr('key')
        var title = button.attr('title')
        var modal = $(this)
        modal.find('.modal-title').text('Apply for: ' + title)
        modal.find('.jobID').val(jobId)
  })

  $("#submitApplication").on("click", function(){
    var name = $("#name").val()
    var email = $("#email").val()
    var phone = $("#phone").val()
    var jobID = $("#jobID").val();


    database.ref('/jobs/' + jobID+ '/applicants').push({
      name: name,
      email: email,
      phone: phone
    })

  })


})