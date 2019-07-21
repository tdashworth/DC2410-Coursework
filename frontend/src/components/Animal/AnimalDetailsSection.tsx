import React from 'react';
import AnimalDetailsCard from './AnimalDetailsCard';
import { IAnimal, UserType } from 'dc2410-coursework-common';
import { IAppContextInterface, withAppContext } from '../../AppContext';
import AnimalDetailsEditModal from './AnimalDetailsEditModal';

interface IProps {
  AppContext?: IAppContextInterface;
  animal: IAnimal;
}

class AnimalDetailsSection extends React.Component<IProps> {
  public render = () => {
    const isUserInternal =
      this.props.AppContext!.user!.type === UserType.Internal;

    return (
      <section className="col-md-12 col-lg-8" id="animal-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{this.props.animal.name}</h3>
          {isUserInternal && <this.EditButton />}
        </div>

        <AnimalDetailsCard animal={this.props.animal} />
        <AnimalDetailsEditModal animal={this.props.animal} />
      </section>
    );
  };

  // tslint:disable-next-line: variable-name
  private EditButton = () => (
    <button
      className="btn btn-primary"
      type="button"
      style={{ lineHeight: 1.2 }}
      data-toggle="modal"
      data-target="#animalEditModal"
    >
      Edit
    </button>
  );
}

export default withAppContext(AnimalDetailsSection);
