class ErrorCode extends Error {
  code = 500;
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export default ErrorCode;