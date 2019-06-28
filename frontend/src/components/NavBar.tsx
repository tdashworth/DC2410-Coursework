// tslint:disable-next-line: import-name
import React from 'react';
import { IAppContext, withAppContext } from '../AppContext';
import { clearSession } from '../helpers/session';

class NavBar extends React.Component<{ AppContext?: IAppContext }> {
  public render = () =>
    this.props.AppContext && (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand mb-0 h1">Aston Animal Sanctuary</span>
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
    clearSession();
  }
}

export default withAppContext(NavBar);
