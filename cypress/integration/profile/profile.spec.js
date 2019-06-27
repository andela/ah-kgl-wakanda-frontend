import jwt from 'jsonwebtoken';
import { secret } from '../../config';

describe('Profile', () => {
  beforeEach(() => {
    cy.server();
  });
  it('Signup and view the signedup user profile', () => {
    const token = jwt.sign({ username: 'username', email: 'username@gmail.com', id: 23 }, secret);

    cy.server();
    cy.route({
      method: 'POST',
      url: '/api/auth/signup',
      status: 200,
      response: {
        user: {
          token,
        },
      },
    });
    cy.route({
      method: 'GET',
      url: `/api/users/*`,
      status: 200,
      response: {
        profile: {
          username: 'giselei',
          firstname: 'Gisele',
          lastname: 'Iradukunda',
          email: 'gisele.iradukunda@andela.com',
          bio: 'cyane man',
          image:
            'http://res.cloudinary.com/ah-wakanda/image/upload/v1561649492/ax27ojnfvsgmoosgcgyi.jpg',
          follows: 0,
          followings: 0,
          articles: 0,
        },
      },
    });
    cy.route({
      method: 'PUT',
      url: `/api/user/*`,
      status: 200,
      response: {
        profile: {
          username: 'giselei',
          firstname: 'Gisele',
          lastname: 'Iradukunda',
          email: 'gisele.iradukunda@andela.com',
          bio: 'cyane man',
          image:
            'http://res.cloudinary.com/ah-wakanda/image/upload/v1561649492/ax27ojnfvsgmoosgcgyi.jpg',
          follows: 0,
          followings: 0,
          articles: 0,
        },
      },
    });

    cy.visit('/signup');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('good@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('input[name="confirmPassword"]').type('H333jsgsgg');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/');

    cy.visit('/profile');
    cy.get('#firstname')
      .type('Gisele')
      .should('have.value', 'GiseleGisele');
    cy.get('#lastname')
      .type('Iradukunda')
      .should('have.value', 'IradukundaIradukunda');
    cy.get('#bio')
      .type('Welcome to my world!')
      .should('have.value', 'cyane manWelcome to my world!');
    cy.contains('Edit').click();
  });
});
