const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const db = require('../../db')


paypal.configure({
    'mode': process.env.PAYPAL_MODE, //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });

exports.getPaymentDetailsService = async () => {

    const query = `
    SELECT id, intent, state, payment_method, name, description, currency,
     price, quantity, create_time, links FROM payment
     `

     const {rows} = await db.query(query);
     return rows;
  
};
exports.getPaymentByIdService = async (paymentId) => {

    const query = `
    SELECT id, intent, state, payment_method, name, description, currency,
     price, quantity, create_time, links FROM payment WHERE id = $1
     `

     const {rows} = await db.query(query, [paymentId]);
     return rows[0];
  
};

exports.createPaypalPaymentService = async (payment) => {
    return new Promise((resolve, reject) => {
        paypal.payment.create( payment, async function (err, createdPayment) {
            if (err) {
                reject(err);;
            } else {
                const storedPayment = await exports.storePaymentInDatabase(createdPayment);
                resolve(storedPayment);
            }
        });
     
    })
    
};


exports.storePaymentInDatabase  = async (payment) => {
    const query = `
            INSERT INTO payment (id, intent, state, payment_method, name, price,
             currency, quantity, description, create_time, links)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING *;
             `

    const values = [
        payment.id,
        payment.intent,
        payment.state,
        payment.payer.payment_method,
        payment.transactions[0].item_list.items[0].name,
        payment.transactions[0].item_list.items[0].price,
        payment.transactions[0].item_list.items[0].currency,
        payment.transactions[0].item_list.items[0].quantity,
        payment.transactions[0].description,
        new Date(payment.create_time),
        JSON.stringify(payment.links),

    ];

    const {rows} = await db.query(query, values);
    return rows[0];
  
};