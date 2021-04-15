# ComIT-Project-Volunteer

This project was done as part of the requirements of the ComIT course on NodeJS. The course covered HTML, CSS, Express, NodeJS, Javascript, React and MongoDB.

This project is called "Serve The Planet". The primary objective was to create a web platform for bringing together organizations which seek volunteers and individuals who are keen to do volunteering work in their area of interest or passion.

The project could accomplish creation of a landing page and has the following full working functionalities:

1. Register - The Register page makes a web form available to an organization or an individual to enter their required details and complete the registration process. The system will disallow a user credential with duplicate username i.e. email. It checks for password mismatch. The password is hashed and stored in the database. A status bar is provided which provides the necessary messages for the user such as whether or not the registration process was successful.

2. Sign In - This page provides a form for entering username and password and also has a status bar similar to the Register page. It matches password with the one stored in MongoDB. Successful sign in process will redirect the user to the landing page but this time the name of the user will appear in the header as "Welcome {{user}}". If the user is an individual, the firstname will be displayed and if it is an organization, the full name will be displayed. Successful registration will also show a Logout button at the top.

3. Logout - The Logout link will clear all cookies and JWTs and return the user to the landing page

4. Create Opportunity  - This link is available for only those users who are registered as organization. An individual accessing this link will see a 404 error. Access to the page is done through the availability of a JWT and verifying its credentials with the user database. The page will display the logo of the organization on the top of the form and will store the organization name and the opportunity details in MongoDB.

5. Explore Opportunities - This page renders all available volunteering opportunities by default. There is a filtering panel which has different criteria for filtering opportunities. On submitting the filters, the page re-renders with the resultant matches. No filter will display all opportunities.

# Technologies used:
a. HTML5 / CSS with flexbox and grid
b. Handlebars templating engine
c. NodeJS/Express for backend server and route setup
d. MongoDB database
e. Javascript - dependencies include - bcrypt, cuid, express-handlebars, jsonwebtoken, validator, mongoose

# Functionalities planned but not implemented
- pagination in the opportunity page
