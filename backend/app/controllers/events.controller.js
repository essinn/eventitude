import db from "../models/events.model.js";

export const createEvent = (req, res) => {
  try {
    const {
      name,
      description,
      location,
      start_date,
      close_registration,
      max_attendees,
    } = req.body;

    if (
      !name ||
      !description ||
      !location ||
      !start_date ||
      !close_registration ||
      !max_attendees
    ) {
      return res.status(400).send({ message: "Please fill in all fields" });
    }

    const sql = `INSERT INTO events (name, description, location, start_date, close_registration, max_attendees) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [
        name,
        description,
        location,
        start_date,
        close_registration,
        max_attendees,
      ],
      function (error) {
        if (error) {
          return res
            .status(500)
            .send({ message: "Error creating event", error: error.message });
        }
        res
          .status(201)
          .send({
            message: "Event created successfully",
            eventId: this.lastID,
          });
      }
    );
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getEventById = (req, res) => {
  try {
    const { event_id } = req.params;

    const sql = `SELECT * FROM events WHERE event_id = ?`;

    db.get(sql, [event_id], (error, event) => {
      if (error) {
        console.log("Error: ", error.message);
        res
          .status(500)
          .send({ message: "Error getting event", error: error.message });
      }
      if (!event) {
        res.status(404).send({ message: "Not found" });
      } else {
        res.status(200).send({ event });
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateEvent = (req, res) => {
  try {
    const { event_id } = req.params;
    const {
      name,
      description,
      location,
      start_date,
      close_registration,
      max_attendees,
    } = req.body;

    if (
      !name ||
      !description ||
      !location ||
      !start_date ||
      !close_registration ||
      !max_attendees
    ) {
      return res.status(400).send({ message: "Please fill in all fields" });
    }

    const sql = `UPDATE events SET name = ?, description = ?, location = ?, start_date = ?, close_registration = ?, max_attendees = ? WHERE event_id = ?`;
    db.get(
      sql,
      [
        name,
        description,
        location,
        start_date,
        close_registration,
        max_attendees,
        event_id,
      ],
      (error, event) => {
        if (error) {
          console.log("Error: ", error.message);
          res.status(500).send({ message: "Error updating event" });
        }
        res.status(200).send({ message: "Event updated", event });
      }
    );
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const createEventById = (req, res) => {
  //   const { event_id } = req.params;
  //   const { user_id } = req.body;
  //   if (!user_id) {
  //     console.log("Error: ", error.message);
  //     res.status(400).send({ message: "Please fill in all fields" });
  //   }
  //   const sql = `INSERT INTO events (event_id, user_id) VALUES (?, ?)`;
  //   db.run(sql, [event_id, user_id], (error, event) => {
  //     if (error) {
  //       console.log("Error: ", error.message);
  //       res.status(500).send({ message: "Error creating event" });
  //     }
  //     res.status(201).send({ message: "Event created", event });
  //   });
};

export const deleteEvent = (req, res) => {
  try {
    const { event_id } = req.params;

    const sql = `DELETE FROM events WHERE event_id = ?`;

    db.get(sql, [event_id], (error, event) => {
      if (error) {
        console.log("Error: ", error.message);
        res.status(500).send({ message: "Error deleting event" });
      }
      res.status(200).send({ message: "Event deleted", event });
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const searchEvent = (req, res) => {};
