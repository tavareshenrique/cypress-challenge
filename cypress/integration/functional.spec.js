/// <reference types="Cypress" />

import faker from 'faker';

import locators from '../support/locators';

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('ihenrits@gmail.com', '123123')
    cy.resetApp()
  })

  it('should create an account', () => {
    const accountName = faker.finance.accountName();

    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.ACCOUNTS).click()

    cy.get(locators.ACCOUNTS.NOME).type(accountName)
    cy.get(locators.ACCOUNTS.BTN_SAVE).click()

    cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it.only('should update an account', () => {
    const accountName = faker.finance.accountName();

    cy.get(locators.MENU.SETTINGS).click()
    cy.get(locators.MENU.ACCOUNTS).click()

    cy.xpath(locators.ACCOUNTS.XP_BTN_CHANGE).click()

    cy.get(locators.ACCOUNTS.NOME)
      .clear()
      .type(accountName)
    cy.get(locators.ACCOUNTS.BTN_SAVE).click()

    cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })
})
