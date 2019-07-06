import React from 'react';
import AnimalSummaryCard from './AnimalSummaryCard';
import { IAnimal, AnimalType, UserType } from 'dc2410-coursework-common';
import API from '../../helpers/API';
import { IAppContextInterface, withAppContext } from '../../AppContext';

interface IProps {
  AppContext?: IAppContextInterface;
}
interface IState {
  allAnimals: IAnimal[];
  filterBy?: AnimalType;
  sortBy?: 'y2o' | 'o2y' | 't' | 'g';
}

class AnimalSummarySection extends React.Component<IProps, IState> {
  public state: IState = {
    allAnimals: [],
    filterBy: undefined,
  };

  public async componentDidMount() {
    console.log('Animal Summary Section mounted.');
    this.setState({ allAnimals: await API.animals.listAll() });
  }

  public render = () => {
    const filteredAnimals = this.getFilteredAndSortedAnimals();
    const title =
      this.props.AppContext!.user!.type === UserType.Internal
        ? 'All Animals'
        : 'Available Animals';

    return (
      <section className="col-md-12 col-lg-8" id="animal-details">
        <h3 className="">{title}</h3>

        <this.FilterAndSort />

        {filteredAnimals.map(animal => (
          <AnimalSummaryCard key={animal.id!} animal={animal} />
        ))}
      </section>
    );
  }

  private getFilteredAndSortedAnimals = (): IAnimal[] => {
    const filterBy = this.state.filterBy == null ? -1 : this.state.filterBy;
    const filter = (animal: IAnimal): boolean =>
      filterBy >= 0 ? animal.type === this.state.filterBy : true;

    const sort = (a1: IAnimal, a2: IAnimal): number => {
      switch (this.state.sortBy) {
        case 'y2o':
          return new Date(a2.dob).getTime() - new Date(a1.dob).getTime();
        case 'o2y':
          return new Date(a1.dob).getTime() - new Date(a2.dob).getTime();
        case 't':
          return a1.type - a2.type;
        case 'g':
          return a1.gender - a2.gender;
        default:
          return 0;
      }
    };
    return this.state.allAnimals.filter(filter).sort(sort);
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
          <select
            className="custom-select"
            id="filter"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              this.setState({
                filterBy: parseInt(e.target.value, 10) as AnimalType,
              })
            }
          >
            <option value="-1">All</option>
            <option value={AnimalType.Cat}>Cat</option>
            <option value={AnimalType.Dog}>Dog</option>
            <option value={AnimalType.Bird}>Bird</option>
            <option value={AnimalType.Pig}>Pig</option>
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
          <select
            className="custom-select"
            id="sort"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              this.setState({ sortBy: e.target.value as IState['sortBy'] })
            }
          >
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

export default withAppContext(AnimalSummarySection);
