// tslint:disable-next-line: import-name
import React from 'react';
import { IAppContextInterface, withAppContext } from '../AppContext';
import Session from '../helpers/Session';

class NavBar extends React.Component<{ AppContext?: IAppContextInterface }> {
  public render = () =>
    this.props.AppContext && (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand mb-0 h1" href="/" style={{ textDecorationLine: 'none' }}>Aston Animal Sanctuary</a>
            🐶 🐱 🐦 🐷
            <div id="nav-right">
              {this.props.AppContext.user ? (
                <form className="form-inline">
                  <span className="navbar-text text-light mr-sm-3">
                    Welcome, {this.props.AppContext.user.displayName}.
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm my-2 my-sm-0"
                    type="button"
                    onClick={this.logout}
                  >
                    Sign out
                  </button>
                </form>
              ) : (
                  <span className="navbar-text text-light">
                    Please log in below.
                </span>
                )}
            </div>
          </div>
        </nav>
      </header>
    )

  private logout = () => {
    this.props.AppContext!.wipeUser();
    Session.clear();
  }
}

export default withAppContext(NavBar);
