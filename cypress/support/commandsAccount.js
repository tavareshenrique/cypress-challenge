import locators from './locators';

Cypress.Commands.add('accessAccountMenu', () => {
  cy.get(locators.MENU.SETTINGS).click();
  cy.get(locators.MENU.ACCOUNTS).click();
});

Cypress.Commands.add('addAccount', (accountName) => {
  cy.get(locators.ACCOUNTS.NOME).type(accountName);
  cy.get(locators.ACCOUNTS.BTN_SAVE).click();
});
