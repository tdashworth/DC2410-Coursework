import React from 'react';
import { IAnimal, Gender, AnimalType } from 'dc2410-coursework-common';
import Carousel from '../Carousel';

class AnimalDetailsCard extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <div className="card mb-3">
      <Carousel images={this.props.animal.pictures!} />
      <div className="card-body">
        <h5 className="card-title">{this.props.animal.name}</h5>
        <p className="card-text">{this.props.animal.description}</p>
      </div>
      <div className="card-body d-flex justify-content-around tags">
        <h2>
          <span className="badge badge-secondary w-100">
            {this.getGender()}
          </span>
        </h2>
        <h2>
          <span className="badge badge-secondary w-100">
            {this.getType()}
          </span>
        </h2>
        <h2>
          <span className="badge badge-secondary w-100">
            {this.getDOB()}
          </span>
        </h2>
      </div>
    </div>
  );

  private getGender() {
    switch (this.props.animal.gender) {
      case Gender.Male:
        return 'Male ♂️';
      case Gender.Female:
        return 'Female ♀';
    }
  }

  private getType() {
    switch (this.props.animal.type) {
      case AnimalType.Cat:
        return 'Cat 🐱';
      case AnimalType.Dog:
        return 'Dog 🐶';
      case AnimalType.Bird:
        return 'Bird 🐦';
      case AnimalType.Pig:
        return 'Pig 🐷';
    }
  }

  private getDOB() {
    return new Date(this.props.animal.dob).toDateString()//toLocaleDateString('en-GB')
  }
}

export default AnimalDetailsCard;
