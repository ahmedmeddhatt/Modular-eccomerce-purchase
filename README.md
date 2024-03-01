

# Modular E-commerce Purchase Express App

This Express app is designed to handle various e-commerce purchase components in a modular fashion. The app includes modules for managing customers, orders, shopping cart, products, and payments.

## Table of Contents

- [Modules](#modules)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Modules

1. **Customers Module:** Manages customer-related operations such as creating, updating, and retrieving customer information.

2. **Products Module:** Handles product-related operations, such as listing available products.

3. **Shopping Cart Module:** Manages shopping cart functionalities, including adding and removing items.

4. **Orders Module:** Handles order creation, tracking, and management.

5. **Payment Module:** Manages payment processing for completed orders.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ahmedmeddhatt/Modular-eccomerce-purchase.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

Start the app:

```bash
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to interact with the app.

## API Endpoints

### Customers Module

- `GET /api/customers`: Retrieve all customers.
- `GET /api/customers/:id`: Retrieve a specific customer.
- `POST /api/customers`: Create a new customer.
{
    "name": "ahmed",
    "email": "ahmed@customer.com",
    "phone": "01111138720",
    "address": "Madenty"
}
- `PUT /api/customers/:id`: Update customer information.
{
    "name": "Mohamed",
    "email": "Mohamed@customer.com",
    "phone": "01111138720",
    "address": "6 october"
}
- `DELETE /api/customers/:id`: Delete a customer.

### Products Module

- `GET /api/products`: Retrieve all products.
- `GET /api/products/:id`: Retrieve a specific product.
- `POST /api/products`: Create a new product.
{
    "name": "tv smart 30",
    "description": "new tv smart 30",
    "price": 60
}
- `PUT /api/products/:id`: Update products information.
{
    "name": "tv smart 20",
    "description": "new tv smart 20",
    "price": 40
}
- `DELETE /api/products/:id`: Delete a product.

### Shopping Cart Module

- `GET /api/cart`: Retrieve all the cart.
- `GET /api/cart/:orderId`: Retrieve the shopping cart for a specific order.
- `POST /api/cart/`: Add a product to the shopping cart by adding the customerId & orderId.
{
    "customerId": 297,
    "productId": 28,
    "quantity": 10
}
- `PUT /api/cart/:id`: Update cart information.
{
    "customerId": 2,
    "productId": 3,
    "quantity": 10000
}
- `DELETE /api/cart/:id`: Delete the cart.
- `POST /api/cart/:orderId/remove/:productId`: Remove a product from the shopping cart.

### Orders Module

- `GET /api/orders`: Retrieve all orders.
- `GET /api/orders/:id`: Retrieve a specific order.
- `POST /api/orders`: Create a new order.
{
    "customerId": 301,
    "productId": [40, 29, 42],
    "quantity": 17,
    "orderStatus": "created"
}
- `PUT /api/orders/:id`: Update order information.
{
    "customerId": 301,
    "productId": [28, 41, 42],
    "quantity": 20,
    "orderStatus": "created"
}
- `DELETE /api/orders/:id`: Delete an order.

### Payment Module

- `GET /api/payment/payment-details`: Retrieve all the payments.
- `GET /api/payment/payment-details/:paymentId`: Retrieve the payment, order, customer details for a specific transaction.
- `POST /api/payment/buy`: Process payment for a specific order.
{
        "payment_method": "Master-Card",
        "name": "Onion",
        "description": "Vegetables",
        "currency": "EUR",
        "price": "3.99",
        "quantity": 12
}


## Testing

[Cypress](https://www.cypress.io/) tests are included for each API endpoint. To run the tests:

```bash
npx cypress open
```

- Choose E2E test & Run all the tests.


## Project Structure

Modular E-commerce Purchase/
|-- customer/
|   |-- controllers
|       |-- customerController.js
|   |-- db-script
|       |-- customer.sql
|   |-- models
|       |-- customerModel.js
|   |-- routes
|       |-- customerRoutes.js
|-- orders/
|   |-- controllers
|       |-- orderController.js
|   |-- db-script
|       |-- order.sql
|   |-- models
|       |-- orderModel.js
|   |-- routes
|       |-- orderRoutes.js
|-- product/
|   |-- controllers
|       |-- productController.js
|   |-- db-script
|       |-- product.sql
|   |-- models
|       |-- productModel.js
|   |-- routes
|       |-- productRoutes.js
|-- shopping-cart/
|   |-- controllers
|       |-- cartController.js
|   |-- db-script
|       |-- cart.sql
|   |-- models
|       |-- cartModel.js
|   |-- routes
|       |-- cartRoutes.js
|-- payment/
|   |-- controllers
|       |-- paymentController.js
|   |-- db-script
|       |-- payment.sql
|   |-- services
|       |-- paymentService.js
|   |-- routes
|       |-- paymentRoutes.js
|-- cypress/
|   |-- downloads
|       |-- downloads.htm.crdownload
|   |-- e2e
|       |-- 01-customerTest.cy.js
|       |-- 02-productTest.cy.js
|       |-- 03-orderTest.cy.js
|       |-- 04-cartTest.cy.js
|       |-- 05-paymentTest.cy.js
|   |-- fixtures
|       |-- example.json
|   |-- support
|       |-- commands.js
|       |-- e2e.js
|-- .gitignore
|-- app.js
|-- db.js
|-- cypress.config.js
|-- package.json
|-- README.md


## How to Run


1. Install dependencies:

    ```bash
    npm i
    ```

2. Run the application:

    ```bash
    npm run start
    ```


## Contributing
Anyone can clone the repo, run it on the localhost & try the project features.

## Author

Ahmed Medhat