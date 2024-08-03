# SunsOutBunsOut
A Full Stack ASP.NET Core Project which manages online menu about burgers.

### Prerequisite
Before starting the project, please make sure you have the following installed:
- Dotnet (latest version)
- SQL Server Management Studio (SSMS)
- LocalDB (through the Visual Studio Installer, as part of the Data Storage and Processing workload, the ASP.NET and web development workload, or as an individual component. Run ***sqllocaldb start "MSSQLLocalDB"*** in command prompt to create the local instance if haven't done so)
- Node.js

### Database
The data are retrieved and stored in a local MySQL database instance (I tried to use Azure SQL but I did not have a subscription to deploy one). A SQL script is included in this directory which you can use to create database and table and import sample data.

### Building and running SunsOutBunsOut (backend)
Locate the SunsOutBunsOut (which is meant to be src) folder by running ***cd SunsOutBunsOut***, or right clicking the SunsOutBunsOut folder and select Open in Integrated Folder if using Visual Studio Code. 

Install the following packages by running the commands below:
- dotnet add package xunit
- dotnet add package xunit.runner.visualstudio
- dotnet add package Moq
- dotnet add package Newtonsoft.Json --version 13.0.1
- dotnet add package Microsoft.NET.Test.Sdk --version 17.4.1

Run ***dotnet build*** and then ***dotnet run*** to start the service.

### Building and running my-react-app (frontend)
Locate the my-react-app folder by running ***cd SunsOutBunsOut/my-react-app***, or right clicking the my-react-app folder and select Open in Integrated Folder if using Visual Studio Code. 

Install the following packages by running the commands below:
- npm install vite
- npm install react-router-dom
- npm install localforage match-sorter sort-by
- npm install @mantine/core @mantine/hooks

Run ***npm run build*** and ***npm run dev*** to run the project.

### About my project
One thing about my project I are very proud of is the feature of managing the burgers without accessing the code. The user does not require the knowledge of TypeScript and C# to carry out CRUD operations on the burgers. The user only need to press buttons and enter new values, and the menu (which is intended for customer viewing) will display the updated burgers.

Basic features of the web application includes:
- Creating a burger
- Read a burger
- Searching a burger
- Editing a burger
- Deleting a burger

Advanced features of the web application includes:
- Dark/Light mode
- Dynamic menu

### Unit Testing
Unit testing for the project is conducted using xUnit. These tests ensure that the interactions between the database and the web application function as expected. To run the testing, locate the SunsOutBunsOut folder and run ***dotnet test***. All repositories were expected to pass the test.

### Docker containerization
