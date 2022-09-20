const prefix = "common_register__"
module.exports = {
  element: {
    invalidRegister: `[data-testid='${prefix}element-invalid_register']`
  },
  input: {
    name: `input[data-testid='${prefix}input-name']`,
    email: `input[data-testid='${prefix}input-email']`,
    password: `input[data-testid='${prefix}input-password']`,
  },
  button: {
    register: {
      default: `button[data-testid='${prefix}button-register']`,
      disabled: `button[data-testid='${prefix}button-register'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-register']:not([disabled])`
    }
  }
}
