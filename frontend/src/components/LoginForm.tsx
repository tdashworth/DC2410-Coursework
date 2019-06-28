// tslint:disable-next-line: import-name
import React from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { withAppContext, IAppContext } from "../AppContext";
import { setSession } from "../helpers/session";
import { UserType } from "dc2410-coursework-common";

interface Props {
  className: string;
  AppContext?: IAppContext;
}

interface State {
  email: string;
  password: string;
}

class LoginForm extends React.Component<Props, State> {
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
                  this.setState({ email: e.target.value })
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
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );

  private handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Handling login...");
    event.preventDefault();

    const { email, password } = this.state;
    try {
      const response = await axios.post<{ token: string; expiry: string }>(
        "/api/users/login",
        { email, password }
      );
      const { token, expiry } = response.data;
      setSession(token, expiry);
      this.props.AppContext!.setUser({
        username: "tom",
        displayName: "Tom",
        hash: "",
        type: UserType.Internal
      });
    } catch (error) {
      console.log(error);
      // this.setState({ error: 'Something went wrong' });
    } finally {
      // this.setState({ isRequesting: false });
    }
  };
}

export default withAppContext(LoginForm);
