/// <reference types="Cypress" />

import faker from 'faker';

describe('Should test at a functional level', () => {
  before(() => {
    cy.visit('http://barrigareact.wcaquino.me/');

    cy.get('[data-test=email]').type('ihenrits@gmail.com')
    cy.get('[data-test=passwd]').type('123123')
    cy.get('.btn').click()

    cy.get('.toast-message').should('contain', 'Bem vindo')
  })

  it('should create an account', () => {
    const accountName = faker.finance.accountName();

    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()

    cy.get('[data-test=nome]').type(accountName)
    cy.get('.btn').click()

    cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    cy.get('.container').should('contain', accountName)
  })
})

