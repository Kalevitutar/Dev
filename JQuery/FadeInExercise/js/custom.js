/*Challenge 1: Add jQuery code that fades in the text "I am a hidden secret" whenever the button is clicked.
Challenge 2: Change your jQuery code so it slides down the text instead of fading it in.
Challenge 3: Change the button text to say "Click me to toggle a hidden secret!" and make the text toggle between fading in and out each time it is clicked.*/

// $("#clicker").on("click", function (){
//   $("#secret").fadeIn(4000);
// });


$("#clicker").text("Click me to toggle a hidden secret!");

$("#clicker").on("click", function (){
  $("#secret").toggle(4000);
});