const pg = require('pg')

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_app',
    password: 'akash',
    port: 5432,
})

module.exports = pool