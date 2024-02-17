
describe('Customers Module End-to-End Test', () => {
  let customerId;
  
  beforeEach(() => {
    // baseUrl localhost:3000
    cy.request('/');
  });

  it('should test Customer module', () => {
    // Testing GET all customers
    cy.request(`/api/customers`).then((response) => {
      // Check if the response has data (an array with length above 0)
      if (response.body && Array.isArray(response.body) && response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('status', 'success');
    } else {
        cy.log('No data returned from the API. This is expected.');
    }
    });

    // Testing POST new customer
    const newCustomer = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '01024186652',
      address: 'Zahraa nasr city',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    cy.request('POST', `/api/customers`, newCustomer).then((postResponse) => {
      expect(postResponse.status).to.eq(201);
      // const realCreatedAt = new Date(postResponse.body.data.created_at).toISOString();
      // const realUpdatedAt = new Date(postResponse.body.data.updated_at).toISOString();
      const expectedData = {
        status: 'success',
        message: 'Customer created successfully',
        data: {
          id: postResponse.body.data.id,
          name: newCustomer.name,
          email: newCustomer.email,
          phone: newCustomer.phone,
          address: newCustomer.address,
          created_at: new Date(postResponse.body.data.created_at).toISOString(),
          updated_at: new Date(postResponse.body.data.updated_at).toISOString()
        }
      };
      expect(postResponse.body.data).to.deep.equal(expectedData.data);

      // Storing the dynamically generated customer id
      customerId = postResponse.body.data.id;

      // Testing GET single customer
      cy.request(`/api/customers/${customerId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('status', 'success');
        expect(getResponse.body).to.have.property('data');
        expect(getResponse.body.data).to.have.an('object');
        expect(getResponse.body.data).to.have.property('id', customerId);
      });

      // Testing PUT update customer      
      const updatedCustomer = {
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '01024186652',
        address: 'Zahraa nasr city',
      };

      cy.request('PUT', `/api/customers/${customerId}`, updatedCustomer).then((putResponse) => {
        expect(putResponse.status).to.eq(201);
        const updatedUpdatedAt = updatedCustomer.updated_at || putResponse.body.data.updated_at;
        const expectedData = {
          status: 'success',
          message: 'Customer updated successfully',
          data: {
            id: putResponse.body.data.id,
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            phone: updatedCustomer.phone,
            address: updatedCustomer.address,
            created_at: putResponse.body.data.created_at,
            updated_at: updatedUpdatedAt,
          }
        };
        expect(putResponse.body.data).to.deep.equal(expectedData.data);
      });

      // Testing DELETE customer
      cy.request('DELETE', `/api/customers/${customerId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);
      });
    });
  });
});
