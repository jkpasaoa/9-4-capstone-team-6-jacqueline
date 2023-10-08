# City Whisperer App
## 9-4-capstone-team-6

<!-- ### *(Install procedure at end of this page)*  -->

<!-- ## **About My Project**  -->

<!-- <a href="https://scribehow.com" target="_blank">Click here for details on how to use the App !</a> -->

<a href="https://citywhisperer.netlify.app/" target="_blank">Our Deployed Link for City Whisperer</a>

<!-- <a href="" target="_blank">Too busy to read? Click here and my assistant will describe the App to you. </a> -->

Introducing "City Whisperer"

Welcome to City Whisperer, the premier platform for modern urban adventurers. Our application seamlessly combines cutting-edge software engineering with a deep passion for city exploration, offering an unparalleled user experience. Developed by a dynamic team of dedicated full-stack engineers, City Whisperer is your gateway to immersive city adventures.

Our meticulously curated walking routes, intuitive interface, and AI-generated tours redefine how you experience cities. With seamless Google Maps integration and customizable filters, you can uncover hidden treasures effortlessly. Join us on a journey to rediscover the allure of urban exploration with City Whisperer, where software engineering expertise meets a passion for technology, making city adventures come to life. Explore cities like never before, powered by the innovation of our dedicated development team.

The front-end of our application is built on React, offering a seamless and intuitive interface for browsing, exploring, and interacting with our collection. You can easily perform CRUD operations on each vehicle, from viewing detailed information and images to creating new listings and editing existing ones. Our thoughtfully designed forms make it effortless to add and update listings, ensuring that the process is user-friendly and efficient.

<!-- At City Whisperer, our backend infrastructure serves as the backbone of our application, ensuring seamless communication and data management. We've meticulously designed a RESTful server that powers every facet of the platform. Behind the scenes, a robust database structure with multiple fields and data types maintains the accuracy and integrity of our city exploration resources. With City Whisperer, you can count on a reliable and secure experience, thanks to dedicated routes for creating, reading, updating, and deleting resources. Even for unmatched routes, our server provides appropriate responses, guaranteeing a smooth and uninterrupted exploration journey.

But City Whisperer isn't just about providing walking tours and points of interest. We've gone beyond the conventional scope by introducing innovative sorting and filtering options. These features empower you to discover city treasures based on specific criteria, making it effortless to find your ideal urban adventure.

To bring City Whisperer to life, our dedicated team has deployed both the front-end and back-end applications to the web, offering accessibility from anywhere, at any time. Our GitHub repositories house the source code for both components, ensuring transparency and fostering collaboration. Comprehensive setup instructions and documentation in the readme files welcome you to explore and contribute to this exciting project.

Join us in experiencing the thrill of urban exploration with City Whisperer. Embark on your journey today, and uncover a world where technology meets the art of city discovery. Explore our curated routes, immerse yourself in captivating audio commentary, and enjoy the freedom of self-guided tours. City Whisperer is your companion to redefining city exploration, one step at a time. -->

<!-- <br></br>

## App Screenshots

<img src="./public/homescreen.png" alt="Screenshot a" width="68%" title="The Home Screen">
### The Home Screen

| ![image](./frontend/src/assets/HomeScreen.png "The Home Screen") |
|-|


### Individual Product Page

| ![image](./frontend/src/assets/IndividualProduct.png "Individual Product Page") |
|-|


### New Product Page

| ![image](./frontend/src/assets/NewProductPage.png "New Product Page") |
|-| -->

<!-- /Users/markrobertson/Desktop/ProductsAppFolder/frontend/src/assets/NewProductPage.png -->

## Developer Team

| Developers Names  |
| ------------- |
| Mark Roberston |
| Jacqueline Pasaoa |
| Raydelys Morrobel Reyes |
| Joseph Rodriguez |

<!--
<a href="https://" target="_blank">GitHub</a>
<a href="https://www.linkedin.com/" target="_blank">LinkedIn</a> -->

<a href="https://trello.com/b/qayrci3H/9-4capstoneteam6trello" target="_blank" rel="noopener noreferrer" target="_blank">Trello Board</a>


<!-- # **How to install**

Welcome again to the City Whisperer App! This guide will walk you through the installation and setup process to get the app up and running on your local machine.

## **Prerequisites**

Before you begin, please ensure that you have the following software installed on your machine:

- Node.js: Install Node.js from the official website: https://nodejs.org
- PostgreSQL: Install PostgreSQL from the official website: https://www.postgresql.org

# **Installation**

## **Back-end**

1.  Clone the repository:   git clone <repository URL>
2.  Navigate to the back-end directory: cd back-end
3.  Install the back-end dependencies:  npm install
4.  Create a .env file in the back-end directory and configure the following environment variables: <br>
PORT=2525<br>
PG_HOST=localhost<br>
PG_PORT=5432<br>
PG_DATABASE=products<br>
PG_USER=postgres<br>
5.  Make sure to include in your .gitignore file:   node_modules
.env
.DS_Store
5.  Start the back-end server:  npm start, which will actually start Front and back-end.


## **Front-end**

1.  Open a new terminal window and navigate to the front-end directory: cd ../front-end
2.  Install the front-end dependencies: npm install
3.  Create a .env file in the front-end directory and configure the following environment variables: REACT_APP_API_URL=http://localhost:2525
4.  Make sure to include in your .gitignore file:   node_modules
.env
.DS_Store
5.  Start the front-end development server: npm start
This will start the front-end server at http://localhost:3000.
6.  Access the app in your web browser: Open your preferred web browser and visit http://localhost:3000 to see the LuxuryRides App in action.

# **Database**

To connect to the database and view the tables:

1.  Open the PostgreSQL command line interface by running the following command:
        1.  psql -U postgres -f db/schema.sql<br>
        2.  psql -U postgres -f db/seed.sql   or to run run both 'npm run db:setup'
                db:setup: This script is used to set up the initial state of the database. It executes SQL scripts that define the database schema and potentially populate initial data. The purpose of the db:setup script is to create the necessary tables and configure the database to a predefined state. This script is typically run once during the initial setup or when you want to reset the database to its initial state.
        3.  To start the db, 'npm run db:start' & to shutdown the db, 'npm run db:shutdown'
                db:start: This script is used to start the database server. It ensures that the database server is up and running, allowing your application to establish a connection and interact with the database.
                The db:stop script is used to stop the running instance of the database server. It gracefully shuts down the database server, terminating any active connections and releasing system resources. The purpose of the db:stop script is to ensure a clean and controlled shutdown of the database server.

                Typically, you would use the `db:stop` script when you want to stop the database server after you have finished using it or when you need to perform maintenance tasks. It ensures that the database server is properly shut down, preventing any potential data corruption or inconsistencies.

        4.   To summarize:

                - `db:start` starts the database server, making it available for your application to connect.
                - `db:setup` initializes the database with the necessary structure and initial data.
                - `db:stop` gracefully shuts down the running instance of the database server.

These scripts work together to manage the lifecycle of the database server, from starting it up to setting it up and finally stopping it when it's no longer needed.


2.  Once logged in, you can view the list of tables by running the following command: \dt
3.  To view the contents of a specific table, use the following command:    SELECT * FROM poduct;

That's it! You should now have the City Whisperer App installed and running on your local machine. Enjoy exploring the world of AI self guided walking generated tours -->
