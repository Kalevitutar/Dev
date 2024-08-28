// Lambda Lab Exercises

// Exercise 1: ** Imports **
// Consider if your Lambda needs imports (e.g., access to database). If database access is needed, you can import pg with the following code:
const { Client } = require("pg");

// Exercise 2: ** Handler function **
// All Lambdas need to handle the request and response. Here is starter code that follows the import statement(s):

//handler function wrapper
export async function handler(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log(data); //let's assume data.provider stores the provider organization's name

  return "success"; //return statement
}
// - The event parameter is an object that allows us to get the data sent in the request.
// - The context parameter is an object that holds information about the AWS Lambda environment.
// - The callback parameter is a function that returns the result of the Lambda.
// - JSON is needed to parse the data we get from the UI.
// - It is always a good idea to log the data to check the data we get from the UI.

// Exercise 3. ** Database Connection **
// If the Lambda must connect with the database to run queries, you will need code to connect and to disconnect inside of the handler function. Here is starter code for the new Client instance of pg for the Lambda to connect to:

//Connect to PostgresDB
const client = new Client({
  user: process.env.MOCK_USER,
  host: process.env.MOCK_HOST,
  database: process.env.MOCK_DB_NAME,
  password: process.env.MOCK_PASSWORD,
  port: process.env.MOCK_PORT,
});

await client.connect();

// Exercise 4: ** Database Disconnection **
// Disconnecting from the database is one line of code just above the return statement in the handler function:

await client.end();

// Exercise 5: ** Response Handling **
// All Lambdas need a response for the callback parameter in the handler function to execute. Here is default code to start with:

const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: "success", //customize this value as needed so the UI can get data stored here; important: if sending results from a database query, be sure to execute JSON.stringify()
};
callback(null, response);

// Exercise 6. ** Custom Code **.
// Between the Database Connection code and the Response Handling code is the custom code you craft, the code you want the Lambda to execute. Here is starter code to see how PostgreSQL queries in JS look like, assuming the provider name was sent from the UI and stored in data.provider:

const text = "SELECT * FROM provider_participant_intake WHERE provider = $1";

const values = [data.provider];

const providerIntakes = await client.query(text, values);
console.log(`${data.provider} intakes`, providerIntakes);
// - it's always a good idea to log the result of the query throughout your handler function.
// - since logs can accumulate as you build custom code in your handler function, it's also a good idea to put a note about what is logged, thus the string `${data.provider}'s intakes`

// Exercise 7: ** Accessing the Serverless Offline Server
// Before building any custom code, let's check that your Lambda setup and code actually works when a request is sent from Postman.

// 1. Open the VS Code Terminal for this project and enter this command to start your local server: sls offline
// Terminal will print: Server ready: http://localhost:3000 🚀

// 2. Open Postman, then make a request at http://localhost:3000/<<lambda file name in all lowercase>> with raw JSON in its body: {"provider": "Future Works"}
// The results should print in console.

// 3. Every time you refactor your code, in VS Code Terminal, stop the server by pressing: Control + C. Then restart the server to test your refactored code: sls offline. Then test the request in Postman.

// Exercise 8: From the Pseudocoding Databases with Product Querying Practice Lab Activity for the Reports tab in the ResourceFull Provider App, try refactoring 3 queries to insert your own PostgreSQL in JS queries in the Lambda file you created. Make sure you console.log() every query result. Then test in Postman to see if you get the appropriate responses logged in VS Code Terminal!

// Exercise 9: Now that you have experimented with your own 3 queries, consider how you want to group all the query results logged to console and store all the results in the body of the response to send the data back to the UI.