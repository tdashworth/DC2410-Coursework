import axios from 'axios';
import Session from './Session';
import { UserApi, User } from 'dc2410-coursework-common';

export default class API {
  public static users: UserApi = {
    login: (username, password) =>
      axios
        .post<{ token: string; expiry: string }>('/api/users/login', {
          username,
          password,
        })
        .then(response => response.data),
    profile: () =>
      axios
        .get<User>('/api/users/profile', { headers: Session.getAuthHeaders() })
        .then(response => response.data),
  };
};
