/// <reference types="Cypress" />

describe('Should test at a functional level', () => {
  before(() => {
    // cy.login('ihenrits@gmail.com', '123123')
  })

  beforeEach(() => {
    // cy.get(locators.MENU.HOME).click()
    // cy.resetApp()
  })

  it.only('should create an account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {
        email: 'ihenrits@gmail.com',
        senha: '123123',
        redirecionar: false
      }
    }).its('body.token').should('not.be.empty')
  })

  it('should update an account', () => {
  })

  it('should not create an account with same name', () => {
   
  })

  it('should create a transaction', () => {
    
  })

  it('should get balance', () => {
    
  })

  it('should remove a transaction', () => {
   
  })
})

