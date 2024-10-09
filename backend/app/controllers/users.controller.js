import db from "../models/users.model.js";
// get users
export const getUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM users";

    db.all(sql, [], (error, rows) => {
      if (error) {
        return console.log(error.message);
      }
      res.json(rows);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error: ", error });
  }
};

// signup
export const signup = (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    db.run(sql, [first_name, last_name, email, password], function (error) {
      if (error) {
        return res.status(500).json({ message: "Error creating user" });
      } else {
        res.status(201).json({ user_id: this.lastID });
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login
export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email or password" });
    }

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.get(sql, [email, password], async (error, user) => {
      if (error) {
        console.log(error);
      } else if (!user) {
        return res.status(404).json({ message: "This user does not exist" });
      } else {
        res.status(200).json({ user_id: user.user_id });
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// logout
export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
