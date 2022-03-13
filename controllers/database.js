const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
	user: process.env.DATABASEUSERNAME,
	host: process.env.DATABASEHOST,
	database: process.env.DATABASENAME,
	password: process.env.DATABASEPASSWORD,
	port: process.env.DATABASEPORT,
	ssl: {
		rejectUnauthorized: false,
	},
});

exports.SaveMyGardenData = async (temperature, humidity, timestamp) => {
    
    const query = await pool.query('INSERT INTO "my_garden_records"(temperature, humidity, date_time) VALUES($1, $2, $3) returning *;', [temperature, humidity, timestamp]);
    return query
}

