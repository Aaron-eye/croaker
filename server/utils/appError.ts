//@ts-nocheck

class AppError extends Error {
  constructor(message: string, statusCode: number, specifications: any = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.specifications = specifications;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
