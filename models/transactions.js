const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'mydatabase.db');

const initializeDatabase = async () => {
    const db = await open({
        filename:dbPath,
        driver: sqlite3.Database,
    });

    const createTableQuery = ` CREATAE TABLE IF NOT EXSISTS transactions (
        id INTERGER PRIMARY KEY,
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

