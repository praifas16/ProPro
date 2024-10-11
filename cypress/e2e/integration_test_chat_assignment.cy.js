
        describe('Integration: Chat และ Assignment', () => {
            it('ควรโหลดข้อมูลห้องเรียนและแชทที่ถูกต้อง', () => {
                // จำลองการเข้าห้องเรียน
                cy.visit('studenthead.html');
                cy.get('#userClassrooms > div:nth-of-type(1) > a').click();
                cy.url().should('include', 'general.html?classroom=example');

                // จำลองการใช้งานแชท
                cy.get('#chatInput').type('สวัสดีครับ');
                cy.get('#sendButton').click();
                cy.get('.chatMessage').contains('สวัสดีครับ');
            });
        });
        