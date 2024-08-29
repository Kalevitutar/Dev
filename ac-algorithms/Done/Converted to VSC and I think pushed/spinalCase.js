//Let's learn spinal case!!

//Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

function spinalCase(str) {
  var spinal = str.replace(/(?!^)([A-Z])/g, ' $1')
    .replace(/[_\s]+(?=[a-zA-Z])/g, '-').toLowerCase();
  console.log(spinal);
}

spinalCase('This Is Spinal Case');

// spinalCase("This Is Spinal Case") should return "this-is-spinal-case".
// spinalCase("thisIsSpinalCase") should return "this-is-spinal-case".
// spinalCase("The_Andy_Griffith_Show") should return "the-andy-griffith-show".
// spinalCase("Teletubbies say Eh-oh") should return "teletubbies-say-eh-oh".
// spinalCase("AllThe-small Things") should return "all-the-small-things".