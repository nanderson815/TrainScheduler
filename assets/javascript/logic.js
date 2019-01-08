
// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlROg2XASMhlYpjDwBWkXRSwWhUBDDdHs",
    authDomain: "trainscheduler-3c1f6.firebaseapp.com",
    databaseURL: "https://trainscheduler-3c1f6.firebaseio.com",
    projectId: "trainscheduler-3c1f6",
    storageBucket: "trainscheduler-3c1f6.appspot.com",
    messagingSenderId: "286160758806"
};
firebase.initializeApp(config);

var database = firebase.database();

// Global Vars
var name = '';
var destination = '';
var time;
var frequency;
var tableRow = 0;


// On submit button Click:
$("#submit-btn").on("click", function (event) {

    // Prevent Default.
    event.preventDefault();

    // Grab the values in all inputs.
    name = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $('#time-input').val().trim();
    frequency = $('#frequency-input').val().trim();

    // Store the values in Firebase.
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });

    // empty the input fields.
    $('#train-input').val('');
    $('#destination-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.key);

    // Store firebase values as vars
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var freq = childSnapshot.val().frequency;

    // Math to get next train.
    var today = moment().format("YYYY-MM-DD")
    // console.log(today);

    // Time of First Train Variable
    var firstTrain = moment(today + " " + time);
    // console.log(firstTrain);

    // Train Interval Var
    interval = freq;
    // console.log(interval);

    // Current Time
    var currentTime = moment();
    // console.log(currentTime);

    // Time until next train

    // Calculates the next train time
    // If the first train has already arrived....
    if (firstTrain < currentTime) {
        var minutesAway = interval - ((currentTime.diff(firstTrain, 'minutes')) % interval);
        var nextTrain = currentTime.add(minutesAway, 'm').format('LT');
        // If the first train of the day has not yet come...
    } else {
        var nextTrain = firstTrain.format('LT');
        var minutesAway = firstTrain.diff(currentTime, 'minutes');
    }


    // Create a new table row and append td
    var row = $('<tr>').append(
        $('<td>').text(name),
        $('<td>').text(dest),
        $('<td>').text(freq),
        $('<td>').text(nextTrain),
        $('<td>').text(minutesAway).attr("id", "minutesAway"),
        $('<td>').html("<button id = '" + childSnapshot.key + "' class = 'btn btn-light mt-1 delete-row' data='" + tableRow + "'>Remove</button>")
    )

    tableRow++;
    // Append row to table
    $('#table').append(row);
    

});

$(document.body).on("click", ".delete-row", function(){
    console.log($(this).attr('data'));
});

