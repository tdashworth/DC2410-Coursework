import { IUserApi, IUser, IAuthResponse } from 'dc2410-coursework-common';
import Session from './Session';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getJSON = async (url: string, headers = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers },
  })
  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
}

const postJSON = async (url: string, body = {}, headers = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { ...jsonHeaders, ...headers },
  })
  const data = await response.json();

  if (response.status !== 200) throw new Error(data.error);

  return data;
}

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
