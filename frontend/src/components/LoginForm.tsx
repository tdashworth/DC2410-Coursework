import React from 'react';
import FormInput from './FormInput';
import { withAppContext, IAppContextInterface } from '../AppContext';
import Session from '../helpers/Session';
import API from '../helpers/API';

interface IProps {
  className: string;
  AppContext?: IAppContextInterface;
}

interface IState {
  username: string;
  password: string;
  isRequesting: boolean;
}

class LoginForm extends React.Component<IProps, IState> {
  public state: IState = {
    username: '',
    password: '',
    isRequesting: false,
  };

  public render = () =>
    this.props.AppContext && (
      <div className={this.props.className}>
        <div className="card" id="login-form">
          <h3 className="card-header">Login</h3>
          <form className="card-body container" onSubmit={this.handleLogin}>
            <div className="row">
              <FormInput
                className="col-md-12"
                type="text"
                id="login-username-form"
                label="Username"
                icon="🧑"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ username: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="row">
              <FormInput
                className="col-md-12"
                type="password"
                id="login-paasword-form"
                label="Password"
                icon="🔐"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ password: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  className={`btn btn-primary w-100 mb-2 ${this.state.isRequesting ? 'progress-bar-striped progress-bar-animated' : ''}`} >
                    Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )

  private handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = this.state;
    try {
      this.setState({ isRequesting: true });
      const { token, expiry, user } = await API.users.login(username, password);
      Session.set(token, expiry, user);
      this.props.AppContext!.setUser(user);
    } catch (e) {
      console.log(e);
      this.props.AppContext!.setError(e);
      // alert('Login failed. Please try with different username and password.');
    } finally {
      this.setState({ isRequesting: false });
    }
  }
}

export default withAppContext(LoginForm);
