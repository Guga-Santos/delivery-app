const prefix = "common_login__"
module.exports = {
  element: {
    invalidLogin: `[data-testid='${prefix}element-invalid-email']`
  },
  input: {
    login: `input[data-testid='${prefix}input-email']`,
    password: `input[data-testid='${prefix}input-password']`,
  },
  button: {
    login: {
      default: `button[data-testid='${prefix}button-login']`,
      disabled: `button[data-testid='${prefix}button-login'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-login']:not([disabled])`
    },
    register: `button[data-testid='${prefix}button-register']`
  }
}
