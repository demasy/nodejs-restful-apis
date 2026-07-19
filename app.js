const express = require('express');
const oracledb = require('oracledb');

const app = express();

// Oracle DB connection config
const dbConfig = {
    user: process.env.DEMASY_DB_USER,
    password: process.env.DEMASY_DB_PASS,
    connectString: `${process.env.DEMASY_DB_HOST}:${process.env.DEMASY_DB_PORT}/${process.env.DEMASY_DB_SERVICE}`,
  };

// Route to test Oracle DB connection
app.get('/', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT TO_CHAR(SYSDATE, 'DD/MM/RRRR HH24:MI:SS') AS today FROM dual`
    );

    const today = result.rows[0][0];
    res.send(`🚀 Hello Demasy! Today is ${today} from Node.js in Docker connected to Oracle!`);
  } catch (err) {
    console.error('DB Connection Error:', err);
    res.status(500).send('Error connecting to Oracle DB');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing DB connection:', err);
      }
    }
  }
});

const PORT = process.env.DEMASY_SERVER_PORT;
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));