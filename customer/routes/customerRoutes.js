const express = require('express');
const router = express.Router();
const cartController = require('../controllers/customerController');


router.route('/')
.get(cartController.getAllCustomers)
.post(cartController.createCustomer);


router.route('/:id')
.get( cartController.getCustomerById)
.put( cartController.updateCustomer)
.delete( cartController.deleteCustomer);


module.exports = router;
