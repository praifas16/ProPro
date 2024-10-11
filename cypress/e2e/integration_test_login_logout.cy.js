
        describe('Integration: Login และ Logout', () => {
            it('ควรเปลี่ยนหน้าไปยังหน้าหลักหลังจากเข้าสู่ระบบและออกจากระบบได้ถูกต้อง', () => {
                // จำลองการเข้าสู่ระบบ
                cy.visit('index.html');
                cy.get('#email').type('test@example.com');
                cy.get('#password').type('1234');
                cy.get('button[type=submit]').click();
                cy.url().should('include', 'studenthead.html');

                // ทดสอบการออกจากระบบ
                cy.get('#logoutLink').click();
                cy.url().should('include', 'index.html');
            });
        });
        