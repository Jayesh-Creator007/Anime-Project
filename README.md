# Anime Tracker - Full Stack MERN Application

A modern, responsive anime tracking application with a premium black and yellow theme.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router, React Toastify
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Nodemailer, JWT
- **Architecture**: MVC Pattern

## Prerequisites
- Node.js installed
- MongoDB installed and running locally (or update MONGO_URI in .env)

## Getting Started

### 1. Backend Setup
1. Open a terminal in the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` file with your credentials:
   - `MONGO_URI`: Your MongoDB connection string.
   - `EMAIL_USER`: Your Gmail address.
   - `EMAIL_PASS`: Your Gmail App Password (for Nodemailer).
4. Start the backend server:
   ```bash
   node index.js
   ```

### 2. Frontend Setup
1. Open a terminal in the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Admin Access
To access the admin panel:
1. Signup as a user.
2. Manually change your `role` to `'admin'` in the MongoDB database for your user record.
3. Once logged in as admin, the dashboard and management tools will appear in the navigation.

## Features
- **Home Page**: Hero section with anime theme and introduction.
- **Anime List**: Full list of anime with Like, Watch (Google Search), and Talk (Instagram DM) features.
- **About Page**: History and details about anime.
- **Get in Touch**: Instagram profile integration.
- **Authentication**: OTP-based verification via email.
- **Admin Panel**: Statistics dashboard, anime data management (CRUD), and add new anime form.
