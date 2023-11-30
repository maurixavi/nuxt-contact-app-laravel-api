describe('Authentication', () => {
    it('User login using email and password with success', () => {
      cy.intercept('**/api/v1/auth/login', {fixture: '/auth/login/success.json'}).as('loginSuccess');
      cy.intercept('**/api/v1/auth/user', {fixture: '/auth/login/user.json'}).as('user');
  
      cy.visit('/auth/login');

      cy.get('#email-input').type('user@user.com');
      cy.get('#password-input').type('password');
      cy.get('#submit-button').click();
  
      cy.wait('@loginSuccess');
      cy.wait('@user');
  
      cy.location('pathname').should('be.equal', '/');
    });
  });
  