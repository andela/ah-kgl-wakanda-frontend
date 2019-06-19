describe('Reset-password', () => {
  beforeEach(() => {
    cy.server(); // enable response stubbing
  });
  it('get error when passing wrong credential', () => {
    cy.visit('/reset-password');
    cy.route({
      method: 'POST', // Route all GET requests
      url: '/api/users/*', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        id: 1,
        firstName: 'Dev',
        lastName: 'Dev',
        email: 'dev1@gmail.com',
      }, // and force the response to be: []
    });
    cy.get('input[name="email"]').type('goodemail@gmail.com');
    cy.get('button').click();
    cy.get('#email-sent').should('have.text', 'Check your email address to update your password');
  });
  it('should display a server error message', () => {
    cy.visit('/reset-password');
    cy.route({
      method: 'POST', // Route all GET requests
      url: '/api/users/*', // that have a URL that matches '/users/*'
      status: 404,
      response: {
        message: 'Email not found',
      }, // and force the response to be: []
    });
    cy.get('input[name="email"]').type('goodemail@gmail.com');
    cy.get('button').click();
    cy.get('.error-message-server').should('have.text', 'Email not found');
  });
});
