const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNTS: '[href="/contas"]',
    RESET: '[href="/reset"]',
    TRANSACTIONS: '[href="/movimentacao"]',
  },
  ACCOUNTS: {
    NOME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    XP_BTN_CHANGE: "//table//td[contains(., 'Test Account')]/..//i[@class='far fa-edit']"
  },
  TRANSACTIONS: {
    DESCRIPTION: '[data-test=descricao]',
    VALUE: '[data-test=valor]',
    INTERESTED: '[data-test=envolvido]',
    ACCOUNT: '[data-test=conta]',
    STATUS: '[data-test=status]',
    BTN_SAVE: '.btn-primary',
  },
  EXTRACT: {
    LINES: '.list-group > li',
    XP_SEARCH_ELEMENT: "//span[contains(., 'Salário')]//following-sibling::small[contains(., '123')]"
  },
  BALANCE: {
    FN_XP_SALDO_CONTA: (name) => `//td[contains(., '${name}')]//../td[2]`
  },
  MESSAGE: '.toast-message',
}

export default locators;