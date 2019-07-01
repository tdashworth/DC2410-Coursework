import { IUserApi, IUser, IAuthResponse } from 'dc2410-coursework-common';
import Session from './Session';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getJSON = (url: string , headers = {}) => fetch(url, {
  method: 'GET',
  headers: { ...jsonHeaders, ...headers },
}).then((response) => response.json())

const postJSON = (url: string , body = {}, headers = {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { ...jsonHeaders, ...headers },
}).then((response) => response.json())

export default class API {
  public static users: IUserApi = {
    login: (username, password) => postJSON(
      '/api/users/login', 
      { username, password }
    ) as Promise<IAuthResponse>,

    profile: () => getJSON(
      '/api/users/profile',
      Session.getAuthHeaders()
    ) as Promise<IUser>,

    register: (user: IUser) => postJSON(
      '/api/users/register',
      user
    ) as Promise<IUser>,
  };
}
