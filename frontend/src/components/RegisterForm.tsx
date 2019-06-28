// tslint:disable-next-line: import-name
import React from 'react';
import FormInput from './FormInput';

class RegisterForm extends React.Component<{ className: string }> {
  public render = () => (
    <div className={this.props.className}>
      <div className="card" id="register-form">
        <h3 className="card-header">Register</h3>
        <form className="card-body container">
          <div className="row">
            <FormInput
              className="col-md-6"
              type="text"
              id="register-username-form"
              label="Username"
              icon="😀"
            />
            <FormInput
              className="col-md-6"
              type="text"
              id="register-name-form"
              label="Display Name"
              icon="😁"
            />
          </div>
          <div className="row">
            <FormInput
              className="col-md-6"
              type="password"
              id="register-password-form"
              label="Password"
              icon="🔑"
            />
            <FormInput
              className="col-md-6"
              type="password"
              id="register-paasword2-form"
              label="Password confirmation"
              icon="🗝"
            />
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Create & log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
