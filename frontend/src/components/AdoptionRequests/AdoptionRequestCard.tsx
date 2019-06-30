// tslint:disable-next-line: import-name
import React from 'react';
import {
  AdoptionRequestStatus,
  IAdoptionRequest,
} from 'dc2410-coursework-common';

abstract class AdoptionRequestCard extends React.Component<{
  request: IAdoptionRequest;
}> {
  protected getStatusText(): string {
    switch (this.props.request.status) {
      case AdoptionRequestStatus.Approved:
        return 'Approved ✔';
      case AdoptionRequestStatus.Denied:
        return 'Denied ❌';
      case AdoptionRequestStatus.Pending:
        return 'Pending... ⏳';
      default:
        return '';
    }
  }

  protected getItemTheme() {
    switch (this.props.request.status) {
      case AdoptionRequestStatus.Approved:
        return 'list-group-item-success';
      case AdoptionRequestStatus.Denied:
        return 'list-group-item-danger';
      default:
        return '';
    }
  }
}

export default AdoptionRequestCard;
