import { RequestHandler } from 'express';
import { verifyEmployee, verifyUser } from 'server/services/authToken';
import RequestError, { StatusCodes, ReasonPhrases } from 'shared/RequestError';

export const authMiddleware = (): RequestHandler => async (req, res, next) => {
  req.user = (await verifyUser(req, res))?.user;
  req.employee = (await verifyEmployee(req, res))?.employee;
  next();
};

export const apiValidUser = () => (req, res, next) => {
  if (!req?.user) throw new RequestError({ status: StatusCodes.UNAUTHORIZED, errorMessage: ReasonPhrases.UNAUTHORIZED })
  next();
};

export const apiValidEmployee = () => (req, res, next) => {
  if (!req?.employee) throw new RequestError({ status: StatusCodes.UNAUTHORIZED, errorMessage: ReasonPhrases.UNAUTHORIZED })
  next();
};