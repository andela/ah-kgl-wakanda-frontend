import jwt from 'jsonwebtoken';
import { secret } from '../../config';

describe('Create article', () => {
  const token = jwt.sign({ username: 'hadad', email: 'hadad.bwenge@gmail.com', id: 20 }, secret);

  beforeEach(() => {
    cy.server(); // enable response stubbing
    cy.visit('/login');
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/auth/login', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        user: {
          email: 'hadad.bwenge@gmail.com',
          token,
          username: 'hadad',
          bio: null,
          image:
            'https://res.cloudinary.com/dutstern8/image/upload/v1561470328/fz5uv8apunsaqlabwwhy.png',
        },
      }, // and force the response to be: []
    });
    cy.get('input[name="email"]').type('hadad.bwenge@gmail.com');
    cy.get('input[name="password"]').type('Hadad12@');
    cy.get('button').click();
    cy.location('pathname').should('eq', '/');
  });
  it('should create an article and redirect to the single page', () => {
    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/users/hadad',
      status: 200,
      response: {
        profile: {
          username: 'hadad',
        },
      },
    });

    cy.route({
      method: 'POST', // Route all GET requests
      url: '/api/articles/sdjaklsdsa-132141825/favorite', // that have a URL that matches '/articles/*'
      status: 200,
      response: {
        status: 200,
      },
    });

    cy.visit('/articles/new');

    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/articles', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        data: {
          article: {
            id: 109,
            slug: 'sdjaklsdsa-132141825',
            title: 'sdjaklsdsa',
            description: 'hello skdjsjd',
            body: '"<p class=\\"md-block-unstyled\\">I am typing</p>"',
            images: null,
            reads: 19,
            favorited: false,
            favoritesCount: 0,
            active: true,
            userId: 9,
            createdAt: '2019-06-25T15:10:05.903Z',
            updatedAt: '2019-06-25T18:57:04.689Z',
            User: {
              username: 'hadad',
              firstname: 'hadad',
              lastname: 'Bwenge',
              email: 'hadad.bwenge@gmail.com',
              image:
                'https://res.cloudinary.com/dutstern8/image/upload/v1561470328/fz5uv8apunsaqlabwwhy.png',
            },
            Tags: [],
            Ratings: [],
            readTime: 'Less than a minute',
          },
        },
      }, // and force the response to be: []
    });
    cy.route({
      method: 'GET', // Route all POST requests
      url: '/api/articles/sdjaklsdsa-132141825', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        data: {
          article: {
            id: 109,
            slug: 'sdjaklsdsa-132141825',
            title: 'sdjaklsdsa',
            description: 'hello skdjsjd',
            body: '"<p class=\\"md-block-unstyled\\">I am typing</p>"',
            images: null,
            reads: 19,
            favorited: false,
            favoritesCount: 0,
            active: true,
            userId: 9,
            createdAt: '2019-06-25T15:10:05.903Z',
            updatedAt: '2019-06-25T18:57:04.689Z',
            User: {
              username: 'hadad',
              firstname: 'hadad',
              lastname: 'Bwenge',
              email: 'hadad.bwenge@gmail.com',
              image:
                'https://res.cloudinary.com/dutstern8/image/upload/v1561470328/fz5uv8apunsaqlabwwhy.png',
            },
            Tags: [],
            Ratings: [],
            readTime: 'Less than a minute',
          },
        },
      }, // and force the response to be: []
    });

    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/articles/sdjaklsdsa-132141825/comments', // that have a URL that matches '/articles/*'
      status: 200,
      response: {
        data: {
          commentsCount: 3,
          comments: [
            {
              body: 'body text',
              title: 'title',
              description: 'description',
              User: { username: 'username' },
            },
          ],
        },
      },
    });

    cy.route({
      method: 'POST', // Route all POST requests
      url: '/api/articles/rate/*', // that have a URL that matches '/users/*'
      status: 200,
      response: {
        data: {
          message: 'rating submitted successfully',
        },
      }, // and force the response to be: []
    });
    cy.get('input[name="title"]').type('Hello world');
    cy.get('[contenteditable]')
      .eq(0)
      .type('I am typing');
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/articles/sdjaklsdsa-132141825');

    cy.get('#like').click();
    cy.get('.Toastify__toast-body').should('have.text', 'Liked');
    cy.location('pathname').should('eq', '/articles/sdjaklsdsa-132141825');
  });
});
