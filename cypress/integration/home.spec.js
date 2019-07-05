describe('Home', () => {
  it('Should render Home', () => {
    cy.server();
    cy.route({
      method: 'GET', // Route all GET requests
      url: '/api/articles', // that have a URL that matches '/articles/*'
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

    cy.visit('/');

    cy.get('.top').should('exist');
  });
});
