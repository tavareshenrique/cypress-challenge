const buildEnv = () => {
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
  }).as('accounts');

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [{
      conta: 'Conta para movimentacoes', id: 854851, descricao: 'Movimentacao de conta', envolvido: 'BBB', observacao: null, tipo: 'DESP', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '-1500.00', status: true, conta_id: 919618, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }, {
      conta: 'Conta com movimentacao', id: 854846, descricao: 'Movimentacao de conta', envolvido: 'BBB', observacao: null, tipo: 'DESP', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '-1500.00', status: true, conta_id: 919618, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }, {
      conta: 'Conta para saldo', id: 854847, descricao: 'Movimentacao 1, calculo saldo', envolvido: 'CCC', observacao: null, tipo: 'REC', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '3500.00', status: false, conta_id: 919619, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }, {
      conta: 'Conta para saldo', id: 854848, descricao: 'Movimentacao 2, calculo saldo', envolvido: 'DDD', observacao: null, tipo: 'DESP', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '-1000.00', status: true, conta_id: 919619, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }, {
      conta: 'Conta para saldo', id: 854849, descricao: 'Movimentacao 3, calculo saldo', envolvido: 'EEE', observacao: null, tipo: 'REC', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '1534.00', status: true, conta_id: 919619, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }, {
      conta: 'Conta para extrato', id: 854850, descricao: 'Movimentacao para extrato', envolvido: 'FFF', observacao: null, tipo: 'DESP', data_transacao: '2021-11-10T03:00:00.000Z', data_pagamento: '2021-11-10T03:00:00.000Z', valor: '-220.00', status: true, conta_id: 919620, usuario_id: 25902, transferencia_id: null, parcelamento_id: null,
    }],
  });
};

export default buildEnv;
