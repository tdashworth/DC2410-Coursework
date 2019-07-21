import React from 'react';
import Emoji from '../Emoji';
import { IAnimal } from 'dc2410-coursework-common';

class AnimalSummaryCard extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <div className="card mb-3">
      <img
        src={this.props.animal.pictures![0]}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          <a href={`/animal/${this.props.animal.id}`}>
            {this.props.animal.name}
          </a>
        </h5>
        <p className="card-text">{this.props.animal.description}</p>
        <p className="card-text">
          <a
            className="btn btn-primary text-light text-decoration-none"
            href={`/animal/${this.props.animal.id}`}
          >
            View more <Emoji symbol="👀" />
          </a>
        </p>

        {this.props.animal.adoptedBy ? (
          <div className="alert alert-success mb-0" role="alert">
            Adopted!
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AnimalSummaryCard;
