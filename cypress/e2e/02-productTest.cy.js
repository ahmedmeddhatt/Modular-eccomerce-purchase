
describe('Products Module End-to-End Test', () => {
  let productId;

  beforeEach(() => {
    // baseUrl localhost:3000
    cy.request(`/`);
  });

  it('should test Product module', () => {


    // Testing GET all products with the test database
    cy.request(`/api/products`).then((response) => {
      // Check if the response has data (an array with length above 0)
      if (response.body && Array.isArray(response.body) && response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('status', 'success');
    } else {
        cy.log('No data returned from the API. This is expected.');
    }
    });

    // Testing POST new Product with the test database
    const newProduct = {
      name: "tv smart 3990",
      description: "new tv smart 3990",
      price: '60.00'
    };

    cy.request('POST', `/api/products`, newProduct).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      const realCreatedAt = new Date(postResponse.body.data.created_at).toISOString();
      const realUpdatedAt = new Date(postResponse.body.data.updated_at).toISOString();
      const expectedData = {
        status: 'Product created successfully',
        message: 'Product created successfully',
        data: {
          id: postResponse.body.data.id,
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          created_at: realCreatedAt,
          updated_at: realUpdatedAt
        }
      };
      expect(postResponse.body.data).to.deep.equal(expectedData.data);

      // Storing the dynamically generated Product id
      productId = postResponse.body.data.id;

      // Testing GET single Product with the test database
      cy.request(`/api/products/${productId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('status', 'Success');
        expect(getResponse.body).to.have.property('data');
        expect(getResponse.body.data).to.have.an('object');
        expect(getResponse.body.data).to.have.property('id', productId);
      });

      // Testing PUT update Product with the test database
      const updatedProduct = {
        name: 'Updated Name',
        description: 'Updated description',
        price: '3300.00'
      };

      cy.request('PUT', `/api/products/${productId}`, updatedProduct).then((putResponse) => {
        expect(putResponse.status).to.eq(201);
        const updatedUpdatedAt = updatedProduct.updated_at || putResponse.body.data.updated_at;
        const expectedData = {
          status: 'success',
          message: 'Product updated successfully',
          data: {
            id: putResponse.body.data.id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            created_at: putResponse.body.data.created_at,
            updated_at: updatedUpdatedAt,
          }
        };
        expect(putResponse.body.data).to.deep.equal(expectedData.data);
      });

      // Testing DELETE Product with the test database
      cy.request('DELETE', `/api/products/${productId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);
      });
    });
  });
});
