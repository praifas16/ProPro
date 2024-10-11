describe('Website Feature Check', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/docs/index.html');
    });
  
    it('should check if login feature exists', () => {
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should suggest adding a password recovery feature if not present', () => {
      cy.get('a').contains('Forgot Password').should('exist').then((exists) => {
        if (!exists) {
          cy.log('Suggestion: Add a Forgot Password feature for better UX.');
        }
      });
    });
  
    it('should check if profile editing is available after login', () => {
      cy.get('#email').type('user@example.com');
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/studenthead.html');
  
      cy.get('#profileLink').should('exist').click();
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
  
      // Suggest profile editing feature if missing
      cy.get('input[name="name"]').then((input) => {
        if (!input) {
          cy.log('Suggestion: Add profile editing functionality.');
        }
      });
    });
  
    it('should check for secure page access without login', () => {
      cy.visit('http://127.0.0.1:5500/docs/studenthead.html');
      cy.url().should('include', '/index.html');
      cy.log('Security Check: User redirected to login page when accessing secure page without authentication.');
    });
  
    it('should check for XSS vulnerability in comments section', () => {
      cy.visit('http://127.0.0.1:5500/docs/general.html');
      cy.get('#comment').type('<script>alert("XSS")</script>');
      cy.get('button[type="submit"]').click();
      
      // Ensure script isn't executed
      cy.on('window:alert', (str) => {
        expect(str).to.not.include('XSS');
      });
      cy.log('Security Check: XSS prevention works properly.');
    });
  
    it('should check if notifications feature exists', () => {
      cy.get('#notifications').should('exist').then((exists) => {
        if (!exists) {
          cy.log('Suggestion: Add a notifications feature to improve user engagement.');
        }
      });
    });
  
    it('should check if dark mode is available', () => {
      cy.get('button#darkModeToggle').should('exist').then((exists) => {
        if (!exists) {
          cy.log('Suggestion: Add a dark mode toggle to enhance user experience.');
        }
      });
    });
  });
  