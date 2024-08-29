function makeMadLib() {
  var person = document.getElementById("person").value;
var noun = document.getElementById("noun").value;
var adjective = document.getElementById("adjective").value;
    $("#story").append(person + " has a complicated relationship with her " + adjective + " " + noun);
};

$("#lib-button").on("click", function() {
    makeMadLib();
});







// variables 

// object and keys 
// functions 
// function exectutions 
// add an event listener listen for the click 
// function makeMadLib(e){
// e.preventDefault();
// let noun = $("#noun").val();
// let adjective = $("#adjective").val();
// let person = $("#person").val();

// let storyTime = person + " likes  " + adjective + " " + noun + " " ;
// $("#story").append(storyTime);

// }
// $("#lib-button").on ("click",function(e){
// makeMadLib(e);