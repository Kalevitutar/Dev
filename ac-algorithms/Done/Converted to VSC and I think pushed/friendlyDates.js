// Friendly Date Ranges
// Convert a date range consisting of two dates formatted as YYYY-MM-DD into a more readable format.

// The friendly display should use month names instead of numbers and ordinal dates instead of cardinal (1st instead of 1).

// Do not display information that is redundant or that can be inferred by the user: if the date range ends in less than a year from when it begins, do not display the ending year.

// Additionally, if the date range begins in the current year and ends within one year, the year should not be displayed at the beginning of the friendly range.

// If the range ends in the same month that it begins, do not display the ending year or month.


//Hints
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt


function friendlyDates(arr) {
  let year1 = +arr[0].substring(0, 4);
  let year2 = +arr[1].substring(0, 4);
  let month1Num = +arr[0].substring(5, 7);
  let month2Num = +arr[1].substring(5, 7);
  let day1Cardinal = +arr[0].substring(8);
  let day2Cardinal = +arr[1].substring(8);
  let month = ["month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month1Name = month[month1Num];
  let month2Name = month[month2Num];
  let day = ["Ordinal", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
  let day1Ordinal = day[day1Cardinal];
  let day2Ordinal = day[day2Cardinal];
  if (year2 === year1 && month2Num === month1Num && day2Cardinal === day1Cardinal) {
    console.log(month1Name + " " + day1Ordinal + "," + year1);
  } else if (year2 === year1 && month2Num === month1Num) {
    console.log(month1Name + " " + day1Ordinal + "," + day2Ordinal);
  } else if (year2 === year1) {
    console.log(month1Name + " " + day1Ordinal + "," + year1 + "," + month2Name + " " + day2Ordinal);
  } else if ((year2 === year1 + 1 && (month2Num < month1Num || (month2Num === month1Num && day2Cardinal < day1Cardinal)))) {
    console.log(month1Name + " " + day1Ordinal + "," + month2Name + " " + day2Ordinal);
  } else {
    console.log(month1Name + " " + day1Ordinal + "," + year1 + "," + month2Name + " " + day2Ordinal + "," + year2);
  }
}

friendlyDates(['2016-07-01', '2016-07-04']);

// TEST CASES

// friendlyDates(["2016-07-01", "2016-07-04"]) should return ["July 1st","4th"].
// friendlyDates(["2016-12-01", "2017-02-03"]) should return ["December 1st","February 3rd"].
// friendlyDates(["2016-12-01", "2018-02-03"]) should return ["December 1st, 2016","February 3rd, 2018"].
// friendlyDates(["2017-03-01", "2017-05-05"]) should return ["March 1st, 2017","May 5th"]
// friendlyDates(["2018-01-13", "2018-01-13"]) should return ["January 13th, 2018"].
// friendlyDates(["2022-09-05", "2023-09-04"]) should return ["September 5th, 2022","September 4th"].
// friendlyDates(["2022-09-05", "2023-09-05"]) should return ["September 5th, 2022","September 5th, 2023"].