//Code Your DNA!

//The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2nd array.

//Base pairs are a pair of AT and CG. Match the missing element to the provided character.

//Return the provided character as the first element in each array.

//For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]

//The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

function pairElement(str) {
  let pairedArray = "";
  let nitrogenousBaseArray = str.split('');
  const x = nitrogenousBaseArray.length
  for (let i = 0; i <= 2 * (x - 1); i += 2) {
    switch (nitrogenousBaseArray[i]) {
      case "A":
        nitrogenousBaseArray.splice(i + 1, 0, "T");
        break;
      case "C":
        nitrogenousBaseArray.splice(i + 1, 0, "G");
        break;
      case "G":
        nitrogenousBaseArray.splice(i + 1, 0, "C");
        break;
      case "T":
        nitrogenousBaseArray.splice(i + 1, 0, "A");
        break;
      default:
        console.log("inaccurate base abbreviation");
    }
  }
  let newArray = [];
  for (let j = 0; j < nitrogenousBaseArray.length; j += 2) {
    newArray.push(nitrogenousBaseArray.slice(j, j + 2));
  }
  console.log(newArray);
}

pairElement("GCG");

//TEST CASES
//pairElement("ATCGA") should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].
//pairElement("TTGAG") should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].
//pairElement("CTCTA") should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]]