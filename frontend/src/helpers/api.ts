import { IUserApi, IAdoptionRequestApi, IAnimalApi } from 'dc2410-coursework-common';
import Session from './Session';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getJSON = async (url: string, headers = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
};

const postJSON = async (url: string, body = {}, headers = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { ...jsonHeaders, ...headers },
  });
  const data = await response.json();

  if (response.status !== 200) throw new Error(data.error);

  return data;
};

export default class API {
  public static users: IUserApi = {
    login: (username, password) => postJSON(
      '/api/users/login',
      { username, password },
    ),

    profile: () => getJSON(
      '/api/users/profile',
      Session.getAuthHeaders(),
    ),

    register: user => postJSON(
      '/api/users/register',
      user,
    ),
  };

  public static requests: IAdoptionRequestApi = {
    create: request => postJSON(
      '/api/requests/',
      request,
      Session.getAuthHeaders(),
    ),
    listAll: () => getJSON(
      '/api/requests/',
      Session.getAuthHeaders(),
    ),
    forAnimal: id => getJSON(
      `/api/requests/animal/${id}`,
      Session.getAuthHeaders(),
    ),
    approve: id => getJSON(
      `/api/requests/${id}/approve`,
      Session.getAuthHeaders(),
    ),
    deny: id => getJSON(
      `/api/requests/${id}/deny`,
      Session.getAuthHeaders(),
    ),
  };

  public static animals: IAnimalApi = {
    create: animal => postJSON(
      '/api/animals/',
      animal,
      Session.getAuthHeaders(),
    ),
    listAll: () => getJSON(
      '/api/animals/',
      Session.getAuthHeaders(),
    ),
    get: id => getJSON(
      `/api/animals/${id}`,
      Session.getAuthHeaders(),
    ),
    update: (id, animal) => postJSON(
      `/api/animals/${id}`,
      animal,
      Session.getAuthHeaders(),
    ),
  };
}
