const sqlite3 = require('sqlite3');
const { open } = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'mydatabase.db');

const initializeDatabase = async () => {
    const db = await open({
        filename:dbPath,
        driver: sqlite3.Database,
    });

    const createTableQuery = ` CREATE TABLE IF NOT EXSISTS transactions (
        id INTEGER PRIMARY KEY,
        item_name TEXT,
        amount REAL,
        date TEXT,
        from_who TEXT,
        category TEXT
    );`

    await db.exec(createTableQuery);

    return db;

};

initializeDatabase()
.then(db => {
    console.log('Database initialized and table created.'); 
})
.catch(err =>{
    console.error('Error initializing the database:', err);
});

