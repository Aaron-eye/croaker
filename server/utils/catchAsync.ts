import { RequestHandler } from "express";
export default (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);

    /*try {
      Promise.resolve(fn(req, res, next));
    } catch (err) {
      console.log(err);
    }*/
  };
};
