import json
import mysql.connector
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
app.config["DB_CONFIG"] = {
    "host": "localhost",
    "user": "root",
    "password": "admin",
    "database": "forms"
}

def create_database():
    db_config = app.config["DB_CONFIG"].copy()
    db_config.pop("database")
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS forms")
    conn.close()

def get_db():
    db = mysql.connector.connect(**app.config["DB_CONFIG"])
    return db

create_database()

conn = get_db()
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS customer (
        CustomerID CHAR(7) NOT NULL PRIMARY KEY,
        CustomerName VARCHAR(50),
        CustomerAddress VARCHAR(80),
        CustomerPhone CHAR(13),
        CustomerEmail VARCHAR(30)
    )
""")
conn.commit()
conn.close()

def add(CustomerID, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail):
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO customer (CustomerID, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
            VALUES (%s, %s, %s, %s, %s)
        """, (CustomerID, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail))
        conn.commit()
    except mysql.connector.Error as e:
        print("Database error:", e)
    finally:
        conn.close()

def view():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM customer")
    entries = cur.fetchall()
    conn.close()
    return entries

def delete(id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM customer WHERE CustomerID = %s", (id,))
    conn.commit()
    conn.close()

def update(id, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail):
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            UPDATE customer SET CustomerName = %s, CustomerAddress = %s, CustomerPhone = %s, CustomerEmail = %s
            WHERE CustomerID = %s
        """, (CustomerName, CustomerAddress, CustomerPhone, CustomerEmail, id))
        conn.commit()
    except mysql.connector.Error as e:
        print("Database error:", e)
    finally:
        conn.close()

@app.route("/")
def index():
    entries = view()
    return render_template("index.html", entries=entries)

@app.route("/add", methods=["POST"])
def add_entry():
    CustomerID = request.form["CustomerID"]
    CustomerName = request.form["CustomerName"]
    CustomerAddress = request.form["CustomerAddress"]
    CustomerPhone = request.form["CustomerPhone"]
    CustomerEmail = request.form["CustomerEmail"]

    add(CustomerID, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
    return redirect(url_for("index"))

@app.route("/delete/<string:id>")
def delete_entry(id):
    delete(id)
    return redirect(url_for("index"))

@app.route("/update/<string:id>", methods=["POST"])
def update_entry(id):
    CustomerName = request.form["CustomerName"]
    CustomerAddress = request.form["CustomerAddress"]
    CustomerPhone = request.form["CustomerPhone"]
    CustomerEmail = request.form["CustomerEmail"]
    update(id, CustomerName, CustomerAddress, CustomerPhone, CustomerEmail)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
