const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgres://qzdmlmvu:K3ragO6zs_VpZt5ZcdyX4nT9Zec7gtnH@mouse.db.elephantsql.com/qzdmlmvu'
});

module.exports = pool;
