import JsonUser from 'app/JsonModels/JsonUser';
import JsonEmployee from 'app/JsonModels/JsonEmployee';

declare global {
  namespace Express {
    interface Request {
      user?: JsonUser;
      employee?: JsonEmployee;
      country?: string;
      defaultLanguage?: string;
    }
    interface Response {
      setPagination: ({ total, page, perPage }: { total: number, page?: number, perPage?: number }) => void;
    }
  }
}