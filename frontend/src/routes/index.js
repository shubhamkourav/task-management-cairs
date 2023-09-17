import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  TasksForm,
  TasksList,
  UserForm,
  UsersList,
} from "../screens";
import { Layout, PageNotFound } from "../components";

// Define the routes for your application
const routes = [
  {
    path: "/",
    element: <Layout />, // Use the Layout component as the layout for this route
    children: [
      {
        index: true, // This route matches the root URL ("/") and is marked as the index route
        element: <Home />, // Use the Home component for this route
      },
      {
        path: '/users', // Define a nested route for "/users"
        children: [
          {
            index: true, // Index route for "/users"
            element: <UsersList />, // Use the UsersList component for the user list page
          },
          {
            path: "/users/create", // Route for creating a new user
            element: <UserForm />, // Use the UserForm component for the user creation page
          },
          {
            path: "/users/edit/:id", // Route for editing a user, ":id" is a placeholder for the user ID
            element: <UserForm />, // Use the UserForm component for user editing
          },
        ],
      },
      {
        path: '/tasks', // Define a nested route for "/tasks"
        children: [
          {
            index: true, // Index route for "/tasks"
            element: <TasksList />, // Use the TasksList component for the task list page
          },
          {
            path: "/tasks/create", // Route for creating a new task
            element: <TasksForm />, // Use the TasksForm component for the task creation page
          },
          {
            path: "/tasks/edit/:id", // Route for editing a task, ":id" is a placeholder for the task ID
            element: <TasksForm />, // Use the TasksForm component for task editing
          },
        ],
      },
    ],
  },
  {
    path: '*', // Catch-all route for any other URL
    element: <PageNotFound />, // Use the PageNotFound component for 404 pages
  },
];

// Create the router with the defined routes
const Router = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
