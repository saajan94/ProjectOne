//linking of the FireBase account
var config = {
    apiKey: "AIzaSyA_odiTnYjkXf-fWIr3SohRdN2juB4CULo",
    authDomain: "classproject-89aa4.firebaseapp.com",
    databaseURL: "https://classproject-89aa4.firebaseio.com",
    projectId: "classproject-89aa4",
    storageBucket: "classproject-89aa4.appspot.com",
    messagingSenderId: "386386062448"
};
firebase.initializeApp(config);
var database = firebase.database();

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
        //Email must be longer than 4 characters long
        if (email.length < 4) {
            document.getElementById('loginerror').textContent = 'Please enter an email address.';
            return;
        }
        //Password must be longer than 4 characters long
        if (password.length < 4) {
            document.getElementById('loginerror').textContent = 'Please enter a valid password.';
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
                document.getElementById('loginerror').textContent = 'Wrong Password';
            } else {
                document.getElementById('loginerror').textContent = errorMessage;
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
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
            console.log(user);

            document.getElementById('quickstart-verify-email').disabled = true;
            document.getElementById("quickstart-password-reset").style.display = "none";
            document.getElementById("email").style.display = "none";
            document.getElementById("password").style.display = "none";
            document.getElementById("loginp").style.display = "inline-block";
            document.getElementById("quickstart-verify-email").style.display = "none";
            document.getElementById("weatherstuff").style.display = "block";
            document.getElementById("containerFdemo").style.marginTop = "10px";
            $('.navbar').css('display', 'flex');
          
            // $("nav").hide(0);


            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = "Welcome " + email;
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';

        } else {
            // User is signed out.
            // [START_EXCLUDE]
            $( "#email" ).val("");
            $( "#password" ).val("");
            document.getElementById("email").style.display = "inline";
            document.getElementById("password").style.display = "inline";
            document.getElementById("quickstart-verify-email").style.display = "none";
            document.getElementById("weatherstuff").style.display = "none";
            document.getElementById("quickstart-password-reset").style.display = "inline-block";
            document.getElementById("containerFdemo").style.marginTop = "100px"; 
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-sign-in-status').textContent = "";
            document.getElementById("navbarNav").style.display = "none";
            $("#calendar").empty();
            $('#calendar').attr('id', 'nocalendar');
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]


    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
    initApp();
};