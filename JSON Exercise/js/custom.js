const cards = [
    {"city": "South Lake Tahoe",
    "distance": 153},
    {"city": "Arnold",
    "distance": 107},
    {"city": "Paso Robles",
    "distance": 139},
    {"city": "Aptos",
    "distance": 26},
];


function addCity() {
    $("#info1").append(`${cards[0].city} <br> ${cards[0].distance} miles away`);
    $("#info2").append(`${cards[1].city} <br> ${cards[1].distance} miles away`);
    $("#info3").append(`${cards[2].city} <br> ${cards[2].distance} miles away`);
    $("#info4").append(`${cards[3].city} <br> ${cards[3].distance} miles away`)
};

addCity();