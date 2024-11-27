//npm install express sqlite3
const express = require('express')
const app = express()
const port = 3000
const db = require("./db")

// app.get("/", (req, res) => {
//     res.send("Use /api/locations to fetch locations.");
// });

// app.get('/api/locations', (req, res) => {
//     db.all('SELECT * FROM users', [], (err, data) => {
//         if (err) {
//             res.status(500).send("error")
//         }
//         res.json(data);
//     })
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
