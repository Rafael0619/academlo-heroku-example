class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    Error.captureStackTrace(this, this.constructor);

    // if (String(statusCode).startsWith("4")) {
    //   this.status = "error";
    // } else if (String(statusCode).startsWith("5")) {
    //   this.status = "fail";
    // }
  }
}

module.exports = { AppError };
