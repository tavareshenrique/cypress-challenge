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
    cy.resetRest(token)
  })

  it('should create an account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
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
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      qs: {
        nome: 'Conta para alterar',
      },
    }).then(res => {
      cy.request({
        method: 'PUT',
        url: `/contas/${res.body[0].id}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          nome: 'Conta elterada via rest',
        }
      }).as('response')

      cy.get('@response').its('status').should('be.equal', 200)
    })

    
  })

  it.only('should not create an account with same name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      body: {
        nome: 'Conta mesmo nome',
      },
      failOnStatusCode: false,
    }).as('response') 

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
    })   
  })

  it('should create a transaction', () => {
    
  })

  it('should get balance', () => {
    
  })

  it('should remove a transaction', () => {
   
  })
})

