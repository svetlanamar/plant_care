const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./pool.js');

app.use(cors());
app.use(express.json());

/* Helper Functions */

const getColumns = (keys) => {
    return keys.join(',');
};

const getValues = (keys, body) => {
    const values = [];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = body[key];

        val && values.push(val);
    }

    const withQuotes = values.join("','");
    return `'${withQuotes}'`;
};

/* Routes */

app.get("/plantslist", async (req, res) => {
    try {
        const plants = await pool.query("select * from plants order by plant_name");
        res.json(plants.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/addplant", async (req, res) => {
    const keys = ['plant_name', 'family', 'duration', 'form', 'foliage', 'flowers_color', 'growth_rate', 'watering', 'fertilizer', 'exposure', 'soil_quality', 'minimum_temperature', 'season'];
    const cols = getColumns(keys);
    const vals = getValues(keys, req.body);
    
    try {
        const sql = `insert into plants (${cols}) values (${vals}) returning *`;
        const qry = await pool.query(sql);

        res.json(qry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/newuser", async (req, res) => {
    const keys = ['username', 'password', 'email', 'created_on'];
    const cols = getColumns(keys);
    const vals = getValues(keys, req.body) + ', NOW()';

    try {
        const sql = `insert into accounts (${cols}) values (${vals}) returning *`;
        const qry = await pool.query(sql);

        res.json(qry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/WWW", async (req, res) => {
    try {
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5555, () => {
    console.log('server has started on port 5555');
});
