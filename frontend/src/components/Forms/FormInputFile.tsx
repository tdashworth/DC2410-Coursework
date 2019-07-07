import React from 'react';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  id: string;
  label: string;
  icon?: string;
  onFileSelected: (file?: File) => void;
}

interface IState {
  file?: File;
}

class FormInputFile extends React.Component<IProps, IState> {
  public state: IState = {}

  public render = () => (
    <div className={`input-group mb-2 ${this.props.className}`}>
      <div className="input-group-prepend">
        <span className="input-group-text">
          {this.props.icon || this.props.label}
        </span>
      </div>
      <div className="custom-file">
        <input
          {...this.props}
          type="file"
          className="custom-file-input"
          id={this.props.id}
          onChange={(e) => {
            const file =
              e.target.files && e.target.files.length > 0
                ? e.target.files[0]
                : undefined;

            this.setState({ file });
            this.props.onFileSelected(file);
          }}
        />
        <label className="custom-file-label" htmlFor={this.props.id}>
          {(this.state.file &&
            this.state.file.name) ||
            'Choose a file'}
        </label>
      </div>
    </div>
  );
}

export default FormInputFile;
