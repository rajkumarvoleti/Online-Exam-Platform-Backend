import { Session } from "express-session";

export interface ISession extends Session {
  isAuth?: boolean,
  user?: any,
}

export interface IHttpRequest {
  body: any;
  query: any;
  params: any;
  session: ISession;
  ip: string;
  method: string;
  path: string;
  headers: {
    'Content-Type': string | undefined;
    Referer: string | undefined;
    'User-Agent': string | undefined;
  };
}

export interface IHttpResponse {
  headers?: { [key: string]: string };
  statusCode: number;
  body: any;
  session: ISession;
  clearCookie: boolean;
}
