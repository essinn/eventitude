import express from "express";
import db from "../models/attendees.model.js";

export const getAttendee = (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      res.status(400).send({ error: "Please provide a user id" });
    }

    const query = `SELECT * FROM attendees WHERE user_id =? `;
    db.all(query, [user_id], (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }

      res.status(200).send({ result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const addAttendee = (req, res) => {
  //   try {
  //     const { first_name, last_name, email } = req.body;
  //     if (!first_name || !last_name || !email) {
  //       res.status(400).send({ error: "Please fill in all fields" });
  //     }
  //     const query = `INSERT INTO attendees (first_name, last_name, email) VALUES (?, ?, ?)`;
  //     db.run(query, [first_name, last_name, email], (error, result) => {
  //       if (error) {
  //         res.status(500).send({ error: error.message });
  //       }
  //       res.status(201).send({ message: "Attendee added", result });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ error: "Internal server error" });
  //   }
};
