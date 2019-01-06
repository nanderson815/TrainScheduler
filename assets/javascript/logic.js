
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlROg2XASMhlYpjDwBWkXRSwWhUBDDdHs",
    authDomain: "trainscheduler-3c1f6.firebaseapp.com",
    databaseURL: "https://trainscheduler-3c1f6.firebaseio.com",
    projectId: "trainscheduler-3c1f6",
    storageBucket: "",
    messagingSenderId: "286160758806"
};
firebase.initializeApp(config);

var databse = firebase.database();

// On submit button Click:
$("#submit-btn").on("click", function(event){

// Prevent Default.
event.preventDefaul();

// Grab the values in all inputs.
var name = $("#train-input").val().trim();
var destination = $("#destination-input").val().trim();
var time = $('#time-input').val().trim();
var frequency = $('#frequency-input').val().trim();

// Store the values in Firebase.

// empty the input fields.

});
