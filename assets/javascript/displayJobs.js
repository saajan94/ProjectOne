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

  database.ref('/jobs').on('child_added', function(snap){
   var card = $("<div>").attr({
      class: "card mb-4",
      style: "width: 100%"
    })

    var body = $("<div>").attr({
      class: "card-body"
    })

    var ul = $("<ul>").attr({
      class: "list-group"
    })

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
  
    var apply = $("<button>").attr({type: 'button',class: "btn btn-primary float-right mt-3",'data-toggle':'modal','data-target':'#apply', key:snap.key, title: title}).append("Apply")
    body.append(ul)
    body.append(apply)
    card.append(body)

    $(".row").append(card)
  
      console.log(snap.key)
      
      })
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

    // console.log(jobID + " " + email + " "+ phone + " " + name)
    database.ref('/jobs/' + jobID+ '/applicants').push({
      name: name,
      email: email,
      phone: phone
    })

  })







})