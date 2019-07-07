import React from 'react';
import { IAnimal, Gender, AnimalType } from 'dc2410-coursework-common';
import FormInput from '../Forms/FormInput';
import FormTextArea from '../Forms/FormTextArea';
import FormSelect from '../Forms/FormSelect';
import FormInputFile from '../Forms/FormInputFile';
import API from '../../helpers/API';

interface IProps {
  animal: IAnimal;
}

interface IState {
  isRequestingSave: boolean;
  isRequestingUpload: boolean;
  animal: IAnimal;
  file?: File;
}

class AnimalDetailsEditCard extends React.Component<IProps, IState> {
  public state = {
    isRequestingSave: false,
    isRequestingUpload: false,
    animal: this.props.animal,
  };
  private genderOptions = [
    { value: Gender.Male, label: 'Male' },
    { value: Gender.Female, label: 'Female' },
  ];
  private animalTypeOptions = [
    { value: AnimalType.Cat, label: 'Cat' },
    { value: AnimalType.Dog, label: 'Dog' },
    { value: AnimalType.Bird, label: 'Bird' },
    { value: AnimalType.Pig, label: 'Pig' },
  ];

  public render = () => (
    <div className="card">
      <div className="card-body">
        <this.Details />
        <this.Pictures />
      </div>
    </div>
  );

  // tslint:disable-next-line: variable-name
  private Details = () => (
    <div>
      <h5 className="card-title">Details</h5>
      <FormInput
        type="text"
        id="edit-animal-name"
        label="Name"
        onChange={(e) => this.updateAnimal({ name: e.target.value })}
        value={this.state.animal.name}
      />
      <FormTextArea
        id="edit-animal-description"
        label="Description"
        onChange={(e) => this.updateAnimal({ description: e.target.value })}
        value={this.state.animal.description}
      />
      <FormSelect
        id="edit-animal-gender"
        label="Gender"
        onChange={(e) =>
          this.updateAnimal({ gender: parseInt(e.target.value, 10) })
        }
        options={this.genderOptions}
        selectedOption={this.state.animal.gender}
      />
      <FormSelect
        id="edit-animal-type"
        label="Type"
        onChange={(e) =>
          this.updateAnimal({ type: parseInt(e.target.value, 10) })
        }
        options={this.animalTypeOptions}
        selectedOption={this.state.animal.type}
      />
      <FormInput
        type="date"
        id="edit-animal-dob"
        label="Date of Birth"
        onChange={(e) =>
          this.updateAnimal({
            dob: new Date(e.target.value),
          })
        }
        value={new Date(this.state.animal.dob).toISOString().slice(0, 10)}
      />
      <button
        type="submit"
        className={`btn btn-primary w-100 ${
          this.state.isRequestingSave
            ? 'progress-bar-striped progress-bar-animated'
            : ''
        }`}
        onClick={async () => {
          this.setState({ isRequestingSave: true });
          await API.animals.update(this.props.animal.id, this.state.animal);
          this.setState({ isRequestingSave: false });
          window.location.reload();
        }}
      >
        Save
      </button>
    </div>
  );

  // tslint:disable-next-line: variable-name
  private Pictures = () => (
    <div>
      <h5 className="card-title mt-3">Pictures</h5>

      <form action={`/api/animals/${this.state.animal.id}/image`} method="post" encType="multipart/form-data">
        <FormInputFile
          id="edit-animal-picture"
          name="image"
          label="Upload new"
          accept="image/*"
          onFileSelected={(file) => this.setState({ file })}
        />
        <button
          type="submit"
          className={`btn btn-primary w-100 ${
            this.state.isRequestingUpload
              ? 'progress-bar-striped progress-bar-animated'
              : ''
          }`}
          onClick={() => {
            console.log('Nothing happened.');
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );

  private updateAnimal = (update: {}) =>
    this.setState({ animal: { ...this.state.animal, ...update } });
}

export default AnimalDetailsEditCard;
