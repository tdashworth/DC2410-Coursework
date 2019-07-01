// tslint:disable-next-line: import-name
import React from 'react';
import AnimalSummaryCard from './AnimalSummaryCard';
import { IAnimal, Gender, AnimalType } from 'dc2410-coursework-common';

const animals: IAnimal[] = [
  {
    name: 'Holly',
    description: 'Loved black and white short haired cat.',
    gender: Gender.Female,
    dob: new Date(2006, 11, 5),
    type: AnimalType.Cat,
    picture:
      'http://localtvkfor.files.wordpress.com/2012/08/dog-pet-adoption.jpg',
  },
  {
    name: 'Example Animal',
    description:
      "Animal Description: Some quick example text to build on the card title and make up the bulk of the card's content.",
    gender: Gender.Male,
    dob: new Date(2017, 5, 17),
    type: AnimalType.Dog,
    picture:
      'https://www.greenepet.org/wp-content/uploads/2012/12/dog-adopt-1024x680.jpg',
  },
];

interface IState {
  animals: IAnimal[];
}

class AnimalSummarySection extends React.Component<{}, IState> {
  public state: IState = {
    animals: [],
  };

  public componentDidMount() {
    console.log('Animal Summary Section mounted.');
    this.setState({ animals });
  }

  public render = () => (
    <section className="col-md-12 col-lg-8" id="animal-details">
      <h3 className="">Available Animals</h3>

      <this.FilterAndSort />

      {this.state.animals.map((animal) => (
        <AnimalSummaryCard key={animal.id!} animal={animal} />
      ))}
    </section>
  )

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
