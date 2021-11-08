import locators from './locators'

Cypress.Commands.add('login', (user, password) => {
  cy.visit('http://barrigareact.wcaquino.me/');
  cy.get(locators.LOGIN.USER).type(user)
  cy.get(locators.LOGIN.PASSWORD).type(password)
  cy.get(locators.LOGIN.BTN_LOGIN).click()
  cy.get(locators.MESSAGE).should('contain', 'Bem vindo', { timeout: 10000 })
})

Cypress.Commands.add('resetApp', () => {
  cy.get(locators.MENU.SETTINGS).click()
  cy.get(locators.MENU.RESET).click()
})