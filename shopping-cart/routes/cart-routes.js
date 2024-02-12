const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');

router.route('/')
.get(cartController.getAllCarts)
.post(cartController.createCart);


router.route('/:id')
.get( cartController.getCartById)
.put( cartController.updateCart)
.delete( cartController.deleteCart);


module.exports = router;
