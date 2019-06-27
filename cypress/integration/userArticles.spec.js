import jwt from 'jsonwebtoken';
import { secret } from '../config';

describe('User Articles', () => {
  const token = jwt.sign({ username: 'username', email: 'username@gmail.com', id: 23 }, secret);

  it('Should render UserArticle', () => {
    cy.server();
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/signup', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        user: {
          token,
        },
      }, // and force the response to be: []
    });

    cy.server();

    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/articles/*/private', // that have a URL that matches '/articles/*'
      status: 200,
      response: {
        data: {
          articles: [
            {
              title: 'The title of an article',
              description: 'The description',
              favoritesCount: 10,
              commentCounts: 3,
              readTime: '10 min',
              id: 1,
              Ratings: [{ rate: 3 }],
              slug: 'The-title',
            },
          ],
        },
      },
    });

    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/articles/*/comments', // that have a URL that matches '/articles/*'
      status: 200,
      response: {
        data: {
          commentsCount: 3,
        },
      },
    });

    cy.visit('/signup');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('good@gmail.com');
    cy.get('input[name="password"]').type('H333jsgsgg');
    cy.get('input[name="confirmPassword"]').type('H333jsgsgg');
    cy.get('button').click();

    cy.visit('/myarticles');

    cy.get('.article').should('exist');
    cy.location('pathname').should('eq', '/myarticles');
  });
});
