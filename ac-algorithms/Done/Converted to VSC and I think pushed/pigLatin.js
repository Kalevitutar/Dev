//PIG LATIN!

//Translate the provided string to pig latin.

//Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".

//If a word begins with a vowel you just add "way" to the end.


function translatePigLatin(str) {
  let plArray = str.split("");
  let vowelIndex = plArray.findIndex(element => element === "a" || element === "e" || element === "i" || element === "o" || element === "u" || element === "y");
  let first = plArray.slice(0, vowelIndex);
  let second = plArray.slice(vowelIndex);
  let plWordArray = [];
  if (vowelIndex === 0) {
    plWordArray.push(second, "way");
  } else {
    plWordArray.push(second, first, "ay");
  }
  let plWordArrayFlat = plWordArray.flat(Infinity);
  let finalPigLatinWord = plWordArrayFlat.join("");
  console.log(finalPigLatinWord);
}

translatePigLatin("consonant");

// TEST CASES
// translatePigLatin("california") should return "aliforniacay".
// translatePigLatin("paragraphs") should return "aragraphspay".
// translatePigLatin("glove") should return "oveglay".
// translatePigLatin("algorithm") should return "algorithmway".
// translatePigLatin("eight") should return "eightway".