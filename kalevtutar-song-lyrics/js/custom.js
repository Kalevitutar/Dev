// Async Await version
async function lyrics(e) {
  e.preventDefault();
  var title = $("#title").val();
  var artist = $("#artist").val();
  console.log(artist);
  console.log(title);
  let response = await fetch(
    `https://api.lyrics.ovh/v1/${artist}/${title}`
    );
  let data = await response.json();
  console.log(data);
  $("#lyrics").text(data.lyrics);
}

$("form").on("submit", function (e) {
  $("#lyrics").text("loading...");
  lyrics(e);
});

// then version
// $("form").on("submit", function(e) {
//   e.preventDefault();

//   var title = $("#title").val();
//   var artist = $("#artist").val();
//   console.log(artist);
//   console.log(title);

//   fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
//     .then((response) => response.json())
//     .then((data) => {
//       $("#lyrics").text("Loading . . .");
//       console.log(data);
//       $("#lyrics").text(data.lyrics);
//     });
// });