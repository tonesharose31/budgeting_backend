const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

function seedDatabase() { 


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY,
        item_name TEXT,
        amount REAL,
        date TEXT,
        from_who TEXT,
        category TEXT
    )`);
    

    const numberOfRecords = 20;

    const stmt = db.prepare(`
        INSERT INTO transactions (item_name, amount, date, from_who, category) VALUES (?, ?, ?, ?, ?)`);

    for (let i = 0; i < numberOfRecords; i++) {
        const item_name = faker.commerce.productName();
        const amount = faker.finance.amount();
        const date = faker.date.recent();
        const from_who = faker.company.companyName();
        const category = faker.commerce.department();

        stmt.run(item_name, amount, date, from_who, category);
    }
    stmt.finalize(() => {
        db.close((err) => {
            if (err) {
                console.error('Error closing the database:', err.message);
            } else {
                console.log('Database closed.');
            }
        });
    });
});
} 
module.exports = seedDatabase;