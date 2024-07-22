const sqlite3 = require('sqlite3').verbose();

// Create and connect to the database
const db = new sqlite3.Database('./Database/Database/PropozycjeDB.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }

    // Create a table for storing suggestion data
    db.run(`
    CREATE TABLE IF NOT EXISTS suggestions (
      message_id TEXT PRIMARY KEY,
      upvotes INTEGER DEFAULT 0,
      downvotes INTEGER DEFAULT 0,
      voted_ppl TEXT DEFAULT '[]',
      downvoted_ppl TEXT DEFAULT '[]',
      createdAt INTEGER
    )
  `, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
});

module.exports = db;
