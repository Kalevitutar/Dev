// Consider if your Lambda needs imports (e.g., access to database). If database access is needed, you can import pg with the following code:
const { Client } = require("pg");

// All Lambdas need to handle the request and response. Here is starter code that follows the import statement(s):
//handler function wrapper
export async function handler(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log(data); //let's assume data.provider stores the provider organization's name
  // return "success"; //return statement commented out - done at end

// - The event parameter is an object that allows us to get the data sent in the request.
// - The context parameter is an object that holds information about the AWS Lambda environment.
// - The callback parameter is a function that returns the result of the Lambda.
// - JSON is needed to parse the data we get from the UI.
// - It is always a good idea to log the data to check the data we get from the UI.


  // If the Lambda must connect with the database to run queries, you will need code to connect and to disconnect inside of the handler function. Here is starter code for the new Client instance of pg for the Lambda to connect to:

//Connect to PostgresDB - credentials, connect
const client = new Client({
  user: process.env.MOCK_USER,
  host: process.env.MOCK_HOST,
  database: process.env.MOCK_DB_NAME,
  password: process.env.MOCK_PASSWORD,
  port: process.env.MOCK_PORT,
});

await client.connect();

// ** Custom Code **.
// Between the Database Connection code and the Response Handling code is the custom code you craft, the code you want the Lambda to execute. Here is starter code to see how PostgreSQL queries in JS look like, assuming the provider name was sent from the UI and stored in data.provider:

//test 1 - selecting everything from inputted provider
// const text = "SELECT * FROM provider_participant_intake WHERE provider = $1"; 

//test 2
// const text = "SELECT * FROM provider_participant_intake WHERE intake_form_completed BETWEEN $1 AND $2 AND provider = $3";

//test 3
// const text = "SELECT * FROM provider_participant_intake WHERE intake_form_completed BETWEEN $1 AND $2 AND gender = $3 AND num_of_children > $4 AND provider = $5";

//test 4
const text = "SELECT COUNT(*) FROM provider_participant_intake WHERE provider = $1";

//for test 1
// const values = [data.provider];

//for test 2
// const values = ["2023-01-01" , "2024-01-01" , data.provider];

//for test 3
// const values = ["2022-01-01" , "2023-01-01" , "Woman", 0, data.provider];

//for test 4
const values = [data.provider];

const providerIntakes = await client.query(text, values);
console.log(`${data.provider} intakes `, providerIntakes);
// console.log("query results rows ", providerIntakes["rows"]);
// console.log("first object in row array query results", providerIntakes.rows[0]);
// - it's always a good idea to log the result of the query throughout your handler function.
// - since logs can accumulate as you build custom code in your handler function, it's also a good idea to put a note about what is logged, thus the string `${data.provider}'s intakes`

const allQueryResults = {
  providerIntakes: providerIntakes.rows,

}



// All Lambdas need a response for the callback parameter in the handler function to execute. Here is default code to start with:
const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(allQueryResults), // all records are objects in the "rows" array in the query request; customize this value as needed so the UI can get data stored here; important: if sending results from a database query, be sure to execute JSON.stringify()
};
callback(null, response); //callback to send structured response in the UI



// Disconnecting from the database is one line of code just above the return statement in the handler function:
await client.end();

return "success"; //return statement
}