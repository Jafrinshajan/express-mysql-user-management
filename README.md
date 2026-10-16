# Express MySQL User Management System

A user management application built using Node.js, Express.js, EJS, and MySQL.

## Features

- View all users
- Add new users
- Edit usernames with password verification
- Delete users with confirmation
- Dynamic page rendering using EJS
- MySQL database integration

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS
- **Database:** MySQL
- **Other Tools:** Git, GitHub, method-override

## Project Structure

```text
project/
├── views/
├── index.js
├── schema.sql
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Setup Instructions

1. Clone this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_NAME=delta_app
   DB_PASSWORD=your_mysql_password
   ```

4. Create the database and table using `schema.sql`.
5. Start the application:

   ```bash
   node index.js
   ```

6. Open `http://localhost:8080` in your browser, or use the port configured in your application.

## Learning Outcomes

This project helped me practice Express routing, CRUD operations, EJS templating, MySQL queries, and environment-based configuration.

## Future Improvements

- Password hashing
- User authentication
- Input validation and error handling
- Improved UI and responsive design

---

**Note:** Never commit your `.env` file or expose database credentials publicly.
