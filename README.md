# Chat App

This is a simple chat application built with React, TypeScript, and Express.

## Table of Contents

- [Features](#features)
- [Core Tools](#core-tools)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Usage](#usage)

## Features

- Real-time messaging
- User authentication with JWT
- User profile management
- File upload with Cloudinary
- Emoji support with Emoji Picker React
- Responsive design with Tailwind CSS

## Core Tools

The following core tools were used in the development of this application:

- Vite (bundler and development server)
- TypeScript (type checking and compilation)
- React (UI library)
- Zustand (Global state management)
- Express (server framework)
- Socket.IO (real-time communication library)
- Cloudinary (file upload and management)
- Emoji Picker React (emoji picker library)
- Tailwind CSS (CSS framework)

## Folder Structure

The project is organized into the following folders:

- `frontend`: project React frontend app
  - `components`: reusable React components
  - `pages`: project pages
  - `store`: global state management with Zustand
  - `lib`: utility functions and libraries
  - `public`: static assets
  - `src`: application source code
- `backend`: Express backend server
  - `controllers`: API controllers
  - `lib`: utility functions and libraries
  - `models`: MongoDB database models
  - `routes`: API routes
  - `src`: app source code
- `docker-compose`: Docker YAML configurations for MongoDB database

## Setup

1. Clone the repository
2. Run `npm install` in both the frontend and backend folders
3. Create a file named `.env` in the backend folder with the following variables:
   - `MONGO_URI`: your MongoDB connection string
   - `JWT_SECRET`: a secret string for generating JWT tokens
   - `CLOUDINARY_CLOUD_NAME`: your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: your Cloudinary API secret
4. Run `npm run dev` in both the frontend and backend folders
5. Run `docker-compose up -d` in the root folder to quickly start a MongoDB database using Docker

## Usage

1. Open two separate terminals
2. In one terminal, navigate to the frontend folder and run

```bash
# Run application frontend in dev mode
npm run start
```

3. In the other terminal, navigate to the backend folder and run

```bash
#   run the application locally in dev mode
  npm run start
```

5. Register a new user and log in
6. Start chatting with other users

## Note

This is a basic chat application and it is not intended for production use. It was built for learning purposes and to demonstrate the use of React, TypeScript, and Express with REST and websocket.
