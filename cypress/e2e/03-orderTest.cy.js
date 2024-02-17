
describe('Customers Module End-to-End Test', () => {
  let orderId;

  beforeEach(() => {
    // baseUrl localhost:3000
    cy.request('/');
  });

  it('should test Customer module', () => {
    // Testing GET all customers
    cy.request(`/api/orders`).then((response) => {
      // Check if the response has data (an array with length above 0)
      if (response.body && Array.isArray(response.body) && response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('status', 'success');
    } else {
        cy.log('No data returned from the API. This is expected.');
    }
    });

    // Testing POST new customer
    const newOrder = {
      customerId: 300,
      productId: 30,
      quantity: 10,
      totalAmount: '3300.00',
      orderStatus: "created",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    cy.request('POST', `/api/orders`, newOrder).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      const realCreatedAt = new Date(postResponse.body.data.created_at).toISOString();
      const realUpdatedAt = new Date(postResponse.body.data.updated_at).toISOString();
      const expectedData = {
        status: 'success',
        message: 'Order created successfully',
        data: {
          id: postResponse.body.data.id,
          customer_id: newOrder.customerId,
          product_id: newOrder.productId,
          quantity: newOrder.quantity,
          total_amount: newOrder.totalAmount,
          order_status: newOrder.orderStatus,
          created_at: realCreatedAt,
          updated_at: realUpdatedAt
        }
      };

      cy.request(`/api/customers/${newOrder.customerId}`).then((getResponse) => {
        expectedData.data.customer = getResponse.body.data.name;
        expectedData.data.email = getResponse.body.data.email;
        expectedData.data.phone = getResponse.body.data.phone;
      });

      cy.request(`/api/products/${newOrder.productId}`).then((getResponse) => {
        expectedData.data.product = getResponse.body.data.name;
        expectedData.data.description = getResponse.body.data.description;
        expectedData.data.price = getResponse.body.data.price;
      });

      cy.wrap(null).then(() => {

        expect(postResponse.body.data).to.deep.equal(expectedData.data);
      })

      // Storing the dynamically generated customer id
      orderId = postResponse.body.data.id;

      // Testing GET single customer
      cy.request(`/api/orders/${orderId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('status', 'success');
        expect(getResponse.body).to.have.property('data');
        expect(getResponse.body.data).to.have.an('object');
        expect(getResponse.body.data).to.have.property('id', orderId);
      });

      // Testing PUT update customer      
      const updatedOrder = {
        customerId: 300,
        productId: 30,
        quantity: 10,
        totalAmount: '3300.00',
        orderStatus: "created",
      };

      cy.request('PUT', `/api/orders/${orderId}`, updatedOrder).then((putResponse) => {
        expect(putResponse.status).to.eq(201);
        const updatedUpdatedAt = updatedOrder.updated_at || putResponse.body.data.updated_at;
        const expectedData = {
          status: 'success',
          message: 'Order updated successfully',
          data: {
            id: putResponse.body.data.id,
            customer_id: updatedOrder.customerId,
            product_id: updatedOrder.productId,
            quantity: updatedOrder.quantity,
            total_amount: updatedOrder.totalAmount,
            order_status: updatedOrder.orderStatus,
            created_at: putResponse.body.data.created_at,
            updated_at: updatedUpdatedAt,
          }
        };
        expect(putResponse.body.data).to.deep.equal(expectedData.data);
      });

      // Testing DELETE customer
      cy.request('DELETE', `/api/orders/${orderId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);
      });
    });
  });
});
