/// <reference types="Cypress" />

describe('Should test at a functional level', () => {
  let token;

  before(() => {
    cy.getToken('ihenrits@gmail.com', '123123')
      .then((tokenResponse) => {
        token = tokenResponse;
      });
  });

  beforeEach(() => {
    cy.resetRest(token);
  });

  it('should create an account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: {
        nome: 'Conta via rest',
      },
    }).as('response');

    cy.get('@response').then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('nome', 'Conta via rest');
    });
  });

  it('should update an account', () => {
    cy.getAccountByName('Conta para movimentacoes', token).then((accountId) => {
      cy.request({
        method: 'PUT',
        url: `/contas/${accountId}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          nome: 'Conta elterada via rest',
        },
      }).as('response');

      cy.get('@response').its('status').should('be.equal', 200);
    });
  });

  it('should not create an account with same name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: {
        nome: 'Conta mesmo nome',
      },
      failOnStatusCode: false,
    }).as('response');

    cy.get('@response').then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!');
    });
  });

  it('should create a transaction', () => {
    cy.getAccountByName('Conta para movimentacoes', token).then((accountId) => {
      cy.request({
        method: 'POST',
        url: '/transacoes',
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          conta_id: accountId,
          data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: 'Transação via rest',
          envolvido: 'Itaú',
          status: true,
          tipo: 'REC',
          valor: '123',
        },
      }).as('response');
    });

    cy.get('@response').its('status').should('be.equal', 201);
    cy.get('@response').its('body.id').should('exist');
  });

  it('should get balance', () => {

  });

  it('should remove a transaction', () => {

  });
});
