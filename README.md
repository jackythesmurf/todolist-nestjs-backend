Fullstack Todolist App
- [Accessing the application](#accessing-the-application)
- [Overview](#overview)
- [Tech stack used](#tech-stack-used)
  - [AWS Cloud Architecture](#aws-cloud-architecture)
  - [ReactJS with Typescript](#reactjs-with-typescript)
  - [NestJS](#nestjs)
  - [Database](#database)
- [MVP Requirements](#mvp-requirements)
- [How to run the app locally](#how-to-run-the-app-locally)

## NestJS Backend & ReactJS Frontend Tests

| Project     | Build Status                                                                                                                             | Code Coverage                                                                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NestJS**  | ![Workflow Status](https://github.com/jackythesmurf/todolist-nestjs-backend/actions/workflows/npm-publish-github-packages.yml/badge.svg) | [![codecov](https://codecov.io/github/jackythesmurf/todolist-nestjs-backend/graph/badge.svg?token=7R7SD0V2L0)](https://codecov.io/github/jackythesmurf/todolist-nestjs-backend)     |
| **ReactJS** | ![Workflow Status](https://github.com/jackythesmurf/todolist-reactjs-frontend/actions/workflows/webpack.yml/badge.svg)                   | [![codecov](https://codecov.io/github/jackythesmurf/todolist-reactjs-frontend/graph/badge.svg?token=7R7SD0V2L0)](https://codecov.io/github/jackythesmurf/todolist-reactjs-frontend) |

# Accessing the application

**The app is fully hosted on AWS Cloud and can be accessed by clicking this: [link](http://todolist-tech-test-7day.s3-website-ap-southeast-2.amazonaws.com/)** !

To see the source code, click on the github links for each repo:

-   [NestJS](https://github.com/jackythesmurf/todolist-nestjs-backend)
-   [ReactJS](https://github.com/jackythesmurf/todolist-reactjs-frontend)

# Overview

This project is a to-do list application following the RESTful API architecture. The frontend is written in React.js with Typescript and the server is written in Nest.js. The whole application is deployed on AWS cloud, and it is globally accessible. I have set up CI test automation and code coverage to ensure quality code gets pushed.

# Tech stack used

## AWS Cloud Architecture

![Alt text](<screenshots/Screen Shot 2024-02-05 at 12.08.55 pm.png>)

-   **S3** - Ensures fast, cost-efficient and globally accessible distribution of my website
-   **EC2** - A server hosting the NestJS application to receive incoming API calls from clients
-   **RDS** - A relational database for persistent and effective storage

## ReactJS with Typescript

-   **ReactJS** - A JavaScript library for building dynamic user interfaces, ensuring efficient rendering and a component-based architecture.
-   **Typescript** - Adds static types, enhancing code quality and maintainability for large-scale applications.
-   **React Query** - A library for fetching, caching, and updating asynchronous data in React applications, optimising state management.
-   **React Hook Form** - Simplifies form handling in React, emphasising performance and minimal re-renders.
-   **React Axios** - For making HTTP requests, offering a wide range of configurable options for API calls.
- **Tailwindcss** - CSS framework for rapid UI development, enabling custom, responsive design without writing custom styles, by providing a vast set of predefined classes.
## NestJS

-   **Restful API architecture** - Implements a RESTful API structure with NestJS, facilitating Create, Read, Update, Delete (CRUD) operations for scalable web services.
-   **TypeORM** - An ORM (Object-Relational Mapping) library facilitating data manipulation and interaction with a database.

## Database

-   **MySQL**: A relation database is used for persistent storage, efficient queries and scalable architecture.

# MVP Requirements

- **Create new records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.16.18 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - Add Button creates and sends a /post request to the server and creates a new task. The new task is automatically updated which is handled by React Query for optimizing caching without fetching from the server again.

- **Read records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.16.57 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - Upon entering the application, the web sends a /get request to fetch all tasks and data.

- **Search for Records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.17.33 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - The search bar offers live and automatic feedback to the user, there is no need to press enter. The results are displayed as the user types, and to return all tasks simply remove all user input.

- **Update Records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.17.48 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - You can update the completion status of your application, the web calls a /patch request with the newly changed status reflected in the database.

- **Delete Records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.18.01 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - Deletes a task from DB, and again the changes are reflected live without calling another read to the database, this efficient caching is done through React Query.

- **Sort Records**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.18.12 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - Tasks are sorted by the soonest start/end date. This is done through helper functions which manipulate the array order.

- **Form Validation**
    <img src="screenshots/Screen Shot 2024-02-05 at 12.18.26 pm.png" alt="Alt text" style="width: 100%; max-width: 400px; height: auto;">
    - There is error checking to ensure that user inputs match the desired data. Any invalid inputs are alerted to the user. This is done through the React Hook Forms Library.

# How to run the app locally

1) `git clone` the local repos on your local machine
2) Go inside  both the NestJS and ReactJS folders and run `npm install`
3) In the NestJS project create a `.env` file for database configuration. Copy the following into the `.env` file

```
DB_HOST=tech-test-7day-mysql.cfmi84c626q5.ap-southeast-2.rds.amazonaws.com
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345678
DB_NAME=todolist
```
4) In the ReactJS project go to `src/services/apiConfig.ts`
5) Replace the API_URL with `http://127.0.0.1:3000/task`
6) In the ReactJS project type npm run dev
7) In the NestJS project type npm run start

The Application should start, if it doesn't please let me know and I can help you out !