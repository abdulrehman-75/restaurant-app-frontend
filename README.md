Restaurant App — Full Stack CRUD Application
This is a full-stack web application that demonstrates CRUD operations using a modern tech stack. The project includes a React frontend, an ASP.NET Core Web API backend, and a PostgreSQL database hosted on Railway.

Live Demo
Frontend:
https://restaurant-app-frontend-mu.vercel.app/ (Hosted on Vercel)

Backend Base URL:
restaurant-app-backend20250701082739-e8febqb5epdufrgx.canadacentral-01.azurewebsites.net/api/ (Hosted on Azure)

Tech Stack
Frontend:

React (Vite)

Material UI

Backend:

ASP.NET Core Web API

Entity Framework Core

PostgreSQL (Hosted on Railway)

API Endpoints
Base URL:
https://restaurant-app-backend20250701082739-e8febqb5epdufrgx.canadacentral-01.azurewebsites.net/api/

Endpoints:

/order – Create, retrieve, and manage orders

/customer – View predefined customer list

/foodItem – View predefined food items

Functionality
Displays predefined lists of:

Customers

Food Items

Create and manage:

Orders, which include:

OrderMaster (main order info)

OrderDetails (line items referencing Food Items via foreign key)

Orders are shown in a dashboard for easy tracking

Full CRUD functionality for orders and related items

Database
Hosted on Railway

PostgreSQL

Includes seed data for Customers and Food Items

Project Highlights
Clean frontend-backend separation

Real-time CRUD operations

Foreign key relationships for order details

Fully deployed and accessible online

