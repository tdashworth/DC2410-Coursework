import React from 'react';
import AdoptionRequestCard from './AdoptionRequestCard';
import Emoji from '../Emoji';
import { AdoptionRequestStatus } from 'dc2410-coursework-common';
import API from '../../helpers/api';

class AdoptionRequestInternalCard extends AdoptionRequestCard {
  public render = () => (
    <div className={`list-group-item text-dark ${this.getItemTheme()}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <a href={`/animal/${this.props.request.animal.id}`}>
            {this.props.request.animal.name}
          </a>
        </h5>
        <small>{this.getStatusText()}</small>
      </div>

      <p className="mb-1">
        <span style={{ fontWeight: 'bold' }}>
          {this.props.request.user.displayName}{' '}
        </span>
        has made a request for adoption.
      </p>

      {this.props.request.status === AdoptionRequestStatus.Pending ? (
        <div className="mt-2">
          <button className="btn btn-success mr-2" onClick={this.handleApprove}>
            Approve <Emoji symbol="✔" />
          </button>
          <button className="btn btn-danger" onClick={this.handleDeny}>
            Deny <Emoji symbol="❌" />
          </button>
        </div>
      ) : null}
    </div>
  )

  private handleApprove = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await API.requests.approve(this.props.request);
      await this.props.update();
    } catch (e) {
      this.props.AppContext!.setError(
        new Error(
          'Something when wrong. Please try again or contact us if this continues to happen.',
        ),
      );
    }
  }

  private handleDeny = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await API.requests.deny(this.props.request);
      await this.props.update();
    } catch (e) {
      this.props.AppContext!.setError(
        new Error(
          'Something when wrong. Please try again or contact us if this continues to happen.',
        ),
      );
    }
  }
}

export default AdoptionRequestInternalCard;
