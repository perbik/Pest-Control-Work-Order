const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'pest_control'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required');
    
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        
        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).send('Invalid credentials');
        
        const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, 'secretkey', { expiresIn: '1h' });
        res.status(200).send({ token });
    });
});

app.post('/orders', verifyToken, (req, res) => {
    const { userId, items } = req.body;
    db.query('INSERT INTO orders (user_id) VALUES (?)', [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        const orderId = result.insertId;
        const cartItems = items.map(item => [orderId, item.productId, item.quantity]);
        db.query('INSERT INTO cart_items (order_id, product_id, quantity) VALUES ?', [cartItems], (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Order submitted');
        });
    });
});

app.get('/admin/users', verifyToken, (req, res) => {
    if (!req.user.isAdmin) return res.status(403).send('Admin privilege required');
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
