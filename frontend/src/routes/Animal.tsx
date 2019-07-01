// tslint:disable-next-line: import-name
import React from 'react';
import { IAnimal, Gender, AnimalType } from 'dc2410-coursework-common';
import { IAppContextInterface, withAppContext } from '../AppContext';
import AnimalDetailsSection from '../components/Animal/AnimalDetailsSection';
import AdoptionRequestsSection from '../components/AdoptionRequests/AdoptionRequestsSection';

interface IProps {
  match: { params: { id: string; }; };
  AppContext?: IAppContextInterface;
}

interface IState {
  animal: IAnimal;
}

class Animal extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      animal: {
        name: 'Holly',
        description: 'Loved black and white short haired cat.',
        gender: Gender.Female,
        dob: new Date(2006, 11, 5),
        type: AnimalType.Cat,
        picture:
          'http://localtvkfor.files.wordpress.com/2012/08/dog-pet-adoption.jpg',
      },
    };
  }

  public render() {
    return (
      <main className="container mt-3">
        <div className="row">
          <AnimalDetailsSection animal={this.state.animal} />
          <AdoptionRequestsSection animal={this.state.animal} />
        </div>
      </main>
    );
  }
}

export default withAppContext(Animal);
