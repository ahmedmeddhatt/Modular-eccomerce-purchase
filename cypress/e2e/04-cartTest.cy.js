
describe('Carts Module End-to-End Test', () => {
  let cartId;

  beforeEach(() => {
    // baseUrl localhost:3000
    cy.request('/');
  });

  it('should test Cart module', () => {

    // Testing GET all Carts with the test database
    cy.request(`/api/cart`).then((response) => {
      // Check if the response has data (an array with length above 0)
      if (response.body && Array.isArray(response.body) && response.body.length > 0) {
          expect(response.status).to.eq(200);
          expect(response.body[0]).to.have.property('status', 'success');
      } else {
          cy.log('No data returned from the API. This is expected.');
      }
    });

    // Testing POST new Cart with the test database
    const newCart = {
      customerId: 298,
      productId: 28,
      quantity: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    cy.request('POST', `/api/cart`, newCart).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      const realCreatedAt = new Date(postResponse.body.data.created_at).toISOString();
      const realUpdatedAt = new Date(postResponse.body.data.updated_at).toISOString();
      const expectedData = {
        message: 'Cart created successfully',
        data: {
          id: postResponse.body.data.id,
          customer_id: newCart.customerId,
          product_id: newCart.productId,
          quantity: newCart.quantity,
          created_at: realCreatedAt,
          updated_at: realUpdatedAt
        }
      };
      expect(postResponse.body.data).to.deep.equal(expectedData.data);

      // Storing the dynamically generated Cart id
      cartId = postResponse.body.data.id;

      // Testing GET single Cart with the test database
      cy.request(`/api/cart/${cartId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('message', 'Cart retrieved successfully');
        expect(getResponse.body).to.have.property('data');
        expect(getResponse.body.data).to.have.an('object');
        expect(getResponse.body.data).to.have.property('id', cartId);
      });

      // Testing PUT update Cart with the test database
      const updatedCart = {
        customerId: 300,
        productId: 30,
        quantity: 10000
      };

      cy.request('PUT', `/api/cart/${cartId}`, updatedCart).then((putResponse) => {
        expect(putResponse.status).to.eq(201);
        const updatedUpdatedAt = updatedCart.updated_at || putResponse.body.data.updated_at;
        const expectedData = {
          status: 'success',
          message: 'Cart updated successfully',
          data: {
            id: putResponse.body.data.id,
            customer_id: updatedCart.customerId,
            product_id: updatedCart.productId,
            quantity: updatedCart.quantity,
            created_at: putResponse.body.data.created_at,
            updated_at: updatedUpdatedAt,
          }
        };
        expect(putResponse.body.data).to.deep.equal(expectedData.data);
      });

      // Testing DELETE Cart with the test database
      cy.request('DELETE', `/api/cart/${cartId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);
      });
    });
  });
});
