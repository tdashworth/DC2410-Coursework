import React from 'react';
import { IAnimal, IUser, AdoptionRequestStatus } from 'dc2410-coursework-common';
import Emoji from '../Emoji';
import API from '../../helpers/API';

interface IProps {
  animal: IAnimal;
  user: IUser;
  update: () => void;
}

class AdoptionRequestMakeCard extends React.Component<IProps> {
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
          <button className="btn btn-primary" onClick={this.handleCreate}>
            Request Adoption <Emoji symbol="📃" />
          </button>
        </div>
      </div>
    </div>
  )

  private handleCreate = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await API.requests.create({
      animal: this.props.animal.id,
      user: this.props.user.id,
      status: AdoptionRequestStatus.Pending,
    });
    await this.props.update();
  }
}

export default AdoptionRequestMakeCard;
