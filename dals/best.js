const db = require('../db/config');

const getBestSellingProducts = async () => {
    const query = `
        SELECT p.ProductID, p.ProductName, p.Price, SUM(od.Quantity) AS TotalOrderedQuantity
        FROM Products p
        JOIN Order_Details od ON p.ProductID = od.ProductID
        GROUP BY p.ProductID, p.ProductName
        ORDER BY TotalOrderedQuantity DESC;
    `;

    const [rows] = await db.query(query);
    return rows;
}

module.exports = {
    getBestSellingProducts
};