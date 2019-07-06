import React from 'react';
import { IAnimal } from 'dc2410-coursework-common';

class AnimalDetailsCard extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <div className="card mb-3">
      <img src={this.props.animal.picture} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{this.props.animal.name}</h5>
        <p className="card-text">{this.props.animal.description}</p>
      </div>
      <div className="card-body d-flex justify-content-around tags">
        <h2>
          <span className="badge badge-secondary w-100">
            {this.props.animal.gender}
          </span>
        </h2>
        <h2>
          <span className="badge badge-secondary w-100">
            {this.props.animal.type}
          </span>
        </h2>
        <h2>
          <span className="badge badge-secondary w-100">
            {this.props.animal.dob}
          </span>
        </h2>
      </div>
    </div>
  )
}

export default AnimalDetailsCard;
