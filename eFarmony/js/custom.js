// eFarmony

// ###Animal User Model

// This object will be the model of a single animal user.

//Step 1: Create a variable, name it animal, and assign it an object literal.

var animal = {};

//Step 2: With Dot Notation, add a property called username and assign it a value. Ensure that your username property exists in animal by inspecting it in the console.

animal.username = "Traipsies";
console.log(animal.username);
  
//Step 3: With Bracket Notation, add a property called tagline and give it a value. Check that your property exists in the animal object by inspecting it in the console.

animal["tagline"] = "I'm the bestest";
console.log(animal.tagline);

//Step 4: Create a variable called noises and assign it an empty array[]. Add the noises array to your object. Inspect your handiwork! Your object should look something like this:
// {
//     username: 'DaffyDuck',
//     tagline: 'Yippeee!',
//     noises: []
// }

animal.noises = [];
console.log(animal);

//Step 5: Loop through the properties of your animal object. Count everytime it loops to keep track of the number of properties on your object. Write an if/else statement in your loop: If the key is username, console.log('Hi my name is ' + ___) //fill in with object's username value. If the key is tagline, console.log('I like to say ' + ___) //fill in with object's tagline value.

let count = 0;
            
for (const key in animal) {
    if (animal.hasOwnProperty(key)) {
      if (key !== "username" && key !== "tagline") {
        count++;
      } else if (key === "username") {
        count++;
        console.log(`Hi my name is ${animal[key]}`);
      } else {
        count++;
        console.log(`I like to say ${animal[key]}`);
      }
    }
}

   console.log(count);


//Step 6: Write a constructor function, AnimalCreator that creates a new animal object.The constructor function has 4 parameters: username, species, tagline, and noises. Noises should be an array. Each object should also have a friends key. Friends should always be an empty array to start. (They haven't added any friends yet!)

function AnimalCreator(username, species, tagline, noises) {
  this.username = username;
  this.species = species;
  this.tagline = tagline;
  this.noises = noises;
  this.friends = [];
}

//Step 7: Create your first animal!

var unicorn = new AnimalCreator("Jewel", "magic", "For Narnia", "whinny");

//Step 8: Make another animal!! Yay! So fun!

var seal = new AnimalCreator("Frolic", "water", "I love swimming underwater", "bark");

//Step 9: Write a function addFriends, that takes an animal object like the one returned from the AnimalCreator function and adds another animal object as its friend.  Your animal should look like this function is called add friends 
// { username: 'Cloud',
//  species: 'sheep',
//  tagline: 'You can count on me!',
//  noises: ['baahhh', 'arrgg', 'chewchewchew'],
//  friends: [{username: 'Moo Girl', species: 'cow', tagline: "Yaaaaas Moooo", noises: ["moooo", "sup", "hay girl"]}]
// }

function addFriends (animal1, animal2) {
  animal1.friends.push(animal2);
}

addFriends(unicorn, seal);
console.log(unicorn, seal);

//Step 10: Change your addFriend function to only add the username of the friend, not the whole object.

// { username: 'Cloud',
//  species: 'sheep',
//  tagline: 'You can count on me!',
//  noises: ['baahhh', 'arrgg', 'chewchewchew'],
//  friends: ['Moo Girl']
// }

function addFriendsObject (animal1, animal2) {
  animal1.friends.push(animal2.username);
}

addFriendsObject(unicorn, seal);
console.log(unicorn, seal);

//Step 11: Create a myFarm collection of at least 3 animal objects. Give them some friends using addFriend, too!

var doggie = new AnimalCreator("Fuzzy", "dog", "I'm like Traipsies");
var piggie = new AnimalCreator("NotFuzzy", "pig", "I am fun");
var parsley = new AnimalCreator("Parsley", "bull", "I love parsley");

addFriendsObject(doggie, seal);
addFriendsObject(piggie, unicorn);
addFriendsObject(parsley, doggie);

var myFarm = [doggie, piggie, parsley];

console.log(myFarm);

//Step 12: Create a function, addMatchesArray, that takes a farm(array of animal objects) and adds a new property to each animal object called matches that is an empty array. Hint: you will need a loop.

function addMatchesArray(farm) {
  for (let i = 0; i < myFarm.length; i++) {
    farm[i].matches = [];
  } 
  console.log(farm);
}

addMatchesArray(myFarm);

//Step 13: Create a function, giveMatches, that takes a farm collection(aka an array of animal objects) that already has a matches property.It selects a name from the friends array and adds it to the matches array.You can choose how the selection is made(random, the first element, etc).Make sure all your animal objects have friends.

function giveMatches(farm) {
  for (let j = 0; j < farm.length; j++) {
    farm[j].matches.push(farm[j].friends[0]);
  }
  console.log(farm);
}

giveMatches(myFarm);
