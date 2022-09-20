const prefix = "admin_manage__";
module.exports = {
  element: {
    userTable: {
      itemNumber: `[data-testid^='${prefix}element-user-table-item-number-']`,
      name: `[data-testid^='${prefix}element-user-table-name-']`,
      email: `[data-testid^='${prefix}element-user-table-email-']`,
      role: `[data-testid^='${prefix}element-user-table-role-']`,
      remove: `[data-testid^='${prefix}element-user-table-remove-']`,
    },
    invalidRegister: `[data-testid^='${prefix}element-invalid-register']`
  },
  input: {
    name: `input[data-testid='${prefix}input-name']`,
    email: `input[data-testid='${prefix}input-email']`,
    password: `input[data-testid^='${prefix}input-password']`,
  },
  select: {
    role: `select[data-testid='${prefix}select-role']`,
  },
  button: {
    register: {
      default: `button[data-testid='${prefix}button-register']`,
      disabled: `button[data-testid='${prefix}button-register'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-register']:not([disabled])`,
    },
  },
};
