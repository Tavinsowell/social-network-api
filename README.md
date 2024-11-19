# Social Network API

## Description

This project is a Social Network API built from scratch using Express.js for routing, a MongoDB database, and the Mongoose ODM. Users can share their thoughts, react to friends' thoughts, and create a friend list. The API also uses a JavaScript date library to format timestamps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Seed Data](#seed-data)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/social-network-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd social-network-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Ensure MongoDB is running on your local machine or update the connection string in `src/config/connection.ts`.

## Usage

1. Build the project:
    ```sh
    npm run build
    ```
2. Seed the database:
    ```sh
    npm run seed
    ```
3. Start the server:
    ```sh
    npm start
    ```
    The server will be running on [http://localhost:3001](http://localhost:3001).

## API Routes

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get a single user by its _id and populated thought and friend data
- `POST /api/users` - Create a new user
- `PUT /api/users/:userId` - Update a user by its _id
- `DELETE /api/users/:userId` - Remove a user by its _id
- `POST /api/users/:userId/friends/:friendId` - Add a new friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Thoughts

- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a single thought by its _id
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:thoughtId` - Update a thought by its _id
- `DELETE /api/thoughts/:thoughtId` - Remove a thought by its _id
- `POST /api/thoughts/:thoughtId/reactions` - Create a reaction stored in a single thought's reactions array field
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction by the reaction's reactionId value

## Models

### User

- `username` (String, Unique, Required, Trimmed)
- `email` (String, Required, Unique, Must match a valid email address)
- `thoughts` (Array of _id values referencing the Thought model)
- `friends` (Array of _id values referencing the User model)
- Virtual: `friendCount` - Retrieves the length of the user's friends array field on query

### Thought

- `thoughtText` (String, Required, Must be between 1 and 280 characters)
- `createdAt` (Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query)
- `username` (String, Required)
- `reactions` (Array of nested documents created with the reactionSchema)
- Virtual: `reactionCount` - Retrieves the length of the thought's reactions array field on query

### Reaction (Schema Only)

- `reactionId` (Use Mongoose's ObjectId data type, Default value is set to a new ObjectId)
- `reactionBody` (String, Required, 280 character maximum)
- `username` (String, Required)
- `createdAt` (Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query)

## Seed Data

To seed the database with initial data, run:
```sh
npm run seed
```

## Walkthrough Video

[Link to walkthrough video](#)
## Contributors
Name: Tavin Sowell GitHub: [github.com/Tavinsowell](https://github.com/Tavinsowell)
