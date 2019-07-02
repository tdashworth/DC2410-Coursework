// tslint:disable-next-line: import-name
import React from 'react';
import AnimalSummaryCard from './AnimalSummaryCard';
import { IAnimal, AnimalType } from 'dc2410-coursework-common';
import API from '../../helpers/API';

interface IState {
  allAnimals: IAnimal[];
  filterBy?: AnimalType;
  sortBy?: 'y2o'|'o2y'|'t'|'g';
}

class AnimalSummarySection extends React.Component<{}, IState> {
  public state: IState = {
    allAnimals: [],
  };

  public async componentDidMount() {
    console.log('Animal Summary Section mounted.');
    this.setState({ allAnimals: await API.animals.listAll() });
  }

  public render = () => {
    const filteredAnimals = this.getFilteredAndSortedAnimals();

    return (
      <section className="col-md-12 col-lg-8" id="animal-details">
        <h3 className="">Available Animals</h3>

        <this.FilterAndSort />

        {filteredAnimals.map(animal => (
          <AnimalSummaryCard key={animal.id!} animal={animal} />
        ))}
      </section>
    );
  }

  private getFilteredAndSortedAnimals = (): IAnimal[] => {
    return this.state.allAnimals;
  }

  // tslint:disable-next-line: variable-name
  private FilterAndSort = () => (
    <div className="mb-3">
      <form className="row">
        <div className="input-group col-6">
          <div className="input-group-prepend">
            <label
              className="input-group-text bg-primary text-light"
              htmlFor="filter"
            >
              Filter By
            </label>
          </div>
          <select className="custom-select" id="filter">
            <option>All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="bird">Bird</option>
            <option value="pig">Pig</option>
          </select>
        </div>
        <div className="input-group col-6">
          <div className="input-group-prepend">
            <label
              className="input-group-text bg-primary text-light"
              htmlFor="sort"
            >
              Sort By
            </label>
          </div>
          <select className="custom-select" id="sort">
            <option>Choose...</option>
            <option value="y2o">Youngest to Oldest</option>
            <option value="o2y">Oldest to Youngest</option>
            <option value="t">Type</option>
            <option value="g">Gender</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default AnimalSummarySection;
