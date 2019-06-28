import axios from 'axios';
import { getAuthHeaders } from './session';
import { UserApi, User } from 'Users';

const users: UserApi = {
  login: (username, password) =>
    axios
      .post<{ token: string; expiry: string }>('/api/users/login', {
        username,
        password,
      })
      .then(response => response.data),
  profile: () =>
    axios
      .get<User>('/api/users/profile', { headers: getAuthHeaders() })
      .then(response => response.data),
};

export default {
  users,
};
