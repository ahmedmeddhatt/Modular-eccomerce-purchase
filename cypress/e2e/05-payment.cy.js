
describe('Payment Module End-to-End Test', () => {
  let paymentId;
  
  beforeEach(() => {
    // baseUrl localhost:3000
    cy.request('/');
  });

  it('should test Payment module', () => {
    // Testing GET all payments
    cy.request(`/api/payment/payment-details`).then((response) => {
      // Check if the response has data (an array with length above 0)
      if (response.body && Array.isArray(response.body) && response.body.length > 0) {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('status', 'success');
    } else {
        cy.log('No data returned from the API. This is expected.');
    }
    });

    // Testing POST new payment
    const newPayment = {
      payment_method: "Master-Card",
      name: "Onion",
      price: "3.99",
      currency: "EUR",
      quantity:  12,
      description: "Vegetables",
    };
    
    cy.request('POST', `/api/payment/buy`, newPayment).then((postResponse) => {
      // Storing the dynamically generated payment id
      paymentId = postResponse.body.data.id;

      expect(postResponse.status).to.eq(201);
      
      const expectedData = {
        status: 'success',
        data: {
          payment_method: newPayment.payment_method,
          name: newPayment.name,
          price: newPayment.price,
          currency: newPayment.currency,
          quantity:  newPayment.quantity,
          description: newPayment.description,
          
        }
      };

      // retrieve the rest of the data
      cy.request('GET', `/api/payment/payment-details/${paymentId}`).then((postResponse) => {
        expectedData.data.id = postResponse.body.data.id;
        expectedData.data.intent = postResponse.body.data.intent
        expectedData.data.state = postResponse.body.data.state;
        expectedData.data.create_time = postResponse.body.data.create_time;
        expectedData.data.links = postResponse.body.data.links;

      });

      cy.wrap(null).then(() => {

        expect(postResponse.body.data).to.deep.equal(expectedData.data);
      });

      cy.log(postResponse.body);
      // Testing GET single payment
      cy.request(`/api/payment/payment-details/${paymentId}`).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property('status', 'success');
        expect(getResponse.body).to.have.property('data');
        expect(getResponse.body.data).to.have.an('object');
        expect(getResponse.body.data).to.have.property('id', paymentId);
      });

      
    });
  });
});
