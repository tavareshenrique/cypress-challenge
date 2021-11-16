/// <reference types="Cypress" />

import '../support/commandsAccount';

import locators from '../support/locators';

describe('Should test at a functional level', () => {
  after(() => {
    cy.clearLocalStorage();
  });

  before(() => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/signin',
      response: {
        id: 1000,
        nome: 'Fake User',
        token: 'fake-token',
      },
    }).as('signin');

    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [
        {
          conta_id: 999,
          conta: 'Fake Account',
          saldo: '100.00',
        },
        {
          conta_id: 998,
          conta: 'Fake Account Two',
          saldo: '5500.00',
        },
      ],
    }).as('balance');

    cy.login('ihenrits@gmail.com', 'senha errada');
  });

  beforeEach(() => {
    cy.get(locators.MENU.HOME).click();
  });

  it.only('should create an account', () => {
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        {
          id: 1,
          nome: 'Carteira',
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 2,
          nome: 'Banco',
          visivel: true,
          usuario_id: 1,
        },
      ],
    }).as('contas');

    cy.route({
      method: 'POST',
      url: '/contas',
      response: {
        id: 3,
        nome: 'Conta de Teste',
        visivel: true,
        usuario_id: 1,
      },
    });

    cy.accessAccountMenu();

    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        {
          id: 1,
          nome: 'Carteira',
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 2,
          nome: 'Banco',
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 3,
          nome: 'Conta de Teste',
          visivel: true,
          usuario_id: 1,
        },
      ],
    }).as('contasSave');

    cy.addAccount('Test Account');

    cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso', {
      timeout: 10000,
    });
  });

  it('should update an account', () => {
    cy.get(locators.MENU.SETTINGS).click();
    cy.get(locators.MENU.ACCOUNTS).click();

    cy.xpath(locators.ACCOUNTS.XP_BTN_CHANGE('Conta para alterar')).click();

    cy.get(locators.ACCOUNTS.NOME)
      .clear()
      .type('Updated Account');
    cy.get(locators.ACCOUNTS.BTN_SAVE).click();

    cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso', {
      timeout: 10000,
    });
  });

  it('should not create an account with same name', () => {
    cy.accessAccountMenu();

    cy.addAccount('Conta mesmo nome');

    cy.get(locators.ACCOUNTS.BTN_SAVE).click();

    cy.get(locators.MESSAGE).should('contain', 'code 400', {
      timeout: 10000,
    });
  });

  it('should create a transaction', () => {
    cy.get(locators.MENU.TRANSACTIONS).click();

    cy.get(locators.TRANSACTIONS.DESCRIPTION).type('Salário');
    cy.get(locators.TRANSACTIONS.VALUE).type('123');
    cy.get(locators.TRANSACTIONS.INTERESTED).type('Itaú');
    cy.get(locators.TRANSACTIONS.ACCOUNT).select('Conta para movimentacoes');
    cy.get(locators.TRANSACTIONS.STATUS).click();
    cy.get(locators.TRANSACTIONS.BTN_SAVE).click();

    cy.get(locators.MESSAGE).should('contain', 'sucesso');

    cy.get(locators.EXTRACT.LINES).should('have.length', 7);
    cy.xpath(locators.EXTRACT.XP_SEARCH_ELEMENT).should('exist');
  });

  it('should get balance', () => {
    cy.get(locators.MENU.HOME).click();
    cy.xpath(locators.BALANCE.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00');

    cy.get(locators.MENU.EXTRACT).click();
    cy.xpath(locators.EXTRACT.FN_XP_ALTERAR_ELEMENT('Movimentacao 1, calculo saldo')).click();

    cy.get(locators.TRANSACTIONS.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo');
    cy.get(locators.TRANSACTIONS.STATUS).click();
    cy.get(locators.TRANSACTIONS.BTN_SAVE).click();
    cy.get(locators.MESSAGE).should('contain', 'sucesso');

    cy.get(locators.MESSAGE).should('not.have.value', 'sucesso');

    cy.wait(1000);

    cy.get(locators.MENU.HOME).click();

    cy.xpath(locators.BALANCE.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00');
  });

  it('should remove a transaction', () => {
    cy.get(locators.MENU.EXTRACT).click();

    cy.xpath(locators.EXTRACT.FN_XP_REMOVE_ELEMENT('Movimentacao para exclusao')).click();

    cy.get(locators.MESSAGE).should('contain', 'sucesso');
  });
});
