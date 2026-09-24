# Rep & Repeat

Rep & Repeat is a full-stack workout tracking application designed to help users plan workouts, record exercises, track how they feel before and after training, and review their workout history. The application combines a responsive React front end with a Java/Spring Boot REST API and MySQL database. Users can create, view, update, and delete workouts while organizing individual exercises within each workout. Rep & Repeat also includes an interactive music feature to help users choose a workout vibe and stay motivated during a session.

## Technologies Used

### Front End
- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Fetch API

### Back End
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Other Tools
- Git
- GitHub
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Canva
- Trello
- Railway

## Running the Project Locally

### Requirements

Before running Rep & Repeat, install:

- Java 21
- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

Clone the GitHub repository and navigate into the project directory.

### 2. Configure the Database

Create a MySQL database named:

`rep_and_repeat`

Configure the database credentials required by `application.properties`.

The application uses the following environment variables for the database connection:

`DB_HOST`

`DB_PORT`

`DB_NAME`

`DB_USERNAME`

`DB_PASSWORD`

### 3. Start the Spring Boot Back End

From the root project directory, run:

`./mvnw spring-boot:run`

The API runs locally on port `8080`.

### 4. Start the React Front End

Open another terminal and run:

`cd frontend`

`npm install`

`npm run dev`

Open the local Vite URL shown in the terminal in your browser.

## Application Features

- Home dashboard
- Workout creation
- Exercise tracking
- Mood Before and Mood After tracking
- Workout history
- Edit existing workouts
- Delete workouts
- Responsive navigation
- Exercise GIF demonstrations
- Workout music and preview functionality
- RESTful CRUD communication between React and Spring Boot

## Wireframes

Rep & Repeat was planned using wireframes created in Canva.

https://canva.link/qngcxlvvjj27k7w

## Entity Relationship Diagram

The database design includes Workout and Exercise entities with a one-to-many relationship. A Workout can contain multiple Exercises.

https://dbdiagram.io/d/Rep-and-Repeat-ERD-6a8b1bf0fd15a881e5dd0836

## Future Features / Unresolved Items

Future improvements for Rep & Repeat could include expanded exercise libraries, additional workout analytics, personalized workout recommendations, user profile customization, and additional music features.

The current version includes user registration, login, logout, workout tracking, CRUD functionality, workout history, mood tracking, and music previews. The application is currently designed to run locally for this project submission.
