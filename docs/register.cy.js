describe('Test Register Page', () => {
    it('should load the register page', () => {
      cy.visit('http://127.0.0.1:5500/register.html')
      cy.contains('Register') // ทดสอบว่ามีข้อความ 'Register' บนหน้าเว็บ
    })
  })
  