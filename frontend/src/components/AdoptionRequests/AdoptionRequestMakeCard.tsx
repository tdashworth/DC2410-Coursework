// tslint:disable-next-line: import-name
import React from 'react';
import { IAnimal } from 'dc2410-coursework-common';
import Emoji from '../Emoji';

class AdoptionRequestMakeCard extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <div className="list-group mb-3">
      <div className="list-group-item text-dark">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <a href={`/animals/${this.props.animal.id}`}>{this.props.animal.name}</a>
          </h5>
        </div>
        <p className="mb-1">
          Interested? Make a request for adoption now.
              </p>
        <div className="mt-2">
          <button type="button" className="btn btn-primary">
            Request Adoption <Emoji symbol="📃" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdoptionRequestMakeCard;
