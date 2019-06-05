describe('localhost test', () =>{
    it('visits http://localhost:3000/', ()=>{
        cy.visit('/')
    })
    it('contains "React App" in the title', () => {
        cy.title().should('contain', 'React App');
      });
});
