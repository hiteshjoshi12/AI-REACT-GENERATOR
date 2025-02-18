# AI-Powered Code Generating Platform

## Overview

This AI-powered code-generating platform is designed to assist developers and non-developers by providing instant code generation for various technologies. Initially focused on React component generation, the platform has expanded to support multiple micro-apps, including AI email generation, AI copywriting, interview question generation, and more. It features AI-driven responses for prompts, a dark/light mode switch, preview options for specific techs (HTML, JavaScript, React), and full responsiveness across devices. The platform also includes user authentication for a personalized experience.

---

## Features

- **AI-Powered Code Generation**: Instant code generation for multiple technologies including React, JavaScript, HTML, and CSS.
- **Dark Mode/Light Mode Switch**: Toggle between dark and light themes for a personalized user experience.
- **Preview Options**: Preview generated code for certain technologies (HTML, JavaScript, React).
- **Micro-Apps**: Includes separate micro-apps such as:
  - React Component Generator
  - AI Email Generation
  - AI Copywriting Assistance
  - Interview Question Generator
- **Full Responsiveness**: Optimized for mobile and desktop devices.
- **User Authentication**: Allows users to log in, sign up, and personalize their experience.
- **Multi-Language Support**: Plan to include support for multiple programming languages in the future.

---

## Tech Stack

### Frontend
- **React**: For building dynamic and interactive UI components.
- **HTML/CSS**: For structuring and styling the platform.
- **JavaScript**: For client-side logic and interactivity.
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js used to create the backend.
- **MongoDB**: NoSQL database used for storing user data and platform settings.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: Server-side JavaScript framework for handling API requests and responses.
- **Express.js**: Web framework used for routing and middleware in the backend.
- **MongoDB**: Database for storing data related to users, settings, and platform content.
- **JWT Authentication**: JSON Web Token used for secure user authentication.
- **AI Models (GPT)**: For generating code, emails, copywriting content, and more.

---

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (local or cloud-based)

### Frontend Setup
1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-code-generator.git

   ```
2. Navigate to the frontend directory:
   ```bash
   cd ai-code-generator/frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4.Run the frontend development server:
  ```bash
   npm start
  ```
### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ai-code-generator/backend

2. Install the dependencies:
   ```bash
   npm install
    ```
3. Set up MongoDB (use either a local MongoDB instance or a cloud database like MongoDB Atlas).
4. Create a .env file in the backend directory and add your MongoDB URI and other environment variables:
   ```bash
   MONGO_URI=your-mongodb-uri JWT_SECRET=your-jwt-secret
   ```
5. Run the backend server:
   ```bash
   npm start
   ```

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Use the platform to generate code for various technologies by selecting the appropriate micro-app.
3. You can toggle between dark and light modes to suit your preference.
4. Use the login/signup functionality to save your data and personalize your experience.

---

## Future Enhancements

- **Multi-Language Support**: Extend the platform to support additional programming languages.
- **Collaborative Features**: Allow multiple users to work on a project or share generated code.
- **More Micro-Apps**: Add additional features such as code refactoring, debugging assistance, etc.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

---











