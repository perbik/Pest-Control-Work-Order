import json
import mysql.connector
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
app.config["DB_NAME"] = "forms.db"

def get_db():
    db = mysql.connect(app.config["DB_NAME"])
    return db

conn = mysql.connect("forms.db")
cur = conn.cursor()
cur.execute("""
                CREATE TABLE IF NOT EXISTS customer (
                    CustomerID char(7) NOT NULL PRIMARY KEY AUTOINCREMENT,
                    CustomerName varchar(50),
                    CustomerAddress varchar(80),
                    CustomerPhone char (13), 
                    CustomerEmail varchar (30)
                    )
                """)
conn.commit()
conn.close()

def add(CustomerName, CustomerAddress, CustomerPhone, CustomerEmail):
    try:
        conn = mysql.connect("forms.db")
        cursor = conn.cursor()
        cursor.execute("""
                        INSERT INTO customer (CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
                        VALUES (?, ?, ?, ?)
                        """, (CustomerName, CustomerAddress, CustomerPhone, CustomerEmail))
        conn.commit()

    except mysql.Error as e:
        print("SQLite error:", e)

    finally:
        conn.close()

def view():
    conn = mysql.connect("forms.db")
    cur = conn.cursor()
    cur.execute("""
                    SELECT * FROM customer
                    """)
    entries = cur.fetchall()
    conn.close()
    return entries

def delete(entry_id):
    conn = mysql.connect("forms.db")
    cur = conn.cursor()
    cur.execute("""
                    DELETE FROM customer WHERE CustomerID = ?
                    """, (entry_id))
    conn.commit()
    conn.close()

def update(entry_id, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail):
    try:
        conn = mysql.connect("forms.db")
        cur = conn.cursor()
        cur.execute("""
                        UPDATE customer SET CustomerName = ?, CustomerAddress = ?, CustomerPhone = ?, CustomerEmail = ? WHERE id = ?
                        """, (CustomerName, CustomerAddress, CustomerPhone, CustomerEmail, entry_id))
        conn.commit()

    except mysql.Error as e:
        print("SQLite error:", e)

    finally:
        conn.close()

@app.route("/")
def index():
    entries = view()
    return render_template("index.html", entries=entries)

@app.route("/add", methods=["POST"])
def add_entry():
    CustomerName = request.form["CustomerName"]
    CustomerAddress = request.form["CustomerAddress"]
    CustomerPhone = request.form["CustomerPhone"]
    CustomerEmail = request.form["CustomerEmail"]
    
    add(CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
    return redirect(url_for("index"))

@app.route("/delete/<int:entry_id>")
def delete_entry(entry_id):
    delete(entry_id)
    return redirect(url_for("index"))

@app.route("/update/<int:entry_id>", methods=["POST"])
def update_entry(entry_id):
    CustomerName = request.form.get["CustomerName"]
    CustomerAddress = request.form.get["CustomerAddress"]
    CustomerPhone = request.form.get["CustomerPhone"]
    CustomerEmail = request.form.get["CustomerEmail"]
    update(entry_id, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run()