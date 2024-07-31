# QuickHelp

QuickHelp is designed to transform the hiring process in the home services sector, bridging the gap between skilled workers and households in need of their services. The app provides a user-friendly platform for households to easily find and hire skilled workers.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)

## Features

- Profile Creation
- Employees Listing
- Book Employee
- Communication Tools
- Verification and Security

## Tech Stack

**Front-End:**

- JavaScript
- React.js
- Tailwind CSS

**Back-End:**

- Node.js
- Express
- MongoDB
- JWT (JsonWebToken)
- Express-Validator

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- MongoDB (running locally or a MongoDB Atlas account)
- Git

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/quickhelp.git
   cd quickhelp
2. **Install dependencies:**

For the frontend:

```bash
cd QH
npm install
```
**For the backend:**

```bash
cd QH_Backend
npm install
```
3. **Set up environment variables:**

Create a .env file in the QH_Backend directory and add the following:

env
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. **Running the Project**
Start the back-end server:

```bash
cd QH_Backend
npm run dev
```
Start the front-end development server:

```bash
cd QH
npm run dev
```
Open your browser and navigate to http://localhost:5173

