//Fibonacci Challenge!

//Return the sum of all odd Fibonacci numbers up to and including the passed number if it is a Fibonacci number.

//The first few numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8, and each subsequent number is the sum of the previous two numbers.

//As an example, passing 4 to the function should return 5 because all the odd Fibonacci numbers under 4 are 1, 1, and 3.


var reducer = (previousValue, currentValue) => previousValue + currentValue;
function sumFibonacci(num) {
  if (num < 1) {
    console.log("Please enter a number that is equal to, or higher than one.");
  } else {
    let fibonacciArray = [1, 1];
    let next = 1;
    for (let i = 0; i <= num; i++) {
      next = fibonacciArray[i] + fibonacciArray[i + 1];
      if (next <= num) {
        fibonacciArray.push(next);
      }
    }
    let oddFibonacciArray = [];
    for (let j = 0; j < fibonacciArray.length; j++) {
      if (fibonacciArray[j] % 2 !== 0) {
        oddFibonacciArray.push(fibonacciArray[j]);
      }
    }
    console.log(oddFibonacciArray.reduce(reducer));
  }
}



//TEST CASES
//sumFibonacci(1000); should return 1785.
//sumFibonacci(4000000); should return 4613732.
//sumFibonacci(4); should return 5.
//sumFibonacci(75024); should return 60696.
//sumFibonacci(75025); should return 135721.