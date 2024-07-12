const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pest_control",
});


// Dashboard endpoint to get counts of products and customers
app.get('/dashboard', (req, res) => {
    const productsCountQuery = new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS productsCount FROM product', (err, data) => {
            if (err) reject(err);
            else resolve(data[0].productsCount);
        });
    });

    const customersCountQuery = new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS customersCount FROM customer', (err, data) => {
            if (err) reject(err);
            else resolve(data[0].customersCount);
        });
    });

    Promise.all([productsCountQuery, customersCountQuery])
        .then(([productsCount, customersCount]) => {
            res.json({ productsCount, customersCount });
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
            res.status(500).json({ error: 'Error fetching dashboard data' });
        });
});

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
    }
});

const upload = multer({ storage: storage });

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/customers', (req, res) => {
    const sql = "SELECT * FROM customer";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/add', upload.single('ProdImage'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('File uploaded:', req.file);

    const sql = "INSERT INTO product (ProductID, ProdImage, ProductName, TargetPestType, ProductUnitPrice) VALUES (?)";
    const values = [
        req.body.ProductID,
        req.file.filename,
        req.body.ProductName,
        req.body.TargetPestType,
        req.body.ProductUnitPrice
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});

app.put('/updateprod/:ProductID', upload.single('ProdImage'), (req, res) => {
    const sql = "UPDATE product SET `ProdImage` = ?, `ProductName` = ?, `TargetPestType` = ?, `ProductUnitPrice` = ? WHERE ProductID = ?";
    const ProductID = req.params.ProductID;
    const values = [
        req.file.filename,
        req.body.ProductName,
        req.body.TargetPestType,
        req.body.ProductUnitPrice,
    ];

    db.query(sql, [...values, ProductID], (err, data) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});


app.delete('/deleteprod/:ProductID', (req, res) => {
    const sql = "DELETE FROM product WHERE ProductID = ?";
    const ProductID = req.params.ProductID;

    db.query(sql, [ProductID], (err, data) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});


app.listen(8081, () => {
    console.log("Listening...");
});
