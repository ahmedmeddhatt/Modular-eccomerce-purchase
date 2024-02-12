const express = require('express');
const orderController = require('../controllers/order-controller');

const router = express.Router();

router.route('/')
.get(orderController.getAllOrders)
.post(orderController.createOrder);


router.route('/:id')
.get( orderController.getOrderById)
.put( orderController.updateOrder)
.delete( orderController.deleteOrder);

module.exports = router;
