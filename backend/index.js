//npm install express sqlite3
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const db = require("./database")
const path = require("path");
const { copyFileSync } = require('fs');

// Enable CORS for the React app
app.use(cors({
    origin: 'http://localhost:5173', // Allow only React app's origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'] //allowed methods
}));

app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API endpoint to fetch all words
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

//API endpoint to add words
app.post("/api", (req, res) => {
    const { eng_word, finn_word } = req.body;
    const insertWords = `INSERT INTO words (eng_word, finn_word) VALUES (?, ?)`;
    //below AI help to debug mistakes
    if (!eng_word || !finn_word) {
        return res.status(400).json({ error: "Both English and Finnish words are required." });
    }

    // no =>, this.lastID wont work
    db.run(insertWords, [eng_word, finn_word], function (err) {
        if (err) {
            console.error("Error inserting data", err)
            res.status(500).json({ error: "Failed to insert words", details: err.message });
            return;
        }
        else {
            // Use `this.lastID` to get the ID of the newly inserted row
            //sqlite does not return result obj (err, result)
            res.json({
                id: this.lastID,
                eng_word,
                finn_word,
            });

            console.log("new pair added")
        }
    })
});

//API endpoint to edit words
app.patch("/api/:id", (req, res) => {
    const { id } = req.params;
    const { eng_word, finn_word } = req.body;
    const editWords = `UPDATE words SET eng_word = ?, finn_word = ? WHERE id = ?`;

    db.run(editWords, [eng_word, finn_word, id], (err) => {
        if (err) {
            console.error("Error updating data", err)
            res.status(500).json({ error: "Failed to edit words", details: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, eng_word, finn_word });
        console.log("pair edited")
    })
});

//API endpoint to delete words
app.delete("/api/:id", (req, res) => {
    const { id } = req.params;
    const deleteWords = `DELETE FROM words WHERE id = ?`;
    //below AI help to debug mistakes
    if (!id) {
        return res.status(400).json({ error: "ID required!" });
    }

    db.run(deleteWords, [id], (err) => {
        if (err) {
            console.error("Error deleting data", err)
            res.status(500).json({ error: "Failed to delete words", details: err.message });
            return
        }
        //below AI help to debug mistakes
        if (this.changes === 0) {
            // If no rows were deleted, return a 404 error indicating the word wasn't found
            return res.status(404).json({ error: "Word not found" });
        }
        res.status(204).send();
        console.log("word pair deleted");
    })
});



// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

//Close connection
process.on("SIGINT", () => {
    db.close();
    console.log("Database connection closed."); //debug
    process.exit(0);
});