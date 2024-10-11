
        describe('Integration: Assignment และ Assignment Detail', () => {
            it('ควรโหลดรายละเอียดของ Assignment เมื่อคลิกที่ Assignment', () => {
                cy.visit('general.html');
                cy.get('.assignmentLink').click();
                cy.url().should('include', 'AssignmentDetail.html');
                cy.get('.assignmentTitle').should('exist');
            });
        });
        