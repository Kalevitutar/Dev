//We will be opening a store! 

//Compare and update the inventory stored in an array against a second array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item. 

var newItems = [];
function updateInventory(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j][1] === arr1[i][1]) {
          arr1[i][0] += arr2[j][0];
        }
      }
    }
      let flatArr1 = arr1.flat();
      for (let k = 0; k < arr2.length; k++) {
        let x = arr2[k][1];
        if (flatArr1.includes(x)) {
        } else {
          newItems.push(arr2[k]);
        }
        }
  for (let l = 0; l < newItems.length; l++) {
    arr1.push(newItems[l]);
  }
 function Comparator(a, b) {
   if (a[1] < b[1]) return -1;
   if (a[1] > b[1]) return 1;
   return 0;
 }
 arr1 = arr1.sort(Comparator); 
  console.log(arr1);
  console.log("There are a LOT of jackets - if you want to buy a Coloristy jacket, I know a place...");
}

// Example inventory lists
var currentInv = [
    [21, "Jackets"],
    [2, "Dress Shirts"],
    [1, "Pairs of Shoes"],
    [5, "Skirts"]
];

var newInv = [
    [2, "Pairs of Shoes"],
    [3, "Watches"],
    [67, "Jackets"],
    [7, "Pants"]
];

updateInventory(currentInv, newInv);

