/* eslint-disable no-unused-expressions */
/// <reference types="Cypress" />

import '../support/commandsAccount';

import locators from '../support/locators';
import buildEnv from '../support/buildEnv';

describe('Should test at a functional level', () => {
  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnv();

    cy.login('ihenrits@gmail.com', 'senha errada');

    cy.get(locators.MENU.HOME).click();
  });

  it('should create an account', () => {
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
    }).as('accountsSaves');

    cy.addAccount('Test Account');

    cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso', {
      timeout: 10000,
    });
  });

  it('should update an account', () => {
    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: {
        id: 1,
        nome: 'Updated Account',
        visivel: true,
        usuario_id: 1,
      },
    }).as('updated account');

    cy.get(locators.MENU.SETTINGS).click();
    cy.get(locators.MENU.ACCOUNTS).click();

    cy.xpath(locators.ACCOUNTS.XP_BTN_CHANGE('Carteira')).click();

    cy.get(locators.ACCOUNTS.NOME)
      .clear()
      .type('Updated Account');
    cy.get(locators.ACCOUNTS.BTN_SAVE).click();

    cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso', {
      timeout: 10000,
    });
  });

  it('should not create an account with same name', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { error: 'Já existe uma conta com esse nome!' },
      status: 400,
    }).as('same name');

    cy.accessAccountMenu();

    cy.addAccount('Conta mesmo nome');

    cy.get(locators.MESSAGE).should('contain', 'code 400', {
      timeout: 10000,
    });
  });

  it('should create a transaction', () => {
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        id: 31433,
        descricao: 'test',
        envolvido: 'test_envolvido',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2021-11-16T03:00:00.000z',
      },
    });

    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:transactionsSaved',
    });

    cy.get(locators.MENU.TRANSACTIONS).click();

    cy.get(locators.TRANSACTIONS.DESCRIPTION).type('Salário');
    cy.get(locators.TRANSACTIONS.VALUE).type('123');
    cy.get(locators.TRANSACTIONS.INTERESTED).type('Itaú');
    cy.get(locators.TRANSACTIONS.ACCOUNT).select('Banco');
    cy.get(locators.TRANSACTIONS.STATUS).click();
    cy.get(locators.TRANSACTIONS.BTN_SAVE).click();

    cy.get(locators.MESSAGE).should('contain', 'sucesso');

    cy.get(locators.EXTRACT.LINES).should('have.length', 7);
    cy.xpath(locators.EXTRACT.XP_SEARCH_ELEMENT).should('exist');
  });

  it('should get balance', () => {
    cy.route({
      method: 'GET',
      url: '/transacoes/**',
      response: {
        conta: 'Conta para saldo', id: 854847, descricao: 'Movimentacao 1, calculo saldo', envolvido: 'CCC', observacao: null, tipo: 'REC', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '100.00', status: false, conta_id: 919619, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
      },
    });

    cy.route({
      method: 'PUT',
      url: '/transacoes/**',
      response: {
        conta: 'Conta para saldo', id: 854847, descricao: 'Movimentacao 1, calculo saldo', envolvido: 'CCC', observacao: null, tipo: 'REC', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '100.00', status: false, conta_id: 919619, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
      },
    });

    cy.get(locators.MENU.HOME).click();
    cy.xpath(locators.BALANCE.FN_XP_SALDO_CONTA('Fake Account')).should('contain', '100,00');

    cy.get(locators.MENU.EXTRACT).click();
    cy.xpath(locators.EXTRACT.FN_XP_ALTERAR_ELEMENT('Movimentacao 1, calculo saldo')).click();

    cy.get(locators.TRANSACTIONS.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo');
    cy.get(locators.TRANSACTIONS.STATUS).click();
    cy.get(locators.TRANSACTIONS.BTN_SAVE).click();
    cy.get(locators.MESSAGE).should('contain', 'sucesso');

    cy.get(locators.MESSAGE).should('not.have.value', 'sucesso');

    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [
        {
          conta_id: 999,
          conta: 'Fake Account',
          saldo: '200.00',
        },
        {
          conta_id: 998,
          conta: 'Fake Account Two',
          saldo: '5500.00',
        },
      ],
    }).as('balance');

    cy.get(locators.MENU.HOME).click();

    cy.xpath(locators.BALANCE.FN_XP_SALDO_CONTA('Fake Account')).should('contain', '200,00');
  });

  it('should remove a transaction', () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204,
    }).as('del');

    cy.get(locators.MENU.EXTRACT).click();

    cy.xpath(locators.EXTRACT.FN_XP_REMOVE_ELEMENT('Movimentacao para extrato')).click();

    cy.get(locators.MESSAGE).should('contain', 'sucesso');
  });

  it.only('should validate data send to create an account', () => {
    const reqStub = cy.stub();

    cy.route({
      method: 'POST',
      url: '/contas',
      response: {
        id: 3,
        nome: 'Conta de Teste',
        visivel: true,
        usuario_id: 1,
      },
      onRequest: (req) => {
        expect(req.request.body.nome).to.be.empty;
        expect(req.request.headers).to.have.property('Authorization');
      },
      // onRequest: reqStub,
    }).as('saveAccount');

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
    }).as('accountsSaves');

    cy.addAccount('{CONTROL}');

    // cy.wait('@saveAccount').its('request.body.nome').should('be.empty');
    // cy.wait('@saveAccount').then(() => {
    //   expect(reqStub.args[0][0].request.body.nome).to.be.empty;
    //   expect(reqStub.args[0][0].request.headers).to.have.property('Authorization');
    // });

    cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso', {
      timeout: 10000,
    });
  });
});
