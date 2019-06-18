describe('Signup', () => {
  beforeEach(() => {
    cy.server(); // enable response stubbing
  });

  it('should signup a user', () => {
    cy.visit('/signup');
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/signup', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        user: {
          token: 'dummytoken',
        },
      }, // and force the response to be: []
    });
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('good@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('input[name="confirmPassword"]').type('H333jsgsgg');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/');
  });

  it('should display a server error message', () => {
    cy.visit('/signup');
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/signup', // that have a URL that matches '/users/*'
      status: 400,
      response: {
        message: 'username must be unique',
      }, // and force the response to be: []
    });
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('good@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('input[name="confirmPassword"]').type('H333jsgsgg');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/signup');
    cy.get('.error').should('have.text', 'username must be unique');
  });
});
