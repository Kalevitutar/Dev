// Public: 2ff83ac223429ca4601f3acb3244e882
// Private: f752f46b5cd011fd013810d5f7057697ddf59e77
// Hash: 69446d07d7e3431497d4f35a0894cec9

async function getHeroine(e) {
  e.preventDefault();
  let ts = 1;
  let heroineName = $(".heroine").val();

  let response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroineName}&ts=${1}&apikey=2ff83ac223429ca4601f3acb3244e882&hash=69446d07d7e3431497d4f35a0894cec9`
  );
  console.log(heroineName);
  console.log(response);

  let data = await response.json();
  console.log(data);

  $(".flex-container").empty();

  let marvelData = data.data.results.map((result) => {
    $(".flex-container").append(
      `<div class = "cards"><img src = '${result.thumbnail.path}.${result.thumbnail.extension}' alt = 'image of ${result.name}'/> ${result.name}  ${result.description} </div>`
    )
    });
}



$("#heroine").keypress(function(e) {
  if (e.which == 13) {
    getHeroine(e);
  }  
});

$(".submit").on("click",function(e){
  getHeroine(e);
});