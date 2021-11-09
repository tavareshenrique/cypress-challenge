/// <reference types="Cypress" />

import faker from 'faker';

import '../support/commandsAccount'

import locators from '../support/locators';

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('ihenrits@gmail.com', '123123')
    cy.resetApp()
  })

  it('should create an account', () => {

    cy.accessAccountMenu()
    cy.addAccount('Test Account')

    cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso', {
      timeout: 10000
    })
  })

  it('should update an account', () => {

    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.ACCOUNTS).click()

    cy.xpath(locators.ACCOUNTS.XP_BTN_CHANGE).click()

    cy.get(locators.ACCOUNTS.NOME)
      .clear()
      .type('Updated Account')
    cy.get(locators.ACCOUNTS.BTN_SAVE).click()

    cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso', {
      timeout: 10000
    })
  })

  it('should not create an account with same name', () => {
    cy.accessAccountMenu()

    cy.addAccount('Updated Account')

    cy.get(locators.ACCOUNTS.BTN_SAVE).click()

    cy.get(locators.MESSAGE).should('contain', 'code 400', {
      timeout: 10000
    })
  })

  it('should create a transaction', () => {
    cy.get(locators.MENU.TRANSACTIONS).click()

    cy.get(locators.TRANSACTIONS.DESCRIPTION).type('Salário')
    cy.get(locators.TRANSACTIONS.VALUE).type('123')
    cy.get(locators.TRANSACTIONS.INTERESTED).type(faker.finance.account())
    cy.get(locators.TRANSACTIONS.ACCOUNT).select('Conta com movimentacao')
    cy.get(locators.TRANSACTIONS.BTN_SAVE).click()

    cy.get(locators.MESSAGE).should('contain', 'sucesso')

    cy.get(locators.EXTRACT.LINES).should('have.length', 7)
    cy.xpath(locators.EXTRACT.XP_SEARCH_ELEMENT).should('exist')
  })

  it('should get balance', () => {
    cy.get(locators.MENU.HOME).click()
    cy.xpath(locators.BALANCE.FN_XP_SALDO_CONTA('Conta com movimentacao')).should('contain', '1.500,00')
  })

  it('should remove a transaction', () => {
    cy.get(locators.MENU.EXTRACT).click()

    cy.xpath(locators.EXTRACT.FN_XP_REMOVE_ELEMENT('Salário')).click()

    cy.get(locators.MESSAGE).should('contain', 'sucesso')

  })
})

