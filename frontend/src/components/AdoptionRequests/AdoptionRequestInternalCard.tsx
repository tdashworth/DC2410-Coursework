// tslint:disable-next-line: import-name
import React from 'react';
import AdoptionRequestCard from './AdoptionRequestCard';
import Emoji from '../Emoji';
import { AdoptionRequestStatus } from 'dc2410-coursework-common';

class AdoptionRequestInternalCard extends AdoptionRequestCard {
  public render = () => (
    <div className={`list-group-item text-dark ${this.getItemTheme()}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <a href="/animal/">{this.props.request.animal.name}</a>
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
          <button type="button" className="btn btn-success mr-2">
            Approve <Emoji symbol="✔" />
          </button>
          <button type="button" className="btn btn-danger">
            Deny <Emoji symbol="❌" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default AdoptionRequestInternalCard;
