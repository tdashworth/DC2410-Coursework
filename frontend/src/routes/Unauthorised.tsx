import React from 'react';

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
}

export default Unauthorised;
