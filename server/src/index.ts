import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS counter (
        id INT PRIMARY KEY,
        count INT NOT NULL
      );
    `);
    // Check if a row exists
    const result = await client.query('SELECT * FROM counter WHERE id = 1;');
    if (result.rows.length === 0) {
      // If no row, insert one
      await client.query('INSERT INTO counter (id, count) VALUES (1, 0);');
    }
    client.release();
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database', err);
  }
};

app.use(cors());
app.use(express.json());

app.get('/api/count', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT count FROM counter WHERE id = 1;');
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get count' });
  }
});

app.post('/api/count/increment', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE counter SET count = count + 1 WHERE id = 1 RETURNING count;');
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to increment count' });
  }
});

app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
