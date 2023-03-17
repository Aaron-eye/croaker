class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  specifications: Object | null;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.specifications = null;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
