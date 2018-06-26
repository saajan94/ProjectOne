  var config = {
      apiKey: "AIzaSyA_odiTnYjkXf-fWIr3SohRdN2juB4CULo",
      authDomain: "classproject-89aa4.firebaseapp.com",
      databaseURL: "https://classproject-89aa4.firebaseio.com",
      projectId: "classproject-89aa4",
      storageBucket: "classproject-89aa4.appspot.com",
      messagingSenderId: "386386062448"
  };
  firebase.initializeApp(config);


  /**
   * Handles the sign in button press.
   */
  function toggleSignIn() {
      if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
      } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
              alert('Please enter an email address.');
              return;
          }
          if (password.length < 4) {
              alert('Please enter a password.');
              return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                  alert('Wrong password.');
              } else {
                  alert(errorMessage);
              }
              console.log(error);
              document.getElementById('quickstart-sign-in').disabled = false;
              // [END_EXCLUDE]
          });
          // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
  }

  /**
   * Handles the sign up button press.
   */
  function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
          alert('Please enter an email address.');
          return;
      }
      if (password.length < 4) {
          alert('Please enter a password.');
          return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
              alert('The password is too weak my dude.');
          } else {
              alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
      });
      // [END createwithemail]
  }

  /**
   * Sends an email verification to the user.
   */
  function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
      });
      // [END sendemailverification]
  }

  function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Password Reset Email Sent!');
          // [END_EXCLUDE]
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/invalid-email') {
              alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
              alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
  }












  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */

  function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              // [START_EXCLUDE]
              document.getElementById('quickstart-sign-in-status').textContent = 'Signed in right now';
              document.getElementById('quickstart-sign-in').textContent = 'Sign out';

              // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
              if (!emailVerified) {
                  document.getElementById('quickstart-verify-email').disabled = true;
                  document.getElementById('quickstart-password-reset').disabled = true;
                  document.getElementById("email").style.display = "none";
                  document.getElementById("password").style.display = "none";
                  document.getElementById("loginp").style.display = "none";
                  document.getElementById("quickstart-sign-up").style.display = "none";
                  document.getElementById("quickstart-verify-email").style.display = "none";
                  $(function calendardraw() {
$('#nocalendar').attr('id', 'calendar');
  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
  })

});
                  




              }
              // [END_EXCLUDE]
          } else {
              // User is signed out.
              // [START_EXCLUDE]
              document.getElementById("quickstart-verify-email").style.display = "none";
              document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
              document.getElementById('quickstart-sign-in').textContent = 'Sign in';
              $( "#calendar" ).empty();
              $('#calendar').attr('id', 'nocalendar');
              // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
      });
      // [END authstatelistener]













      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  }

  window.onload = function() {
      initApp();
  };