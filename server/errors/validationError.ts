import AppError from "./appError.js";

class ValidationError extends AppError {
  constructor(message: string, statusCode: number, validationIssues: Object) {
    super(message, statusCode);
    this.specifications = { validationIssues, isValidationError: true };

    //Error.captureStackTrace(this, this.constructor);
  }
}

export default ValidationError;
