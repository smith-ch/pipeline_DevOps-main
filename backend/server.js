const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const winston = require('winston');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });

async function connectDB() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    logger.info('DB conectada');
    return conn;
  } catch (err) {
    logger.error('Error DB', err);
  }
}

app.get('/api/saludo', (req, res) => res.json({ mensaje: 'Hola desde el backend!' }));
app.get('/health', (req, res) => res.status(200).send('OK'));

if (require.main === module) {
  app.listen(port, async () => {
    await connectDB();
    logger.info(`Servidor en http://localhost:${port}`);
  });
}

module.exports = app;