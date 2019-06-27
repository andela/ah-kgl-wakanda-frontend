describe('Reset-password', () => {
  beforeEach(() => {
    cy.server(); // enable response stubbing
  });

  it('should update the password', () => {
    cy.visit('/update-password/this-is-a-wrong-token');
    cy.route({
      method: 'PUT', // Route all GET requests
      url: '/api/users/*', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        email: 'dev1@gmail.com',
      }, // and force the response to be: []
    });
    cy.get('input[name="password"]').type('Abc12345');
    cy.get('input[name="confirmPassword"]').type('Abc12345');
    cy.get('button').click();
    cy.get('#updated').should('have.text', 'Your password has been updated successfully');
  });

  it('should return an error when the two password are not the same', () => {
    cy.visit('/update-password/this-is-a-wrong-token');
    cy.route({
      method: 'PUT', // Route all GET requests
      url: '/api/users/*', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        id: 1,
        firstName: 'Dev',
        lastName: 'Dev',
        email: 'dev1@gmail.com',
      }, // and force the response to be: []
    });
    cy.get('input[name="password"]').type('Abc12345');
    cy.get('input[name="confirmPassword"]').type('Xyz12345');
    cy.get('button').click();
    cy.get('.error-message-server').should(
      'have.text',
      'Password is different from Confirm Password',
    );
  });

  it('should display a server error message', () => {
    cy.visit('/update-password/this-is-a-wrong-token');
    cy.route({
      method: 'PUT', // Route all GET requests
      url: '/api/users/*', // that have a URL that matches '/users/*'
      status: 400,
      response: {
        message: 'Password is not valid',
      }, // and force the response to be: []
    });
    cy.get('input[name="password"]').type('Abc12345');
    cy.get('input[name="confirmPassword"]').type('Abc12345');
    cy.get('button').click();
    cy.get('.error-message-server').should('have.text', 'Password is not valid');
  });
});
