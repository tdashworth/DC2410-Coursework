// tslint:disable-next-line: import-name
import React from 'react';
import Emoji from '../Emoji';
import { IAnimal } from 'dc2410-coursework-common';

class AnimalSummaryCard extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <div className="card mb-3">
      <img src={this.props.animal.picture} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          <a href="/animal/">{this.props.animal.name}</a>
        </h5>
        <p className="card-text">{this.props.animal.description}</p>
        <p className="card-text">
          <button type="button" className="btn btn-primary">
            View more <Emoji symbol="👀" />
          </button>
        </p>
      </div>
    </div>
  )
}

export default AnimalSummaryCard;
