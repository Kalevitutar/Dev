var person = "";
var budget = 0;
var needs = 0;
var savings = 0;
var wants = 0;
var food = 0;
var housing = 0;
var billsAndLoans = 0;
var healthcare = 0;
var transportation = 0;
var otherEssentials = 0;
var funds = 0;

function myBudget() {
  person = prompt( "Please enter your name or ID" );
  budget = prompt( "Please enter your monthly salary - please put in a whole number, using only digits" );
  needs = budget * 0.5;
  savings = budget * 0.2;
  wants = budget * 0.3;
}

function inputYourNeeds() {
    food = prompt( "How much money do you spend monthly on food?");
    needs -= food;
    housing = prompt( "How much money do you spend monthly on housing?");
    needs -= housing;
    billsAndLoans = prompt( "How much money do you spend monthly on bills and loans?");
    needs -= billsAndLoans;
    healthcare = prompt( "How much money do you spend monthly on healthcare?");
    needs -= healthcare;
    transportation = prompt( "How much money do you spend monthly on transportation?");
    needs -= transportation;
    otherEssentials = prompt( "How much money do you spend monthly on other essentials?");
    needs -= otherEssentials;
}

function emergencyFund() {
    $("#emergency-note").hide(600);
}

function startOver() {
    person = "";
    budget = 0;
    needs = 0;
    savings = 0;
    wants = 0;
    food = 0;
    housing = 0;
    billsAndLoans = 0;
    healthcare = 0;
    transportation = 0;
    otherEssentials = 0;
    funds = 0;
    $("#beginP").empty();
    $("#needsP").empty();
    $("#emergencyP").empty();
    $("#emergency-note").fadeIn(600);
}

    // Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

//formatter.format(2500); /* $2,500.00 */

$( ".begin" ).on("click", function() {
  myBudget();
  $("#beginP").append(`Hello, ${person}!  Here is your budget for this month: <br>
    Needs: \$${needs} <br>
    Savings: \$${savings} <br>
    Wants: \$${wants}`);
});

$( ".needs" ).on("click", function() {
    inputYourNeeds();
    $("#needsP").append(`Remaining amount for needs: ${formatter.format(needs)}`);
    if (needs < 0) {
        $("#needsP").append(`<br>You are \$${Math.abs(needs)} over budget.  You will have to reduce the amount of money from your wants.`);
        wants += needs;
    } else {
        $("#needsP").append(`<br>You are doing great!`);
    }
    $("#needsP").append(`<br>
    Needs: ${formatter.format(needs)} <br>
    Savings: ${formatter.format(savings)} <br>
    Wants: ${formatter.format(wants)}`);
});

$( ".emergency" ).on("click", function() {
    emergencyFund();
    funds = prompt("How much will you put into your emergency fund?");
    if (funds > savings) {
        funds = prompt("That’s too much. Try a smaller amount");
    }
    savings -= funds;
    $("#emergencyP").append(`<br>
    Needs: ${formatter.format(needs)} <br>
    Savings: ${formatter.format(savings)} <br>
    Wants: ${formatter.format(wants)}`);
});

$( ".refresh" ).on("click", function() {
    startOver();
});