import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { Request, Response } from 'express';
import JsonUser from '~/JsonModels/JsonUser';
import JsonEmployee from '~/JsonModels/JsonEmployee';

const { JWT_SECRET } = process.env;

// User token

export const wrapUserIntoCookie = (req: Request, res: Response, user: JsonUser) => {
  const token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
  const cookies = new Cookies(req, res);
  cookies.set('verify-token', token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
}

export const clearUserCookie = (req: Request, res: Response) => {
  const cookies = new Cookies(req, res);
  cookies.set('verify-token', null);
}

export const verifyUser = (req: Request, res: Response) => new Promise<{ token: string, user: JsonUser }>((r) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('verify-token');
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        r(null);
      } else {
        r({ token, user: decoded as JsonUser });
      }
    });
  } else {
    r(null)
  }
});

// Admin token

export const wrapEmployeeIntoCookie = (req: Request, res: Response, employee: JsonEmployee) => {
  const token = jwt.sign({ ...employee }, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
  const cookies = new Cookies(req, res);
  cookies.set('employee-token', token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
}

export const clearEmployeeCookie = (req: Request, res: Response) => {
  const cookies = new Cookies(req, res);
  cookies.set('employee-token', null);
}

export const verifyEmployee = (req: Request, res: Response) => new Promise<{ token: string, employee: JsonEmployee }>((r) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('employee-token');
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        r(null);
      } else {
        r({ token, employee: decoded as JsonEmployee });
      }
    });
  } else {
    r(null)
  }
});

// Data token

export const genDataToken = (data: Record<any, any>, expiresIn: number = 60 * 15) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn })
}

export const verifyDataToken = <T = any>(token) => {
  return new Promise<T>((r) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        r(null);
      } else {
        r(decoded);
      }
    });
  });
};