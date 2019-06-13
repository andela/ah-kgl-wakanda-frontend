describe('Login', () => {
  beforeEach(() => {
    cy.server(); // enable response stubbing
  });
  it('get error when passing wrong credential', () => {
    cy.visit('/login');
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/login', // that have a URL that matches '/users/*'
      status: 401,
      response: {
        message: 'The credentials you provided is incorrect',
      }, // and force the response to be: []
    });
    cy.get('input[name="email"]').type('goodemail@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('.error-message-server').should(
      'have.text',
      'The credentials you provided is incorrect',
    );
  });
  it('should redirect to home when passing valid credentials', () => {
    cy.visit('/login');
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/login', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        user: {
          token: 'dummytoken',
        },
      }, // and force the response to be: []
    });
    cy.get('input[name="email"]').type('wrongemail@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/');
  });
});
