const express = require('express');
const router = express.Router();

const orderDAL = require('../dals/orders');
const orderDetailDAL = require('../dals/orderDetails');

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await orderDAL.getAllOrdersForUser(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders for user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Fetch details of a specific order
router.get('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderDAL.getOrderById(orderId);
        const orderDetails = await orderDetailDAL.getOrderDetail(orderId);
        res.status(200).json({ order, orderDetails });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Update an existing order
router.put('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedData = req.body;
        await orderDAL.updateOrder(orderId, updatedData);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Delete an order
router.delete('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await orderDAL.deleteOrder(orderId);
        await orderDetailDAL.deleteOrderDetail(orderId);  // You might want to add a function to delete all details for an order
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Fetch all orders (Admin). Be sure to secure this endpoint properly!
router.get('/all', async (req, res) => {
    try {
        const orders = await orderDAL.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
router.post('/create', async (req, res) => {
    try {
        const { userId, recipientName, address, date, total, cartItems } = req.body;

        // Create a new order and retrieve the generated OrderID
        await orderDAL.createOrder(userId, recipientName, address, date, total);

        // Assuming the above function doesn't return the inserted Order's ID, we'll need to fetch it.
        const order = await orderDAL.getLatestOrderForUser(userId);
        const orderId = order.OrderID;

        // For each item in the cart, create a record in the Order_Details table.
        for (const item of cartItems) {
            await orderDetailDAL.createOrderDetail(orderId, item.ProductID, item.quantity);
        }

        res.status(200).json({ success: true, orderId: orderId });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
module.exports = router;
