import React from 'react';
import AnimalDetailsCard from './AnimalDetailsCard';
import { IAnimal, UserType } from 'dc2410-coursework-common';
import { IAppContextInterface, withAppContext } from '../../AppContext';
import AnimalDetailsEditCard from './AnimalDetailsEditCard';

interface IProps {
  AppContext?: IAppContextInterface;
  animal: IAnimal;
}

interface IState {
  editMode: boolean;
}

class AnimalDetailsSection extends React.Component<IProps, IState> {
  public state: IState = { editMode: false };

  public render = () => {
    const isUserInternal =
      this.props.AppContext!.user!.type === UserType.Internal;

    return (
      <section className="col-md-12 col-lg-8" id="animal-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{this.props.animal.name}</h3>
          {isUserInternal && <this.EditSaveButton />}
        </div>

        {this.state.editMode ? (
          <AnimalDetailsEditCard
            animal={this.props.animal}
          />
        ) : (
          <AnimalDetailsCard animal={this.props.animal} />
        )}
      </section>
    );
  };

  // tslint:disable-next-line: variable-name
  private EditSaveButton = () =>
    !this.state.editMode ? (
      <button
        className="btn btn-primary"
        type="button"
        style={{ lineHeight: 1.2 }}
        onClick={this.handleEdit}
      >
        Edit
      </button>
    ) : (
      <button
        className="btn btn-primary"
        type="button"
        style={{ lineHeight: 1.2 }}
        onClick={this.handleCancel}
      >
        Cancel
      </button>
    );

  private handleEdit = () => {
    console.log('Edit clicked');
    this.setState({ editMode: true });
  };

  private handleCancel = () => {
    this.setState({ editMode: false });
  };
}

export default withAppContext(AnimalDetailsSection);
