beforeEach(() => {
  cy.server();
});
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

  it('Should share an article on different social media platform', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/articles/:slug',
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
      },
    });

    cy.visit('/articles/amazing-is-the-mind-of-a-child-466777251');
    cy.get('a.email')
      .invoke(
        'attr',
        'href',
        'mailto:?subject=Amazing is the mind of a child!&body=Amazing is the mind of a child!https://kigali-author-haven.herokuapp.com/articles/amazing-is-the-mind-of-a-child-466777251',
      )
      .click();
    cy.get('a.facebook')
      .invoke(
        'attr',
        'href',
        'https://www.facebook.com/sharer.php?u=https://kigali-author-haven.herokuapp.com/articles/amazing-is-the-mind-of-a-child-466777251&t=Amazing is the mind of a child!',
      )
      .click();
    cy.get('a.twitter')
      .invoke(
        'attr',
        'href',
        'https://twitter.com/intent/tweet?url=https://kigali-author-haven.herokuapp.com/articles/amazing-is-the-mind-of-a-child-466777251&text=Amazing is the mind of a child!&hashtags=wakanda,author_haven,article',
      )
      .click();
  });
});
