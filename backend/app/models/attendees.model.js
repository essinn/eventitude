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
      `CREATE TABLE attendees (
        event_id INTEGER,
        user_id INTEGER,
        PRIMARY KEY (event_id, user_id),
        FOREIGN KEY (event_id) REFERENCES events(event_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`,
      err => {
        if (err) {
          // console.log(err)
          console.log("Attendees table already created");
        } else {
          console.log("Attendees table created");
        }
      }
    );
  }
});

export default db;
