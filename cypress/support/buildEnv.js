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
};

export default buildEnv;
