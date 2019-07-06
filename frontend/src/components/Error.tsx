import React from 'react';
import { IAppContextInterface, withAppContext } from '../AppContext';

interface IProps {
  AppContext?: IAppContextInterface;
}

class Error extends React.Component<IProps> {
  public render = () =>
    this.props.AppContext!.error ? (
      <div className="container mt-3">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.props.AppContext!.error!.message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {!setTimeout(this.handleClose, 5000) || null}
      </div>
    ) : null

  private handleClose = () => this.props.AppContext!.wipeError();
}

export default withAppContext(Error);
