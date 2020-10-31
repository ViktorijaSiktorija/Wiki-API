const Pool = require("pg").Pool;

const pool = new Pool({
    user: "vika",
    host: "localhost",
    port: 5432,
    database: "wikiDB"
});

module.exports = pool;
