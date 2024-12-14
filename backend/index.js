//npm install express sqlite3
const express = require('express')
const app = express()
const port = 3000
const db = require("./database")
const path = require("path");

app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API endpoint to fetch all words
app.get("/", (req, res) => {
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
app.post("/", (req, res) => {
    const { eng_word, finn_word } = req.body;
    const insertWords = `INSERT INTO words (eng_word, finn_word) VALUES (?, ?)`;
    const wordRegex = /^[a-zA-ZäöåÄÖÅ\s\-]+$/;
    //below AI help to debug mistakes
    if (!eng_word || !finn_word) {
        return res.status(400).json({ error: "Both English and Finnish words are required." });
    }
    const checkWords = `SELECT * FROM words 
        WHERE eng_word = ? OR finn_word = ?`;
    db.get(checkWords, [eng_word, finn_word], (err, word) => {
        if (err) {
            console.error("Error fetching data", err)
            return;
        }
        if (word) {
            return res.status(400).json({ error: "Word/s already exists" });
        }
        if (!wordRegex.test(finn_word) || !wordRegex.test(eng_word)) {
            res.status(400).json({ error: "Word needs to alphabetical" });
            return;
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
    })
});

//API endpoint to edit words
//AI help with wordRegex
app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { eng_word, finn_word } = req.body;
    const editWords = `UPDATE words SET eng_word = ?, finn_word = ? WHERE id = ?`;
    const wordRegex = /^[a-zA-ZäöåÄÖÅ\s\-]+$/;

    //AI help to figure out how to do validation
    const checkEngWords = `SELECT * FROM words 
        WHERE eng_word = ? AND id != ?`;
    const checkFinnWords = `SELECT * FROM words 
        WHERE finn_word = ? AND id != ?`;

    //check english words
    db.get(checkEngWords, [eng_word, id], (err, word) => {
        if (err) {
            console.error("Error inserting data", err);
            return;
        }
        if (word) {
            // If the word pair already exists, error
            res.status(400).json({ error: "Word already exists" });
            return;
        }
        if (!wordRegex.test(eng_word)) {
            res.status(400).json({ error: "Word needs to alphabetical" });
            return;
        }
        //check finnish words
        db.get(checkFinnWords, [finn_word, id], (err, result) => {
            if (err) {
                console.error("Error inserting data", err);
                return;
            }
            if (result) {
                // If the word pair already exists, error
                return res.status(400).json({ error: "Word already exists" });
            }
            if (!wordRegex.test(finn_word)) {
                res.status(400).json({ error: "Word needs to alphabetical" });
                return;
            }
        })
        //edit the word-pair
        db.run(editWords, [eng_word, finn_word, id], (err) => {
            if (err) {
                console.error("Error updating data", err)
                res.status(500).json({ error: "Failed to edit words", details: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID, eng_word, finn_word });
            console.log("pair edited")
        })
    })
});

//API endpoint to delete words
app.delete("/:id", (req, res) => {
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