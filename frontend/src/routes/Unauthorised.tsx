// tslint:disable-next-line: import-name
import React from 'react';
import axios from 'axios';
import { setSession } from '../helpers/session';

import WelcomeJumbotron from '../components/WelcomeJumbotron';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

class Unauthorised extends React.Component<{}> {
  public render() {
    return (
      <main className="container mt-5">
        <WelcomeJumbotron />

        <section className="row" id="unauth-forms">
          <LoginForm className="col-lg-4" />
          <RegisterForm className="col-lg-8" />
        </section>
      </main>
    );
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.context;
    try {
      this.setState({ error: '' });
      this.setState({ isRequesting: true });
      const response = await axios.post<{ token: string; expiry: string }>(
        '/api/users/login',
        { email, password },
      );
      const { token, expiry } = response.data;
      setSession(token, expiry);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ isRequesting: false });
    }
  }
}

export default Unauthorised;
