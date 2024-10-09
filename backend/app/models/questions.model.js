import sqlite3 from "sqlite3";

sqlite3.verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    db.run(
      `CREATE TABLE questions (
        question_id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        asked_by INTEGER,
        event_id INTEGER,
        votes INTEGER,
        FOREIGN KEY (asked_by) REFERENCES users(user_id)
        FOREIGN KEY (event_id) REFERENCES events(event_id)
    )`,
      err => {
        if (err) {
          console.log("Questions table already created");
        } else {
          console.log("Questions table created");
        }
      }
    );
  }
});

export default db;
