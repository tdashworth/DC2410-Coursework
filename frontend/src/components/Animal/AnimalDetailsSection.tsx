// tslint:disable-next-line: import-name
import React from 'react';
import AnimalDetailsCard from './AnimalDetailsCard';
import { IAnimal } from 'dc2410-coursework-common';

class AnimalDetailsSection extends React.Component<{ animal: IAnimal }> {
  public render = () => (
    <section className="col-md-12 col-lg-8" id="animal-details">
      <h3>{this.props.animal.name}</h3>

      <AnimalDetailsCard animal={this.props.animal} />
    </section>
  )
}

export default AnimalDetailsSection;
