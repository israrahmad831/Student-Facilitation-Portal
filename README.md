# Facilitation Portal

A query submission portal where users can login and submit their queries, which will be stored in a MySQL database. The frontend of the project is implemented using HTML, CSS, and JavaScript, while the backend is built with Node.js and Express.

## Prerequisites

- Node.js: The runtime environment for executing JavaScript code server-side.
- npm (Node Package Manager): Comes with Node.js and is used for package management.
- MySQL: The database used for storing user queries.
- Git: For cloning the repository.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate into the Backend directory:
   ```bash
   cd "Facilitation Portal/Backend"
   ```
3. Install the dependencies using npm:
   ```bash
   npm install
   ```
4. Create a MySQL database:
   - Open MySQL command line tool and login.
   - Create a new database using the command:
     ```sql
     CREATE DATABASE querydb;
     USE querydb;
     ```
   - Create tables in the database:
     ```sql
     CREATE TABLE pending_queries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      department VARCHAR(50),
      description TEXT,
      queryType VARCHAR(50),
      contactNo VARCHAR(50),
      priority VARCHAR(20),
      user_id INT,
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
     );
     CREATE TABLE processing_queries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      department VARCHAR(50),
      description TEXT,
      queryType VARCHAR(50),
      contactNo VARCHAR(50),
      priority VARCHAR(20)
     );
     CREATE TABLE completed_queries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      department VARCHAR(50),
      description TEXT,
      queryType VARCHAR(50),
      contactNo VARCHAR(50),
      priority VARCHAR(20)
     );
     CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      usertype VARCHAR(50) NOT NULL DEFAULT 'user',
      email VARCHAR(255) NOT NULL
     );
     ```
5. Update the database configuration in `Backend\server.js`:
   ```javascript
   const db = mysql.createConnection({
     host: "localhost",
     user: "root", // Change this to your MySQL user
     password: "2131", // Change this to your MySQL password
     database: "querydb", // Change this to your database name
   });
   ```

## Usage

1. Ensure that all dependencies are installed.
2. Start MySql database.
3. Run the following command in `Backend` directory to start the project:

```bash
npm start
```

Replace `npm` with the appropriate package manager if you're not using npm.

4. Open `login.html`.

## Contributing

- **Fork It:** Hit that fork button up top to make a copy of this project on your GitHub.
- **Clone It:** Fire up your terminal and clone the project to your local machine. Just hit up `git clone [YOUR_FORK_URL]`.
- **Branch It:** Don't mess with the main branch, Create a new branch for your changes. Keep it descriptive, like `feat/new-feature` or `fix/bug-fix`.
- **Hack It:** Time to get your hands dirty! Make those awesome changes, add those cool features, or fix those pesky bugs.
- **Test It:** Before you hit us up with a pull request, make sure everything's running smooth. Test your changes locally to avoid any surprises.
- **Commit It:** Once you're happy with your changes, commit them using clear and concise messages. No need to write a novel, but give us enough to know what's up.
- **Push It:** Push your changes to your forked repo with `git push origin [YOUR_BRANCH_NAME]`.
- **PR It:** Finally, head back to this repo on GitHub and hit us up with a pull request. We'll take a look and get back to you ASAP.

That's it, fam! You're now part of the crew.

## License

This project is open source and available under the [MIT License](LICENSE).
