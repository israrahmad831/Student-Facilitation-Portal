const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change this to your MySQL user
  password: "2131", // Change this to your MySQL password
  database: "querydb", // Change this to your database name
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error: ", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/submit-query", (req, res) => {
  const { department, description, queryType, contactNo, priority, user_id } =
    req.body;

  const query =
    "INSERT INTO pending_queries (department, description, queryType, contactNo, priority, user_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [department, description, queryType, contactNo, priority, user_id],
    (err, result) => {
      if (err) {
        console.error("Failed to insert query: ", err);
        res.status(500).send("Error saving the query");
        return;
      }
      res.send("Query saved successfully");
    }
  );
});
// Fetch personalized queries for the authenticated user
app.post("/fetchDataPending", (req, res) => {
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Construct the SQL query to fetch personalized queries
  const query = "SELECT * FROM pending_queries WHERE user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Failed to fetch personalized queries: ", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch personalized queries" });
    }
    res.json(result);
  });
});
// Fetch data from the mysql database
app.get("/fetchDataProcessing", (req, res) => {
  const query = "SELECT * FROM processing_queries";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Failed to fetch data: ", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.send(result);
  });
});
// Fetch data from the mysql database
app.get("/fetchDataCompleted", (req, res) => {
  const query = "SELECT * FROM completed_queries";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Failed to fetch data: ", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.send(result);
  });
});

app.post("/register", (req, res) => {
  const { username, password, email, usertype } = req.body;

  // Validate inputs
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string" ||
    typeof usertype !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const checkUserSql = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkUserSql, [username, email], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const sql =
        "INSERT INTO users (username, password, email, usertype) VALUES (?, ?, ?, ?)";
      db.query(sql, [username, hash, email, usertype], (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "User registered" });
      });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "No user found" });
    }

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (isMatch) {
        const user = {
          id: results[0].id,
          username: results[0].username,
          email: results[0].email,
          usertype: results[0].usertype,
          // Add any other columns you want to send
        };
        const token = jwt.sign({ id: results[0].id }, "your_jwt_secret", {
          expiresIn: "1h",
        });
        res.json({ token, user });
      } else {
        res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, "your_jwt_secret", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "This is protected",
    authData: req.authData,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
