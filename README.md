# SunsOutBunsOut
A Full Stack ASP.NET Core Project which manages online food (burgers) menu.

### Prerequisite and Packages
Before starting the project, please make sure you have the following installed:
- Dotnet (latest version)
- SQL Server Management Studio (SSMS)
- LocalDB (through the Visual Studio Installer, as part of the Data Storage and Processing workload, the ASP.NET and web development workload, or as an individual component, also run ***sqllocaldb start "MSSQLLocalDB"*** to create the local instance if haven't done so)
- Node.js 

Install the packages by running the commands below:
- npm install vite
- npm install react-router-dom
- npm install localforage match-sorter sort-by

### Database
The data are retrieved and stored in a local MySQL database instance (I tried to use Azure SQL but I did not have a subscription to deploy one). A SQL script is included in this directory which you can use to create database and table and import sample data.

### Running SunsOutBunsOut (backend)
Locate the SunsOutBunsOut folder by running ***cd SunsOutBunsOut***, or right clicking the SunsOutBunsOut folder and select Open in Integrated Folder. Run **dotnet build** and then ***dotnet run*** to start the service.


### Running my-react-app (frontend)
Locate the my-react-app folder by running **cd SunsOutBunsOut/my-react-app**, or right clicking the my-react-app folder and select Open in Integrated Folder. Run **npm run dev** to run the project.

(Note: This app does not use any specific CSS styling library because a student ambassador in the discord servers says it is okay as long as it is visually appealling).