const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

// Initialize a new pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Ensure the port is an integer
  database: process.env.DB_NAME,
});

module.exports = pool; // Export the pool for use in other files


// Function to read the SQL file and execute its commands
const setupDatabase = async () => {
  try {
    // Adjust the path to where your SQL file is located within your project
    const sqlFilePath = path.join(__dirname, '../db/capstonedb.sql');

    // Read the SQL file
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: 'utf-8' });

    // Connect to the database
    const client = await pool.connect();

    // If your SQL commands need to be executed separately, split them and execute one by one
    const statements = sqlQuery.split(/;\s*$/m); // This regex splits the SQL file into separate statements ignoring the last empty one
    for (const statement of statements.filter(s => s.length > 0)) {
      await client.query(statement);
    }

    console.log('Database setup completed successfully.');

    // Release the client back to the pool
    client.release();
  } catch (err) {
    console.error('Error setting up the database:', err);
    // Ensure the client is released back to the pool in case of error
    if (client) client.release();
  }
};
