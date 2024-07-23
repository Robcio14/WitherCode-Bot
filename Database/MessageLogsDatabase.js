const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db3 = new sqlite3.Database('./Database/Database/deltemsglog.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    db3.run(`
        CREATE TABLE IF NOT EXISTS logs (
            Guild TEXT PRIMARY KEY,
            Channel TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table', err);
        }
    });
});


module.exports = db3;
