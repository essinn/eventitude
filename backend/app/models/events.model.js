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
      `CREATE TABLE events (
                event_id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                location TEXT,
                start_date INTEGER,
                close_registration INTEGER,
                max_attendees INTEGER,
                creator_id INTEGER,
                FOREIGN KEY(creator_id) REFERENCES users(user_id)
            )`,
      err => {
        if (err) {
          console.log("Events table already created");
        } else {
          console.log("Events table created");
        }
      }
    );
  }
});

export default db;
