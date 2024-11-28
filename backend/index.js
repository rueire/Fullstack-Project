//npm install express sqlite3
const express = require('express')
const app = express()
const port = 3000
const db = require("./db")
const path = require("path");


const fetchQuery = `SELECT * FROM words`;
app.use(express.json()); // Parses incoming JSON requests
// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/api", (req, res) => {
    db.all(fetchQuery, (err, result) => {
        if (err) {
            console.error("Error fetching data")
            res.status(500).json({ error: "Failed to fetch words" });
            return;
        }
        res.json(result);
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("SIGINT", () => {
    db.end();
    console.log("Database connection closed."); //debug
    process.exit(0);
});