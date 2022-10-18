$("#submit-button").on("click", function(e){
    e.preventDefault()//This prevents the form from refreshing the page and wiping all of the user's inputs.
    var yourName = $("#yourName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    $("h2").append("I have secretive and magic powers.  Through the essence of the galaxies, I have divined your personal information.  Your name is " + yourName + ", your email is " + email + ", and your phone number is " + phone + ".  Bow before my mighty powers, oh New Earthling!")
});

