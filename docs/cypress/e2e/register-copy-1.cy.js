describe('Login Button', () => {
  it('should navigate to login page when clicking Login button', () => {
    cy.visit('http://127.0.0.1:5500/register.html')
    cy.get('button').contains('Login').click()

    // ตรวจสอบว่า URL ถูกเปลี่ยนไปที่หน้า index.html
    cy.url().should('include', 'index.html')
  })
})


