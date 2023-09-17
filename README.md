# Task Management System

This is a full-stack web application that allows users to manage tasks. Users can create, read, update, and delete tasks, and each task is associated with the user who created it. The project is built using Node.js for the backend, React.js for the frontend, and MongoDB for the database. Material-UI is used for styling the frontend.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Validation](#validation)
- [Frontend](#frontend)
  - [Styling](#styling)
- [Usage](#usage)

## Getting Started

### Prerequisites

Before running the project, you should have the following software installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shubhamkourav/task-management-cairs.git
   
   cd task-management-cairs

   cd backend
   npm install

   cd frontend  
   npm install
   ```

   Create a .env file in the backend directory and set your MongoDB connection URI:
   
   > MONGODB_URI=<mongodb_url>
   
   Start backend and frontend applications

   ```
   cd backend
   npm start

   cd frontend
   npm start
   
   ```

## Backend

The backend of the application is built using Node.js and Express. It handles API requests, interacts with the MongoDB database using Mongoose, and enforces data validation.

### API Endpoints
  - POST /api/users: Create a new user.
  - GET /api/users: Retrieve all users.
  - GET /api/users/:id: Retrieve a specific user.
  - PUT /api/users/:id: Update a user.
  - DELETE /api/users/:id: Delete a user.
  - POST /api/tasks: Create a new task.
  - GET /api/tasks: Retrieve all tasks.
  - GET /api/tasks/:id: Retrieve a specific task.
  - PUT /api/tasks/:id: Update a task.
  - DELETE /api/tasks/:id: Delete a task.

### Validation

User email addresses are validated for uniqueness, and input data is validated to ensure data integrity.

## Frontend

The frontend of the application is built using React.js and styled using Material-UI. It provides a user-friendly interface for managing tasks.

### Styling

Material-UI is used for styling the frontend, providing a clean and responsive design.

## Usage
1. Create, read, update, and delete tasks and users.
2. View a list of all users and their tasks.
