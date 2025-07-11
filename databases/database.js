const sqlite3 = require('sqlite3');
const path = require('path');
const { open } = require('sqlite');

const connectDB = async () => {
    return open({
        filename: path.join(__dirname, '../models/health.db'),
        driver: sqlite3.Database
    });
};

module.exports = connectDB;
