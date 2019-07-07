import React from 'react';
import FormInput from './Forms/FormInput';
import API from '../helpers/api';
import { IAppContextInterface, withAppContext } from '../AppContext';
import Session from '../helpers/session';
import { UserType } from 'dc2410-coursework-common';

interface IProps {
  className?: string;
  AppContext?: IAppContextInterface;
}

interface IState {
  username: string;
  displayName: string;
  password: string;
  passwordConfirmation: string;
  isRequesting: boolean;
}

class RegisterForm extends React.Component<IProps, IState> {
  public state: IState = {
    username: '',
    displayName: '',
    password: '',
    passwordConfirmation: '',
    isRequesting: false,
  };

  public render = () => (
    <div className={this.props.className}>
      <div className="card" id="register-form">
        <h3 className="card-header">Register</h3>
        <form className="card-body container" onSubmit={this.handleRegister}>
          <div className="row">
            <FormInput
              className="col-md-6"
              type="text"
              id="register-username-form"
              label="Username"
              icon="😀"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ username: e.target.value })
              }
              required={true}
            />
            <FormInput
              className="col-md-6"
              type="text"
              id="register-name-form"
              label="Display Name"
              icon="😁"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ displayName: e.target.value })
              }
              required={true}
            />
          </div>
          <div className="row">
            <FormInput
              className="col-md-6"
              type="password"
              id="register-password-form"
              label="Password"
              icon="🔑"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ password: e.target.value })
              }
              required={true}
            />
            <FormInput
              className="col-md-6"
              type="password"
              id="register-paasword2-form"
              label="Password confirmation"
              icon="🗝"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ passwordConfirmation: e.target.value })
              }
              required={true}
            />
          </div>
          <div className="row">
            <div className="col-12">
              <button
              type="submit"
              className={`btn btn-primary w-100 mb-2 ${this.state.isRequesting ? 'progress-bar-striped progress-bar-animated' : ''}`} >
                Create & log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  private handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      this.setState({ isRequesting: true });
      if (this.state.password !== this.state.passwordConfirmation) throw new Error('Passwords are not the same.');

      await API.users.register({
        username: this.state.username,
        displayName: this.state.displayName,
        passwordHash: this.state.password,
        type: UserType.External,
      });

      const { token, expiry, user } = await API.users.login(this.state.username, this.state.password);
      Session.set(token, expiry, user);
      this.props.AppContext!.setUser(user);
    } catch (e) {
      console.log(e);
      this.props.AppContext!.setError(e);
    } finally {
      this.setState({ isRequesting: false });
    }
  }
}

export default withAppContext(RegisterForm);
