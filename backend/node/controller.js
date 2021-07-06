const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("../db.db");

const getUsers = (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (rows.length > 0) return res.send(rows);
  });
};

const getUserById = (req, res) => {
  userId = req.params.id;
  db.get("SELECT * FROM Users WHERE id=?", [userId], (err, row) => {
    if (!err) return res.send(row);
    console.error(err);
  });
};

const createUser = (req, res) => {
  let missingProps = [];

  // Check if body has all user properties
  ["firstName", "lastName", "age", "isBamaFan"].forEach((prop) => {
    if (!req.body.hasOwnProperty(prop)) missingProps.push(prop);
  });

  // If body is missing any user properties, return error
  if (missingProps.length !== 0)
    res
      .status(404)
      .json({ message: `Missing required fields: ${missingProps.join(", ")}` });

  const { firstName, lastName, age, isBamaFan } = req.body;
  try {
    db.run(
      "INSERT INTO Users (firstName, lastName, age, isBamaFan) VALUES (?,?,?,?)",
      [firstName, lastName, age, isBamaFan]
    );
  } catch (err) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

module.exports = {
  getUserById,
  getUsers,
  createUser,
};
