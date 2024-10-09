import express from "express";
import db from "../models/questions.model.js";

// for testing
export const getQuestions = (req, res) => {
  const { event_id } = req.params;
  const query = `SELECT * FROM questions WHERE event_id = ?`;
  db.all(query, [event_id], (error, result) => {
    if (error) {
      res.status(500).send({ error: error.message });
    }

    res.status(200).send(result);
  });
};

export const askQuestion = (req, res) => {
  try {
    const { question, asked_by, votes, event_id } = req.body;

    if (!question || !asked_by || !event_id) {
      return res.status(400).send({ error: "Please fill in all fields" });
    }

    const query = `INSERT INTO questions (question, asked_by, event_id, votes) VALUES (?, ?, ?, ?)`;
    db.run(query, [question, asked_by, event_id, votes], (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }

      res.status(201).send({ message: "Question posted", result });
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: error.message });
  }
};

export const deleteQuestion = (req, res) => {
  try {
    const { question_id } = req.params;

    if (!question_id) {
      res.status(400).send({ error: "Please provide a question id" });
    }

    const query = `DELETE FROM questions WHERE question_id = ?`;
    db.run(query, [question_id], (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }

      res.status(200).send({ message: "Question deleted", result });
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const vote = (req, res) => {
  try {
    const { question_id } = req.params;

    if (!question_id) {
      res.status(400).send({ error: "Please provide a question id" });
    }

    const query = `UPDATE questions SET votes = votes + 1 WHERE question_id = ?`;
    db.run(query, [question_id], (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }

      res.status(200).send({ message: "Voted", result });
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const unvote = (req, res) => {
  try {
    const { question_id } = req.params;

    if (!question_id) {
      res.status(400).send({ error: "Please provide a question id" });
    }

    const query = `UPDATE questions SET votes = votes - 1 WHERE question_id = ?`;
    db.run(query, [question_id], (error, result) => {
      if (error) {
        res.status(500).send({ error: error.message });
      }

      res.status(200).send({ message: "Unvoted", result });
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
