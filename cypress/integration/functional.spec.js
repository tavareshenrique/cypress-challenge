/// <reference types="Cypress" />

describe('Should test at a functional level', () => {
  before(() => {
    cy.visit('http://barrigareact.wcaquino.me/');

    cy.get('[data-test=email]').type('ihenrits@gmail.com')
    cy.get('[data-test=passwd]').type('123123')
    cy.get('.btn').click()

    cy.get('.toast-message').should('contain', 'Bem vindo')
  })

  it('teste', () => {
    
  })
})

