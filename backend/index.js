//npm install express sqlite3
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors'); // Import the cors package
const db = require("./database")
const path = require("path");
const { copyFileSync } = require('fs');

app.use(cors({
    origin: 'http://localhost:5173' // Allow only your React app's origin
}));

app.use(express.json()); // Parses incoming JSON requests

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));


app.get("/api", (req, res) => {
    const fetchQuery = `SELECT * FROM words`;
    db.all(fetchQuery, (err, result) => {
        if (err) {
            console.error("Error fetching data", err)
            res.status(500).json({ error: "Failed to fetch words", details: err.message });
            return;
        }
        res.json(result);
    })
});

//add words
app.post("/api/words", (req, res) => {
    const { eng_word, finn_word } = req.body;
    const insertWords = `INSERT INTO words (eng_word, finn_word) VALUES (?, ?)`;

    db.run(insertWords, [eng_word, finn_word], (err, result) => {
        if (err) {
            console.error("Error inserting data", err)
            res.status(500).json({ error: "Failed to insert words", details: err.message });
            return;
        }
        res.json(result);
        console.log("new pair added")
    })
});

//edit words
app.put("/api/words/:id", (req, res) => {
    const { id } = req.params;
    const { eng_word, finn_word } = req.body;
    const editWords = `UPDATE words SET eng_word = ?, finn_word = ? WHERE id = ?`;

    db.run(editWordsWords, [eng_word, finn_word, id], (err) => {
        if (err) {
            console.error("Error updating data", err)
            res.status(500).json({ error: "Failed to edit words", details: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, eng_word, finn_word });
        console.log("pair edited")
    })
});

//delete words
app.delete("/api/words/:id", (req, res) => {
    const { id } = req.params;
    const deleteWords = `DELETE FROM words WHERE id = ?`;

    db.run(deleteWords, [id], (err) => {
        if (err) {
            console.error("Error deleting data", err)
            res.status(500).json({ error: "Failed to delete words", details: err.message });
            return
        }
        res.status(204).send();
        console.log("word pair deleted");
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

process.on("SIGINT", () => {
    db.close();
    console.log("Database connection closed."); //debug
    process.exit(0);
});