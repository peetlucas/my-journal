# Personal Journaling App

This project is a Personal Journaling App built with React Native (Expo) for the frontend and Node.js with Express for the backend. The backend uses PostgreSQL as the database (Neon database hosted). The backend runs on port 5000.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Run](#setup-and-run)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- User authentication (Sign Up, Login, Logout)
- Create, Read, Update, Delete (CRUD) journal entries
- Categorization of journal entries
- Settings for user preferences
- Summary view of journal entries
- Secure storage using `expo-secure-store`

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL database (Neon Database)

## Setup and Run

### Backend Setup

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Configure the database:**

   - Create a `.env` file in the `backend` directory with the following content:
     ```env
     DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
     JWT_SECRET=your_jwt_secret
     ```

5. **Run database migrations (if applicable):**

   ```sh
   npx prisma migrate dev
   ```

6. **Start the backend server:**

   ```sh
   npm start
   ```

   The backend server should now be running on [http://localhost:5000](http://localhost:5000).

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `config.js` file in the `frontend` directory with the following content:**

   ```javascript
   export default {
     API_URL: "http://localhost:5000",
   };
   ```

4. **Start the Expo server:**

   ```sh
   expo start
   ```

   The Expo server should now be running. You can use an Android/iOS simulator or the Expo Go app on your physical device to run the app.

## Project Structure

```markdown
personal-journaling-app/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── entities/
│ │ ├── routes/
│ │ ├── app.js
│ │ └── server.js
│ ├
│ │  
│ ├── .env
│ ├── package.json
│ └── README.md
├── frontend/
│ ├── assets/
│ ├── components/
│ ├── navigation/
│ ├── screens/
│ ├── App.tsx
│ ├── config.js
│ ├── package.json
│ └── README.md
└── README.md
```
