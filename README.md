# Pokemon Game Review Platform

This is the backend repository for Pokemon Game Review Platform.

- [Pokemon Game Review Platform](#pokemon-game-review-platform)
  - [feature](#feature)
  - [Description](#description)
  - [Technology](#technology)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure Environment Variables](#configure-environment-variables)
    - [Configure Knex.js](#configure-knexjs)
    - [Set Up the Database](#set-up-the-database)
  - [Endpoints](#endpoints)

## feature

- **Game List**: Users can add games to their personal library as favorite list.
- **Game Reviews**: Users can add reviews.
- **Favorite Games**: Users can mark certain games as favorites.
- **User Authentication**: Use a basic username/password login, keeping it simple with an option to register or log in. Also protected routes in the backend using Express.js to secure user data.
- **Responsive UI with React**: Simple, clean UI allowing users to quickly add, review. Use TypeScript in React to type the components and enhance reliability.

## Description

The backend service provides an API that the frontend uses to retrieve and store data. It includes authentication, data validation.

## Technology

- **Express.js**: Framework for server and middleware.
- **Knex.js**: SQL query builder.
- **bcrypt**: Library for securely hashing and salting passwords to protect user credentials.
- **crypto**: Module for cryptographic operations like generating secure keys for session management and data encryption.

## Installation

This backend server is built with Express, Knex.js, and other libraries to handle user authentication,and interactions with the frontend. Follow the steps below to install and configure the server.

### Prerequisites

Ensure that you have the following installed:

- Node.js
- npm
- Database (PostgreSQL)

### Setup

Follow these steps to set up and run backend server:

### Clone the Repository

Clone this repository in your local machine:

### Install Dependencies

Install the required dependencies.

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project directory and add the following variables.

```env
PORT=8080
DB_NAME=solo_project
DB_URL=postgresql://yourfile:postgres@localhost/solo_project
FRONTEND_URL=http://localhost:5173
```

### Configure Knex.js

The backend uses Knex.js to interact with the database. Make sure knex.file is set up correctly.

### Set Up the Database

- Run Migrations
- Run Seeds
- Start the Server

---

## Endpoints

- POST/ signup : Sign the user up.
- POST/ login : Log the user in.
- POST/ favorites : Mark a Game as Favorite.
- POST/ reviews : Add the user's review.
- GET/ games : Show all of the games for user
- GET/ favorites/:user_id : Get all favorite games for user.
- GET/ /reviews/:game_id : Fetch All Reviews for a Particular Game
- DELETE/ favorites/:id : Remove a Game from Favorites
