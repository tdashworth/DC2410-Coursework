import { Request, Response, RequestHandler, NextFunction } from 'express';
import { IUser, AuthToken, UserType } from 'dc2410-coursework-common';
import { sign, decode } from 'jsonwebtoken';
// tslint:disable-next-line: import-name
import Users from './users/users.model';

class Auth {
  public static generateToken(user: IUser): { token: string; expiry: Date } {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    const token = sign(
      {
        id: user.id,
        username: user.username,
        expiry: Math.round(expiry.getTime() / 1000),
      } as AuthToken,
      process.env.AUTH_SHARED_SECRET!,
    );

    return { token, expiry };
  }

  public static decodeToken(jwt: string): AuthToken {
    return decode(jwt) as AuthToken;
  }

  // public static verifyIsInternal(request: Request, response: Response, next: NextFunction): any {

  public static verifyToken(type?: UserType): RequestHandler {
    return (request: Request, response: Response, next: NextFunction): any => {
      try {
        const authorization = request.headers.authorization;
        if (!authorization) {
          throw new Error("No 'authorization' header provided.");
        }

        const token = Auth.decodeToken(authorization.substring(7));
        if (!token) throw new Error('Token not parsable.');
        if (new Date(token.expiry) > new Date()) {
          throw new Error('Token has expired');
        }
        
        Users.get(token.id).then(user => {
          if(!user) throw new Error('User does not exist.');
          if(type && user.type !== type) throw new Error('User is of wrong type.');

          request.params.user = user;
          next();
        });

      } catch (e) {
        console.log(e)
        return response.sendStatus(403);
      }
    };
  }
}

export default Auth;
