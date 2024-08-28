## ResourceFull Query Practice: Database Table Local Querying Playground Setup

The purpose of this repository is to seed a database with a table of mock data that pertains to the lab activity to draft query statements and check that the queries actually run successfully.

You will need these tools: prerequisite command line tools, secrets, pgAdmin 4, and repository access to run the command necessary to get the mock data set up locally.

After setting up the local querying playground, you can close the repo as it has done its job and is no longer needed.

## Prerequisite Command Line Tools

Both yarn and psql are needed to seed a database table with initial data in this repo. Yarn is a common command used in multiple repos. The psql command allows us to run PostgreSQL in Terminal while pgAdmin 4 is the GUI (graphical user interface).

1.  In Terminal, be sure that yarn is installed by running: yarn --version

    a. If yarn is not found, then run this command in Terminal: npm install --global yarn

    b. This repo needs yarn to help with seeding the database with table data.

2.  In Terminal, check if you have psql installed by running: psql --version

    a. If psql is not found, you have 2 ways to install:

    i. BROWSER: Download PostgreSQL and pgAdmin 4 (included) [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and go through the installation process accepting all defaults.

        - The super user password is something to note and is separate from the password in the secrets.json file for this project.

        - When you click Finish, you do NOT need to configure the Application Stack Builder.

        - In Finder > Applications, scroll to and open a folder named PostgreSQL. Then click and drag pgAdmin 4 to the Dock.

        - Once complete, close out of the installation window. Go to Finder > Locations (left sidebar) > PostgreSQL > click eject.

        - You do not need to download pgAdmin 4 again.

        - Contact the Engineering Manager for debugging if psql command is still not found in Terminal when you run: psql --version

    ii. TERMINAL: To install PostgreSQL, run: brew install postgresql@16 OR brew install postgresql

        - After installing the package, Terminal may ask you to export the path: export PATH="{some path your device prints out}/bin:$PATH"

        - Contact the Engineering Manager for debugging if psql command is still not found after exporting the path when you run: psql --version

## secrets.json file

The secrets.json file houses the necessary credentials for your local device to access the local database.

1. The Engineering Manager will supply you with a secrets.json file.

2. In the secrets.json file, you must supply your own password. IMPORTANT: Use this same password for local development and debugging when onboarded to ResourceFull.

## pgAdmin 4 Download

pgAdmin 4 allows us to query and view the data in our databases on our devices. If you already have pgAdmin 4 downloaded, then skip to the next section.

1. Go to https://www.pgadmin.org/download/pgadmin-4-macos/ by hovering over the underlined site link, then pressing Command and clicking the link.

2. When browser opens, select the most recent release version.

3. Then select the application format for your operating system.

4. After .dmg download completes, navigate to Finder > Downloads > double-click .dmg.

5. An installation window opens. Agree to the terms.

6. Then, when prompted, click and drag pgAdmin 4 to copy to your Applications folder.

7. Once complete, close out of the installation window. Go to Finder > Locations (left sidebar) > pgAdmin 4 > click eject.

8. Go to Finder > Applications > scroll to pgAdmin 4 > click + drag to Dock for ease of opening the application in the future.

## pgAdmin 4 Local Database Setup

1. Open pgAdmin 4.

2. Control + click Servers (left sidebar).

3. Select Register > Server.

4. In General tab, Name input field, give your local database an appropriate name.

5. In Connection tab, reference the secrets.json file to enter info for:

- Host name/address
- Password
  (You may want to Save Password)

6. Click Save.

## Github Repository Access

1. Supply your Engineering Manager with your Github handle to gain access to the repository.

2. Clone the repo.

3. Use VS Code to open the repo.

4. Open VS Code Terminal to install packages by running this command: npm install

5. Once packages have been installed, run this command to seed your database with mock data for one table: yarn seed

6. You will be prompted to enter your secrets.json password twice. Do so.

7. Then navigate to pgAdmin 4 > Servers > (your db name) > Databases > Schemas > public > Tables > provider_participant_intake to view data.

## pg Admin 4 Common Table Options

In pgAdmin 4, control + click provider_participant_intake to view common table options:

1. View/Edit Data > All Rows: allows you to see all rows of data in that table

2. Query Tool: allows you to run PostgreSQL queries. Use this tool to help you draft or check your query statements. Remember to click the Run button to activate the query.
