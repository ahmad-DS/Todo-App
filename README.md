# Todo App

A full-stack todo management application built to help users organize daily tasks with a simple and clean interface. The app allows users to sign up, log in, and manage todos securely with protected routes and persistent storage.

## Project Description

Todo App is a lightweight productivity tool for personal task tracking. Its core objective is to make task management simple and efficient through a smooth experience where users can:

- create new todos
- mark tasks as complete or incomplete
- delete unwanted tasks
- keep their data linked to their account

## Tech Stack Used

### Frontend
- React.js
- React Router DOM
- Chakra UI
- React Icons
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt, cookie-parser, cors, dotenv

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ahmad-DS/Todo-App.git
cd Todo-App
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with:
```env
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/todo-app
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm start
```

Open the app in your browser at:
```text
http://localhost:3000
```

> The frontend is configured to communicate with the backend at `http://localhost:8080` using the proxy setting.

## Key Features & Visuals

- Secure signup and login flow
- Protected todo routes for authenticated users
- Add, toggle, and delete todo items
- Responsive and minimal UI with Chakra components
- MongoDB-backed persistence for long-term task storage
- Monolith Arch: Frontend pages served from express server

### Screenshots

![Todo App Screenshot](frontend/public/app_screenshots/Screenshot%202026-07-17%20154000.png)
