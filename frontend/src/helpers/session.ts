import { IUser } from 'dc2410-coursework-common';

class Session {
  // Set the session in the local storage
  public static set = (token: string, expiry: Date, user: IUser): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiry.toString());
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Clear the session from the local storage
  public static clear = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('user');
  }

  // Checks if the session is valid (locally) according to the expiration time
  public static isValid = (): boolean => {
    const expiry = localStorage.getItem('expiry');
    if (expiry && +new Date(expiry) > +new Date()) {
      return true;
    }
    Session.clear();
    return false;
  }

  public static getUser = (): IUser => {
    const user = localStorage.getItem('user')!;
    return JSON.parse(user) as IUser;
  }

  // Creates the authorization header using the bearer token
  public static getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  })
}

export default Session;
