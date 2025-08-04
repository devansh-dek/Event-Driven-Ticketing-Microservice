/**
 * Every error class inherit this ensure same structure and type safety
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string){
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors():{
    message: string ,
    field?: string
  }[]
}