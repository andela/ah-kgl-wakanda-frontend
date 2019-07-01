describe('Single article', () => {
  it('Should render Single article', () => {
    cy.server();

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
      method: 'GET', // Route all GET requests
      url: '/api/articles/The-title', // that have a URL that matches '/articles/*'
      status: 200,
      response: {
        data: {
          article: {
            title: 'The title of an article',
            description: 'The description',
            favoritesCount: 10,
            commentCounts: 3,
            readTime: '10 min',
            id: 1,
            Ratings: [{ rate: 3 }],
            slug: 'The-title',
          },
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

    cy.visit('/articles/The-title');
    cy.location('pathname').should('eq', '/articles/The-title');
  });
});
