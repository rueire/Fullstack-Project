const sqlite3 = require('sqlite3').verbose();


// Connecting Database
// Use in-memory SQLite database
let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.log("Error");
        return;
    }
    else {
        console.log("Connected");
    }
})

// Queries
const wordsTable = 'CREATE TABLE IF NOT EXISTS words(id INTEGER PRIMARY KEY, eng_word TEXT NOT NULL, finn_word TEXT NOT NULL)';
const insertWord = `INSERT INTO words (english_word, finnish_word) VALUES (?, ?)`;

//create the database
db.serialize(() => {
    db.run(wordsTable, (err) => {
        if (err) {
            console.log("error creating table", err);
            return;
        }
        console.log("Table Created");
    })
    const stmt = db.prepare(insertWord)

    const words = [
        ['plant', 'kasvi'],
        ['cat', 'kissa'],
        ['mouse', 'hiiri'],
        ['desert', 'aavikko'],
        ['book', 'kirja'],
        ['no', 'ei']
    ];
    //add words to database
    words.forEach(([english, finnish]) => {
        stmt.run(english, finnish, (err) => {
            if (err) {
                console.error("Error adding words to table", err)
            }
        })
    });

    stmt.finalize();
    console.log("Words added.");
})

module.exports = db;