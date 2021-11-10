import locators from './locators';

Cypress.Commands.add('login', (user, password) => {
  cy.visit('http://barrigareact.wcaquino.me/');
  cy.get(locators.LOGIN.USER).type(user);
  cy.get(locators.LOGIN.PASSWORD).type(password);
  cy.get(locators.LOGIN.BTN_LOGIN).click();
  cy.get(locators.MESSAGE).should('contain', 'Bem vindo', { timeout: 10000 });
});

Cypress.Commands.add('resetApp', () => {
  cy.get(locators.MENU.SETTINGS).click();
  cy.get(locators.MENU.RESET).click();
});

Cypress.Commands.add('getToken', (user, password) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email: user,
      senha: password,
      redirecionar: false,
    },
  }).its('body.token').should('not.be.empty')
    .then((token) => token);
});

Cypress.Commands.add('resetRest', (token) => {
  cy.request({
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
    },
    url: '/reset',
  }).its('status').should('be.equal', 200);
});

Cypress.Commands.add('getAccountByName', (accountName, token) => {
  cy.request({
    method: 'GET',
    url: '/contas',
    headers: {
      Authorization: `JWT ${token}`,
    },
    qs: {
      nome: accountName,
    },
  }).then((res) => res.body[0].id);
});
