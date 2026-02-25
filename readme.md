# CICADO - Simple Web Counter

This is a simple web application that features a button and a counter. The counter records how many times the button has been pressed by all users.

## Project Structure

The project is a monorepo with two main parts:

- `/client`: A React frontend application.
- `/server`: A Node.js/Express backend server.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [PostgreSQL](https://www.postgresql.org/)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd cicado
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

## Configuration

The backend requires a connection to a PostgreSQL database.

1. **Create a `.env` file in the `/server` directory.**
2. **Add the following environment variables to the `.env` file:**
   ```
   DB_HOST=<your-db-host>
   DB_PORT=<your-db-port>
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_DATABASE=<your-db-name>
   ```

## Running the Application

1. **Start the backend server:**
   Navigate to the `/server` directory and run:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3001`.

2. **Start the frontend application:**
   In a separate terminal, navigate to the `/client` directory and run:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`.

## Usage

- Open your web browser and go to `http://localhost:3000`.
- You will see a counter and a button.
- Click the button to increment the counter. The value is shared across all users.
