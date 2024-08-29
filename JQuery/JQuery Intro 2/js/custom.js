$("#tallinn").css("font-size", "24px");
$("#kuivastu").css("font-size", "24px");
$("#liiva").css({
    "font-size" : "16px",
    "display" : "none",
    "color" : "purple"
});
$("#liiva").fadeIn(3240);

$("#ja").on("click", function(){
    $("#kuivastu").css("background-color", "violet");
    $("#liiva").css("background-color", "violet");
});

$("#ei").on("click", function(){
    $("#tallinn").css("background-color", "violet");
});