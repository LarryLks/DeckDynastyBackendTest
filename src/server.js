"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mysql_1 = __importDefault(require("mysql"));
const app = (0, express_1.default)();
const port = process.env.PORT; // Use 80 for HTTP or 443 for HTTPS
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// MySQL configuration
const db = mysql_1.default.createConnection({
    host: 'DeckDynasty.co',
    user: 'larrylks',
    password: '1q2w3e',
    database: 'AccountServiceDB',
});
// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Incoming username = ' + username);
    console.log('Incoming password = ' + password);
    db.query('SELECT * FROM USER_TB WHERE username = ? AND password = ?', [username, password], (error, results) => {
        for (let key in results) {
            console.log(results[key]);
        }
        if (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
        else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
        }
        else {
            res.status(200).json({ message: 'Login successful' });
        }
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
