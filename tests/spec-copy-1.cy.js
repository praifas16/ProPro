describe('E2E Tests for general.html', () => {
  
  it('should navigate to login page when clicking Login button', () => {
    cy.visit('http://127.0.0.1:5500/docs/register.html')  
    cy.get('button').contains('Login').click()
    cy.url().should('include', 'index.html')
  });

  it('should allow users to create a new post in the general page', () => {
    cy.visit('http://127.0.0.1:5500/docs/general.html');
    cy.get('.start-post button').click(); 
    cy.get('#postMessage').type('This is a Cypress test post'); 
    cy.get('.modal-content button').click(); 
    cy.wait(7000);
    cy.get('#postContainer').then(($container) => {
      cy.log($container.html()); 
    });
 });
});