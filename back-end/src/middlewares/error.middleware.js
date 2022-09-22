const ErrorMiddleware = (err, _req, res, _next) => {
  const { message, code } = err;

  res.status(code || 500).json({ message });
};

export default ErrorMiddleware;