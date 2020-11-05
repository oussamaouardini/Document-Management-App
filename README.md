# Document-Management-App



This application is developped as part of my Initiation Internship within the INFOSAT company in Agadir Morocco,
I was asked to develop a web application for managing documents within the company (Using Firebase), and this for
The exchange of information between an employee of a company and his boss, director or colleague ... 
In General, file sharing between the employees.

## How it works

In our project we have two spaces, one for the administrator (Admin Dashboard) and
another for the users (Client Application)
• Administrator :
The administrator is the only one who has access to the complete informations of the system.
He can do the overall management of the system, for example create or suspend accounts.
• User:
Each user can download files and store them in the database.but first he has to create an account
in order to authenticate himself. In addition he can access the files to view them download ...

## Functionality

• User (Employee)

  ➢ Registration
  ➢ Authentication
  ➢ Add files
  ➢ Edit files if (he has access)
  ➢ Delete files (he has access)
• Admin (Director)

  ➢ Authentication
  ➢ Add files
  ➢ Edit files
  ➢ Delete files
  ➢ Add Users

## Development

### Setup

first of all clone the repository then crete a firebase project, then copy past the cretentials of the project in 
the app.component.ts file for both admin and users projects. after that run in the terminal ' npm install ' and 
' ng serve --open ' to serve the project.  
