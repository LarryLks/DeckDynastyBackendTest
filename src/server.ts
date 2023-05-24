import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const port = 443; // Use 80 for HTTP or 443 for HTTPS

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL configuration
const db = mysql.createConnection({
  host: 'DeckDynasty.co',
  user: 'larrylks',
  password: '1q2w3e',
  database: 'AccountServiceDB',
});

// Login route
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log('Incoming username = ' + username);
  console.log('Incoming password = ' + password);

  db.query(
    'SELECT * FROM USER_TB WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {

      for (let key in results) {
        console.log(results[key]);
      }

      if (error) {
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
      } else {

        res.status(200).json({ message: 'Login successful' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
