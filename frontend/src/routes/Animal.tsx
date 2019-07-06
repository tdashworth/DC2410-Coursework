import React from 'react';
import { IAnimal } from 'dc2410-coursework-common';
import { IAppContextInterface, withAppContext } from '../AppContext';
import AnimalDetailsSection from '../components/Animal/AnimalDetailsSection';
import AdoptionRequestsSection from '../components/AdoptionRequests/AdoptionRequestsSection';
import API from '../helpers/API';

interface IProps {
  match: { params: { id: string; }; };
  AppContext?: IAppContextInterface;
}

interface IState {
  animal?: IAnimal;
}

class Animal extends React.Component<IProps, IState> {
  public state: IState = {};

  public async componentDidMount() {
    try {
      const animal = await API.animals.get(this.props.match.params.id);
      this.setState({ animal });
    } catch (e) {
      console.log(e);
      this.props.AppContext!.setError(e);
    }
  }

  public render = () => (
    this.state.animal) ? (
      <main className="container mt-3">
        <div className="row">
          <AnimalDetailsSection animal={this.state.animal} />
          <AdoptionRequestsSection animal={this.state.animal} />
        </div>
      </main>
    ) : null
}

export default withAppContext(Animal);
