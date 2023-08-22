const db = require('./db/config');

async function setupDatabase() {
    try {
        // Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Users (
                UserID INT AUTO_INCREMENT PRIMARY KEY,
                UserName VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                Password VARCHAR(255) NOT NULL,
                Address VARCHAR(255)
            );
        `);

        // Products Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Products (
                ProductID INT AUTO_INCREMENT PRIMARY KEY,
                ProductName VARCHAR(255) NOT NULL,
                Description TEXT,
                Price DECIMAL(10, 2) NOT NULL
                -- Additional columns can be added here
            );
        `);

        // Orders Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Orders (
                OrderID INT AUTO_INCREMENT PRIMARY KEY,
                UserID INT,
                RecipientName VARCHAR(255) NOT NULL,
                Address VARCHAR(255) NOT NULL,
                Date DATE NOT NULL,
                Total DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (UserID) REFERENCES Users(UserID)
            );
        `);

        // Order_Details Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Order_Details (
                OrderID INT,
                ProductID INT,
                Quantity INT NOT NULL,
                FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
                FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
            );
        `);

        // Reviews Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Reviews (
                ReviewID INT AUTO_INCREMENT PRIMARY KEY,
                UserID INT,
                ProductID INT,
                Text TEXT,
                Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5), -- Assuming a 1-5 rating system
                Approved BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (UserID) REFERENCES Users(UserID),
                FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
            );
        `);

        // Admin Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS Admin (
                AdminID INT AUTO_INCREMENT PRIMARY KEY,
                AdminName VARCHAR(255) NOT NULL,
                Password VARCHAR(255) NOT NULL
            );
        `);

        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error setting up tables:", err.message);
    }
}

setupDatabase();
