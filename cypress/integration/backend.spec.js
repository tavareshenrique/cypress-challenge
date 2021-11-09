/// <reference types="Cypress" />

describe('Should test at a functional level', () => {
  let token;

  before(() => {
    cy.getToken('ihenrits@gmail.com', '123123')
      .then((tokenResponse) => {
        token = tokenResponse
      })
  })

  beforeEach(() => {
    // cy.get(locators.MENU.HOME).click()
    // cy.resetApp()
  })

  it.only('should create an account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      body: {
        nome: 'Conta via rest',
      },
    }).as('response') 

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })   
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

