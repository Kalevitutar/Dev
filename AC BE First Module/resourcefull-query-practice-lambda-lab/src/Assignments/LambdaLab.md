## Lambda Lab Activity

Purpose: practice applying tools learned in the Product Lambda Diagramming and Shadowing a New Lambda Build workshop.

## Refactoring and/or Building a New Lambda Summary

1. The Serverless framework for AWS allows us to create code for AWS configurations and deployments of Lambda functions automatically.

2. Key files for custom code are in our:

   - JSON (secrets)
   - YML (references secrets; sets up runtime, lambda event trigger paths, etc)
   - Lambda files (handler function for requests and responses)

3. Lambda file names should correspond with the lambda event trigger path in YML file. This will allow Postman calls to work.

## JSON File

Your existing **secrets.json** file needs one more key-value pair.

JSON Exercise 1: In the **secrets.json** file, please add within the curly braces {} a new key-value pair (order does not matter; it can be listed first before all the mock key-value pairs):

"SERVICE": "resourcefull-query-practice"

## YML File

The **serverless.yml** file's _functions_ section needs your new Lambda file name and its directory. Consider the following items for naming the Lambda and creating the directory.

A Lambda file name has 2 parts:

1. Action: is the Lambda getting, adding, updating, or deleting data?
2. Feature: what is the Lambda getting, adding, updating or deleting?
   Note: What is most important is if the name makes sense to another developer.

Examples:

1. getAllProviders - this Lambda gets all providers' information to display in a table
2. addFavorites - this Lambda allows a user to add a provider as a favorite
3. checkUserExists - this Lambda checks if a username (email address) already exists
4. updateProviderProfile - this Lambda update's the provider's visibility in our listings
5. resetTempPassword - this Lambda resets a user's temporary password
6. sendWelcomeEmail - this Lambda sends a first-time user a welcome email
7. deleteAccount - this Lambda allows a user to remove their account

YML Exercise 1: For the Reports tab in the ResourceFull Provider App, can you think of an appropriate name for a new Lambda?

YML Exercise 2: Since the Reports tab does not exist in the app yet, and all the other tabs have its own directory, in the **src** folder create a new folder for all Lambdas that have to do with the Reports tab in the app.

YML Exercise 3: In the folder you just created to house all Lambdas needed for this new Reports tab, create a JS file with the new Lambda's name from YML Exercise 1.

YML Exercise 4: In the **serverless.yml** file, scroll to the **functions** section to add your Lambda file name and its directory in the applicable places, deleting placeholder punctuation <<>> as well.

YML Exercise 5: In the **serverless.yml** file's **functions** section, the _method_ for your function may be DIFFERENT from the _action_ word used in naming your Lambda! For example, _getProviderProfile_ may actually have a _post_ method because the request posts the provider organization's name from the UI to the Lambda. So consider whether your UI sends data to your Lambda, because our Lambdas usually only have two methods: _get_ or _post_. The code will look like this:
`method: get`
OR
`method: post`

## Lambda File

Since markdown punctuation can impact copy and paste between markdown and code files, please open [LambdaLab.js](./LambdaLab.js) to get starter code to build your custom code for the Lambda's handler function.
