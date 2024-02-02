describe('Promotions Spec', () => {
  it('should be able to type 4070 Ti and press enter', () => {
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.visit('http://localhost:3000')

    cy.get('input').type('camiseta{enter}')
  })
})
