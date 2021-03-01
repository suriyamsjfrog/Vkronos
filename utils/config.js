
const { Pool } = require('pg');
console.log('inside db config ');
const config = {
	host: 'localhost',
	port: '5432',
	database: 'postgres',
	user: 'postgres',
	password: 'Sweeti@261203'
};
const pool = new Pool(config);

module.exports=pool;