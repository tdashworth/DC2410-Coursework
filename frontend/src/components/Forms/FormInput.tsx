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
  type: string;
}

class FormInput extends React.Component<IProps> {
  public render = () => (
    <div className={`input-group mb-2 ${this.props.className}`}>
      <div className="input-group-prepend">
        <div className="input-group-text">
          {this.props.icon || this.props.label}
        </div>
      </div>
      <label className="sr-only" htmlFor={this.props.id}>
        {this.props.label}
      </label>
      <input
        {...this.props}
        type={this.props.type}
        className="form-control"
        id={this.props.id}
        placeholder={this.props.label}
      />
    </div>
  );
}

export default FormInput;
