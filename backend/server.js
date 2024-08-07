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

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login ('name', 'email', 'password') VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    }) 
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE 'email' = ? AND 'password' AND ?";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login ('name', 'email', 'password') VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    }) 
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE 'email' = ? AND 'password' AND ?";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})


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

    const salesCountQuery = new Promise((resolve, reject) => {
        db.query('SELECT SUM(GrandTotal) AS salesTotal FROM payment', (err, data) => {
            if (err) reject(err);
            else resolve(data[0].salesTotal); // Corrected from salesCount to salesTotal
        });
    });

    const purchasesCountQuery = new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS purchasesCount FROM purchase', (err, data) => {
            if (err) reject(err);
            else resolve(data[0].purchasesCount);
        });
    });

    Promise.all([productsCountQuery, customersCountQuery, salesCountQuery, purchasesCountQuery])
        .then(([productsCount, customersCount, salesTotal, purchasesCount]) => { // Corrected variable name
            res.json({ productsCount, customersCount, salesTotal, purchasesCount }); // Corrected property name
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

// FOR IMAGE KEME LANG I2
const upload = multer({ storage: storage });

// CREATE/ADD FUNCTIONS DITO SA BABA
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

function generateId(prefix, table, column, length = 10) {
    return new Promise((resolve, reject) => {
      const query = `SELECT MAX(${column}) as maxId FROM ${table} WHERE ${column} LIKE '${prefix}%'`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
  
        const maxId = results[0].maxId;
        const nextId = maxId ? parseInt(maxId.slice(prefix.length)) + 1 : 1;
        const paddedId = String(nextId).padStart(length - prefix.length, '0');
        resolve(prefix + paddedId);
      });
    });
  }
  
  // Endpoint for checkout
  app.post('/checkout', async (req, res) => {
    const { customerDetails, purchaseDetails } = req.body;
  
    try {
      db.beginTransaction(async (err) => {
        if (err) { throw err; }
  
        let customerId = customerDetails.CustomerID;
        if (!customerId) {
          const customerQuery = `SELECT CustomerID FROM customer WHERE CustomerEmail = ?`;
          db.query(customerQuery, [customerDetails.CustomerEmail], async (err, results) => {
            if (err) { throw err; }
  
            if (results.length > 0) {
              customerId = results[0].CustomerID;
            } else {
              customerId = await generateId('CU-', 'customer', 'CustomerID', 6);
              const newCustomer = { ...customerDetails, CustomerID: customerId };
              const customerInsertQuery = 'INSERT INTO customer SET ?';
              db.query(customerInsertQuery, newCustomer, (err, result) => {
                if (err) { throw err; }
              });
            }
  
            await completePurchase(customerId);
          });
        } else {
          await completePurchase(customerId);
        }
  
        async function completePurchase(customerId) {
          const purchaseId = await generateId('UPC', 'purchase', 'PurchaseID', 10);
          const purchaseData = {
            PurchaseID: purchaseId,
            PurchaseDate: new Date(),
            CustomerID: customerId,
          };
          const purchaseInsertQuery = 'INSERT INTO purchase SET ?';
          db.query(purchaseInsertQuery, purchaseData, (err, purchaseResult) => {
            if (err) { throw err; }
  
            const salesRecords = purchaseDetails.Products.map((product) => ({
              PurchaseID: purchaseId,
              ProductID: product.ProductID,
              ProductQuantity: product.ProductQuantity,
              ProductAmount: product.ProductAmount,
            }));
            
            const salesInsertQuery = 'INSERT INTO sales_record (PurchaseID, ProductID, ProductQuantity, ProductAmount) VALUES ?';
            const salesValues = salesRecords.map(record => Object.values(record));
            db.query(salesInsertQuery, [salesValues], (err) => {
              if (err) { throw err; }
  
              const paymentIdPrefix = {
                "check": "PCK-",
                "cash": "PCS-",
                "debit": "PDB-",
                "credit": "PCD-",
                "e-wallet": "PEW-",
                "bank transfer": "PBT-"
              }[purchaseDetails.PaymentMethod];
  
              generateId(paymentIdPrefix, 'payment', 'PaymentID', 10).then(paymentId => {
                const paymentData = {
                  PaymentID: paymentId,
                  PurchaseSubtotal: purchaseDetails.PurchaseSubtotal,
                  PaymentMethod: purchaseDetails.PaymentMethod,
                  Discount: purchaseDetails.Discount,
                  GrandTotal: purchaseDetails.GrandTotal,
                  PurchaseID: purchaseId,
                };
  
                const paymentInsertQuery = 'INSERT INTO payment SET ?';
                db.query(paymentInsertQuery, paymentData, (err, paymentResult) => {
                  if (err) { throw err; }
  
                  db.query('UPDATE purchase SET PaymentID = ? WHERE PurchaseID = ?', [paymentId, purchaseId], (err) => {
                    if (err) { throw err; }
  
                    db.commit((err) => {
                      if (err) { throw err; }
                      res.json({ success: true, message: 'Checkout successful' });
                    });
                  });
                });
              }).catch(err => { throw err; });
            });
          });
        }
      });
    } catch (error) {
      db.rollback(() => {
        console.error('Checkout failed:', error);
        res.status(500).json({ success: false, message: "Checkout failed", error });
      });
    }
  });

// READ FUNCTIONS DITO SA BABA
// product table
app.get('/products', (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// customer table
app.get('/customers', (req, res) => {
    const sql = "SELECT * FROM customer";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// purchase table
app.get('/purchases', (req, res) => {
    const sql = "SELECT * FROM purchase";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// payment table
app.get('/payments', (req, res) => {
    const sql = "SELECT * FROM payment";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// sales_record table
app.get('/sales', (req, res) => {
    const sql = "SELECT * FROM sales_record";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});







// UPDATE FUNCTIONS DITO SA BABA
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

app.put('/updatecust/:CustomerID', (req, res) => {
    const sql = "UPDATE customer SET CustomerName = ?, CustomerAddress = ?, CustomerPhone = ?, CustomerEmail = ? WHERE CustomerID = ?";
    const CustomerID = req.params.CustomerID;
    const { CustomerName, CustomerAddress, CustomerPhone, CustomerEmail } = req.body;

    db.query(sql, [CustomerName, CustomerAddress, CustomerPhone, CustomerEmail, CustomerID], (err, result) => {
        if (err) {
            console.error('Error updating customer data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});

app.put('/updatepaym/:PaymentID', (req, res) => {
    const sql = "UPDATE payment SET PurchaseSubtotal = ?, PaymentMethod = ?, Discount = ?, GrandTotal = ? WHERE PaymentID = ?";
    const PaymentID = req.params.PaymentID;
    const { PurchaseSubtotal, PaymentMethod, Discount, GrandTotal } = req.body;

    db.query(sql, [PurchaseSubtotal, PaymentMethod, Discount, GrandTotal, PaymentID], (err, result) => {
        if (err) {
            console.error('Error updating customer data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});
  
app.put('/updatesales/:PurchaseID/:ProductID', (req, res) => {
    const { PurchaseID, ProductID } = req.params;
    const sql = "UPDATE sales_record SET ProductQuantity = ?, ProductAmount = ? WHERE PurchaseID = ? AND ProductID = ?";
    const { ProductQuantity, ProductAmount } = req.body;

    db.query(sql, [PurchaseID, ProductID, ProductQuantity, ProductAmount], (err, data) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});




// DELETE FUNCTIONS DITO SA BABA
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

app.delete('/deletecust/:CustomerID', (req, res) => {
    const sql = "DELETE FROM customer WHERE CustomerID = ?";
    const CustomerID = req.params.CustomerID;

    db.query(sql, [CustomerID], (err, data) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json(err);
        }
        return res.json({ success: true });
    });
});

app.delete('/deletepurch/:PurchaseID', (req, res) => {
    const { PurchaseID } = req.params;
    // First, delete all associated records from the sales_record table
    const deleteSalesRecordSql = "DELETE FROM sales_record WHERE PurchaseID = ?";
    db.query(deleteSalesRecordSql, [PurchaseID], (err, data) => {
        if (err) {
            console.error('Error deleting data from sales_record:', err);
            return res.status(500).json(err);
        }
        // After successfully deleting from sales_record, delete from purchase table
        const deletePurchaseSql = "DELETE FROM purchase WHERE PurchaseID = ?";
        db.query(deletePurchaseSql, [PurchaseID], (err, data) => {
            if (err) {
                console.error('Error deleting data from purchase:', err);
                return res.status(500).json(err);
            }
            return res.json({ success: true });
        });
    });
});

app.delete('/deletepaym/:PaymentID', (req, res) => {
    const { PaymentID } = req.params;

    // Step 1: Find all PurchaseIDs associated with the PaymentID
    const findPurchaseQuery = "SELECT PurchaseID FROM purchase WHERE PaymentID = ?";
    db.query(findPurchaseQuery, [PaymentID], (err, purchaseRecords) => {
        if (err) {
            console.error('Error finding purchase record:', err);
            return res.status(500).json(err);
        }
        if (purchaseRecords.length === 0) {
            return res.status(404).json({ error: 'Purchase record not found' });
        }

        // Step 2: Delete related records from sales_record table for each PurchaseID
        const deletePromises = purchaseRecords.map((record) => {
            return new Promise((resolve, reject) => {
                const deleteSalesRecordSql = "DELETE FROM sales_record WHERE PurchaseID = ?";
                db.query(deleteSalesRecordSql, [record.PurchaseID], (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
        });

        Promise.all(deletePromises).then(() => {
            // Step 3: Delete the records from the purchase table
            const deletePurchaseSql = "DELETE FROM purchase WHERE PaymentID = ?";
            db.query(deletePurchaseSql, [PaymentID], (err, data) => {
                if (err) {
                    console.error('Error deleting data from purchase:', err);
                    return res.status(500).json(err);
                }

                // Step 4: Delete the record from the payment table
                const deletePaymentSql = "DELETE FROM payment WHERE PaymentID = ?";
                db.query(deletePaymentSql, [PaymentID], (err, data) => {
                    if (err) {
                        console.error('Error deleting data from payment:', err);
                        return res.status(500).json(err);
                    }
                    return res.json({ success: true, message: 'Payment record deleted successfully' });
                });
            });
        }).catch((error) => {
            console.error('Error deleting related sales records:', error);
            return res.status(500).json(error);
        });
    });
});

app.delete('/deletesales/:PurchaseID/:ProductID', (req, res) => {
    const { PurchaseID, ProductID } = req.params;
    const sql = "DELETE FROM sales_record WHERE PurchaseID = ? AND ProductID = ?";
    
    db.query(sql, [PurchaseID, ProductID], (err, data) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json(err);
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ message: 'No record found to delete' });
        }
        return res.json({ success: true, message: 'Record deleted successfully' });
    });
});






// FOR TESTING PURPOSES
app.listen(8081, () => {
    console.log("Listening...");
});
